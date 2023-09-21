const inventoryModel = require("../models/inventory.model");
const { getProductById } = require("../models/repositories/product.repo");

class InventoryService {
  static addStockToInventory = async ({
    stock,
    productId,
    shopId,
    location,
  }) => {
    const product = await getProductById(productId);
    if (!product) {
      throw new BusinessLogicError("product not exists");
    }
    const query = {
        inventory_shop_id: shopId,
        inventory_product_id: productId,
      },
      updateSet = {
        $inc: {
          inventory_stock: stock,
        },
        $set: {
          inventory_location: location,
        },
      },
      options = { upsert: true, new: true };
    return await inventoryModel.findOneAndUpdate(query, updateSet, options);
  };
}

module.exports = InventoryService;
