const express = require("express");
const { create, getTutorials, getTutorial, updateTutorial, deleteTutorial } = require("../controllers/tutorialController");
const router = express.Router();

router.post('/tutorials', create);
router.get('/tutorials', getTutorials);
router.get('/tutorials/:id', getTutorial);
router.patch('/tutorials/:id', updateTutorial);
router.delete('/tutorials/:id', deleteTutorial);

module.exports = router;