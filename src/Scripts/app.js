document.addEventListener('DOMContentLoaded', () => { // Wait for the DOM to load
  const noteInput = document.getElementById('noteInput'); // Get the note input element
  const addNoteBtn = document.getElementById('addNoteBtn'); // Get the add note button
  const noteList = document.getElementById('noteList'); // Get the note list element

  let notes = JSON.parse(localStorage.getItem('notes')) || []; // Retrieve saved notes from localStorage, or initialize with an empty array if none are found

  function renderNotes() { // Function to render the notes on the page
    noteList.innerHTML = ''; // Clear the existing list
    notes.forEach((note, index) => { // Iterate over each note
      const li = document.createElement('li'); // Create a new list item element
      li.className = 'p-2 bg-white border rounded flex justify-between items-center'; // Apply styles to the list item
      li.innerHTML = `
        <span>${note}</span> // Display the note text
        <div>
          <button class="editNoteBtn mr-2 text-yellow-500">Edit</button> // Edit button
          <button class="deleteNoteBtn text-red-500">Delete</button> // Delete button
        </div>
      `;
      noteList.appendChild(li); // Add the list item to the note list

      // Add event listeners for the edit and delete buttons
      li.querySelector('.editNoteBtn').addEventListener('click', () => editNotePrompt(index));
      li.querySelector('.deleteNoteBtn').addEventListener('click', () => deleteNote(index));
    });
  }

  function addNote() { // Function to add a new note
    const note = noteInput.value.trim(); // Get the input value and trim any whitespace
    if (note) { // Check if the note is not empty
      notes.push(note); // Add the new note to the notes array
      noteInput.value = ''; // Clear the input field
      saveNotes(); // Save the updated notes array to localStorage
      renderNotes(); // Re-render the notes list
    }
  }

  function editNotePrompt(index) { // Function to edit a note
    const newNote = prompt('Edit your note:', notes[index]); // Prompt the user to edit the note
    if (newNote !== null) { // Check if the user did not cancel the prompt
      notes[index] = newNote; // Update the note in the array
      saveNotes(); // Save the updated notes array to localStorage
      renderNotes(); // Re-render the notes list
    }
  }

  function deleteNote (index) { // Function to delete a note
    notes.splice(index, 1); // Remove the note from the array
    saveNotes(); // Save the updated notes array to localStorage
    renderNotes(); // Re-render the notes list
  }

  function saveNotes() { // Function to save the notes array to localStorage
    localStorage.setItem('notes', JSON.stringify(notes)); // Convert the notes array to a JSON string and save it
  }

  addNoteBtn.addEventListener('click', addNote); // Add event listener to the add note button

  renderNotes(); // Initial rendering of the notes list when the page loads
});
