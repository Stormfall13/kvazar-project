const Router = require('express')
const router = new Router()
const dopController = require('../controllers/dopController')

router.post('/', dopController.create)
router.get('/', dopController.getAll)
router.get('/:id', dopController.getOne)
router.put('/:id', dopController.update);
router.delete('/:id', dopController.delete);

module.exports = router;