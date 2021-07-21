import express from "express";
import colors from "colors";
import fs from "fs";
import path from "path";
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const CONTACTS = [{id: 1, name:'SergeyY', value: '79165419136', marked: false}];

const PORT = 2000;
var server = express();



server.use(express.static(path.resolve(__dirname,'client')));


server.get('/api/contacts', (req, res)=>{console.log(colors.yellow('<--'), 'запрос по /api/contacts', colors.yellow('-->'));res.status(200).json(CONTACTS)});
server.get('/', (req, res)=>{
    
   res.sendFile(path.resolve(__dirname, 'client', 'index.html'));
  
});

server.listen(PORT, ()=>{
    console.log(colors.bgGreen(`<-- Server been started on port ${PORT}... -->`));
});