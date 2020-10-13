const express = require("express")
const app = express() //instance objek express (membuat objek baru)
app.use(express.urlencoded({extended: true})) //use untuk mendefinisikan midleware
app.use(express.json()) //mengizinkan membaca data menggunakan json

// endpoint
app.get("/test", (req,res) => {
    /**
     * {} >> untuk membuat objek
     * [] >> untuk membuat array
     * () >> untuk fungsi
     * */

    res.json({
        message: "Hallo Edi Gurero"
    })
})

app.get("/lingkaran/:r", (req,res) => {
    let r = req.params.r
    let luas = Math.PI * r * r
    let keliling = Math.PI * 2 * r * r

    res.json({
        r: r,
        luas: luas,
        keliling: keliling
    })
})

app.post("/balok", (req,res) =>{
    let panjang = req.body.panjang
    let lebar = req.body.lebar
    let tinggi = req.body.tinggi
    
    let volume = panjang * lebar * tinggi
    let luas = (2 * panjang * lebar) + (2 * panjang * tinggi) + (2 * tinggi *lebar)

    res.json({
        volume : volume,
        luas_permukaan: luas
    })
})

const buku = require("./routers/buku")
app.use("/buku", buku)

const admin = require("./routers/admin")
app.use("/admin", admin)

app.listen(8080, () => {
    console.log(`server run on port 8080`);
})