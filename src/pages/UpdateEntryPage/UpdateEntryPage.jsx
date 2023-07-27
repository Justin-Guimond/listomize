import React, { useState, useEffect } from 'react'; 

export default function UpdateEntryPage () {

    const [updateData, setUpdateData] = useState()


    return (


// need to target the unqiue entry ID and prefill form field to match
// once user makes changes, need to update entry ID by updating state?
// then when clicking Update button, route back to EntryDetailPage


    <>
      <h1>Add AI Model</h1>
      <form onSubmit={handleAddEntry}>
        <input
          name="AIModel"
          value={entry.details.AIModel}
          onChange={handleChange}
          placeholder="AI Model"
          required
        />
        <input
          name="DevelopedBy"
          value={entry.details.DevelopedBy}
          onChange={handleChange}
          placeholder="Developed By"
          required
        />
        <input
          name="ReleasedDate"
          value={entry.details.ReleasedDate}
          onChange={handleChange}
          type="date"
          required
        />
        <input
          name="Pros"
          value={entry.details.Pros}
          onChange={handleChange}
          placeholder="Pros"
          required
        />
        <input
          name="Cons"
          value={entry.details.Cons}
          onChange={handleChange}
          placeholder="Cons"
          required
        />
        <input
          type="url"
          name="imgURL"
          value={entry.details.imgURL}
          onChange={handleChange}
          placeholder="image URL"
        />
        <input
          type="url"
          name="tryURL"
          value={entry.details.tryURL}
          onChange={handleChange}
          placeholder="url to try AI"
        />
        <textarea
          name="entry"
          value={entry.details.entry}
          onChange={handleChange}
          placeholder="Entry"
          required
        />

        <button type="submit">Update AI Model</button>
      </form>
    </>
    )
}