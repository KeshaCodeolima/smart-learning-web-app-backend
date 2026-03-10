const express = require('express');
const router = express.Router();
const ffmpeg = require('fluent-ffmpeg');
const ffmpegPath = require('ffmpeg-static');
const multer = require('multer');
const path = require('path')
const OpenAI = require('openai');
const fs = require('fs');
const Transcript = require('../DBConnection/videotextschema');

ffmpeg.setFfmpegPath(ffmpegPath);

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY
});

const uploadFolder = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadFolder)) fs.mkdirSync(uploadFolder, { recursive: true });

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, uploadFolder);
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + "-" + file.originalname);
    }
});

const upload = multer({ storage });

router.post('/upload', upload.single('video'), async (req, res) => {
    try {
        const userId = req.body.userId;
        const videoPath = req.file.path;
        const mp3Path = path.join(uploadFolder, path.parse(req.file.filename).name + '.mp3');

        ffmpeg(path.resolve(videoPath))
            .toFormat('mp3')
            .on('end', async () => {
                const transcription = await openai.audio.transcriptions.create({
                    file: fs.createReadStream(mp3Path),
                    model: "whisper-1"
                });
                const text = transcription.text;
                const updateTranscript = await Transcript.findOneAndUpdate(
                    { userId },
                    { transcript: text, updateAt: new Date() },
                    { upsert: true, new: true }
                );
                fs.unlink(videoPath, (err) => {
                    if (err) console.log("Video delete error", err);
                });
                fs.unlink(mp3Path, (err) => {
                    if (err) console.log("MP3 delete error", err);
                });
                res.json({
                    message: "Transcript saved and files deleted",
                    transcript: updateTranscript
                });
            })
            .on('error', (err) => {
                console.log(err);
                res.status(500).json({ error: "Conversion failed" });
            })
            .save(mp3Path);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Server error" });
    }
});

module.exports = router;
