import { mkdirSync, lstatSync, Stats, renameSync, constants, unlinkSync, writeFileSync, existsSync } from "fs";
import { join, resolve } from "path";
import { fileSystem } from "@speedy/node-core";

const gitRoot = fileSystem.findFileRecursively(".git");

if (!gitRoot) {
	console.log("Not a GIT Repository");
	process.exit(0);
}

const hooksPath = join(gitRoot!, ".git", "hooks");
const commitMsgHookPath = join(hooksPath, "commit-msg");
let fileStat: Stats | undefined;

try {
	fileStat = lstatSync(commitMsgHookPath);
} catch (error) {
	// do nothing
}

if (process.argv[2] === "uninstall") {
	uninstall();
} else {
	install();
}

function install() {
	if (existsSync(hooksPath)) {
		if (fileStat && fileStat.isFile()) {
			renameSync(commitMsgHookPath, `${commitMsgHookPath}.backup`);
		}

		uninstall();
	} else {
		mkdirSync(hooksPath);
	}

	const hookContent = `#!/usr/bin/env node
						require("${resolve(commitMsgHookPath, __dirname, "hook.js")}");`;

	writeFileSync(commitMsgHookPath, hookContent, { mode: constants.S_IRWXU });
}

function uninstall() {
	if (fileStat) {
		unlinkSync(commitMsgHookPath);
	}
}