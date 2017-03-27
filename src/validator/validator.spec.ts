import * as _ from "lodash";

import * as config from "../config";
import { Validator } from "./validator";

describe("validateSpec", () => {
	const CONFIG: config.ConfigData = {
		"rules": {
			"message": {
				"no-unscoped": false
			},
			"type": {
				"valid-types": [
					"chore",
					"feat"
				]
			},
			"scope": {
				"no-dash": true
			}
		}
	};

	async function validateWrapper(commitMsg: string): Promise<undefined | string> {
		try {
			await Validator.validate(commitMsg);
			return undefined;
		} catch (error) {
			return error;
		}
	}

	beforeEach(() => {
		spyOn(config, "getConfigFilePath").and.stub();
	});

	describe(Validator.validate.name, () => {
		describe("Given 'noUnscoped' is true", () => {
			beforeEach(() => {
				spyOn(config, "getConfig").and.returnValue(_.merge({}, CONFIG, {
					rules: {
						message: {
							noUnscoped: true
						}
					}
				}));
			});

			describe("and commit message is unscoped", () => {
				it("should not be valid", async done => {
					expect(await validateWrapper("changes in develop")).toMatch("Unscoped commit messages are not allowed");
					done();
				});
			});
		});

		describe("Given 'noUnscoped' is false", () => {
			beforeEach(() => {
				spyOn(config, "getConfig").and.returnValue(CONFIG);
			});

			describe("and commit message is unscoped", () => {
				it("should be valid", async done => {
					expect(await validateWrapper("changes in develop")).toBeUndefined();
					done();
				});
			});

			describe("and commit message has an invalid scope format", () => {
				it("should not be valid 'invalid(scope):invalid'", async done => {
					expect(await validateWrapper("invalid(scope):invalid")).toMatch("Commit message 'header' must be in this format");
					done();
				});

				it("should not be valid 'invalid (scope):invalid'", async done => {
					expect(await validateWrapper("invalid (scope):invalid")).toMatch("Commit message 'header' must be in this format");
					done();
				});
			});
		});

		describe("Given 'validTypes' is set", () => {
			beforeEach(() => {
				spyOn(config, "getConfig").and.returnValue(CONFIG);
			});

			describe("and 'Type' is valid", () => {
				it("should be valid", async done => {
					expect(await validateWrapper("chore(scope): valid")).toBeUndefined();
					done();
				});
			});

			describe("and 'Type' is invalid", () => {
				it("should not be valid", async done => {
					expect(await validateWrapper("invalid(scope): invalid")).toMatch("Commit 'Type' is not valid.");
					done();
				});
			});
		});

		describe("Given 'noDash' is set in 'scope'", () => {
			beforeEach(() => {
				spyOn(config, "getConfig").and.returnValue(CONFIG);
			});

			describe("and 'Scope' has no dash", () => {
				it("should be valid", async done => {
					expect(await validateWrapper("chore(scope service): valid")).toBeUndefined();
					done();
				});
			});

			describe("and 'Scope' has a dash", () => {
				it("should not be valid", async done => {
					expect(await validateWrapper("chore(scope-service): invalid")).toMatch("Commit 'Scope' cannot contain dashes");
					done();
				});
			});
		});

	});


});