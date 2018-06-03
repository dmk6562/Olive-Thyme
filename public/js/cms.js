$(document).ready(function() {
    // Getting jQuery references to the post body, title, form, and category select
    var bodyInput = $("#body");
    var titleInput = $("#title");
    var cmsForm = $("#cms");
    var categorySelect = $("#author");
    // Adding an event listener for when the form is submitted
    $(cmsForm).on("submit", handleFormSubmit);
    // Gets the part of the url that comes after the "?" (which we have if we're updating a post)
    var url = window.location.search;
    var postId;
    var categoryId;
    // Sets a flag for whether or not we're updating a post to be false initially
    var updating = false;

    // If we have this section in our url, we pull out the post id from the url
    // In '?post_id=1', postId is 1
    if (url.indexOf("?post_id=") !== -1) {
        postId = url.split("=")[1];
        getPostData(postId, "post");
    }
    // Otherwise if we have an category_id in our url, preset the category select box to be our Category
    else if (url.indexOf("?category_id=") !== -1) {
        categoryId = url.split("=")[1];
    }

    // Getting the categories, and their posts
    getCategories();

    // A function for handling what happens when the form to create a new post is submitted
    function handleFormSubmit(event) {
        event.preventDefault();
        // Wont submit the post if we are missing a body, title, or category
        if (!titleInput.val().trim() || !bodyInput.val().trim() || !categorySelect.val()) {
            return;
        }
        // Constructing a newPost object to hand to the database
        var newPost = {
            title: titleInput
                .val()
                .trim(),
            body: bodyInput
                .val()
                .trim(),
            CategoryId: categorySelect.val()
        };

        // If we're updating a post run updatePost to update a post
        // Otherwise run submitPost to create a whole new post
        if (updating) {
            newPost.id = postId;
            updatePost(newPost);
        }
        else {
            submitPost(newPost);
        }
    }

    // Submits a new post and brings user to recipe page upon completion
    function submitPost(post) {
        $.post("/api/posts", post, function() {
            window.location.href = "/recipe";
        });
    }

    // Gets post data for the current post if we're editing, or if we're adding to a categories' existing posts
    function getPostData(id, type) {
        var queryUrl;
        switch (type) {
            case "post":
                queryUrl = "/api/posts/" + id;
                break;
            case "category":
                queryUrl = "/api/categories/" + id;
                break;
            default:
                return;
        }
        $.get(queryUrl, function(data) {
            if (data) {
                console.log(data.CategoryId || data.id);
                // If this post exists, prefill our cms forms with its data
                titleInput.val(data.title);
                bodyInput.val(data.body);
                categoryId = data.CategoryId || data.id;
                // If we have a post with this id, set a flag for us to know to update the post
                // when we hit submit
                updating = true;
            }
        });
    }

    // A function to get Categories and then render our list of Categories
    function getCategories() {
        $.get("/api/categories", renderCategoryList);
    }
    // Function to either render a list of categories, or if there are none, direct the user to the page
    // to create a category first
    function renderCategoryList(data) {
        if (!data.length) {
            window.location.href = "/categories";
        }
        $(".hidden").removeClass("hidden");
        var rowsToAdd = [];
        for (var i = 0; i < data.length; i++) {
            rowsToAdd.push(createCategoryRow(data[i]));
        }
        categorySelect.empty();
        console.log(rowsToAdd);
        console.log(categorySelect);
        categorySelect.append(rowsToAdd);
        categorySelect.val(categoryId);
    }

    // Creates the categories options in the dropdown
    function createCategoryRow(category) {
        var listOption = $("<option>");
        listOption.attr("value", category.id);
        listOption.text(category.name);
        return listOption;
    }

    // Update a given post, bring user to the recipe page when done
    function updatePost(post) {
        $.ajax({
            method: "PUT",
            url: "/api/posts",
            data: post
        })
            .then(function() {
                window.location.href = "/recipe";
            });
    }
});