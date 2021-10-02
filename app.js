const yargs = require("yargs");
const NoteUtil = require("./NotesUtil");

// Creates add command
yargs.command({
  command: "add",
  describe: "Adds a new note",
  builder: {
    title: {
      describe: "Note title",
      demandOption: true,
      type: "string",
    },
    body: {
      describe: "Note body",
      demandOption: true,
      type: "string",
    },
  },
  handler: (argv) => {
    NoteUtil.addNote(argv.title, argv.body);
  },
});

//Creates remove command
yargs.command({
  command: "remove",
  describe: "Removes a note by title",
  builder: {
    title: {
      describe: "Insert title to remove",
      demandOption: true,
      type: "string",
    },
  },
  handler: (argv) => {
    NoteUtil.removeNote(argv.title);
  },
});

//Creates list command
yargs.command({
  command: "list",
  describe: "Lists all notes",
  handler: () => {
    NoteUtil.listNotes();
  },
});

//Creates searchNote command
yargs.command({
  command: "searchNote",
  describe: "Searches a note by title.",
  builder: {
    title: {
      describe: "Search note by title",
      demandOption: "true",
      type: "string",
    },
  },
  handler: (argv) => {
    NoteUtil.searchNoteByTitle(argv.title);
  },
});

yargs.parse(); // Important for yargs to work
