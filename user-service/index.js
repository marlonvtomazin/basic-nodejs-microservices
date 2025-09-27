const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')

const app = express()
const port = 3001

app.use(bodyParser.json())

mongoose.connect('mongodb://localhost:27017/users',{
    // ⏳ OPÇÃO DE TIMEOUT: Define o tempo máximo para a tentativa de conexão inicial (5 segundos)
    serverSelectionTimeoutMS: 5000 
})
    .then(() => console.log("Connected to MongoDB"))
    .catch(err => console.error("MongoDB connection error: ", err))

const UserSchema = new mongoose.Schema({
    name: String,
    email: String
})

const User = mongoose.model('User', UserSchema)

app.get('/users', async (req, res) => {
    try {
        // Usa o método find() do Mongoose no modelo 'User' para buscar todos os documentos.
        const users = await User.find()
        
        // Retorna a lista de usuários com status 200 (OK).
        res.status(200).json(users) 
        
    } catch (error) {
        console.error("Error fetching users: ", error)
        
        // Em caso de erro, retorna status 500 (Internal Server Error) e uma mensagem de erro.
        res.status(500).json({ error: "Internal server error" })
    }
})

app.post('/users', async (req, res) => {
    const {name, email} = req.body

    try {
        const user = new User({name, email})
        await user.save()
        res.status(201).json(user)
    } catch (error) {
        console.error("Error saving: ", error)
        res.status(500).json({error: "Internl server error"})
    }
})

app.get('/', (req, res) => {
  res.send('Hello World!')
})


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
