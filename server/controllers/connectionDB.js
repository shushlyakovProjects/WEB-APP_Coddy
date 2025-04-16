const mysql = require('mysql') // Пакет для работы с mysql (БД)

// Устанавливаем соединение с базой данных
const connection = mysql.createConnection({
    host: 'localhost',
    database: 'mentor_coddy',
    user: 'root',
    password: ''
})

module.exports = connection