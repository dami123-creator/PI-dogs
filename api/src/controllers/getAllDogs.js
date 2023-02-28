const axios = require('axios');
const {Dog, Temperament} = require('../db')

//traigo lo de la Api, DATABASE 

const getAllDogsAPI = async () => {
    const response = await axios(`https://api.thedogapi.com/v1/breeds`);
    const dogs = response.data.map(dog => {
        return {  
            id: dog.id,
            image: dog.image.url,
            name: dog.name,
            weight: dog.weight.metric,
            height: dog.height.metric,
            life_span: dog.life_span,
            temperaments: dog.temperament
        }
    });
    return dogs;
}

const getAllDogsDB = async () => {
    let dogs_DB = await Dog.findAll({
        include: {
            model: Temperament,
            attributes: ["name"],
            through: {
                attributes: [],
            },
        },
    });
    
    const datBmap = dogs_DB.map((el) => ({
        ...el.toJSON(), 
        temperaments: el.temperaments.map((t) => t.name),
    }));
        return datBmap;
    
}






const getAllDogs = async () => {
    const dogApi = await getAllDogsAPI();
    const dogDb = await getAllDogsDB();
    const totalDogs = dogApi.concat(dogDb)
    return totalDogs
}


module.exports = getAllDogs;