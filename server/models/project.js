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
      type: Map
    },
    participants: {
      //TODO: describe Map <userId, email>;
      type: Map
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
      type: String,
      required: true
    },
    owner: {
      type: String,
    }
  },
  { timestamps: true }
)

module.exports = model('Project', projectSchema);