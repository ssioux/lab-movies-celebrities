const router = require("express").Router();


// GET "/celebrities/create" => Ruta para renderizar el formulario

router.get("/create", (req, res, next) =>{

    res.render("celebrities/new-celebrities.hbs")
})

// POST "/celebrities/create" => Ruta que crea una nueva celebridad

router.post("/create", async (req, res, next)=>{


    console.log(req.body)

})






module.exports = router