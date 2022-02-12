const router = require('express').Router();
const { adminController } = require('../controllers')
const { verifyAdminToken } = require('../middlewares/tokenHandlers')

router.post('/login', adminController.login)
router.get('/summary', verifyAdminToken, adminController.getSummary)

module.exports = router;