$(document).ready(function () {
    var id;
    const name = $("#name");
    const number = $("#number");
    const email = $("#email");
    const dob = $("#dob");
    const update = $("#update");
    const msg = $('#msg');
    update.html("Update");

    var temp = true;

    name.prop("disabled", true);
    number.prop("disabled", true);
    dob.prop("disabled", true);

    var userEmail = window.localStorage.getItem("email");

    update.click(function (e) {
        e.preventDefault();

        if (temp) {
            temp = false;
            msg.html("");
            update.html("Save");

            name.prop("disabled", false);
            number.prop("disabled", false);
            dob.prop("disabled", false);
        } else {
            $.ajax({
                url: "http://localhost:3000/php/profile.php",
                type: "POST",
                data: {
                    update: "update",
                    name: name.val(),
                    number: number.val(),
                    email: email.val(),
                    dob: dob.val(),
                    id: id
                },
                success: function (response) {
                    var parsedResponse = JSON.parse(response);

                    if (parsedResponse.status) {
                        msg.html("Updated Successfully");
                        temp = true;
                        update.html("Update");
                    } else {
                        msg.html("Something Went Wrong");
                    }
                },
                error: function () {
                    console.log("Error during update request");
                },
            });

            name.prop("disabled", true);
            number.prop("disabled", true);
            dob.prop("disabled", true);
        }
    });

    $("#logout").click(function (e) {
        e.preventDefault();
        window.localStorage.removeItem("email");
        window.location.replace("login.html");
    });

    $.ajax({
        url: "http://localhost:3000/php/profile.php",
        type: "POST",
        data: {
            profile: "profile",
            email: userEmail,
        },
        success: function (response) {
            var parsedProfile = JSON.parse(response);
            id = parsedProfile.id;
            name.val(parsedProfile.name);
            number.val(parsedProfile.number);
            email.val(parsedProfile.email);
            dob.val(parsedProfile.dob);
        },
        error: function () {
            console.log("Error during profile request");
        },
    });
});
