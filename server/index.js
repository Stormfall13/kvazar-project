require('dotenv').config()
const express = require('express')
const sequelize = require('./db')
const models = require('./models/models')
const cors = require('cors')
const errorHandler = require('./middleware/ErrorHandlingMiddleware')
const router = require('./routes/index')
const { google } = require('googleapis');
const { Pool } = require('pg');
const keysGoogle = require('./keys.json');

const PORT = process.env.PORT || 5000

const app = express()
app.use(cors())
app.use(express.json())
app.use('/api', router)

// Обработка ошибок, последний Middleware
app.use(errorHandler)

// // Настройки Google Sheets API
// const auth = new google.auth.GoogleAuth({
//   credentials: keysGoogle , // путь к вашему JSON файлу ключа
//   scopes: ['https://www.googleapis.com/auth/spreadsheets'],
// });

// const sheets = google.sheets({ version: 'v4', auth });

// // Функция для экспорта данных из Postgres в Google Sheets
// app.get('/api/dop-work', async (req, res) => {
//   try {
//     const pool = new Pool({
//       user: process.env.DB_USER,
//       host: process.env.DB_HOST,
//       database: process.env.DB_NAME,
//       password: process.env.DB_PASSWORD,
//       port: process.env.DB_PORT,
//     });

//     // Запрос данных из базы данных PostgreSQL
//     const result = await pool.query('SELECT * FROM dop_work_tables'); // Замените на ваше название таблицы

//     // Преобразование данных в формат для Google Sheets (двумерный массив)
//     const values = result.rows.map(row => Object.values(row));
    
//     // ID таблицы Google Sheets и диапазон для записи данных
//     const spreadsheetId = 'Ключ ID'; // Замените на ваш ID Google Sheets
//     const range = 'Лист1!A1'; // Замените на нужный диапазон

//     // Запись данных в Google Sheets
//     const resource = {
//       values,
//     };
//     const response = await sheets.spreadsheets.values.append({
//       spreadsheetId,
//       range,
//       valueInputOption: 'RAW',
//       resource,
//     });

//     res.send('Данные успешно экспортированы в Google Sheets.');
//   } catch (error) {
//     res.status(500).send('Произошла ошибка при экспорте данных.');
//   }
  
// });

const start = async () => {
    try {
        await sequelize.authenticate()
        await sequelize.sync()
        app.listen(PORT, () => console.log(`Server start on port ${PORT}`))
    } catch (e) {
            console.log(e)
    }
}


start()