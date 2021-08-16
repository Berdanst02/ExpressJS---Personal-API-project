
const express = require('express');
const router = express.Router();  
const members =require('../../Members');
const uuid=require('uuid');


router.get('/', (req, res) =>{

    res.json(members);
 
 });
 
 //get a single member
 
 router.get('/:id', (req,res)=>{
     
     const found= members.some(member=>member.id===parseInt(req.params.id));
     if(found){
         
     res.json(members.filter(member=>member.id===parseInt(req.params.id)));
     }
     else{
         res.status(400).json({msg: `Not member with the id of ${req.params.id}`});
     }
  
 });
 
//creating member

router.post('/', (req,res)=>{
    const newMember={
        id:uuid.v4(),
        name: req.body.name,
        status:'active'

    }

    if(!newMember.name){
       return res.status(400).json({msg:'please include a name'});
    }

    members.push(newMember);
    res.json(members);

     




});

//update members

router.put('/:id', (req,res)=>{
     
    const found= members.some(member=>member.id===parseInt(req.params.id));
    if(found){
    const updMember=req.body;
    members.forEach(member=>{

        if(member.id===parseInt(req.params.id)){

            member.name = updMember.name ? updMember.name:member.name;
        
            res.json({msg:'member was updated', member});
        }


    });

    }
    else{
        res.status(400).json({msg: `Not member with the id of ${req.params.id}`});
    }
 
});

//delete member

router.delete('/:id', (req,res)=>{
     
    const found= members.some(member=>member.id===parseInt(req.params.id));
    if(found){
        
    res.json({msg:'member deleted ',members: members.filter(member=>member.id!==parseInt(req.params.id))});
    }
    else{
        res.status(400).json({msg: `Not member with the id of ${req.params.id}`});
    }
 
});



 module.exports = router;
