import express from 'express';
import cors from 'cors';
import multer from 'multer';


const app = express();

app.use(cors());

const PORT = 5000

import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);

const __dirname = path.dirname(__filename);

const staticRoute = path.join(__dirname, '/uploads')

app.use('/uploads/',express.static(staticRoute))

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './uploads')
    },
    filename: (req, file, cb) =>{
        const ext = req.body.name.split('.').pop()
        cb(null,`${Date.now()}.${ext}`)
    }
})

const upload = multer({storage})

app.post('/upload',upload.single('file'), (req,res) => {
    console.log('request')
    console.log(req.file.filename)
    res.status(200).json({nameImage:req.file.filename});
})
    


app.listen(PORT,()=>{
    console.log('Servidor iniciado en el puerto ', PORT);
})