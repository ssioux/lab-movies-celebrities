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

// GET "/movies/:movieID/details" => ruta para renderizar los detalles le los libros
router.get("/:movieID/details", async(req, res, next) => {
  console.log("entrando en los detalles de los libros")
  const {movieID} = req.params
  
  try {
    const details = await Movie.findById(movieID)
    .populate("cast") // busca la id del objeto de cast(celebrities model)
    console.log(details)
    res.render("movies/movie-details.hbs", {
      details
    })
  } catch (error) {
    next(error)
  }
})

// POST "/movies/:movieID/delete" => ruta para eliminar la film de bd
router.post("/:movieID/delete", async (req, res, next) => {

  const {movieID} = req.params
  try {
    await Movie.findByIdAndDelete(movieID)
    res.redirect("/movies")
    
  } catch (error) {
    next(error)
  }
})

// GET "/movies/:movieID/update" => ruta para renderizar un formulario con la data acutal
router.get("/:movieID/update", async(req, res, next) => {
  console.log("entrando en update")
  const {movieID} =req.params
  try {
    const detailsUpdate = await Movie.findById(movieID)
    .populate("cast")
    const detailsCelebrities = await Celebrities.find()
    console.log(detailsCelebrities)
    res.render("movies/edit-movies.hbs", {
      detailsUpdate,
      detailsCelebrities
    })
    
  } catch (error) {
    next(error)
  }
})

//POST "movies/:movieID/update" => recibir los valores (action) para actualizar la pelicula y redireccionar
router.post("/:movieID/update", async(req, res, next) => {
  console.log("entrando en el post de actualizar la pelicula")
  const {movieID} = req.params
  const {title, genre, plot, cast} =req.body
  
  console.log(cast)
  
  try {
    const movieUpdate = {
      title,
      genre,
      plot,
      cast
    }
    await Movie.findByIdAndUpdate(movieID, movieUpdate)
    res.redirect(`/movies/${movieID}/details`)
    
  } catch (error) {
    next(error)
  }
})







module.exports = router