import express from 'express';
import jwt from 'jsonwebtoken';
export const routerMainPage = express.Router();

routerMainPage.get('', async (req, res) => {
  const token = req.cookies.access_token;
  if (!token) {
    return res.status(403).send('ACCESS NO AUTHORIZED');
  }
  try {
    const data = jwt.verify(token, process.env.JWT_TOKEN);
    res.render('students', { data });
  } catch (error) {
    console.log(error);
  }
});

routerMainPage.get('/projects', async (req, res) => {
  res.render('projects');
});
