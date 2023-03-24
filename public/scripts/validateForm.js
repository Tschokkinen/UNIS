const validateForm = () => {
    // let email = document.getElementById('email')
    // let password = document.getElementById('password');

    let form = document.getElementById("formID");
    let inputs = form.getElementsByTagName("INPUT");

    // document.getElementById("signin-form").addEventListener("submit", function(e) {
    //     if (!email.value || !password.value) {
    //         e.preventDefault();
    //         alert("All fields must be filled.");
    //         return false;
    //     }
    // });

    form.addEventListener("submit", function (e) {
        for (let i = 0; i < inputs.length; i++) {
            if (!inputs[i].value) {
                e.preventDefault();
                alert("All fields must be filled.");
                return false;
            }
        }
    });

}

validateForm();