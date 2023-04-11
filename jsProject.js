
const getDB = async (url) => {
    // await - пока не выполнится fetch, ничего другого не произойдет
    const response = await fetch(url);

    if (!response.ok) {
        throw new Error(`Error for url: ${url}, status: ${response.status}`);
    }
    return await response.json();
}


const sendData = async (url, data) => {
    const response = await fetch(url, {
        method: 'POST',
        // без хедерсов нихера не работает
        headers: { 'Content-Type': 'application/json;charset=utf-8' },
        body: JSON.stringify(data)
    })

    if (!response.ok) {
        throw new Error(`Error for url: ${url}, status: ${response.status}`);
    }

    return await response.json();
}

// модальные окна



let openModal = document.querySelector('.button_open');
let btnAccount = document.querySelector('.account');
let modalCont1 = document.querySelector('.modal_cont_1');
let modalCont2 = document.querySelector('.modal_cont_2');
let modalWindow1 = document.querySelector('.modal_window_1');
let modalWindow2 = document.querySelector('.modal_window_2');


let navSignin = document.querySelector('.nav_signin');
let navSignup = document.querySelector('.nav_signup');

openModal.onclick = function () {
    modalCont1.classList.remove('hid_modal');
    document.body.classList.add('bodyForModal');
}

navSignin.addEventListener('click', function () {
    modalCont1.classList.remove('hid_modal');
    modalCont2.classList.add('hid_modal');

});

navSignup.addEventListener('click', function () {
    modalCont1.classList.add('hid_modal');
    modalCont2.classList.remove('hid_modal');
})



modalCont1.addEventListener('click', (e) => {
    const withinBoundaries1 = e.composedPath().includes(modalWindow1);

    if (!withinBoundaries1) {
        modalCont1.classList.add('hid_modal');
        document.body.classList.remove('bodyForModal');// скрываем элемент т к клик был за его пределами
    }
})
modalCont2.addEventListener('click', (e) => {
    const withinBoundaries2 = e.composedPath().includes(modalWindow2);

    if (!withinBoundaries2) {
        modalCont2.classList.add('hid_modal');
        document.body.classList.remove('bodyForModal');// скрываем элемент т к клик был за его пределами
    }
})

let signup = document.querySelector('#signup');

// Чекер пароля
const checkPasswd = (form) => {
    // создаем переменные для последующих проверок
    let password = form.value;
    let s_letter = 'qwertyuiopasdfghjklzxcvbnm';
    let b_letter = 'QWERTYUIOPASDFGHJKLZXCVBNM';
    let digits = '0123456789';
    let specials = ':;!@#$%^&*()_-+=\|/.,[]{}';
    // флаги проверки наличия
    let is_s = false;
    let is_b = false;
    let is_d = false;
    let is_sp = false;

    let rating = 0;
    let text = '';
    let len = password.length;

    // провереяем наличие символов
    for (let i = 0; i < len; i++) {
        if (!is_s && s_letter.indexOf(password[i]) != -1) { is_s = true }
        else if (!is_b && b_letter.indexOf(password[i]) != -1) { is_b = true }
        else if (!is_d && digits.indexOf(password[i]) != -1) { is_d = true }
        else if (!is_sp && specials.indexOf(password[i]) != -1) { is_sp = true }
    }

    // Набиваем рейтинг
    if (is_s) rating++;
    if (is_b) rating++;
    if (is_d) rating++;
    if (is_sp) rating++;

    if (len < 8) text = 'Insecure';
    else if (len >= 8 && rating === 1 && is_d) text = 'Normal';
    else if (len >= 8 && rating === 1) text = 'Insecure';
    else if (len >= 8 && rating === 2 && is_d) text = 'Good';
    else if (len >= 8 && rating === 2 && !is_sp) text = 'Normal';
    else if (len >= 8 && rating === 3 && !is_sp) text = 'Good';
    else if (len >= 8 && rating === 2 && is_sp) text = 'Good';
    else if (len >= 8 && rating === 3 && is_sp) text = 'Perfect';
    else if (len >= 8 && rating === 4) text = 'Perfect';

    return text;
}

