const sequelize = require('../db')
const { DataTypes } = require('sequelize')



const Dop = sequelize.define('dop_work_table', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true}, // ID
    date: {type: DataTypes.DATE, defaultValue: Date.now()},         // Отметка времени
    reglament: {type: DataTypes.STRING},                            // Ссылка на регламент
    executor: {type: DataTypes.STRING},                             // Исполнители
    amount: {type: DataTypes.STRING},                               // Кол-во доп. работ в реге
    typeWork: {type: DataTypes.STRING},                             // Вид работ
    typeTest: {type: DataTypes.STRING},                             // Вид проверки
    recommen: {type: DataTypes.INTEGER, defaultValue: 0},           // Рекомендации
    errors: {type: DataTypes.INTEGER, defaultValue: 0},             // Ошибки
    critic: {type: DataTypes.INTEGER, defaultValue: 0},             // Критические ошибки
    counting: {type: DataTypes.STRING},                             // Отчет
    iteration: {type: DataTypes.INTEGER, defaultValue: 0},          // Итерации
    point: {type: DataTypes.FLOAT},                                 // Баллы
    inspector: {type: DataTypes.STRING},                            // Проверяющий
    departament: {type: DataTypes.STRING},                          // Отдел
    delayTester: {type: DataTypes.STRING},                          // Просрочка тестировщика
    delayExecutor: {type: DataTypes.STRING},                        // Просрочка исполнителя
    pointsRemove: {type: DataTypes.INTEGER, defaultValue: 0},       // Снятые баллы
    dispute: {type: DataTypes.INTEGER, defaultValue: 0},            // Спор
    commentError: {type: DataTypes.STRING},                         // Комментарий ошибки
    linkReport: {type: DataTypes.STRING},                           // ссылка для отчета
    uniqueId: {type: DataTypes.STRING},                             // Уникальный ID uuid
})

const Executor = sequelize.define('executor_table', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true}, // ID
    executorName: {type: DataTypes.STRING},                               // Имя и фамилия исполнителя
    executorDepartament: {type: DataTypes.STRING}                         // Отдел
})




module.exports = {
    Dop,
    Executor,
}

