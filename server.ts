const express = require('express');
const app = express();
const port = 3000;

 app.use(express.json());
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

const data = [
    { id: 1, name: 'item 1'},
    { id: 2, name: 'item 2'},
    { id: 3, name: 'item 3'},
];


app.get('/', (req, res) => {
    res.send("Hello Express!");
});

// List (GET) all items
app.get('/items', (req, res) => {
    res.send(data);
});

// List (GET) specific item by id
app.get('/items/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const item = data.find(item => item.id === id);
    if (!item) {
        return res.status(404).json({ message: 'Item not found' });
    } else {
        res.json(item);
    }
});

// Create (POST) item
app.post('/items', (req, res) => {
    const newItem = req.body;
    data.push(newItem);
    res.status(201).json(newItem);
});

// Update (PUT) item
app.put('/items/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const updatedItem = req.body;
    const index = data.findIndex((item) => item.id === id);
    if (index === -1) {
        return res.status(404).json({ message: 'Item not found' });
    } else {
        data[index] = {...data[index], ...updatedItem};
        res.json(data[index]);
    }
});


// Delete (DELETE) item
app.delete('/items/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const index = data.findIndex((item) => item.id === id);
    if (index === -1) {
        return res.status(404).json({ message: 'Item not found' });
    } else {
        const deletedItem = data.splice(index, 1);
        res.json(deletedItem[0]);
    }
});