require('dotenv').config()
const express = require('express')
const cors = require('cors')
const {sequelize} = require('./src/models/init-models')
const routes = require('./src/routes/index')
const multer = require('multer');

const app = express()
const port = process.env.PORT || 4100

const fileStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads')
    }
})

const fileFilter = (req, file, cb) => {
    const allowedTypes = ['.jpg', '.jpeg', '.png'];
    const maxFileSize = 100 * 1024; // 100KB
    
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
    storage: fileStorage, 
    fileFilter: fileFilter,
    limits: {
        fileSize: 100 * 1024
    }
}).single('foto'))
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