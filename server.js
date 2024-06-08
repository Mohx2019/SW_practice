const express = require('express');
const path = require('path');
const multer = require('multer');
const fs = require('fs');
const app = express();
const PORT = 8080;

// Serve static files from the public directory
app.use(express.static(path.join(__dirname, 'public')));

// Set up multer for file uploads
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'public/videos');
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + '-' + file.originalname);
    }
});
const upload = multer({ storage });

// Sample list of videos (initial videos)
let videos = [
    { title: 'How to train your dragon!', filename: 'public/videos/video1.mp4' , details: 'Resolution: HD - Age: +10 years'},
    { title: 'Old Trees', filename: 'public/videos/video2.mp4' , details: 'Resolution: 4K - Age: +10 years'},
    { title: 'Night', filename: 'public/videos/video3.mp4' , details: 'Resolution: Low - Age: +18 years'},
];

// Serve the initial list of videos
app.get('/videos', (req, res) => {
    res.json(videos);
});

// Search endpoint
app.get('/search', (req, res) => {
    const query = req.query.q.toLowerCase();
    const results = videos.filter(video => video.title.toLowerCase().includes(query));
    res.json(results);
});

// Upload endpoint
app.post('/upload', upload.single('video'), (req, res) => {
    const videoTitle = req.body.title;
    const videoFilename = req.file.filename;
    videos.push({ title: videoTitle, filename: videoFilename });
    res.redirect('/');
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

