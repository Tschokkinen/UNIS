const getUsers = async () => {
    const response = await fetch('/mainPro/getPatients');
    const data = await response.json();

    console.log("responseData: ", data);
    console.log(data[0].firstName);

    const listElement = document.getElementById('patientList');

    for (let i = 0; i < data.length; i++) {
        let listItem = document.createElement('li');
        let a = document.createElement('a');

        let currentName = `${data[i].firstName} ${data[i].lastName}`;

        a.setAttribute('href', `/charts/${data[i].id}`);
        a.innerHTML = currentName;
        listItem.appendChild(a);

        listElement.appendChild(listItem);
    }
}


getUsers();