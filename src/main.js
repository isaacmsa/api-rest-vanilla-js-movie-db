const api = axios.create({
  baseURL: 'https://api.themoviedb.org/3',
  headers: {
    'Content-Type': 'application/json;charset=utf-8',
  },
  params: {
    api_key: API_KEY,
  },
})

// Helpers (utils)
function createMovies(movies, container) {
  container.innerHTML = ''

  /* Se intera el array de las peliculas para ir creando una por una */
  movies.forEach((movie) => {
    /* Se crea un nodo div para el wrapper de la pelicula */
    const movieContainer = document.createElement('div')

    /* Se le añade la clase al wrapper */
    movieContainer.classList.add('movie-container') // metodo add para añadir una nueva clase a un nodo

    /* Se le añade un boton a la pelicula para ir a los detalles de la misma */
    movieContainer.addEventListener('click', () => {
      location.hash = '#movie=' + movie.id
    })

    /* Se crea un nodo imagen */
    const movieImg = document.createElement('img')

    /* Se le añade una clase */
    movieImg.classList.add('movie-img')

    /* Se le añaden los atributos */
    movieImg.setAttribute('alt', movie.title) // metodo setAttribute para añadir un nuevo atributo a un nodo, recibe el nombre del atributo y su valor
    movieImg.setAttribute(
      'src',
      'https://image.tmdb.org/t/p/w300' + movie.poster_path
    )

    /* Se le agrega la imagen al wrapper */
    movieContainer.appendChild(movieImg)

    /* Se le añade el wrapper al article que es el padre */
    container.appendChild(movieContainer)
  })
}

function createCategories(categories, container) {
  container.innerHTML = ''

  /* Se intera el array de las categorias para ir creando una por una */
  categories.forEach((category) => {
    /* Se crea un nodo div para el wrapper de la categoria */
    const categoryContainer = document.createElement('div')

    /* Se le añade la clase al wrapper */
    categoryContainer.classList.add('category-container')

    /* Se crea un nodo h3 */
    const categoryTitle = document.createElement('h3')

    /* Se le añade una clase */
    categoryTitle.classList.add('category-title')

    /* Se le añade el atributo id */
    categoryTitle.setAttribute('id', 'id' + category.id)

    categoryTitle.addEventListener('click', () => {
      location.hash = `#category=${category.id}-${category.name}`
    })

    /* Se crea un nodo de tipo texto para el nombre de la categoria */
    const categoryTitleText = document.createTextNode(category.name)

    /* Se le agrega el texto al titulo */
    categoryTitle.appendChild(categoryTitleText)

    /* Se le agrega el h3 al wrapper */
    categoryContainer.appendChild(categoryTitle)

    /* Se le añade el wrapper al article que es el padre */
    container.appendChild(categoryContainer)
  })
}

// Llamados a la API
async function getTrendingMoviesPreview() {
  /* Obtener peliculas en tendencia */
  const { data } = await api.get('/trending/movie/day')

  /* Se obtienen data y se accede a results que es donde esta el array de peliculas */
  const movies = data.results

  createMovies(movies, trendingMoviesPreviewList)
}

async function getCategoriesMoviesPreview() {
  /* Obtener categorias de peliculas */
  const { data } = await api.get('/genre/movie/list')

  /* Se obtienen data y se accede a genres que es donde esta el array de categorias */
  const catagories = data.genres

  createCategories(catagories, categoriesPreviewList)
}

async function getMoviesByCategory(id) {
  /* Obtener peliculas por categoria */
  const { data } = await api.get('/discover/movie', {
    params: {
      with_genres: id,
    },
  })

  /* Se obtienen data y se accede a results que es donde esta el array de peliculas */
  const movies = data.results

  createMovies(movies, genericSection)
}

async function getMoviesBySearch(query) {
  /* Obtener peliculas buscadas en el buscador */
  const { data } = await api.get('/search/movie', {
    params: {
      query,
    },
  })

  /* Se obtienen data y se accede a results que es donde esta el array de peliculas */
  const movies = data.results

  createMovies(movies, genericSection)
}

async function getTrendingMovies() {
  /* Obtener peliculas en tendencia */
  const { data } = await api.get('/trending/movie/day')

  /* Se obtienen data y se accede a results que es donde esta el array de peliculas */
  const movies = data.results

  createMovies(movies, genericSection)
}

async function getMovieById(id) {
  /* Obtener pelicula por id */
  const { data: movie } = await api.get(`/movie/${id}`)

  const movieImgUrl = 'https://image.tmdb.org/t/p/w500' + movie.poster_path
  headerSection.style.background = `
  linear-gradient(
    180deg, 
    rgba(0, 0, 0, 0.35) 19.27%, 
    rgba(0, 0, 0, 0) 29.17%),
    url(${movieImgUrl})
  `

  movieDetailTitle.textContent = movie.title
  movieDetailDescription.textContent = movie.overview
  movieDetailScore.textContent = movie.vote_average

  createCategories(movie.genres, movieDetailCategoriesList)
  getRelatedMoviesId(id)
}

async function getRelatedMoviesId(id) {
  const { data } = await api.get(`/movie/${id}/recommendations`)
  const relatedMovies = data.results

  createMovies(relatedMovies, relatedMoviesContainer)
  relatedMoviesContainer.scrollTo(0, 0)
}

