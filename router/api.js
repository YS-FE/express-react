const express = require('express');
const router = express.Router();

router.get('/user', (req, res, next) => {
  res.json({
    name: 'lisi',
    age: 10
  });
});

module.exports = router;

