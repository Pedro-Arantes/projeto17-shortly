import { connection } from "../database/db.js";

export async function getUsers(req, res) {
    const { user_id } = req.info
    try {

        const users = await connection.query(`SELECT 
        u.id,
        username AS name,
        CASE WHEN
        SUM(ur."visitedCount") = 0 
        THEN 0 
        WHEN SUM(ur."visitedCount") 
        IS NULL
        THEN 0
        END AS "visitCount",
        JSON_AGG(json_build_object(
            'id',ur.id,
            'shortUrl',ur."shortUrl",
            'url',ur.url,
            'visitCount',ur."visitedCount"
        )) AS "shortenedUrls"
        FROM users u 
        LEFT JOIN urls ur 
        ON u.id=ur.user_id 
        WHERE u.id=$1 
        GROUP BY u.id;`, [user_id])
        console.log(users.rows)
        res.status(200).send(users.rows[0])
    } catch (error) {
        console.log(error)
        res.sendStatus(500)
    }
}

export async function getRanking(req, res) {

    try {
        const ranking = await connection.query(`SELECT 
        u.id,
        u.username AS name,
        CASE WHEN COUNT(ur.id) = 0 THEN 0 
        ELSE COUNT(ur.id) 
        END AS "linksCount",
        CASE WHEN SUM(ur."visitedCount") =0 
        THEN 0 
        WHEN SUM(ur."visitedCount") 
        IS NULL
        THEN 0
        ELSE SUM(ur."visitedCount") 
        END AS "visitCount" 
        FROM users u 
        LEFT JOIN  urls ur
        ON u.id=ur.user_id  
        GROUP BY u.id 
        ORDER BY "visitCount" DESC
        LIMIT 10;`)

        res.status(200).send(ranking.rows)
    } catch (error) {
        console.log(error)
        res.sendStatus(500)
    }
}