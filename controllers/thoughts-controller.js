const { Thoughts, User } = require('../models');

const thoughtsController = {
    getAllThoughts(req, res) {
        Thoughts.find({})
        .populate({
            path: 'reactions',
            select: '-__v'
        })
        .select('-__v')
        .sort({ _id: -1 })
        .then(dbThoughtsData => res.json(dbThoughtsData))
        .catch(err => {
            console.log(err);
            res.status(400).json(err);
        })
    },

    getThoughtById({ params }, res) {
        Thoughts.findOne({ _id: params.thoughtId })
        .populate({
            path: 'reactions',
            select: '-__v'
        })
        .select('-__v')
        .then(dbThoughtsData => {
            if(!dbThoughtsData) {
                res.status(404).json({ messsage: 'No thought found with this id!'});
                return;
            }
            res.json(dbThoughtsData);
        })
        .catch (err => {
            console.log(err);
            res.status(400).json(err)
        })
    },

    addThought({ body }, res) {
        Thoughts.create(body)
            .then((data) => {
                return User.findOneAndUpdate(
                    { _id: body.userId },
                    { $push: { thoughts: data._id } },
                    { new: true }
                );
            })
            .then(dbThoughtsData => {
                if(!dbThoughtsData) {
                    res.status(404).json({ message: 'No user found with this id!'});
                    return;
                }
                res.json(dbThoughtsData);
            })
            .catch(err => res.json(err));
    },

    updateThought({ params, body }, res) {
        Thoughts.findOneAndUpdate({ _id: params.thoughtId }, {$set: body}, { new: true })
        .then(dbThoughtsData => {
            if (!dbThoughtsData) {
                res.status(404).json({ message: 'No thought found with this id!'});
                return;
            }
            res.json(dbThoughtsData);
        })

    },

    removeThought({ params }, res) {
        Thoughts.findOneAndRemove(
            { _id: params.thoughtId }
        )
            .then(dbThoughtsData => res.json(dbThoughtsData))
            .catch(err => res.json(err));
    },

    addReaction({ params, body }, res) {
        Thoughts.findOneAndUpdate(
            { _id: params.thoughtId},
            { $push: { reactions: body }},
            { new: true }
        )
        .then(dbThoughtsData => {
            if(!dbThoughtsData) {
                res.status(404).json({ message: 'No thought with this id!'});
                return;
            }
            res.json(dbThoughtsData);
        })
        .catch( err => res.json(err));
    },

    removeReaction ({ params }, res) {
        Thoughts.findOneAndUpdate(
            { _id: params.thoughtId },
            { $pull: { reactions: { reactionId: params.reactionId } } },
            { new: true }
        )
            .then(dbThoughtsData => res.json(dbThoughtsData))
            .catch(err => res.json(err));
    }


}

module.exports = thoughtsController;