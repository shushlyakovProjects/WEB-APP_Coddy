const express = require('express')
const router = express.Router()
const bcrypt = require('bcryptjs')
const connectionDB = require('./connectionDB')

const jwt = require('jsonwebtoken')
const { SECRET_ACCESS_KEY } = require('../config')


router.use((request, response, next) => {
    const token = request.cookies.ACCESS_TOKEN
    jwt.verify(token, SECRET_ACCESS_KEY, (error, decodeData) => {
        if (error) { response.status(401).send('Токен доступа недействителен') }
        else { request.dataFromChecking = decodeData; next() }
    })
})

router.post('/uploadToDataBaseForTracking', (request, response) => {
    console.log('Загрузка информации в базу...');
    const { id, role } = request.dataFromChecking
    const { DATALIST_FORTRACKING } = request.body

    if (role == 'admin') {

        // Определение ID существующих преподавателей в базе
        let IDs_EXISTING_MENTEES = []
        const GET_EXISTING_SQL_QUERY = 'SELECT * FROM mentees'
        connectionDB.query(GET_EXISTING_SQL_QUERY, (error, result) => {
            if (error) { response.status(500).send('Ошибка базы данных') }
            else {
                result.forEach(mentee => { IDs_EXISTING_MENTEES.push(mentee.Id) })
                // console.log(IDs_EXISTING_MENTEES);

                // Перебор, определение, кого обновить, кого добавить
                let SQL_QUERY = ''
                let changedRows = 0

                DATALIST_FORTRACKING.forEach((mentee, index) => {
                    if (IDs_EXISTING_MENTEES.includes(mentee.Id)) {
                        SQL_QUERY = `UPDATE mentees SET LastName='${mentee.LastName}', FirstName='${mentee.FirstName}',  Disciplines='${mentee.Disciplines}, CountAllEdUnits=${mentee.CountAllEdUnits}, 
                            CountTrialUnits=${mentee.CountTrialUnits}, CountConstantUnits=${mentee.CountConstantUnits}' 
                        WHERE Id='${mentee.Id}' AND (LastName<>'${mentee.LastName}' OR FirstName<>'${mentee.FirstName}' OR Disciplines<>'${mentee.Disciplines}' OR CountAllEdUnits<>'${mentee.CountAllEdUnits}' 
                            OR CountTrialUnits<>'${mentee.CountTrialUnits}' OR CountConstantUnits<>'${mentee.CountConstantUnits}')`
                    } else {
                        SQL_QUERY = `INSERT INTO mentees (Id, LastName, FirstName, Disciplines, CountAllEdUnits, CountTrialUnits, CountConstantUnits) 
                        VALUES ('${mentee.Id}', '${mentee.LastName}', '${mentee.FirstName}', '${mentee.Disciplines}', '${mentee.CountAllEdUnits}', '${mentee.CountTrialUnits}', '${mentee.CountConstantUnits})`
                    }
                    connectionDB.query(SQL_QUERY, (error, result) => {
                        if (error) { 
                            console.log(error);
                            
                            response.status(500).send('Ошибка базы данных') }
                        else {
                            if (result.affectedRows > 0) { changedRows++; }

                            if (index == DATALIST_FORTRACKING.length - 1) {
                                response.status(200).send(`Обновлено записей: ${changedRows}`)
                            }
                        }
                    })
                });
            }
        })
    }
    else {
        response.status(403).send('Доступ запрещен!')
    }
})

router.post('/downloadUsers', (request, response) => {
    console.log('Загрузка пользователей...');
    const { id, role } = request.dataFromChecking
    if (role == 'admin') {
        const SQL_QUERY = `SELECT * FROM users`
        connectionDB.query(SQL_QUERY, (error, result) => {
            if (error) { response.status(500).send('Ошибка базы данных') }
            else { response.status(200).json(result) }
        })
    }
    else {
        response.status(403).send('Доступ запрещен!')
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
            if (error) { response.status(500).send('Ошибка базы данных') }
            else { response.status(200).send('Пользователь добавлен') }
        })
    }
    else {
        response.status(403).send('Доступ запрещен!')
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
            if (error) { response.status(500).send('Ошибка базы данных') }
            else { response.status(200).send('Данные обновлены успешно!') }
        })
    }
    else {
        response.status(403).send('Доступ запрещен!')
    }

})

router.post('/edit-user', (request, response) => {
    const { id, role } = request.dataFromChecking
    if (role == 'admin') {

        const { user_id, email, password, phone_number, first_name, last_name, role } = request.body

        let SQL_QUERY = null

        if (password) {
            const salt = bcrypt.genSaltSync(5) // Генерируем соль
            const hashPass = bcrypt.hashSync(password, salt) // Хешируем пароль

            SQL_QUERY = `UPDATE users SET email='${email}', password='${hashPass}', phone_number='${phone_number}', first_name='${first_name}', last_name='${last_name}', role='${role}' WHERE user_id='${user_id}'`

        }
        else { SQL_QUERY = `UPDATE users SET email='${email}', phone_number='${phone_number}', first_name='${first_name}', last_name='${last_name}', role='${role}' WHERE user_id='${user_id}'` }

        connectionDB.query(SQL_QUERY, (error, result) => {
            if (error) { response.status(500).send('Ошибка базы данных') }
            else { response.status(200).send('Данные обновлены успешно!') }
        })
    } else {
        response.status(403).send('Доступ запрещен!')
    }

})

module.exports = router