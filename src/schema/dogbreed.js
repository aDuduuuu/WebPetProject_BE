import mongoose from 'mongoose';

const dogBreedSchema = new mongoose.Schema({
    name: { type: String, required: true, unique: true },
    image: { type: String, required: true },
    image1: { type: String },
    image2: { type: String },
    image3: { type: String },
    image4: { type: String },
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
    affectionateWithFamily: { type: Number, min: 0, max: 5, required: true },
    goodWithOtherDogs: { type: Number, min: 0, max: 5, required: true },
    goodWithYoungChildren: { type: Number, min: 0, max: 5, required: true },
    sheddingLevel: { type: Number, min: 0, max: 5, required: true },
    coatGroomingFrequency: { type: Number, min: 0, max: 5, required: true },
    droolingLevel: { type: Number, min: 0, max: 5, required: true },
    coatType: [{
        type: String,
        enum: ['Wiry', 'Hairless', 'Smooth', 'Rough', 'Corded', 'Double', 'Curly', 'Wavy', 'Silky'],
        required: true
    }],
    coatLength: [{
        type: String,
        enum: ['Short', 'Medium', 'Long'],
        required: true
    }],
    opennessToStrangers: { type: Number, min: 0, max: 5, required: true },
    watchdogProtectiveNature: { type: Number, min: 0, max: 5, required: true },
    playfulnessLevel: { type: Number, min: 0, max: 5, required: true },
    adaptabilityLevel: { type: Number, min: 0, max: 5, required: true },
    trainabilityLevel: { type: Number, min: 0, max: 5, required: true },
    barkingLevel: { type: Number, min: 0, max: 5, required: true },
    energyLevel: { type: Number, min: 0, max: 5, required: true },
    mentalStimulationNeeds: { type: Number, min: 0, max: 5, required: true },
    colors: [{ type: String, required: true }],
    description: { type: String, required: true },
    history: { type: String, required: true },
    group: {
        type: String,
        enum: ['Sporting Group', 'Hound Group', 'Working Group', 'Toy Group', 'Herding Group', 'Foundation Stock Service', 'Terrier Group', 'Non-Sporting Group', 'Miscellaneous Class'],
        required: true
    },
    activityLevel: {
        type: String,
        enum: ['Needs Lots Of Activity', 'Regular Exercise', 'Energetic', 'Calm'],
        required: true
    },
    barkingLevelDescription: {
        type: String,
        enum: ['When Necessary', 'Infrequent', 'Medium', 'Frequent', 'Likes To Be Vocal'],
        required: true
    },
    characteristics: [{
        type: String,
        enum: ['Smallest Dog Breeds', 'Largest Dog Breeds', 'Hypoallergenic Dogs', 'Best Guard Dogs', 'Hairless Dog Breeds', 'Large Dog Breeds', 'Medium Dog Breeds', 'Smartest Breeds Of Dogs', 'Best Family Dogs', 'Best Dog Breeds For Kids', 'Best Dogs For Apartment Dwellers', 'Smartest Breeds Of Dog']
    }],
    size: {
        type: String,
        enum: ['XSmall', 'Small', 'Medium', 'Large', 'XLarge'],
        required: true
    },
    shedding: {
        type: String,
        enum: ['Infrequent', 'Frequent', 'Regularly', 'Seasonal', 'Occasional'],
        required: true
    },
    trainability: {
        type: String,
        enum: ['May Be Stubborn', 'Eager To Please', 'Easy Training', 'Agreeable', 'Independent'],
        required: true
    }
});

export default dogBreedSchema;
