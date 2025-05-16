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
    const todoElement = generateTodo(values);
    section.addItem(todoElement);
    todoCounter.increment();
    newTodoValidator.resetValidation();
    addTodoPopup.close();
  },
});

todoCounter.setTotalCount(initialTodos.length);

//function handleDeleteTodo(todoId) {
//  const todoElement = document.querySelector(`[data-todo-id="${todoId}"]`);
//  if (todoElement) {
//    todoElement.remove();
//    todoCounter.decrement();
//  }
//}

const generateTodo = (data) => {
  const todo = new Todo(data, "#todo-template", todoCounter);
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
  console.log(addTodoPopup); // Check if popup object exists
  addTodoPopup.open();
});

//addTodoForm.addEventListener("submit", (evt) => {
//  evt.preventDefault();
// const name = evt.target.name.value;
//  const dateInput = evt.target.date.value;
//
//  const date = new Date(dateInput);
//  date.setMinutes(date.getMinutes() + date.getTimezoneOffset());
//
//  const id = uuidv4();
//  const values = { name, date, id };
//  renderTodo(values); //use addItem Method instead of
//  newTodoValidator.resetValidation();
//  addTodoPopup.close();
//});

const newTodoValidator = new FormValidator(validationConfig, addTodoForm);
newTodoValidator.enableValidation();

function addTodo(todoData) {
  const todo = new Todo(todoData, "#todo-template", todoCounter);
  todosList.append(todo.generateTodo());
  todoCounter.updateCounter(1);
}

function removeTodo(todoElement) {
  todoElement.remove();
  todoCounter.updateCounter(-1);
}
