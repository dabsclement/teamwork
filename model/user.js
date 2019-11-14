/* eslint-disable no-useless-catch */
const pool = require('../config/config');

class UserModel {
  static async addUser(newUser) {
    try {
      const newUserQuery = 'INSERT INTO users ("isadmin", "firstname", "lastname", "email", "password", "gender", "jobrole", "department", "address") VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING *';

      const values = [`${newUser.isAdmin}`, `${newUser.firstName}`, `${newUser.lastName}`, `${newUser.email}`, `${newUser.password}`, `${newUser.gender}`, `${newUser.jobRole}`, `${newUser.department}`, `${newUser.address}`];
      const result = await pool.query(newUserQuery, values);
      console.log(result);
      return result;
    } catch (error) {
      throw error;
    }
  }

  static async getUser(user) {
    const getUserQuery = 'SELECT "id", "isadmin", "firstname", "lastname", "email", "password", "gender", "jobrole", "department", "address" FROM users WHERE email = $1';
    const values = [user];

    try {
      const result = await pool.query(getUserQuery, values);
      return result;
    } catch (error) {
      throw error;
    }
  }
}

module.exports = UserModel;
