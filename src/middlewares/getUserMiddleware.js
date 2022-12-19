import { connection } from "../database/db.js";

export async function getUserMd(req,res,next){

    const { authorization } = req.headers;
    const token = authorization?.replace('Bearer ', '');
    
    if (!token) return res.sendStatus(401);

    try {
        const sessions = await connection.query("SELECT * FROM sessions WHERE token=$1",[token])
        if (sessions.rowCount<=0) {
            res.sendStatus(401)
            return
        }
        
        const {user_id} = sessions.rows[0]
        const users = await connection.query('SELECT * FROM users WHERE id=$1',[user_id])

        if (users.rowCount<=0) {
            res.sendStatus(404)
            return
        }
        req.info={
            user_id
        }

    } catch (error) {
        
        res.sendStatus(500)
    }
    next();

}