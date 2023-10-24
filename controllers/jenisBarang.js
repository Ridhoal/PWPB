const session = require("express-session");
const db = require("../connect");
const getMarket = (req, res) => {
    const sql = "SELECT * FROM jenisbarang";
    db.query(sql, (error, result) => {
        const jenisbarang = JSON.parse(JSON.stringify(result))
        if(req.session.user) {
            const sql = `SELECT * FROM user WHERE username = '${req.session.user.username}'`;
            db.query(sql, (error, result) => {
            if (error) throw error;
                const user = result [0]
                res.render("jenisBarang", { 
                    jenis: jenisbarang ,
                    user : user,
                });
          });

        } else{
            res.render("jenisBarang", { 
                jenis: jenisbarang ,
                user:"",
            });

        }
    });
};

const tambahJenis = (req, res) => {
    const sql = `INSERT INTO jenisbarang(JenisBarang) VALUES
    ('${req.body.JenisBarang}')`;
    db.query(sql, (error, result) => {
        if (error) throw error;
        res.redirect('/')
    });
};

const hapusJenis = (req, res) => {
    const id = req.params.id_JenisBarang
    const sql = "DELETE FROM jenisbarang WHERE Id_JenisBarang = ?"
    db.query(sql, id, (error, result) => {
        if (error) throw error;
        res.redirect("back");
    });
};

const pilihBarang = (req, res) => {
    const id = req.params.id_jenisBarang;
    const sql = `SELECT * FROM barang WHERE id_jenisBarang = ${id}`;
    db.query(sql, (error, result) => {
        if (error) throw error;
        let barangs = JSON.parse(JSON.stringify(result))
            const formatsaldo = (saldo) => {
            return rupiah.toLocaleString('id-ID', {
                style: 'currency',
                currency: 'IDR',
                maximunFranctionDigits: 0
            })
        }
    if(req.session.user){
        const sql = `SELECT * FROM user WHERE username = '${req.session.username}'`;
        db.query(sql,(error,result) => {
            if(error) throw error;
            const user = result[0];
            const sql2 = `SELECT * FROM transaksi JOIN barang ON transaksi.id_barang = barang.id_barang WHERE status = 0 AND id_user = ${req.session.user.id}`
            db.query(sql2, (error, result2) => {
                const transaksi = result2;
                const sql3 = `SELECT SUM(total_harga) AS total FROM transaksi JOIN barang ON transaksi.id_barang = barang.id_barang WHERE status = 0 AND id_user = ${req.session.user.id}`;
                db.query(sql3, (error, result)=>{
                    if(error) throw error;
                    total = result3;
                    console.log(user);
                    res.render('barang',{
                        bar: barang,
                        idJ: id,
                        transaksi,
                        formatsaldo,
                        total,
                        user:'',
                    })
                })
            })
        })
    }   

        res.render("barang", { barangs, idJ: id, transaksi, formatsaldo });
    })

    

};



const tambahBarang = (req, res) => {
    const image = req.file ? req.file.filename : null ;
    const sql = `INSERT INTO barang(Nama_barang, harga, id_JenisBarang, stock, new_stock, image) VALUES
    ('${req.body.Nama_barang}','${req.body.harga}', '${req.body.id_JenisBarang}', '${req.body.stock}', '${req.body.stock}', '${image}')`;
    db.query(sql, (error, result) => {
        if (error) throw error;
        res.redirect("back");
    })
};


const hapusBarang = (req, res) => {
    const id = req.params.id_barang
    const sql = "DELETE FROM barang WHERE id_barang = ?"
    db.query(sql, id, (error, result) => {
        if (error) throw error;
        res.redirect("back");
    });
};



const tambahTransaksi = (req, res) => {
    if (req.session.user){
        return res.render("login",{
            pesan: "anda harus login terlebih dahulu",
            clas:"danger",
            username:"",
        })
     } else{
        const sql = `INSERT INTO transaksi(id_barang, jumlah, total_harga,status ,id_user) VALUES
        ('${req.body.barang_id}', '${req.body.jumlah}', '${req.body.total}','0',${req.session.user.id})`;
        }
    // const jumlah = req.body.jumlah;
    // const total = req.body.total;
    db.query(sql, (error, result) => {
        if (error) throw error;

        const sql2 = `UPDATE barang SET new_stock = ${req.body.new_stock}
        WHERE id_barang = ${req.body.barang_id}`;
        db.query(sql2, (error, result) => {
            if (error) throw error;
            res.redirect("back");
        });

        const sql3 = `SELECT SUM (total_harga)AS total FROM transaksi JOIN barang ON transaksi.id_barang = barang.id_barang WHERE status = 0  AND id_user`;
        db.query(sql3, (error, result) => {
            const formatsaldo = (rupiah) => {
                return rupiah.toLocaleString('id-ID', {
                    style: 'currency',
                    currency: 'IDR',
                    maximunFranctionDigits: 0
                })
            }
            res.render("transaksi", { transaksi1,idJ: id, formatsaldo });
        })
    });
    }

   


