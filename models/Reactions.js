const { Schema, Types } = require("mongoose");

const reactionsSchema = new Schema(
    {
        reactionID: {
            type: Schema.Types.ObjectID,
            default: () => new Types.ObjectId()
        },
        reactionContent: {
            type: String,
            required: true,
        },
        username: {
            type: String,
            required: true
        },
        createdAt: {
            type: Date,
            default: Date.now
        }
    }
);

module.exports = reactionsSchema;