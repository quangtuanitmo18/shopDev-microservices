const { furniture } = require("../../models/product.model");
const { BusinessLogicError } = require("../../core/error.response");
const { ProductFactory } = require("./product.factory");
const { updateProductById } = require("../../models/repositories/product.repo");

class FurnitureFactory extends ProductFactory {
  async createProduct() {
    const newFurniture = await furniture.create({
      ...this.product_attributes,
      product_shop: this.product_shop,
    });
    if (!newFurniture) {
      throw new BusinessLogicError("Create new Furniture error");
    }

    const newProduct = await super.createProduct(newFurniture._id);
    if (!newProduct) {
      throw new BusinessLogicError("Create new product error");
    }

    return newProduct;
  }

  async updateProduct(product_id) {
    // 1. remove attr has null undefined
    const objectParams = removeAttrUndefined(this);

    // 2. check update where?
    if (objectParams.product_attributes) {
      // update child
      await updateProductById({
        productId: product_id,
        bodyUpdate: updateNestedObjectParser(objectParams.product_attributes),
        model: furniture,
      });
    }

    return await super.updateProduct(
      product_id,
      updateNestedObjectParser(objectParams)
    );
  }
}

module.exports = {
  FurnitureFactory,
};
