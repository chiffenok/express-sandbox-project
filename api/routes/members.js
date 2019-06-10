const express = require('express');
const router = express.Router();
const uuid = require('uuid');
const members = require('../../Members');


// Get All Members
router.get('/', (req, res) => res.json(members));

// Get Single Member
router.get('/:id', (req, res) => {
    const found = members.some( member => member.id === parseInt(req.params.id));
    if (found) {
        res.json(members.filter( member => member.id === parseInt(req.params.id)));
    } else {
        res.status(400).json({ msg: `No member with id of ${req.param.id}`});
    }
    console.log(found);
});

// Create Member
router.post('/', (req, res) => {
    //res.send(req.body);

    const newMember = {
        id: uuid.v4(),
        name: req.body.name,
        email: req.body.email,
        status: 'active'
    }

    if(!newMember.name || !newMember.email) {
        return res.status(400).json({msg: 'Please include name and email'});
    }

    members.push(newMember);
    res.json(members);
    //res.redirect('/');
});

// Update Member 
router.put('/:id', (req, res) => {
    const found = members.some( member => member.id === parseInt(req.params.id));
    if (found) {
        const updateMember = req.body;
        members.forEach( member => {
            if(member.id === parseInt(req.params.id)) {
                member.name = updateMember.name ? updateMember.name : member.name;
                member.email = updateMember.email ? updateMember.email : member.email;
                res.json({msg: 'Member was updated', member});
            }
        });
    } else {
        res.status(400).json({ msg: `No member with id of ${req.param.id}`});
    }
});

// Delete Member
router.delete('/:id', (req, res) => {
    const found = members.some( member => member.id === parseInt(req.params.id));
    if (found) {
        res.json({
            msg: 'Member was deleted',
            members: members.filter( member => member.id !== parseInt(req.params.id))
        });
    } else {
        res.status(400).json({ msg: `No member with id of ${req.param.id}`});
    }
    console.log(found);
});

module.exports = router;