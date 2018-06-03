$(document).ready(function() {
    /* global moment */

    // recipeContainer holds all of our posts
    var recipeContainer = $(".blog-container");
    var postCategorySelect = $("#category");
    // Click events for the edit and delete buttons
    $(document).on("click", "button.delete", handlePostDelete);
    $(document).on("click", "button.edit", handlePostEdit);
    // Variable to hold our posts
    var posts;

    // The code below handles the case where we want to get recipe posts for a specific category
    // Looks for a query param in the url for category_id
    var url = window.location.search;
    var categoryId;
    if (url.indexOf("?category_id=") !== -1) {
        categoryId = url.split("=")[1];
        getPosts(categoryId);
    }
    // If there's no categoryId we just get all posts as usual
    else {
        getPosts();
    }


    // This function grabs posts from the database and updates the view
    function getPosts(category) {
        categoryId = category || "";
        if (categoryId) {
            categoryId = "/?category_id=" + categoryId;
        }
        $.get("/api/posts" + categoryId, function(data) {
            console.log("Posts", data);
            posts = data;
            if (!posts || !posts.length) {
                displayEmpty(category);
            }
            else {
                initializeRows();
            }
        });
    }

    // This function does an API call to delete posts
    function deletePost(id) {
        $.ajax({
            method: "DELETE",
            url: "/api/posts/" + id
        })
            .then(function() {
                getPosts(postCategorySelect.val());
            });
    }

    // InitializeRows handles appending all of our constructed post HTML inside recipeContainer
    function initializeRows() {
        recipeContainer.empty();
        var postsToAdd = [];
        for (var i = 0; i < posts.length; i++) {
            postsToAdd.push(createNewRow(posts[i]));
        }
        recipeContainer.append(postsToAdd);
    }

    // This function constructs a post's HTML
    function createNewRow(post) {
        var formattedDate = new Date(post.createdAt);
        formattedDate = moment(formattedDate).format("MMMM Do YYYY, h:mm:ss a");
        var newPostCard = $("<div>");
        newPostCard.addClass("card");
        var newPostCardHeading = $("<div>");
        newPostCardHeading.addClass("card-header");
        var deleteBtn = $("<button>");
        deleteBtn.text("x");
        deleteBtn.addClass("delete btn bftn-danger");
        var editBtn = $("<button>");
        editBtn.text("EDIT");
        editBtn.addClass("edit btn btn-info");
        var newPostTitle = $("<h2>");
        var newPostDate = $("<small>");
        var newPostCategory = $("<h5>");
        newPostCategory.text("Written by: " + post.Category.name);
        newPostCategory.css({
            float: "right",
            color: "blue",
            "margin-top":
                "-10px"
        });
        var newPostCardBody = $("<div>");
        newPostCardBody.addClass("card-body");
        var newPostBody = $("<p>");
        newPostTitle.text(post.title + " ");
        newPostBody.text(post.body);
        newPostDate.text(formattedDate);
        newPostTitle.append(newPostDate);
        newPostCardHeading.append(deleteBtn);
        newPostCardHeading.append(editBtn);
        newPostCardHeading.append(newPostTitle);
        newPostCardHeading.append(newPostCategory);
        newPostCardBody.append(newPostBody);
        newPostCard.append(newPostCardHeading);
        newPostCard.append(newPostCardBody);
        newPostCard.data("post", post);
        return newPostCard;
    }

    // This function figures out which post we want to delete and then calls deletePost
    function handlePostDelete() {
        var currentPost = $(this)
            .parent()
            .parent()
            .data("post");
        deletePost(currentPost.id);
    }

    // This function figures out which post we want to edit and takes it to the appropriate url
    function handlePostEdit() {
        var currentPost = $(this)
            .parent()
            .parent()
            .data("post");
        window.location.href = "/cms?post_id=" + currentPost.id;
    }

    // This function displays a message when there are no posts
    function displayEmpty(id) {
        var query = window.location.search;
        var partial = "";
        if (id) {
            partial = " for Category #" + id;
        }
        recipeContainer.empty();
        var messageH2 = $("<h2>");
        messageH2.css({ "text-align": "center", "margin-top": "50px", "font-family": "Roboto Slab" });
        messageH2.html("Click" + partial + "  <a href='/cms" + query +
            "'>here</a> to get started.");
        recipeContainer.append(messageH2);
    }

});