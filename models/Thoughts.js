const { Schema, model } = require("mongoose");
const reactionsSchema = require("./Reactions");

const thoughtsSchema = new Schema(
    {
        thoughtContents: {
            type: String,
            required: true,
            minLength: 1,
            maxLength: 300
        },
        thoughtAuthor: {
            type: String,
            required: true
        },
        reactions: [reactionsSchema],
        createdAt: {
            type: Date,
            default: Date.now
        }
    },
    {
        toJSON: {
            virtuals: true,
        },
        id: false,
    }
);

thoughtsSchema.virtual("reactionsCount").get(() => this.reactions.length);

const Thoughts = model('thoughts', thoughtsSchema);

module.exports = Thoughts;