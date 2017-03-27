import { readFileSync, writeFileSync } from "fs";

const pkgContents = JSON.parse(readFileSync("./package.json", "utf-8"));

const scripts = { ...pkgContents.scripts, ...{
	postinstall: "node ./dist/installer install",
	preuninstall: "node ./dist/installer uninstall"
}};

writeFileSync("./package.json", JSON.stringify({
	...pkgContents, scripts
}, null, 2));