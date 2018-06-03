$(document).ready(function() {
<<<<<<< HEAD
    // Getting references to the name input and category container, as well as the table body
    var nameInput = $("#category-name");
    var categoryList = $("tbody");
    var categoryContainer = $(".author-container");
    // Adding event listeners to the form to create a new object, and the button to delete
    // a Category
    $(document).on("submit", "#author-form", handleCategoryFormSubmit);
    $(document).on("click", ".delete-category", handleDeleteButtonPress);
=======
    /// Getting references to the name input and category container, as well as the table body
    var nameInput = $("#category-name");
    var authorList = $("tbody");
    var categoryContainer = $(".author-container");
    // Adding event listeners to the form to create a new object, and the button to delete
    // a Category
    $(document).on("submit", "#author-form", handleAuthorFormSubmit);
    $(document).on("click", ".delete-author", handleDeleteButtonPress);
>>>>>>> 525fd395d90de98e5a6a830872cc891718f08d47

    // Getting the initial list of Categories
    getCategories();

    // A function to handle what happens when the form is submitted to create a new Category
<<<<<<< HEAD
    function categoryContainer(event) {
=======
    function handleAuthorFormSubmit(event) {
>>>>>>> 525fd395d90de98e5a6a830872cc891718f08d47
        event.preventDefault();
        // Don't do anything if the name fields hasn't been filled out
        if (!nameInput.val().trim().trim()) {
            return;
        }
        // Calling the upsertCateogry function and passing in the value of the name input
<<<<<<< HEAD
        upsertCategory({
=======
        upsertAuthor({
>>>>>>> 525fd395d90de98e5a6a830872cc891718f08d47
            name: nameInput
                .val()
                .trim()
        });
    }

    // A function for creating a category. Calls getCategories upon completion
<<<<<<< HEAD
    function upsertCategory(categoryData) {
        $.post("/api/categories", categoryData)
=======
    function upsertAuthor(authorData) {
        $.post("/api/categories", authorData)
>>>>>>> 525fd395d90de98e5a6a830872cc891718f08d47
            .then(getCategories);
    }

    // Function for creating a new list row for categories
<<<<<<< HEAD
    function createCategoryRow(categoryData) {
        var newTr = $("<tr>");
        newTr.data("category", categoryData);
        newTr.append("<td>" + categoryData.name + "</td>");
        newTr.append("<td> " + categoryData.Posts.length + "</td>");
        newTr.append("<td><a href='/recipe?category_id=" + categoryData.id + "'>Go to Recipes</a></td>");
        newTr.append("<td><a href='/cms?category_id=" + categoryData.id + "'>Create a Recipe</a></td>");
        newTr.append("<td><a style='cursor:pointer;color:red' class='delete-category'>Delete Category</a></td>");
=======
    function createAuthorRow(authorData) {
        var newTr = $("<tr>");
        newTr.data("author", authorData);
        newTr.append("<td>" + authorData.name + "</td>");
        newTr.append("<td> " + authorData.Posts.length + "</td>");
        newTr.append("<td><a href='/recipe?author_id=" + authorData.id + "'>Go to Recipes</a></td>");
        newTr.append("<td><a href='/cms?author_id=" + authorData.id + "'>Create a Recipe</a></td>");
        newTr.append("<td><a style='cursor:pointer;color:red' class='delete-author'>Delete Category</a></td>");
>>>>>>> 525fd395d90de98e5a6a830872cc891718f08d47
        return newTr;
    }

    // Function for retrieving categories and getting them ready to be rendered to the page
    function getCategories() {
        $.get("/api/categories", function(data) {
            var rowsToAdd = [];
            for (var i = 0; i < data.length; i++) {
                rowsToAdd.push(createCategoryRow(data[i]));
            }
            renderCategoryList(rowsToAdd);
            nameInput.val("");
        });
    }

    // A function for rendering the list of categories to the page
<<<<<<< HEAD
    function renderCategoryList(rows) {
        categoryList.children().not(":last").remove();
=======
    function renderAuthorList(rows) {
        authorList.children().not(":last").remove();
>>>>>>> 525fd395d90de98e5a6a830872cc891718f08d47
        categoryContainer.children(".alert").remove();
        if (rows.length) {
            console.log(rows);
            categoryList.prepend(rows);
        }
        else {
            renderEmpty();
        }
    }

    // Function for handling what to render when there are no categories
    function renderEmpty() {
        var alertDiv = $("<div>");
        alertDiv.addClass("alert alert-danger");
        alertDiv.text("You must create a category before you can create a recipe.");
        categoryContainer.append(alertDiv);
    }

    // Function for handling what happens when the delete button is pressed
    function handleDeleteButtonPress() {
        var listItemData = $(this).parent("td").parent("tr").data("category");
        var id = listItemData.id;
        $.ajax({
            method: "DELETE",
            url: "/api/categories/" + id
        })
            .then(getCategories);
    }
});