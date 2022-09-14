const { Schema, model } = require('mongoose');
const dateFormat = require('../utils/dateFormat');

var validateEmail = function(email) {
  var re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  return re.test(email)
};


const UserSchema = new Schema(
  {
    userName: {
      type: String,
      unique:true,
      required: true,
      trim: true
    },
    email: {
      type: String,
      required: true,
      unique:true,
      validate:[validateEmail,'Enter a valid email']
      

    },
    thoughts: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Thought'
      }
    ],
    friends:[
      {type: Schema.Types.ObjectId,
      ref: 'User'}
    ],
  },
  {
    toJSON: {
      virtuals: true,
      getters: true
    },
    // prevents virtuals from creating duplicate of _id as `id`
    id: false
  }
);

// get total count of comments and replies on retrieval
UserSchema.virtual('friendCount').get(function() {
  return this.friends.length;
});

const User = model('User', UserSchema);

module.exports = User;
