const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/connection");

class Post extends Model {
    //indicate this method is based on Post mode and not an instance method
    static upvote(body, models) {
        return models.Vote.create({
            user_id: body.user_id,
            post_id: body.post_id
        }).then(() => {
            return Post.findOne({
                where: {
                    id: body.post_id
                },
                attributes: [
                    "id",
                    "post_url",
                    "title",
                    "created_at",
                    [sequelize.literal("(SELECT COUNT(*) FROM vote WHERE post.id = vote.post_id)"), "vote_count"]
                ]
            })
        })
    }
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