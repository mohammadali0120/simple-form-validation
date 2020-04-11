const usernameInput = document.getElementById("username");
const passwordInput = document.getElementById("password");
const phonenumberInput = document.getElementById("phonenumber");
const emailInput = document.getElementById("email");

// validations

// must be contain letters a-z in lowercase or also contain digit 0-9 of username or you can also useing _

function isValidUsername(username) {
    // return /^[a-zA-Z]{5,16}$/.test(username); //only lowercase letter and capitalize letter​ from 5 to 16 character is valid
    return /^(?!.*\.\.)(?!.*\.$)[^\W][\w.]{5,16}$/.test(username); //this pattern is for username validation Instagram, and recommended
}

//must contain a lowercase ,uppercase letter and a number
function isValidPassword(password) {
    // return /[a-z]/.test(password) && /[A-Z]/.test(password) && /[0-9]/.test(password);
    return /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).*$/.test(password);
}
//the phone number must be in the format of +9809309990000
function isValidPhoneNumber(phonenumber) {
    // return /^(\+98|0)?0?9\d{9}$/.test(phonenumber);
    // OR The following pattern is suggested
    return /^(\+?98|0)?0?9\d{2}\d{3}\d{4}$/.test(phonenumber);
}
// must be a valid email address
function isValidEmail(email) {
    return /^[^@#!$%^&*()_+="'`*\s]+@[^@#!$%^&*()_+="'`*\d\s]+\.[a-z]+$/.test(
        email
    );
    // up there this line we via put special characters like #$@% and etc in the pattern, we limited them for ourselves to using them in input field
}

// formating functions
function formatPhoneNumber(text) {
    const regex = /^(\+?98|0)?(0?9\d{2})(\d{3})(\d{4})$/;
    return text.replace(regex, "($1) $2-$3-$4"); //this line is code for formatting code link (+98)0911-000-1231
    // Tip: if you want to change code after formatting, your faced with this error below input field -> the phone number must be in the format of +9809309990000
}

// set up events
function showOrHideTip(show, element) {
    if (show) {
        element.style.display = "inherit";
    } else {
        element.style.display = "none";
    }
}

function createListener(validator) {
    return (e) => {
        const text = e.target.value;
        const valid = validator(text);
        const showTip = text !== "" && !valid;
        const toolTip = e.target.nextElementSibling;
        showOrHideTip(showTip, toolTip);
    };
}


usernameInput.addEventListener("input", createListener(isValidUsername));
passwordInput.addEventListener("input", createListener(isValidPassword));
phonenumberInput.addEventListener("input", createListener(isValidPhoneNumber));
phonenumberInput.addEventListener("blur", (e) => {
    e.target.value = formatPhoneNumber(e.target.value);
});
emailInput.addEventListener("input", createListener(isValidEmail));
