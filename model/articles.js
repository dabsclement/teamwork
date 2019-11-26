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

  // eslint-disable-next-line consistent-return
  static async getArticles(article) {
    const search = 'SELECT * FROM articles WHERE articleid = $1';
    const searchQuery = [article.articleid];
    const returnabled = pool.query(search, searchQuery);
    // console.log(returnabled);
    return returnabled;
  }

  static async UpdateArticles(article) {
    try {
      const update = 'UPDATE articles SET title = $1, content = $2, dataupdated = current_timestamp WHERE articleid = $3 RETURNING *';
      const updateQuery = [article.title, article.content, article.articleid];
      const returnabled = await pool.query(update, updateQuery);
      console.log(returnabled.rows);
      return returnabled.rows;
    } catch (error) {
      throw error;
    }
  }
  //EMPLOYEE CAN DELETE ARTICLE
 static async DeleteArticle(article) {
    try {
      console.log(article);
      const deleteQuery = 'DELETE FROM articles WHERE articleid = $1 RETURNING *';
      const del = [article.articleid];
      const returnabled = await pool.query(deleteQuery, del);
      console.log(returnabled.rows);
      return returnabled.rows;
    } catch (err) {
      throw err;
    }
  }
}
module.exports = ArticlesModel;
