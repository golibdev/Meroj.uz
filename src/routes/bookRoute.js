const router = require('express').Router();
const { bookController } = require('../controllers');
const { verifyAdminToken } = require('../middlewares/tokenHandlers');

router.get('/', bookController.getAll);
router.get('/:id', verifyAdminToken, bookController.getOne);
router.post('/', verifyAdminToken, bookController.create);
router.put('/:id', verifyAdminToken, bookController.update);
router.delete('/:id', verifyAdminToken, bookController.delete);

module.exports = router;