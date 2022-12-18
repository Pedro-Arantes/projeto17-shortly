import { urlSchema } from "../models/urlModel.js";
import { connection } from "../database/db.js";

export async function shortUrlMd(req,res,next){

    const { authorization } = req.headers;
    const token = authorization?.replace('Bearer ', '');
    
    if (!token) return res.sendStatus(401);

    const validation = urlSchema.validate(req.body);

    if (validation.error) {
        res.status(422).send(validation.error.details[0].message)
        return
    }

    try {
        const sessions = await connection.query("SELECT * FROM sessions WHERE token=$1",[token])
        if (sessions.rowCount<=0) {
            res.sendStatus(401)
            return
        }
        const id = sessions.rows[0].user_id
        req.info = {
            id
        }
    } catch (error) {
        
        res.sendStatus(500)
    }
    next();

}