// проверка пароля на надежность
let signupPassword = document.querySelector('#signup_password');
let signupRepeatPassword = document.querySelector('#signup_repeat_password');
let currentClassOfPassword = '';
let passIsTrue = false;
let passIdentical = false;
let emailFree = false;


signupPassword.addEventListener('input', function () {

    let passSecurity = checkPasswd(signupPassword);

    if (this.value.length < 8) {
        document.querySelector('.text-password').innerHTML = passSecurity + ' (at least eight characters)';
        signupPassword.classList.remove('incorrect', 'normal', 'good', 'perfect');
        signupPassword.classList.add('incorrect');
        passIsTrue = false;
    }
    else if (passSecurity === 'Insecure') {
        document.querySelector('.text-password').innerHTML = passSecurity + ' (at least two types of characters)';
        signupPassword.classList.remove('incorrect', 'normal', 'good', 'perfect');
        signupPassword.classList.add('incorrect');
        passIsTrue = false;

    }
    else if (passSecurity === 'Normal') {
        document.querySelector('.text-password').innerHTML = passSecurity;
        signupPassword.classList.remove('incorrect', 'normal', 'good', 'perfect');
        signupPassword.classList.add('normal');
        currentClassOfPassword = 'normal';
        passIsTrue = true;
    }
    else if (passSecurity === 'Good') {
        document.querySelector('.text-password').innerHTML = passSecurity;
        signupPassword.classList.remove('incorrect', 'normal', 'good', 'perfect');
        signupPassword.classList.add('good');
        currentClassOfPassword = 'good';
        passIsTrue = true;
    }
    else if (passSecurity === 'Perfect') {
        document.querySelector('.text-password').innerHTML = passSecurity;
        signupPassword.classList.remove('incorrect', 'normal', 'good', 'perfect');
        signupPassword.classList.add('perfect');
        currentClassOfPassword = 'perfect';
        passIsTrue = true;
    }
})

// проверка соответствия паролей
signupRepeatPassword.addEventListener('input', function () {
    let pass1 = signupPassword.value;
    let pass2 = signupRepeatPassword.value;
    if (pass1 === pass2) {
        signupRepeatPassword.classList.add(currentClassOfPassword);
        passIdentical = true;
    } else {
        signupRepeatPassword.classList.remove(currentClassOfPassword);
        passIdentical = false;
    }
})

// Шифр и дешифр

let chars = "QWERTYUIOPASDFGHJKLZXCVBNMqwertyuiopasdfghjklzxcvbnm1234567890:;!@#$%^&*()`~_-+=\|/.,[]{}ЙЦУКЕНГШЩЗХЪФЫВАПРОЛДЖЭЯЧСМИТЬБЮЁйцукенгшщзхъфывапролджэячсмитьбюё";

const caesar = (pass, key) => {
    let res = '';
    for (let i = 0; i < pass.length; i++) {
        res += chars[(chars.indexOf(pass[i]) + key) % chars.length];
    }
    return res;
};

const decaesar = (pass, key) => {
    let res = '';
    for (let i = 0; i < pass.length; i++) {
        res += chars[((chars.indexOf(pass[i]) - key) + chars.length) % chars.length];
    }
    return res
};



