import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import PostCard from '../PostCard';
import LoadIcon from '../../images/loading.gif';
import LoadMoreBtn from '../LoadMoreBtn';
import { getDataAPI } from '../../utils/fetchData';
import { POST_TYPES } from '../../redux/actions/postAction';

const Posts = ({ posts: postsProp, filters = {} }) => {
    const { homePosts, auth, theme } = useSelector(state => state);
    const dispatch = useDispatch();
    const [load, setLoad] = useState(false);

    // 🔹 DETERMINAR QUÉ POSTS MOSTRAR
    const getPostsToDisplay = () => {
        // Si se pasan posts directamente como prop (resultados de búsqueda)
        if (postsProp && postsProp.length > 0) {
            return postsProp;
        }
        
        // Si hay filtros activos pero no posts prop, usar homePosts
        if (filters && Object.keys(filters).length > 0) {
            return homePosts.posts || [];
        }
        
        // Caso por defecto: posts de home
        return homePosts.posts || [];
    };

    const postsToDisplay = getPostsToDisplay();

    // 🔹 FUNCIÓN MEJORADA DE FILTRADO
    const filterPosts = (posts, searchFilters) => {
        if (!posts || posts.length === 0) return [];
        
        // Si no hay filtros o es un array vacío, mostrar todos los posts
        if (!searchFilters || Object.keys(searchFilters).length === 0) {
            return posts;
        }

        console.log("🔍 Aplicando filtros en Posts:", searchFilters);

        return posts.filter(post => {
            console.log("📝 Post actual:", {
                id: post._id,
                subCategory: post.subCategory,
                destinacion: post.destinacion,
                datedepar: post.datedepar,
                nombreHotel: post.nombreHotel,
                precioBase: post.precioBase,
                price: post.price,
                prixAdulte: post.prixAdulte
            });

            // 🔷 FILTRO 1: SUBCATEGORÍA
            if (searchFilters.subCategory && searchFilters.subCategory.trim() !== "") {
                const postSubCategory = post.subCategory?.toLowerCase() || '';
                const filterSubCategory = searchFilters.subCategory.toLowerCase();
                
                if (postSubCategory !== filterSubCategory) {
                    console.log(`❌ Filtro subCategory: ${postSubCategory} !== ${filterSubCategory}`);
                    return false;
                }
                console.log(`✅ Filtro subCategory coincide: ${postSubCategory}`);
            }

            // 🔷 FILTRO 2: DESTINO DEL VIAJE
            if (searchFilters.destinacion && searchFilters.destinacion.trim() !== "") {
                const filterDestinacion = searchFilters.destinacion.toLowerCase();
                
                // Buscar en TODOS los campos posibles de destino
                const postDestinacion = post.destinacion?.toLowerCase() || '';
                const postDestinacionVoyage1 = post.destinacionvoyage1?.toLowerCase() || '';
                const postDestinacionOmra = post.destinacionomra?.toLowerCase() || '';
                const postDestinacionLocation = post.destinacionlocacionvoyage?.toLowerCase() || '';
                
                const matchesDestinacion = 
                    postDestinacion.includes(filterDestinacion) ||
                    postDestinacionVoyage1.includes(filterDestinacion) ||
                    postDestinacionOmra.includes(filterDestinacion) ||
                    postDestinacionLocation.includes(filterDestinacion);
                
                if (!matchesDestinacion) {
                    console.log(`❌ Filtro destinacion: No coincide con ${filterDestinacion}`);
                    return false;
                }
                console.log(`✅ Filtro destinacion coincide: ${filterDestinacion}`);
            }

            // 🔷 FILTRO 3: RANGO DE FECHAS - NUEVO (datedeparMin/Max)
            if (searchFilters.datedeparMin || searchFilters.datedeparMax) {
                const postDate = post.datedepar;
                
                if (!postDate) {
                    console.log(`❌ Post no tiene fecha de partida`);
                    return false;
                }

                const postDateObj = new Date(postDate);
                
                // Filtro fecha mínima
                if (searchFilters.datedeparMin) {
                    const minDate = new Date(searchFilters.datedeparMin);
                    if (postDateObj < minDate) {
                        console.log(`❌ Filtro datedeparMin: ${postDate} < ${searchFilters.datedeparMin}`);
                        return false;
                    }
                }
                
                // Filtro fecha máxima
                if (searchFilters.datedeparMax) {
                    const maxDate = new Date(searchFilters.datedeparMax);
                    maxDate.setHours(23, 59, 59, 999); // Hasta el final del día
                    if (postDateObj > maxDate) {
                        console.log(`❌ Filtro datedeparMax: ${postDate} > ${searchFilters.datedeparMax}`);
                        return false;
                    }
                }
                
                console.log(`✅ Filtro fechas pasa: ${postDate}`);
            }

            // 🔷 FILTRO 4: BÚSQUEDA POR HOTEL - NUEVO
            if (searchFilters.nombreHotel && searchFilters.nombreHotel.trim() !== "") {
                const filterHotel = searchFilters.nombreHotel.toLowerCase();
                
                // Buscar en múltiples campos de hotel
                const postHotel = post.nombreHotel?.toLowerCase() || '';
                const postHotelMeca = post.hotelMeca?.toLowerCase() || '';
                const postHotelMedina = post.hotelMedina?.toLowerCase() || '';
                
                const matchesHotel = 
                    postHotel.includes(filterHotel) ||
                    postHotelMeca.includes(filterHotel) ||
                    postHotelMedina.includes(filterHotel);
                
                if (!matchesHotel) {
                    console.log(`❌ Filtro hotel: No coincide con ${filterHotel}`);
                    return false;
                }
                console.log(`✅ Filtro hotel coincide: ${filterHotel}`);
            }

            // 🔷 FILTRO 5: RANGO DE PRECIOS - NUEVO
            if (searchFilters.minPrice || searchFilters.maxPrice) {
                // Obtener el precio del post (buscar en múltiples campos)
                const postPrice = 
                    post.precioBase || 
                    post.price || 
                    post.prixAdulte || 
                    0;
                
                const priceValue = parseFloat(postPrice) || 0;
                
                // Filtro precio mínimo
                if (searchFilters.minPrice) {
                    const minPrice = parseFloat(searchFilters.minPrice);
                    if (priceValue < minPrice) {
                        console.log(`❌ Filtro minPrice: ${priceValue} < ${minPrice}`);
                        return false;
                    }
                }
                
                // Filtro precio máximo
                if (searchFilters.maxPrice) {
                    const maxPrice = parseFloat(searchFilters.maxPrice);
                    if (priceValue > maxPrice) {
                        console.log(`❌ Filtro maxPrice: ${priceValue} > ${maxPrice}`);
                        return false;
                    }
                }
                
                console.log(`✅ Filtro precios pasa: $${priceValue}`);
            }

            // 🔷 FILTRO 6: ÚLTIMOS VIAJES
            if (searchFilters.latest) {
                // Para filtro latest, no necesitamos hacer validaciones adicionales
                // ya que el backend ya nos devuelve los posts ordenados por fecha
                console.log("✅ Filtro latest activo - mostrando posts más recientes");
                return true;
            }

            console.log("✅ Post pasa todos los filtros");
            return true;
        });
    };

    // 🔹 APLICAR FILTRADO
    const filteredPosts = filterPosts(postsToDisplay, filters);

    const handleLoadMore = async () => {
        setLoad(true);
        const res = await getDataAPI(`posts?limit=${homePosts.page * 9}`, auth.token);

        dispatch({
            type: POST_TYPES.GET_POSTS,
            payload: { ...res.data, page: homePosts.page + 1 },
        });

        setLoad(false);
    };

    // 🔹 DETERMINAR SI MOSTRAR BOTÓN "LOAD MORE"
    const shouldShowLoadMore = () => {
        // No mostrar si estamos en modo búsqueda con filtros activos
        if (filters && Object.keys(filters).length > 0) {
            return false;
        }
        
        // No mostrar si estamos mostrando posts prop (resultados de búsqueda)
        if (postsProp && postsProp.length > 0) {
            return false;
        }
        
        // Mostrar solo en home posts normal
        return homePosts.result >= homePosts.page * 9;
    };

    return (
        <div>
            <div className="post_thumb">
                {/* 🔹 CONTADOR DE RESULTADOS */}
                {filters && Object.keys(filters).length > 0 && (
                    <div className="mb-3 p-3 bg-light rounded">
                        <small className="text-muted">
                            {filteredPosts.length} {filteredPosts.length === 1 ? 'resultado' : 'resultados'} encontrado(s)
                            {Object.keys(filters).length > 0 && ' con los filtros aplicados'}
                        </small>
                    </div>
                )}

                {/* 🔹 MENSAJE SI NO HAY RESULTADOS */}
                {filteredPosts.length === 0 && (
                    <div className="text-center py-5">
                        <div className="text-muted">
                            <i className="fas fa-search fa-2x mb-3"></i>
                            <p className="mb-1">
                                {filters && Object.keys(filters).length > 0 
                                    ? "No se encontraron viajes que coincidan con tu búsqueda." 
                                    : "No hay viajes disponibles en este momento."}
                            </p>
                            {filters && Object.keys(filters).length > 0 && (
                                <small>Intenta ajustar los filtros de búsqueda</small>
                            )}
                        </div>
                    </div>
                )}

                {/* 🔹 MOSTRAR POSTS FILTRADOS */}
                {filteredPosts.map(post => (
                    <PostCard key={post._id} post={post} theme={theme} />
                ))}

                {/* 🔹 ÍCONO DE CARGA */}
                {load && (
                    <div className="text-center py-3">
                        <img src={LoadIcon} alt="loading" className="d-block mx-auto" />
                        <small className="text-muted">Cargando más viajes...</small>
                    </div>
                )}
            </div>

            {/* 🔹 BOTÓN "LOAD MORE" (solo en home normal) */}
            {shouldShowLoadMore() && (
                <LoadMoreBtn
                    result={homePosts.result}
                    page={homePosts.page}
                    load={load}
                    handleLoadMore={handleLoadMore}
                />
            )}
        </div>
    );
};

export default Posts;