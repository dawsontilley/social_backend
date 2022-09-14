const router = require('express').Router();
const {
  getThought,
  getThoughtById,
  addThought,
  editThought,
  removeThought,
  addReaction,
  removeReaction
} = require('../../controllers/thought-controller');

router.route('/').get(getThought);
// /api/thoughts/<userId>
router.route('/:userId').post(addThought);

// /api/comments/<userId>/<thoughtId>
router
  .route('/:thoughtId')
  .get(getThoughtById)
  .put(editThought)
  .delete(removeThought);

//router.route('/:userId/reactions')
router
.route('/:thoughtId/reaction')
.put(addReaction);
// /api/comments/<pizzaId>/<commentId>/<replyId>
router
.route('/:thoughtId/:reactionId')
.delete(removeReaction);

module.exports = router;