const cancel = (req, res) => {
    const sql = `UPDATE barang SET new_stock = '${req.body.stockBaru}' WHERE id_barang = ${req, body.
        barang_id2}`;
    db.query(sql, (error, result) => {
        if (error) throw error;
        const sql2 = `DELETE FROM transaksi WHERE id_transaksi = ${req.body.id_transaksi}`;
        db.query(sql2, (error, result) => {
            if (error) throw error;
            res.redirect("back");
        });
    });
};

const editJenis = (req, res) => {
    const sql = `UPDATE jenisBarang SET JenisBarang = '${req.body.Jenis}' WHERE Id_JenisBarang = ${req.body.id_jenis}`;
    db.query(sql, (error, result) => {
        if (error) throw error;
        res.redirect("back");
    });
};
const transaksi = (req, res) => {
    const sql2 = `SELECT * FROM transaksi JOIN barang ON transaksi.id_barang = barang.id_barang = barang.id WHERE status = 0  AND id_user`;
    db.query(sql2, (error, result) => {
        const id = req.params.id
        const transaksi1 = result
        if(req.session.user) {
            const sql = `SELECT * FROM user WHERE username = '${req.session.user.id}'`;
            db.query(sql, (error, result) => {
            if (error) throw error;
                const user = result [0]
                res.render("jenisBarang", { 
                    jenis: jenisbarang ,
                    user : user,
                });
          });

        } else{
            res.render("jenisBarang", { 
                jenis: jenisbarang ,
                user:"",
            });

        }
        //pilih dan tambah kan seluruhnya pada kolom total harga yang akan di panggil sebagai total didalam tabel transaksi di gabungkan dengan barang yang id_barang pada kedua tabel harus sama. dalam kata lain di dua tabel tersebut harus sama ada idnya,agar total yang muncul hanya keseluruhan ttal harga yag ada pada transaksi yang ada pada layar 
        const sql3 = `SELECT SUM (total_harga)AS total FROM transaksi JOIN barang ON transaksi.id_barang = barang.id_barang WHERE status = 0  AND id_user`;
        db.query(sql3, (error, result) => {
            const formatsaldo = (rupiah) => {
                return rupiah.toLocaleString('id-ID', {
                    style: 'currency',
                    currency: 'IDR',
                    maximunFranctionDigits: 0
                })
            }
            res.render("transaksi", { transaksi1,idJ: id, formatsaldo });
        })
    });
}
const shop = (req, res) => {
    const id = req.params.id_jenisBarang;
    const sql = `SELECT * FROM barang WHERE id_jenisBarang = ${id}`;
    db.query(sql, (error, result) => {
        if (error) throw error;
        let barang = JSON.parse(JSON.stringify(result))
        // console.log(barang);

        const formatsaldo = (rupiah) => {
            return rupiah.toLocaleString('id-ID', {
                style: 'currency',
                currency: 'IDR',
                maximunFranctionDigits: 0
            })
        }
        res.render("shop", { barang, idJ: id, transaksi, formatsaldo });
    })

};

const editBarang = (req, res) => {
    const sql = `UPDATE barang SET Nama_barang = '${req.body.nama_Ebarang}', harga = '${req.body.harga_Ebarang}' WHERE id_barang = '${req.body.id_Ebarang}'` ;
    db.query(sql, (error, result) => {
        if (error) throw error;
        res.redirect("back");
        console.log(sql);
    })
};


const bayar = (req,res) =>{
    if (req.session.user) {
        const sql = `UPDATE user SET saldo = '${req.body.u_saldo}' WHERE id_user = 
        ${req.session.user.id}`;
        db.query(sql,(error,result)=>{
            if (error) throw error;
            res.redirect("back");
            const sql = `UPDATE transaksi AS INNER JOIN barang AS b ON t.id_barang =b.id_barang SET t.status = '1',b.stock = ${req.body.B_stock} WHERE t.id_transaksi =
             ${req.body.B_id_transaksi}`;
             db.query(sql,(error,result)=>{
                if (error) throw error;
                    
             })
        })
    }
}

module.exports = {
    getMarket,
    tambahJenis,
    hapusJenis,
    pilihBarang,
    hapusBarang,
    tambahBarang,
    tambahTransaksi,
    cancel,
    editJenis,
    transaksi,
    shop,
    editBarang,
    bayar
};