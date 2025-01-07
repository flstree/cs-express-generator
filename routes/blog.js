var express = require("express");
var router = express.Router();

const blogItems = [
  {
    id: 1,
    title: "First Blog",
    description: "Some item description",
    image:
      "https://images.pexels.com/photos/7605805/pexels-photo-7605805.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    createdAt: "2026-01-10",
  },
  {
    id: 2,
    title: "Second Blog",
    description: "Some item description",
    image:
      "https://images.pexels.com/photos/7605805/pexels-photo-7605805.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    createdAt: "2026-01-10",
  },
];

/* GET blog listing. */
router.get("/", function (req, res) {
  res.render("blog/index", { blogItems });
});

router.get("/create", function (req, res) {
  res.render("blog/create");
});

router.post("/create", function (req, res) {
  const { title, description } = req.body;
  blogItems.push({
    id: blogItems.length + 1,
    title,
    description,
    image:
      "https://images.pexels.com/photos/7605805/pexels-photo-7605805.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    createdAt: new Date().toDateString(),
  });
  res.redirect("/blog");
});

module.exports = router;
