import { mkdirSync, lstatSync, Stats, renameSync, constants, unlinkSync, writeFileSync, existsSync } from "fs";
import * as path from "path";
import { fileSystem } from "@speedy/node-core";

const gitRoot = fileSystem.findFileRecursively(".git");

if (!gitRoot) {
	console.warn("Not a GIT Repository");
	process.exit();
}

const gitPath = path.join(gitRoot!, ".git");
if (!lstatSync(gitPath).isDirectory()) {
	console.warn(".git is not a folder. Commit message hook will not be installed.");
	process.exit();
}

const hooksPath = path.join(gitPath, "hooks");
const commitMsgHookPath = path.join(hooksPath, "commit-msg");
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
		} else {
			uninstall();
		}
	} else {
		mkdirSync(hooksPath);
	}

	// windows require must contain only forward slashes
	const hookPath = path.join(__dirname, "hook.js").split(path.sep).join("/");
	const hookContent = `#!/usr/bin/env node
						require("${hookPath}");`;

	writeFileSync(commitMsgHookPath, hookContent, { mode: constants.S_IRWXU });
}

function uninstall() {
	if (fileStat) {
		unlinkSync(commitMsgHookPath);
	}
}
