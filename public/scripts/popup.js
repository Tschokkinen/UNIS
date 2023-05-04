const openFormWithParams = (formName) => {
    if (formName === "editProfileForm") {
        document.getElementById(formName).style.display = "block";
    }

}

const closeFormWithParams = (formName) => {
    if (formName === "editProfileForm") {
        document.getElementById(formName).style.display = "none";
    }

}

openFormWithParams();
closeFormWithParams();