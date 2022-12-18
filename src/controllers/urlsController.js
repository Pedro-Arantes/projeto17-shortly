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

    try {
        
    } catch (error) {
        console.log(error)
        res.sendStatus(500)
    }
}
export  async function getUrlOpen  (req, res){

    try {
        
    } catch (error) {
        console.log(error)
        res.sendStatus(500)
    }
}
export  async function deleteUrl  (req, res){

    try {
        
    } catch (error) {
        console.log(error)
        res.sendStatus(500)
    }
}