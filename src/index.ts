#!/usr/bin/env node

import { Validator } from "./validator/validator";

Validator
	.validate()
	.catch(error => {
		console.log(`\n${error}\n`);
		process.exit(1);
	});