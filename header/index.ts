import {GmFunctions, RunAt, UserScript} from "./UserScript";
import build from "./build";

// ==UserScript==
// @name         原神玩家指示器
// @namespace    www.cber.ltd
// @version      0.6.1
// @description  B站评论区自动标注原神玩家，依据是动态里是否有原神相关内容
// @author       xulaupuz
// @match        https://www.bilibili.com/video/*
// @icon         https://static.hdslb.com/images/favicon.ico
// @connect      bilibili.com
// @grant        GM_xmlhttpRequest
// @license MIT
// @run-at document-end
// ==/UserScript==

const script: UserScript = {
  name: "原神玩家指示器 - 改",
  namespace: "https://github.com/Dustin-Jiang/genshin-player-indicator",
  description: "B站评论区自动标注原神玩家，依据是动态里是否有原神相关内容",
  author: "xulaupuz, Dustin Jiang",
  version: "0.6.1",
  matches: [
    "https://www.bilibili.com/video/*"
  ],
  icon: "https://static.hdslb.com/images/favicon.ico",
  grants: [GmFunctions.xmlhttpRequest],
  license: "MIT",
  runAt: RunAt.document_end,
};

build(script,'app_header.js')
