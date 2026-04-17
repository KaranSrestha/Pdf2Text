const pdfParse = require('pdf-parse');
const express = require('express');
const cors = require('cors');

const app = express();

app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));
app.use(cors());

const port = 3000;

app.post("/extract", async (req, res) => {
    try{
        const {file1, file2} = req.body;
        const buffer1 = Buffer.from(file1, "base64");
        const buffer2 = Buffer.from(file2, "base64");

        const data1 = await pdfParse(buffer1);
        const data2 = await pdfParse(buffer2);

        res.json({text1: data1.text, text2: data2.text}).status(200);
    }catch(e){
        console.log(e);
        res.status(500).send("Error extracting text");
    }
})

app.listen(port, () => {
    console.log("Server is up at " + port);
})