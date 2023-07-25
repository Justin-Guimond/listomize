import sendRequest from "./send-request";

const BASE_URL = '/api/entries'

export async function getEntries() {
    return sendRequest(BASE_URL);
  }

  export async function createEntry(entryData) {
    return sendRequest(BASE_URL, 'POST', entryData);
  }

