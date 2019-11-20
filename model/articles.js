/* eslint-disable no-useless-catch */
const pool = require('../config/config');

class ArticlesModel {
  static async articlePost(article) {
    try {
      const newArticleQuery = 'INSERT INTO articles (title, content, userid) VALUES($1,$2,$3) RETURNING *';

      const values = [`${article.title}`, `${article.content}`, `${article.userid}`];
      const result = pool.query(newArticleQuery, values);
      console.log(result);
      return result;
    } catch (err) {
      throw err;
    }
  }
}

module.exports = ArticlesModel;