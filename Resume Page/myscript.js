var myModal = document.getElementById('myModal');
var cancelButton = document.getElementById('cancel');
var myContacts = {};  // {'id': contact}

// generates a contact id from the given contact
function makeContactId(contact) {
    var ranNum = Math.floor(Math.random() * 100);
    var id = contact.firstname.length + contact.lastname.length + contact.age + ranNum;
    while (id in myContacts) {  // increment an id to avoid collision
        id += 1;
    }
    return id;
}

// make a contact object
function makeContact() {
    var contact = {
        'firstname': document.getElementById('fname').value,
        'lastname': document.getElementById('lname').value,
        'city': document.getElementById('city').value,
        'state': document.getElementById('state').value,
        'dob': document.getElementById('dob').value,
        'age': Number(document.getElementById('age').value),
        'email': document.getElementById('email').value
    }
    var id = makeContactId(contact);
    contact['id'] = id;
    myContacts[id] = contact;
    return contact;
}

// add a row to the table
function addRow(contact) {
    var box = document.createElement('input');
    box.setAttribute('type', 'checkbox');
    box.setAttribute('class', 'checkbox');
    box.setAttribute('id', contact.id);  // set the checkbox's id to the contact's id

    // create a checkbox in cell 0 of a table row, with the id of the contact it will hold
    var table = document.getElementById('myTable');
    var row = table.insertRow(0+1);
    row.setAttribute('id', contact.id);

    var checkbox = row.insertCell(0);
    var firstname = row.insertCell(1);
    var lastname = row.insertCell(2);
    var city = row.insertCell(3);
    var state = row.insertCell(4);
    var dob = row.insertCell(5);
    var age = row.insertCell(6);
    var email = row.insertCell(7);

    checkbox.appendChild(box);
    firstname.innerHTML = contact.firstname;
    lastname.innerHTML = contact.lastname;
    city.innerHTML = contact.city;
    state.innerHTML = contact.state;
    dob.innerHTML = contact.dob;
    age.innerHTML = contact.age;
    email.innerHTML = contact.email;
}

// onclick function for the new contact button
function newRow() {
    myModal.style.display = 'block';
    document.getElementById('modalTitle').innerHTML = 'New Contact';
    document.getElementById('submit').innerText = 'Add Contact';
}

// onclick function for the edit contact button
function editRow() {
    var checkboxes = document.getElementsByClassName('checkbox');
    for (var i=0; i<checkboxes.length; i++) {
        if (checkboxes[i].checked == true) {
            var contactId = checkboxes[i].getAttribute('id');
        }
    }
    var contact = myContacts[contactId];
    document.getElementById('fname').value = contact.firstname;
    document.getElementById('lname').value = contact.lastname;
    document.getElementById('city').value = contact.city;
    document.getElementById('state').value = contact.state;
    document.getElementById('dob').value = contact.dob;
    document.getElementById('age').value = contact.age;
    document.getElementById('email').value = contact.email;

    document.getElementById('modalTitle').innerHTML = 'Edit Contact';
    document.getElementById('submit').innerText = 'Save Changes';
    myModal.style.display = 'block';
}

// onclick function for the delete contact buttion
function delRow() {
    // get all the checkboxes and iterate through them
    var checkboxes = document.getElementsByClassName('checkbox');
    for (var i = 0; i<checkboxes.length; i++) {
        if (i < checkboxes.length && checkboxes[i].checked == true) {
            // remove the contact from myContacts
            delete myContacts[checkboxes[i].id];
            // remove the checked row from the table
            document.getElementById('myTable').deleteRow(i + 1);
            // recursive for multiple rows selection
            delRow();
        }
    }
}

// onclick function for the submit button
function submit() {
    if (document.getElementById('modalTitle').innerHTML == 'Edit Contact') {
        delRow();
    }

    var contact = makeContact();
    addRow(contact);

    clearFields();
    document.getElementById('myModal').style.display = 'none';
}

function clearFields() {
    document.getElementById('fname').value = '';
    document.getElementById('lname').value = '';
    document.getElementById('city').value = '';
    document.getElementById('state').value = '';
    document.getElementById('dob').value = '';
    document.getElementById('age').value = '';
    document.getElementById('email').value = '';
}

// onclick function for the cancel button in my modal
cancelButton.onclick = function () {
    clearFields();
    myModal.style.display = "none";
}

// check/uncheck all checkboxes
function checkAllBoxes(source) {
    checkboxes = document.getElementsByClassName('checkbox');
    for (var i=0; i<checkboxes.length; i++) {
        checkboxes[i].checked = source.checked;
    }
}


// ---------- populate the table with contacts ----------

function addContact(contact) {
    var id = makeContactId(contact);
    contact['id'] = id;
    myContacts[id] = contact;
}

addContact({
    'firstname': 'Wenbin',
    'lastname': 'Wu',
    'city': 'Flushing',
    'state': 'NY',
    'dob': '2000-01-01',
    'age': 18,
    'email': 'wenbin@wu.com'
});
addContact({
    'firstname': 'Jennifer',
    'lastname': 'Huang',
    'city': 'Flushing',
    'state': 'NY',
    'dob': '2011-11-02',
    'age': 7,
    'email': 'jennifer@huang.com'
});
addContact({
    'firstname': 'Eddie',
    'lastname': 'Lee',
    'city': 'Whitestone',
    'state': 'NY',
    'dob': '1980-01-01',
    'age': 38,
    'email': 'eddie@lee.com'
});
addContact({
    'firstname': 'Daniel',
    'lastname': 'Smith',
    'city': 'Phoenix',
    'state': 'AZ',
    'dob': '1998-25-12',
    'age': 30,
    'email': 'daniel@smith.com'
});
addContact({
    'firstname': 'Homer',
    'lastname': 'Simpson',
    'city': 'Springfield',
    'state': 'OR',
    'dob': '1965-12-05',
    'age': 53,
    'email': 'homer@simposon.com'
});

for (id in myContacts) {
    addRow(myContacts[id]);
}