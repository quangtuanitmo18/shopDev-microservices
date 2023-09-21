const { electronic } = require("../../models/product.model");
const { BusinessLogicError } = require("../../core/error.response");
const { ProductFactory } = require("./product.factory");
const { updateProductById } = require("../../models/repositories/product.repo");

class ElectronicFactory extends ProductFactory {
  async createProduct() {
    const newElectronic = await electronic.create({
      ...this.product_attributes,
      product_shop: this.product_shop,
    });
    if (!newElectronic) {
      throw new BusinessLogicError("Create new electronic error");
    }

    const newProduct = await super.createProduct(newElectronic._id);
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
        model: electronic,
      });
    }

    return await super.updateProduct(
      product_id,
      updateNestedObjectParser(objectParams)
    );
  }
}

module.exports = {
  ElectronicFactory,
};
