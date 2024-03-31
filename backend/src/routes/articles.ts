import express, { Request, Response } from "express";
import Article from "../models/article";
const route = express.Router();
route.get("/", async (req: Request, res: Response) => {
  try {
    const articles = await Article.find();
    return res.status(200).send(articles);
  } catch (err) {
    return res.status(500).json("Error fetching articles");
  }
});
route.get("/:id", async (req: Request, res: Response) => {
  try {
    const id = req.params.id
    const articles = await Article.findById(id);
    return res.status(200).send(articles);
  } catch (err) {
    return res.status(500).json("Error fetching the article");
  }
});

export default route