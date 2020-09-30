const express = require('express'); //importing express
const port = 5000;

const server = express();
server.use(express.json())

server.get('/api/posts', (req, res) => {
    res.send('Welcome to My Blog');
}); //Read Data

server.post('/api/posts/:id/comments', (req,res)=>{
    res.status(201).json({url: '/api/posts/:id/comments', operation: 'POST'})
})

server.put('/api/posts/:id', (req, res) => {
    res.status(200).json({url:'/api/posts/:id', operation: 'PUT' })
})

server.delete('/api/posts/:id', (req,res)=> {
    res.status(204); 
}) //Delete Data

server.listen(port, () => {
    console.log(`server listening on port ${port}`)
})