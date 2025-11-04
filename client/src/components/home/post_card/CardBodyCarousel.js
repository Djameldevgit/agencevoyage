import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import LikeButton from '../../LikeButton';
import { useSelector, useDispatch } from 'react-redux';
import { likePost, unLikePost, savePost, unSavePost, deletePost } from '../../../redux/actions/postAction';
import Carousel from '../../Carousel';
import AuthModalAddLikesCommentsSave from '../../AuthModalAddLikesCommentsSave';
import CardFooterPost from './CardFooterPost';
import ShareModal from '../../ShareModal';
import { BASE_URL } from '../../../utils/config'

const CardBodyCarousel = ({ post }) => {
    const history = useHistory();
    const [isLike, setIsLike] = useState(false);
    const [loadLike, setLoadLike] = useState(false);
    const { auth, socket } = useSelector(state => state);
    const dispatch = useDispatch();
    const [saved, setSaved] = useState(false);
    const [saveLoad, setSaveLoad] = useState(false);
    const [showAuthModal, setShowAuthModal] = useState(false);
    const [isShare, setIsShare] = useState(false);

    // Nuevos estados para edición y eliminación
    const [showOptions, setShowOptions] = useState(false);
    const [isDeleting, setIsDeleting] = useState(false);

    // Verificar si el usuario actual es el dueño del post
    const isPostOwner = auth.user && post.user && auth.user._id === post.user._id;
    // Verificar si el usuario es admin
    const isAdmin = auth.user && auth.user.role === "admin";

    // Likes
    useEffect(() => {
        if (post.likes.find(like => like._id === auth.user?._id)) {
            setIsLike(true);
        } else {
            setIsLike(false);
        }
    }, [post.likes, auth.user?._id]);

    // ========== FUNCIONES PARA FORMATEAR DATOS DEL VIAJE ==========

    // Función para formatear la fecha
    const formatDate = (dateString) => {
        if (!dateString) return 'Fecha no especificada';

        const options = {
            day: 'numeric',
            month: 'short',
            year: 'numeric'
        };
        return new Date(dateString).toLocaleDateString('es-ES', options);
    };

    // Función para obtener el icono según la subcategoría
    const getSubCategoryIcon = (subCategory) => {
        const icons = {
            'location vacances': '🏖️',
            'hadj': '🕋',
            'omra': '🕋',
            'voyage affaires': '💼',
            'tourisme': '🗺️',
            'aventure': '🧭',
            'culturel': '🏛️',
            'balnéaire': '🌊',
            'montagne': '⛰️',
            'désert': '🏜️'
        };
        return icons[subCategory] || '✈️';
    };

    // Función para formatear la subcategoría
    const formatSubCategory = (subCategory) => {
        const categories = {
            'location vacances': 'Location Vacances',
            'hadj': 'Hadj',
            'omra': 'Omra',
            'voyage affaires': 'Voyage Affaires',
            'tourisme': 'Tourisme',
            'aventure': 'Aventure',
            'culturel': 'Culturel',
            'balnéaire': 'Balnéaire',
            'montagne': 'Montagne',
            'désert': 'Désert'
        };
        return categories[subCategory] || subCategory;
    };

    const handleCommentClick = () => {
        if (!auth.token) {
            setShowAuthModal(true);
        } else {
            history.push(`/post/${post._id}`);
        }
    };

    const handleLike = async (e) => {
        e.stopPropagation();
        if (!auth.user) {
            setShowAuthModal(true);
            return;
        }
        if (loadLike) return;
        setLoadLike(true);
        await dispatch(likePost({ post, auth, socket }));
        setLoadLike(false);
    };

    const handleUnLike = async (e) => {
        e.stopPropagation();
        if (!auth.user) {
            setShowAuthModal(true);
            return;
        }
        if (loadLike) return;
        setLoadLike(true);
        await dispatch(unLikePost({ post, auth, socket }));
        setLoadLike(false);
    };

    // Saved
    useEffect(() => {
        if (auth.user?.saved.find(id => id === post._id)) {
            setSaved(true);
        } else {
            setSaved(false);
        }
    }, [auth.user?.saved, post._id]);

    const handleSavePost = async (e) => {
        e.stopPropagation();
        if (!auth.user) {
            setShowAuthModal(true);
            return;
        }
        if (saveLoad) return;
        setSaveLoad(true);
        await dispatch(savePost({ post, auth }));
        setSaveLoad(false);
    };

    const handleUnSavePost = async (e) => {
        e.stopPropagation();
        if (!auth.user) {
            setShowAuthModal(true);
            return;
        }
        if (saveLoad) return;
        setSaveLoad(true);
        await dispatch(unSavePost({ post, auth }));
        setSaveLoad(false);
    };

    // ========== FUNCIONES PARA EDICIÓN Y ELIMINACIÓN ==========

    const handleEditPost = (e) => {
        e.stopPropagation();
        if (!auth.user) {
            setShowAuthModal(true);
            return;
        }

        // LÓGICA CORRECTA PARA EDITAR POST
        history.push('/createpost', {
            isEdit: true,
            postData: post
        });

        // También dispatch al estado global si es necesario
        dispatch({
            type: 'GLOBALTYPES.STATUS',
            payload: { ...post, onEdit: true }
        });

        setShowOptions(false);
    };

    const handleDeletePost = async (e) => {
        e.stopPropagation();
        if (!auth.user) {
            setShowAuthModal(true);
            return;
        }

        // Confirmación antes de eliminar
        if (window.confirm('¿Estás seguro de que quieres eliminar esta publicación?')) {
            setIsDeleting(true);
            try {
                await dispatch(deletePost({ post, auth, socket }));
                // El post se eliminará automáticamente del estado global
            } catch (error) {
                console.error('Error al eliminar el post:', error);
            } finally {
                setIsDeleting(false);
                setShowOptions(false);
            }
        }
    };

    // ========== FUNCIÓN PARA CHAT CON LA AGENCIA ==========

    const handleChatWithAgency = (e) => {
        e.stopPropagation();

        if (!auth.user) {
            setShowAuthModal(true);
            return;
        }

        // Verificar que exista el usuario del post (agencia)
        if (!post.user || !post.user._id) {
            alert('No se puede contactar con esta agencia');
            return;
        }

        // Lógica para iniciar chat con la agencia
        dispatch({
            type: 'MESS_TYPES.ADD_USER',
            payload: {
                ...post.user,
                text: '',
                media: []
            }
        });

        // Redirigir al chat
        history.push(`/message/${post.user._id}`);
        setShowOptions(false);
    };

    // ========== FUNCIÓN PARA VER PERFIL DE LA AGENCIA ==========

    const handleViewAgencyProfile = (e) => {
        e.stopPropagation();

        if (!post.user || !post.user._id) {
            alert('No se puede ver el perfil de esta agencia');
            return;
        }

        history.push(`/profile/${post.user._id}`);
        setShowOptions(false);
    };

    const handleOptionsClick = (e) => {
        e.stopPropagation();
        setShowOptions(!showOptions);
    };

    // Cerrar el modal de opciones al hacer click fuera
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (showOptions && !event.target.closest('.card__options-container')) {
                setShowOptions(false);
            }
        };

        document.addEventListener('click', handleClickOutside);
        return () => {
            document.removeEventListener('click', handleClickOutside);
        };
    }, [showOptions]);

    const redirectToLogin = () => {
        history.push('/login');
        setShowAuthModal(false);
    };

    const redirectToRegister = () => {
        history.push('/register');
        setShowAuthModal(false);
    };

    const closeModal = () => setShowAuthModal(false);

    return (
        <>
            <div className="card">
                {/* Header con información del viaje */}
                <div className="card__header">
                    <div className="card__user-info">

                        <div className="card__travel-details">
                            {/* Primera fila: Subcategoría con icono */}
                            <div className="card__subcategory">
                                <span className="card__subcategory-icon">
                                    {getSubCategoryIcon(post.subCategory)}
                                </span>
                                <span className="card__subcategory-text">
                                    {formatSubCategory(post.subCategory)}
                                </span> Le
                                <span className="card__travel-date">
                                    {formatDate(post.datedepar)}
                                </span>


                            </div>

                            {/* Segunda fila: Fecha de départ → Wilaya → Destinación */}
                            <div className="card__travel-route">

                                <span className="card__travel-arrow">→</span>
                                <span className="card__travel-wilaya">
                                    {post.wilaya || 'Lieu de départ'}
                                </span>
                                <span className="card__travel-arrow">→</span>
                                <span className="card__travel-destination">
                                    {post.destinacionlocacionvoyage || post.destinacionomra || post.destinacionvoyageorganise}    </span>
                            </div>
                        </div>
                    </div>

                    {/* BOTÓN DE TRES PUNTOS - Disponible para todos */}
                    <div className="card__options-container mb-4" >
                        <button
                            className="card__options-btn"
                            onClick={handleOptionsClick}
                            disabled={isDeleting}
                        >
                            <i className="fas fa-ellipsis-h"></i>
                        </button>

                        {/* MODAL DE OPCIONES */}
                        {showOptions && (
                            <div className="card__options-modal">
                                {/* OPCIÓN 1: Contactar con la agencia (para todos excepto el dueño) */}
                                {!isPostOwner && (
                                    <button
                                        className="card__option-item card__option-chat"
                                        onClick={handleChatWithAgency}
                                    >
                                        <i className="fas fa-comments"></i>
                                        Contactar con la agencia
                                    </button>
                                )}

                                {/* OPCIÓN 2: Ver perfil de la agencia (para todos) */}
                                <button
                                    className="card__option-item card__option-profile"
                                    onClick={handleViewAgencyProfile}
                                >
                                    <i className="fas fa-building"></i>
                                    Ver perfil de la agencia
                                </button>

                                {/* OPCIÓN 3: Editar post (solo para dueño y admin) */}
                                {(isPostOwner || isAdmin) && (
                                    <button
                                        className="card__option-item card__option-edit"
                                        onClick={handleEditPost}
                                    >
                                        <i className="fas fa-edit"></i>
                                        {isAdmin && !isPostOwner ? 'Editar publicación (Admin)' : 'Editar publicación'}
                                    </button>
                                )}

                                {/* OPCIÓN 4: Eliminar post (solo para dueño y admin) */}
                                {(isPostOwner || isAdmin) && (
                                    <button
                                        className="card__option-item card__option-delete"
                                        onClick={handleDeletePost}
                                        disabled={isDeleting}
                                    >
                                        <i className="fas fa-trash"></i>
                                        {isDeleting ? 'Eliminando...' : (isAdmin && !isPostOwner ? 'Eliminar publicación (Admin)' : 'Eliminar publicación')}
                                    </button>
                                )}

                                {/* Divisor antes de compartir */}
                                <div className="card__option-divider"></div>

                                {/* OPCIÓN 5: Compartir publicación (para todos) */}
                                <button
                                    className="card__option-item card__option-share"
                                    onClick={() => {
                                        setIsShare(true);
                                        setShowOptions(false);
                                    }}
                                >
                                    <i className="fas fa-share"></i>
                                    Compartir publicación
                                </button>
                            </div>
                        )}
                    </div>
                </div>

                {/* Imagen del post con carousel */}
                <div className="card__image" onClick={() => history.push(`/post/${post._id}`)}>
                    <Carousel images={post.images} id={post._id} />
                </div>

                {/* Acciones del post (likes, comentarios, share, save) */}
                <div className="card__actions">
                    <div className="card__actions-left">
                        <LikeButton
                            isLike={isLike}
                            handleLike={handleLike}
                            handleUnLike={handleUnLike}
                        />
                        <span className="card__action-count">{post.likes.length}</span>

                        <i className="far fa-comment card__action-icon" onClick={handleCommentClick} />
                        <span className="card__action-count">{post.comments.length}</span>

                        <i className="fas fa-share card__action-icon" onClick={() => setIsShare(!isShare)} />
                    </div>

                    <div className="card__actions-right">
                        {saved
                            ? <i className="fas fa-bookmark card__action-icon" onClick={handleUnSavePost} />
                            : <i className="far fa-bookmark card__action-icon" onClick={handleSavePost} />
                        }
                        <span className="card__action-count">{post.saves || 0}</span>
                    </div>
                </div>

                {/* Modal de compartir */}
                {isShare && <ShareModal url={`${BASE_URL}/post/${post._id}`} />}

                {/* Footer del post */}
                <CardFooterPost post={post} />
            </div>

            {/* Modal de autenticación */}
            <AuthModalAddLikesCommentsSave
                showModal={showAuthModal}
                closeModal={closeModal}
                redirectToLogin={redirectToLogin}
                redirectToRegister={redirectToRegister}
            />

            {/* Estilos CSS */}
            <style jsx>{`
                .card {
                    position: relative;
                    background: white;
                    border-radius: 12px;
                    overflow: hidden;
                    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
                    margin-bottom: 20px;
                    transition: box-shadow 0.2s ease;
                }

                .card:hover {
                    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
                }

                .card__header {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    padding: 12px 16px;
                    border-bottom: 1px solid #f0f0f0;
                }

                .card__user-info {
                    display: flex;
                    align-items: center;
                    gap: 12px;
                    flex: 1;
                }

                .card__avatar {
                    width: 40px;
                    height: 40px;
                    border-radius: 50%;
                    object-fit: cover;
                    cursor: pointer;
                    border: 2px solid #f8f9fa;
                    transition: transform 0.2s ease;
                    flex-shrink: 0;
                }

                .card__avatar:hover {
                    transform: scale(1.05);
                }

                .card__travel-details {
                    display: flex;
                    flex-direction: column;
                    gap: 4px;
                    flex: 1;
                    min-width: 0;
                }

                .card__subcategory {
                    display: flex;
                    align-items: center;
                    gap: 6px;
                    font-size: 14px;
                    font-weight: 600;
                    color: #333;
                }

                .card__subcategory-icon {
                    font-size: 16px;
                }

                .card__subcategory-text {
                    white-space: nowrap;
                    overflow: hidden;
                    text-overflow: ellipsis;
                }

                .card__travel-route {
                    display: flex;
                    align-items: center;
                    gap: 6px;
                    font-size: 12px;
                    color: #666;
                    flex-wrap: wrap;
                }

                .card__travel-date {
                    font-weight: 500;
                    color: #e74c3c;
                    background: #fdf2f2;
                    padding: 2px 6px;
                    border-radius: 4px;
                    white-space: nowrap;
                }

                .card__travel-arrow {
                    color: #999;
                    font-weight: bold;
                }

                .card__travel-wilaya {
                    font-weight: 500;
                    color: #3498db;
                    background: #f0f8ff;
                    padding: 2px 6px;
                    border-radius: 4px;
                    white-space: nowrap;
                }

                .card__travel-destination {
                    font-weight: 500;
                    color: #27ae60;
                    background: #f0f9f4;
                    padding: 2px 6px;
                    border-radius: 4px;
                    white-space: nowrap;
                }

                .card__options-container {
                    position: relative;
                    flex-shrink: 0;
                }

                .card__options-btn {
                    background: none;
                    border: none;
                    color: #666;
                    cursor: pointer;
                    padding: 8px 12px;
                    border-radius: 50%;
                    transition: all 0.2s ease;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    width: 36px;
                    height: 36px;
                }

                .card__options-btn:hover {
                    background: #f8f9fa;
                    color: #333;
                }

                .card__options-btn:disabled {
                    opacity: 0.6;
                    cursor: not-allowed;
                }

                .card__options-modal {
                    position: absolute;
                    top: 100%;
                    right: 0;
                    background: white;
                    border-radius: 8px;
                    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
                    padding: 8px 0;
                    min-width: 240px;
                    z-index: 1000;
                    animation: fadeIn 0.2s ease;
                    border: 1px solid #e9ecef;
                }

                .card__option-item {
                    display: flex;
                    align-items: center;
                    gap: 12px;
                    width: 100%;
                    padding: 12px 16px;
                    background: none;
                    border: none;
                    text-align: left;
                    font-size: 14px;
                    cursor: pointer;
                    transition: background 0.2s ease;
                }

                .card__option-item:hover {
                    background: #f8f9fa;
                }

                .card__option-item:disabled {
                    opacity: 0.6;
                    cursor: not-allowed;
                }

                .card__option-chat {
                    color: #28a745;
                }

                .card__option-chat:hover {
                    color: #218838;
                }

                .card__option-profile {
                    color: #6f42c1;
                }

                .card__option-profile:hover {
                    color: #5a359c;
                }

                .card__option-edit {
                    color: #007bff;
                }

                .card__option-edit:hover {
                    color: #0056b3;
                }

                .card__option-delete {
                    color: #e74c3c;
                }

                .card__option-delete:hover {
                    color: #c0392b;
                }

                .card__option-share {
                    color: #17a2b8;
                }

                .card__option-share:hover {
                    color: #138496;
                }

                .card__option-divider {
                    height: 1px;
                    background: #e9ecef;
                    margin: 8px 0;
                }

                .card__image {
                    cursor: pointer;
                    background: #f8f9fa;
                }

                .card__actions {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    padding: 12px 16px;
                    border-bottom: 1px solid #f0f0f0;
                }

                .card__actions-left,
                .card__actions-right {
                    display: flex;
                    align-items: center;
                    gap: 16px;
                }

                .card__action-icon {
                    font-size: 20px;
                    cursor: pointer;
                    color: #666;
                    transition: all 0.2s ease;
                    padding: 4px;
                    border-radius: 4px;
                }

                .card__action-icon:hover {
                    color: #333;
                    background: #f8f9fa;
                }

                .card__action-count {
                    font-size: 14px;
                    color: #666;
                    font-weight: 500;
                    min-width: 20px;
                }

                @keyframes fadeIn {
                    from {
                        opacity: 0;
                        transform: translateY(-10px);
                    }
                    to {
                        opacity: 1;
                        transform: translateY(0);
                    }
                }

                /* Responsive */
                @media (max-width: 768px) {
                    .card__header {
                        padding: 10px 12px;
                    }

                    .card__travel-route {
                        font-size: 11px;
                        gap: 4px;
                    }

                    .card__subcategory {
                        font-size: 13px;
                    }

                    .card__actions {
                        padding: 10px 12px;
                    }

                    .card__actions-left,
                    .card__actions-right {
                        gap: 12px;
                    }

                    .card__action-icon {
                        font-size: 18px;
                    }

                    .card__options-modal {
                        min-width: 220px;
                    }
                }

                @media (max-width: 480px) {
                    .card__travel-route {
                        flex-direction: column;
                        align-items: flex-start;
                        gap: 2px;
                    }

                    .card__travel-arrow {
                        display: none;
                    }

                    .card__travel-date,
                    .card__travel-wilaya,
                    .card__travel-destination {
                        margin-right: 4px;
                    }
                }
            `}</style>
        </>
    );
};

export default CardBodyCarousel;