import { connection } from "../database/db.js";

export async function delUrlMd(req,res,next){

    const { authorization } = req.headers;
    const {id} = req.params
    const token = authorization?.replace('Bearer ', '');
    
    if (!token) return res.sendStatus(401);

    try {
        const sessions = await connection.query("SELECT * FROM sessions WHERE token=$1",[token])
        if (sessions.rowCount<=0) {
            res.sendStatus(401)
            return
        }
        
        const {user_id} = sessions.rows[0]
        const urls = await connection.query('SELECT user_id FROM urls WHERE id=$1',[id])

        if (urls.rows[0].user_id !== user_id) {
            res.sendStatus(401)
            return
        }

    } catch (error) {
        
        res.sendStatus(500)
    }
    next();

}