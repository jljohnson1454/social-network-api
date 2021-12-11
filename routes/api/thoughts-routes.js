const router = require('express').Router();


const {
    addThought,
    removeThought,
    addReaction,
    removeReaction
} = require('../../controllers/thoughts-controller');

router.route('/:userId').post(addThought);

router.
    route('/:userId/:thought')
    .put(addReaction)
    .delete(removeThought)

router.route('/:userId/:thoughtId/:reactionId').delete(removeReaction);

module.exports = router;
