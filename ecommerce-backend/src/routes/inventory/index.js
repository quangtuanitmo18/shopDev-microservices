const express = require("express");
const router = express.Router();
const inventoryController = require("../../controllers/inventorycontroller");
const { authenticationV2 } = require("../../auth/authUtils");

// authentication
router.use(authenticationV2);

router.post("", inventoryController.addStockToInventory);
module.exports = router;
