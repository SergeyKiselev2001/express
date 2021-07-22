import express from "express";
import colors from "colors";
import fs from "fs";
import path from "path";
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

let CONTACTS = [{id: 1, name:'SergeyY', value: '79165419136', marked: false}];

const PORT = 2000;
var server = express();

server.use(express.static(path.resolve(__dirname,'client')));
server.use(express.urlencoded({extended : false}));
server.use(express.json());

server.get('/api/contacts', (req, res)=>{console.log(colors.yellow('<--'), 'get - /api/contacts', colors.yellow('-->'));res.status(200).json(CONTACTS)});
server.post('/api/contacts', (req,res)=>{
    console.log(colors.yellow('<--'), 'post - /api/contacts', colors.yellow('-->'));
    console.log(req.body);
    const contact = {...req.body, id: CONTACTS.length+1, marked : false};
    CONTACTS.push(contact);
    res.status(201).json(contact);
});

server.delete('/api/contacts', (req,res)=>{
    console.log(colors.yellow('<--'), 'delete - /api/contacts', colors.yellow('-->'));
    let result = CONTACTS.findIndex(item =>{console.log(item); if (item.id === req.body.id) {return 1}});
    console.log(result);
    CONTACTS.splice(result, 1);
    res.status(201).json({'id': result});
    console.log(CONTACTS);
});

server.put('/api/contacts/', (req,res)=>{
    console.log(colors.yellow('<--'), 'put - /api/contacts', colors.yellow('-->'));
    const id  = req.body.id;
    const idx = CONTACTS.findIndex(item => item.id === req.body.id);
    console.log(id, idx);
    CONTACTS[idx].marked = !CONTACTS[idx].marked;
    res.json(JSON.stringify({'id': id}));
});


server.get('/', (req, res)=>{
   res.sendFile(path.resolve(__dirname, 'client', 'index.html'));
});

server.listen(PORT, ()=>{
    console.log(colors.bgGreen(`<-- Server been started on port ${PORT}... -->`));
});