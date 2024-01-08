const ApiError = require('../error/ApiError');
const bcrypt = require('bcrypt');
const { User } = require('../models/models');
const jwt = require('jsonwebtoken')

const generateJwt = (id, email, role) => {
    return jwt.sign(
        {id, email, role}, 
        process.env.SECRET_KEY, 
        {expiresIn: '24h'}
    )
}

class UserController {
    async registration(req, res){
        const {email, password, role} = req.body
        if(!email || !password){
            return next(ApiError.badRequest('Некорректный email или password'))
        }
        try {
            const candidate = await User.findOne({where: {email}})
            if(candidate){
                return next(ApiError.badRequest('Пользователь с таким email уже существует'))
            }
            const hasPassword = await bcrypt.hash(password, 5)
            const user = await User.create({email, role, password: hasPassword})
            const token = generateJwt(user.id, user.email, user.role)
            return res.json({token})
        } catch (error) {
            return next(ApiError.internal('Registration error'));
        }
        
    }
    async login(req, res, next){
        // const {email, password} = req.body
        // const user = await User.findOne({where: {email}})
        // if(!user){
        //     return next(ApiError.internal('Пользователь не найден'))
        // }
        // let comparePassword = bcrypt.compareSync(password, user.password)
        // if(!comparePassword){
        //     return next(ApiError.internal('Указан неверный пароль'))
        // }
        // const token = generateJwt(user.id, user.email, user.role)
        // return res.json({token})
        const {email, password} = req.body;
        if (!email || !password) {
            return next(ApiError.badRequest('Некорректный email или password'));
        }
        try {
            const user = await User.findOne({where: {email}});
            if(!user){
                return next(ApiError.internal('Пользователь не найден'));
            }
            const isPasswordValid = await bcrypt.compare(password, user.password);
            if(!isPasswordValid){
                return next(ApiError.internal('Указан неверный пароль'));
            }
            const token = generateJwt(user.id, user.email, user.role);
            return res.json({token});
        } catch (error) {
            return next(ApiError.internal('Login error')); // Handle the error
        }
    
    }
    async check(req, res){
        const token = generateJwt(req.user.id, req.user.email, req.user.role)
        return res.json({token})
    }
}

module.exports = new UserController()