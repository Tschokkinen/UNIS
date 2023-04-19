const requestUserData = async () => {
    const response = await fetch('/main/requestUserData');
    let userData = await response.json(response);
    console.log("Response in requestUserData: ", userData);

    setDefaultValue(userData);
}

requestUserData();

const setDefaultValue = (userData) => {
    // const height = userData.height != undefined || null ? userData.height : ""; 

    // At change user info and main view: "";
    document.getElementById('field_FirstName').defaultValue = userData.firstName != undefined || null ? userData.firstName : "";
    document.getElementById('field_LastName').defaultValue = userData.lastName != undefined || null ? userData.lastName : "";
    document.getElementById('field_Height').defaultValue = userData.height != undefined || null ? userData.height : "";
    document.getElementById('field_Weight').defaultValue = userData.weight != undefined || null ? userData.weight : "";
    document.getElementById('field_Email').defaultValue = userData.email != undefined || null ? userData.email : "";
    // document.getElementById('field_Age').defaultValue = userData.age != undefined || null ? userData.age : "";
    document.getElementById('field_Age').value = userData.age != undefined || null ? userData.age : "";
    document.getElementById('field_Phonenumber').defaultValue = userData.phonenumber != undefined || null ? userData.phonenumber : "";
    
    // At elements on send message to support/professional : "";
    document.getElementById('field_FirstName_msgSupport').defaultValue = userData.firstName != undefined || null ? userData.firstName : "";
    document.getElementById('field_LastName_msgSupport').defaultValue = userData.lastName != undefined || null ? userData.lastName : "";
    document.getElementById('field_Email_msgSupport').defaultValue = userData.email != undefined || null ? userData.email : "";
    
    document.getElementById('field_FirstName_msgPro').defaultValue = userData.firstName != undefined || null ? userData.firstName : "";
    document.getElementById('field_LastName_msgPro').defaultValue = userData.lastName != undefined || null ? userData.lastName : "";
    document.getElementById('field_Email_msgPro').defaultValue = userData.email != undefined || null ? userData.email : "";
    
}