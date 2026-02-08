let notes = JSON.parse(localStorage.getItem("notes")) || [];


function saveNotes() {
  localStorage.setItem("notes", JSON.stringify(notes));
}


const noteInput = document.getElementById("noteInput");
const addBtn = document.getElementById("addBtn");
const notesContainer = document.getElementById("notesContainer");
const searchInput = document.getElementById("search");




function displayNotes(filteredNotes = notes) {
  notesContainer.innerHTML = "";

  filteredNotes.forEach((note, index) => {
    const noteDiv = document.createElement("div");
    noteDiv.className = "note";

    noteDiv.innerHTML = `
      <p contenteditable="true" onblur="editNote(${index}, this)">
        ${note}
      </p>
      <button onclick="deleteNote(${index})">Delete</button>
    `;

    notesContainer.appendChild(noteDiv);
  });
}


addBtn.addEventListener("click", () => {
  if (noteInput.value.trim() === "") return;

  notes.push(noteInput.value);
  saveNotes();
  displayNotes();
  noteInput.value = "";
});


function editNote(index, element) {
  notes[index] = element.innerText;
  saveNotes();
}

function deleteNote(index) {
  notes.splice(index, 1);
  saveNotes();
  displayNotes();
}


searchInput.addEventListener("input", () => {
  const query = searchInput.value.toLowerCase();
  const filtered = notes.filter(note =>
    note.toLowerCase().includes(query)
  );
  displayNotes(filtered);
});

searchInput.addEventListener("input", function () {

    
    var searchText = searchInput.value.toLowerCase();

    var filteredNotes = [];

    for (var i = 0; i < notes.length; i++) {
        var note = notes[i].toLowerCase();

        if (note.includes(searchText)) {
            filteredNotes.push(notes[i]);
        }
    }
    displayNotes(filteredNotes);
});

displayNotes();
