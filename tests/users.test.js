const express = require("express");
const request = require("supertest");
const router = require("../routes/users");
const db = require("../config/config")
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const app = express()
app.use("/", router)

describe("test handlers", function () {
    test("respond to /", async () => {
        const response = await request(app).get("/")
        expect(response.text).toEqual("API READY TO GO!")
    })

    test("respond to /buku", async () => {
        const response = await request(app).get("/buku")
        const books = await prisma.buku.findMany();

        expect(response.body).toEqual({
            status: true,
            data: books,
            message: "GET success",
        });
    })

    test("post to /buku", async () => {
        const reqBody = {
            judul: "Judul Buku",
            pengarang: "Pengarang Buku",
            tahun: "2023",
            penerbit: "Penerbit Buku",
        }

        const response = await request(app).post("/buku").send(reqBody);

        expect(response.body).toEqual({
            status: true,
            message: "Data Created",
        });
    })
})
