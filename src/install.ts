import { lstatSync, Stats, renameSync, unlinkSync, symlinkSync } from "fs";
import { join } from "path";

import { findFileRecursively } from "./utils";

const gitRoot = findFileRecursively(".git");

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
	//do nothing
}

if (fileStat && fileStat.isSymbolicLink()) {
	unlinkSync(commitMsgHookPath);
}

if (fileStat && fileStat.isFile()) {
	renameSync(commitMsgHookPath, `${commitMsgHookPath}.backup`);
}

symlinkSync(join(__dirname, "hook.js"), commitMsgHookPath);