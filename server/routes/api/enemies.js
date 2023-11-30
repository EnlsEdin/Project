const express = require('express');
const router = express.Router();
const dbo = require("../../db/conn");
const ObjectId = require("mongodb").ObjectId;

router.get('/',(req, res) => {
    let db_connect = dbo.getDb();
    db_connect.collection("enemies").find({}).toArray().then((data) => {
        res.json(data);
    });
});

router.get('/skill/:id',(req,res) => {
    let db_connect = dbo.getDb();
    db_connect.collection("skills").find({enemyId: req.params.id}).toArray().then((data)=>{
        res.json(data);
    });
});

router.post('/',(req,res) => {
    let db_connect = dbo.getDb();
    const newEnemy = {
        name: req.body.name,
        type: req.body.type,
        description: req.body.description,
    }
    if(!newEnemy.name || !newEnemy.description){
        return res.status(400).json({msg:'Please include name and description'});
    }
    db_connect.collection("enemies").insertOne(newEnemy).then((data)=>{
        res.json(data);
    });
    
});

router.post('/:id',(req,res) => {
    let db_connect = dbo.getDb();
    const newSkill = {
        enemyId: req.params.id,
        name: req.body.name,
        description: req.body.description
    }
    if(!newSkill.name || !newSkill.description){
        return res.status(400).json({msg:'Please include name and description'});
    }
    db_connect.collection("skills").insertOne(newSkill).then((data)=>{
        res.json(data);
    });
});

router.delete('/:id',(req,res)=>{
    let db_connect = dbo.getDb();
    db_connect.collection("enemies").deleteOne({_id: new ObjectId(req.params.id)}).then((data)=>{
        res.json(data);
    });
});

router.delete('/allSkill/:id',(req,res)=>{
    let db_connect = dbo.getDb();
    db_connect.collection("skills").deleteMany({enemyId: req.params.id}).then((data)=>{
        res.json(data);
    });
});

router.delete('/skill/:id',(req,res)=>{
    let db_connect = dbo.getDb();
    db_connect.collection("skills").deleteOne({_id: new ObjectId(req.params.id)}).then((data)=>{
        res.json(data);
    });
});


module.exports = router;
