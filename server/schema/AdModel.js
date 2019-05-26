const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const AdvertisementSchema = new Schema({
  provider: { type: Schema.Types.ObjectId, ref: "users" },
  status: String,
  banner: String,
  url: String,
  name: String,
  datetime: { type: Date, default: Date.now },
  adtype: { type: Schema.Types.ObjectId, ref: "adtypes" },
  views: { type: Number, default: 0 },
  clicks: { type: Number, default: 0 }
});
const AdvertisementModel = mongoose.model("ads", AdvertisementSchema);

module.exports = AdvertisementModel;
