$(document).ready(function () {
    $('#submit').submit(function (e) {
        e.preventDefault();

        var name = $('#username').val();
        var email = $('#email').val();
        var number = $('#Phone_number').val();
        var date = $('#date').val();
        var password = $('#password').val();

        console.log("Received");

        $.ajax({
            url: "http://localhost:3000/php/register.php",
            type: "POST",
            data: {
                username: name,
                password: password,
                number: number,
                date: date,
                useremail: email
            },
            success: function (response) {
                var result = JSON.parse(response);
                console.log(result);

                if (result.status) {
                    $('#result').html("Registration successful");
                    console.log(result.status);
                    window.localStorage.setItem('email', email);
                    window.location.replace("profile.html");
                } else {
                    $('#result').html(result.msg);
                }
            },
            error: function () {
                console.log("Error");
            },
        });
    });
});
