import * as notesAPI from './notes-api'

export default async function create(formData) {
    const note = await notesAPI.createNote(formData);
  }

  export async function getNotes() {
    const note = await notesAPI.getNotes();
    return note
  }