import { Rules } from "./rules";
import { CommitMessagePart } from "./rules.model";

describe("rulesSpec", () => {
	const MESSAGE_PART: CommitMessagePart = "Type";
	const COMMIT_MSG = "style(all): formatting";

	describe(Rules.noUnscoped.name, () => {
		it("should fail when commit message is not scope", () => {
			expect(Rules.noUnscoped("unscoped message").failed).toBe(true);
		});

		it("should not fail when commit message is not scope", () => {
			expect(Rules.noUnscoped(COMMIT_MSG).failed).toBe(false);
		});
	});

	describe(Rules.maxLength.name, () => {
		it("should fail when commit message length is exceeds the limit", () => {
			expect(Rules.maxLength(COMMIT_MSG, MESSAGE_PART, 2).failed).toBe(true);
		});

		it("should not fail when commit message length is within the limit", () => {
			expect(Rules.maxLength(COMMIT_MSG, MESSAGE_PART, 999).failed).toBe(false);
		});
	});

	describe(Rules.validTypes.name, () => {
		it("should fail when 'type' is not valid", () => {
			expect(Rules.validTypes(COMMIT_MSG, MESSAGE_PART, ["test", "refactor"]).failed).toBe(true);
		});

		it("should not fail when 'type' is valid", () => {
			expect(Rules.validTypes(COMMIT_MSG, MESSAGE_PART, ["test", "style"]).failed).toBe(false);
		});
	});

	describe(Rules.noDash.name, () => {
		it("should fail when 'dash' is part of the string", () => {
			expect(Rules.noDash("register-service", MESSAGE_PART).failed).toBe(true);
		});

		it("should not fail when there is no 'dash' in the string", () => {
			expect(Rules.noDash("register service", MESSAGE_PART).failed).toBe(false);
		});
	});

	describe(Rules.noUnderscore.name, () => {
		it("should fail when 'underscore' is part of the string", () => {
			expect(Rules.noUnderscore("register_service", MESSAGE_PART).failed).toBe(true);
		});

		it("should not fail when there is no 'underscore' in the string", () => {
			expect(Rules.noUnderscore("register service", MESSAGE_PART).failed).toBe(false);
		});
	});

	describe(Rules.noSpace.name, () => {
		it("should fail when 'space' is part of the string", () => {
			expect(Rules.noSpace("register service", MESSAGE_PART).failed).toBe(true);
		});

		it("should not fail when there is no 'space' in the string", () => {
			expect(Rules.noSpace("registerService", MESSAGE_PART).failed).toBe(false);
		});
	});

	describe(Rules.noCamelCase.name, () => {
		it("should fail when text is in CamelCase", () => {
			expect(Rules.noCamelCase("registerService", MESSAGE_PART).failed).toBe(true);
		});

		it("should not fail when text is not in CamelCase", () => {
			expect(Rules.noCamelCase("register-service", MESSAGE_PART).failed).toBe(false);
		});
	});

	describe(Rules.noKebabCase.name, () => {
		it("should fail when text is in KebabCase", () => {
			expect(Rules.noKebabCase("registe-service", MESSAGE_PART).failed).toBe(true);
		});

		it("should not fail when text is not in KebabCase", () => {
			expect(Rules.noKebabCase("registerService", MESSAGE_PART).failed).toBe(false);
		});
	});

	describe(Rules.noUpperFirst.name, () => {
		it("should fail when first character is UpperCase", () => {
			expect(Rules.noUpperFirst("Register", MESSAGE_PART).failed).toBe(true);
		});

		it("should not fail when first character is not UpperCase", () => {
			expect(Rules.noUpperFirst("register", MESSAGE_PART).failed).toBe(false);
		});
	});

	describe(Rules.startWithSpace.name, () => {
		it("should fail when first character is not a space", () => {
			expect(Rules.startWithSpace("register", MESSAGE_PART).failed).toBe(true);
		});

		it("should not fail when first character is a space", () => {
			expect(Rules.startWithSpace(" register", MESSAGE_PART).failed).toBe(false);
		});
	});

	describe(Rules.noLowerFirst.name, () => {
		it("should fail when first character is LowerCase", () => {
			expect(Rules.noLowerFirst("register", MESSAGE_PART).failed).toBe(true);
		});

		it("should not fail when first character is not LowerCase", () => {
			expect(Rules.noLowerFirst("Register", MESSAGE_PART).failed).toBe(false);
		});
	});

	describe(Rules.noPeriodAtEnd.name, () => {
		it("should fail when last character is period", () => {
			expect(Rules.noPeriodAtEnd("register.", MESSAGE_PART).failed).toBe(true);
		});

		it("should not fail when last character is not a period", () => {
			expect(Rules.noPeriodAtEnd("register", MESSAGE_PART).failed).toBe(false);
		});
	});

});