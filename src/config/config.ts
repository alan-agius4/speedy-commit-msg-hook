import * as _ from "lodash";
import { existsSync } from "fs";
import { isAbsolute, join } from "path";

import { readJsonFileAsync, getRootPath } from "../utils";
import { ConfigData } from "./config.model";

export async function getConfig(filePath: string): Promise<ConfigData> {
	let config = await readJsonFileAsync<ConfigData>(filePath);

	if (_.isEmpty(config.extends)) {
		return config;
	}

	const configExtends = _.castArray<string>(config.extends);

	for (const path of configExtends) {
		config = _.merge(config, await getConfig(path));
	}

	return config;
}

export function getConfigFilePath(file: string): string {
	if (isAbsolute(file)) {
		return file;
	}

	const path = join(getRootPath(), file);

	if (existsSync(path)) {
		return path;
	}

	return join(__dirname, "../../config", file);
}