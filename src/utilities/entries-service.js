import * as entriesAPI from './entries-api'

export default async function create(formData) {
    const newEntry = await entriesAPI.createEntry(formData);
    return newEntry;
  }

  export async function getEntries() {
    const entry = await entriesAPI.getEntries();
    return entry
  }