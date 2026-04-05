import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';   
import mongoose from 'mongoose';
import dotenv from 'dotenv';


const app = express();
dotenv.config();

app.use(cors());
app.use(bodyParser.json());


