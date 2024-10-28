const pool = require("../config/mysql");

function createRecord(table, data) {
  return new Promise((resolve, reject) => {
    const query = `INSERT INTO ${table} SET ?`;
    pool.query(query, data, (error, result) => {
      if (error) {
        return reject(error);
      }
      console.log("Record created successfully:", result); 
      resolve(result);
    });
  });
}

function getAllRecords(table, columns) {
  return new Promise((resolve, reject) => {
    const query = `SELECT ${columns || "*"} FROM ${table}`;
    pool.query(query, (error, results) => {
      if (error) {
        return reject(error);
      }
      resolve(results);
    });
  });
}

function getAllRecordsWhere(table, columns, where) {
  return new Promise((resolve, reject) => {
    const query = `SELECT ${columns || "*"} FROM ${table} WHERE ${where}`;
    console.log(query);
    pool.query(query, (error, results) => {
      if (error) {
        return reject(error);
      }
      resolve(results);
    });
  });
}

function getAllRecordsByParameter(table, columns, condition) {
  return new Promise((resolve, reject) => {
    const query = `SELECT ${columns || "*"} FROM ${table} WHERE ${condition}`;
    pool.query(query, (error, results) => {
      if (error) {
        return reject(error);
      }
      resolve(results);
    });
  });
}

function getAllRecordsByParametercomplex(table, columns, condition) {
  return new Promise((resolve, reject) => {
    const query = `SELECT ${columns || "*"} FROM ${table} WHERE ${condition}`;
    pool.query(query, (error, results) => {
      if (error) {
        console.error("Error fetching records:", error);
        return reject(error);
      }
      resolve(results);
    });
  });
}

function getRecordById(table, id, columns) {
  return new Promise((resolve, reject) => {
    const query = `SELECT ${columns || "*"} FROM ${table} WHERE id = ?`;
    console.log(query);
    pool.query(query, [id], (error, results) => {
      if (error) {
        return reject(error);
      }
      if (results.length === 0) {
        return resolve(null);
      }
      resolve(results[0]);
    });
  });
}

function updateRecord(table, id, data) {
  return new Promise((resolve, reject) => {
    const query = `UPDATE ${table} SET ? WHERE id = ?`;
    pool.query(query, [data, id], (error, result) => {
      if (error) {
        return reject(error);
      }
      if (result.affectedRows === 0) {
        return resolve(false);
      }
      resolve(true);
    });
  });
}

function deleteRecord(table, id) {
  return new Promise((resolve, reject) => {
    const query = `DELETE FROM ${table} WHERE id = ?`;
    pool.query(query, [id], (error, result) => {
      if (error) {
        return reject(error);
      }
      if (result.affectedRows === 0) {
        return resolve(false);
      }
      resolve(true);
    });
  });
}

function updateRecordById(table, id, data) {
  return new Promise((resolve, reject) => {
    const query = `UPDATE ${table} SET ? WHERE id = ?`;
    console.log(query);
    pool.query(query, [data, id], (error, result) => {
      if (error) {
        console.error(error);
        return reject("Error updating record");
      }
      if (result.affectedRows === 0) {
        return reject("Record not found");
      }
      resolve("Record updated successfully");
    });
  });
}

function updateRecordCustom(table, whereClause, data) {
  return new Promise((resolve, reject) => {
    const query = `UPDATE ${table} SET ? WHERE ${whereClause}`;
    pool.query(query, [data], (error, result) => {
      if (error) {
        console.error(error);
        return reject("Error updating record");
      }
      if (result.affectedRows === 0) {
        return reject("Record not found");
      }
      resolve("Record updated successfully");
    });
  });
}

function getCustomQuery(query) {
  return new Promise((resolve, reject) => {
    pool.query(query, (error, results) => {
      if (error) {
        return reject(error);
      }
      if (!results || results.length === 0) {
        return resolve(null);
      }
      resolve(results);
    });
  });
}



module.exports = {
  createRecord,
  getAllRecords,
  getRecordById,
  updateRecord,
  deleteRecord,
  updateRecordById,
  getAllRecordsByParameter,
  getAllRecordsByParametercomplex,
  updateRecordCustom,
  getCustomQuery,
  getAllRecordsWhere
};
