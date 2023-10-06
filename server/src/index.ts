import express from 'express';
import connectToDB from './config/database';

const app = express();

connectToDB();