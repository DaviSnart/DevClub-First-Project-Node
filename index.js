const express = require('express')
const uuid = require('uuid')

const port = 3000
const app = express()
app.use(express.json())

/*
      - Query params => meusite.com/users?nome=snart&age=20
        - Route params => /users/2      //BUSCAR, DELETAR OU ATUALIZAR

        GET          => Buscar uma informação no back-end
        POST         => Criar informção no back-end
        PUT / PATCH  => Alterar/Atualizar informção no back-end
        DELETE       => Deletar informção no back-end

        MiddleWare   => Serve para interceptar/pausar a aplicação ou alterar dados.

*/
const users = []

const checkUserId = (request, response, next) => {
    const { id } = request.params

    const index = users.findIndex(user => user.id === id)

    if (index < 0) {
        return response.status(404).json({ error: "User not found" })
    }

    request.userIndex = index
    request.userId = id

    next()
}

app.get('/users', (request, response) => {
    return response.json(users)
})

app.post('/users', (request, response) => {

    const { name, age } = request.body

    const user = { id: uuid.v4(), name, age }

    users.push(user)

    return response.status(201).json(user)
})

app.put('/users/:id', checkUserId, (request, response) => {
    const { name, age } = request.body
    const index = request.userIndex
    const id = request.userId

    const updateUser = { id, name, age }

    users[index] = updateUser

    console.log(index)

    return response.json(updateUser)
})

app.delete('/users/:id', checkUserId, (request, response) => {

    const index = request.userIndex

    users.splice(index, 1)

    return response.status(204).json(users)
})











app.listen(port, () => {
    console.log(`👌😁👍 Server starded on port ${port}`)
})