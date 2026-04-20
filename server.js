const multer = require('multer')
const pdfParse = require('pdf-parse');
const express = require('express');
const cors = require('cors');

const app = express();
const upload = multer()

app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));
app.use(cors());

const port = 3000;

app.post("/extract", 
    upload.single("file"), async (req, res) => {
    try {
        const buffer = req.file.buffer;

        const data = await pdfParse(buffer);

        res.status(200).json({"text": data.text});
    } catch (e) {
        console.error(e);
        res.status(500).json({ "text1":"Error extracting text", "text2": "Error extracting text"});
    }
});

app.listen(port, () => {
    console.log("Server is up at " + port);
});
