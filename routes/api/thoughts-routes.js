const router = require('express').Router();


const {
    getAllThoughts,
    getThoughtById,
    addThought,
    removeThought,
    addReaction,
    removeReaction
} = require('../../controllers/thoughts-controller');

router
    .route('/:userId')
    .get(getAllThoughts)
    .post(addThought);

router
    .route('/:userId/:thought')
    .get(getThoughtById)
    .put(addReaction)
    .delete(removeThought)

// Bonus: Remove a user's associated thoughts when deleted
router.route('/:userId/:thoughtId/:reactionId').delete(removeReaction);

module.exports = router;
