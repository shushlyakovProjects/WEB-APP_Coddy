const express = require('express')
const router = express.Router()
const bcrypt = require('bcryptjs')
const connectionDB = require('./connectionDB')

const jwt = require('jsonwebtoken')
const { SECRET_ACCESS_KEY } = require('../config')

// ОСТНОВИЛСЯ НА ОБНОВЛЕНИИ ДАННЫХ АДМИНИСТРАТОРА

router.post('/edit-admin', (request, response) => {
    const token = request.cookies.ACCESS_TOKEN
    jwt.verify(token, SECRET_ACCESS_KEY, (error, decodeData) => {
        if (error) { response.status(401).send('Токен доступа недействителен') }
        else {
            const { id, role } = decodeData
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
                        console.log('Database error! Occurred while updating information about the administrator.');
                        response.status(500).send('Ошибка базы данных')
                    } else {
                        console.log('Данные администратора обновлены');
                        response.status(200).send('Данные обновлены успешно!')
                    }
                })
            }
        }
    })
})

module.exports = router