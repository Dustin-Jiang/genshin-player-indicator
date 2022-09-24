import { Plugin, IUserInfo } from ".";

export default class PluginGenshinImpact extends Plugin {
  name: "genshin";

  private keywords = [
    "提瓦特",
    "蒙德",
    "璃月",
    "稻妻",
    "须弥",
    "枫丹廷",
    "纳塔",
    "至冬国",
    "原神",
    "旅行者",
    "派蒙",
    "西风骑士团",
    "安柏",
    "丽莎",
    "凯亚",
    "芭芭拉",
    "迪卢克",
    "雷泽",
    "温迪",
    "可莉",
    "班尼特",
    "诺艾尔",
    "菲谢尔",
    "砂糖",
    "莫娜",
    "迪奥娜",
    "阿贝多",
    "罗莎莉亚",
    "优菈",
    "魈",
    "凝光",
    "香菱",
    "行秋",
    "重云",
    "刻晴",
    "七七",
    "钟离",
    "辛焱",
    "甘雨",
    "胡桃",
    "烟绯",
    "申鹤",
    "云堇",
    "夜兰",
    "神里绫华",
    "枫原万叶",
    "宵宫",
    "早柚",
    "雷电将军",
    "九条裟罗",
    "珊瑚宫心海",
    "托马",
    "荒泷一斗",
    "八重神子",
    "神里绫人",
    "久岐忍",
    "鹿野院平藏",
    "提纳里",
    "柯莱",
    "多莉",
    "赛诺",
    "妮露",
    "坎蒂丝",
    "埃尔海森",
    "迪希雅",
    "纳西妲",
    "达达利亚",
    "埃洛伊",
  ]
  private genshinUps = new Map([
    [
      "401742377",
      {
        name: "原神",
        weight: 0.7,
      },
    ],
    [
      "1560041",
      {
        name: "永恒的贝多芬",
        weight: 0.15,
      },
    ],
    [
      "321594763",
      {
        name: "黑椒糖唯酢",
        weight: 0.15,
      },
    ],
    [
      "431073645",
      {
        name: "你的影月月",
        weight: 0.2,
      },
    ],
    [
      "1773346",
      {
        name: "莴苣某人",
        weight: 0.2,
      },
    ],
    [
      "7817472",
      {
        name: "某声悠",
        weight: 0.1,
      },
    ],
    [
      "80304",
      {
        name: "亚食人",
        weight: 0.05,
      },
    ],
  ]);
  constructor() {
    super();
  }
  check(info: IUserInfo): boolean {
    this.subscribeList = info.subscribeList;
    this.activityList = info.activityList;

    let sum = 0;

    // 是否有原神Up
    let haveGenshinUp = false;

    // 是否屏蔽关注列表
    let forbiddenFollowers = this.subscribeList.length === 0;

    for (let subscribe of this.subscribeList) {
      if (this.genshinUps.has(subscribe.mid.toString())) {
        haveGenshinUp = true;
        sum += this.genshinUps.get(subscribe.mid.toString()).weight;
      }
    }

    // 没有屏蔽的情况下没有关注相关Up
    // 优化 直接判断为非玩家
    if (!haveGenshinUp && !forbiddenFollowers) {
      return false
    }

    // 关注了相关Up 或者 屏蔽了关注列表
    for (let activity of this.activityList) {
      // 转发动态
      if (activity.type === "DYNAMIC_TYPE_FORWARD") {
        let forwardedActivity = activity.orig;
        let forwardedFromUser =
          forwardedActivity.modules.module_author.mid.toString();

        // 转发原神Up主的动态
        if (this.genshinUps.has(forwardedFromUser)) {
          sum += this.genshinUps.get(forwardedFromUser).weight;
          continue;
        }
      } else {
        // 不是转发
        // 话题检测
        let activityTopic = activity.modules.module_dynamic.topic;
        if (this.checkKeywords(activityTopic.name)) {
          sum += 0.2;
        }
        // 检测视频
        if (
          activity.type === "DYNAMIC_TYPE_AV" &&
          activity.modules.module_dynamic.major.type === "MAJOR_TYPE_ARCHIVE"
        ) {
          let { desc, title } = activity.modules.module_dynamic.major.archive;
          if (this.checkKeywords(desc) || this.checkKeywords(title)) {
            sum += 0.6;
          }
        }

        // 动态
        if (
          activity.type === "DYNAMIC_TYPE_DRAW" ||
          activity.type === "DYNAMIC_TYPE_WORD"
        ) {
          let text = activity.modules.module_dynamic.desc.text;
          if (this.checkKeywords(text, 2)) {
            // 确定有关键词
            if (this.activityList.length < 10) {
              // 动态不多
              // 宁杀不放
              return true
            }
            else {
              // 动态多
              sum += 0.4
            }
          }
        }
      }
    }

    return sum >= 1;
  }

  private checkKeywords(payload: string, targetTimes?: number): boolean {
    // 查找次数，默认1个
    targetTimes = targetTimes ? targetTimes : 1;

    for (let keyword of this.keywords) {
      if (payload.indexOf(keyword)) {
        targetTimes -= 1;
      }
      if (targetTimes === 0) {
        break;
      }
    }

    return targetTimes === 0;
  }
}
