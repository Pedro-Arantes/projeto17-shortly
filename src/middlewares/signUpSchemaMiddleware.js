import { signUpSchema } from "../models/signUpModel.js";
import { connection } from "../database/db.js";

export async function signUpSchemaMd(req, res, next) {
    const {email}=req.body
    const validation = signUpSchema.validate(req.body);
    if (validation.error) {
        res.status(400).send(validation.error)
        console.log(validation.error)
        return
    }
    const categories= await connection.query("SELECT * FROM categories WHERE email=$1",[email]);
    if (categories.length > 0) {
        res.sendStatus(409)
        return
    }
    next();
}