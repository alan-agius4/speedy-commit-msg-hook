import * as _ from "lodash";

import { RulesResult, CommitMessagePart } from "./rules.model";
export namespace Rules {

	export function noUnscoped(text: string): RulesResult {
		return {
			failed: !/[a-z]+\(.+\):/.test(text),
			message: "Unscoped commit messages are not allowed."
		};
	}

	export function maxLength(text: string, part: CommitMessagePart, maxLength: number): RulesResult {
		return {
			failed: maxLength < text.length,
			message: `Commit '${part}' cannot exceed ${maxLength} characters.`
		};
	}

	export function validTypes(text: string, part: CommitMessagePart, validTypes: string[]): RulesResult {
		return {
			failed: !new RegExp(`^${validTypes.join("|")}\\(`).test(text),
			message: `Commit '${part}' is not valid. Valid types are: ${validTypes.join(", ")}.`
		};
	}

	export function noDash(text: string, part: CommitMessagePart): RulesResult {
		return {
			failed: text.indexOf("-") > -1,
			message: `Commit '${part}' cannot contain dashes.`
		};
	}

	export function noSpace(text: string, part: CommitMessagePart): RulesResult {
		return {
			failed: text.indexOf(" ") > -1,
			message: `Commit '${part}' cannot contain spaces.`
		};
	}

	export function noUnderscore(text: string, part: CommitMessagePart): RulesResult {
		return {
			failed: text.indexOf("_") > -1,
			message: `Commit '${part}' cannot contain underscore.`
		};
	}

	export function noCamelCase(text: string, part: CommitMessagePart): RulesResult {
		return {
			failed: _.camelCase(text) === text,
			message: `Commit '${part}' cannot be in CamelCase format.`
		};
	}

	export function noKebabCase(text: string, part: CommitMessagePart): RulesResult {
		return {
			failed: _.kebabCase(text) === text,
			message: `Commit '${part}' cannot be in KebabCase format.`
		};
	}

	export function noUpperFirst(text: string, part: CommitMessagePart): RulesResult {
		return {
			failed: /^[A-Z]/.test(text),
			message: `Commit '${part}' first character cannot be UpperCase.`
		};
	}

	export function noLowerFirst(text: string, part: CommitMessagePart): RulesResult {
		return {
			failed: /^[a-z]/.test(text),
			message: `Commit '${part}' first character cannot be in LowerCase.`
		};
	}

	export function noPeriodAtEnd(text: string, part: CommitMessagePart): RulesResult {
		return {
			failed: /[.]$/.test(text),
			message: `Commit '${part}' last character cannot be a period.`
		};
	}
}
