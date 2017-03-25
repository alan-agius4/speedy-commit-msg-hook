import { readFileSync, writeFileSync } from "fs";

const pkgContents = JSON.parse(readFileSync("./package.json", "utf-8"));

const scripts = { ...pkgContents.scripts, ...{
	install: "node ./dist/install.js",
	uninstall: "node ./dist/uninstall.js"
}};

writeFileSync("./package.json", JSON.stringify({
	...pkgContents, scripts
}, null, 4));