import mongoose from 'mongoose';

const projectSchema = mongoose.Schema({

  projectName: {
    type: String,
    required: true
  },

  email1: {
    type: String,
    required: true
  },

  email2: {
    type: String
  },

  fileUrl: {
    type: String,
    required: true
  },

  slidesUrl: {
    type: String
  },

  ciclo: {
    type: String,
    required: true
  },

  nota: {
    type: String,
    default: '0'
  },

  calificado: {
    type: String,
    default: 'NO'
  },
  observaciones: {
    type: String,
    default: ''
  },

  fecha: {
    type: Date,
    default: Date.now()
  }

});

export default mongoose.model('Projects', projectSchema);
