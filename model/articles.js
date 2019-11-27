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
    try {
      const search = 'SELECT * FROM articles WHERE articleid = $1';
      const getArticleComment = 'select c.comment, c.datecreated, concat(firstname, \' \' , lastname) as poster FROM articlecomment c inner JOIN users u ON c.userid = u.id where articleid = $1 ORDER BY c.datecreated DESC';
      const searchQuery = [article.articleid];
      const returnabled = await pool.query(search, searchQuery);
      // console.log(returnabled.rows[0]);
      if (returnabled.rows[0] === []) {
        return ['article doesnt exist', 'article doesnt exist'];
      }
      const res = await pool.query(getArticleComment, searchQuery);
      const thearticle = returnabled.rows[0];
      const thecomment = res.rows[0];
      // console.log([thearticle, thecoment]);
      return [thearticle, thecomment];
    } catch (error) {
      throw error;
    }
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

  // EMPLOYEE CAN DELETE ARTICLE
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

  static async CommentArticle(comment) {
    try {
      const commentQuery = 'INSERT INTO articlecomment (comment, userid, articleid) VALUES($1, $2, $3) RETURNING *';
      const values = [comment.comment, comment.userid, comment.articleid];
      const returnabled = await pool.query(commentQuery, values);
      // console.log(returnabled.rows[0]);
      // console.log(returnabled);
      return returnabled;
    } catch (error) {
      throw error;
    }
  }
}
module.exports = ArticlesModel;
