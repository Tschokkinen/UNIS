// Validates bloodpressure data.
const validatePressureData = (form) => {
    let bpAlertSaved = document.getElementById("snackbar_bpMeter");
    let bpAlertError1 = document.getElementById("snackbar_bpMeterError1");
    let bpAlertError2 = document.getElementById("snackbar_bpMeterError2");
    let bpAlertError3 = document.getElementById("snackbar_bpMeterError3");
    let bpAlertError4 = document.getElementById("snackbar_bpMeterError4");
    let bpAlertError5 = document.getElementById("snackbar_bpMeterError5");
    let bpAlertError6 = document.getElementById("snackbar_bpMeterError6");

    if (isNaN(form.systolicPressure.value)) { // Check if entered values are numbers.
        form.systolicPressure.focus();
        bpAlertError1.className = "show";
        setTimeout(function () { bpAlertError1.className = bpAlertError1.className.replace("show", ""); }, 4000);
        return false;
    } else if (isNaN(form.diastolicPressure.value)) { // Check if entered values are numbers.
        form.diastolicPressure.focus();
        bpAlertError2.className = "show";
        setTimeout(function () { bpAlertError2.className = bpAlertError2.className.replace("show", ""); }, 4000);
        return false;
    } else if (form.systolicPressure.value > 180) { // Check if values are within a reasonable range.
        form.systolicPressure.focus();
        bpAlertError3.className = "show";
        setTimeout(function () { bpAlertError3.className = bpAlertError3.className.replace("show", ""); }, 4000);
        return false;
    } else if (form.systolicPressure.value < 80) { // Check if values are within a reasonable range.
        form.systolicPressure.focus();
        bpAlertError4.className = "show";
        setTimeout(function () { bpAlertError4.className = bpAlertError4.className.replace("show", ""); }, 4000);
        return false;
    } else if (form.diastolicPressure.value > 120) { // Check if values are within a reasonable range.
        form.diastolicPressure.focus();
        bpAlertError5.className = "show";
        setTimeout(function () { bpAlertError5.className = bpAlertError5.className.replace("show", ""); }, 4000);
        return false;
    } else if (form.diastolicPressure.value < 50) { // Check if values are within a reasonable range.
        form.diastolicPressure.focus();
        bpAlertError6.className = "show";
        setTimeout(function () { bpAlertError6.className = bpAlertError6.className.replace("show", ""); }, 4000);
        return false;
    }
    // closeForm();
    bpAlertSaved.className = "show";
    return true;
}

// Validates that a selection has been made on sleep meter.
const validateSleepData = (form) => {
    let sleepAlertSaved = document.getElementById("snackbar_sleepMeter");
    let sleepAlertError = document.getElementById("snackbar_sleepMeterError");
    
    // console.log("form.sleepValue: ", form.sleepvalue.value);
    if (form.sleepvalue.value === '') {
        sleepAlertError.className = "show";
        setTimeout(function () { sleepAlertError.className = sleepAlertError.className.replace("show", ""); }, 4000);
        return false;
    }
    // closeForm();
    sleepAlertSaved.className = "show";
    return true;
}

const validateMoodData = (form) => {
    let moodAlertSaved = document.getElementById("snackbar_moodMeter");
    let moodAlertError = document.getElementById("snackbar_moodMeterError");
    
    if (form.moodvalue.value === '') {
        moodAlertError.className = "show";
        setTimeout(function () { moodAlertError.className = moodAlertError.className.replace("show", ""); }, 4000);
        return false;
    }
    moodAlertSaved.className = "show";
    setTimeout(function () { moodAlertSaved.className = moodAlertSaved.className.replace("show", ""); }, 4000);
    return true;
}

const validatePassword = async () => {
    // console.log("clicked");
    let password = document.getElementById('field_Password_Changeuserinfo').value;
    let profileEdited = document.getElementById("snackbar_changeUserInfo");
    let passwordError = document.getElementById("snackbar_changeUserInfoError");
    let heightError = document.getElementById("snackbar_heightError");
    let weightError = document.getElementById("snackbar_weightError");
    let ageError = document.getElementById("snackbar_ageError");

    const response = await fetch('/main/validatePassword', {
        method: "POST",
        body: JSON.stringify({
            password: password
        }),
        headers: {
            'Content-type': 'application/json; charset=UTF-8'
        }
    })

    let data = await response.json(response);
    // console.log("Response: ", data.match);
    let age = document.getElementById("field_Age").value;
    let height = document.getElementById("field_Height").value;
    let weight = document.getElementById("field_Weight").value;

    if (data.match && height >= 110  && height <= 245 && weight >= 30 && weight <= 250 && age <= 65 && age >= 18)  {
        document.getElementById('changeUserInfo').submit();
        profileEdited.className = "show";
   } else if (!data.match) {
        passwordError.className = "show";
        setTimeout(function () { passwordError.className = passwordError.className.replace("show", ""); }, 4000);
    } else if (height < 110 || height > 245) {
        heightError.className = "show";
        setTimeout(function () { heightError.className = heightError.className.replace("show", ""); }, 4000);
    } else if (weight < 30 || weight > 250) {
        weightError.className = "show";
        setTimeout(function () { weightError.className = weightError.className.replace("show", ""); }, 4000);
    } else if (age < 18 || age > 65) {
        ageError.className = "show";
        setTimeout(function () { ageError.className = ageError.className.replace("show", ""); }, 4000);
    }
}

/*Show alert/snackbar at Message To Professional view*/

function emailSentPro() {
    const emailAlertPro = document.getElementById("snackbar_emailToPro");
    const inputFieldTopic = document.getElementById("messageToProHeader");
    const inputFieldContent = document.getElementById("messageToProContent");

    /*Show the snackbar ONLY if both required input fields are filled*/
    if (inputFieldTopic.value === "" || inputFieldContent.value === "") {
        emailAlertPro.className = "hidden";
    }
    else {
        emailAlertPro.className = "show";
    }
}

/*Show alert/snackbar at Message To Support view*/
function emailSentSup() {
    const emailAlertSup = document.getElementById("snackbar_emailToSup");
    const inputFieldTopic = document.getElementById("messageSupportHeader");
    const inputFieldContent = document.getElementById("messageSupportContent");

    if (inputFieldTopic.value === "" || inputFieldContent.value === "") {
        emailAlertSup.className = "hidden";
    }
    else {
        emailAlertSup.className = "show";
    }
}

function loagingAnimation() {
    const inputFieldEmail = document.getElementById("email");
    const inputFieldPW = document.getElementById("password");
    const loadingAnim = document.getElementById("loadingAnim");
    const passwordError = document.getElementById("snackbar_signInError");

    /*Show the snackbar ONLY if both required input fields are filled*/
    if (inputFieldEmail.value === "" || inputFieldPW.value === "") {
        loadingAnim.style.display = "none";

    }
    else {
        loadingAnim.className = "show";
     }
}
