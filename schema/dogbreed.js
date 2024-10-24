// schema.js
const mongoose = require('../mongoose');

const dogBreedSchema = new mongoose.Schema({
    image: { type: String, required: true },
    height: {
        min: { type: Number, required: true },
        max: { type: Number, required: true }
    },
    weight: {
        min: { type: Number, required: true },
        max: { type: Number, required: true }
    },
    lifespan: {
        min: { type: Number, required: true },
        max: { type: Number, required: true }
    },
    affectionateWithFamily: { type: Number, min: 1, max: 5, required: true },
    goodWithOtherDogs: { type: Number, min: 1, max: 5, required: true },
    goodWithYoungChildren: { type: Number, min: 1, max: 5, required: true },
    sheddingLevel: { type: Number, min: 1, max: 5, required: true },
    coatGroomingFrequency: { type: Number, min: 1, max: 5, required: true },
    droolingLevel: { type: Number, min: 1, max: 5, required: true },
    coatType: {
        type: String,
        enum: ['Wiry', 'Hairless', 'Smooth', 'Rough', 'Corded', 'Double', 'Curly', 'Wavy', 'Silky'],
        required: true
    },
    coatLength: {
        type: String,
        enum: ['Short', 'Medium', 'Long'],
        required: true
    },
    opennessToStrangers: { type: Number, min: 1, max: 5, required: true },
    watchdogProtectiveNature: { type: Number, min: 1, max: 5, required: true },
    playfulnessLevel: { type: Number, min: 1, max: 5, required: true },
    adaptabilityLevel: { type: Number, min: 1, max: 5, required: true },
    trainabilityLevel: { type: Number, min: 1, max: 5, required: true },
    barkingLevel: { type: Number, min: 1, max: 5, required: true },
    energyLevel: { type: Number, min: 1, max: 5, required: true },
    mentalStimulationNeeds: { type: Number, min: 1, max: 5, required: true },
    colors: [{ type: String, required: true }], // Danh sách các màu
    description: { type: String, required: true },
    history: { type: String, required: true }
});

module.exports = dogBreedSchema;
