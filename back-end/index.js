require('dotenv').config()
const express = require('express')
const cors = require('cors')
const {sequelize} = require('./src/models/init-models')
const routes = require('./src/routes/index')
const multer = require('multer');
const path = require('path');
const { Storage } = require('multer-google-storage');

const app = express()
const port = process.env.PORT || 4100

const serviceAccount = require('./src/serviceAccountKey.json'); // Ubah path/to/serviceAccountKey.json sesuai dengan lokasi file Anda

const fileStr = new Storage({
  projectId: 'inventory-app-eb48e', // Ganti dengan ID proyek Firebase Anda
  keyFilename: serviceAccount,
  bucket: 'inventory-app-eb48e.appspot.com' // Ganti dengan nama ember storage Firebase Anda
});

// const fileStorage = multer.diskStorage({
//     destination: 'uploads',
//     filename: (req, file, cb) => {
//         // Dapatkan ekstensi file asli
//         const ext = path.extname(file.originalname);
//         // Buat nama file baru dengan ekstensi
//         const filename = `${file.fieldname}-${Date.now()}${ext}`;
//         cb(null, filename);
//     }
// })

const fileFilter = (req, file, cb) => {
    const allowedTypes = ['.jpg', '.jpeg', '.png'];
    
    const ext = file.originalname.toLowerCase().split('.').pop();
    const isValidType = allowedTypes.includes('.' + ext);
    // const isValidSize = file.size <= maxFileSize;

    if (isValidType) {
      cb(null, true);
    } else {
      cb(new Error('File harus berupa .jpg atau .png dengan ukuran maksimal 100KB'));
    }
}

app.use(multer({
    storage: fileStr, 
    fileFilter: fileFilter,
    limits: {
        fileSize: 100 * 1024
    }
}).single('foto'))
// // Menyediakan folder uploads sebagai direktori statis
// app.use('/uploads', express.static('uploads'));
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended :true}))

app.listen(port, ()=> console.log(`Server Start on : http://localhost:${port}`))

const dropDatabaseSync = false
sequelize.sync({force : dropDatabaseSync})
.then(()=>{
    if (!dropDatabaseSync){
        console.log('Database dont Drop')
    }
})

app.use(routes)