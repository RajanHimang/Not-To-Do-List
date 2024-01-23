const todoListElem = document.getElementById("mustDoList");
const ignoreListElem = document.getElementById("ignoreList");
const ignoreHrElem = document.getElementById("ignoreHr");
const totalHrElem = document.getElementById("totalHr");

let toDoList = [];

const generateRandomStr = (length = 6) => {
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let result = "";

  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    result += characters.charAt(randomIndex);
  }

  return result;
};

const handleOnSubmit = (event) => {
  // stops page from refresh
  event.preventDefault();
  const form = event.target;
  const formData = new FormData(form);
  const todo = formData.get("task");
  const hr = formData.get("hr");
  if (+hr < 1) {
    return alert("Please, eneter a valid hrs");
  }
  form.reset();
  const obj = {
    id: generateRandomStr(),
    todo: todo,
    hr: hr,
    type: "entry",
  };

  toDoList.push(obj);
  displayEntryList();
  displayIgnoreList();
  calculateTotalHrs();
};

const displayEntryList = () => {
  let htmlStr = "";
  const entryList = toDoList.filter((todo) => todo.type === "entry");
  // console.log(toDoList);
  entryList.forEach((task, index) => {
    htmlStr += `<tr>
    <td>${index + 1}</td>
    <td>${task.todo}</td>
    <td>${task.hr}</td>
    <td>
      <button class="btn btn-danger" onClick="handleDelete('${task.id}')">
        <i class="fa-solid fa-trash"></i>
      </button>
      <button class="btn btn-success" onClick="updateType('${
        task.id
      }', 'ignore')">
        <i class="fa-solid fa-arrow-right"></i>
      </button>
    </td>
  </tr>`;
  });
  todoListElem.innerHTML = htmlStr;
};

const displayIgnoreList = () => {
  // console.log("Read List", toDoList);
  let htmlStr = "";
  const entryList = toDoList.filter((todo) => todo.type === "ignore");
  // console.log(toDoList);
  entryList.forEach((task, index) => {
    htmlStr += `<tr>
      <td>${index + 1}</td>
      <td>${task.todo}</td>
      <td>${task.hr}</td>
      <td>
        <button class="btn btn-danger" onClick="handleDelete('${task.id}')">
          <i class="fa-solid fa-trash"></i>
        </button>
        <button class="btn btn-warning" onClick="updateType('${
          task.id
        }','entry')">
          <i class="fa-solid fa-arrow-left"></i>
        </button>
      </td>
    </tr>`;
  });
  ignoreListElem.innerHTML = htmlStr;
};

const handleDelete = (id) => {
  if (confirm("Do you want to delete?")) {
    toDoList = toDoList.filter((todo) => todo.id !== id);
    displayEntryList();
    displayIgnoreList();
    calculateTotalHrs();
  }
};

const updateType = (id, type) => {
  // console.log("Updating type");
  toDoList = toDoList.map((todo) => {
    if (todo.id === id) {
      return {
        ...todo,
        type,
        // Another way of changing type
        // type: todo.type === "entry" ? "ignore" : "entry"
      };
    } else {
      return todo;
    }
  });
  displayEntryList();
  displayIgnoreList();
  calculateTotalHrs();
};

// Homework: Finish the total hours calculation!

const calculateTotalHrs = () => {
  let totalHr = 0;
  let ignoredHr = 0;
  console.log(toDoList);
  for (let i = 0; i < toDoList.length; i++) {
    const todo = toDoList[i];
    console.log("todo", todo);
    totalHr += +todo.hr;
    if (todo.type === "ignore") {
      ignoredHr += +todo.hr;
    }
  }
  ignoreHrElem.innerText = ignoredHr;
  totalHrElem.innerText = totalHr;
};

//ES6

// totalHrElem.innerText = toDoList.reduce((temp, todo) => temp + +todo.hr, 0);
// ignoreHrElem.innerText = toDoList.filter(todo => todo.type === 'ignore').reduce((temmp, todo) => temp + +todo.hr, 0);
