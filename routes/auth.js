const express = require('express')
const bcryt = require('bcrypt')
const router = express.Router()



router.get('/', (req,res)=> {
    res.send("hello")
})

router.post('/register', async (req, res) => {
    let user = new User({
      name: req.body.name,
      email: req.body.email,
      passwordHash: bcrypt.hashSync(req.body.password, 10),
      city: req.body.city,
      country: req.body.country,
    });
    user = await user.save();
  
    if (!user) return res.status(400).send('the user cannot be created!');
  
    res.send(user);
  });

module.exports = router