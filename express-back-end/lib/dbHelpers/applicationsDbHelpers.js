//API Query
// const getAllApplications = function(db) {
//   return db.query(`SELECT * FROM applications`)
//     .then((res) => {
//       return res.rows;
//     }).catch(err => {
//       console.log(err);
//     });
// };

const getAllApplications = function(db, options) {
  const queryParams = [];
  let queryString = `SELECT * FROM applications `;

  if (options.worker_id && options.worker_id !== '') {
    console.log(options.worker_id);
    queryParams.push(`${options.worker_id}`);
    queryString += `WHERE worker_id = $${queryParams.length} `;
  }

  if (options.job_id && options.job_id !== '') {
    queryParams.push(`${options.job_id}`);
    queryString += queryParams.length > 1 ? `AND` : `WHERE`;
    queryString += ` job_id = $${queryParams.length} `;
  }
  return db.query(queryString, queryParams)
    .then((res) => {
      return res.rows;
    }).catch(err => {
      console.log(err);
    });
};




const getApplicationById = function(id, db) {
  return db.query(`SELECT * FROM applications WHERE id =$1`, [id])
    .then((res) => {
      return res.rows;
    }).catch(err => {
      console.log(err);
    });
};

const addNewApplication = function(newApplication, db) {
  const { worker_id, job_id, status, date_applied } = newApplication;
  console.log(job_title);
  return db.query(`INSERT into applications (worker_id, job_id, status, date_applied)
  values ($1, $2, $3, $4);`,
    [worker_id, job_id, status, date_applied])
    .then((res) => {
      return res.rows;
    }).catch(err => {
      console.log(err);
    });
};
module.exports = { getAllApplications, getApplicationById, addNewApplication };