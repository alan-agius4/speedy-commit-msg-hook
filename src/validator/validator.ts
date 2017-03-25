import * as _ from "lodash";

import { getCommitMessage, readJsonFileAsync } from "../utils";
import { Rules, RulesResult, CommitMessagePart, COMMIT_MESSAGE_PART } from "../rules";
import { ConfigData, getConfigFilePath } from "../config";

export namespace Validator {

	export async function validate() {
		const commitMessage = await getCommitMessage();
		const config = await readJsonFileAsync<ConfigData>(getConfigFilePath("speedy-commit-msg.json"));
		const { type, message, scope, subject } = config.rules;

		if (message) {
			validatePart(commitMessage, COMMIT_MESSAGE_PART.Message, message);
		}

		if (!Rules.SCOPED_COMMIT_REGEXP.test(commitMessage)) {
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

			const result = (_.get(Rules, key) as Function)
				.call(null, text, messagePart, value) as RulesResult;

			if (result.failed) {
				throw new Error(result.message);
			}
		});
	}
}