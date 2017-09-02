import { validator } from "./validator";

validator
	.validate()
	.catch(error => {
		console.error(`\n${error}\n`);
		process.exit(1);
	});