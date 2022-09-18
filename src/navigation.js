let maxPage
let page = 1
let infiniteScroll

/* Agregar eventos a los botones busqueda, vr mas y retroceso */
searchFormBtn.addEventListener('click', () => {
  location.hash = '#search=' + searchFormInput.value
})

trendingBtn.addEventListener('click', () => {
  location.hash = '#trends'
})

arrowBtn.addEventListener('click', () => {
  // objeto history y metodo back para a la ultima ruta que se visito
  history.back()
  // location.hash = '#home'
})

/* Agregar eventos a window */
window.addEventListener('DOMContentLoaded', navigator, false) // evento DOMContentLoaded que es cuando se recarga la pagina
window.addEventListener('hashchange', navigator, false) // evento hashchange para cuando cambia el hash del objeto location en la ruta del navegador
// nota: El tercer parametro se utiliza para determinar si se va a manejar con bubbling (propagacion de enventos) cuando es false o capturing cuando es true
// Location Propiedad del navegador de JS que permite leer la URL en la que nos encontramos actualmente, entre sus propiedades está el hash, puerto, ruta, etc
// onhaschange: Permite que ejecutemos cierto código cada vez que cambie nuestro hash
window.addEventListener('scroll', infiniteScroll, false)

/* funcion para redirigir */
function navigator() {
  console.log(location)

  if (infiniteScroll) {
    window.removeEventListener('scroll', infiniteScroll, { passive: false })
    infiniteScroll = undefined
  }

  // metodo de los strings startsWith() para saber si el string empieza con esa palabra, este metodo recibe el striing a buscar
  if (location.hash.startsWith('#trends')) {
    trendsPage()
  } else if (location.hash.startsWith('#search=')) {
    searchPage()
  } else if (location.hash.startsWith('#movie=')) {
    movieDetailsPage()
  } else if (location.hash.startsWith('#category=')) {
    categoriesPage()
  } else {
    homePage()
  }

  // para siempre colocar el scroll al inicio
  // document.body.scrollTop = 0
  // para navegadores como safari o brave
  document.documentElement.scrollTop = 0

  if (infiniteScroll) {
    window.addEventListener('scroll', infiniteScroll, { passive: false })
  }
}

/* validar clases que tendra cada vista segun su hash # */
function homePage() {
  console.log('Home')

  headerSection.classList.remove('header-container--long') // metodo remove() para remover una clase de un nodo
  headerSection.style.background = ''
  arrowBtn.classList.add('inactive')
  arrowBtn.classList.remove('header-arrow--white')
  headerTitle.classList.remove('inactive')
  headerCategoryTitle.classList.add('inactive')
  searchForm.classList.remove('inactive')

  trendingPreviewSection.classList.remove('inactive')
  categoriesPreviewSection.classList.remove('inactive')
  likedMoviesSection.classList.remove('inactive')
  genericSection.classList.add('inactive')
  movieDetailSection.classList.add('inactive')

  getTrendingMoviesPreview()
  getCategoriesMoviesPreview()
  getLikedMovies()
}

function categoriesPage() {
  console.log('Categories')

  headerSection.classList.remove('header-container--long') // metodo remove() para remover una clase de un nodo
  headerSection.style.background = ''
  arrowBtn.classList.remove('inactive')
  arrowBtn.classList.remove('header-arrow--white')
  headerTitle.classList.add('inactive')
  headerCategoryTitle.classList.remove('inactive')
  searchForm.classList.add('inactive')

  trendingPreviewSection.classList.add('inactive')
  categoriesPreviewSection.classList.add('inactive')
  likedMoviesSection.classList.add('inactive')
  genericSection.classList.remove('inactive')
  movieDetailSection.classList.add('inactive')

  const [url, categoryData] = location.hash.split('=') // ['category, 'id-name]
  const [categoryId, categoryName] = categoryData.split('-')

  headerCategoryTitle.innerHTML = decodeURIComponent(categoryName) // funcion para eliminar decodificar URI

  getMoviesByCategory(categoryId)

  infiniteScroll = getPaginatedMoviesByCategory(categoryId)
}

function movieDetailsPage() {
  console.log('Movie')

  headerSection.classList.add('header-container--long') // metodo remove() para remover una clase de un nodo
  // headerSection.style.background = ''
  arrowBtn.classList.remove('inactive')
  arrowBtn.classList.add('header-arrow--white')
  headerTitle.classList.add('inactive')
  headerCategoryTitle.classList.add('inactive')
  searchForm.classList.add('inactive')

  trendingPreviewSection.classList.add('inactive')
  categoriesPreviewSection.classList.add('inactive')
  likedMoviesSection.classList.add('inactive')
  genericSection.classList.add('inactive')
  movieDetailSection.classList.remove('inactive')

  const [url, movideId] = location.hash.split('=') // [#movie, 'id]
  getMovieById(movideId)
}

function searchPage() {
  console.log('Search')

  headerSection.classList.remove('header-container--long') // metodo remove() para remover una clase de un nodo
  headerSection.style.background = ''
  arrowBtn.classList.remove('inactive')
  arrowBtn.classList.remove('header-arrow--white')
  headerTitle.classList.add('inactive')
  headerCategoryTitle.classList.add('inactive')
  searchForm.classList.remove('inactive')

  trendingPreviewSection.classList.add('inactive')
  categoriesPreviewSection.classList.add('inactive')
  likedMoviesSection.classList.add('inactive')
  genericSection.classList.remove('inactive')
  movieDetailSection.classList.add('inactive')

  const [url, query] = location.hash.split('=') // [#search, 'buscador]
  getMoviesBySearch(query)

  infiniteScroll = getPaginatedMoviesBySearch(query)
}
function trendsPage() {
  console.log('Trends')

  headerSection.classList.remove('header-container--long') // metodo remove() para remover una clase de un nodo
  headerSection.style.background = ''
  arrowBtn.classList.remove('inactive')
  arrowBtn.classList.remove('header-arrow--white')
  headerTitle.classList.add('inactive')
  headerCategoryTitle.classList.remove('inactive')
  searchForm.classList.add('inactive')

  trendingPreviewSection.classList.add('inactive')
  categoriesPreviewSection.classList.add('inactive')
  likedMoviesSection.classList.add('inactive')
  genericSection.classList.remove('inactive')
  movieDetailSection.classList.add('inactive')

  headerCategoryTitle.innerHTML = 'Tendencias'

  getTrendingMovies()

  infiniteScroll = getPaginatedTrendingMovies
}
