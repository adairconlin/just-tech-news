const User = require("./User");
const Post = require("./Post");

//create associations
//a user can have many posts
User.hasMany(Post, {
    foreignKey: "user_id"
});

//create reverse association
//a post can only belong to one user
Post.belongsTo(User, {
    foreignKey: "user_id",
});

module.exports = { User, Post };