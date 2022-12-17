import { signInSchema } from "../models/signInModel.js";
import { connection } from "../database/db.js";

export async function signInSchemaMd(req, res, next) {
    const {email,password}=req.body
    const validation = signInSchema.validate(req.body);
    if (validation.error) {
        res.status(422).send(validation.error)
        console.log(validation.error)
        return
    }
    const users= await connection.query("SELECT * FROM users WHERE email=$1 AND password=$2 " ,[email,password]);
    if (users.length === 0) {
        res.sendStatus(401)
        return
    }
    next();
}