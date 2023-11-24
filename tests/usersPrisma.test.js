const { PrismaClient } = require("@prisma/client");
const express = require("express");
const request = require("supertest");
const router = require("../routes/usersPrisma");

const prisma = new PrismaClient();
const app = express();

app.use("/", router);

describe("test handlers", function () {
    test("respond to /buku", async () => {
        try {
            const response = await request(app).get("/buku");

            const getBooks = await prisma.buku.findMany();
            expect(response.body).toEqual({
                status: true,
                data: getBooks,
                message: "GET success",
            });
        } catch (err) {
            console.error(err);
        }
    });

    test("post to /buku", async () => {
        try {
            const reqBody = {
                judul: "Judul Buku",
                pengarang: "Pengarang Buku",
                tahun: "2023",
                penerbit: "Penerbit Buku",
            };

            const response = await request(app)
                .post("/buku")
                .send(reqBody)
                .set("Accept", "application/json");

            const book = await prisma.buku.create({
                data: {
                    judul: reqBody.judul,
                    pengarang: reqBody.pengarang,
                    tahun: reqBody.tahun,
                    penerbit: reqBody.penerbit,
                },
            });

            expect(response.body).toEqual({
                status: true,
                message: "Data Created",
                data: {
                    id: book.id,
                    data: book,
                },
            });
        } catch (err) {
            console.error(err);
        }
    });
});
