import { connection } from "../database/db.js";
import { customAlphabet } from 'nanoid'


export  async function postShortUrl (req, res){
    const {url} = req.body
    const {id} = req.info
    const nanoid = customAlphabet('1234567890abcdef', 6)

    const short = nanoid()
    try {
        const urls = await connection.query('INSERT INTO urls ("shortUrl",url,"visitedCount",user_id) VALUES($1,$2,$3,$4)',[short,url,0,id])
        res.status(201).send(short);
        
    } catch (error) {
        console.log(error)
        res.sendStatus(500)
    }
}
export  async function getUrl  (req, res){
    const {id} = req.params
    try {
        const urls = await connection.query('SELECT id,"shortUrl",url  FROM urls WHERE id=$1',[id])

        if (urls.rowCount <=0) {
            res.sendStatus(404)
            return
        }

        res.status(200).send(urls.rows[0])

    } catch (error) {
        console.log(error)
        res.sendStatus(500)
    }
}
export  async function getUrlOpen  (req, res){
    const {shortUrl} = req.params
    try {
        const urls = await connection.query('SELECT url ,"visitedCount"FROM urls WHERE "shortUrl"=$1',[shortUrl])

        if (urls.rowCount<=0) {
            res.sendStatus(404)
        }

        const urlUp = await connection.query('UPDATE urls SET "visitedCount"="visitedCount"+1 ')

        res.redirect(urls.rows[0].url)
        
    } catch (error) {
        console.log(error)
        res.sendStatus(500)
    }
}
export  async function deleteUrl  (req, res){
    const {id} = req.params
    try {
        const delUrls = await connection.query('DELETE FROM urls WHERE id=$1',[id])
        res.sendStatus(204);
    } catch (error) {
        console.log(error)
        res.sendStatus(500)
    }
}