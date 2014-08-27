
/**
 * 拥有多地址的顾客
 */

patron = {
  _id: "Joe",
  name: "Joe Bookreader",
  join_date: ISODate("2011-10-15"),
  addresses: [
    {street: "1 Vernon St.", city: "Newton", state: "MA", ...},
    {street: "52 Main St.", city: "Boston", state: "MA", ...}
  ]
}


/**
 * 一对多关系实例2：出版社和书籍
 * 
 *   - 一个出版社出版很多书籍
 *   - 每本书籍有一个出版社
 */


/**
 * 将出版社嵌入书籍模型
 */

book = {
  title: "MongoDB: The Definitive Guide",
  authors: ["Kristina Chodorow", "Mike Dirolf"],
  published_date: ISODate("2010-09-24"),
  pages: 216,
  language: "English",
  publisher: {
    name: "O'Reilly Media",
    founded: "1980",
    location: "CA"
  }
}


/**
 * 常规的模型是这样的
 */

publisher = {
  name: "O'Reilly Media",
  founded: "1980",
  location: "CA"
}

book = {
  title: "MongoDB: The Definitive Guide",
  authors: ["Kristina Chodorow", "Mike Dirolf"],
  published_date: ISODate("2010-09-24"),
  pages: 216,
  language: "English"
}


/**
 * 作为引用链接出版社的 _id 字段
 */

publisher = {
  _id: "oreilly", // 出版社的 _id
  name: "O'Reilly Media",
  founded: "1980",
  location: "CA"
}

book = {
  title: "MongoDB: The Definitive Guide",
  authors: ["Kristina Chodorow", "Mike Dirolf"],
  published_date: ISODate("2010-09-24"),
  pages: 216,
  language: "English",
  publisher_id: "oreilly" // 引用出版社的 _id
}


/**
 * 作为引用链接所有书籍的 _id
 */

publisher = {
  name: "O'Reilly Media",
  founded: "1980",
  location: "CA",
  books: ["123456789", ...] // 引用该出版社出版的所有书籍的 _id
}

book = {
  _id: "123456789",
  title: "MongoDB: The Definitive Guide",
  authors: ["Kristina Chodorow", "Mike Dirolf"],
  published_date: ISODate("2010-09-24"),
  pages: 216,
  language: "English"
}


/**
 * 什么时候使用引用？
 *
 *  - 在书籍中引用单个出版社
 *    当书籍的数据增长是无限制的
 *  - 在出版社的数据模型中引用一组书籍
 *    书籍作为出版社的附加信息查询时
 *    假设出版社出版的书籍是极为有限的
 */


/**
 * 一对多关系实例3：书籍和顾客
 *
 *  - 一本书籍只能被顾客购买一次
 *  - 顾客能购买很多本书籍（但没有谁一次购买1000本以上）
 */

patron = {
  _id: "Joe",
  name: "Joe Bookreader",
  join_date: ISODate("2011-10-15"),
  address: {...}
}

book = {
  _id: "123456789",
  title: "MongoDB: The Definitive Guide",
  authors: ["Kristina Chodorow", "Mike Dirolf"],
  ...
}

patron = {
  _id: "Joe",
  name: "Joe Bookreader",
  join_date: ISODate("2011-10-15"),
  address: {...},

  // 将购买信息嵌入至顾客模型中
  checked_out: [
    {_id: "123456789", checked_out: "2012-10-15"},
    {_id: "987654321", checked_out: "2012-09-12"},
    ...
  ]
}


patron = {
  _id: "Joe",
  name: "Joe Bookreader",
  join_date: ISODate("2011-10-15"),
  address: {...},

  // 反规范化的数据嵌入方式
  checked_out: [
    {
      _id: "123456789",
      title: "MongoDB: The Definitive Guide",
      authors: ["Kristina Chodorow", "Mike Dirolf"],
      checked_out: ISODate("2012-10-15")
    },
    {
      _id: "987654321",
      title: "MongoDB: The Sealing Adventure",
      ...
    }
  ]
}


/**
 * 引用 VS 嵌入
 *
 *  - 嵌入更像是预关联的数据
 *  - 服务器可以很轻松地处理文档级的操作
 *  - 当“多”的数据总是随其父文档出现时，使用嵌入更合适
 *  - 如果你需要更多的灵活性，则使用引用
 */


/**
 * 多对多关系实例：书籍和作者
 */

book = {
  title: "MongoDB: The Definitive Guide",
  published_date: ISODate("2010-09-24"),
  pages: 216,
  language: "English"
}

author = {
  _id: "kehodorow",
  name: "Kristina Chodorow",
  hometown: "New York"
}

author = {
  _id: "mdirolf",
  name: "Mike Dirolf",
  hometown: "Albany"
}

book = {
  title: "MongoDB: The Definitive Guide",
  published_date: ISODate("2010-09-24"),
  pages: 216,
  language: "English",

  // 将关系存入书籍文档
  authors: [
    {_id: "kehodorow", name: "Kristina Chodorow"},
    {_id: "mdirolf", name: "Mike Dirolf"}
  ]
}


author = {
  _id: "kehodorow",
  name: "Kristina Chodorow",
  hometown: "New York",

  // 将关系存入作者文档
  books: [{book_id: 123456789, title: "MongoDB: The Definitive Guide"}]
}


/**
 * 你究竟应该将引用存放在哪儿？
 * 
 *   - 考虑查询
 *   - 考虑索引
 */

db.books.find({authors.name: "Kristina Chodorow"})
db.books.createIndex({authors.name: 1})


/**
 * 小结
 *
 *  - MongoDB的模型设计与传统的关系型模型设计是不一样的
 *  - Basic data design principals apply
 *  - 关注于应用怎样获取和处理数据
 *  - 随着环境变化来扩展设计模型
 *  - 应用层面的逻辑是非常重要的
 */