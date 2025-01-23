var express = require("express");
var router = express.Router();

// const blogItems = [
//   {
//     id: 1,
//     title: "The Future of Artificial Intelligence in Everyday Life",
//     description:
//       "Explore how AI is reshaping industries, enhancing personal convenience, and paving the way for groundbreaking innovations.",
//     image:
//       "https://images.pexels.com/photos/7605805/pexels-photo-7605805.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
//     createdAt: new Date().toDateString(),
//     content: `
//         Artificial Intelligence (AI) is no longer confined to the realm of science fiction; it is now a part of our daily lives. 
//         From voice assistants like Siri and Alexa to personalized recommendations on Netflix and Spotify, AI is enhancing convenience 
//         and efficiency in ways we once only dreamed of.
  
//         In the healthcare sector, AI is revolutionizing diagnostics and treatment plans, enabling quicker and more accurate outcomes. 
//         Autonomous vehicles powered by AI are paving the way for safer and more sustainable transportation. Even in education, AI tools are 
//         personalizing learning experiences for students worldwide.
  
//         As we look ahead, the ethical considerations of AI, such as privacy and job displacement, remain critical discussions. 
//         However, one thing is clear: the future of AI is bright, and its potential impact on humanity is limitless.
//       `,
//     createdBy: "jenny",
//   },
//   {
//     id: 2,
//     title: "10 Tips for Sustainable Living in a Modern World",
//     description:
//       "Learn practical tips and tricks to reduce your carbon footprint while embracing an eco-friendly lifestyle.",
//     image:
//       "https://images.pexels.com/photos/7605805/pexels-photo-7605805.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
//     createdAt: new Date().toDateString(),
//     content: `
//         Sustainability has become a priority for many, but living an eco-friendly life can sometimes feel overwhelming. 
//         Here are 10 practical tips to help you make meaningful changes:
  
//         1. **Reduce, Reuse, Recycle**: Be mindful of waste and find creative ways to reuse items.
//         2. **Switch to Renewable Energy**: Invest in solar panels or opt for green energy providers.
//         3. **Eat Locally and Seasonally**: Support local farmers and reduce the carbon footprint of imported food.
//         4. **Minimize Plastic Use**: Carry reusable bags, bottles, and containers wherever you go.
//         5. **Conserve Water**: Fix leaks, use water-saving appliances, and be mindful of water usage.
//         6. **Drive Less**: Walk, bike, carpool, or use public transportation to reduce emissions.
//         7. **Plant Trees**: Trees absorb CO2 and help improve air quality.
//         8. **Choose Sustainable Products**: Opt for items made from recycled materials or those with minimal packaging.
//         9. **Educate Yourself**: Stay informed about sustainability practices and share your knowledge with others.
//         10. **Advocate for Change**: Support policies and organizations that prioritize the environment.
  
//         By implementing these tips, you can significantly reduce your carbon footprint and contribute to a healthier planet.
//       `,
//     createdBy: "johndoe",
//   },
// ];

// const admins = [
//   {
//     id: 1,
//     username: "johndoe",
//     name: "John Doe",
//     email: "johndoe@gmail.com",
//     password: "123456",
//   },
//   {
//     id: 2,
//     username: "jenny",
//     name: "Jenny Doe",
//     email: "jenny@gmail.com",
//     password: "password",
//   },
// ];

function authenticateUser(req, res) {
  const user = req.session.user;
  if (!user) {
    return res.redirect("/blog");
  }
}

/* GET blog listing. */
router.get("/", function (req, res) {
  const user = req.session.user;

  let items = {};
  if (user) {
    items = { createdBy: user._id };
  }

  db.blogItems.find(items, function (err, docs) {
    if (err) {
      return res.render("error");
    }

    return res.render("blog/index", { blogItems: docs, user });
  });
});

/** Create a blog */
router.get("/create", function (req, res) {
  authenticateUser(req, res);
  return res.render("blog/create");
});

router.post("/create", function (req, res) {
  authenticateUser(req, res);
  const user = req.session.user;
  const { title, content } = req.body;

  const newBlog = {
    title,
    description: "",
    content,
    image:
      "https://images.pexels.com/photos/7605805/pexels-photo-7605805.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    createdAt: new Date().toDateString(),
    createdBy: user._id,
  };
  db.blogItems.insert(newBlog, function (err, newDoc) {
    if (err) {
      return res.render("error", { message: "Unable to create document" });
    }

    return res.redirect("/blog");
  });
});

/** Update a blog */
router.post("/edit/:id", function (req, res) {
  authenticateUser(req, res);
  const user = req.session.user;

  const id = req.params.id;
  const updates = req.body;
  const index = blogItems.findIndex((item) => item.id == id);

  if (user.username !== blogItems[index].createdBy) {
    return res.redirect("/blog");
  }

  blogItems[index].title = updates.title;
  blogItems[index].content = updates.content;
  res.redirect("/blog");
});

router.get("/edit/:id", function (req, res) {
  authenticateUser(req, res);
  const user = req.session.user;

  const id = req.params.id;
  const blogItem = blogItems.find((item) => item.id == id);

  if (user.username !== blogItem.createdBy) {
    return res.redirect("/blog");
  }

  if (!blogItem) return res.render("error");
  return res.render("blog/edit", { blogItem });
});

/** Delete a route */
router.get("/delete/:id", function (req, res) {
  authenticateUser(req, res);

  const user = req.session.user;
  const id = req.params.id;
  const index = blogItems.findIndex((item) => item.id == id);

  if (user.username !== blogItems[index].createdBy) {
    return res.redirect("/blog");
  }

  blogItems.splice(index, 1);
  return res.redirect("/blog");
});

/** Admin Routes */
router.get("/wp-admin", function (req, res) {
  const user = req.session.user;

  if (user) {
    return res.redirect("/blog");
  }
  return res.render("blog/admin/login");
});

router.post("/wp-admin", function (req, res) {
  const { email, password } = req.body;

  db.admins.findOne({ email }, function (err, admin) {
    if (err) return res.render("blog/admin/login");
    if (!admin) return res.render("blog/admin/login");

    if (admin.password !== password) {
      return res.render("blog/admin/login");
    }

    req.session.user = admin;

    return res.redirect("/blog");
  });
});

router.get("/signup", function (req, res) {
  const user = req.session.user;

  if (user) {
    return res.redirect("/blog");
  }
  return res.render("blog/admin/signup");
});

router.post("/signup", function (req, res) {
  const { email, password } = req.body;

  db.admins.findOne({ email }).exec(function (err, admin) {
    if (err) {
      return res.render("blog/admin/signup");
    }
    if (admin) return res.render("blog/admin/signup");
    const newAdmin = {
      email,
      password,
    };
    db.admins.insert(newAdmin, function (err, doc) {
      return res.redirect("/blog");
    });
  });
});

router.get("/logout", function (req, res) {
  req.session.user = undefined;
  return res.redirect("/blog");
});

module.exports = router;
