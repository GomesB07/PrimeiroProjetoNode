const express = require('express')
const app = express()
app.use(express.json())
const port = 3000
const uuid = require('uuid')



const users = []

const checkUserId = (request, response, next) => {
    const {id} = request.params

    const index = users.findIndex(user => user.id === id)

    if(index < 0){
        return response.status(404).json({error: 'User not found'})
    }

    request.userId = id
    request.UserIndex = index
    next()
}


app.get('/users', (request, response) => {
    return response.json(users)
})

app.post('/users', (request, response) => {
    const {name, age} = request.body

    const user = {id: uuid.v4(), name, age}
    users.push(user)

    return response.json(user)
})

app.put('/users/:id', checkUserId, (request, response) => {
    const id = request.userId
    const {name, age} = request.body
    const updatedUser = {id, name, age}
    
    const index = request.userIndex
    users[index] = updatedUser

    return response.json(updatedUser)
})

app.delete('/users/:id', checkUserId, (request, response) => {
    const index = request.userIndex
    users.splice(index, 1)

    return response.status(204).json()
})


app.listen(port, () => {
    console.log('Server rodando!')
})