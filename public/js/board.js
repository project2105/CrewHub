$(document).ready(function () {
    var postText = $(".post");
    var messageText = $(".message");
    var respond = $("#respond");
    var posts;
    var messages;

    // grab posts and updates the view
    function getPosts(user) {
        userId = user || "";
        if (userId) {
            userId = "/?user_id=" + userId;
        }
        $.get("/api/posts" + userId, function (data) {
            console.log("Posts", data);
            posts = data;
            if (!posts || !posts.length) {
                displayEmpty(user);
            }
            else {
                initializePost();
            }
        });
    }

    // on click event for and delete buttons
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

    $(document).on("click", "button.respond", handleMessagePost);

    // function for AJAX to delete posts
    function messagePost(id) {
        $.ajax({
            method: "POST",
            url: "/api/message/" + id
        })
            .then(function () {
                //
            });
    }

    // appends post HTML to bulletin board
    function initializePost() {
        postText.empty();
        var postsToAdd = [];
        for (var i = 0; i < posts.length; i++) {
            postsToAdd.push(createNewRow(posts[i]));
        }
        postText.append(postsToAdd);
    }

    // get messages for a specific recipient - looks for a query param in the url for user_id
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

    // appends message HTML to inbox
    function initializeMessage() {
        messageText.empty();
        var messagesToAdd = [];
        for (var i = 0; i < messages.length; i++) {
            messagesToAdd.push(createNewRow(messages[i]));
        }
        messageText.append(messagesToAdd);
    }

    // build post HTML
    function createNewRow(post) {
        var newPostBody = $("<div>");
        var newPostUser = $("<h2><a>" + post.User.name + "</a></h2>");
        var newPostText = $("<h2>" + post.User.text + "</h2>");
        var newPostDate = $("<small>");
        var formattedDate = new Date(post.createdAt);
        formattedDate = moment(formattedDate).format("MMMM Do YYYY, h:mm:ss a");
        var deleteBtn = $("<button>");
        deleteBtn.text("x");
        deleteBtn.addClass("delete btn btn-danger");
        var responseBtn = $("<button>");
        responseBtn.text("Respond");
        responseBtn.addClass("delete btn btn-primary");

        newPostBody.text(post.body);
        newPostDate.text(formattedDate);
        newPostTitle.append(newPostDate);

        postText.append(newPostUser);
        postText.append(newPostText);
        postText.append(deleteBtn);
        postText.append(responseBtn);

        newPostCardBody.append(newPostBody);
        newPostCard.append(newPostCardHeading);
        newPostCard.append(newPostCardBody);
        newPostCard.data("post", post);
        return newPostItem;
    }

    // display empty when there are no posts
    function displayEmpty(id) {
        var query = window.location.search;
        postText.empty();
        var devoid = $("<h2>");
        devoid.css({ "text-align": "center", "margin-top": "40px" });
        devoid.html("No Wind.");
        postText.append(devoid);
    }

    // creates new post object
    var newPost = {
        text: bodyInput
            .val()
            .trim(),
        AuthorId: authorSelect.val()
    };

    // submits new post
    function submitPost(post) {
        $.post("/api/posts", post, function () {
            window.location.href = "/board";
        });
    }

});
