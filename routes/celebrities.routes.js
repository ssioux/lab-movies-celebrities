const router = require("express").Router();
const Celebrities = require("../models/Celebrity.model.js")

// GET "/celebrities/create" => Ruta para renderizar el formulario

router.get("/create", (req, res, next) =>{

    res.render("celebrities/new-celebrities.hbs")
})

// POST "/celebrities/create" => Ruta que crea una nueva celebridad

router.post("/create", async (req, res, next)=>{

    console.log(req.body)
    const { name, occupation, catchPhrase} = req.body

    
    try {
        //1. usar la data para crear un nuevo libro
        await Celebrities.create({
            name,
            occupation,
            catchPhrase        
        })
        res.redirect("/celebrities")
    } catch (error) {
        res.render("celebrities/new-celebrities.hbs")
        //!res.redirect("/celebrities/create") CUAL PONER?¿?
        next(error)
    }

})

// GET "/celebrities" => Ruta para acceso a la lista
router.get("/", async (req, res, next) => {
    try {
        const celebritiesList = await Celebrities.find()
        console.log(celebritiesList)
        res.render("celebrities/celebrities.hbs", {
            celebritiesList
        })
        
    } catch (error) {
        next(error)
    }
})







module.exports = router