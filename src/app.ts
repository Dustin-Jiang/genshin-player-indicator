export const DEFAULT_PLAYER_LIST: IPlayerList = {
  genshin: {
    keyword: "原神",
    nickname: "原神玩家",
  },
};

const PLAYER_KEYS : ("genshin" /*//TODO:| "arknights"*/)[] = [
  "genshin"/*,
  "arknights"*/
]

export type PlayerKeys = typeof PLAYER_KEYS[number] //TODO: | "arknights"

// 实现
import { Theme, getIndicator } from "./assets/config"
import * as _ from "lodash"
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

const blog =
  "https://api.bilibili.com/x/polymer/web-dynamic/v1/feed/space?&host_mid=";

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
      for (let i of document.getElementsByClassName("user-name")) {
        userList.add(i as INewVersionUser);
      }
      for (let i of document.getElementsByClassName("sub-user-name")) {
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
        commentlist.forEach((user: INewVersionUser | IOldVersionUser) => {
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
          } else if (this.notPlayer.has(pid)) {
            // do nothing
            return;
          }

          // 未知用户，开始查找
          this.unknown.add(pid);
          let blogurl = blog + pid;
          GM_xmlhttpRequest({
            method: "GET",
            url: blogurl,
            data: "",
            headers: {
              "user-agent":
                "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/104.0.0.0 Safari/537.36",
            },
            onload: (res) => {
              if (res.status === 200) {
                let response = JSON.stringify(JSON.parse(res.response).data);
                let userInfo = new Map(
                  _.zip(
                    PLAYER_KEYS,
                    _.fill(Array(PLAYER_KEYS.length), false)
                  ) as [PlayerKeys, boolean][]
                );
                this.unknown.delete(pid);

                // Flag确定是否为玩家
                let haveChange = false
                for (let type of PLAYER_KEYS) {
                  let keyword = DEFAULT_PLAYER_LIST[type]["keyword"];
                  if (response.includes(keyword)) {
                    haveChange = true
                    userInfo.set(type, true)
                  }
                }
                if (haveChange) {
                  this.isPlayer.set(pid, userInfo)
                } else {
                  this.notPlayer.add(pid)
                }
              } else {
                console.log("失败");
                console.log(res);
              }
            },
          });
        });
      }
    }, 4000);
  }
}
