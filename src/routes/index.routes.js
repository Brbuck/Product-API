const express = require("express");

const productController = require("../controllers/product");
const router = express.Router();

router.route("/produtos").get(productController.index);
router.route("/produto-details/:id").get(productController.details);
router.route("/produto").post(productController.create);
router.route("/produto/:id").put(productController.update);
router.route("/produto/:id").delete(productController.delete);


module.exports = router;

