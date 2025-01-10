var express = require("express");
var router = express.Router();

const blogItems = [
  {
    id: 1,
    title: "The Future of Artificial Intelligence in Everyday Life",
    description:
      "Explore how AI is reshaping industries, enhancing personal convenience, and paving the way for groundbreaking innovations.",
    image:
      "https://images.pexels.com/photos/7605805/pexels-photo-7605805.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    createdAt: new Date().toDateString(),
    content: `
        Artificial Intelligence (AI) is no longer confined to the realm of science fiction; it is now a part of our daily lives. 
        From voice assistants like Siri and Alexa to personalized recommendations on Netflix and Spotify, AI is enhancing convenience 
        and efficiency in ways we once only dreamed of.
  
        In the healthcare sector, AI is revolutionizing diagnostics and treatment plans, enabling quicker and more accurate outcomes. 
        Autonomous vehicles powered by AI are paving the way for safer and more sustainable transportation. Even in education, AI tools are 
        personalizing learning experiences for students worldwide.
  
        As we look ahead, the ethical considerations of AI, such as privacy and job displacement, remain critical discussions. 
        However, one thing is clear: the future of AI is bright, and its potential impact on humanity is limitless.
      `,
  },
  {
    id: 2,
    title: "10 Tips for Sustainable Living in a Modern World",
    description:
      "Learn practical tips and tricks to reduce your carbon footprint while embracing an eco-friendly lifestyle.",
    image:
      "https://images.pexels.com/photos/7605805/pexels-photo-7605805.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    createdAt: new Date().toDateString(),
    content: `
        Sustainability has become a priority for many, but living an eco-friendly life can sometimes feel overwhelming. 
        Here are 10 practical tips to help you make meaningful changes:
  
        1. **Reduce, Reuse, Recycle**: Be mindful of waste and find creative ways to reuse items.
        2. **Switch to Renewable Energy**: Invest in solar panels or opt for green energy providers.
        3. **Eat Locally and Seasonally**: Support local farmers and reduce the carbon footprint of imported food.
        4. **Minimize Plastic Use**: Carry reusable bags, bottles, and containers wherever you go.
        5. **Conserve Water**: Fix leaks, use water-saving appliances, and be mindful of water usage.
        6. **Drive Less**: Walk, bike, carpool, or use public transportation to reduce emissions.
        7. **Plant Trees**: Trees absorb CO2 and help improve air quality.
        8. **Choose Sustainable Products**: Opt for items made from recycled materials or those with minimal packaging.
        9. **Educate Yourself**: Stay informed about sustainability practices and share your knowledge with others.
        10. **Advocate for Change**: Support policies and organizations that prioritize the environment.
  
        By implementing these tips, you can significantly reduce your carbon footprint and contribute to a healthier planet.
      `,
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
