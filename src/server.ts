import express from 'express';
import router from './router';

const app = express();

app.get('/' , (req, res) => {
    res.json({message: 'Hello from root'});
})

app.use('/api' , router);
app.use('*' , (req , res) => {
    res.json({ message: 'route not found error'});
})

export default app;

