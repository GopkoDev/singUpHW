'use strict'

// SETTING VARIABLES
// Login elements
const loginForm = document.querySelector('.login-form'),
    loginInput = document.querySelector('.login-input'),
    pswLogin = document.querySelector('.psw-login'),
    wrongInput = document.querySelector('.wrong-input'),
    wrongInputData = document.querySelector('.wrong-input-data'),
    singUpLink = document.querySelector('.sign-up');

// Acount elements
const account = document.querySelector('.account'),
    accountLogoutBtn = document.querySelector('.account-logout'),
    accountName = document.querySelector('.account-name'),
    accountInfo = document.querySelector('.account-info'),
    deleteAccountBtn = document.querySelector('.delete-account') 

// Registration elements
const registrationForm = document.querySelector('.registration-form'),
    signInLink = document.querySelector('.sign-in'),
    registrationName = document.querySelector('.registration-name'),
    registrationLogin = document.querySelector('.registration-login'),
    registrationPsw = document.querySelector('.registration-psw'),
    warningMessage = document.querySelector('.warning-message')

// Warning window elemets
const warningWindow = document.querySelector('.warning-window'),
    warningYesButton = document.querySelector('.yes-button'),
    warningNoButton = document.querySelector('.no-button')

//Enother variables
let deleteLoggetUserIndex = ''

// Date options
const dateOptions = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    timezone: 'UTC',
    hour: 'numeric',
    minute: 'numeric',
    second: 'numeric'
};

// Download data users from local storage
let loggetInUser = JSON.parse(localStorage.getItem('Logget in User'));  // logged in user
let usersData = JSON.parse(localStorage.getItem('users'));  // all users
console.log(usersData)
if(usersData == null || usersData.length == 0) {
    usersData = [
    //Admin USER
        {   
            userName: 'Dmytro',
            userLastName: 'Gopko',
            login: '1',
            psw: '1',
            rank: 'admin',
            date: 'registered before the project was creating! Like a BOSS',
        } 
    ];
    localStorage.setItem('users', JSON.stringify(usersData))
};
console.log(usersData)

// FUNCTIONS 
// styles Login area 
const loginAreaStyles = function(){
    loginForm.classList.remove('deactivate');
    registrationForm.classList.add('deactivate');
    account.classList.add('deactivate');
    wrongInput.classList.add('deactivate');
    wrongInputData.classList.add('deactivate');
};

// styles Registration area 
const registrationAreaStyles = function() {
    registrationForm.classList.remove('deactivate');
    loginForm.classList.add('deactivate');
    account.classList.add('deactivate');
};

// styles Acount area 
const accountAreaStyles = function() {
    account.classList.remove('deactivate');
    registrationForm.classList.add('deactivate');
    loginForm.classList.add('deactivate');
};

// styles Empty inputs
const emptyInputsStyles = function(){
    wrongInputData.classList.remove('deactivate');
    wrongInput.classList.add('deactivate');
};

// styles Wrong autorization data
const wrongDataStyles = function() {
    wrongInput.classList.remove('deactivate');
    wrongInputData.classList.add('deactivate');
}

// for cleaning inputs 
const cleaningInputs = function() {
    registrationName.value = '';
    registrationLogin.value = '';
    registrationPsw.value = '';
    loginInput.value = '';
    pswLogin.value = '';
}

// for work with AUTHORIZATION
const userAuthorization = function() {
    usersData.forEach(function(item){
        if(loginInput.value === item.login && pswLogin.value === item.psw) {
            loggetInUser = item
            localStorage.setItem('Logget in User', JSON.stringify(loggetInUser))
                //logged in username record to local storage
            loggetUserArea();  
            cleaningInputs();

        } else{
            wrongDataStyles();
        }
    });
};

// for work with REGISTRATION
const userRegistration = function(){
    const date = new Date(); 
    const nameOfUser = registrationName.value.split(' ')
    const newUser = {  // new user form
        userName: nameOfUser[0],
        userLastName: nameOfUser[1],
        login: registrationLogin.value,
        psw: registrationPsw.value,
        date: date.toLocaleDateString("ru", dateOptions),
    };
    // here create check if the user is registered
    usersData.unshift(newUser); // add new user in the head of array of users
    localStorage.setItem('users', JSON.stringify(usersData)) // record new array with new user in local storage
    alert('Now you can sign in')
    loginAreaStyles();
    cleaningInputs();
};

// for Logget User Area
const loggetUserArea = function() {
    accountAreaStyles();
    accountName.textContent = loggetInUser.userName;
    accountInfo.textContent = 'Name: ' + loggetInUser.userName + ', last name: ' 
    + loggetInUser.userLastName
     + ', Registration date: '
      + loggetInUser.date;
};

// for checkin Logget user on start
const checkLoggetUser = function (){
    if (loggetInUser === null) {
        loggetInUser = {};
    } else {
        accountAreaStyles();
        loggetUserArea();
    }
}; 

// for LogOut from acount
const logOut = function(){
    localStorage.removeItem('Logget in User');
    loginAreaStyles();
};

//for Delete Users
const deleteUser = {
    styleActWarning(){
        warningWindow.classList.remove('deactivate');
    },
    styleDeactWorning(){
        warningWindow.classList.add('deactivate');
    },
    deletingLoggetUser(){
        if(loggetInUser.rank == 'admin'){ //cheking for ADMIN
            deleteUser.styleDeactWorning();
            alert('I am admin motherFucker !!!');
        } else { //deleting logget user
            deleteLoggetUserIndex = usersData.findIndex(function(item){ // search fo index of user
                return item.login == loggetInUser.login
            });
            usersData.splice(deleteLoggetUserIndex, 1); // delete from aaray user with index
            localStorage.setItem('users', JSON.stringify(usersData)); //recording new array with users
            deleteUser.styleDeactWorning()
            logOut();;
        };
    }
};


// LISTENERS OF BUTTONS
loginForm.addEventListener('submit', function(event){
    event.preventDefault();
    if(loginInput.value !== '' && pswLogin.value !== '') {
        userAuthorization();
    } else {
        emptyInputsStyles();
    };
});

registrationForm.addEventListener('submit', function(event){
    event.preventDefault();
    userRegistration();
});

singUpLink.addEventListener('click', registrationAreaStyles);
signInLink.addEventListener('click', loginAreaStyles);
accountLogoutBtn.addEventListener('click', logOut);
deleteAccountBtn.addEventListener('click', deleteUser.styleActWarning);
warningYesButton.addEventListener('click', deleteUser.deletingLoggetUser);
warningNoButton.addEventListener('click', deleteUser.styleDeactWorning) ;

checkLoggetUser();