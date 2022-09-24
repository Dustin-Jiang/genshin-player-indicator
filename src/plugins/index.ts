import { PlayerKeys } from "../app";
import { ActivityList, SubscribeList } from "../utils/api";

export abstract class Plugin {
  name: PlayerKeys;
  activityList: ActivityList;
  subscribeList: SubscribeList;
  private weight: number;
  constructor() {}
  check(info: IUserInfo) {
    return false;
  }
}

export interface IUserInfo {
  uid: string;
  activityList: ActivityList;
  subscribeList: SubscribeList;
}
