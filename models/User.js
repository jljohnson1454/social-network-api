const { Schema, model, Types } = require('mongoose');
const dateFormat = require('../utils/dateFormat');

const UserSchema = new Schema(
    {
        userName: {
            type: String,
            unique: true,
            required: true,
            trim: true

        },
        email: {
            type: String,
            required: true,
            unique: true,
           // match: // forgot how this one works //
        },
        thoughts: {
                type: Schema.Types.ObjectId,
                ref: 'Thoughts'
        },
        friends: {
                type: Schema.Types.ObjectId,
                ref: 'User'

        }
        
    }
)

// Create a virtual called friendCount that retrieves the length of the user's friends array field on query.

UserSchema.virtual('friendCount').get(function() {
    return this.friends.length;
})

// Create User model
const User = model('Pizza', PizzaSchema);

module.exports = User;