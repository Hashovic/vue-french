import express from 'express';
import cors from 'cors';
import {getSingleForm, getAllForms} from './database.js';

const app = express();
const PORT = process.env.PORT || 8000;

app.use(cors());

app.get('/api/single/:verb/:formId', async (req, res) => {
    const { verb, formId } = req.params;
    const { isFeminine, isVousPlural, forcePronomial } = req.query;

    const form = await getSingleForm(verb, formId, isFeminine, isVousPlural, forcePronomial);
    res.json(form);
});

app.get('/api/all/:verb', async (req, res) => {
    const { verb } = req.params;
    // fp = forcePronomial
    const { fp } = req.query;

    const forms = await getAllForms(verb, +fp);
    res.json(forms);
});


app.use((err, req, res, next) => {
  console.error(err.stack)
  res.status(500).send('Something broke!');
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});