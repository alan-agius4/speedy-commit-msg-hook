#!/usr/bin/env node
import * as _ from "lodash";
import { readFileAsync, readJsonFileAsync, getConfigFilePath } from "./utils";
import { Rules, RulesResult, CommitMessagePart, COMMIT_MESSAGE_PART } from "./rules";
import { ConfigData } from "./config.model";

async function getCommitMsg(): Promise<string> {
	const result = await readFileAsync(process.argv[2]);

	if (!result) {
		throw new Error("No commit message provided.");
	}

	return result.split("\n")
		.shift()!;
}

async function validate() {
	try {
		const commitMessage = await getCommitMsg();
		const config = await readJsonFileAsync<ConfigData>(getConfigFilePath("speedy-commit-msg.json"));
		const { type, message, scope, subject } = config.rules;

		if (message) {
			validatePart(commitMessage, COMMIT_MESSAGE_PART.Message, message);
		}

		const msgSplit = /(.+)\((.+)\):(.+)/.exec(commitMessage);
		if (!msgSplit) {
			// commit message must be unscoped.
			// if it's not allowed we won't reach here.
			return;
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

	} catch (error) {
		console.log(error);
		process.exit(1);
	}
}

function validatePart(text: string, messagePart: CommitMessagePart, options: any) {

	for (const rule in options) {
		if (!options.hasOwnProperty(rule)) {
			continue;
		}

		const value = _.get(options, rule);

		if (_.isBoolean(value) && value === true) {
			continue;
		}

		const result = (_.get(Rules, rule) as Function)
			.call(null, text, messagePart, value) as RulesResult;

		if (result.failed) {
			throw new Error(result.message);
		}
	}

}

validate();