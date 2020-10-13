const express = require("express")
const app = express()

app.use(express.urlencoded({extended: true}))
app.use(express.json())

const mysql = require("mysql2")

const conn = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "toko_buku"
})

app.get("/", (req,res) =>{ //mengambil
    let sql = "select * from admin"
    conn.query(sql,(error, result) => {
        if(error){
            res.json({
                message: error.message
            })
        } else{
            res.json(result)
        }
    })
})

app.post("/", (req,res) =>{ //menambah
    let data= {
        //masukkan data
    }

    let sql = "insert into admin set ?"
    conn.query(sql, data, (error, result) => {
        if (error){
            res.json({
                message: error.message
            })
        }else{
            res.json({
                data: result,
                message: "data has been inserted" 
            })
        }
    })
})

module.exports = app