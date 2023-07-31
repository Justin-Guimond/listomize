import React, { useState } from 'react';

export default function EditEntryForm ({ entry, handleUpdateEntry }) {
  const [formData, setFormData] = useState({
   details: {
        AIModel: entry.details.AIModel || '',
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
      details: {
        ...prevFormData.details,
        [name]: value,
      },
    }));
  };


  const handleSubmit = (e) => {
    e.preventDefault(); 
    handleUpdateEntry(formData);
  };


  return (
    <form onSubmit={handleSubmit}>
    <input
      name="AIModel"
      value={formData.details.AIModel}
      onChange={handleChange}
      required
    />
    <input
      name="DevelopedBy"
      value={formData.details.DevelopedBy}
      onChange={handleChange}
      required
    />
    <input
      name="ReleasedDate"
      value={formData.details.ReleasedDate}
      onChange={handleChange}
      type="date"
      required
    />
    <input
      name="Pros"
      value={formData.details.Pros}
      onChange={handleChange}
      required
    />
    <input
      name="Cons"
      value={formData.details.Cons}
      onChange={handleChange}
      required
    />
    <input
      type="url"
      name="imgURL"
      value={formData.details.imgURL}
      onChange={handleChange}
    />
    <input
      type="url"
      name="tryURL"
      value={formData.details.tryURL}
      onChange={handleChange}
    />
    <textarea
      name="entry"
      value={formData.details.entry}
      onChange={handleChange}
      required
    />

    <button type="submit">Update AI App</button>
  </form>
  );
};
