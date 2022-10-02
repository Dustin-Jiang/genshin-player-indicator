import { Plugin } from "./plugins";
import PluginGenshinImpact from "./plugins/genshinImpact";
import PluginArkNights from "./plugins/arkNights";

// 启用的插件
export const PLUGINS: {
  [k: string]: Plugin;
} = {
  genshin: new PluginGenshinImpact(),
  arkNights: new PluginArkNights(),
};

export interface IPlayerList {
  [k: string]: {
    keyword: string;
    nickname: string;
  };
}

export const DEFAULT_PLAYER_LIST: IPlayerList = {
  genshin: {
    keyword: "原神",
    nickname: "原神玩家",
  },
  arkNights: {
    keyword: "明日方舟",
    nickname: "方舟玩家",
  },
};

export const PLAYER_KEYS: ("genshin" | "arkNights")[] = [
  "genshin",
  "arkNights",
];

export type PlayerKeys = typeof PLAYER_KEYS[number];