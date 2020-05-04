// login with email and password
function register() {
    console.log("in login");
    const email = document.getElementById("email").value;
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;
    console.log(password);
    // const remember = document.getElementById("remember").checked;
    // console.log(name, password, remember);
    axios.post('/register', {
        email: email,
        username: username,
        password: password
    })
        .then(function (res) {
            console.log("reg ", res.data)
            if (res.data.success) {

                //go to lobby
                window.location = "/login";
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