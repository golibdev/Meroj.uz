const router = require('express').Router();
const { categoryController } = require('../controllers');
const { verifyAdminToken } = require('../middlewares/tokenHandlers');

router.get('/', verifyAdminToken, categoryController.getAll);
router.get('/:id', verifyAdminToken, categoryController.getOne);
router.post('/', verifyAdminToken, categoryController.create);
router.put('/:id', verifyAdminToken, categoryController.update);
router.delete('/:id', verifyAdminToken, categoryController.delete);

module.exports = router;