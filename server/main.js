import express from 'express';
import rateLimit from 'express-rate-limit';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import cors from 'cors';
import {getSingleForm, getAllForms, getAutocomplete} from './database.js';
import {addIssue, viewAllIssues, viewUnsolvedIssues, makeSolved, removeIssue} from './issuedatabase.js'

const app = express();
const PORT = process.env.PORT || 8000;

app.use(cors({
    origin: [
	'https://hashconj.com',
	'https://www.hashconj.com'
    ]
}));
app.use(express.json());

// ------ Rate Limiter ------
const publicLimiter = rateLimit({
  windowMs: 8 * 60 * 1000, // 8 min
  max: 20,                  // max 20 requests per IP
  standardHeaders: true,
  legacyHeaders: false,
});

// ------ Issues APIs ------
app.post('/api/issues/add', publicLimiter, async (req, res) => {
  const { type, description } = req.body;

  if (!type || !description) return res.status(400).send('Missing fields');

  await addIssue(type, description);

  return res.status(201).json({ message: 'Issue submitted' });
})

// ---------- Auth middleware ----------
function requireAdmin(req, res, next) {
    const header = req.headers.authorization;
    if (!header) return res.json({ok: false, error: 'Missing token'});

    const token = header.split(' ')[1];

    try {
        const payload = jwt.verify(token, process.env.ADMIN_JWT_SECRET);
        if (payload.role !== 'admin') throw new Error();
        next();
    } catch {
        res.json({ok: false, error: 'Forbidden'});
    }
}

app.post('/api/admin/login', async (req, res) => {
    const { password } = req.body;

    const passHash = process.env.ADMIN_PASS_HASH;
    if (!passHash) {
      throw new Error('ADMIN_PASS_HASH not set');
    }

    const valid = await bcrypt.compare(
        password,
        passHash
    );

    if (!valid) {
        return res.json({ ok: false, error: 'Invalid password' });
    }

    const token = jwt.sign(
        { role: 'admin' },
        process.env.ADMIN_JWT_SECRET,
        { expiresIn: '30m' }
    );

    res.json({ token, ok: true });
});


app.get('/api/issues/viewall', requireAdmin, async (req, res) => {
    const issues = await viewAllIssues();
    res.json({issues: issues});
})

app.get('/api/issues/viewunsolved', requireAdmin, async (req, res) => {
    const issues = await viewUnsolvedIssues();
    res.json({issues: issues});
})

app.post('/api/issues/makesolved/:id', requireAdmin, async (req, res) => {
    const {id} = req.params;
    await makeSolved(id);
    return res.status(201).json({ message: 'Issue Solved' });
})

app.delete('/api/issues/removeissue/:id', requireAdmin, async (req, res) => {
    const {id} = req.params;
    await removeIssue(id);
    return res.status(201).json({ message: 'Issue Removed' });
})

// ------ Conjugation APIs ------
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

app.get('/api/autocomplete/:term', async (req, res) => {
    const { term } = req.params;    
    
    const verb_list = await getAutocomplete(term);

    res.json(verb_list);
});

app.use((err, req, res, next) => {
    res.status(500).json({error: 'Something broke on our end!'});
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
