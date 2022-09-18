import { Plugin, IUserInfo } from ".";

export default function factoryPluginGenshinImpact(info: IUserInfo) {
  return new PluginGenshinImpact(info)
}

class PluginGenshinImpact extends Plugin {
  name: "genshin"
  constructor(info: IUserInfo) {
    super(info)
  }
  check(): boolean {
    let sum = 0
    
    for (let activity in this.activityList) {

    }

    return false
  }
}