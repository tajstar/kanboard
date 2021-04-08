const express = require('express')
app = express()
const MongoClient = require('mongodb').MongoClient
require('dotenv').config()
let PORT = 3000

let db
let dbString = process.env.DB_STRING
let dbName = 'kanban'

app.set('view engine' , 'ejs')
app.use(express.static('public'))
app.use(express.urlencoded({extended:true}))
app.use(express.json())

MongoClient.connect(dbString, {useUnifiedTopology:true})
.then(
    client =>{
        db = client.db(dbName);
        console.log(`your database ${dbName} is working`)
    }
).catch(err=>{
    console.log(err)
})

app.get('/', async (req,res)=>{
    const kanbanTodos = await db.collection('kanban').find().toArray()
    res.render('index.ejs', {jimmy: kanbanTodos})
})


app.listen(PORT, () => {
    console.log('yo server is running')
})

