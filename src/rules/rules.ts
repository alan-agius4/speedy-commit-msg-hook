import {RulesResult} from "./rules.model";

export namespace Rules {

	export function allowUnscoped(message: string): RulesResult {
		return {
			failed: !/^[\w\-]+\(.+\):/.test(message),
			message: "Unscoped commit messages are not allowed."
		};
	}

	// export function ignoreMsgStarting(message: string, value: string[]): ValidationResult {
	// 	return {
	// 		passed: !new RegExp(^value.join("|")).test(message),
	// 		message: "Unscoped commit messages are not allowed."
	// 	};
	// }

	export function scopes(scope: string, validScopes: string[]): RulesResult {
		return {
			failed: !new RegExp(`^${validScopes.join("|")}`).test(scope),
			message: `Commit 'Scope' provided is not valid. Valid scopes are: ${validScopes.join(", ")}`
		};
	}

	export function allowDash(type: string): RulesResult {
		return {
			failed: type.indexOf("-") > -1,
			message: "Commit 'Type' cannot contain dashes"
		};
	}

	export function allowSpace(type: string): RulesResult {
		return {
			failed: type.indexOf(" ") > -1,
			message: "Commit 'Type' cannot contain spaces"
		};
	}

	export function allowUnderscore(type: string): RulesResult {
		return {
			failed: type.indexOf("_") > -1,
			message: "Commit 'Type' cannot contain underscore"
		};
	}
}