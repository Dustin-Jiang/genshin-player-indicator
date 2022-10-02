// 默认部分
const DEFAULT_TAG : HTMLCode = "span"
const DEFAULT_STYLE : CSSCode = "padding: 1px 5px; font-size: 0.677rem; border-radius: 2px; margin-left: 5px; "
const DEFAULT_COLOR_LIST: IColorList = {
  genshin: {
    bgColor: "rgb(57, 201, 236)",
    fgColor: "rgb(255, 255, 255)",
  },
  arkNights: {
    bgColor: "rgb(28, 34, 32)",
    fgColor: "rgb(255, 255, 255)",
  },
};

// 实现

import { DEFAULT_PLAYER_LIST, IPlayerList, PlayerKeys } from "../config"
type Indicators = PlayerKeys
export type HTMLCode = string
type CSSCode = string
type Color = string

interface IColorList {
  [k: string]: {
    fgColor: Color,
    bgColor: Color
  }
}

// 主题
export class Theme {
  tag: HTMLCode
  style: CSSCode
  colors: IColorList
  playerList: IPlayerList
  constructor(
    tag?: HTMLCode,
    style?: CSSCode,
    colors?: IColorList,
    nicknames?: IPlayerList
  ) {
    this.tag = DEFAULT_TAG
    this.style = DEFAULT_STYLE
    this.colors = DEFAULT_COLOR_LIST
    this.playerList = DEFAULT_PLAYER_LIST
    if (tag !== undefined) this.tag = tag
    if (colors !== undefined) this.colors = colors
    if (style !== undefined) this.style = style
    if (nicknames !== undefined) this.playerList = nicknames
  }
  get(type: Indicators) : HTMLCode {
    return `${this.style} background-color: ${this.colors[type].bgColor}; color: ${this.colors[type].fgColor};"`
  }
}

export function getIndicator(
  type: Indicators,
  theme: Theme
) : HTMLCode{
  return `<${theme.tag} style="${theme.get(type)}>${theme.playerList[type].nickname}</${theme.tag}>`
}