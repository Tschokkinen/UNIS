const { v4: uuid4 } = require('uuid');
const { spawn } = require('child_process');

const kubios = async (req, res) => {
    // Use your Kubios HRV App username and password and own client_id
    const USERNAME = process.env.KUBIOS_USERNAME;
    const PASSWORD = process.env.KUBIOS_PASSWORD;
    const CLIENT_ID = process.env.KUBIOS_CLIENT_ID;
    const LOGIN_URL = "https://kubioscloud.auth.eu-west-1.amazoncognito.com/login";
    const TOKEN_URL = "https://kubioscloud.auth.eu-west-1.amazoncognito.com/oauth2/token";
    const REDIRECT_URI = "https://analysis.kubioscloud.com/v1/portal/login";
    const USER_AGENT = "UNIS HRV";
    const csrf = uuid4(); // Generate unique random ID
    console.log("KUBIOS!!");

    // JavaScript version: Not working. Results in response 400. :(
    // login_data = {
    //     "client_id": CLIENT_ID,
    //     "redirect_uri": REDIRECT_URI,
    //     "username": USERNAME,
    //     "password": PASSWORD,
    //     "response_type": "code",
    //     "access_type": "offline",
    //     "_csrf": csrf,
    // }

    // // console.log("login_data: ", login_data);
    // console.log(`Authenticating to ${LOGIN_URL} with client_id: ${CLIENT_ID}`);
    // const login_response = await fetch(LOGIN_URL,
    //     {
    //         method: "POST",
    //         body: login_data,
    //         allow_redirects: false,
    //         headers: {
    //             'Content-Type':'application/x-www-form-urlencoded',
    //             "Cookie": `XSRF-TOKEN=${csrf}`, "User-Agent": USER_AGENT,
    //         }
    //     });
    // // const testRes = await login_response.json();
    // console.log("login_response: ", login_response.status);
    // location_url = login_response.headers["Location"];
    // console.log("location_url: ", location_url);



    
    

    // spawn new child process to call the python script
    const python = spawn('python3', 
    [
        './python/kubios_connection.py', 
        USERNAME, 
        PASSWORD, 
        CLIENT_ID, 
        LOGIN_URL, 
        TOKEN_URL, 
        REDIRECT_URI,
        USER_AGENT,
        csrf
    ]);

    python.stderr.pipe(process.stdout) // Receive python error stream.

    let dataToSend; // Data received from python

    // Call python script
    python.stdout.on('data', function (data) {
        dataToSend = data.toString(); // Data returned from python.

        const dataToJSON = JSON.parse(dataToSend); // Convert data to JSON format.

        // console.log("dataToJSON: ", dataToJSON.results); // Logs all results.
        for ( var i = 0; i < dataToJSON.results.length; i++) {
            var obj = dataToJSON.results[i];
            console.log(obj.result.mean_rr_ms);
        }
    });
    
    // Close stream from python script. Code 0 success, 1 error.
    python.on('close', (code) => {
        console.log(`child process close all stdio with code ${code}`);
    });
}

module.exports = kubios;