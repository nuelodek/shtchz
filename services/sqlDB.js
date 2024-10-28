const sqlService = require("../config/sqlService");

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

function getUser(userData) {
  const { email, phone } = userData;
  let whereClause = '';
  
  if (email) whereClause += `email = '${email}'`;
  if (phone) whereClause += whereClause ? ` OR phone = '${phone}'` : `phone = '${phone}'`;
  
  return sqlService.getAllRecordsWhere('users', '*', whereClause)
    .then(results => {
      if (!results || results.length === 0) {
        return null;
      }
      return results[0];
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

async function comparePassword(inputPassword, storedPassword) {
  const results = await sqlService.getAllRecordsWhere('users', '*', `password = '${inputPassword}'`);
  if (!results || results.length === 0) {
    return false;
  }
  const isMatch = inputPassword === storedPassword;
  return isMatch;
}
   async function fetchPeopletoFollow(userData) {
      const { email, phone } = userData;
      let whereClause = '';
  
      if (email) whereClause += `email != '${email}'`;
      if (phone) whereClause += whereClause ? ` AND phone != '${phone}'` : `phone != '${phone}'`;

      return sqlService.getAllRecordsWhere('users', '*', whereClause)
        .then(results => {
          if (!results || results.length === 0) {
            return {
              success: false,
              message: 'No users found to follow',
              data: []
            };
          }
          return {
            success: true,
            message: 'Users found to follow',
            data: results
          };
        })
        .catch(error => {
          throw error;
        });
    }    


    async function createPredictions(predictionData) {
      try {
        const result = await sqlService.createRecord('predictions', predictionData);
        return {
          success: true,
          message: 'Prediction created successfully',
          data: result
        };
      } catch (error) {
        return {
          success: false,
          message: 'Failed to create prediction',
          error: error.message
        };
      }
    }
    
module.exports = {
  createUser,
  findUser,
  getUser,
  comparePassword,
  fetchPeopletoFollow,
  createPredictions
};