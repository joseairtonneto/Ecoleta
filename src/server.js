const express = require("express")
const server = express()

//get database
const db = require("./database/db")

//configure public dir
server.use(express.static("public"))

//enable the use of req.body in our aplication
server.use(express.urlencoded({ extended: true }))

//using template engine
const nunjucks = require("nunjucks")
nunjucks.configure("src/views", {
    express: server,
    noCache: true
})

//configure the path of app
    //req = require :> Requisição
    //res = response :> Resposta
server.get("/", (req, res) => {
    return res.render("index.html")
})

server.get("/create-point", (req, res) => {
    //req.query: Query String
    return res.render("create-point.html")
})

server.post("/create-point-saved", (req, res) => {
    //req.body: Body of form
    //insert data on table
    const query = `
        INSERT INTO places (
            image,
            name,
            address,
            address2,
            state,
            city,
            items
        ) VALUES (?,?,?,?,?,?,?);
    `

    const values = [
        req.body.image,
        req.body.name,
        req.body.address,
        req.body.address2,
        req.body.state,
        req.body.city,
        req.body.items
    ]

    function afterInsertData(err) {
        if(err) {
            console.log(err)
            return res.render()
        }

        console.log("Cadastrado com sucesso")
        console.log(this)

        return res.render("create-point.html", { saved: true })
    }

    db.run(query, values, afterInsertData)
    
})

server.get("/search", (req, res) => {
    const search = req.query.search

    //empty search
    if(search == ""){
        return res.render("search-results.html", { total: 0 })
    }

    //get data from database
    db.all(`SELECT * FROM places WHERE city LIKE '%${search}%'`, function (err, rows) {
        if(err)
            return console.log(err)

        const total = rows.length
        
        //show html page with data
        return res.render("search-results.html", { places: rows, total })
    })
})

//turn on server
server.listen(3000)