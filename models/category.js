module.exports = function(sequelize, DataTypes) {
    var Category = sequelize.define("Category", {
        // Giving the Category model a name of type STRING
        name: DataTypes.STRING
    });

    Category.associate = function(models) {
        // Associating Category with Posts
        // When an Category is deleted, also delete any associated Posts
        Category.hasMany(models.Post, {
            onDelete: "cascade"
        });
    };

    return Category;
<<<<<<< HEAD
};
=======
};
>>>>>>> 6bf10aad38dc24f584aa503e28a8c3f33da2d665
