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
    const feedBack = request.body
    console.log(feedBack);

    // ЗАГРУЗИТЬ ДАННЫЕ В ТАБЛИЦУ FEEDBACKS
    
})




module.exports = router