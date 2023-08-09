import React, { useState } from 'react';
import { updateEntry } from '../../utilities/entries-api';
import ModeEditOutlineOutlinedIcon from '@mui/icons-material/ModeEditOutlineOutlined';

export default function EditEntryForm ({ entry, fetchEntries, newEntry }) {
  const [updateModal, setUpdateModal] = useState(false);
  const [updatedItem, setUpdatedItem] = useState(entry.item1);

  async function toggleEditModal() {
    setUpdateModal(value => !value);
  }

  async function handleSubmit(event) {
    event.preventDefault();
    try {
      await updateEntry(entry._id, {item1: updatedItem});
      fetchEntries(newEntry.list);
      toggleEditModal();
    } catch (error) {
      console.error('Error updating entry:', error)
    }
  }

  return (
    <>
      {updateModal ?   
      <div>
          <div className='card-container' key={entry._id}>
            <form onSubmit={handleSubmit} >
              <input type="text" name='item1' value={updatedItem} onChange={(e) => setUpdatedItem(e.target.value)} />
              <button type='submit' >Update Item</button>
            </form>   
          </div>
      </div> :<ModeEditOutlineOutlinedIcon onClick={toggleEditModal} ></ModeEditOutlineOutlinedIcon>}
    </>
  );
}
