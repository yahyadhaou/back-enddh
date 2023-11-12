const router = require("express").Router();
const {
  insertContractType,
  getAllContractType,
  deleteContractTypes,
  updateContractData,
} = require("../controllers/contract.controller");
router.get("/contractType", getAllContractType);
router.post('/insertcontractType',insertContractType)
router.delete("/deleteContractTypes/:id", deleteContractTypes);
router.put("/updateContractData/:id", updateContractData);
module.exports = router;
