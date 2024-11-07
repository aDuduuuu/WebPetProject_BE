import mongoose from 'mongoose';
import dogBreedSchema from '../schema/dogbreed.js';

const DogBreed = mongoose.model('DogBreed', dogBreedSchema);

export default DogBreed;
