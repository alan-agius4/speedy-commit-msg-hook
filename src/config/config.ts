import * as _ from "lodash";
import { existsSync } from "fs";
import { dirname, isAbsolute, resolve, join } from "path";

import { readJsonFileAsync, getRootPath } from "../utils";
import { ConfigData } from "./config.model";

export async function extendsConfig(config: ConfigData, configFilePath: string): Promise<ConfigData> {
	const configExtends = _.castArray<string>(config.extends);

	if (!configExtends) {
		return config;
	}

	const configPath = dirname(configFilePath);
	const configObject = config;

	for (const path of configExtends) {
		const result = await readJsonFileAsync<ConfigData>(resolve(configPath, path));
		Object.assign(configObject.rules, result.rules);
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