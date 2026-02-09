let notes = JSON.parse(localStorage.getItem("notes")) || [];

function saveNotes() {
  localStorage.setItem("notes", JSON.stringify(notes));
}

const noteInput = document.getElementById("noteInput");
const addBtn = document.getElementById("addBtn");
const notesContainer = document.getElementById("notesContainer");
const searchInput = document.getElementById("search");

function displayNotes(list = notes) {
  notesContainer.innerHTML = "";

  list.forEach(note => {
    const noteDiv = document.createElement("div");
    noteDiv.className = "note";

    noteDiv.innerHTML = `
      <p id="text-${note.id}">${note.text}</p>

      <div class="note-actions">
        <button class="edit-btn" onclick="toggleEdit(${note.id})">
          Edit
        </button>
        <button class="delete-btn" onclick="deleteNote(${note.id})">
          Delete
        </button>
      </div>
    `;

    notesContainer.appendChild(noteDiv);
  });
}

/* ADD NOTE (NEWEST ON TOP) */
addBtn.addEventListener("click", () => {
  const text = noteInput.value.trim();
  if (!text) return;

  notes.unshift({
    id: Date.now(),
    text
  });

  saveNotes();
  displayNotes();
  noteInput.value = "";
});

/* EDIT / SAVE NOTE */
function toggleEdit(id) {
  const note = notes.find(n => n.id === id);
  const textEl = document.getElementById(`text-${id}`);

  if (textEl.isContentEditable) {
    // SAVE
    textEl.contentEditable = false;
    note.text = textEl.innerText;
    saveNotes();
  } else {
    // EDIT
    textEl.contentEditable = true;
    textEl.focus();
  }
}

/* DELETE NOTE */
function deleteNote(id) {
  notes = notes.filter(note => note.id !== id);
  saveNotes();
  displayNotes();
}

/* SEARCH */
searchInput.addEventListener("input", () => {
  const query = searchInput.value.toLowerCase();
  const filtered = notes.filter(note =>
    note.text.toLowerCase().includes(query)
  );
  displayNotes(filtered);
});

displayNotes();
