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
        bpAlertSaved.className = "hidden";
        bpAlertError1.className = "show";
        setTimeout(function () { bpAlertError1.className = bpAlertError1.className.replace("show", ""); }, 4000);
        return false;
    } else if (isNaN(form.diastolicPressure.value)) { // Check if entered values are numbers.
        form.diastolicPressure.focus();
        bpAlertSaved.className = "hidden";
        bpAlertError2.className = "show";
        setTimeout(function () { bpAlertError2.className = bpAlertError2.className.replace("show", ""); }, 4000);
        return false;
    } else if (form.systolicPressure.value > 180) { // Check if values are within a reasonable range.
        form.systolicPressure.focus();
        bpAlertSaved.className = "hidden";
        bpAlertError3.className = "show";
        setTimeout(function () { bpAlertError3.className = bpAlertError3.className.replace("show", ""); }, 4000);
        return false;
    } else if (form.systolicPressure.value < 80) { // Check if values are within a reasonable range.
        form.systolicPressure.focus();
        bpAlertSaved.className = "hidden";
        bpAlertError4.className = "show";
        setTimeout(function () { bpAlertError4.className = bpAlertError4.className.replace("show", ""); }, 4000);
        return false;
    } else if (form.diastolicPressure.value > 120) { // Check if values are within a reasonable range.
        form.diastolicPressure.focus();
        bpAlertSaved.className = "hidden";
        bpAlertError5.className = "show";
        setTimeout(function () { bpAlertError5.className = bpAlertError5.className.replace("show", ""); }, 4000);
        return false;
    } else if (form.diastolicPressure.value < 50) { // Check if values are within a reasonable range.
        form.diastolicPressure.focus();
        bpAlertSaved.className = "hidden";
        bpAlertError6.className = "show";
        setTimeout(function () { bpAlertError6.className = bpAlertError6.className.replace("show", ""); }, 4000);
        return false;
    }
    // closeForm();
    bpAlertSaved.className = "show";
    setTimeout(function () { bpAlertSaved.className = bpAlertSaved.className.replace("show", ""); }, 4000);
    return true;
}

// Validates that a selection has been made on sleep meter.
const validateSleepData = (form) => {
    let sleepAlertSaved = document.getElementById("snackbar_sleepMeter");
    let sleepAlertError = document.getElementById("snackbar_sleepMeterError");
    
    // console.log("form.sleepValue: ", form.sleepvalue.value);
    if (form.sleepvalue.value === '') {
        sleepAlertError.className = "show";
        sleepAlertSaved.className = "hidden";
        setTimeout(function () { sleepAlertError.className = sleepAlertError.className.replace("show", ""); }, 4000);
        return false;
    }
    // closeForm();
    sleepAlertSaved.className = "show";
    setTimeout(function () { sleepAlertSaved.className = sleepAlertSaved.className.replace("show", ""); }, 4000);
    return true;
}

const validateMoodData = (form) => {
    let moodAlertSaved = document.getElementById("snackbar_moodMeter");
    let moodAlertError = document.getElementById("snackbar_moodMeterError");
    
    if (form.moodvalue.value === '') {
        moodAlertError.className = "show";
        moodAlertSaved.className = "hidden";
        setTimeout(function () { moodAlertError.className = moodAlertError.className.replace("show", ""); }, 4000);
        return false;
    }
    moodAlertSaved.className = "show";
    setTimeout(function () { moodAlertSaved.className = moodAlertSaved.className.replace("show", ""); }, 4000);
    return true;
}

const validatePassword = async () => {
    console.log("clicked");
    let password = document.getElementById('field_Password_Changeuserinfo').value;
    let profileEdited = document.getElementById("snackbar_changeUserInfo");
    let profileEditError = document.getElementById("snackbar_changeUserInfoError");
    // console.log("Nice");
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
    if (data.match) {
        document.getElementById('changeUserInfo').submit();
        profileEdited.className = "show";
        profileEditError.className = "hidden";
        setTimeout(function () { profileEdited.className = profileEdited.className.replace("show", ""); }, 4000);
    } else {
        profileEditError.className = "show";
        setTimeout(function () { profileEditError.className = profileEditError.className.replace("show", ""); }, 4000);
    
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
        setTimeout(function () { emailAlertPro.className = emailAlertPro.className.replace("show", ""); }, 4000);
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
        setTimeout(function () { emailAlertSup.className = emailAlertSup.className.replace("show", ""); }, 4000);
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
