var express = require('express');
var router = express.Router();

const users = [
  { id: 1, name: 'Michael Omo', username: 'mikey101', password: '123456'},
];

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send(users);
});

router.get('/:id', function(req, res, next) {
  const id = req.params.id;
  const user = users.find((user) => user.id === id);
  res.send(user);
});

router.post('/', function(req, res, next){
  const body = req.body;
  const newUser = {
    id: body.id,
    name: body.name,
    username: body.username,
    password: body.password,
  };
  users.push(newUser);
  res.send(newUser);
})

router.patch('/:id', function(req, res, next){
  const id = req.params.id;
  const body = req.body;
  const user = users.find((user) => user.id === id);
  if(!user) throw new Error('User not found');

  const newUsers = users.filter((user) => user.id !== id);
  users.splice(0,users.length);
  users.push(...newUsers);
  users.push({
    ...user,
    ...body,
  });
  res.send({
    ...user,
    ...body,
  });
})

router.delete('/:id', function(req, res, next){
  const id = req.params.id;
  const user = users.find((user) => user.id === id);
  if(!user) throw new Error('User not found');

  const newUsers = users.filter((user) => user.id !== id);
  users.splice(0,users.length);
  users.push(...newUsers);
  res.send(users);
})

module.exports = router;
