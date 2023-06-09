require('dotenv').config()
const express = require('express')
const cors = require('cors')
const {sequelize} = require('./src/models/init-models')
const routes = require('./src/routes/index')
const multer = require("multer");
const config = require("./src/Config/firebaseConfig")
const { initializeApp } = require('firebase/app')

const app = express()
const port = process.env.PORT || 4100

initializeApp(config.firebaseConfig);

const fileFilter = (req, file, cb) => {
    const allowedTypes = ['.jpg', '.jpeg', '.png'];
    
    const ext = file.originalname.toLowerCase().split('.').pop();
    const isValidType = allowedTypes.includes('.' + ext);

    if (isValidType) {
      cb(null, true);
    } else {
      cb(new Error('File harus berupa .jpg atau .png dengan ukuran maksimal 100KB'));
    }
}

// Untuk Local atau hosting yang bisa read & write file
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

app.use(multer({
    storage: multer.memoryStorage(), 
    fileFilter: fileFilter,
    limits: {
        fileSize: 100 * 1024
    }
}).single('foto'))
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended :true}))

app.listen(port, ()=> console.log(`Server Started on : http://localhost:${port}`))

const dropDatabaseSync = false
sequelize.sync({force : dropDatabaseSync})
.then(()=>{
    if (!dropDatabaseSync){
        console.log('Database dont Drop')
    }
})

app.use(routes)