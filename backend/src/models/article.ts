import mongoose from "mongoose";
const articleHotelSchema = new mongoose.Schema({
  name: { type: String, require: true },
  imageUrl: { type: String, require: true },
  caption: { type: String, require: true },
  text: { type: String, require: true },
});
const articleSchema = new mongoose.Schema({
  title: { type: String, require: true },
  imageUrl: { type: String, require: true },
  text: { type: String, require: true },
  hotels: [{ type: articleHotelSchema, require: true }],
});

const Article = mongoose.model("Article", articleSchema);

export default Article;
