const express = require('express');

const router = express.Router();

router.get('/tasks', (req, res) => {
   return res.json({'message': 'getTasks'});
});

module.exports = router;