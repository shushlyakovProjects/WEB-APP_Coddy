const express = require('express')

const app = express()
const PORT = 3000

app.get('/', (request, response) => {
    response.status(200).send('<H1>Server is running...</H1>')
})



app.listen(PORT, () => {
    console.log(`Server is running on PORT: ${PORT}`);
})