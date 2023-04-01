// Validates bloodpressure data.
const validatePressureData = (form) => {
    if (isNaN(form.systolicPressure.value)) { // Check if entered values are numbers.
        alert("Systolic value must be a number.");
        form.systolicPressure.focus();
        return false;
    } else if (isNaN(form.diastolicPressure.value)) { // Check if entered values are numbers.
        alert("Diastolic value must be a number.");
        form.diastolicPressure.focus();
        return false;
    } else if (form.systolicPressure.value > 180) { // Check if values are within a reasonable range.
        alert("Entered systolic pressure over 180.\nPlease check value or contact health services."); 7
        form.systolicPressure.focus();
        return false;
    } else if (form.diastolicPressure.value > 120) { // Check if values are within a reasonable range.
        alert("Entered diastolic pressure over 120.\nPlease check value or contact health services.");
        form.diastolicPressure.focus();
        return false;
    }
    return true;
}

// const validateUserInfoChange = (form) => {
//     const password = form.password.value;
//     // console.log(password);
    
//     const response = fetch('/main/checkPassword', {
//         method: "POST",
//         body: JSON.stringify({
//             password: password
//         }),
//         headers: {
//             'Content-type': 'application/json; charset=UTF-8'
//         }
//     });

//     if (!response.match) {
//         alert("Wrong password");
//         form.password.focus();
//         return false;
//     } 

//     return true;
// }