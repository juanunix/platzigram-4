const Page = require('page')
const homepageTemplate = require('./template')
const headerMiddleware = require('../header')
const axios = require('axios')

Page('/', headerMiddleware, loadPictures, (context, next) => {

  // Usando jQuery para cambiar el titulo de la pagina
  $('title').html('Platzigram')

  let main = $('#main-container')

  // Limpia el elemento main-container y le inserta el contenido del homepage
  main.empty().append(homepageTemplate(context.pictures))
})

// Middleware para cargar las fotos, antes de cargar el template de homepage
function loadPictures(context, next) {
  axios
    // Envia la solicitud de las fotos a la API
    .get('/api/pictures')
    .then(function (res) {
      // El contexto de los middlewares se utiliza para compartir informacion entre ellos
      context.pictures = res.data
      // Llama al siguiente middleware
      next()
    })
    .catch(function (err) {
      console.log(err)
    })
}