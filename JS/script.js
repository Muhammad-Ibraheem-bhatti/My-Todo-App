window.onload = () => {}
// var Name = prompt("Enter Your name")
// document.getElementById("name").innerHTML = Name
setInterval(
    () => {
        document.getElementById("time").innerText = dayjs().format('dddd, MMM DD YYYY,hh:mm:ss A')
    }, 1000
)


const showUserINTable = () => {
        const users = JSON.parse(localStorage.getItem("users")) || [];
        console.log(users)
        if (!users.length) {
            output("<h3 style='text-align:center';>Hurray! No task Avialable. Add new task by clicking on button </h3>")
            return;
        }
        for (let i = 0; i < users.length; i++) {
            let tableStart = '<div class="table-responsive"><table class="table">';
            let tableHead = '<thead><tr><th>#</th><th scope = "row">Title</th><th scope = "row">location</th><th scope = "row">Description</th><th scope = "row">Action</th></thead>';
            let tableEnd = '</table></div>';
            let tableBody = '';
            for (let i = 0; i < users.length; i++) {
                tableBody += '<tr><td>' + (i + 1) + '</td><td>' + users[i].title + '</td><td>' + users[i].location + '</td><td>' + users[i].description + '</td><td><button class="btn btn-sm btn-info m-2" data-value="' + users[i].id + '" onclick="editUser(event)">Edit</button><button class="btn btn-sm btn-danger m-2" data-value="' + users[i].id + '" onclick="deleteUser(event)">Delete</button>';
            }
            let table = tableStart + tableHead + '<tbody>' + tableBody + '</tbody>' + tableEnd;
            // let tableOut = document.getElementById("table").innerHTML = table
            output(table);
        }
    }
    //inital call table code
showUserINTable();
// while submit data field automatic empty
const emptyField = () => {
    document.getElementById("title").value = ""
    document.getElementById("location").value = ""
    document.getElementById("description").value = ""
}

function getRandomnumber() {
    return Math.random().toString(36).slice(2)
}

const setFieldValue = (fieldId, value) => {
    document.getElementById(fieldId).value = value
}

function toastify(msg, type) {

    let bgColor;
    switch (type) {
        case "success":
            bgColor = "linear-gradient(to right ,#1D976C, #93F9B9)"
            break;
        case "error":
            bgColor = "linear-gradient(to right ,#93291e, #ed213a)"
            break;
        default:
            bgColor = "linear-gradient(to bottom, #ffffcc 0%, #000000 100%);"
    }
    Toastify({
        text: msg,
        duration: 3000,
        destination: "https://github.com/apvarun/toastify-js",
        newWindow: true,
        close: true,
        gravity: "top", // `top` or `bottom`
        position: "center", // `left`, `center` or `right`
        stopOnFocus: true, // Prevents dismissing of toast on hover
        style: {
            background: bgColor,
        },
        onClick: function() {} // Callback after click
    }).showToast();
}

function output(result) {
    return document.getElementById('table').innerHTML = result;
}


const getInputFeildvalue = id => document.getElementById(id).value

const handlesubmit = () => {
    event.preventDefault()
    let title = getInputFeildvalue("title"),
        location = getInputFeildvalue("location"),
        description = getInputFeildvalue("description");
      
    title = title.trim();
    location = location.trim();
    description = description.trim();

    if (title.length < 3) {
        toastify("Plaese Enter Your Title Correctly", "error");
        return;
    }
    if (location.length < 3) {
        toastify("Plaese Enter Your location Correctly", "error");
        return;
    }
    if (description.length < 10) {
        toastify("Plaese Enter Your description Correctly", "error");
        return;
    }
    try {
        let user = {
            title,
            location,
            description,
        }
        document.getElementById("name").innerHTML = user.title;
        user.status = "active";
        user.id = getRandomnumber(),
            user.dateCreated = new Date().getTime();
        const users = JSON.parse(localStorage.getItem("users")) || []
        users.push(user);
        localStorage.setItem("users", JSON.stringify(users))
        toastify("A new User Or todo is sucessfully Added", "success");
        showUserINTable();
        emptyField();
    } catch (error) {
        console.error(error)

    }
}
const deleteUser = (event) => {
    let userId = event.target.getAttribute('data-value');
    console.log(userId)
    const users = JSON.parse(localStorage.getItem("users"));
    let userAfterDelete = users.filter((user) => {
        return user.id !== userId
    })
    console.log(users);
    console.log(userAfterDelete)

    localStorage.setItem("users", JSON.stringify(userAfterDelete));
    toastify("Yor Filed is Sucessfully Deleted", "sucess");
    showUserINTable();

}
const editUser = (event) => {
    let userId = event.target.getAttribute('data-value');
    const users = JSON.parse(localStorage.getItem("users"));
    let user = users.find((user) => {
        return user.id === userId
    })
    const { title, location, description } = user
    /*similar code
     *const title=user.title
     *const description=user.description
     */
    // set value of inputfields
    // document.getElementById("title").value = title
    // document.getElementById("location").value = location
    // document.getElementById("description").value = description
    setFieldValue("title", title)
    setFieldValue("location", location)
    setFieldValue("description", description)
    localStorage.setItem("userForEdit", JSON.stringify(user))
    document.getElementById("addTask").style.display = "none";
    document.getElementById("updateTask").style.display = "inline-block";

}
const handleEdit = () => {
    const userEdit = JSON.parse(localStorage.getItem("userForEdit"));
    console.log(userEdit)
    let updateTitle = getInputFeildvalue("title"),
        updateLocation = getInputFeildvalue("location"),
        updateDescription = getInputFeildvalue("description")

    //Mergeing the two Objects User and userEdit

    const updateduser = {...userEdit, title: updateTitle, location: updateLocation, description: updateDescription }
    updateduser.dateModefied = new Date().getTime();
    const users = JSON.parse(localStorage.getItem("users"));
    let updatedUsers = users.map(user => {
        if (user.id === updateduser.id) {
            return updateduser
        }
        return user
    })

    localStorage.setItem("users", JSON.stringify(updatedUsers))
    document.getElementById("addTask").style.display = "inline-block"
    document.getElementById("updateTask").style.display = "none"
    emptyField();
    showUserINTable();
    console.log(updateduser)
        // const todoForEdit = JSON.parse(localStorage.getItem("todoForEdit"))

    // let updatedTitle = getInputValue("title")
    // let updatedLocation = getInputValue("location")
    // let updatedDescription = getInputValue("description")

    // const updatedTodo = {...todoForEdit, title: updatedTitle, location: updatedLocation, description: updatedDescription }
    // updatedTodo.dateModified = new Date().getTime()

    // const todos = JSON.parse(localStorage.getItem("todos"))
    // const updatedTodos = todos.map(todo => {
    //     if (todo.id === updatedTodo.id) {
    //         return updatedTodo
    //     }
    //     return todo
    // })

    // localStorage.setItem("todos", JSON.stringify(updatedTodos))
    // notice("A todo has been updated", "success");
    // document.getElementById("addTask").style.display = "inline-block"
    // document.getElementById("updateTask").style.display = "none"
}