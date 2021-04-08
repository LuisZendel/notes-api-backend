const express = require('express');
const logger = require('./logger');
const endpoint = require('./unknownEndpoint');
const cors = require('cors');
const app = express();
app.use(cors());
app.use(express.json());
app.use(logger);


let notas = [
    {
        'id':1,
        'content': 'Primer contenido',
        'date': '17/03/2021',
        'Important': true
    },
    {
        'id':2,
        'content': 'segundo contenido',
        'date': '16/03/2021',
        'Important': false
    },
    {
        'id':3,
        'content': 'tercer contenido',
        'date': '15/03/2021',
        'Important': true
    },
];

app.get('/', (req, res) => {
    res.send('<h1>Hola mundo</h1>');
});
app.get('/api/notes', (req, res) => {
    res.json(notas);
});
app.get('/api/notes/:id', (req, res) => {
    console.log(req.params);
    const id = parseInt(req.params.id);
    console.log(id);
    const nota = notas.find(note => note.id !== id);
    if(nota){
        console.log(nota);
        res.json(nota);
    }
    else{
        res.status(404).end();
    }
});
app.delete('/api/notes/:id', (req, res) => {
    const id = Number(req.params.id);
    notas = notas.filter(note => note.id !== id); 
    res.status(204).end();
});
app.post('/api/notes', (req,res) => {
    const note = req.body;
    const content = note.content;
    const important = note.important;
    console.log('entro a la funcion de post ');
    console.log(note);
    console.log(content);
    console.log(important);
    if(content === 'undefined' || content === ''){ 
        return res.status(400).json(
            { error:'note.content is missing'}
        );
    }
    const ids = notas.map(note => note.id);
    const maxId = Math.max(...ids);
    const NewNote = {
        id: maxId+1,
        content: note.content,
        important: typeof note.important === 'undefined' ? note.important: false ,
        date: new Date().toISOString()
    };
    notas = [...notas, NewNote];
    res.status(201).json(NewNote);
});
app.put('/api/notes',(req,res) => {
    const body = req.body;
    console.log('ejecucion de put');
    console.log(body);
    console.log('Ya se imprimio el body');
    res.send(200);
});
//Buena practica para validar las direcciones
app.use(endpoint);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log('Server running');
});
console.log(PORT);

  