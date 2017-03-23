#!/usr/bin/env node
import { readFileAsync, readJsonFileAsync, getConfigFilePath } from "./utils";

import { ConfigData, MessageRules, TypeRules } from "./config.model";

async function getCommitMsg(): Promise<string> {
	const result = await readFileAsync(process.argv[2]);

	if (!result) {
		throw new Error("No commit message was provided.");
	}

	return result.split("\n")
		.shift()!;
}

async function validate() {
	const msg = await getCommitMsg();
	const config = await readJsonFileAsync<ConfigData>(getConfigFilePath("config.json"));
	const { type, message, scope } = config.rules;

	validateMsg(msg, message);
	validateScope(msg, scope);
	validateType(msg, type);

	// if (config.rules.scope) {
	// 	const x = config.rules.scope.join("|");
	// }
}

function validateMsg(message: string, options?: MessageRules) {
	if (!options) {
		return;
	}
}

function validateScope(message: string, options?: string[]) {
	if (!options) {
		return;
	}

}

function validateType(message: string, options?: TypeRules) {
	if (!options) {
		return;
	}
}


validate();