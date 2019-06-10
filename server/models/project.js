const { Schema, model } = require('mongoose');

const projectSchema = Schema(
  {
    name: {
      type: String,
      unique: true,
      required: true
    },
    tickets: {
      //TODO: describe Map <ticketId, ticketTitle>;
      type: Array,
      default: []
    },
    participants: {
      //TODO: describe Map <userId, email>;
      type: Array,
      default: []
    },
    desctiption: {
      type: String,
      default: ''
    },
    components: {
      type: Array,
      default: []
    },
    updatedBy: {
      type: Schema.Types.ObjectId,
      required: true
    },
    owner: {
      type: Schema.Types.ObjectId,
    }
  },
  { timestamps: true }
)

module.exports = model('Project', projectSchema);