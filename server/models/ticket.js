const { Schema, model } = require('mongoose');

const ticketSchema = Schema(
  {
    type: {
      type: String,
      default: "task",
      required: true
    },
    name: {
      type: String,
      required: true
    },
    reporters: {
      type: Array,
      default: []
    },
    assigned: {
      type: String,
      default: null
    },
    description: {
      type: String,
      default: ''
    },
    project: {
      type: Schema.Types.ObjectId,
      required: true
    },
    components: {
      type: Array,
      default: []
    },
    attachments: {
      type: Array,
      default: []
    }
  },
  { timestamps: true }
)


module.exports = model('Ticket', ticketSchema);