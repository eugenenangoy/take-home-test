const { models } = require("../models/init-models");
const {
  getStorage,
  ref,
  getDownloadURL,
  uploadBytesResumable,
} = require("firebase/storage");

const findAllItems = async (req, res) => {
  try {
    const data = await models.barang.findAll();
    res.status(200).send(data);
  } catch (error) {
    res.status(404).send("Data Tidak Ditemukan\n" + error);
  }
};

const createItems = async (req, res) => {
  const storage = getStorage();
  try {
    const storageRef = ref(storage, `files/${req.file.originalname}`);

    // Create file metadata including the content type
    const metadata = {
      contentType: req.file.mimetype,
    };

    // Upload the file in the bucket storage
    const snapshot = await uploadBytesResumable(
      storageRef,
      req.file.buffer,
      metadata
    );
    //by using uploadBytesResumable we can control the progress of uploading like pause, resume, cancel

    // Grab the public url
    const downloadURL = await getDownloadURL(snapshot.ref);
    const itemExist = await models.barang.findOne({
        where : {
            nama_barang : req.body.nama_barang
        }
    })
    if(itemExist){
        return res.send('Barang Sudah Ada')
    }
    else{
        await models.barang.create({
          nama_barang: req.body.nama_barang,
          harga_beli: req.body.harga_beli,
          harga_jual: req.body.harga_jual,
          stok_barang: req.body.stok_barang,
          foto_barang: downloadURL,
        });
        res.status(201).send("Items Sudah Ditambahkan");
    }
  } catch (error) {
    res.status(400).send("Items tidak sesuai");
  }
};

const updateItems = async (req, res) => {
  const storage = getStorage();
  try {
    const storageRef = ref(storage, `files/${req.file.originalname}`);

    // Create file metadata including the content type
    const metadata = {
      contentType: req.file.mimetype,
    };

    // Upload the file in the bucket storage
    const snapshot = await uploadBytesResumable(
      storageRef,
      req.file.buffer,
      metadata
    );
    //by using uploadBytesResumable we can control the progress of uploading like pause, resume, cancel

    // Grab the public url
    const downloadURL = await getDownloadURL(snapshot.ref);
    const items = await models.barang.findOne({
      where: {
        id: req.params.id,
      },
    });
    if (!items) {
      return res.status(404).send("Items Tidak Ditemukan");
    }
    await models.barang.update(
      {
        nama_barang: req.body.nama_barang,
        harga_beli: req.body.harga_beli,
        harga_jual: req.body.harga_jual,
        stok_barang: req.body.stok_barang,
        foto_barang: downloadURL,
      },
      {
        where: {
          id: req.params.id,
        },
      }
    );
    res.status(201).send("Items Sudah Di update");
  } catch (error) {
    res.status(400).send("Items tidak sesuai");
  }
};

const deleteItems = async (req, res) => {
  try {
    const items = await models.barang.findOne({
      where: {
        id: req.params.id,
      },
    });
    if (!items) {
      return res.status(404).send("Items Tidak Ditemukan");
    }
    await models.barang.destroy({
      where: {
        id: req.params.id,
      },
    });
    res.status(201).send("Data Dihapus");
  } catch (error) {
    res.status(400).send(error.message);
  }
};

module.exports = {
  findAllItems,
  createItems,
  updateItems,
  deleteItems,
};
