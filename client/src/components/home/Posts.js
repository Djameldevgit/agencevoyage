import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import PostCard from '../PostCard'
import LoadIcon from '../../images/loading.gif'
import LoadMoreBtn from '../LoadMoreBtn'
import { getDataAPI } from '../../utils/fetchData'
import { POST_TYPES } from '../../redux/actions/postAction'

const Posts = ({ filters = {} }) => {
    const { homePosts, auth, theme } = useSelector(state => state)
    const dispatch = useDispatch()
    const [load, setLoad] = useState(false)

    // 🔹 PAGINACIÓN ORIGINAL - SIN CAMBIOS
    const handleLoadMore = async () => {
        setLoad(true)
        const res = await getDataAPI(`posts?limit=${homePosts.page * 9}`, auth.token)

        dispatch({
            type: POST_TYPES.GET_POSTS, 
            payload: {...res.data, page: homePosts.page + 1}
        })

        setLoad(false)
    }

    // 🔹 FUNCIÓN DE FILTRADO - NUEVA
    const filterPosts = (posts, searchFilters) => {
        if (!posts || posts.length === 0) return posts;
        if (!searchFilters || Object.keys(searchFilters).length === 0) {
            return posts;
        }

        return posts.filter(post => {
            // FILTRO SUBCATEGORÍA
            if (searchFilters.subCategory && searchFilters.subCategory.trim() !== "") {
                const postSubCategory = post.subCategory?.toLowerCase() || '';
                const filterSubCategory = searchFilters.subCategory.toLowerCase();
                if (postSubCategory !== filterSubCategory) return false;
            }

            // FILTRO DESTINACIÓN
            if (searchFilters.destinacion && searchFilters.destinacion.trim() !== "") {
                const filterDestinacion = searchFilters.destinacion.toLowerCase();
                const postDestinacion = post.destinacion?.toLowerCase() || '';
                const postDestinacionVoyage1 = post.destinacionvoyage1?.toLowerCase() || '';
                const postDestinacionOmra = post.destinacionomra?.toLowerCase() || '';
                const postDestinacionLocation = post.destinacionlocacionvoyage?.toLowerCase() || '';
                
                const matchesDestinacion = 
                    postDestinacion.includes(filterDestinacion) ||
                    postDestinacionVoyage1.includes(filterDestinacion) ||
                    postDestinacionOmra.includes(filterDestinacion) ||
                    postDestinacionLocation.includes(filterDestinacion);
                
                if (!matchesDestinacion) return false;
            }

            // FILTRO FECHAS
            if (searchFilters.datedeparMin || searchFilters.datedeparMax) {
                const postDate = post.datedepar;
                if (!postDate) return false;

                const postDateObj = new Date(postDate);
                
                if (searchFilters.datedeparMin) {
                    const minDate = new Date(searchFilters.datedeparMin);
                    if (postDateObj < minDate) return false;
                }
                
                if (searchFilters.datedeparMax) {
                    const maxDate = new Date(searchFilters.datedeparMax);
                    maxDate.setHours(23, 59, 59, 999);
                    if (postDateObj > maxDate) return false;
                }
            }

            // FILTRO HOTEL
            if (searchFilters.nombreHotel && searchFilters.nombreHotel.trim() !== "") {
                const filterHotel = searchFilters.nombreHotel.toLowerCase();
                const postHotel = post.nombreHotel?.toLowerCase() || '';
                const postHotelMeca = post.hotelMeca?.toLowerCase() || '';
                const postHotelMedina = post.hotelMedina?.toLowerCase() || '';
                
                const matchesHotel = 
                    postHotel.includes(filterHotel) ||
                    postHotelMeca.includes(filterHotel) ||
                    postHotelMedina.includes(filterHotel);
                
                if (!matchesHotel) return false;
            }

            // FILTRO PRECIOS
            if (searchFilters.minPrice || searchFilters.maxPrice) {
                const postPrice = post.precioBase || post.price || post.prixAdulte || 0;
                const priceValue = parseFloat(postPrice) || 0;
                
                if (searchFilters.minPrice) {
                    const minPrice = parseFloat(searchFilters.minPrice);
                    if (priceValue < minPrice) return false;
                }
                
                if (searchFilters.maxPrice) {
                    const maxPrice = parseFloat(searchFilters.maxPrice);
                    if (priceValue > maxPrice) return false;
                }
            }

            return true;
        })
    }

    // 🔹 DETERMINAR QUÉ POSTS MOSTRAR
    const postsToDisplay = filters && Object.keys(filters).length > 0 
        ? filterPosts(homePosts.posts, filters) 
        : homePosts.posts

    return (


        <div>
        <div className="post_thumb">
            {/* 🔹 CONTADOR DE RESULTADOS SOLO EN BÚSQUEDA */}
            {(filters && Object.keys(filters).length > 0) && (
                <div className="mb-3 p-3 bg-light rounded">
                    <small className="text-muted">
                        {postsToDisplay.length} {postsToDisplay.length === 1 ? 'resultado' : 'resultados'} encontrado(s)
                    </small>
                </div>
            )}

            {/* 🔹 MENSAJE SI NO HAY RESULTADOS CON FILTROS */}
            {(filters && Object.keys(filters).length > 0 && postsToDisplay.length === 0) && (
                <div className="text-center py-5">
                    <div className="text-muted">
                        <i className="fas fa-search fa-2x mb-3"></i>
                        <p className="mb-1">No se encontraron viajes que coincidan con tu búsqueda.</p>
                        <small>Intenta ajustar los filtros de búsqueda</small>
                    </div>
                </div>
            )}

            {/* 🔹 MOSTRAR POSTS (FILTRADOS O NORMALES) */}
            {
                postsToDisplay.map(post => (
                    <PostCard key={post._id} post={post} theme={theme} />
                ))
            }

         
            {
                load && <img src={LoadIcon} alt="loading" className="d-block mx-auto" />
            }

            
        </div>
         
             {(filters && Object.keys(filters).length === 0) && (
                <LoadMoreBtn 
                    result={homePosts.result} 
                    page={homePosts.page}
                    load={load} 
                    handleLoadMore={handleLoadMore} 
                />
            )}
              

</div>

    )
}

export default Posts