const { Schema, model } = require("mongoose");

const DOCUMENT_NAME = "Order";
const COLLECTION_NAME = "Orders";

const OrderSchema = new Schema(
  {
    order_userId: { type: Schema.Types.ObjectId, required: true },
    order_checkout: { type: Object, default: {} },
    /*
      order_checkout = {
      totalPrice,
      totalApllyDiscount,
      feeShip
      }
     */
    order_shipping: { type: Object, default: {} },
    /*
      street,
      city,
      state,
      country
    */
    order_payment: { type: Object, default: {} },
    order_products: { type: Array, required: true },
    order_trackingNumber: { type: String, default: "#00000312321" },
    orderStatus: {
      type: String,
      enum: ["pending", "confirmed", "shipped", "cancelled", "delivered"],
      default: "pending",
    },
    // time: { type: Date, default: Date.now(), index: { expires: 60 } }, // 60s expire
  },
  {
    collection: COLLECTION_NAME,
    timestamps: true,
  }
);

module.exports = model(DOCUMENT_NAME, OrderSchema);
