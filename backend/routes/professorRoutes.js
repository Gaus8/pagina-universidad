import express from 'express';
import { validateToken } from '../middleware/validateToken.js';
import { renderRoutes } from '../controllers/renderRoutes.js';
import { qualifyProject, findProjectsMongo } from '../controllers/professorController.js';

export const routerProffesor = express.Router();

routerProffesor.get('/main', validateToken, renderRoutes('professor'));
routerProffesor.get('/scores', validateToken, renderRoutes('professor_grades'));

routerProffesor.post('/scores', validateToken, findProjectsMongo);
routerProffesor.patch('/scores', validateToken, qualifyProject);
