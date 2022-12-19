import { connection } from "../database/db.js";

export  async function getUsers  (req, res){
    const {user_id} = req.info
    try {

        const users = await connection.query(`SELECT 
        u.id,
        username AS name,
        SUM(ur."visitedCount") AS "visitCount",
        JSON_AGG(json_build_object(
            'id',ur.id,
            'shortUrl',ur."shortUrl",
            'url',ur.url,
            'visitCount',ur."visitedCount"
        )) AS "shortenedUrls"
        FROM users u 
        JOIN urls ur 
        ON u.id=ur.user_id 
        WHERE u.id=$1 
        GROUP BY u.id;`,[user_id])
        console.log(users.rows)
        res.status(200).send(users.rows[0])
    } catch (error) {
        console.log(error)
        res.sendStatus(500)
    }
}

export  async function getRanking  (req, res){

    try {
        
    } catch (error) {
        console.log(error)
        res.sendStatus(500)
    }
}