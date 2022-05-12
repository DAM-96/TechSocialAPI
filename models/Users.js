const { Schema, model } = require("mongoose");

let validateEmail = function(email) {
    let evaluation = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    return evaluation.test(email);
};

const usersSchema = new Schema({
    userName: {
        type: String,
        unique: true,
        required: true,
        trim: true,
        maxLength: 20
    },
    email: {
        type: String,
        unique: true,
        required: true,
        validate: [validateEmail, 'Invalid email: The email address doesn\'t comply with the user@domain.com format.']
    },
    thoughts: [{
        type: Schema.Types.ObjectId,
        ref: "thoughts"
    }],
    friends: [{
        type: Schema.Types.ObjectId,
        ref: "users"
    }]
},{
    toJSON: {
        virtuals: true
    },
    id: false
});

usersSchema.virtual("friendsCount").get( () => {
    if(this.friends) return this.friends.length;
} )

const Users = model("users", usersSchema);

module.exports = Users;