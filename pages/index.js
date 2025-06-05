import { v4 as uuidv4 } from "https://jspm.dev/uuid";

import { initialTodos, validationConfig } from "../utils/constants.js";
import Todo from "../components/Todo.js";
import FormValidator from "../components/FormValidator.js";
import Section from "../components/Section.js";
import PopupWithForm from "../components/PopupWithForm.js";
import TodoCounter from "../components/TodoCounter.js";

const addTodoButton = document.querySelector(".button_action_add");
console.log("Add button found:", addTodoButton);
const addTodoPopupEl = document.querySelector("#add-todo-popup");
const addTodoForm = addTodoPopupEl.querySelector(".popup__form");
const addTodoCloseBtn = addTodoPopupEl.querySelector(".popup__close-button");
const todoTemplate = document.querySelector("#todo-template");
const todosList = document.querySelector(".todos__list");
const todoCounter = new TodoCounter(initialTodos);

const addTodoPopup = new PopupWithForm({
  popupSelector: "#add-todo-popup",
  handleFormSubmit: (formData) => {
    const id = uuidv4();
    const values = {
      name: formData.name,
      date: new Date(formData.date),
      id,
    };
    renderTodo(values);
    todoCounter.increment();
    addTodoPopup.close();
  },
});

todoCounter.setTotalCount(initialTodos.length);

//hndle check
const handlechange = (checked) => {
  //todos[index];
  todoCounter.updateCompleted(checked);
};
// function body
const handleDelete = (completed) => {
  if (completed) {
    todoCounter.decrementCompleted();
  }
  todoCounter.decrement();
};

// function body
//hnadle delete

const generateTodo = (data) => {
  const todo = new Todo(data, "#todo-template", handleDelete, handlechange);
  const todoElement = todo.getView();
  return todoElement;
};

const renderTodo = (item) => {
  const todo = generateTodo(item);
  todosList.append(todo);
};

const section = new Section({
  items: initialTodos,
  renderer: (item) => {
    renderTodo(item);
  },
  containerSelector: ".todos__list",
});

section.renderItems();

addTodoPopup.setEventListeners();

addTodoButton.addEventListener("click", () => {
  console.log("Button clicked");
  console.log(addTodoPopup);
  addTodoPopup.open();
});

const newTodoValidator = new FormValidator(validationConfig, addTodoForm);
newTodoValidator.enableValidation();
