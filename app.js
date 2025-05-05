import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import sprintRoutes from './routes/sprintRoutes.js';
import taskRoutes from './routes/taskRoutes.js';

dotenv.config()

const app = express()
app.use(cors())
app.use(express.json())

// Prueba de api
app.use('/api/tasks', taskRoutes);
app.use('/api/sprints', sprintRoutes);

// Coneccion a Mongo
mongoose.connect(process.env.MONGO_URI)
  .then(()=>{
    console.log('Coneccion exitosa con MongoDB')
  })
  .catch((err) =>{
    console.log('Error en la coneccion con MongoDB :' + err)
  })


app.listen(process.env.PORT, ()=>{
  console.log(`Servidor en http://localhost:${process.env.PORT}`)
})