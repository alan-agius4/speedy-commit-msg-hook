export interface ValidationResult {
	message: string;
	passed: boolean;
}

export namespace Rules {

	export function allowUnscoped(message: string): ValidationResult {
		return {
			passed: !/^[\w\-]+\(.+\):/.test(message),
			message: "Unscoped commit messages are not allowed."
		};
	}

	// export function ignoreMsgStarting(message: string, value: string[]): ValidationResult {
	// 	return {
	// 		passed: !new RegExp(^value.join("|")).test(message),
	// 		message: "Unscoped commit messages are not allowed."
	// 	};
	// }

	export function scopes(scope: string, validScopes: string[]): ValidationResult {
		return {
			passed: !new RegExp(`^${validScopes.join("|")}`).test(scope),
			message: `Commit 'Scope' provided is not valid. Valid scopes are: ${validScopes.join(", ")}`
		};
	}

	export function allowDash(type: string): ValidationResult {
		return {
			passed: type.indexOf("-") > -1,
			message: "Commit 'Type' cannot contain dashes"
		};
	}

	export function allowSpace(type: string): ValidationResult {
		return {
			passed: type.indexOf(" ") > -1,
			message: "Commit 'Type' cannot contain spaces"
		};
	}

	export function allowUnderscore(type: string): ValidationResult {
		return {
			passed: type.indexOf("_") > -1,
			message: "Commit 'Type' cannot contain underscore"
		};
	}
}