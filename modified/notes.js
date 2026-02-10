


  let notes = JSON.parse(localStorage.getItem("notes")) || [] ;
  let categories = JSON.parse(localStorage.getItem("categories")) || ["General"] ;
  let currentFilter = 'all';

  function saveNotes() {
    localStorage.setItem("notes", JSON.stringify(notes));
    localStorage.setItem("categories", JSON.stringify(categories));
    renderCategoryFilters();
    renderCategorySelect();
  }

  const noteInput = document.getElementById("noteInput");
  const categoryInput = document.getElementById("categoryInput");
  const newCategoryInput = document.getElementById("newCategoryInput");
  const addBtn = document.getElementById("addBtn");
  const notesContainer = document.getElementById("notesContainer");
  const searchInput = document.getElementById("search");
  const categoryFilters = document.getElementById("categoryFilters");
  const addCategory = document.getElementById("addCategory");

  function displayNotes() {
    let filtered = [...notes];

    if (currentFilter === 'bookmarks') {
      filtered = filtered.filter(n => n.bookmarked);
    } else if (currentFilter !== 'all') {
      filtered = filtered.filter(n => n.category === currentFilter);
    }

    const query = searchInput.value.toLowerCase();
    if (query) {
      filtered = filtered.filter(n => n.text.toLowerCase().includes(query));
    }

    notesContainer.innerHTML = "";

    filtered.forEach(note => {
      const div = document.createElement("div");
      div.className = "note";

      div.innerHTML = `
        <div class="tag">${note.category}</div>
        <p id="text-${note.id}">${note.text}</p>
        <div class="note-actions">
          <button class="bookmark-btn" onclick="toggleBookmark(${note.id})">
            ${note.bookmarked ? '★' : '☆'}
          </button>
          <button class="edit-btn" onclick="toggleEdit(${note.id})">Edit</button>
          <button class="delete-btn" onclick="deleteNote(${note.id})">Delete</button>
        </div>
      `;

      notesContainer.appendChild(div);
    });
  }

  renderCategorySelect();

  addCategory.addEventListener("click", () => {
    const value = newCategoryInput.value.trim();
      if (!value || categories.includes(value)) return;

      categories.push(value);
      newCategoryInput.value = "";
      saveNotes();

  })

  newCategoryInput.addEventListener("keydown", (e) => {
    if ((e.key === "Enter")) {
      const value = newCategoryInput.value.trim();
      if (!value || categories.includes(value)) return;

      categories.push(value);
      newCategoryInput.value = "";
      saveNotes();
    }
  });

  addBtn.addEventListener("click", () => {
    const text = noteInput.value.trim();
    if (!text) return;

    notes.unshift({
      id: Date.now(),
      text,
      category: categoryInput.value,
      bookmarked: false
    });

    noteInput.value = "";
    saveNotes();
    displayNotes();
  });

  function toggleEdit(id) {
    const note = notes.find(n => n.id === id);
    const textEl = document.getElementById(`text-${id}`);

    if (textEl.isContentEditable) {
      textEl.contentEditable = false;
      note.text = textEl.innerText;
      saveNotes();
    } else {
      textEl.contentEditable = true;
      textEl.focus();
    }
  }

  function deleteNote(id) {
    notes = notes.filter(n => n.id !== id);
    saveNotes();
    displayNotes();
  }

  function toggleBookmark(id) {
    const note = notes.find(n => n.id === id);
    note.bookmarked = !note.bookmarked;
    saveNotes();
    displayNotes();
  }

  function setFilter(filter) {
    currentFilter = filter;
    displayNotes();
  }

  function renderCategoryFilters() {
  categoryFilters.innerHTML = "";

  categories.forEach(cat => {
    const container = document.createElement("div");
    container.style.display = "flex";
    container.style.gap = "5px";

    const btn = document.createElement("button");
    btn.textContent = cat;
    btn.onclick = () => setFilter(cat);

    container.appendChild(btn);

    
    if (cat !== "General") {
      const delBtn = document.createElement("button");
      delBtn.textContent = "✖";
      delBtn.style.background = "crimson";
      delBtn.style.color = "white";

      delBtn.onclick = () => deleteCategory(cat);

      container.appendChild(delBtn);
    }

    categoryFilters.appendChild(container);
  });
}
function deleteCategory(category) {
  if (!confirm(`Delete category "${category}"?`)) return;

  
  notes.forEach(note => {
    if (note.category === category) {
      note.category = "General";
    }
  });

  
  categories = categories.filter(cat => cat !== category);

  currentFilter = "all";
  saveNotes();
  displayNotes();
}


  function renderCategorySelect() {
    categoryInput.innerHTML = '';
    categories.forEach(cat => {
      const option = document.createElement('option');
      option.value = cat;
      option.textContent = cat;
      categoryInput.appendChild(option);
    });
  };
  

  searchInput.addEventListener('input', displayNotes);

  renderCategoryFilters();
  displayNotes();


