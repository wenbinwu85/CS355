var myModal = document.getElementById('myModal');
var cancelButton = document.getElementById('cancel');
var id = '?';

// connect to the database and pass along the command to the php file to excute the correct query
function connectDB(command) {
    var xhttp = new XMLHttpRequest();
    xhttp.open('GET', command, true);
    xhttp.send();
}

// get all contact records from the database and generates a html table on the page
function getAllContacts() {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            document.getElementById('tableDiv').innerHTML = this.responseText;
        }
    };
    xhttp.open('GET', 'dbConn.php?mode=getall', true);
    xhttp.send();
}

// onclick function for the new contact button
function newContact() {
    document.getElementById('modalTitle').innerHTML = 'Add Contact';
    document.getElementById('submit').innerText = 'Add Contact';
    myModal.style.display = 'block';
}

// onclick function for the edit contact button
function editContact() {
    var table = document.getElementById('myTable');
    var checkboxes = document.getElementsByClassName('checkbox');
    for (var i=0; i<checkboxes.length; i++) {
        if (checkboxes[i].checked == true) {
            id = checkboxes[i].id;
            var row = table.rows[i+1];
        }
    }
    document.getElementById('fname').value = row.cells[2].innerHTML;
    document.getElementById('lname').value = row.cells[3].innerHTML;
    document.getElementById('city').value = row.cells[4].innerHTML;
    document.getElementById('state').value = row.cells[5].innerHTML;
    document.getElementById('dob').value = row.cells[6].innerHTML;
    document.getElementById('age').value = row.cells[7].innerHTML;
    document.getElementById('email').value = row.cells[8].innerHTML;

    document.getElementById('modalTitle').innerHTML = 'Edit Contact';
    document.getElementById('submit').innerText = 'Save Changes';
    myModal.style.display = 'block';
}

// onclick function for the delete contact button
function deleteContact() {
    // get all the checkboxes and iterate through them
    var checkboxes = document.getElementsByClassName('checkbox');
    for (var i = 0; i<checkboxes.length; i++) {
        if (i < checkboxes.length && checkboxes[i].checked == true) {
            id = checkboxes[i].id;
            // delete the contact from the database
            var command = 'dbConn.php?mode=delete&id=' + id;
            connectDB(command) // execute command
            document.getElementById('myTable').deleteRow(i + 1);

            // recursive for multiple rows selection
            deleteContact();
        }
    }
    getAllContacts();
}

// onclick function for the submit button
function submit() {
    var firstname = document.getElementById('fname').value;
    var lastname = document.getElementById('lname').value;
    var city = document.getElementById('city').value;
    var state = document.getElementById('state').value;
    var dob = document.getElementById('dob').value;
    var age = document.getElementById('age').value;
    var email = document.getElementById('email').value;

    var contact = '&firstname=' + firstname;
    contact += '&lastname=' + lastname;
    contact += '&city=' + city;
    contact += '&state=' + state;
    contact += '&dob=' + dob;
    contact += '&age=' + age;
    contact += '&email=' + email;

    if (document.getElementById('modalTitle').innerHTML == 'Add Contact') {
        var command = 'dbConn.php?mode=new' + contact;
    }

    if (document.getElementById('modalTitle').innerHTML == 'Edit Contact') {
        var command = 'dbConn.php?mode=update&id=' + id + contact;
    }

    connectDB(command); // execute command
    getAllContacts(); // refresh table
    clearFields();  // clear modal fields
    document.getElementById('myModal').style.display = 'none';
}

// clear the fields in my modal
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