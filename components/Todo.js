//import TodoCounter from "./TodoCounter.js";
class Todo {
  constructor(data, selector, handleDelete, handleChange) {
    this._data = data;
    this._completed = data.completed;
    this._templateElement = document.querySelector(selector);
    //this._todoCounter = todocounter;
    this._handlechange = handleChange;
    this._handleDelete = handleDelete;
    //this._todoCounter.increment();
  }

  _setEventListeners() {
    // Add delete button event listener
    const deleteButton = this._todoElement.querySelector(".todo__delete-btn");
    deleteButton.addEventListener("click", () => {
      this._handleDelete(this._completed);
      this._todoElement.remove();
    });

    this._todoCheckboxEl.addEventListener("change", (event) => {
      this._completed = event.target.checked;
      this._handlechange(this._completed);
    });
  }

  _generateCheckBoxEl() {
    this._todoCheckboxEl = this._todoElement.querySelector(".todo__completed");
    this._todoLabel = this._todoElement.querySelector(".todo__label");
    this._todoCheckboxEl.checked = this._data.completed;
    this._todoCheckboxEl.id = `todo-${this._data.id}`;
    this._todoLabel.setAttribute("for", `todo-${this._data.id}`);
  }

  getView() {
    // First clone the template
    this._todoElement = this._templateElement.content
      .querySelector(".todo")
      .cloneNode(true);

    // Then set up all the content
    const todoNameEl = this._todoElement.querySelector(".todo__name");
    const todoDate = this._todoElement.querySelector(".todo__date");
    todoNameEl.textContent = this._data.name;
    const duedate = new Date(this._data.date);
    if (!isNaN(duedate)) {
      todoDate.textContent = new Date(this._data.date).toLocaleDateString();
    }

    // Generate checkbox elements
    this._generateCheckBoxEl();

    // Set event listeners AFTER elements are created
    this._setEventListeners();

    return this._todoElement;
  }
}

export default Todo;
