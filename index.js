const express = require('express'); //importing express
const port = 5000;
const router = require('./hubs/blog-router')
const server = express();
server.use(express.json())


server.use('/api/posts', router)


// server.get('/', (req, res) => {
//     res.send('Hello, post your comments');
// }); //Read Data

server.listen(port, () => {
    console.log(`Magic is happening on port ${port}` )
})

// server.put('/api/posts/:id', (req, res) => {
//     res.status(200).json({url:'/api/posts/:id', operation: 'PUT' })
// })

// server.delete('/api/posts/:id', (req,res)=> {
//     res.status(204); 
// }) //Delete Data

// server.listen(port, () => {
//     console.log(`server listening on port ${port}`)
// })