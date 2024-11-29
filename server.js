const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();


app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true })); 


app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});


app.post('/login', (req, res) => {
    const { username, password } = req.body;

    if (username === 'admin' && password === '1234') {
        res.redirect('/pages/quadras.html');
    } else {
        res.sendFile(path.join(__dirname, 'public', 'index.html'), { message: 'Usuário ou senha incorretos.' });
    }
});

// Iniciar o servidor
app.listen(3000, () => {
    console.log('Servidor rodando em http://localhost:3000');
});
