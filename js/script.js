'use strict'
// login elements
const loginForm = document.querySelector('.login-form'),
    loginInput = document.querySelector('.login-input'),
    pswLogin = document.querySelector('.psw-login'),
    wrongInput = document.querySelector('.wrong-input'),
    wrongInputData = document.querySelector('.wrong-input-data'),
    singUpLink = document.querySelector('.sign-up');

//acount elements
const account = document.querySelector('.account'),
    accountLogout = document.querySelector('.account-logout'),
    accountName = document.querySelector('.account-name'),
    accountInfo = document.querySelector('.account-info'),
    deleteAccount = document.querySelector('.delete-account') 

//registration elements
const registrationForm = document.querySelector('.registration-form'),
    signInLink = document.querySelector('.sign-in'),
    registrationName = document.querySelector('.registration-name'),
    registrationLogin = document.querySelector('.registration-login'),
    registrationPsw = document.querySelector('.registration-psw'),
    warningMessage = document.querySelector('.warning-message')


let userLogIn = JSON.parse(localStorage.getItem('activeUser'))


const dateOptions = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    timezone: 'UTC',
    hour: 'numeric',
    minute: 'numeric',
    second: 'numeric'
};

let usersData = JSON.parse(localStorage.getItem('users'));
if(usersData == null) usersData = [
    {
        userName: 'Dmytro',
        userLastName: 'Gopko',
        login: '1',
        psw: '1',
        date: 'registered before the project was creating! Like a BOSS',
    } //Admin USER
];

const signInArea = function(){
    loginForm.classList.remove('deactivate');
    registrationForm.classList.add('deactivate');
    account.classList.add('deactivate');
}


const accountArea = function() {
    loginForm.classList.add('deactivate');
    account.classList.remove('deactivate');
    accountName.textContent = userLogIn.userName;
    accountInfo.textContent = 'Name: ' + userLogIn.userName + ', last name: ' + userLogIn.userLastName + ', Registration date: ' + userLogIn.date;
}
const userActive = function (){
    if (userLogIn === null) {
        userLogIn = {}
    } else {
        loginForm.classList.add('deactivate')
        account.classList.remove('deactivate')
        accountArea()
    }
};


const loginArea = function (){    
    usersData.forEach(function(item, i){
        if(loginInput.value === item.login && pswLogin.value === item.psw) {
            userLogIn = item
            localStorage.setItem('activeUser', JSON.stringify(userLogIn))
            accountArea();
            loginInput.value = ''
            pswLogin.value = ''

        } else{
            wrongInput.classList.remove('deactivate');
            wrongInputData.classList.add('deactivate');
        }
    });
};

loginForm.addEventListener('submit', function(event){
    event.preventDefault();
    if(loginInput.value !== '' && pswLogin.value !== '') {
        loginArea();
    } else {
        wrongInputData.classList.remove('deactivate');
        wrongInput.classList.add('deactivate');
    };
});
singUpLink.addEventListener('click',function(){
    loginForm.classList.add('deactivate');
    registrationForm.classList.remove('deactivate')
})

signInLink.addEventListener('click', signInArea);

registrationForm.addEventListener('submit', function(event){
    event.preventDefault();
    const date = new Date(); 
    const nameOfUser = registrationName.value.split(' ')
    const newUser = {
        userName: nameOfUser[0],
        userLastName: nameOfUser[1],
        login: registrationLogin.value,
        psw: registrationPsw.value,
        date: date.toLocaleDateString("ru", dateOptions),
    };
    // here create check if the user is registered
    console.log(newUser) 
    usersData.unshift(newUser);
    localStorage.setItem('users', JSON.stringify(usersData))
    alert('Now you can sign in')
    registrationForm.classList.add('deactivate');
    loginForm.classList.remove('deactivate');
    registrationName.value = '';
    registrationLogin.value = '';
    registrationPsw.value = '';
});

accountLogout.addEventListener('click', function(){
    localStorage.removeItem('activeUser')
    signInArea();
})


userActive();