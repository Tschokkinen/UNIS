const table = document.getElementById('comment_table');

const getCommentData = async () => {
    const response = await fetch('/charts/data/getCommentsData');
    const responseData = await response.json();
    const data = Object.keys(responseData[0]);

    // console.log("responseData: ", responseData);
    generateTable(table, responseData);
    generateTableHead(table, data);
}

const generateTable = (table, data) => {
    for (let element of data) {
        let row = table.insertRow();
        for (key in element) {
            let cell = row.insertCell();
            let text = document.createTextNode(element[key]);
            cell.appendChild(text);
        }
    }
}

const generateTableHead = (table, data) => {
    let thead = table.createTHead();
    let row = thead.insertRow();

    for (let key of data) {
        console.log("Key: ", key);
        let th = document.createElement('th');
        let text = document.createTextNode(key.charAt(0).toUpperCase() + key.slice(1));
        th.appendChild(text);
        row.appendChild(th);
    }
}

getCommentData();