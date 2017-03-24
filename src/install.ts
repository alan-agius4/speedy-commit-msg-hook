import { lstatSync, renameSync, unlinkSync, symlinkSync } from "fs";
import { join } from "path";

import { findFileRecursively } from "./utils";

const gitRoot = findFileRecursively(".git");

if (!gitRoot) {
	console.log("Not a GIT Repository");
	process.exit(0);
}

const hooksPath = join(gitRoot!, ".git", "hooks");
const commitMsgHookPath = join(hooksPath, "commit-msg");
const fileStat = lstatSync(commitMsgHookPath);

if (fileStat.isSymbolicLink()) {
	unlinkSync(commitMsgHookPath);
}

if (fileStat.isFile()) {
	renameSync(commitMsgHookPath, `${commitMsgHookPath}.backup`);
}

symlinkSync(join(__dirname, "hook.js"), commitMsgHookPath);