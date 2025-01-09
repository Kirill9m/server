import http from 'http';
import express from 'express';

const app = express();

app.get('/hello', (request, response) => {
    const name = request.query.firstName || 'world';
    response.send(`Hello, world, ${name}`);
});

app.get('/goodbye', (request, response) => {
    response.send('Goodbye, world');
});

app.listen(3080)