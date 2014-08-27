
var member = {
  name: String,

  access: {
    hash: String,
    salt: String
  },

  wechat: {
    wechatId: String,
    originalId: String,
    avatarUrl: String,
    name: String,
    token: String,
    appId: String,
    appSecret: String,
    accessToken: String,
    expireTime: Date
  }
};