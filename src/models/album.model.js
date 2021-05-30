import mongoose from 'mongoose';

const { Schema } = mongoose;

const entriesSchema = new Schema({
  message: { type: String, required: false },
  picture: { type: String, required: true },
  pictureSmall: { type: String, required: false },
  pictureMedium: { type: String, required: false },
  pictureStored: { type: String, required: false },
});

const albumSchema = new Schema({
  userId: {
    type: String,
    required: false,
  },
  entries: [entriesSchema],
  created: { type: Date, default: Date.now, required: true },
  updated: { type: Date, default: Date.now, required: true },
});

albumSchema.methods.transform = function transform() {
  const transformed = {};
  const fields = ['_id', 'userId', 'entries', 'created', 'updated'];
  fields.forEach((field) => {
    if (field in this) {
      transformed[field] = this[field];
    }
  });

  return transformed;
};

export default mongoose.model('albums', albumSchema);
