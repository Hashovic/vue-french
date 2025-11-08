import express from 'express';
import cors from 'cors';
import {getSingleForm, getAllForms} from './database.js';

const app = express();
const PORT = process.env.PORT || 8000;

app.use(cors());

app.get('/api/single/:verb/:formId', async (req, res) => {
    const { verb, formId } = req.params;
    const { fm, vp, fp } = req.query;

    const form = await getSingleForm(verb, formId, fm, vp, fp);
    form.verb ? res.json({ok: true, data: form}) : res.json({ ok: false, error: 'Verb Does Not Exist'});
});

app.get('/api/all/:verb', async (req, res) => {
    const { verb } = req.params;
    // fp = forcePronomial
    const { fp } = req.query;

    const forms = await getAllForms(verb, +fp);

    forms[2].verb ? res.json({ok: true, data: forms}) : res.json({ok: false, error: 'Verb Does Not Exist'});
});


app.use((err, req, res, next) => {
  res.status(500).json({error: 'Something broke on our end!'});
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});