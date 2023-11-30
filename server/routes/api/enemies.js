const express = require('express');
const router = express.Router();
const dbo = require("../../db/conn");
const ObjectId = require("mongodb").ObjectId;
// get all enemies
router.get('/',(req, res) => {
    let db_connect = dbo.getDb();
    db_connect.collection("enemies").find({}).toArray().then((data) => {
        res.json(data);
    });
});
// get skills with enemy id
router.get('/skill/:id',(req,res) => {
    let db_connect = dbo.getDb();
    db_connect.collection("skills").find({enemyId: req.params.id}).toArray().then((data)=>{
        res.json(data);
    });
});
// add an enemy
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
// add a skill with enemy id
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
// delete an enemy
router.delete('/:id',(req,res)=>{
    let db_connect = dbo.getDb();
    db_connect.collection("enemies").deleteOne({_id: new ObjectId(req.params.id)}).then((data)=>{
        res.json(data);
    });
});
// delete all skills with that enemy's id
router.delete('/allSkill/:id',(req,res)=>{
    let db_connect = dbo.getDb();
    db_connect.collection("skills").deleteMany({enemyId: req.params.id}).then((data)=>{
        res.json(data);
    });
});
// delete a skill with skill id
router.delete('/skill/:id',(req,res)=>{
    let db_connect = dbo.getDb();
    db_connect.collection("skills").deleteOne({_id: new ObjectId(req.params.id)}).then((data)=>{
        res.json(data);
    });
});


module.exports = router;
