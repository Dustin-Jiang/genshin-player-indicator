export const DEFAULT_PLAYER_LIST: IPlayerList = {
  genshin: {
    keyword: "原神",
    nickname: "原神玩家",
  },
  arkNights: {
    keyword: "明日方舟",
    nickname: "方舟玩家"
  }
};

const PLAYER_KEYS : ("genshin" | "arkNights")[] = [
  "genshin",
  "arkNights"
]

export type PlayerKeys = typeof PLAYER_KEYS[number]

// 实现
import { Theme, getIndicator } from "./assets/config"
import * as _ from "lodash"
import { getUserActivityList, getUserSubscribeList } from "./utils/api";
import PluginGenshinImpact from "./plugins/genshinImpact";
import PluginArkNights from "./plugins/arkNights";
import { Plugin } from "./plugins";

const PLUGINS: {
  [k: string]: Plugin;
} = {
  genshin: new PluginGenshinImpact(),
  arkNights: new PluginArkNights(),
};

interface INewVersionUser extends HTMLElement {
  dataset: {
    userId: UserId;
  };
  textContent: string;
}

interface IOldVersionUser extends HTMLElement {
  dataset: {
    "usercard-mid": UserId;
  };
  textContent: string;
}

export interface IPlayerList {
  [k: string]: {
    keyword: string;
    nickname: string;
  };
}

type UserId = string;
type HTMLCode = string;

type UserInfo = Map<PlayerKeys, boolean>


export default class App {
  unknown: Set<UserId> = new Set();
  isPlayer: Map<UserId, UserInfo> = new Map();
  notPlayer: Set<UserId> = new Set();
  
  isNewVersionBilibili : boolean

  getIndicator : (type: PlayerKeys, theme: Theme) => HTMLCode
  theme: Theme
  playerList: IPlayerList

  constructor(theme?: Theme) {
    this.isNewVersionBilibili = document.getElementsByClassName("item goback").length != 0; // 检测是不是新版

    this.getIndicator = getIndicator;
    (theme !== undefined) ? this.theme = theme : this.theme = new Theme()
    this.playerList = DEFAULT_PLAYER_LIST //TODO: 以后可以自定义
  }

  getPid(c: INewVersionUser | IOldVersionUser): UserId {
    if (this.isNewVersionBilibili) {
      return (c as INewVersionUser).dataset["userId"];
    } else {
      return (c as IOldVersionUser).dataset["usercard-mid"];
    }
  }

  getCommentList() {
    if (this.isNewVersionBilibili) {
      let userList: Set<INewVersionUser> = new Set();
      for (let i of document.querySelectorAll("div#comment .user-name")) {
        userList.add(i as INewVersionUser);
      }
      for (let i of document.querySelectorAll("div#comment .sub-user-name")) {
        userList.add(i as INewVersionUser);
      }
      return userList;
    } else {
      let userList: Set<IOldVersionUser> = new Set();
      for (let i of document.querySelectorAll(".user > a.name")) {
        userList.add(i as IOldVersionUser);
      }
      return userList;
    }
  }

  // 开始检测
  check() {
    let check = setInterval(() => {
      let commentlist = this.getCommentList();
      if (commentlist.size !== 0) {
        commentlist.forEach(async (user: INewVersionUser | IOldVersionUser) => {
          let pid = this.getPid(user);

          // 检查是否为玩家
          // 已缓存，确认是玩家
          if (this.isPlayer.has(pid)) {
            // 添加Tag
            for (let type of PLAYER_KEYS) {
              let indicator = getIndicator(type, this.theme)
              if (
                !user.textContent.includes(this.playerList[type].nickname) &&
                this.isPlayer.get(pid).get(type)
              ) {
                user.innerHTML += indicator;
              }
            }
            return;
          }
          // 已缓存，确认非玩家
          if (this.notPlayer.has(pid)) {
            return ;
          }

          // 未知用户，开始查找
          this.unknown.add(pid);

          // 拉取用户信息
          // 视频信息容易被风控，在插件中条件拉取
          let activityList = await getUserActivityList(pid)
          let subscribeList = await getUserSubscribeList(pid)

          let userInfo = new Map(
            _.zip(
              PLAYER_KEYS,
              _.fill(Array(PLAYER_KEYS.length), false)
            ) as [PlayerKeys, boolean][]
          );
          this.unknown.delete(pid);

          // Flag确定是否为玩家
          let haveChange = false

          // 逐个插件查找
          for (let type of PLAYER_KEYS) {
            let plugin = PLUGINS[type]
            let checkResult = plugin.check({
              uid: pid,
              activityList,
              subscribeList
            });
            if (checkResult) {
              userInfo.set(type, await checkResult)
              haveChange = true
            }
          }
          if (haveChange) {
            this.isPlayer.set(pid, userInfo)
          }
          else {
            this.notPlayer.add(pid)
          }
        })
      }
    }, 4000)
  }
}
