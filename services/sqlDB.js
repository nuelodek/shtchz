const sqlService = require("../config/sqlService");
const userservice = require("../services/userservice");
function createUser(userData) {
  return sqlService.createRecord('users', userData)
    .then(result => {
      return {
        success: true,
        message: 'User created successfully',
        data: { id: result.insertId, ...userData }
      };
    });
}


function findUser(criteria) {
  const condition = Object.entries(criteria.$or[0])
    .map(([key, value]) => `${key} = '${value}'`)
    .join(' OR ');
    
  return sqlService.getAllRecordsByParametercomplex('users', '*', condition)
    .then(results => {
      if (!results || results.length === 0) {
        return null;
      }
      return results[0];
    });
}

module.exports = {
  createUser,
  findUser,
};