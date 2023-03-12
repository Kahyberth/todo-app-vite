import { Todo } from "../todos/models/todo.model";

export const Filters = {
  All: "All",
  Completed: "Completed",
  Pending: "Pending",
};

export const State = {
  todos: [
  ],

  filter: Filters.All,
};

const initStore = () => {
  loadStore();
  console.log("InitStore 🥥");
};

const loadStore = () => {
  if ( !localStorage.getItem('state') ) return;
  const { todos = [], filter = Filters.All } = JSON.parse( localStorage.getItem('state') );

  State.todos = todos;
  State.filter = filter;

};


const savelocalStorage = () => {
  localStorage.setItem('state', JSON.stringify(State) );
}

const getTodos = ( filter = Filters.All ) => {
    switch( filter ) {
        case Filters.All: 
            return [...State.todos];
        case Filters.Completed:
            return State.todos.filter(e => e.done);
        case Filters.Pending:
            return State.todos.filter(e => !e.done);
        default:
            throw new Error(`Option ${ filter } is not valid`);
    }

}


/**
 *
 * @param {String} description
 */
const addTodo = ( description ) => {
  if( !description ) throw new Error("Description is required");
    
  State.todos.push(new Todo( description ));

  savelocalStorage();
};

/**
 *
 * @param {String} todoId
 */
const toggleId = ( todoId ) => {
    State.todos.map(todo => {
      if(todo.id === todoId) {
        todo.done = !todo.done;
      }
      return todo;
    })

    savelocalStorage();
};

/**
 *
 * @param {String} todoId
 */
const deleteTodo = ( todoId ) => {
  State.todos = State.todos.filter( todos => todos.id !== todoId );
  savelocalStorage();
};

const deleteCompleted = () => {
  State.todos = State.todos.filter( todos => !todos.done );
  savelocalStorage();
};

/**
 *
 * @param {Filters} newFilter
 */
const setFilter = (newFilter = Filters.All) => {
  if(Object.keys(Filters).filter(e => e.includes(newFilter))[0] !== newFilter) throw new Error('Filter not found');
  State.filter = newFilter;
  savelocalStorage();
};

const getCurrentFilter = () => {
  return State.filter;
};

export default {
  addTodo,
  deleteCompleted,
  deleteTodo,
  getCurrentFilter,
  getTodos,
  initStore,
  loadStore,
  setFilter,
  toggleId,
};
