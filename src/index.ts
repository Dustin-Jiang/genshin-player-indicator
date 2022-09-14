// ==UserScript==
// @name         原神玩家指示器
// @namespace    www.cber.ltd
// @version      0.6
// @description  B站评论区自动标注原神玩家，依据是动态里是否有原神相关内容
// @author       xulaupuz
// @match        https://www.bilibili.com/video/*
// @icon         https://static.hdslb.com/images/favicon.ico
// @connect      bilibili.com
// @grant        GM_xmlhttpRequest
// @license MIT
// @run-at document-end
// ==/UserScript==

import App from "./app"

(function () {
  "use strict";
  let app = new App()
  app.check()
})();