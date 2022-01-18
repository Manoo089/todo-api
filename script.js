const todoUl = document.querySelector(".todo-list");
const newTodo = document.querySelector("#input-todo");

const addButton = document.querySelector("button");
addButton.addEventListener("click", addTodo);

const url = "http://localhost:4730/todos";

fetch(url)
    .then((response) => {
        if (response.ok) {
            return response.json();
        } else {
            alert("Da hat was nicht funktioniert!");
        }
    })
    .then((data) => {
        data.forEach((todo) => {
            const todoLi = document.createElement("li");
            const checkbox = document.createElement("input");
            checkbox.type = "checkbox";

            todoUl.appendChild(todoLi);
            todoLi.textContent = todo.description;
            todoLi.appendChild(checkbox);

            if (todo.done) {
                checkbox.checked = "true";
            }
        });
        console.log(data);
        console.log(JSON.stringify(data));
    });

function addTodo() {
    fetch(url, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ id: "", description: newTodo.value, done: false }),
        })
        .then((res) => res.json())
        .then((res) => {
            location.reload();
        });
}