const Router = require('express')
const router = new Router()
const executorController = require('../controllers/executorContoller')

router.post('/', executorController.create)
router.get('/', executorController.getAll)

module.exports = router;