import express from 'express';
import User from '../esquema/userSchema.js';
export const routerProjects = express.Router();

routerProjects.get('/projects', async (req, res) => {

  res.render('projects');
});
