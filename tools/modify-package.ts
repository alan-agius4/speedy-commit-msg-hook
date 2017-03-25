import { readFileSync, writeFileSync } from "fs";

const pkgContents = JSON.parse(readFileSync("./package.json", "utf-8"));

const scripts = { ...pkgContents.scripts, ...{
	install: "node ./dist/installer install",
	uninstall: "node ./dist/installer uninstall"
}};

writeFileSync("./package.json", JSON.stringify({
	...pkgContents, scripts
}, null, 4));