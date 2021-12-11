const { Schema, model } = require('mongoose');
const dateFormat = require('../utils/dateFormat');

const UserSchema = new Schema(
    {
        username: {
            type: String,
            unique: true,
            required: true,
            trim: true

        },
        email: {
            type: String,
            required: true,
            unique: true,
            //match: [/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/]
           
        },
        thoughts: [{
                type: Schema.Types.ObjectId,
                ref: 'Thoughts'
        }],
        friends: [{
                type: Schema.Types.ObjectId,
                ref: 'User'

        }]
        
    },
    {    
        toJSON: {
            virtuals: true,
            getters: true
        },
        id: false
    })

// Create a virtual called friendCount that retrieves the length of the user's friends array field on query.

UserSchema.virtual('friendCount').get(function() {
    return this.friends.length;
})

// Create User model
const User = model('User', UserSchema);

module.exports = User;