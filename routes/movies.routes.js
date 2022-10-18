const router = require("express").Router();
const Celebrities = require("../models/Celebrity.model.js")
const Movie = require("../models/movie.model.js")

// GET "/movies/create" => Ruta para renderizar el formulario

router.get("/create", async (req, res, next) =>{
  console.log("entrando en ruta create de movies")
    
    try {
      const celebritiesList = await Celebrities.find()
      console.log(celebritiesList)
      res.render("movies/new-movies.hbs", {
        celebritiesList
      })
      
    } catch (error) {
      next(error)
    }
})

// POST "/movies/create" => Ruta que crea una nueva celebridad

router.post("/create", async (req, res, next)=>{

    console.log(req.body)
    const { title, genre, plot, cast} = req.body

    
    try {
        //1. usar la data para crear un nuevo libro
        await Movie.create({
            title,
            genre,
            plot,
            cast       
        })
        res.redirect("/movies")
    } catch (error) {
        //res.render("movies/new-movies.hbs")
        //!res.redirect("/movies/create") CUAL PONER?¿?
        next(error)
    }

})

// GET "/movies" => Ruta para acceso a la lista
router.get("/", async (req, res, next) => {
  console.log("entrando en la ruta de acceso a la lista")
    try {
        const moviesList = await Movie.find()
        console.log(moviesList)
        res.render("movies/movies.hbs", {
            moviesList
        })
        
    } catch (error) {
        next(error)
    }
})







module.exports = router