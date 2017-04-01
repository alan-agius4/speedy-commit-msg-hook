import { validator } from "./validator";

validator
	.validate()
	.catch(error => {
		console.log(`\n${error}\n`);
		process.exit(1);
	});