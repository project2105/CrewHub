$(document).ready(function () {
    var postText = $(".post");
    var messageText = $(".message");
    var posts;
    var messages;

    getPosts();
    getMessages();

    // ++++++++++  POPULATE BULLETIN BOARD  ++++++++++
    // function for creating a new post row 
    function createPostRow(postData) {
        var newTr = $("<tr>");
        newTr.data("post", postData);
        newTr.append("<td>" + postData.text + "</td>");
        newTr.append("<td><a style='cursor:pointer;color:red' class='delete-post'>Delete Post</a></td>");
        return newTr;
    }

    // function for retrieving posts and getting them ready to be rendered to the page
    function getPosts() {
        $.get("/api/posts", function (data) {
            var rowsToAdd = [];
            for (var i = 0; i < data.length; i++) {
                rowsToAdd.push(createPostRow(data[i]));
            }
            renderPostText(rowsToAdd);
            postinput.val("");
        });
    }

    // function for rendering the list of posts to the page
    function renderPostText(rows) {
        postText.children().not(":last").remove();
        console.log(rows);
        postText.prepend(rows);
    }

    // ++++++++++ POPULATE INBOX  ++++++++++
    // get messages for a specific recipient - looks for a query param for a user_id
    var url = window.location.search;
    var recipientId;
    if (url.indexOf("?recipient_id=") !== -1) {
        recipientId = url.split("=")[1];
        getMessages(recipientId);
    }
    // If there's no userId - no message
    else {
        messageText.append("No Messages");
    }

    // function for retrieving posts and getting them ready to be rendered to the page
    function getMessages() {
        $.get("/api/messages", function (data) {
            var rowsToAdd = [];
            for (var i = 0; i < data.length; i++) {
                rowsToAdd.push(createMessageRow(data[i]));
            }
            renderMessageText(rowsToAdd);
            messageinput.val("");
        });
    }

    // ++++++++++  POST CREATION BUTTON  ++++++++++
    // on click event for post creation button
    $(document).on("submit", "#postinput", handlePostSubmit);

    function handlePostSubmit(event) {
        event.preventDefault();
        if (!postinput.val().trim().trim()) {
            return;
        }
        // creates new post object
        newPost({
            text: postinput
                .val()
                .trim(),
        });
        console.log(postinput);
    }

    // function calls getPosts upon completion
    function newPost(postData) {
        $.post("/api/posts", postData)
            .then(getPosts);
    }

    // ++++++++++  BULLETIN BOARD POST DELETE BUTTONS  ++++++++++
    // on click event for delete button
    $(document).on("click", "button.delete", handlePostDelete);

    // function for AJAX to delete posts
    function deletePost(id) {
        $.ajax({
            method: "DELETE",
            url: "/api/posts/" + id
        })
            .then(function () {
                getPosts();
            });
    }

    // deletes post
    function handlePostDelete() {
        var currentPost = $(this)
            .parent()
            .parent()
            .data("post");
        deletePost(currentPost.id);
    }

});