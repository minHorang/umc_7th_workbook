let inputBox = document.getElementById("inputField");
let toDoList = document.getElementById("task-todo");
let doneList = document.getElementById("task-done");

function KeyDownCheck() {
  console.log(event.key);
  if (event.key == "Enter" && event.isComposing === false) {
    var list = document.createElement("div");
    let text = document.createElement("span");
    text.textContent = inputBox.value;
    list.appendChild(text);
    const button = document.createElement("button");
    list.appendChild(button);
    button.textContent = "완료";
    inputBox.value = "";
    toDoList.appendChild(list);
    const buttonDel = document.createElement("button");

    button.addEventListener("click", (e) => {
      list = document.createElement("div");
      text = document.createElement("span");
      text.textContent = event.currentTarget.previousElementSibling.textContent;
      console.log(event.currentTarget.previousElementSibling.textContent);
      list.appendChild(text);
      list.appendChild(buttonDel);
      buttonDel.textContent = "제거";
      doneList.appendChild(list);

      toDoList.removeChild(event.currentTarget.parentNode);
    });

    buttonDel.addEventListener("click", (e) => {
      doneList.removeChild(event.currentTarget.parentNode);
    });
  }
}
