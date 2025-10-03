document.querySelector('#zip').addEventListener("change", displayCityLatLong);
document.querySelector('#password').addEventListener("click", displayPassword);
document.querySelector('#username').addEventListener("input", displayAvalability); //typing
document.querySelector('#state').addEventListener("change", displayCounty);
document.querySelector('#submitBtn').addEventListener("click", check);

displayState();

async function displayCityLatLong() {
    let zipCode = document.querySelector('#zip').value; 
    let url = "https://csumb.space/api/cityInfoAPI.php?zip=" + zipCode;

    // 틀리면 옆에 messege

    try {
        let response = await fetch(url);
        try {
            let data = await response.json();
            console.log(data);
            if (data === false){
                document.querySelector('#wrongZip').textContent = "Zip code not found";
                document.querySelector('#wrongZip').style.display = "inline";
                document.querySelector('#city').style.display = "none";
                document.querySelector('#latitude').style.display = "none";
                document.querySelector('#longitude').style.display = "none";
            }else{
                document.querySelector('#city').textContent = data.city;
                document.querySelector('#latitude').textContent = data.latitude;
                document.querySelector('#longitude').textContent = data.longitude;
                document.querySelector('#city').style.display = "inline";
                document.querySelector('#latitude').style.display = "inline";
                document.querySelector('#longitude').style.display = "inline";
                document.querySelector('#wrongZip').style.display = "none";
            }
            
            // console.log(data);
        } catch (parseError) {
            console.log(parseError);
        }
    } catch (error) {
        console.log(error);
    }
}

// let stateUrl ="https://csumb.space/api/allStatesAPI.php";
let usps ="";

async function displayState() {
    let url = "https://csumb.space/api/allStatesAPI.php";
    
    try {
        let response = await fetch(url);
        try {
            let data = await response.json();

            for (let i of data) {
                let optionElement = document.createElement("option");
                optionElement.textContent = i.state;
                optionElement.value = i.usps;

                document.querySelector('#state').append(optionElement);
            }
            console.log(data);
        } catch (parseError) {
            console.log(parseError);
        }
    } catch (error) {
        console.log(error);
    }
}

async function displayCounty(){
    let stateSelect = document.querySelector("#state").value;
    console.log(stateSelect);

    let url = `https://csumb.space/api/countyListAPI.php?state=${stateSelect}`;
    
    try {
        let response = await fetch(url);
        try {
            let data = await response.json();

            for (let i of data) {
                let optionElement = document.createElement("option");
                optionElement.textContent = i.county;

                document.querySelector('#county').append(optionElement);
            }
            console.log(data);
        } catch (parseError) {
            console.log(parseError);
        }
    } catch (error) {
        console.log(error);
    }
}



async function displayPassword() {
    let url = "https://csumb.space/api/suggestedPassword.php?length=8";
    let suggestPassword = document.querySelector('#password').value;
    try {
        let response = await fetch(url);
        try {
            let data = await response.json();
            document.querySelector('#suggest').textContent = data.password;
            console.log(data);
        } catch (parseError) {
            console.log(parseError);
        }
    } catch (error) {
        console.log(error);
    }
}

async function displayAvalability() {
    let userName = document.querySelector('#username').value; 
    let url = "https://csumb.space/api/usernamesAPI.php?username=" + userName;

    try {
        let response = await fetch(url);
        try {
            let data = await response.json();
            let nameFeedback = document.querySelector("#nameFeedback");

            if (data.available) {
                nameFeedback.textContent = "Username is available";
                nameFeedback.style.color = "green";
            }else {
                nameFeedback.textContent = "Username is not available";
                nameFeedback.style.color = "red";
            }

            console.log(data);
        } catch (parseError) {
            console.log(parseError);
        }
    } catch (error) {
        console.log(error);
    }
}

function check(){
    let userName = document.querySelector("#username").value; //value = what i typed
    let password = document.querySelector("#password").value;
    let passwordCheck = document.querySelector("#passwordCheck").value;

    let messege = "";
    if(userName.length < 3){
        messege += "Type Username must be at least 3 characters. \n" 
    }

    if(password.length < 6){
        messege += "Type password must be at least 6 characters. \n"
    }

    if(!(password == passwordCheck)){
        messege += "Retype Password."
    }

    document.querySelector("#validation").textContent = messege;
}