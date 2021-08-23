require('dotenv').config();
const fs = require('fs');
const {v4: uuidv4} = require('uuid');

const env = process.env.NODE_ENV || 'development'

const filePath = {
    development: "db/pangaeadb-dev.js",
    test: "db/pangaeadb-test.js",
    production: "db/pangaeadb.js"
};
class Database {
    constructor(){
        try{
            //Let check if the db folder exists else let create it
            if(!fs.existsSync('db')){
                fs.mkdirSync('db');
            }
            //Let check if the db json file exists else let create it
            if(!fs.existsSync(filePath[env])){
                fs.writeFileSync(filePath[env], JSON.stringify([]));
            }
        }catch(e){
            fs.writeFileSync(filePath[env], JSON.stringify([]));
        }
    }

    //Let filter the json array file by any of the params
    async findAll(param = {id: '', topic: '', url: ''}){
        const data = JSON.parse(fs.readFileSync(filePath[env], 'utf8'));
        if(param?.id || param?.topic || param?.url){
            return data.filter(d => d?.id === param?.id || d?.topic === param?.topic || d?.url === param?.url);
        }
        return data;
    }

    //Let find a particular data in the json array file by any of the params
    async findOne(param = {id: '', topic: '', url: ''}){
        const data = await this.findAll();
        return data.find(d => d?.id === param?.id || d?.topic === param?.topic || d?.url === param?.url);
    }

    //Let add item to the json array
    async create(body = {topic: '', url: ''}){
        let data = await this.findAll();
        //Let confirm same data doesn't exist
        const isExist = data.find(d => d.url == body.url && d.topic === body.topic);
        if(isExist && Object.values(isExist).length > 0){
            throw new Error("Subscriber already exist")
        }
        const payload = {
            id: uuidv4(),
            ...body,
            createdAt: new Date(),
            modifiedAt: new Date()
        }
        data.push(payload);
        fs.writeFileSync(filePath[env], JSON.stringify(data));
        return payload
    }

    async update(id, body = {topic: '', url: ''}){
        let data = await this.findAll();
        let isExist = data?.find(d => d.id === id);
        //Let confirm data exist in the array before updating the record
        if(isExist && Object.values(isExist).length < 0){
            throw new Error(`Data not found for id: ${id}`);
        }
        if(body?.topic){
            isExist.topic = body?.topic;
        }
        if(body?.url){
            isExist.url = body?.url;
        }
        isExist.updatedAt = new Date();
        data = data.filter(d => d.id !== id);
        data.push(isExist);
        fs.writeFileSync(filePath[env], JSON.stringify(data));
        return true
    }

    async delete(id = ''){
        let data = await this.findAll();
        let isExist = data?.find(d => d.id === id);
        if(isExist && Object.values(isExist).length < 0){
            throw new Error(`Data not found for id: ${id}`);
        }
        data = data.filter(d => d.id !== id);
        fs.writeFileSync(filePath[env], JSON.stringify(data));
        return true
    }

}

module.exports = Database;