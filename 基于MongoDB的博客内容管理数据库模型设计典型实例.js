/**
 * 使用MongoDB作为内容管理系统的数据库
 *
 * 内容管理系统概要
 * - 每天百万级别的存储
 * - 每天千万级别的查询
 * - 评论
 * - 相关内容
 * - 标签
 *
 * 单篇内容页面需要的数据
 * 
 *   - Headline 标题
 *   - Date, Byline 日期、作者等数据
 *   - Body 内容主体
 *   - Comments 评论
 *   - Tags 标签
 *   - Related Stories 相关内容
 *
 * 内容分类/标签页面需要的数据
 *   - Tag 标签名
 *   - Headline 标题
 *   - Date, Byline 日期、作者等数据
 *   - Summary 内容摘要
 */

{
  _id: ObjectId,
  headline: String,
  date: Date,
  slug: String,
  byline: {
    author: String,
    title: String, // 个人描述信息
  },
  body: String,
  tags: [String],
  comments: [{name: String, comment: String}],
  image: String,
  ticker: String,
  relatedStories: [{
    headline: String,
    date: Date,
    slug: String
  }]
}

// 插入数据
db.cms.insert({headline: 'Apple Reports Revenue', ...});

// 增加标签
db.cms.update({_id: 375}, {$addToSet: {tags: 'AAPL'}});

// 增加评论
db.cms.update({_id: 375}, {$addToSet: {comments: {
  name: 'Jason',
  comment: 'Great Stroy'
}}});

// 缩略名索引
db.cms.ensureIndex({slug: 1});

// 标签索引
db.cms.ensureIndex({tags: 1});

// 查询一篇内容
db.cms.findOne({slug: 'company-aboutus'});

// 根据标签查询内容列表
db.cms.find({tags: 'Earnings'});
db.cms.find({tags: {$in: ['Earnings', 'AAPL']}}).sort({date: -1});


/**
 * 总结
 *
 *  - 模型设计在MongoDB中同样重要
 *  - 从应用使用场景的需求来倒推模型设计
 *  - 尽量避免在MongoDB中使用关系模型
 *  - 无关联。大部分的相关信息应该包含在一个文章中
 *  - 考虑原子级的更新和分布式的写入
 */