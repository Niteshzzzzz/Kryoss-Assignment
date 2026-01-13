import mongoose from 'mongoose';
import validator from 'validator';

const contactSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Please provide a name'],
      trim: true,
      minlength: [2, 'Name must be at least 2 characters']
    },
    email: {
      type: String,
      required: [true, 'Please provide an email'],
      lowercase: true,
      validate: [validator.isEmail, 'Please provide a valid email'],
      unique: [true, 'Email already exists']
    },
    phone: {
      type: String,
      required: [true, 'Please provide a phone number'],
      validate: {
        validator: function(v) {
          return /^[+]?[(]?[0-9]{3}[)]?[-\s]?[0-9]{3}[-\s]?[0-9]{4,6}$/im.test(v);
        },
        message: 'Please provide a valid phone number (10-15 digits)'
      }
    },
    address: {
      type: String,
      trim: true
    },
    isDeleted: {
      type: Boolean,
      default: false
    }
  },
  {
    timestamps: true
  }
);

// Filter out deleted contacts by default
contactSchema.query.active = function() {
  return this.where({ isDeleted: false });
};

export default mongoose.model('Contact', contactSchema);
