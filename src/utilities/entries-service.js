import * as entriesAPI from './entries-api'

export default async function create(formData) {
    const entry = await entriesAPI.createEntry(formData);
  }

  export async function getEntries() {
    const entry = await entriesAPI.getEntries();
    return entry
  }