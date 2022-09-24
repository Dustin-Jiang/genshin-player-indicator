import GM_xmlhttpRequestPromise from "./GM_xmlHttpRequest";

type Url = string

enum DYNAMIC_TYPE {
  DYNAMIC_TYPE_FORWARD = "DYNAMIC_TYPE_FORWARD",
  DYNAMIC_TYPE_DRAW = "DYNAMIC_TYPE_DRAW",
  DYNAMIC_TYPE_WORD = "DYNAMIC_TYPE_WORD",
  DYNAMIC_TYPE_AV = "DYNAMIC_TYPE_AV",
};

enum MAJOR_TYPE {
  MAJOR_TYPE_DRAW = "MAJOR_TYPE_DRAW",
  MAJOR_TYPE_ARCHIVE = "MAJOR_TYPE_ARCHIVE",
  MAJOR_TYPE_ARTICLE = "MAJOR_TYPE_ARTICLE",
  MAJOR_TYPE_LIVE_RCMD = "MAJOR_TYPE_LIVE_RCMD"
}

export type User = {
  mid: number,
  tag: number[] | null,
  special: number,
  uname: string,
  face: Url,
  sign: string,
}

export type SubscribeList = User[]

export type ActivityList = Activity[]

export type Activity = {
  id_str: string;
  modules: {
    module_author: User;
    module_dynamic: {
      additional: unknown;
      desc?: ActivityText;
      major: null | {
        archive: {
          aid: string;
          bvid: string;
          cover: Url;
          desc: string;
          jump_url: string;
          stat: {
            danmaku: string;
            play: string;
          };
          title: string;
          type: string;
        },
        type: MAJOR_TYPE
      };
      topic: null | {
        id: number;
        jump_url: Url;
        name: string;
      };
    };
  };
  orig?: Activity;
  type: DYNAMIC_TYPE;
};

type ActivityText = {
  rich_text_nodes: object[],
  text: string
}

export type VideoList = Video[]

type Video = {
  comment: number,
  play: number,
  description: string,
  title: string
}

export async function getUserSubscribeList(uid: string): Promise<SubscribeList> {
  let subscribeUrl = `https://api.bilibili.com/x/relation/followings?vmid=${uid}`;

  let response = await getApi(subscribeUrl)
  let result = JSON.parse(response)

  // 处理屏蔽
  let parsed = (result.code !== 22115) ? result.data.list : []
  return parsed
}

export async function getUserActivityList(uid: string): Promise<ActivityList> {
  let activityUrl = `https://api.bilibili.com/x/polymer/web-dynamic/v1/feed/space?&host_mid=${uid}`;

  let response = await getApi(activityUrl)

  let result: ActivityList = JSON.parse(response).data.items
  return result
}

export async function getUserVideoList(uid: string): Promise<VideoList> {
  let videoUrl = `http://api.bilibili.com/x/space/arc/search?mid=${uid}`;

  let response = await getApi(videoUrl)
  
  let result = JSON.parse(response)
  // 风控
  return (result.code !== -412 && result.data.list.vlist) ? result.data.list.vlist as VideoList : []
}

async function getApi(url: string): Promise<string> {
  return GM_xmlhttpRequestPromise<string>({
    method: "GET",
    url: url,
    data: "",
    headers: {
      "user-agent":
        "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/104.0.0.0 Safari/537.36",
    },
  });
}