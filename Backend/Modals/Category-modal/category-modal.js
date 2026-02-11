import mongoose from "mongoose";

const categorySchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
      minlength: 1,
      unique: true,
    },

    image: {
      secure_url: String,
      public_id: String,
    },

    isPublic: {
      type: Boolean,
      default: true,
      index: true,
    },
  },
  {
    timestamps: true,
  }
);

/* --------- Auto-generate slug --------- */
categorySchema.pre("save", function (next) {
  if (!this.isModified("title")) return next();

  this.slug = this.title
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
});

const Category =
  mongoose.models.Category || mongoose.model("Category", categorySchema);

export default Category;
