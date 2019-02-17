const express = require('express')
const app = express()


//app.get('/', (req, res) => {
//  res.send('HEY!')
//})
app.use(express.static('public'))

app.get('/greeting', (req, res) => {
  res.send('Welcome to the sample node js server !')
})
app.get('/who/:name', (req, res) => {
  res.send('Hello '+ req.params.name)
})
app.get('/purchase', (req, res) => {
  res.send('What would you like to buy?')
})
app.listen(3000, () => console.log('Server running on port 3000'))
