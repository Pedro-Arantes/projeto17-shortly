import { signUpSchema } from "../models/signUpModel.js";
import { connection } from "../database/db.js";

export async function signUpSchemaMd(req, res, next) {
    const {email}=req.body
    const validation = signUpSchema.validate(req.body);
    if (validation.error) {
        res.status(422).send(validation.error.details[0].message)
        console.log(validation.error.details.message)
        return
    }
    const users= await connection.query("SELECT * FROM users WHERE email=$1",[email]);
    console.log(users)
    if (users.rowCount > 0) {
        res.sendStatus(409)
        return
    }
    next();
}