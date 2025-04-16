const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const connectionDB = require('./connectionDB')

const { SECRET_ACCESS_KEY } = require('../config')

// Генерация токена доступа
function generateAccessToken(email, hashPass) {
    const payload = {
        email, hashPass
    }
    return jwt.sign(payload, SECRET_ACCESS_KEY)
}

function authorization(request, response) {
    if (request.cookies.ACCESS_TOKEN) {
        // Токен доступа обнаружен, значит пользователь уже проходил авторизацию
        const token = request.cookies.ACCESS_TOKEN
        
        // Проверяем действительность токена
        jwt.verify(token, SECRET_ACCESS_KEY, (error, decodeData) => {
            if (error) { 
                response.status(401).send('Токен доступа недействителен')
            }
            else {
                // Достаем данные из токена
                const { id, role } = decodeData
                if (role == 'admin') {
                    // Выдаем данные базового пользователя
                    const findUserQuery = `SELECT * FROM users WHERE user_id = '${id}'`
                    connectionDB.query(findUserQuery, (err, result) => {
                        if (err) { response.status(500).send('Пользователь не найден в базе') }
                        else {
                            response.status(200).json(result)
                        }
                    })
                } else {

                }
            }
        })
    } else {
        // Авторизация впервые (токена нет!)
        // Достаем данные из запроса
        const { email, password } = request.body

        // Подготавливаем SQL-запрос на проверку существования пользователя
        const SQL_QUERY = `SELECT * FROM users WHERE email = '${email}'`

        // Запускаем запрос на проверку
        connectionDB.query(SQL_QUERY, (err, result) => {
            // Если ошибка, то отвечаем на клиент
            if (err) {
                console.log('Database error! Occurred while authorization.');
                response.status(500).send('Ошибка базы данных')
            }
            // Если ошибок нет, идем дальше
            else {
                // Проверяем result. Если логин найден, то идентификация выполнена
                if (result.length > 0) {
                    // Идентификация выполнена! 
                    const candidate = result[0]
                    // Проверка пароля
                    if (bcrypt.compareSync(password, candidate.password)) {
                        // Аутентификация выполнена! 
                        const token = generateAccessToken(candidate.id, candidate.role)
                        response.cookie('ACCESS_TOKEN', token, { maxAge: 18000000 }).status(200).json(candidate)
                        // Авторизация выполнена! 
                    } else {
                        response.status(403).send('Пароль неверный')
                    }
                } else {
                    response.status(404).send('Пользователь с таким email не найден')
                }
            }
        })

    }
}

module.exports = { authorization }