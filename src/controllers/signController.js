import { connection } from "../database/db.js";
import bcrypt from "bcrypt";
import { v4 as uuid } from 'uuid';

export async function postSignUp(req, res) {

    const { name, email, password } = req.body
    const criptPass = bcrypt.hashSync(password, 10);

    try {
        const users = await connection.query("INSERT INTO users (username,email,password) VALUES ($1,$2,$3)",[name,email,criptPass]);
        res.sendStatus(201);

    } catch (error) {
        console.log(error)
        res.sendStatus(500)
    }
}

export async function postSignIn(req, res) {

    const { email, password } = req.body
    const {id} = req.info
    const token = uuid();

    try {
        const delSession = await connection.query("DELETE  FROM sessions WHERE user_id=$1",[id])
        const sessions = await connection.query("INSERT INTO sessions (user_id,token) VALUES ($1,$2)",[id,token]);
        res.status(200).send(token);

    } catch (error) {
        console.log(error)
        res.sendStatus(500)
    }
}