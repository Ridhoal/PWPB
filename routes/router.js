const express = require('express');
const router = express.Router();
const { getMarket, tambahJenis, hapusJenis, pilihBarang, hapusBarang, tambahBarang, tambahTransaksi, cancel, editJenis, shop, editBarang,bayar } = require('../controllers/jenisBarang.js')
const { login, register,registrasi, auth, logout } = require("../controllers/auth.js")
const multer = require ("multer");

const storage = multer.diskStorage({
    // mengantur tempat penyimpanan setelah poto di upload
    destination: (req, file, cb) => {
      cb(null, "./public/uploads");  
    },
    // mengatur nama file
    filename : (req, file, cb) =>{
    cb(null, file.originalname);
    },
});

const upload = multer({ storage });

router.get("/login", login)
router.get("/register", register)
router.post('/tambahJenisBarang', tambahJenis)
router.get('/hapusJenis/:id_JenisBarang', hapusJenis)
router.get('/', getMarket)
router.get('/pilih/:id_jenisBarang', pilihBarang)
router.get('/hapusBarang/:id_barang', hapusBarang)
router.get('/shop/:id_jenisBarang',shop )
router.get('/getMarket',getMarket)
router.get('/logout',logout)
router.post("/registrasi",registrasi)
router.post('/tambahBarang', upload.single("photo"), tambahBarang)
router.post('/tambahTransaksi', tambahTransaksi)
router.post('/cancelTransaksi', cancel)
router.post('/edit', editJenis)
router.post('/editBarang',editBarang )
router.post ('/auth',auth)
router.post('/bayar',bayar)


module.exports = router;