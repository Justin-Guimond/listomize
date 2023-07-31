import sendRequest from "./send-request";

const BASE_URL = '/api/entries';

export async function getEntries() {
    return sendRequest(BASE_URL);
}

export async function createEntry(entryData) {
    return sendRequest(BASE_URL, 'POST', entryData);
}

export async function deleteEntry(id) {
    return sendRequest(`${BASE_URL}/delete/${id}`, 'DELETE');

}

export async function updateEntry(id, entryData) {
    return sendRequest(`${BASE_URL}/${id}`, 'PUT', entryData); 
}

export async function getEntryById(id) {
    return sendRequest(`${BASE_URL}/${id}`);
  }