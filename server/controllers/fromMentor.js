const express = require('express')
const router = express.Router()
// const bcrypt = require('bcryptjs')
const connectionDB = require('./connectionDB')


const qs = require('qs')



const jwt = require('jsonwebtoken')
const { SECRET_ACCESS_KEY, CRM_URL, authkey_getTeachers, authkey_getEdUnits } = require('../config')
const axios = require('axios')

// Проверка токена доступа
router.use((request, response, next) => {
    const token = request.cookies.ACCESS_TOKEN
    jwt.verify(token, SECRET_ACCESS_KEY, (error, decodeData) => {
        if (error) { response.status(401).send('Токен доступа недействителен') }
        else { request.dataFromChecking = decodeData; next() }
    })
})

router.post('/downloadEdUnits', async (request, response) => {
    console.log('Попытка получения учебных единиц...');
    const { id, role } = request.dataFromChecking
    const { teacherId_list } = request.body

    let dateFrom = new Date(new Date() - 7 * 24 * 60 * 60 * 1000)
    let dateTo = new Date()

    let menteeEdUnits_list = []


    if (role == 'admin' || role == 'moderator') {
        await axios.post(CRM_URL + `/GetEdUnits`, null,
            { params: { authkey: authkey_getEdUnits, dateFrom, dateTo } })
            .then((result) => {
                const ALL_EDUNITS = result.data.EdUnits

                // Фильтрация. Необходимы только те учебные единицы, которые принадлежат менти
                const allMenteeEdUnits_list = ALL_EDUNITS.filter(unit => {
                    return teacherId_list.includes(unit.ScheduleItems[0].TeacherId)
                })

                // Перебор ID менти
                teacherId_list.forEach((menteeId, index) => {
                    // Объект для учета учебных единиц
                    menteeEdUnits_one = {
                        teacherId: menteeId,
                        CountAllEdUnits: 0,
                        CountTrialUnits: 0,
                        CountConstantUnits: 0,
                    }
                    // Перебор всех единиц менти, распределение по разным менти
                    allMenteeEdUnits_list.forEach((unit, index) => {
                        const teacherIdOfUnit = unit.ScheduleItems[0].TeacherId
                        if (teacherIdOfUnit == menteeId) {
                            menteeEdUnits_one.countAllEdUnits++
                            if (unit.type == 'TrialLesson') { menteeEdUnits_one.countTrialUnits++ }
                            if (unit.type != 'TrialLesson') { menteeEdUnits_one.countConstantUnits++ }
                        }
                    })
                    menteeEdUnits_list.push(menteeEdUnits_one);
                    if (index == teacherId_list.length - 1) response.status(200).json({ menteeEdUnits_list })
                })
            })
            .catch((error) => {
                response.status(error.status).send('Ошибка получения данных')
            })
    } else {
        response.status(403).send('Доступ запрещен')
    }
})



router.post('/downloadMentees', async (request, response) => {
    console.log('Загрузка менти...');
    const { id, role } = request.dataFromChecking
    if (role == 'admin' || role == 'moderator') {
        await axios.post(CRM_URL + `/GetTeachers`, null, { params: { authkey: authkey_getTeachers, take: 2000 } })
            .then((result) => {
                const TEACHERS_LIST = result.data.Teachers
                const RESULT_LIST = []

                TEACHERS_LIST.forEach(element => {
                    if (element.Status == 'Под менторством') {
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
    } else {
        response.status(403).send('Доступ запрещен')
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