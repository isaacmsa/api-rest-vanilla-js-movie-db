const api = axios.create({
  baseURL: 'https://api.themoviedb.org/3',
  headers: {
    'Content-Type': 'application/json;charset=utf-8',
  },
  params: {
    api_key: API_KEY,
  },
})

async function getTrendingMoviesPreview() {
  /* Obtener peliculas en tendencia */
  const { data } = await api.get('/trending/movie/day')

  /* Se obtienen data y se accede a results que es donde esta el array de peliculas */
  const movies = data.results

  /* Se intera el array de las peliculas para ir creando una por una */
  movies.forEach((movie) => {
    /* Llamar al article de la pelicula */
    const trendingPreviewMoviesContainer = document.querySelector(
      '#trendingPreview .trendingPreview-movieList'
    )

    /* Se crea un nodo div para el wrapper de la pelicula */
    const movieContainer = document.createElement('div')

    /* Se le añade la clase al wrapper */
    movieContainer.classList.add('movie-container') // metodo add para añadir una nueva clase a un nodo

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
    trendingPreviewMoviesContainer.appendChild(movieContainer)
  })
}

async function getCategoriesMoviesPreview() {
  /* Obtener categorias de peliculas */
  const { data } = await api.get('/genre/movie/list')

  /* Se obtienen data y se accede a genres que es donde esta el array de categorias */
  const catagories = data.genres

  /* Se intera el array de las categorias para ir creando una por una */
  catagories.forEach((category) => {
    /* Llamar al article de la categoria */
    const previewCategoriesContainer = document.querySelector(
      '#categoriesPreview .categoriesPreview-list'
    )

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

    /* Se crea un nodo de tipo texto para el nombre de la categoria */
    const categoryTitleText = document.createTextNode(category.name)

    /* Se le agrega el texto al titulo */
    categoryTitle.appendChild(categoryTitleText)

    /* Se le agrega el h3 al wrapper */
    categoryContainer.appendChild(categoryTitle)

    /* Se le añade el wrapper al article que es el padre */
    previewCategoriesContainer.appendChild(categoryContainer)
  })
}

getTrendingMoviesPreview()
getCategoriesMoviesPreview()
