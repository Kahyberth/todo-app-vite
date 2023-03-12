import html from "./app.html?raw";
import todoStore, { Filters } from "../store/todo.store";
import { renderTodos, renderPendingTodo } from "./use-cases";

const ElementsIDs = {
  TodoList: ".todo-list",
  NewTodoInput: "#new-todo-input",
  clearCompleted: ".clear-completed",
  TodoFilters: ".filtro",
  PendingCountTag: "#pending-count",
};

/**
 *
 * @param {String} elementId
 */
export const App = (elementId) => {
  const displayTodos = () => {
    const todos = todoStore.getTodos(todoStore.getCurrentFilter());
    renderTodos(ElementsIDs.TodoList, todos);
    updatePendingCount();
  };

  const updatePendingCount = () => {
    renderPendingTodo( ElementsIDs.PendingCountTag );
  }

  //Renderiza el contenido
  (() => {
    const app = document.createElement("div");
    app.innerHTML = html;
    document.querySelector(elementId).append(app);
    displayTodos();
  })();

  //HTML References
  const newDescription = document.querySelector(ElementsIDs.NewTodoInput);
  const todoListUL = document.querySelector(ElementsIDs.TodoList);
  const clearCompletedButton = document.querySelector(
    ElementsIDs.clearCompleted
  );
  const todoFilters = document.querySelectorAll(ElementsIDs.TodoFilters);

  newDescription.addEventListener("keyup", (event) => {
    if (event.keyCode !== 13) return;
    if (event.target.value.trim().length === 0) return;

    todoStore.addTodo(event.target.value);
    displayTodos();
  });

  todoListUL.addEventListener("click", (event) => {
    const element = event.target.closest("[data-id]");
    todoStore.toggleId(element.getAttribute("data-id"));
    displayTodos();
  });

  todoListUL.addEventListener("click", (event) => {
    const element = event.target.closest("[data-id]");
    if (!element || !event.target.className.includes("destroy")) return;
    todoStore.deleteTodo(element.getAttribute("data-id"));
    displayTodos();
  });

  clearCompletedButton.addEventListener("click", (event) => {
    todoStore.deleteCompleted();
    displayTodos();
  });

  todoFilters.forEach((e) => {
    e.addEventListener("click", (element) => {
      todoFilters.forEach((e) => e.classList.remove("selected"));
      element.target.classList.add("selected");

      switch (element.target.text) {
        case "Todos":
          todoStore.setFilter(Filters.All);
          break;
        case "Pendientes":
          todoStore.setFilter(Filters.Pending);
          break;
        case "Completados":
          todoStore.setFilter(Filters.Completed);
          break;
      }

      displayTodos();
    });
  });
};
