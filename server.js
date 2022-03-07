const express = require("express")
const mongoose = require("mongoose")
const articleRouter = require("./routes/articles")
const Article = require("./modules/article")
const app = express()

mongoose.connect("mongodb://localhost/blog")

app.set("view engine", "ejs")

app.use(express.urlencoded({ extended: false }))
app.use("/articles", articleRouter)

app.get("/", async (req, res) => {
    const articles = await Article.find().sort({ createdAt: "desc" })
    res.render("articles/index", { articles: articles })
})

app.listen(5000)