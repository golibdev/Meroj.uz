const express = require('express');
const router = express.Router();

router.use('/admin', require('./adminRoute'));
router.use('/category', require('./categoryRoute'));
router.use('/books', require('./bookRoute'));
router.use('/orders', require('./orderRoute'));

module.exports = router;
