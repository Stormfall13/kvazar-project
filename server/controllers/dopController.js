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
            linkReport,
            uniqueId,
            reportPeriods
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
            linkReport,
            uniqueId,
            reportPeriods
        })
        return res.json(dopWork)
    }
    async getAll(req, res){
        const dops = await Dop.findAll()
        return res.json(dops)
    }
    async getOne(req, res, next){
        try {
            const { id } = req.params; // Get the ID from the request parameters
            const dopWork = await Dop.findByPk(id); // Use Sequelize's findByPk method

            if (!dopWork) {
                // If no record is found, send a 404 response
                return next(ApiError.notFound(`Work with id ${id} not found`));
            }

            return res.json(dopWork); // If found, send back the record in JSON format
        } catch (error) {
            // If there's an error, pass it to the error handling middleware
            return next(ApiError.internal(`Error getting work: ${error.message}`));
        }
    }
    async update(req, res, next) {
        try {
            const { id } = req.params;

            // Here you take the information from the request body to update the existing entry
            const updatedDopWork = await Dop.update(req.body, {
                where: { id: id }
            });

            if (!updatedDopWork) {
                return next(ApiError.notFound(`Work with id ${id} not found`));
            }

            return res.json(updatedDopWork);
        } catch (error) {
            return next(ApiError.internal(`Error updating work: ${error.message}`));
        }
    }
    async delete(req, res, next) {
        try {
            const { id } = req.params;
            const rowCount = await Dop.destroy({
                where: { id: id }
            });

            if (rowCount === 0) {
                return next(ApiError.notFound(`Work with id ${id} not found`));
            }

            return res.json({ message: `Work with id ${id} has been deleted` });
        } catch (error) {
            return next(ApiError.internal(`Error deleting work: ${error.message}`));
        }
    }
}

module.exports = new DopController();

