
'use strict';

(function (module) {

    const dbUserForm = {};

    $('#create-user').on('submit', (e) => {
        e.preventDefault();
        let newUserName = $('#create-name').val();
        let newUserPin = $('#create-pin').val();
        if (!newUserName || !newUserPin ) {
            $('#newUserSection p').text('Invalid entry, please complete both fields.').css({'color': 'red'});
        } else {
        console.log(newUserName, newUserPin);
       
        dbUserForm.createNewUser(newUserName, newUserPin);
        }

    });

    dbUserForm.createNewUser = (newUserName, newUserPin) => {
        console.log(newUserName, newUserPin);

        $.post(`${ENV.apiUrl}/users/new`, {
            name: newUserName,
            pin: newUserPin
        })
            .then(results => dbUserForm.validateNewUser(newUserName, newUserPin))
            .catch(err => {
                console.error(err);
                $('#newUserSection p').text('Username already taken! Please try another.').css({'color': 'red'});
            });
    }

    dbUserForm.validateNewUser = (nameFromDB, pinFromDB) => {
        console.log(nameFromDB);
       
            $.get(`${ENV.apiUrl}/users/login/${nameFromDB}/${pinFromDB}`)
                .then(response => {
                    console.log(response);
                    let newID = response[0].id;
                    let newUserName = response[0].name;
                    localStorage.setItem('ID', JSON.stringify(newID));
                    alert(`Welcome, ${newUserName}!`);
                    dbUserForm.goToFormPage();
                })
                .catch(err => {
                    console.error(err);
                });
    }
    
    dbUserForm.goToFormPage = () => {
        page('/preferences');
    }

    module.dbUserForm = dbUserForm;

})(app);
