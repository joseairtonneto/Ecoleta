//import dependence sqlite3
const sqlite3 = require("sqlite3").verbose()

//create a object to operate on database
const db = new sqlite3.Database("./src/database/database.db")

module.exports = db
//using object to ours operations
/*db.serialize ( () => {
    //With SQL    
    //create a table
    db.run(`
        CREATE TABLE IF NOT EXISTS places (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            image TEXT,
            name TEXT,
            address TEXT,
            address2 TEXT,
            state TEXT,
            city TEXT,
            items TEXT
        );
    `)

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
        "https://images.unsplash.com/photo-1516992654410-9309d4587e94?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60",
        "Papersider",
        "Guilherme Gemballa, Jardim América",
        "N° 260",
        "Santa Catarina",
        "Rio do Sul",
        "Papéis e papelão"
    ]

    function afterInsertData(err) {
        if(err) {
            return console.log(err)
        }

        console.log("Cadastrado com sucesso")
        console.log(this)
    }

    db.run(query, values, afterInsertData)

    //consulte data on table
    function afterverify (err, rows) {
        if(err)
            return console.log(err)

        console.log("Aqui estão seus registros: ")
        console.log(rows)
    }

    db.all(`SELECT * FROM places`, afterverify)

    //delete data on table
    function afterDelete (err) {
        if(err)
            return console.log(err)

        console.log("Registro deletado com sucesso!")
    }

    db.run(`DELETE FROM places WHERE id = ?`, [5], afterDelete)
})*/
