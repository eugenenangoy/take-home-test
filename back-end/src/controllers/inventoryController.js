const {models} = require('../models/init-models')
const multer = require('multer')
const upload = multer({ dest: 'uploads/' });

const findAllItems = async(req, res) =>{
    try {
        const data = await models.barang.findAll()
        res.status(200).send(data)
    } catch (error) {
        res.status(404).send('Data Tidak Ditemukan\n' +  error)
    }
}

const createItems = async(req, res) => {
    try {
        await models.barang.create({
            nama_barang : req.body.nama_barang,
            harga_beli : req.body.harga_beli,
            harga_jual : req.body.harga_jual,
            stok_barang : req.body.stok_barang,
            foto_barang : req.file.path
        })
        res.status(201).send('Items Sudah Ditambahkan')
    } catch (error) {
        res.status(400).send('Items tidak sesuai')
    }
}

const updateItems = async(req,res) => {
    try {
      const items =   await models.barang.findOne({
            where : {
                id : req.params.id
            }
        })
        if(!items){
            return res.status(404).send('Items Tidak Ditemukan')
        }
        await models.barang.update({
            nama_barang : req.body.nama_barang,
            harga_beli : req.body.harga_beli,
            harga_jual : req.body.harga_jual,
            stok_barang : req.body.stok_barang,
            foto_barang : req.file.path
        },{
            where : {
                id : req.params.id
            }
        }
        )
        res.status(201).send('Items Sudah Di update')
    } catch (error) {
        res.status(400).send('Items tidak sesuai')
    }
}

const deleteItems = async(req, res) =>{
    try {
        const items =   await models.barang.findOne({
            where : {
                id : req.params.id
            }
        })
        if(!items){
            return res.status(404).send('Items Tidak Ditemukan')
        }
        await models.barang.destroy({
            where :{
                id : req.params.id
            }
        })
        res.status(201).send('Data Dihapus')
    } catch (error) {
        res.status(400).send(error.message)
    }
}

module.exports = {
    findAllItems,
    createItems,
    updateItems,
    deleteItems
}