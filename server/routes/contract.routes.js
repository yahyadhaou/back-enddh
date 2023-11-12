const router = require("express").Router();
const {
  insertProductType,
  getAllProductType,
  deleteProductTypes,
  updateProductData,
} = require("../controllers/contract.controller");
router.get("/ProductType", getAllProductType);
router.post('/insertProductType',insertProductType)
router.delete("/deleteProductTypes/:id", deleteProductTypes);
router.put("/updateProductData/:id", updateProductData);
module.exports = router;
