import { GmFunctions, RunAt, UserScript } from "./UserScript";
import build from "./build";
import gitSemverTags = require("git-semver-tags");
import { readFile, writeFile } from "fs/promises";

gitSemverTags(async (err, gitTags) => {
  let data = await readFile("package.json", {
    encoding: "utf-8",
  });
  let packageInfo = JSON.parse(data);
  let npmLatestVersion: string = packageInfo["version"];
  // Make `v0.6.0` to `0.6.0`
  let gitLatestVersion = "0.0.0";
  if (gitTags && typeof gitTags[0] === "string")
    gitLatestVersion = gitTags[0].substring(1);
  console.log(`Git: ${gitLatestVersion}`);
  console.log(`NPM: ${npmLatestVersion}`);

  let latestVersion = npmLatestVersion;
  if (gitLatestVersion && gitLatestVersion > npmLatestVersion) {
    latestVersion = gitLatestVersion;
    packageInfo["version"] = gitLatestVersion;
    writeFile("package.json", JSON.stringify(packageInfo, null, 2)).then(
      () => {},
      (err) => {
        throw err;
      }
    );
  }
  const script: UserScript = {
    name: "原神玩家指示器 - 改",
    namespace: "https://github.com/Dustin-Jiang/genshin-player-indicator",
    description: "B站评论区自动标注原神玩家，依据是动态里是否有原神相关内容",
    author: "xulaupuz, Dustin Jiang",
    version: latestVersion,
    matches: ["https://www.bilibili.com/video/*"],
    icon: "https://static.hdslb.com/images/favicon.ico",
    grants: [GmFunctions.xmlhttpRequest],
    license: "MIT",
    runAt: RunAt.document_end,
    connect: ["api.bilibili.com"],
  };

  build(script, "app_header.js");
});
