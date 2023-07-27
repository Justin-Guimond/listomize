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



//what i went over with alexis
export async function updateEntry(id, entryData) {
    return sendRequest(`${BASE_URL}/${id}`, 'PUT', entryData); 
    // Make sure to pass entryData as the third argument
    //must watch word-for-word
}
//what i spoke with alexis