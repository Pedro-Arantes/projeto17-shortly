import { connection } from "../database/db.js";

export async function postSignUp(req, res) {

    const { name, email, password } = req.body

    try {
        const users = await connection.query("INSERT INTO users (username,email,password) VALUES ($1,$2,$3)",[name,email,password]);
        res.sendStatus(201);

    } catch (error) {
        console.log(error)
        res.sendStatus(500)
    }
}

export async function postSignIn(req, res) {

    try {

    } catch (error) {
        console.log(error)
        res.sendStatus(500)
    }
}