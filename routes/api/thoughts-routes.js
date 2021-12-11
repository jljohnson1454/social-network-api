const router = require('express').Router();


const {
    getAllThoughts,
    getThoughtById,
    addThought,
    removeThought,
    updateThought,
    addReaction,
    removeReaction
} = require('../../controllers/thoughts-controller');

router
    .route('/')
    .get(getAllThoughts)
    .post(addThought);

router
    .route('/:thoughtId')
    .get(getThoughtById)
    .put(updateThought)
    .delete(removeThought)
    
router
    .route('/:thoughtId')
    .post(addReaction)
    


// Bonus: Remove a user's associated thoughts when deleted
router.route('/:thoughtId/:reactionId').delete(removeReaction);

module.exports = router;
