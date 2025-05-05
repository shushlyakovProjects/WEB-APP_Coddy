const express = require('express')
const router = express.Router()
// const bcrypt = require('bcryptjs')
const connectionDB = require('./connectionDB')


// const jwt = require('jsonwebtoken')
// const { SECRET_ACCESS_KEY, CRM_URL, authkey_getTeachers, authkey_getEdUnits, authkey_googleTables } = require('../config')
// const axios = require('axios')

// Проверка токена доступа
// router.use((request, response, next) => {
//     const token = request.cookies.ACCESS_TOKEN
//     jwt.verify(token, SECRET_ACCESS_KEY, (error, decodeData) => {
//         if (error) { response.status(401).send('Токен доступа недействителен') }
//         else { request.dataFromChecking = decodeData; next() }
//     })
// })

router.post('/newFeedback', async (request, response) => {
    console.log('Новая обратная связь!');
    const { FIO, Phone, HasConstantUnit, CheckInfo, Comments, CountTrialUnits, CountConstantUnits, CountPaidModules, NewLoad } = request.body

    const SQL_QUERY = `INSERT INTO feedbacks(FeedBackID, Date, FIO, Phone, CheckInfo, Comments, NewLoad, HasConstantUnit, CountConstantUnits, CountPaidModules, CountTrialUnits) 
    VALUES(null, '${new Date()}', '${FIO}', '${Phone}', '${CheckInfo}', '${Comments}', '${NewLoad}', '${HasConstantUnit}', '${CountConstantUnits}', '${CountPaidModules}', '${CountTrialUnits}')`

    connectionDB.query(SQL_QUERY, (error, result) => {
        if (error) { response.status(500).send('Ошибка базы данных. Попробуйте позже :(')}
        else {response.status(200).send('Обратная связь отправлена. Спасибо!')}
    })
})




module.exports = router