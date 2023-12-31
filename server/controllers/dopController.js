const { Dop } = require('../models/models')
const ApiError = require('../error/ApiError')

class DopController {
    async create(req, res){
        const { 
            date, 
            reglament, 
            executor, 
            amount, 
            typeWork, 
            typeTest,
            recommen,
            errors,
            critic,
            counting,
            iteration,
            deadlines,
            point,
            inspector,
            departament,
            delayTester,
            delayExecutor,
            pointsRemove,
            dispute,
            commentError,
            linkReport
        } = req.body
        const dopWork = await Dop.create({
            date,
            reglament, 
            executor, 
            amount, 
            typeWork, 
            typeTest,
            recommen,
            errors,
            critic,
            counting,
            iteration,
            deadlines,
            point,
            inspector,
            departament,
            delayTester,
            delayExecutor,
            pointsRemove,
            dispute,
            commentError,
            linkReport
        })
        return res.json(dopWork)
    }
    async getAll(req, res){
        const dops = await Dop.findAll()
        return res.json(dops)
    }
    async getOne(req, res){

    }
}

module.exports = new DopController();

