export interface ConfigData {
	rules: RulesSection;
}

export interface RulesSection {
	message?: MessageRules;
	scope?: string[];
	type?: TypeRules;
	subject?: SubjectRules;
}

export interface MessageRules {
	allowUnscoped?: boolean;
	ignoreMsgStarting?: string[];
}

export interface TypeRules {
	camelCase?: boolean;
	kebabCase?: boolean;
	allLowerCase?: boolean;
	allUpperCase?: boolean;
	allowSpace?: boolean;
	allowDash?: boolean;
	allowUnderscore?: boolean;
}

export interface SubjectRules {
	upperFirst: boolean;
	endWithPeriod: boolean;
	allLowerCase: boolean;
}