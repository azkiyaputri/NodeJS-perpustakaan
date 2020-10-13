const express = require("express")
const app = express()

app.use(express.urlencoded({extended: true}))
app.use(express.json())

const mysql = require("mysql2") //require memanggil

const conn = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "toko_buku"
})

app.get("/", (req,res) =>{ //mengambil
    let sql = "select * from buku"
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
        kode_buku: req.body.kode_buku,
        judul: req.body.judul,
        penulis: req.body.penulis,
        harga: req.body.harga,
        stok: req.body.stok,
        tahun: req.body.tahun,
        image: req.body.image
    }

    let sql = "insert into buku set ?"
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

app.put("/", (req,res) => {
    let data= {
        kode_buku: req.body.kode_buku,
        judul: req.body.judul,
        penulis: req.body.penulis,
        harga: req.body.harga,
        stok: req.body.stok,
        tahun: req.body.tahun,
        image: req.body.image
    }

    let params = {
        kode_buku: req.body.kode_buku
    }

    let sql = "update buku set ? where?"
    conn.query(sql, [data,params], (error, result) =>{
        if (error){
            res.json({
                message: error.message
            })
        }else{
            res.json({
                data: result,
                message: "data has been updated" 
            })
        }
    })
})

app.delete("/:kode_buku", (req, res) => {
    let data = {
        kode_buku: req.params.kode_buku
    }
    let sql = "delete from buku where ?"
    conn.query(sql,data,(error,result) =>{
        if (error){
            res.json({
                message: error.message
            })
        }else{
            res.json({
                data: result,
                message: "data has been deleted" 
            })
        }
    })
})

module.exports = app