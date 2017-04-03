import { rules } from "./rules";
import { CommitMessagePart } from "./rules.model";

describe("rulesSpec", () => {
	const MESSAGE_PART: CommitMessagePart = "Type";
	const COMMIT_MSG = "style(all): formatting";

	describe(rules.bannedPhrases.name, () => {
		const bannedPhrases =  ["pr change"];
		it("should fail when commit contain banned phrases", () => {
			expect(rules.bannedPhrases("chore(all): PR changes", MESSAGE_PART, bannedPhrases).failed).toBe(true);
		});

		it("should not fail when commit doesn't contain banned phrases", () => {
			expect(rules.bannedPhrases(COMMIT_MSG, MESSAGE_PART, bannedPhrases).failed).toBe(false);
		});
	});

	describe(rules.noUnscoped.name, () => {
		it("should fail when commit message is not scope", () => {
			expect(rules.noUnscoped("unscoped message").failed).toBe(true);
		});

		it("should not fail when commit message is scoped but contains alphanumeric", () => {
			expect(rules.noUnscoped("chore2(build): scripts").failed).toBe(false);
		});

		it("should not fail when commit message is not scope", () => {
			expect(rules.noUnscoped(COMMIT_MSG).failed).toBe(false);
		});
	});

	describe(rules.maxLength.name, () => {
		it("should fail when commit message length is exceeds the limit", () => {
			expect(rules.maxLength(COMMIT_MSG, MESSAGE_PART, 2).failed).toBe(true);
		});

		it("should not fail when commit message length is within the limit", () => {
			expect(rules.maxLength(COMMIT_MSG, MESSAGE_PART, 999).failed).toBe(false);
		});
	});

	describe(rules.validScopes.name, () => {
		const VALID_SCOPES = ["router", "navigation"];

		it("should fail when 'scope' is not valid", () => {
			expect(rules.validScopes("router service", MESSAGE_PART, VALID_SCOPES).failed).toBe(true);
		});

		it("should not fail when 'scope' is valid", () => {
			expect(rules.validScopes("router", MESSAGE_PART, VALID_SCOPES).failed).toBe(false);
		});
	});

	describe(rules.validTypes.name, () => {
		const VALID_TYPES = ["test", "refactor"];

		it("should fail when 'type' is not valid", () => {
			expect(rules.validTypes("style", MESSAGE_PART, VALID_TYPES).failed).toBe(true);
		});

		it("should not fail when 'type' is valid", () => {
			expect(rules.validTypes("test", MESSAGE_PART, VALID_TYPES).failed).toBe(false);
		});
	});

	describe(rules.noDash.name, () => {
		it("should fail when 'dash' is part of the string", () => {
			expect(rules.noDash("register-service", MESSAGE_PART).failed).toBe(true);
		});

		it("should not fail when there is no 'dash' in the string", () => {
			expect(rules.noDash("register service", MESSAGE_PART).failed).toBe(false);
		});
	});

	describe(rules.noUnderscore.name, () => {
		it("should fail when 'underscore' is part of the string", () => {
			expect(rules.noUnderscore("register_service", MESSAGE_PART).failed).toBe(true);
		});

		it("should not fail when there is no 'underscore' in the string", () => {
			expect(rules.noUnderscore("register service", MESSAGE_PART).failed).toBe(false);
		});
	});

	describe(rules.noSpace.name, () => {
		it("should fail when 'space' is part of the string", () => {
			expect(rules.noSpace("register service", MESSAGE_PART).failed).toBe(true);
		});

		it("should not fail when there is no 'space' in the string", () => {
			expect(rules.noSpace("registerService", MESSAGE_PART).failed).toBe(false);
		});
	});

	describe(rules.noCamelCase.name, () => {
		it("should fail when text is in CamelCase", () => {
			expect(rules.noCamelCase("registerService", MESSAGE_PART).failed).toBe(true);
		});

		it("should not fail when text is not in CamelCase", () => {
			expect(rules.noCamelCase("register-service", MESSAGE_PART).failed).toBe(false);
		});
	});

	describe(rules.noKebabCase.name, () => {
		it("should fail when text is in KebabCase", () => {
			expect(rules.noKebabCase("registe-service", MESSAGE_PART).failed).toBe(true);
		});

		it("should not fail when text is not in KebabCase", () => {
			expect(rules.noKebabCase("registerService", MESSAGE_PART).failed).toBe(false);
		});
	});

	describe(rules.noUpperFirst.name, () => {
		it("should fail when first character is UpperCase", () => {
			expect(rules.noUpperFirst("Register", MESSAGE_PART).failed).toBe(true);
		});

		it("should not fail when first character is not UpperCase", () => {
			expect(rules.noUpperFirst("register", MESSAGE_PART).failed).toBe(false);
		});
	});

	describe(rules.noLowerFirst.name, () => {
		it("should fail when first character is LowerCase", () => {
			expect(rules.noLowerFirst("register", MESSAGE_PART).failed).toBe(true);
		});

		it("should not fail when first character is not LowerCase", () => {
			expect(rules.noLowerFirst("Register", MESSAGE_PART).failed).toBe(false);
		});
	});

	describe(rules.noPeriodAtEnd.name, () => {
		it("should fail when last character is period", () => {
			expect(rules.noPeriodAtEnd("register.", MESSAGE_PART).failed).toBe(true);
		});

		it("should not fail when last character is not a period", () => {
			expect(rules.noPeriodAtEnd("register", MESSAGE_PART).failed).toBe(false);
		});
	});

});