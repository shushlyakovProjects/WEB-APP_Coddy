const express = require('express')
const router = express.Router()
// const bcrypt = require('bcryptjs')
const connectionDB = require('./connectionDB')

const jwt = require('jsonwebtoken')
const { SECRET_ACCESS_KEY, CRM_URL, authkey } = require('../config')
const axios = require('axios')

// Проверка токена доступа
router.use((request, response, next) => {
    const token = request.cookies.ACCESS_TOKEN
    jwt.verify(token, SECRET_ACCESS_KEY, (error, decodeData) => {
        if (error) { response.status(401).send('Токен доступа недействителен') }
        else { request.dataFromChecking = decodeData; next() }
    })
})


router.post('/downloadMentees', async (request, response) => {
    console.log('Загрузка менти...');
    const { id, role } = request.dataFromChecking
    if (role == 'admin' || role == 'moderator') {
        await axios.post(CRM_URL + `/GetTeachers`, null, {params: {authkey, take: 2000}})
            .then((result) => {
                const TEACHERS_LIST = result.data.Teachers
                const RESULT_LIST = []
                
                TEACHERS_LIST.forEach(element => {
                    if(element.Status == 'Под менторством'){
                        RESULT_LIST.push(element)
                    }

                });

                console.log(`Получено ${TEACHERS_LIST.length} преподавателей`);
                console.log(`Из них ${RESULT_LIST.length} находятся под менторством`);
                
                response.status(200).json(RESULT_LIST)
            })
            .catch((error) => {
                console.log(error);
                response.status(error.status).send('Ошибка получения данных')
            })
        // response.status(401).send('Ошибка получения данных')
    }
})

router.post('/edit-profile', (request, response) => {
    const { id, role } = request.dataFromChecking
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
})



module.exports = router