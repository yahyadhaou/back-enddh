var db = require("../database-mysql");

// get one contract
let getOneContract = (req, res) => {
  const id = req.params.id;
  const sql = `SELECT * from contract_types where id=?`;
  db.query(sql, [id], (err, result) => {
    if (err) res.send(err);
    else res.send(result);
  });
};
// getAllContractType

const getAllContractType = (req, res) => {
  let query = `SELECT * FROM contract_types`;
  db.query(query, (err, contracts) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.json(contracts);
    }
  });
};
const insertContractType = (req, res) => {
  let {
    signed_time,
    time_answering,
    title_FR,
    title_EN,
    title_AR,
    description_FR,
    description_AR,
    image_url,
    template_FR,
    template_AR,
    template_EN,
    numberOfPages_Ar,
    numberOfPages_En,
    numberOfPages_Fr,
    country,
    description_EN,
    types,
    categories,
    inside_categories
  } = req.body;
  const sql = `INSERT INTO contract_types (
    signed_time, 
    time_answering, 
    title_FR, title_AR, title_EN, 
    description_FR, description_AR, description_EN, 
    image_url, 
    template_FR, template_AR, template_EN, 
    numberOfPages_Ar,numberOfPages_En, numberOfPages_Fr, 
    country, types, categories, inside_categories) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;
  db.query(
    sql,
    [
      signed_time,
      time_answering,
      title_FR,
      title_AR,
      title_EN,
      description_FR,
      description_AR,
      description_EN,
      image_url,
      template_FR,
      template_AR,
      template_EN,
      numberOfPages_Ar,
      numberOfPages_En,
      numberOfPages_Fr,
      country,
      types,
      categories,
      inside_categories
    ],
    (err, result) => {
      if (err) console.log(err);
      else 
      res.send(result);;
     }
   );
};

//delete contract_types
let deleteContractTypes = (req, res) => {
  const id = req.params.id;
  const sql = `DELETE FROM contract_types WHERE id =?`;
  db.query(sql, [id], (err, result) => {
    if (err) res.send(err);
    else res.send(result);
  });
};
const updateContractData = (req, res) => {
  const id = req.params.id; // Retrieve the contract ID from the route parameters
  const {
    description_FR,
    description_EN,
    description_AR,
    template_FR,
    template_EN,
    template_AR,
    title_FR,
    title_EN,
    title_AR,
    image_url,
  } = req.body;// Destructure the request body to get the updated contract data

  let updates = [];
  // Check which fields are provided in the request body and add them to the updates array
  if (image_url) {
    updates.push({ column: "image_url", value: image_url });
  }
  if (description_FR) {
    updates.push({ column: "description_FR", value: description_FR });
  }
  if (description_EN) {
    updates.push({ column: "description_EN", value: description_EN });
  }
  if (description_AR) {
    updates.push({ column: "description_AR", value: description_AR });
  }
  if (template_FR) {
    updates.push({ column: "template_FR", value: template_FR });
  }
  if (template_EN) {
    updates.push({ column: "template_EN", value: template_EN });
  }
  if (template_AR) {
    updates.push({ column: "template_AR", value: template_AR });
  }
  if (title_FR) {
    updates.push({ column: "title_FR", value: title_FR });
  }
  if ( title_EN) {
    updates.push({ column: " title_EN", value:  title_EN });
  }
  if (title_AR) {
    updates.push({ column: "title_AR", value: title_AR });
  }
// If no updates are provided, send a response indicating that no updates were provided
  if (updates.length === 0) {
    res.send("No updates provided");
    return;
  }

  let sql = "UPDATE contract_types SET ";
  let params = [];
// Construct the SQL query and params array based on the updates array
  updates.forEach((update, index) => {
    sql += `${update.column}=?`;
    params.push(update.value);
    if (index !== updates.length - 1) {
      sql += ", ";
    }
  });

  sql += ` WHERE id=${id}`;
 // Execute the database query to update the contract data
  db.query(sql, params, (err, result) => {
    if (err) res.send(err);
    else res.send(result);
  });
};
module.exports = {
  insertContractType,
  getAllContractType,
  deleteContractTypes,
  updateContractData,
};
