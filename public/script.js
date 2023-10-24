

const barang = (id, harga, stock) => {
    const inputIdBarang = document.getElementById('barang_id')
    inputIdBarang.value = id
    const inputHarga = document.getElementById('harga_barang')
    inputHarga.value = harga
    const inputStock = document.getElementById('Stock').value = stock
    const stok = document.getElementById('')
    console.log(harga, id);
}

const multiFungsi = () => {
    const inputHarga = document.getElementById('harga_barang').value;
    const jumlahInput= document.getElementById('jumlah');
    const stock = document.getElementById('Stock2').value;
    let jumlah = parseInt (jumlahInput.value);

    if (jumlah > stock) {
        alert("stock cukup");
        jumlahInput.value = stock
        document.getElementById('Total')= inputHarga * jumlahInput.value;
        document.getElementById('new_stock').value = stock-jumlahInput.value;
    } else {
        document.getElementById('Total')= inputHarga * jumlahInput.value;
        document.getElementById('new_stock').value = stock-jumlahInput.value;
    }
    console.log(jumlah, harga);
}

const fungsi_harga = () => {
    const harga = document.getElementById('harga');
    const barang = document.getElementById('Nama_barang');

    if (barang.value.length >= 3) {
        if (harga.value % 500 == 0) {
            document.getElementById('save').style.display = 'block';
        } else {
            alert(`Harga tidak sesuai`)
        }
    } else {
        alert(`nama tidak sesuai`)
        document.getElementById('save').style.display = 'none';
    }
};

const cancel = (newStock, jumlah, idBarang, idtransaksi) => {
    console.log(newStock, idBarang, jumlah, idtransaksi)
    document.getElementById('barang_id2').value = idBarang
    document.getElementById('id_transaksi').value = idtransaksi
    document.getElementById('stockBaru').value = parseInt(newStock) + parseInt(jumlah)
}

function editJenis(id_jeniss, jeniss) {
    console.log(jeniss, id_jeniss)
    document.getElementById('Jenis').value = jeniss
    document.getElementById('id_jenis').value = id_jeniss
}

const edit = (idBarang, namaBarang, harga) => {
    console.log(idBarang, namaBarang, harga);
    document.getElementById("id_Ebarang").value = idBarang;
    document.getElementById("nama_Ebarang").value = namaBarang;
    document.getElementById("harga_Ebarang").value = harga;
};

const bayar = (saldo,harga,id,barang,id_transaksi,jumlah,stock) =>{
    let total = saldo - harga;
    let t_stock = saldo - jumlah;
    document.getElementById(
        "info"
    ).innerHTML = `anda membeli ${barang},dengan ${harga} dan saldo anda adalah ${saldo} jika anda membeli barang tersebut, maka saldo anda menjadi ${total}`;
    document.getElementById("B_id_barang").value = id;
    document.getElementById("B_id_transaksi").value = id-transaksi;
    document.getElementById("u_saldo").value = total;
    document.getElementById("BT_harga").value = harga;
    document.getElementById("B_stock").value = t_stock;
}
