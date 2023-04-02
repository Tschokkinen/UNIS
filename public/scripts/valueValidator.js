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
    // closeForm();
    return true;
}

// Validates that a selection has been made on sleep meter.
const validateSleepData = (form) => {
    // console.log("form.sleepValue: ", form.sleepvalue.value);
    if (form.sleepvalue.value === '') {
        alert("Select sleep quality.");
        return false;
    }
    // closeForm();
    return true;
}

const validateMoodData = (form) => {
    if (form.moodvalue.value === '') {
        alert("Select mood quality.");
        return false;
    }
    return true;
}

const validatePassword = async () => {
    // console.log("clicked");
    let password = document.getElementById('field_Password_Changeuserinfo').value;

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
    } else {
        alert("Wrond password.");
    }
}