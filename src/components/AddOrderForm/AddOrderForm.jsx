import { useState } from 'react';


export default function AddOrderForm({ submitOrder }) {

  const [notes, setNotes] = useState('');

  function handleSubmit(evt) {
    evt.preventDefault();
    submitOrder(notes);
    setNotes('');
  }

  function handleNotesChange(evt) {
    setNotes(evt.target.value);
  }

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="notes">Notes:</label>
      <textarea
        id="notes"
        name="notes"
        value={notes}
        onChange={handleNotesChange}
        placeholder="Add any special notes for the order..."
        rows={4}
        cols={50}
      ></textarea>
      <button type="submit">Submit Order</button>
    </form>
  );
}
