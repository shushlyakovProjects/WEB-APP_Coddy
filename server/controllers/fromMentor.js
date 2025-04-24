const express = require('express')
const router = express.Router()
const bcrypt = require('bcryptjs')
const connectionDB = require('./connectionDB')


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

// Загрузка менти
router.post('/downloadMentees', async (request, response) => {
    console.log('Загрузка менти...');
    const { id, role } = request.dataFromChecking
    if (role == 'admin' || role == 'moderator') {
        // ЗАГРУЗКА МЕНТИ
        await axios.post(CRM_URL + `/GetTeachers`, null, { params: { authkey: authkey_getTeachers, take: 2000 } })
            .then(async (result) => {
                const TEACHERS_LIST = result.data.Teachers
                const MENTEES_LIST = []
                const IDs_MENTEES_LIST = []

                // Очистка массива со всеми преподавателями, получение ТОЛЬКО МЕНТИ
                TEACHERS_LIST.forEach(element => {
                    if (element.Status == 'Под менторством') {
                        MENTEES_LIST.push(element)
                        IDs_MENTEES_LIST.push(element.Id)
                    }
                });

                console.log(`Получено ${TEACHERS_LIST.length} преподавателей`);
                console.log(`Из них ${MENTEES_LIST.length} находятся под менторством`);
                console.log('Попытка получения учебных единиц...');


                let dateFrom = new Date(new Date() - 7 * 24 * 60 * 60 * 1000)
                let dateTo = new Date()

                // ЗАГРУЗКА УЧЕБНЫХ ЕДИНИЦ
                await axios.post(CRM_URL + `/GetEdUnits`, null, { params: { authkey: authkey_getEdUnits, dateFrom, dateTo } })
                    .then((result) => {
                        const ALL_UNITS = result.data.EdUnits

                        // Фильтрация. Необходимы только те учебные единицы, которые принадлежат менти
                        const ALL_UNITS_BY_MENTEES_LIST = ALL_UNITS.filter(unit => {
                            return IDs_MENTEES_LIST.includes(unit.ScheduleItems[0].TeacherId)
                        })

                        // Перебор списка менти
                        MENTEES_LIST.forEach((mentee, index) => {
                            // Объект для учета учебных единиц
                            let info_mentee_units = {
                                CountAllEdUnits: 0,
                                CountTrialUnits: 0,
                                CountConstantUnits: 0,
                            }
                            // Перебор всех единиц менти, распределение по разным менти
                            ALL_UNITS_BY_MENTEES_LIST.forEach((unit) => {
                                const teacherIdOfUnit = unit.ScheduleItems[0].TeacherId
                                if (teacherIdOfUnit == mentee.Id) {
                                    info_mentee_units.CountAllEdUnits++
                                    if (unit.type == 'TrialLesson') { info_mentee_units.CountTrialUnits++ }
                                    if (unit.type != 'TrialLesson') { info_mentee_units.CountConstantUnits++ }
                                }
                            })

                            mentee.InfoEdUnits = info_mentee_units

                            if (index == MENTEES_LIST.length - 1) {
                                console.log('Учебные единицы получены успешно');
                                response.status(200).json({ MENTEES_LIST })
                            }
                        })
                    })
                    .catch((error) => { response.status(error.status).send('Ошибка получения данных') })
            })
            .catch((error) => { response.status(error.status).send('Ошибка получения данных') })
    } else {
        response.status(403).send('Доступ запрещен')
    }
})


// Редактирование профиля
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