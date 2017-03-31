import { mkdirSync, lstatSync, Stats, renameSync, unlinkSync, symlinkSync, existsSync } from "fs";
import { join } from "path";
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
		uninstall();

		if (fileStat && fileStat.isFile()) {
			renameSync(commitMsgHookPath, `${commitMsgHookPath}.backup`);
		}
	} else {
		mkdirSync(hooksPath);
	}

	symlinkSync(join(__dirname, "hook.js"), commitMsgHookPath);
}

function uninstall() {
	if (fileStat && fileStat.isSymbolicLink()) {
		unlinkSync(commitMsgHookPath);
	}
}