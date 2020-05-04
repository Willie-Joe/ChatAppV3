// login with email and password
function login() {
    console.log("in login");
    const email = document.getElementById("email").value;
    console.log(name);
    const password = document.getElementById("password").value;
    console.log(password);
    const remember = document.getElementById("remember").checked;
    console.log(remember);
    console.log(name, password, remember);
    axios.post('/login', { email: email, password: password })
        .then(function (res) {
            console.log("login ", res.data)
            if (res.data.success) {

                //go to lobby
                window.location = "/lobby";
            }
            else {
                //alert -> go to home
            }
        })
        .catch(function (error) {
            console.log("err", error.response.data);
            alert(error.response.data.error);
        });


}

