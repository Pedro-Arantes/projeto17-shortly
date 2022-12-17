import { signInSchema } from "../models/signInModel.js";
import { connection } from "../database/db.js";
import bcrypt from "bcrypt";

export async function signInSchemaMd(req, res, next) {
    const { email, password } = req.body
    const validation = signInSchema.validate(req.body);
    if (validation.error) {
        res.status(422).send(validation.error.details[0].message)
        return
    }

    const users = await connection.query("SELECT * FROM users WHERE email=$1", [email]);


    if (users.rowCount === 0 || !bcrypt.compareSync(password, users.rows[0].password)) {
        res.sendStatus(401)
        return
    }
    const {id} = users.rows[0]
    req.info = {
        id
    };
    next();
}