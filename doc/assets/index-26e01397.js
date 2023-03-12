(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const o of document.querySelectorAll('link[rel="modulepreload"]'))d(o);new MutationObserver(o=>{for(const n of o)if(n.type==="childList")for(const p of n.addedNodes)p.tagName==="LINK"&&p.rel==="modulepreload"&&d(p)}).observe(document,{childList:!0,subtree:!0});function c(o){const n={};return o.integrity&&(n.integrity=o.integrity),o.referrerPolicy&&(n.referrerPolicy=o.referrerPolicy),o.crossOrigin==="use-credentials"?n.credentials="include":o.crossOrigin==="anonymous"?n.credentials="omit":n.credentials="same-origin",n}function d(o){if(o.ep)return;o.ep=!0;const n=c(o);fetch(o.href,n)}})();const v=`<section class="todoapp">\r
    <header class="header">\r
        <h1>Tareas</h1>\r
        <input id="new-todo-input" class="new-todo" placeholder="¿Qué necesita ser hecho?" autofocus>\r
    </header>\r
    \r
    <!-- This section should be hidden by default and shown when there are todos -->\r
    <section class="main">\r
        <input id="toggle-all" class="toggle-all" type="checkbox">\r
        <label for="toggle-all">Mark all as complete</label>\r
        <ul class="todo-list">\r
            <!-- These are here just to show the structure of the list items -->\r
            <!-- List items should get the class "editing" when editing and "completed" when marked as completed -->\r
            <!-- <li class="completed" data-id="abc">\r
                <div class="view">\r
                    <input class="toggle" type="checkbox" checked>\r
                    <label>Probar JavaScript</label>\r
                    <button class="destroy"></button>\r
                </div>\r
                <input class="edit" value="Create a TodoMVC template">\r
            </li> -->\r
            <!-- <li>\r
                <div class="view">\r
                    <input class="toggle" type="checkbox">\r
                    <label>Comprar un unicornio</label>\r
                    <button class="destroy"></button>\r
                </div>\r
                <input class="edit" value="Rule the web">\r
            </li> -->\r
        </ul>\r
    </section>\r
\r
    <!-- This footer should hidden by default and shown when there are todos -->\r
    <footer class="footer">\r
        <!-- This should be "0 items left" by default -->\r
        <span class="todo-count"><strong id="pending-count">0</strong> pendiente(s)</span>\r
        <!-- Remove this if you don't implement routing -->\r
        <ul class="filters">\r
            <li>\r
                <!-- selected -->\r
                <a class="filtro" class="selected" href="#/">Todos</a>\r
            </li>\r
            <li>\r
                <a class="filtro" href="#/active">Pendientes</a>\r
            </li>\r
            <li>\r
                <a class="filtro" href="#/completed">Completados</a>\r
            </li>\r
        </ul>\r
        <!-- Hidden if no completed items are left ↓ -->\r
        <button class="clear-completed">Borrar completados</button>\r
    </footer>\r
</section>\r
\r
\r
<footer class="info">\r
    <p>Template creado por <a href="http://sindresorhus.com">Sindre Sorhus</a></p>\r
    <!-- Change this out with your name and url ↓ -->\r
    <p>Creado por <a href="http://todomvc.com">ti</a></p>\r
    <p>Parte de <a href="http://todomvc.com">TodoMVC</a></p>\r
</footer>`;let f;const C=new Uint8Array(16);function S(){if(!f&&(f=typeof crypto<"u"&&crypto.getRandomValues&&crypto.getRandomValues.bind(crypto),!f))throw new Error("crypto.getRandomValues() not supported. See https://github.com/uuidjs/uuid#getrandomvalues-not-supported");return f(C)}const r=[];for(let e=0;e<256;++e)r.push((e+256).toString(16).slice(1));function L(e,t=0){return(r[e[t+0]]+r[e[t+1]]+r[e[t+2]]+r[e[t+3]]+"-"+r[e[t+4]]+r[e[t+5]]+"-"+r[e[t+6]]+r[e[t+7]]+"-"+r[e[t+8]]+r[e[t+9]]+"-"+r[e[t+10]]+r[e[t+11]]+r[e[t+12]]+r[e[t+13]]+r[e[t+14]]+r[e[t+15]]).toLowerCase()}const E=typeof crypto<"u"&&crypto.randomUUID&&crypto.randomUUID.bind(crypto),b={randomUUID:E};function A(e,t,c){if(b.randomUUID&&!t&&!e)return b.randomUUID();e=e||{};const d=e.random||(e.rng||S)();if(d[6]=d[6]&15|64,d[8]=d[8]&63|128,t){c=c||0;for(let o=0;o<16;++o)t[c+o]=d[o];return t}return L(d)}class P{constructor(t){if(!t)throw new Error("No description has been sent as a parameter");this.id=A(),this.description=t,this.done=!1,this.createAt=new Date}}const i={All:"All",Completed:"Completed",Pending:"Pending"},l={todos:[],filter:i.All},k=()=>{w(),console.log("InitStore 🥥")},w=()=>{if(!localStorage.getItem("state"))return;const{todos:e=[],filter:t=i.All}=JSON.parse(localStorage.getItem("state"));l.todos=e,l.filter=t},g=()=>{localStorage.setItem("state",JSON.stringify(l))},I=(e=i.All)=>{switch(e){case i.All:return[...l.todos];case i.Completed:return l.todos.filter(t=>t.done);case i.Pending:return l.todos.filter(t=>!t.done);default:throw new Error(`Option ${e} is not valid`)}},U=e=>{if(!e)throw new Error("Description is required");l.todos.push(new P(e)),g()},x=e=>{l.todos.map(t=>(t.id===e&&(t.done=!t.done),t)),g()},q=e=>{l.todos=l.todos.filter(t=>t.id!==e),g()},F=()=>{l.todos=l.todos.filter(e=>!e.done),g()},M=(e=i.All)=>{if(Object.keys(i).filter(t=>t.includes(e))[0]!==e)throw new Error("Filter not found");l.filter=e,g()},O=()=>l.filter,a={addTodo:U,deleteCompleted:F,deleteTodo:q,getCurrentFilter:O,getTodos:I,initStore:k,loadStore:w,setFilter:M,toggleId:x};let h;const D=(e,t=[])=>{if(h||(h=document.querySelector(e)),!h)throw new Error(`Element ${e} not found`);h.innerHTML="",t.forEach(c=>{h.append(N(c))})},N=e=>{if(!e)throw new Error("A todo object is required");const{done:t,description:c,id:d}=e,o=`
    <div class="view">
        <input class="toggle" type="checkbox" ${t?"checked":""}>
        <label>${c}</label>
        <button class="destroy"></button>
    </div>
    <input class="edit" value="Create a TodoMVC template">`,n=document.createElement("li");return n.innerHTML=o,n.setAttribute("data-id",d),t&&n.classList.add("completed"),n};let y;const H=e=>{if(y||(y=document.querySelector(e)),!y)throw new Error(`Element: ${e} is not found`);y.innerHTML=a.getTodos(i.Pending).length},m={TodoList:".todo-list",NewTodoInput:"#new-todo-input",clearCompleted:".clear-completed",TodoFilters:".filtro",PendingCountTag:"#pending-count"},V=e=>{const t=()=>{const s=a.getTodos(a.getCurrentFilter());D(m.TodoList,s),c()},c=()=>{H(m.PendingCountTag)};(()=>{const s=document.createElement("div");s.innerHTML=v,document.querySelector(e).append(s),t()})();const d=document.querySelector(m.NewTodoInput),o=document.querySelector(m.TodoList),n=document.querySelector(m.clearCompleted),p=document.querySelectorAll(m.TodoFilters);d.addEventListener("keyup",s=>{s.keyCode===13&&s.target.value.trim().length!==0&&(a.addTodo(s.target.value),t())}),o.addEventListener("click",s=>{const u=s.target.closest("[data-id]");a.toggleId(u.getAttribute("data-id")),t()}),o.addEventListener("click",s=>{const u=s.target.closest("[data-id]");!u||!s.target.className.includes("destroy")||(a.deleteTodo(u.getAttribute("data-id")),t())}),n.addEventListener("click",s=>{a.deleteCompleted(),t()}),p.forEach(s=>{s.addEventListener("click",u=>{switch(p.forEach(T=>T.classList.remove("selected")),u.target.classList.add("selected"),u.target.text){case"Todos":a.setFilter(i.All);break;case"Pendientes":a.setFilter(i.Pending);break;case"Completados":a.setFilter(i.Completed);break}t()})})};a.initStore();V("#app");
