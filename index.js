const app = require('express')();
const fileUpload = require('express-fileupload');

const handleUploads = fileUpload({
  limits: { fileSize: 5 * 1024 * 1024 },
});

let id = 1;

function formatResponse(file) {
  return {
    id: id++,
    size: file.size,
    md5: file.md5,
    mimetype: file.mimetype,
    uploaded_at: Date.now(),
    filename: file.name,
  };
};

app.get('/', (req, res) => {
  res.sendFile('index.html', {root: __dirname })
});

app.post('/upload', handleUploads, (req, res, next) => {
  const images = req.files['images'];
  res.json(Array.isArray(images) ? images.map(formatResponse) : [formatResponse(images)])
});

app.listen(3001);