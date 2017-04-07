import * as _ from "lodash";

import { RulesResult, CommitMessagePart } from "./rules.model";

export namespace rules {

	export const SKIP_VALIDATION_RULE_KEY = "skip-validation";
	export const SCOPED_COMMIT_REGEXP = /(.+)\(.*\)\s?:/;

	export function bannedPhrases(text: string, part: CommitMessagePart, bannedPhrases: string[]): RulesResult {
		return {
			failed: new RegExp(`(${bannedPhrases.join("|")})`, "ig").test(text),
			message: `Commit '${part}' is not valid. You are using a 'Banned Phrase'. Banned phrases are: ${bannedPhrases.join(", ")}.`
		};
	}

	export function skipValidation(text: string, skipValidationPattern: string | undefined): boolean {
		return !!skipValidationPattern && new RegExp(skipValidationPattern).test(text);
	}

	export function noUnscoped(text: string): RulesResult {
		return {
			failed: !SCOPED_COMMIT_REGEXP.test(text),
			message: "Unscoped commit messages are not allowed."
		};
	}

	export function maxLength(text: string, part: CommitMessagePart, maxLength: number): RulesResult {
		return {
			failed: maxLength < text.length,
			message: `Commit '${part}' cannot exceed ${maxLength} characters.`
		};
	}

	export function validScopes(text: string, part: CommitMessagePart, validScopes: string[]): RulesResult {
		return {
			failed: !new RegExp(`^(${validScopes.join("|")})$`).test(text),
			message: `Commit '${part}' is not valid. Valid scopes are: ${validScopes.join(", ")}.`
		};
	}

	export function validTypes(text: string, part: CommitMessagePart, validTypes: string[]): RulesResult {
		return {
			failed: !new RegExp(`^(${validTypes.join("|")})$`).test(text),
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
