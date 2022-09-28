import { Plugin, IUserInfo } from ".";
import { getUserVideoList } from "../utils/api";

export default class PluginArkNights extends Plugin {
  name: "arkNights";

  private keywords = [
    // 游戏术语
    "黄票",
    "红票",
    "绿票",
    "白票",
    "蓝票",
    // 游戏内地名
    "罗德岛",
    "乌萨斯",
    "企鹅物流",
    // 其他
    "明日方舟",
    "刀客塔",
    "鹰角",
    "海猫",
    "法老",
    "抄作业",
    // 角色
    "焰尾",
    "推进之王",
    "嵯峨",
    "风笛",
    "琴柳",
    "格拉尼",
    "野鬃",
    "凛冬",
    "贾维",
    "苇草",
    "夜半",
    "晓歌",
    "德克萨斯",
    "极境",
    "百炼嘉维尔",
    "耀骑士临光",
    "斯卡蒂",
    "赫拉格",
    "帕拉斯",
    "银灰",
    "棘刺",
    "玛恩纳",
    "史尔特尔",
    "艾丽妮",
    "阿米娅",
    "阿米驴", // 别称
    "炎客",
    "鞭刃",
    "龙舌兰",
    "铸铁",
    "战车",
    "柏喙",
    "赤冬",
    "拉普兰德",
    "幽灵鲨",
    "断崖",
    "星极",
    "燧石",
    "羽毛笔",
    "因陀罗",
    "布洛卡",
    "诗怀雅",
    "芙兰卡",
    "瑕光",
    "泥岩",
    "塞雷娅",
    "星熊",
    "号角",
    "森蚺",
    "拜松",
    "暮落",
    "暴雨",
    "闪击",
    "灰毫",
    "可颂",
    "极光",
    "临光",
    "石棉",
    "车尔尼",
    "灰烬",
    "迷迭香",
    "假日威龙陈",
    "鸿雪",
    "能天使",
    "阿噗噜派", // 别称
    "菲亚梅塔",
    "早露",
    "远牙",
    "空弦",
    "承曦格雷伊",
    "埃拉托",
    "寒芒克洛丝",
    "蓝毒",
    "慑砂",
    "熔泉",
    "普罗旺斯",
    "奥斯塔",
    "守林人",
    "陨星",
    "安哲拉",
    "送葬人",
    "艾雅法拉",
    "刻俄柏",
    "异客",
    "伊芙利特",
    "澄闪",
    "卡涅利安",
    "莫斯提马",
    "黑键",
    "炎狱炎熔",
    "星源",
    "至简",
    "耶拉",
    "特米米",
    "薄绿",
    "苦艾",
    "蜜蜡",
    "夜魔",
    "洛洛",
    "爱丽丝",
    "天火",
    "莱恩哈特",
    "惊蛰",
    "蚀清",
    "流明",
    "凯尔希",
    "凯爹", // 别称
    "闪灵",
    "夜莺",
    "濯尘芙蓉",
    "亚叶",
    "锡兰",
    "桑葚",
    "白面鸮",
    "微风",
    "蜜莓",
    "絮雨",
    "赫默",
    "华法琳",
    "图耶",
    "浊心斯卡蒂",
    "麦哲伦",
    "灵知",
    "铃兰",
    "安洁莉娜",
    "九色鹿",
    "巫恋",
    "海蒂",
    "梅尔",
    "月禾",
    "掠风",
    "格劳克斯",
    "但书",
    "真理",
    "稀音",
    "夏栎",
    "初雪",
    "歌蕾蒂娅",
    "归溟幽灵鲨",
    "傀影",
    "多萝西",
    "水月",
    "老鲤",
    "罗宾",
    "贝娜",
    "见行者",
    "雪雉",
    "霜华",
    "风丸",
    "绮良",
    "崖心",
    "卡夫卡",
    "食铁兽",
    "乌有",
    "狮蝎",
    "槐琥",
    "析兰",
  ];
  private arkNightsUps = new Map([
    [
      "161775300",
      {
        name: "明日方舟",
        weight: 0.7,
      },
    ],
    [
      "1265652806",
      {
        name: "明日方舟终末地",
        weight: 0.5,
      },
    ],
    [
      "53466",
      {
        name: "海猫络合物",
        weight: 1,
      },
    ],
    [
      "13164144",
      {
        name: "魔法Zc目录",
        weight: 0.4,
      },
    ],
    [
      "49631892",
      {
        name: "月隐空夜",
        weight: 0.4,
      },
    ],
    [
      "3220335",
      {
        name: "二色彩虹",
        weight: 0.4,
      },
    ],
    [
      "60400874",
      {
        name: "巅峰计划",
        weight: 0.4,
      },
    ],
    [
      "298484",
      {
        name: "小狼xf",
        weight: 0.4,
      },
    ],
    [
      "441449841",
      {
        name: "莱茵实验组",
        weight: 0.3,
      },
    ],
    [
      "404224360",
      {
        name: "黑蓑影卫攻略组",
        weight: 0.25,
      },
    ],
    [
      "267766441",
      {
        name: "血狼破军",
        weight: 0.25,
      },
    ],
    [
      "20014678",
      {
        name: "星霜初绽的天穹",
        weight: 0.2,
      },
    ],
    [
      "8412516",
      {
        name: "罗德岛蜜饼工坊",
        weight: 0.3,
      },
    ],
    [
      "9253594",
      {
        name: "拔旗",
        weight: 0.28,
      },
    ],
    [
      "2195452",
      {
        name: "化学老施",
        weight: 0.3,
      },
    ],
  ]);
  constructor() {
    super();
  }
  async check(info: IUserInfo): Promise<boolean> {
    this.subscribeList = info.subscribeList;
    this.activityList = info.activityList;

    let sum = 0;

    // 是否有方舟Up
    let haveGenshinUp = false;
    let haveVideoInActivity = false;

    // 是否屏蔽关注列表
    let forbiddenFollowers = this.subscribeList.length === 0;

    for (let subscribe of this.subscribeList) {
      if (this.arkNightsUps.has(subscribe.mid.toString())) {
        haveGenshinUp = true;
        sum += this.arkNightsUps.get(subscribe.mid.toString()).weight;
      }
    }

    // 关注了相关Up 或者 屏蔽了关注列表
    for (let activity of this.activityList) {
      // 转发动态
      if (activity.type === "DYNAMIC_TYPE_FORWARD") {
        let forwardedActivity = activity.orig;
        let forwardedFromUser =
          forwardedActivity.modules.module_author.mid.toString();

        // 转发原神Up主的动态
        if (this.arkNightsUps.has(forwardedFromUser)) {
          sum += this.arkNightsUps.get(forwardedFromUser).weight;
          if (forbiddenFollowers) {
            sum += this.arkNightsUps.get(forwardedFromUser).weight * 0.6;
          }
          continue;
        }
      } else {
        // 不是转发
        // 话题检测
        let activityTopic = activity.modules.module_dynamic.topic;
        if (activityTopic !== null && this.checkKeywords(activityTopic.name)) {
          sum += 0.2;
        }

        // 视频
        if (
          activity.type === "DYNAMIC_TYPE_AV" &&
          activity.modules.module_dynamic.major.type === "MAJOR_TYPE_ARCHIVE"
        ) {
          haveVideoInActivity = true;
          let video = activity.modules.module_dynamic.major.archive;
          let { desc: description, title } = video;
          if (
            this.checkKeywords(description, 2) ||
            this.checkKeywords(title, 3)
          ) {
            sum += 0.8;
          }
        }

        // 动态
        if (
          activity.type === "DYNAMIC_TYPE_DRAW" ||
          activity.type === "DYNAMIC_TYPE_WORD"
        ) {
          let text = activity.modules.module_dynamic.desc.text;
          if (this.checkKeywords(text, 3)) {
            // 确定有关键词
            if (this.activityList.length < 10) {
              // 动态不多
              // 宁杀不放
              return true;
            } else {
              // 动态多
              sum += 0.4;
            }
          }
        }
      }
    }

    // 防止风控
    // 在确认动态列表里没有发布视频动态后再拉取视频信息
    if (!haveVideoInActivity) {
      this.videoList = await getUserVideoList(info.uid);
      // 检测视频
      for (let video of this.videoList) {
        let { description, title } = video;
        if (
          this.checkKeywords(description, 2) ||
          this.checkKeywords(title, 2)
        ) {
          sum += 0.8;
        }
      }
    }

    // 如果屏蔽了关注列表，适当加权
    // 为原权重的1.7倍
    if (forbiddenFollowers) {
      sum *= 1.7;
    }

    return sum >= 1;
  }

  private checkKeywords(payload: string, targetTimes?: number): boolean {
    // 查找次数，默认1个
    targetTimes = targetTimes ? targetTimes : 1;

    for (let keyword of this.keywords) {
      if (payload.indexOf(keyword) !== -1) {
        targetTimes -= 1;
      }
      if (targetTimes === 0) {
        break;
      }
    }

    return targetTimes === 0;
  }
}
