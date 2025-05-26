import mongoose from 'mongoose';
import dogFoodSchema from '../schema/dogfood.js';

const DogFood = mongoose.model('DogFood', dogFoodSchema);

export default DogFood;
