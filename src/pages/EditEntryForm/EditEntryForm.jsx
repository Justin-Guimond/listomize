import React, { useState } from 'react';
import  { updateEntry } from '../../utilities/entries-api';

export default function EditEntryForm ({ entry }) {
  const [formData, setFormData] = useState({
   details: {
        AIModel: entry.details.AIModel,
        DevelopedBy: entry.details.DevelopedBy,
        ReleasedDate: entry.details.ReleasedDate,
        Pros: entry.details.Pros,
        Cons: entry.details.Cons,
        entry: entry.details.entry,
        tryURL: entry.details.tryURL,
        imgURL: entry.details.imgURL,
    },
  });
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };
  const handleSubmit = (e) => {
    e.preventDefault(); 
    updateEntry(formData);
  };
  return (
    <form onSubmit={handleSubmit}>
    <input
      name="AIModel"
      value={formData.AIModel}
      onChange={handleChange}
      required
    />
    <input
      name="DevelopedBy"
      value={formData.DevelopedBy}
      onChange={handleChange}
      required
    />
    <input
      name="ReleasedDate"
      value={formData.ReleasedDate}
      onChange={handleChange}
      type="date"
      required
    />
    <input
      name="Pros"
      value={formData.Pros}
      onChange={handleChange}
      required
    />
    <input
      name="Cons"
      value={formData.Cons}
      onChange={handleChange}
      required
    />
    <input
      type="url"
      name="imgURL"
      value={formData.imgURL}
      onChange={handleChange}
    />
    <input
      type="url"
      name="tryURL"
      value={formData.tryURL}
      onChange={handleChange}
    />
    <textarea
      name="entry"
      value={formData.entry}
      onChange={handleChange}
      required
    />

    <button type="submit">Add AI Model</button>
  </form>
    // <form onSubmit={handleSubmit}>
    //   <div>
    //     <label>AI Model:</label>
    //     <input type="text" name="AIModel" value={formData.AIModel} onChange={handleChange} />
    //   </div>
    //   <div>
    //     <label>Developed By:</label>
    //     <input type="text" name="DevelopedBy" value={formData.DevelopedBy} onChange={handleChange} />
    //   </div>
    //   <div>
    //     <label>Released Date:</label>
    //     <input type="date" name="ReleasedDate" value={formData.ReleasedDate} onChange={handleChange} />
    //   </div>
    //   <div>
    //     <label>Pros:</label>
    //     <input type="text" name="Pros" value={formData.Pros} onChange={handleChange} />
    //   </div>
    //   <div>
    //     <label>Cons:</label>
    //     <input type="text" name="Cons" value={formData.Cons} onChange={handleChange} />
    //   </div>
    //   <div>
    //     <label>Description:</label>
    //     <textarea name="entry" value={formData.entry} onChange={handleChange} />
    //   </div>
    //   <button type="submit">Save Changes</button>
    // </form>
  );
};
