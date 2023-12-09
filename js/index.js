$(document).ready(function () {
    var email = window.localStorage.getItem("email");

    if (!email) {
        window.location.replace("login.html");
    } else {
        window.location.replace("profile.html");
    }
});
