const pdfParse = require('pdf-parse');
const express = require('express');
const cors = require('cors');

const app = express();

app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));
app.use(cors());

const port = 3000;

app.post("/extract", async (req, res) => {
    try {
        let { file1, file2 } = req.body;

        const buffer1 = Buffer.from(file1, "base64");
        const buffer2 = Buffer.from(file2, "base64");

        const data1 = await pdfParse(buffer1);
        const data2 = await pdfParse(buffer2);

        res.status(200).json({ text1: data1.text, text2: data2.text });
    } catch (e) {
        console.error(e);
        res.status(500).json({"text1": e, "text2": "Error"});
    }
});

app.listen(port, () => {
    console.log("Server is up at " + port);
});
