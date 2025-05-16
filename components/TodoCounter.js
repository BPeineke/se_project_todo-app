export default class TodoCounter {
  constructor(initialTodos) {
    // Initialize both counts
    this._currentCount = initialTodos.length;
    this._totalCount = initialTodos.length;
    this._completedCount = initialTodos.filter((todo) => todo.completed).length;

    // Get references to both counter elements
    this._currentElement = document.querySelector(".todo-counter");
    this._totalElement = document.querySelector(".todo-counter-total");
    this._completedElement = document.querySelector(".todo-counter-completed");
  }
  incrementCompleted() {
    this._completedCount++;
    this._updateCounters();
  }
  decrementCompleted() {
    this._completedCount--;
    this._updateCounters();
  }
  // Get current count
  getCurrentCount() {
    return this._currentCount;
  }

  // Get total count
  getTotalCount() {
    return this._totalCount;
  }

  // Set total count
  setTotalCount(number) {
    this._totalCount = number;
    this._updateCounters();
  }

  // Increment counter
  increment() {
    this._currentCount += 1;
    this._totalCount += 1;
    this._updateCounters();
  }

  // Decrement counter
  decrement() {
    this._currentCount -= 1;
    this._updateCounters();
  }

  // Private method to update both counter displays
  _updateCounters() {
    this._currentElement.textContent = this._currentCount;
    this._totalElement.textContent = this._totalCount;
    this._completedElement.textContent = this._completedCount;
  }
}
