const Router = require('express')
const router = new Router()
const dopsRouter = require('./dopRouter')
const executorRouter = require('./executorRouter')
const userRouter = require('./userRouter')

router.use('/user', userRouter)
router.use('/dop-work', dopsRouter)
router.use('/executor', executorRouter)

module.exports = router;