import * as _ from "lodash";
import { readFile, statSync } from "fs";
import { join, sep, normalize } from "path";

let _rootPath: string | null;
export function getRootPath(): string {
	if (!_.isNil(_rootPath)) {
		return _rootPath;
	}

	_rootPath = findFileRecursively();
	if (!_rootPath) {
		_rootPath = "";
	}

	return _rootPath;
}

export function readFileAsync(path: string): Promise<string> {
	return new Promise((resolve, reject) => {
		readFile(path, "utf-8", (error, data) => {
			if (error) {
				return reject(error);
			}

			return resolve(data);
		});
	});
}

export async function readJsonFileAsync<T>(path: string): Promise<T> {
	return JSON.parse(await readFileAsync(path));
}

export async function getCommitMessage(): Promise<string> {
	const result = await readFileAsync(process.argv[2]);

	if (!result) {
		throw new Error("No commit message provided.");
	}

	return result.split("\n", 1)[0];
}


/**
 * Find a file recursively in the file system from the starting path upwards.
 *
 * Defaults: fileName: package.json, startPath: process.cwd()
 *
 * @export
 * @param {string} [path="package.json"]
 * @param {string} [startPath=process.cwd()]
 * @returns {(string | null)}
 */
export function findFileRecursively(path = "package.json", startPath = process.cwd()): string | null {
	startPath = normalize(startPath);

	try {
		const directory = join(startPath, sep);
		statSync(join(directory, path));
		return directory;
	} catch (error) {
		// do nothing
	}

	let position = _.lastIndexOf(startPath, sep);
	if (position < 0) {
		return null;
	}

	const truncatedPath = startPath.substr(0, position++);
	return findFileRecursively(path, truncatedPath);
}