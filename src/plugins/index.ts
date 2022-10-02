import { PlayerKeys } from "../config";
import { ActivityList, SubscribeList, VideoList } from "../utils/api";

export abstract class Plugin {
  name: PlayerKeys;
  activityList: ActivityList;
  subscribeList: SubscribeList;
  videoList: VideoList
  constructor() {}
  async check(info: IUserInfo) {
    return false;
  }
}

export interface IUserInfo {
  uid: string;
  activityList: ActivityList;
  subscribeList: SubscribeList;
}
