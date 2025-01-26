import express from 'express';
import jwt from 'jsonwebtoken';
export const routerMainPage = express.Router();

routerMainPage.get('/main', async (req, res) => {
  const token = req.cookies.access_token;
  if (!token) {
    return res.status(403).send('ACCESS NO AUTHORIZED');
  }
  try {
    const data = jwt.verify(token, process.env.JWT_TOKEN);
    res.render('main', { data });
  } catch (error) {
    console.log(error);
  }
});
