const mongoose = require("mongoose")
const User = require("./Users")

const projectSchema = new mongoose.Schema({
    projectName: {
        type: String,
        required: [true, "Name for project is required"],
    },
    description: {
        type: String,
        required: [true, "Project description is required"],
    },
    startDate: {
        type: Date,
    },
    targetEndDate: {
        type: Date,
    },
    assignedUsers: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    }],
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    },
    modifiedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    issues: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Issue"
    }]


}, { timestamps: true })

projectSchema.pre("remove", async function (next) {
  //find user from ref then remove Issue from Issues array in User model
  try {
      const user = await User.findById(this.createdBy)
      user.projects.remove(this._id)
      await user.save()
  } catch (err) {
      return next(err)
  }
})

const Project = mongoose.model("Project", projectSchema)

module.exports = Project