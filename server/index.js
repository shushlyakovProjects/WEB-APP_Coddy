const express = require('express')
const cookieParser = require('cookie-parser') // Пакет для парсинга cookies

// Подключение внешних модулей
const { registration } = require('./controllers/registration')
const { authorization } = require('./controllers/authorization')
const adminController = require('./controllers/fromAdmin')
const mentorController = require('./controllers/fromMentor')
const connectionDB = require('./controllers/connectionDB')
const log = require('./logs/log')

const app = express()
const PORT = 3000




// Middlewares
app.use(express.json()) // Для корректного чтения JSON
app.use(cookieParser()) // Для корректного чтения Cookies
app.use(log) // Логирование

// ДОБАВИТЬ MIDDLEWARE ПРОВЕРКИ ТОКЕНА. ЕСЛИ ТОКЕНА НЕТ - РАЗЕРЕШЕНИЙ НЕТ (КРОМЕ АВТОРИЗАЦИИ)

// Перенаправление на внешние контроллеры
app.post('/registration', registration)
app.post('/authorization', authorization)
app.use('/from-admin', adminController)
app.use('/from-mentor', mentorController)

// Базоый путь, индикатор активности
app.get('/', (request, response) => {
    response.status(200).send('<H1>Server is running...</H1>')
})


// app.post('/testAdmin', (request, response) => {
//     console.log('Проверка существования пользователей');

//     const SQL_QUERY = 'SELECT * FROM users'
//     connectionDB.query(SQL_QUERY, (error, result) => {
//         if (error) {
//             console.log('Database error! Occurred while checking the admin. ');
//             response.status(500).send('Database error!')
//         }
//         else {
//             if (result.length == 0) {
//                 console.log('Moving to registration of a new administator...');
//                 response.status(302).send('/reg-admin')
//             }
//         }
//     })
// })


app.listen(PORT, () => {
    console.log(`Server is running on PORT: ${PORT}`);
})