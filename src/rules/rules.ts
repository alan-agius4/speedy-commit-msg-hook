import * as _ from "lodash";

export interface ValidationResult {
	message: string;
	failed: boolean;
}

export namespace Rules {

	export function allowUnscoped(message: string): ValidationResult {
		return {
			failed: !/[a-z]+\(.+\):/.test(message),
			message: "Unscoped commit messages are not allowed."
		};
	}

	export function maxLength(message: string, value: number): ValidationResult {
		return {
			failed: value < message.length,
			message: `Commit message cannot exceed ${value} characters.`
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
			failed: !new RegExp(`^${validScopes.join("|")}\(`).test(scope),
			message: `Commit scope is not valid. Valid scopes are: ${validScopes.join(", ")}.`
		};
	}

	export function allowDash(type: string): ValidationResult {
		return {
			failed: type.indexOf("-") > -1,
			message: "Commit 'Type' cannot contain dashes."
		};
	}

	export function allowSpace(type: string): ValidationResult {
		return {
			failed: type.indexOf(" ") > -1,
			message: "Commit 'Type' cannot contain spaces."
		};
	}

	export function allowUnderscore(type: string): ValidationResult {
		return {
			failed: type.indexOf("_") > -1,
			message: "Commit 'Type' cannot contain underscore."
		};
	}

	export function camelCase(type: string): ValidationResult {
		return {
			failed: _.camelCase(type) === type,
			message: "Commit 'Type' cannot contain underscore."
		};
	}

	export function kebabCase(type: string): ValidationResult {
		return {
			failed: _.kebabCase(type) === type,
			message: "Commit 'Type' cannot be in kebabCase format."
		};
	}

	export function snakeCase(type: string): ValidationResult {
		return {
			failed: _.snakeCase(type) === type,
			message: "Commit 'Type' cannot be in snakeCase format."
		};
	}
}
