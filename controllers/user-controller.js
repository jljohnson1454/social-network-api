const { User } = require('../models');

const userController = {
    getAllUsers(req, res) {
        User.find({})
        .populate({
            path: 'thoughts',
            select: '-__v'
        })
        .select('-__v')
        .sort({ _id: -1})
        .then(dbUserData => res.json(dbUserData))
        .catch(err => {
            console.log(err);
            res.status(400).json(err);
        })
    },

    getUserById({ params }, res) {
        User.findOne ({ _id: params.id })
        .populate({
            path: 'thoughts',
            select: '-__v'
        })
        .select('-__v')
        .then(dbUserData => {
            if(!dbUserData) {
                res.status(404).json({ message: 'No user found with this id!'});
                return;
            }
            res.json(dbUserData);
        })
        .catch(err => {
            console.log(err);
            res.status(400).json(err)
        })
    },

    //create user
    createUser({ body }, res) {
        User.create(body)
        .then(dbUserData => res.json(dbUserData))
        .catch(err => res.status(400).json(err))
    },

    //update User by Id
    updateUser({ params, body}, res){
        User.findOneAndUpdate({ _id: params.id }, body, { new: true })
        .then(dbUserData => {
            if(!dbUserData) {
                res.status(400).json({ message: 'No user found with this id!'});
                return;
            }
            res.json(dbUserData);
        })
        .catch(err => res.status(400).json(err));
    },

    //delete user by id
    deleteUser({ params }, res ) {
        User.findOneAndDelete({ _id: params.id })
        .then(dbUserData => {
            if (!dbUserData) {
                res.status(404).json({ message: 'No user found with this id!'});
                return;
            }
            res.json(dbUserData);
        })
        .catch(err => res.status(400).json(err));
    },


    //////////////////////////////////

    addFriend({ params }, res) {
        User.findOneAndUpdate(
            { _id: params.id },
            {$addToSet: { friends: params.friendsId}},
            { new: true}
            
            )
            .then(dbUserData => {
                if(!dbUserData) {
                    res.data(404).json({message: 'No user found with this id!'});
                    return;
                }
                res.json(dbUserData)
            })
    },

    removeFriend({ params }, res) {
        User.findOneAndUpdate({ _id: params.id},
            { $pull: { friends: params.friendsId }},
            {new: true}
            )
            .then(dbUserData => {
                if(!dbUserData) {
                    res.status(404).json({ message: 'No user found with this id!'});
                    return;
                }
                res.json(dbUserData);
            })
            
    }

}

module.exports = userController;