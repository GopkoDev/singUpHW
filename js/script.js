'use strict'

const loginForm = document.querySelector('.login-form'),
    loginInput = document.querySelector('.login-input'),
    pswLogin = document.querySelector('.psw-login'),
    wrongInput = document.querySelector('.wrong-input'),
    wrongInputData = document.querySelector('.wrong-input-data')

let date = new Date(); 
let dateOptions = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    timezone: 'UTC',
    hour: 'numeric',
    minute: 'numeric',
    second: 'numeric'
};

const usersData = [
    {
        userName: 'Dmytro',
        userLastName: 'Gopko',
        login: 'DimiC_H',
        psw: 'aa11q',
        date: date.toLocaleDateString("ru", dateOptions)
    },
    {
        userName: 'Vad',
        userLastName: 'Pryhara',
        login: 'Vlad_PR',
        psw: 'q11aa',
        date: date.toLocaleDateString("ru", dateOptions)
    },
];

const loginArea = function (){
    usersData.forEach(function(item, i){
        if(loginInput.value === item.login && pswLogin.value === item.psw) {
            alert('ok'); //
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
    }
});
