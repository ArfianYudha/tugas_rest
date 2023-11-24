const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const express = require('express');
const app = express();
// Read all books
app.get('/buku', async (req, res) => {
    const books = await prisma.buku.findMany();
    res.json(books);
});

// Read a book by ID
app.get('/buku/:id', async (req, res) => {
    const { id } = req.params;
    const book = await prisma.buku.findUnique({
        where: { id: parseInt(id) },
    });
    res.json(book);
});

// Create a book
app.post('/buku', async (req, res) => {
    const { judul, pengarang, tahun, penerbit } = req.body;
    const book = await prisma.buku.create({
        data: {
            judul,
            pengarang,
            tahun,
            penerbit,
        },
    });
    res.json(book);
});

// Update a book
app.put('/buku/:id', async (req, res) => {
    const { id } = req.params;
    const { judul, pengarang, tahun, penerbit } = req.body;
    const book = await prisma.buku.update({
        where: { id: parseInt(id) },
        data: { judul, pengarang, tahun, penerbit },
    });
    res.json(book);
});

// Delete a book
app.delete('/buku/:id', async (req, res) => {
    const { id } = req.params;
    const book = await prisma.buku.delete({
        where: { id: parseInt(id) },
    });
    res.json(book);
});
// Start the server
app.listen(3000, () => {
    console.log('Server is running on http://localhost:3000');
});
