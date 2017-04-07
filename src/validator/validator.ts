import * as _ from "lodash";
import { join } from "path";
import { config, fileSystem } from "@speedy/node-core";
import { json } from "@speedy/json-extends";

import { rules, RulesResult, CommitMessagePart, COMMIT_MESSAGE_PART } from "../rules";
import { ConfigData } from "../config.model";

export namespace validator {

	const DEFAULT_CONFIG_FILENAME = "speedy-commit-msg.json";
	const INTERNAL_CONFIG_LOCATION = join(__dirname, "../../config");

	export async function validate(commitMessage?: string, configFilePath?: string) {
		const configPath = config.getConfigFilePath(configFilePath || DEFAULT_CONFIG_FILENAME, INTERNAL_CONFIG_LOCATION);
		const configData = json.readSync<ConfigData>(configPath, {
			"@speedy/commit-msg-hook:latest": join(INTERNAL_CONFIG_LOCATION, DEFAULT_CONFIG_FILENAME)
		});
		const { type, message, scope, subject } = configData.rules;

		commitMessage = commitMessage || await getCommitMessage();
		if (message) {
			// skip validation for certain commit messages
			if (rules.skipValidation(commitMessage, message[rules.SKIP_VALIDATION_RULE_KEY])) {
				return;
			}

			validatePart(commitMessage, COMMIT_MESSAGE_PART.Message, message);
		}

		if (!rules.SCOPED_COMMIT_REGEXP.test(commitMessage)) {
			return;
		}

		const msgSplit = /(.+)\((.+)\):\s{1}(.+)/.exec(commitMessage);
		if (!msgSplit) {
			throw new Error(`Commit message 'header' must be in this format: '<type>(<scope>): <subject>'`);
		}

		const [, msgType, msgScope, msgSubject] = msgSplit;

		if (msgType) {
			validatePart(msgType, COMMIT_MESSAGE_PART.Type, type);
		}

		if (msgScope) {
			validatePart(msgScope, COMMIT_MESSAGE_PART.Scope, scope);
		}

		if (msgSubject) {
			validatePart(msgSubject, COMMIT_MESSAGE_PART.Subject, subject);
		}
	}

	export function validatePart(text: string, messagePart: CommitMessagePart, options: any) {
		_.forEach(options, (value, key: string) => {
			if (value === false) {
				return;
			}

			const result = (_.get(rules, _.camelCase(key)) as Function)
				.call(null, text, messagePart, value) as RulesResult;

			if (_.isObject(result) && result.failed) {
				throw new Error(result.message);
			}
		});
	}

	async function getCommitMessage(): Promise<string> {
		const result = await fileSystem.readFileAsync(process.argv[2]);

		if (!result) {
			throw new Error("No commit message provided.");
		}

		return result.split("\n", 1)[0];
	}
}