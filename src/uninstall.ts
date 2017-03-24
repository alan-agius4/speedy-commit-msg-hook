import { lstatSync, unlinkSync } from "fs";
import { join } from "path";

import { findFileRecursively } from "./utils";

const gitRoot = findFileRecursively(".git");

if (!gitRoot) {
	process.exit(0);
}

const hooksPath = join(gitRoot!, ".git", "hooks");
const commitMsgHookPath = join(hooksPath, "commit-msg");
const fileStat = lstatSync(commitMsgHookPath);

if (fileStat.isSymbolicLink()) {
	unlinkSync(commitMsgHookPath);
}