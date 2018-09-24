$(document).ready(function () {
    var postText = $(".post");
    var postinput = $('#postinput');
    var messageText = $(".message");
    var posts = "";
    var messages;

    getPosts();
    //getMessages();

    // ++++++++++  POPULATE BULLETIN BOARD  ++++++++++
    // function for retrieving posts and getting them ready to be rendered to the page
    function getPosts(user) {
        userId = user || "";
        if (userId) {
            userId = "/?user_id=" + userId;
        }
        $.get("/api/posts", function (data) {
            console.log("Posts", data);
            posts = data;
            if (!posts || !posts.length) {
                displayEmpty(user);
            }
            else {
                initializePostRows();
            }
        });
    }

    // InitializeRows appends Post HTML t0 static page
    function initializePostRows() {
        postText.empty();
        var postsToAdd = [];
        for (var i = 0; i < posts.length; i++) {
            postsToAdd.push(createPostRow(posts[i]));
        }
        postText.append(postsToAdd);
    }
    // function for creating a new post row 
    function createPostRow(post) {
        console.log("post test", post);
        var newTr = $("<tr>");
        newTr.data("post", post);
        newTr.append("<td>" + post.text + "</td>");
        newTr.append("<td><a href='/bio?user_id=" + post.id + "'>Respond</a></td>");
        return newTr;
    }

    function displayEmpty() {
        var query = window.location.search;
        postText.empty();
        var notice = "No posts yet";
        postText.append(notice);
    }

    // ++++++++++ POPULATE MESSAGE INBOX  ++++++++++
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

    // // function for creating a new message row 
    // function createMessageRow(messageData) {
    //     var newTr = $("<tr>");
    //     newTr.data("message", messageData);
    //     newTr.append("<td>" + messageData.text + "</td>");
    //     newTr.append("<td><a href='/bio?user_id=" + messageData.id + "'>Respond</a></td>");
    //     return newTr;
    // }

    // // function for retrieving messages and getting them ready to be rendered to the page
    // function getMessages() {
    //     $.get("/api/messages", function (data) {
    //         var rowsToAdd = [];
    //         for (var i = 0; i < data.length; i++) {
    //             rowsToAdd.push(createMessageRow(data[i]));
    //         }
    //     });
    // }

    // // function for rendering the list of messages to the page
    // function renderMessageText(rows) {
    //     messageText.children().not(":last").remove();
    //     //console.log(rows);
    //     postText.prepend(rows);
    // }

    // ++++++++++  POST CREATION BUTTON  ++++++++++
    // on click event for post creation button
    $(document).on("click", "#postbutton", handlePostSubmit);

    function handlePostSubmit(event) {
        console.log('clicked');
        event.preventDefault();
        if (!postinput.val().trim()) {
            return;
        }
        // creates new post object
        var post = {
            text: postinput
                .val()
                .trim(),
        };
        newPost(post);
        console.log("postinput", postinput);
    }

    // function calls getPosts upon completion
    function newPost(post) {
        $.post("/api/posts", post)
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
        console.log(this);
        var currentPost = $(this)
            .parent()
            .parent()
            .data("post");
        deletePost(currentPost.id);
    }

});

