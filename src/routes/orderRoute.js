const router = require('express').Router();
const { verifyAdminToken } = require('../middlewares/tokenHandlers');
const { orderController } = require('../controllers');

router.get('/', verifyAdminToken, orderController.getAll);
router.get('/todays', verifyAdminToken, orderController.getTodaysOrders);
router.get('/:id', verifyAdminToken, orderController.getOne);
router.post('/', orderController.create);
router.put('/:id', orderController.update);
router.delete('/:id', verifyAdminToken, orderController.delete);

module.exports = router;