const express = require('express');
const cors = require('cors');
const users = require('./users');

const app = express();
app.use(cors());
app.use(express.json());

app.post('/login', (req, res) => {
    const { username, password } = req.body;
    const user = users.find(u => u.username === username && u.password === password);
    if (user) {
        return res.json({ role: user.role });
    } else {
        res.status(401).json({ message: 'Invalid credentials' });
    }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});