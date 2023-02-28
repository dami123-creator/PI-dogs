const { Router } = require('express');
const getAllDogs = require('../controllers/getAllDogs');
const {Temperament} = require('../db.js')
const {Dog} = require('../db.js')
const axios = require('axios');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');


const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
// router.use('/dogs', )
router.get('/dogs', async (req, res) => {
    try {
        
        const {name} = req.query;
        const totalDogs = await getAllDogs();
        if(name){
            const dogs = await totalDogs.filter(n => {
                return n.name.toLowerCase().includes(name.toLocaleLowerCase())
            })
            
            if(dogs.length) return res.status(200).json(dogs)
            else throw new Error('No encontrado');
        }else{
            return res.status(200).json(totalDogs);
        }
    } catch (e) {
        return res.status(404).json({error: e.message})
    }
})

router.get('/temperament', async (req, res) => {
    try {
        //traigo la data
        const dataApi = await axios("https://api.thedogapi.com/v1/breeds")
        //creo una lista de cada temperamet de todas las razas
        const everyTemperament = dataApi.data
            .map(dog => dog.temperament ? dog.temperament : "Error")
            .map(dog => dog?.split(", "))

        //creo una lista de temperamentos unicos y almaceno en la base de datos
        const unicTemperament = [...new Set(everyTemperament.flat())];
        unicTemperament.forEach(async (el) => {
            await Temperament.findOrCreate({ where: { name: el}})
        });
        
        //Obtengo todos los datos de temeperamet de la base de datos y envio como respuesta HTTP
        const allTemperaments = await Temperament.findAll();
        return res.status(200).json(allTemperaments)
    } catch (e) {
        return res.status(500).send("Error en el servidor")
    }
})

router.get('/dogs/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const allDogs = await getAllDogs();

        const dogId = await allDogs.find( dog => dog.id == id);
        
        if(dogId) return res.status(200).json(dogId)
        else throw new Error("no hubo coincidencia")
    } catch (e) {
        return res.status(404).json({error: e.message})
    }
})

router.post('/dogs', async (req, res) => {
    try {
        const {name, height, weight, image, life_span, temperaments} = req.body;

        if(!name || !height || !weight || !image || !life_span || !temperaments) { 
            throw new Error("falta informacion para crear la raza")
        }

        const dogCreated = await Dog.create({
            name,
            height,
            weight,
            image,
            life_span,
            temperaments,
        })

        const temperamentDb = await Temperament.findAll({
            where: { name: temperaments}
        });

        await dogCreated.addTemperament(temperamentDb);
        return res.status(200).json({succes: true, message: "raza creada correctamente"});

    } catch (e) {
        res.status(404).json({error: e.message})
    }
})


// router.delete("/dogs/:id", async (req, res) => {
//     const id = req.params.id;
//     console.log(id);
//     const totalDogs = await getAllDogs();
//     if (id) {
//       let dogid = await totalDogs.filter(
//         (el) => el.createInDb === true && el.id == id
//       );
//       console.log("este es el dogid", dogid);
//       dogid.length
//         ? res.status(200).json(
//             await Dog.destroy({
//               where: { id: id },
//               truncate: { cascade: true },
//             })
//           )
//         : res.status(404).send("no se puede eliminar cDb");
//     }
//   });

module.exports = router;
