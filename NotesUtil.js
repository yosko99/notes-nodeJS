const fs = require("fs");
const chalk = require("chalk");

class NoteUtil {
  static addNote = (title, body) => {
    let notes = this.getNotes();

    if (!this.checkIfExists(notes, title)) {
      notes.push({
        title: title,
        body: body,
      });
      this.saveNote(notes);
      console.log(chalk.greenBright("Note added."));
    } else console.log(chalk.redBright("This title already exists"));
  };

  static checkIfExists = (notes, title) => {
    for (const iterator of notes) {
      if (iterator.title == title) {
        return true;
      }
    }
    return false;
  };

  static saveNote = (note) => {
    fs.writeFileSync("notes.json", JSON.stringify(note));
  };

  static removeNote = (title) => {
    const notes = this.getNotes();
    if (this.checkIfExists(notes, title)) {
      for (let i = 0; i < notes.length; i++) {
        if (notes[i].title == title) {
          notes.splice(i, 1);
          this.saveNote(notes);
          console.log(
            chalk.greenBright("You have successfully deleted the note.")
          );
          break;
        }
      }
    } else console.log(chalk.redBright("Note with that title does not exist!"));
  };

  static listNotes = () => {
    let notes = this.getNotes();
    console.log(notes);
  };

  static getNotes = () => {
    try {
      let dataBuffer = fs.readFileSync("notes.json", "utf-8");
      return JSON.parse(dataBuffer);
    } catch (e) {
      return [];
    }
  };

  static searchNoteByTitle = (title) => {
    const notes = this.getNotes();
    let foundNote = false;
    for (const iterator of notes) {
      if (title == iterator.title) {
        console.log(iterator);
        foundNote = true;
        break;
      }
    }
    if (!foundNote)
      console.log(chalk.yellow("Cant find note with provided title!"));
  };
}

module.exports = NoteUtil;
