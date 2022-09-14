import { GmFunctions, RunAt, UserScript } from "./UserScript";
import build from "./build";
import gitSemverTags = require("git-semver-tags");

gitSemverTags((err, tags) => {
  // Make `v0.6.0` to `0.6.0`
  let latestVersion = tags[0].substring(1);
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
  };

  build(script, "app_header.js");
});
