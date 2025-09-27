const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')

const app = express()
const port = 3002

app.use(bodyParser.json())

mongoose.connect('mongodb://mongo:27017/tasks',{})
    .then(() => console.log("Connected to MongoDB"))
    .catch(err => console.error("MongoDB connection error: ", err))

const TaskSchema = new mongoose.Schema({
    title: String,
    description: String,
    userId: String,
    createdAt: {
        type: Date,
        default: Date.now
    }
})

const Task = mongoose.model('Task', TaskSchema)

app.post('/tasks', async (req, res) => {
    const {title, description, userId} = req.body

    try {
        const task = new Task({title, description, userId})
        await task.save()
        res.status(201).json(task)
    } catch (error) {
        console.error("Error saving: ", error)
        res.status(500).json({error: "Internl server error"})
    }
})

app.get('/tasks', async (req, res) => {
    try {
        // Usa o método find() do Mongoose no modelo 'Task' para buscar todos os documentos.
        const tasks = await Task.find()
        
        // Retorna a lista de tasks com status 200 (OK).
        res.status(200).json(tasks) 
        
    } catch (error) {
        console.error("Error fetching tasks: ", error)
        
        // Em caso de erro, retorna status 500 (Internal Server Error) e uma mensagem de erro.
        res.status(500).json({ error: "Internal server error" })
    }
})


app.listen(port, () => {
  console.log(`Task service listening on port ${port}`)
})