signup.addEventListener('click', function (event) {
    event.preventDefault();
    // элементы
    let signupName = document.querySelector('#signup_name');
    let signupSurname = document.querySelector('#signup_surname');
    let signupEmail = document.querySelector('#signup_email');
    let signupPassword = document.querySelector('#signup_password');
    let signup_checkbox = document.querySelector('#signup_checkbox');

    // ВАЛИДАЦИЯ
    let count = 0;

    // проверка имени
    if (signupName.value.match(/^[A-Za-z'-]+$/gi)) {
        signupName.classList.remove('incorrect');
        count++

    } else {
        signupName.classList.add('incorrect');
    }
    // проверка фамилии
    if (signupSurname.value.match(/^[A-Za-z'-]+$/gi)) {
        signupSurname.classList.remove('incorrect');
        count++

    } else {
        signupSurname.classList.add('incorrect');
    }

    // проверка емейла на корректность
    if (signupEmail.value.match(/^[A-Za-z1-90!#$%&;+-.=?^^_`{}½~]{1,50}[A-Za-z0-9]*@-*?[A-Za-z0-9]+\.[a-z]{1,5}/gi)) {
        signupEmail.classList.remove('incorrect');
        count++
    } else {
        signupEmail.classList.add('incorrect');
    }

    // проверка пароля на надежность (по результатам внешней)
    if (passIsTrue) {
        signupPassword.classList.remove('incorrect');
    } else {
        signupPassword.classList.add('incorrect');
    }

    if (signup_checkbox.checked) {
        count++;
    }

    if (count === 4 && passIsTrue && passIdentical) {
        document.querySelector('.modal_signup_text').textContent = '';

        // ЗАПОЛНЕНИЕ НОВОГО ЮЗЕРА
        // Уже внутри дб происходит

        getDB(`http://localhost:3000/users`).then((data) => {
            let newUserData = {
                id: 0,
                name: 0,
                surname: 0,
                password: 0,
                email: 0,
                userData: {
                    avatar: '',
                    comments: [],
                    favotites: []
                }
            }
            let encodedPass = caesar(signupPassword.value, data.length);

            newUserData.id = data.length;
            newUserData.name = signupName.value;
            newUserData.surname = signupSurname.value;
            newUserData.password = encodedPass;
            newUserData.email = signupEmail.value;

            for (let i = 0; i < data.length; i++) {
                if (newUserData.email === data[i].email) {
                    emailFree = false;
                    break;
                } else {
                    emailFree = true;
                }
            }
            if (emailFree === false) {
                document.querySelector('.modal_signup_text').textContent = 'This email already has an account.'
                console.log('Rejected');
            } else {
                // ОТПРАВКА ДАННЫХ НА СЕРВЕР

                sendData('http://localhost:3000/users', newUserData).then(() => {
                    console.log('submitted');
                    let inputs = document.querySelectorAll('.modal_reg_input');
                    for (let i = 0; i < inputs.length; i++) {
                        inputs[i].value = '';
                    };
                    modalCont2.classList.add('hid_modal');
                    modalCont1.classList.remove('hid_modal');
                    alert('successfully');

                })
                    .catch((err) => {
                        console.log(err);
                    })
            }
        });

    } else {
        document.querySelector('.modal_signup_text').textContent = 'Not all fields are filled in correctly.'
        console.log('Rejected');
    }
});

let singin = document.querySelector('#signin');

// АВТОРИЗАЦИЯ

singin.addEventListener('click', function (event) {
    event.preventDefault();
    let signinText = document.querySelector('.signin_text');
    let signinEmail = document.querySelector('#signin_email');
    let signinPassword = document.querySelector('#signin_password');

    // проверка поля email
    if (signinEmail.value === '') {
        signinEmail.classList.add('incorrect');
        signinText.textContent = 'Not all fields are filled in correctly.';
    } else {
        signinEmail.classList.remove('incorrect');
        signinText.textContent = '';
    }
    // проверка поля password
    if (signinPassword.value === '') {
        signinPassword.classList.add('incorrect');
        signinText.textContent = 'Not all fields are filled in correctly.';
    } else {
        signinPassword.classList.remove('incorrect');
        signinText.textContent = '';
    }

    getDB(`http://localhost:3000/users`).then((data) => {

        let exist = false;
        for (let i = 0; i < data.length; i++) {
            if (data[i].email === signinEmail.value) {

                let decodedPass = decaesar(data[i].password, +data[i].id);
                exist = true;

                if (decodedPass === signinPassword.value) {
                    signinText.textContent = "Authorization...";
                    // подключение к аккаунту
                    setTimeout(function () {
                        modalCont1.classList.add('hid_modal');
                        document.body.classList.remove('bodyForModal');
                        signinText.innerHTML = "";
                    }, 3000);

                    let inputs = document.querySelectorAll('.modal_reg_input');
                    for (let i = 0; i < inputs.length; i++) {
                        inputs[i].value = '';
                    };
                    console.log('Signed in.');
                    openModal.classList.add('hid');
                    btnAccount.classList.remove('hid');
                    btnAccount.addEventListener('click', function () {
                        console.log(data[i]);
                    })
                } else {
                    signinText.textContent = 'Not all fields are filled in correctly.';
                }
            }
        }
        if (!exist) {
            signinText.textContent = 'This account does not exist';
        }
    })
});




