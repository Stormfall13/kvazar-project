const { Executor } = require('../models/models')
const ApiError = require('../error/ApiError')

class ExecutorController {
    async create(req, res){
        const { 
            executorName,
            executorTypeWork,
            executorDepartament
        } = req.body
        const executor = await Executor.create({
            executorName,
            executorTypeWork,
            executorDepartament
        })
        return res.json(executor)
    }
    async getAll(req, res){
        const executorAll = await Executor.findAll()
        return res.json(executorAll)
    }
}

module.exports = new ExecutorController();