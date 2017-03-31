export interface ConfigData {
	extends?: string | string[];
	rules: RulesSection;
}

export interface RulesSection {
	message?: any;
	scope?: any;
	type?: any;
	subject?: any;
}