import express from 'express'
// import database from './db.json' assert { type: 'json' }.   old way
import database from './db.json' with { type: 'json' } // latest way

const app = express()
app.use(express.json())

const port = 3000

app.get('/api/lang', (req, res) => {
  res.json(database.languages)  // by default if ok the HTTP code 200 is sent
  // res.status(201).json(database.languages)  // [for HTTP status code: 201]
})

app.post('/api/lang',(req, res)=>{
  const newLang = req.body

  newLang.id = database.languages.length + 1
  database.languages.push(newLang)
  res.status(201).json(database.languages)
})


app.put('/api/lang/:id',(req, res)=>{
  const idToUpdate = Number(req.params.id)

  const updateData = req.body

  const isIdatIndex = database.languages.findIndex(i => i.id === idToUpdate)

  if(isIdatIndex === -1){
    res.status(404).json({messsage: "Not Found"})
  }

  database.languages[idToUpdate-1] = {id: idToUpdate, ...updateData }

  res.status(201).json(database.languages)

})

// this starts the server.
app.listen(port, () => {
  console.log(`server at http://localhost:${port}`)
})
