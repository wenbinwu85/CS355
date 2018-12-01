<?php
$servername = 'mars.cs.qc.cuny.edu';
// change login credentials and database name
$username = "username"; 
$password = "password";
$dbname = "db name";

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);

// Check connection
if ($conn->connect_error) {
    die('Connection failed: ' . $conn->connect_error);
}

$mode = $_GET['mode'];

// get all the contacts and return an html table
if ($mode == 'getall') {
    $sql = 'call spGetAllContacts();';
    $result = $conn->query($sql);
    echo "<table id='myTable'>
    <tr>
    <th><input type='checkbox' onclick='checkAllBoxes(this)'></th>
    <th>Contact ID</th>
    <th>First Name</th>
    <th>Last Name</th>
    <th>City</th>
    <th>State</th>
    <th>Date of Birth</th>
    <th>Age</th>
    <th>Email</th>
    </tr>";

    if ($result->num_rows > 0) {
        // output data of each row
        while($row = $result->fetch_assoc()) {
            echo '<tr id=' . $row['contactID'] . '>';
            echo '<td>' . '<input type="checkbox" class="checkbox" id=' . $row['contactID'] . '>' . '</td>';
            echo '<td>' . $row['contactID'] . '</td>';
            echo '<td>' . $row['firstName'] . '</td>';
            echo '<td>' . $row['lastName'] . '</td>';
            echo '<td>' . $row['city'] . '</td>';
            echo '<td>' . $row['state'] . '</td>';
            echo '<td>' . $row['dob'] . '</td>';
            echo '<td>' . $row['age'] . '</td>';
            echo '<td>' . $row['email'] . '</td>';
            echo '</tr>';
        }
        echo '</table>';
    }
}

// insert a new contact
if ($mode == 'new') {
    $firstname = $_GET['firstname'];
    $lastname = $_GET['lastname'];
    $city = $_GET['city'];
    $state = $_GET['state'];
    $dob = $_GET['dob'];
    $age = $_GET['age'];
    $email = $_GET['email'];

    $sql = 'call spInsertNewContact("' .
        $firstname . '", "' . $lastname . '", "' . $city . '", "' . $state . '", "' . $dob . '", "' . $age . '", "' . $email .
        '");';
    $conn->query($sql);
}

// update a contact
if ($mode == 'update') {
    $id = intval($_GET['id']);
    $firstname = $_GET['firstname'];
    $lastname = $_GET['lastname'];
    $city = $_GET['city'];
    $state = $_GET['state'];
    $dob = $_GET['dob'];
    $age = $_GET['age'];
    $email = $_GET['email'];

    $sql = 'call spUpdateContact(' .
    $id . ', "' . $firstname . '", "' . $lastname . '", "' . $city . '", "' . $state . '", "' . $dob . '", "' . $age . '", "' . $email .
    '");';
    $conn->query($sql);
}

// delete a contact
if ($mode == 'delete') {
    $id = intval($_GET['id']);
    $sql = 'call spDeleteContact(' . $id . ');';
    $conn->query($sql);
}

$conn->close();
?>