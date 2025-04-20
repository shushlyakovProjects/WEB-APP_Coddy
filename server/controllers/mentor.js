const express = require('express')
const router = express.Router()
const bcrypt = require('bcryptjs')
const connectionDB = require('./connectionDB')

const jwt = require('jsonwebtoken')
const { SECRET_ACCESS_KEY } = require('../config')


router.use((request, response, next) => {
    const token = request.cookies.ACCESS_TOKEN
    jwt.verify(token, SECRET_ACCESS_KEY, (error, decodeData) => {
        if (error) {
            toLog(`Попытка несанкционированного доступа на адрес ${request.baseUrl}`, 'Error')
            response.status(401).send('Токен доступа недействителен')
        }
        else {
            request.dataFromChecking = decodeData
            next()
        }
    })
})


router.post('/downloadUsers', (request, response) => {
    console.log('Загрузка пользователей...');
    const { id, role } = request.dataFromChecking
    if (role == 'admin') {
        const SQL_QUERY = `SELECT * FROM users`
        connectionDB.query(SQL_QUERY, (error, result) => {
            if (error) {
                toLog('Ошибка базы данных. Блок загрузки пользователей', 'Error')
                response.status(500).send('Ошибка базы данных')
            }
            else { response.status(200).json(result) }
        })
    }
})

router.post('/addNewUser', (request, response) => {
    console.log('Добавление нового пользователя...');
    const { id, role: currentRole } = request.dataFromChecking
    if (currentRole == 'admin') {
        const { email, password, phone_number, first_name, last_name, role } = request.body
        const salt = bcrypt.genSaltSync(5) // Генерируем соль
        const hashPass = bcrypt.hashSync(password, salt) // Хешируем пароль

        const SQL_QUERY = `INSERT INTO users (user_id,email, password, phone_number, first_name, last_name, role) 
            VALUES (null, '${email}', '${hashPass}', '${phone_number}', '${first_name}', '${last_name}', '${role}')`
        connectionDB.query(SQL_QUERY, (error, result) => {
            if (error) {
                toLog('Ошибка базы данных. Блок создания нового пользователя', 'Error')
                response.status(500).send('Ошибка базы данных')
            }
            else { response.status(200).send('Пользователь добавлен') }
        })
    }
})


router.post('/edit-admin', (request, response) => {
    const { id, role } = request.dataFromChecking
    if (role == 'admin') {
        const { email, password, phone_number, first_name, last_name } = request.body

        let SQL_QUERY = null

        if (password) {
            const salt = bcrypt.genSaltSync(5) // Генерируем соль
            const hashPass = bcrypt.hashSync(password, salt) // Хешируем пароль

            SQL_QUERY = `UPDATE users SET email='${email}', password='${hashPass}', phone_number='${phone_number}', first_name='${first_name}', last_name='${last_name}' WHERE user_id='${id}'`

        }
        else { SQL_QUERY = `UPDATE users SET email='${email}', phone_number='${phone_number}', first_name='${first_name}', last_name='${last_name}' WHERE user_id='${id}'` }


        connectionDB.query(SQL_QUERY, (error, result) => {
            if (error) {
                toLog('Ошибка базы данных. Блок обновления информации администратора', "Error")
                response.status(500).send('Ошибка базы данных')
            } else {
                toLog('Данные администратора были обновлены!')
                response.status(200).send('Данные обновлены успешно!')
            }
        })
    }

})

module.exports = router