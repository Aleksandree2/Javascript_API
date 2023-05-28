import  express  from "express";
import { getNote, getNotes, createNote } from "./database.js";
import fs from 'fs';
import { fileURLToPath } from 'url';
import path, { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);


const app = express()

app.use(express.json())
// let Emp_Html = fs.readFileSync('./View/Index.html', 'utf-8')

// let Employe_Html =  notes.map((prod)=>{
  
//     let output = Emp_Html.replace('{{%EMP_Name%}}', prod.EMP_Name)
//     return output
// })


app.get("/notes", async (req, res) =>{

    const notes = await getNotes();
     res.sendFile(path.join(__dirname, '/View/Index.html'));
   
})


app.get("/notes/:id", async (req, res) =>{
    const id = req.params.id
    const note = await getNote(id);
    res.send(note)
})

app.post("/notes", async(req, res) =>{
    const {EMP_Name, EMP_LastName, Emp_Age} = req.body
    const note = await createNote(EMP_Name, EMP_LastName, Emp_Age)
    res.status(201).send(note)
})

app.use((err, req, res, next) => {
    console.error(err.stack)
    res.status(500).send('Something broke!')
  })

  app.listen(8080, ()=>{
    console.log('Server is running on port 8080')
  })
