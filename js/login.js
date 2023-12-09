$(document).ready(function () {
    $("form").submit(function (e) {
        e.preventDefault();
        
        var email = $("#useremail").val();
        var password = $("#password").val();

        $.ajax({
            url: "../php/login.php",
            type: "POST",
            data: {
                username: email,
                password: password,
            },
            success: function (response) {
                var result = JSON.parse(response);

                if (result.status) {
                    window.localStorage.setItem("email", email);
                    $("#notification").html("Login Successful");
                    window.location.replace("profile.html");
                } else {
                    console.log(parsedResponse);
                    $("#notification").html("Invalid Login Information");
                }
            },
            error: function () {
                console.log("Error during login request");
            },
        });
    });
});
