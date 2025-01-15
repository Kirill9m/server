import https from 'https';
import express from "express";
import fs from "fs/promises";
import path from "path";

const options = {
    key: fs.readFileSync('/etc/letsencrypt/live/projectki.se/privkey.pem'),
    cert: fs.readFileSync('/etc/letsencrypt/live/projectki.se/fullchain.pem')
  };
const app = express();

app.get('/', async (request, response) => {
    const buf = await fs.readFile('./static/index.html');
    const html = buf.toString();
    response.send(html);
});

app.use('/static', express.static('./static'));

app.get('/:name', async (request, response) => {
    const buf = await fs.readFile('./static/index.html');
    const html = buf.toString();
    const name = request.params.name;

    const changedHtml = html.replace('world', name);

    response.send(changedHtml);
});

https.createServer(options, app).listen(443, () => {
    console.log('HTTPS Server running on https://your-domain.com:443');
  });

// app.get('/*', async (request, response) => {
//   try {
//     const path = request.path;
//     const fileName = `./static${path}`;
//     const buf = await fs.readFile(fileName);
//     const text = buf.toString();

//     const suffix = path.split('.')[1];
//     response.setHeader('Content-Type', 'text/' + suffix);
//     response.send(text);
//   } catch (err) {
//     response.status(404);
//     // responce.end();
//   }
// });

// app.get('/index.html', async (request, response) => {
//     const buf = await fs.readFile('./static/index.html');
//     const html = buf.toString();

//     response.send(html);
// });

// app.get('/main.css', async (request, response) => {
//     const buf = await fs.readFile('./static/main.css');
//     const css = buf.toString();

//     response.setHeader('Content-Type', 'text/css')
//     response.send(css);
// });
