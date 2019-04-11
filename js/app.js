let email = document.getElementById('email');
let name = document.getElementById('name');
let age = document.getElementById('age');
let phone_number = document.getElementById('phone_number');
let skills = document.getElementById('skills');
let description = document.getElementById('description');
let date = document.getElementById('date');
let form_check = document.querySelector('.form-check');
let home = document.getElementById('home');
let cm;
let newStudent;
let modal = document.querySelector(".modal");
let trigger = document.querySelector(".trigger");
let closeButton = document.querySelector(".close-button");
let ch_email = document.getElementById('ch-email');
let ch_name = document.getElementById('ch-name');
let ch_age = document.getElementById('ch-age');
let ch_phone = document.getElementById('ch-phone');
let change = document.querySelector('#change');
let btshow = document.getElementById('btshow');
let add = document.getElementById('add');
let con = document.getElementById('con');
let showop = document.querySelector('.showop');
let wrapper_show = document.querySelector('.wrapper-show');
let cancel = document.querySelector('#cancel');

class Student {
    constructor(name, email, age, phone_number) {
        this.name = name;
        this.email = email;
        this.age = age;
        this.phone_number = phone_number;
    }
};

class StudentsManager {
    constructor() {
        this.listOfStudents = [];
    }

    add(contact) {
        this.listOfStudents.push(contact);
    }

    remove(e) {
        let forDelete = JSON.parse(localStorage.getItem("students"));
        forDelete.forEach((el, index) => {
            if (el.email === e.email) {
                forDelete.splice(index, 1);
            }
        });
        localStorage.setItem('students', JSON.stringify(forDelete));
        show();
    }

    persistData() {
      localStorage.setItem('students',JSON.stringify(this.listOfStudents));

    }

    readStorage() {
      const storage = JSON.parse(localStorage.getItem('students'));
      if(storage) this.listOfStudents = storage;
    }
};
const clearForm = () => {
  name.value = '';
  email.value = '';
  age.value = '';
  phone_number.value = '';
  skills.value = '';
  description.value = '';
  date.value = '';
  home.checked = false;
  let c = form_check.getElementsByTagName('input');
  for (var i = 0; i < c.length; i++) {
        if (c[i].type == 'radio') {
            c[i].checked = false;
        }
    };
};

const Validate = (event) => {
    event.preventDefault();
    newStudent = new Student(name.value, email.value, age.value, phone_number.value);
    cm.add(newStudent);
    cm.persistData();
    clearForm();
    return false;
};

window.addEventListener('load', () => {
  cm = new StudentsManager();
  cm.readStorage();
});

const toggleModal = () => {
    modal.classList.toggle("show-modal");
};

const windowOnClick = (event) => {
    if (event.target === modal) {
        toggleModal();
    }
};

const show = () => {
    let retrievedData1 = JSON.parse(localStorage.getItem("students"));
    let div = document.getElementById('show');
    let table = document.createElement('table');
    let thead = document.createElement('thead');
    let tr = document.createElement('tr');
    if (!retrievedData1 || retrievedData1.length === 0) {
        div.innerHTML = `<h3>The list is empty :(</h3>`
    } else {
        thead.innerHTML = `<tr><th>ID</th><th>Name</th><th>Email</th><th>Age</th><th>Phone</th><th>Edit</th><th>Delete</th></tr>`;
        retrievedData1.forEach((e, index) => {
            row = table.insertRow();
            row.innerHTML = `
                          <td>${index+1}</td>
                          <td>${e.name}</td>
                          <td>${e.email}</td>
                          <td>${e.age}</td>
                          <td>${e.phone_number}</td>
                          <td><img class='edit' src='images/edit.png'/></td>
                          <td><img class='delete' src='images/delete.png'/></td>
                        `
            let ed = row.querySelector('.edit');
            let del = row.querySelector('.delete');
            ed.addEventListener('click', (e) => {
                toggleModal();
                change.addEventListener('click', () => {
                    if (ch_name.value !== '') {
                        e.path[2].cells[1].innerHTML = ch_name.value;
                    }
                    if (ch_email.value !== '') {
                        e.path[2].cells[2].innerHTML = ch_email.value;
                    }
                    if (ch_age.value !== '') {
                        e.path[2].cells[3].innerHTML = ch_age.value;
                    }
                    if (ch_phone.value !== '') {
                        e.path[2].cells[4].innerHTML = ch_phone.value;
                    }
                    const data = {
                        name: e.path[2].cells[1].innerHTML,
                        email: e.path[2].cells[2].innerHTML,
                        age: e.path[2].cells[3].innerHTML,
                        phone_number: e.path[2].cells[4].innerHTML
                    }
                    retrievedData1.splice(index, 1, data);
                    localStorage.setItem('students', JSON.stringify(retrievedData1));

                });
            });

            del.addEventListener('click', () => {
                let con = confirm("Are you sure you want to delete?");
                if (con) {
                    cm.remove(e);
                } else {
                    return false;
                }
            });
        });
        div.innerHTML = '';
        table.appendChild(thead);
        div.appendChild(table);
    }
};

closeButton.addEventListener('click', toggleModal);

cancel.addEventListener('click', toggleModal);

btshow.addEventListener('click', () => {
    con.style.opacity = 0;
    wrapper_show.style.opacity = 1;
    wrapper_show.style.visibility = 'visible';
    btshow.classList.add('active');
    add.classList.remove('active');
    show();
});

add.addEventListener('click', () => {
    con.style.opacity = 1;
    wrapper_show.style.opacity = 0;
    wrapper_show.style.visibility = 'hidden';
    btshow.classList.remove('active');
    add.classList.add('active');
});
