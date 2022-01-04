const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/connection");

class Post extends Model {

}

Post.init(
    //Define the Post schema; identify id as the primary key
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        title: {
            type: DataTypes.STRING,
            allowNull: false
        },
        post_url: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                isURL: true
            }
        },
        user_id: {
            type: DataTypes.INTEGER,
            //establish relationship between this post and the user
            //by referencing the User model's id column
            references: {
                model: "user",
                key: "id",
            }
        }
    },
    //configue the metadata / naming conventions
    {
        sequelize,
        freezeTableName: true,
        underscored: true,
        modelName: "post"
    }
);

module.exports = Post;