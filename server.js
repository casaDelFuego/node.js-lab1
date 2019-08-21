const express = require('express')
const server = express()

server.use(express.static(`${__dirname}/static/`))

server.get('/hello/:kek', (request, response) => {
  // response.send('Hello from Express!')
  response.send(request.params)
})

server.get('/word/', (request, response) => {
  response.send(data.map(w => w.searchWord))
})

// server.get('/word/', (request, response) => {
//   response.send(data.map(w => w.searchWord))
// })

const data = [
  { searchWord: 'pancake', language: 'English', translation: 'блин', translatedLanguage: 'Russian' },
  { searchWord: 'cake', language: 'English', translation: 'торт', translatedLanguage: 'Russian' },
  { searchWord: 'brownie', language: 'English', translation: 'пироженое', translatedLanguage: 'Russian' },
  { searchWord: 'croassant', language: 'English', translation: 'круассан', translatedLanguage: 'Russian' },
  { searchWord: 'bun', language: 'English', translation: 'булочка', translatedLanguage: 'Russian' },
  { searchWord: 'pie', language: 'English', translation: 'пирог', translatedLanguage: 'Russian' },
  { searchWord: 'bread', language: 'English', translation: 'хлеб', translatedLanguage: 'Russian' },
  { searchWord: 'baguette', language: 'English', translation: 'багет', translatedLanguage: 'Russian' },
  { searchWord: 'biscuit', language: 'English', translation: 'печенье', translatedLanguage: 'Russian' },
  { searchWord: 'doughnut', language: 'English', translation: 'пончик', translatedLanguage: 'Russian' }
]

const port = 3000

server.listen(port, (err) => {
  if (err) {
    return console.log('something bad happened', err)
  }
  console.log(`server is listening on ${port}`)
})
