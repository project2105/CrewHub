$(document).ready(function () {
    // Getting references to our form and input
    var signUpForm = $("form.signup");
    var userNameInput = $("input#user-input");
    var passwordInput = $("input#password-input");
    var bioInput = $("input#bio-input")

    // When the signup button is clicked, we validate the email and password are not blank
    signUpForm.on("submit", function (event) {
        event.preventDefault();
        var userData = {
            userName: userNameInput.val().trim(),
            password: passwordInput.val().trim(),
            bioInput: bioInput.val()
        };

        if (!userData.userName || !userData.password || !userData.bioInput) {
            return;
        }
        // If we have an email and password, run the signUpUser function
        signUpUser(userData.userName, userData.password, userData.bioInput);
        userInput.val("");
        passwordInput.val("");
        bioInput.val("")
    });

    console.log(userData);

    // Does a post to the signup route. If succesful, we are redirected to the members page
    // Otherwise we log any errors
    function signUpUser(userName, password) {
        $.post("/api/signup", {
            userName: userName,
            password: password,

        }).then(function (data) {
            window.location.replace(data);
            // If there's an error, handle it by throwing up a boostrap alert
        }).catch(handleLoginErr);
    }

    function handleLoginErr(err) {
        $("#alert .msg").text(err.responseJSON);
        $("#alert").fadeIn(500);
    }
});