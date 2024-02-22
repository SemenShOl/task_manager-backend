const Router = require("express");
const checkAuth = require("../middlewares/checkAuth");
const notesRepository = require("../repositories/notesRepository");
const getNotesRouter = () => {
  const notesRouter = Router({});

  notesRouter.get("/", checkAuth, async (req, res) => {
    const allNotes = await notesRepository.getAllNotes(req.userID);
    res.json(allNotes);
  });

  notesRouter.get("/:id", checkAuth, async (req, res) => {
    const note = await notesRepository.getNoteByID(req.params.id, req.userID);
    res.json(note);
  });

  notesRouter.post("/", checkAuth, async (req, res) => {
    const { notesWithNew, status } = await notesRepository.createNote(
      req.body,
      req.userID
    );
    res.status(status).json(notesWithNew);
  });

  notesRouter.put("/:id", checkAuth, async (req, res) => {
    const status = await notesRepository.changeNote(
      req.params.id,
      req.body,
      req.userID
    );
    res.sendStatus(status);
  });

  notesRouter.delete("/:id", checkAuth, async (req, res) => {
    const status = await notesRepository.removeNote(req.params.id, req.userID);
    res.sendStatus(status);
  });

  return notesRouter;
};
module.exports = getNotesRouter;
