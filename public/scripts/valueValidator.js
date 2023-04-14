// Validates bloodpressure data.
const validatePressureData = (form) => {
    const bpAlertSaved = document.getElementById("snackbar_bpMeter");

    if (isNaN(form.systolicPressure.value)) { // Check if entered values are numbers.
        alert("Systolic value must be a number.");
        form.systolicPressure.focus();
        bpAlertSaved.className = "hidden";
        return false;
    } else if (isNaN(form.diastolicPressure.value)) { // Check if entered values are numbers.
        alert("Diastolic value must be a number.");
        form.diastolicPressure.focus();
        bpAlertSaved.className = "hidden";
        return false;
    } else if (form.systolicPressure.value > 180) { // Check if values are within a reasonable range.
        alert("Entered systolic pressure over 180.\nPlease check value or contact health services."); 7
        form.systolicPressure.focus();
        bpAlertSaved.className = "hidden";
        return false;
    } else if (form.systolicPressure.value < 1) { // Check if values are within a reasonable range.
        alert("Entered systolic pressure under 1.\nPlease check value or contact health services."); 7
        form.systolicPressure.focus();
        bpAlertSaved.className = "hidden";
        return false;
    } else if (form.diastolicPressure.value > 120) { // Check if values are within a reasonable range.
        alert("Entered diastolic pressure over 120.\nPlease check value or contact health services.");
        form.diastolicPressure.focus();
        bpAlertSaved.className = "hidden";
        return false;
    } else if (form.diastolicPressure.value < 1) { // Check if values are within a reasonable range.
        alert("Entered diastolic pressure under 1.\nPlease check value or contact health services.");
        form.diastolicPressure.focus();
        bpAlertSaved.className = "hidden";
        return false;
    }
    // closeForm();
    bpAlertSaved.className = "show";
    return true;
}

// Validates that a selection has been made on sleep meter.
const validateSleepData = (form) => {
    const sleepAlertSaved = document.getElementById("snackbar_sleepMeter");
    // console.log("form.sleepValue: ", form.sleepvalue.value);
    if (form.sleepvalue.value === '') {
        alert("Select sleep quality.");
        sleepAlertSaved.className = "hidden";
        return false;
    }
    // closeForm();
    sleepAlertSaved.className = "show";
    setTimeout(function () { sleepAlertSaved.className = sleepAlertSaved.className.replace("show", ""); }, 4000);
    return true;
}

const validateMoodData = (form) => {
    const moodAlertSaved = document.getElementById("snackbar_moodMeter");
    if (form.moodvalue.value === '') {
        alert("Select mood quality.");
        moodAlertSaved.className = "hidden";
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
        setTimeout(function () { profileEdited.className = profileEdited.className.replace("show", ""); }, 4000);
    } else {
        alert("Wrong password.");
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
