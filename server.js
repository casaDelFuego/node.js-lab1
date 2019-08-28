const express = require('express')
const server = express()

server.use(express.static(`${__dirname}/static/`))

server.get('/word', (request, response) => {
  const searchTerm = request.query.sw
  if (searchTerm === undefined ){
    console.log('i hit word with two slashes')
    response.send(data.map(w => [w.searchWord, w.translation]))
  } else {
    let smallLettersWord = searchTerm.toLowerCase()
    console.log('i hit the get word route')
    const filtered = data.filter(w => w.searchWord.includes(smallLettersWord))
    console.log(filtered)
    response.json(filtered).end()

  }
})

server.post('/word', (request, response) => {
  // console.log('i hit the post word route')
  const sw = request.query.sw
  const lang = request.query.lang
  const tran = request.query.tran
  const tranLang = request.query.tranLang
  data.push({ searchWord: sw, language: lang, translation: tran, translatedLanguage: tranLang })
  console.table(request.query)
  console.table(data)
  response.json(data).end()
})

server.delete('/word', (request, response) => {
  // console.log('i hit the delete route')
  const sw = request.query.sw
  console.log(sw)
  const needToDelete = data.find(w => w.searchWord === sw)
  console.log(needToDelete)
  const i = data.indexOf(needToDelete)
  console.log(i)
  data.splice(i, 1)
  console.table(data)
  response.json(data).end()
})


server.get('/lang/:x', (request, response) => {
  const xLang = request.params.x
  console.log(xLang)
  const mappedData = data.map(l => {
    if (xLang.toLowerCase() === 'english') {
      return l.searchWord
    } else if (xLang.toLowerCase() === 'russian') {
      return l.translation
    } else {
      return 'There is no such language'
    }
  })
  response.json(mappedData).end()
})

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

server.use((request, response, next) => {
  response.status(404).sendFile(`${__dirname}/static/404.html`)
})

server.use((error, request, response, next) => {
  console.error(error.stack)
  response.status(500).sendFile(`${__dirname}/static/500.html`)
})

const port = 3000

server.listen(port, (err) => {
  if (err) {
    return console.log('something bad happened', err)
  }
  console.log(`server is listening on ${port}`)
})
