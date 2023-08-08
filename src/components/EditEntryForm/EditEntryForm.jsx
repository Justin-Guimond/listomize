// import React, { useState } from 'react';

// export default function EditEntryForm ({ item, handleUpdateEntry }) {
//   const [formData, setFormData] = useState({item_id});

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prevFormData) => ({
//       ...prevFormData,
//       details: {
//         ...prevFormData.details,
//         [name]: value,
//       },
//     }));
//   };


//   const handleSubmit = (e) => {
//     e.preventDefault(); 
//     handleUpdateEntry(formData);
//   };


//   return (
//     <form onSubmit={handleSubmit}>
//     <input
//       name=""
//       value={item_id}
//       onChange={handleChange}
//       required
//     />
//     <button type="submit">Update Item</button>
//   </form>
//   );
// };
