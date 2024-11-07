import mongoose from 'mongoose';
import dogBreedSchema from '../schema/dogbreed.js';  // Import schema từ file dogbreed.js

const DogBreed = mongoose.model('DogBreed', dogBreedSchema);  // Sử dụng schema để tạo model

export default DogBreed;
