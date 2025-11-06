import React, { useState, useEffect } from "react";
import { useLocation, useHistory } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useSelector, useDispatch } from "react-redux";
import moment from "moment";
import ShareModal from './ShareModal';
import { deletePost } from '../../../redux/actions/postAction';

// Configurar moment para soportar múltiples idiomas
import 'moment/locale/fr';
import 'moment/locale/ar';

const CardBodyTitle = ({ post }) => {
    const location = useLocation();
    const history = useHistory();
    const { t, i18n } = useTranslation(['common', 'cardbody']);
    const { auth, socket } = useSelector(state => state);
    const dispatch = useDispatch();
    
    const isRTL = i18n.language === 'ar' || i18n.language === 'ara';
    const isDetailPage = location.pathname === `/post/${post._id}`;
    const [showDropdown, setShowDropdown] = useState(false);
    const [showShareModal, setShowShareModal] = useState(false);
    const [showAuthModal, setShowAuthModal] = useState(false);
    const [isDeleting, setIsDeleting] = useState(false);

    // Configurar moment con el idioma actual - SIMPLIFICADO
    useEffect(() => {
        // Usar siempre formato francés para evitar caracteres árabes
        moment.locale('fr');
    }, [i18n.language]);

    // Verificar permisos
    const isSuperUtilisateur = auth.user?.role === "Super-utilisateur";
    const isAdmin = auth.user?.role === "admin";
    const isPostOwner = auth.user && post && auth.user._id === post.user?._id;
    const hasAdminRights = isSuperUtilisateur || isAdmin;

    // ========== EFFECTS ==========

    // Cerrar dropdown al hacer click fuera
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (showDropdown && !event.target.closest('.dropdown-container')) {
                setShowDropdown(false);
            }
        };

        document.addEventListener('click', handleClickOutside);
        return () => {
            document.removeEventListener('click', handleClickOutside);
        };
    }, [showDropdown]);

    // ========== FUNCIONES DE FORMATEO SIMPLIFICADAS ==========

    const formatDate = (dateString) => {
        if (!dateString) return '';
        
        // ✅ FORMATO SIMPLIFICADO - siempre en francés/normal
        return moment(dateString).format('DD/MM/YYYY');
    };

    const getDayName = (dateString) => {
        if (!dateString) return '';
        
        // ✅ Días en formato simple (siempre en francés)
        const days = {
            'Monday': 'Lun',
            'Tuesday': 'Mar', 
            'Wednesday': 'Mer',
            'Thursday': 'Jeu',
            'Friday': 'Ven',
            'Saturday': 'Sam',
            'Sunday': 'Dim'
        };
        
        const day = moment(dateString).format('dddd');
        return days[day] || day;
    };

    const getSubCategoryIcon = (subCategory) => {
        const icons = {
            'Location_Vacances': '🏖️',
            'hadj_Omra': '🕋',
            'Voyage Organise': '✈️',
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

    // 🔥 NUEVA FUNCIÓN: Traducir subCategory
    const translateSubCategory = (subCategory) => {
        const translations = {
            'Location_Vacances': t('categories.locationVacances', 'Location de Vacances'),
            'hadj_Omra': t('categories.hajjUmrah', 'Hajj & Omra'),
            'Voyage Organise': t('categories.voyageOrganise', 'Voyage Organisé'),
            'voyage affaires': t('categories.businessTrip', 'Voyage d\'Affaires'),
            'tourisme': t('categories.tourism', 'Tourisme'),
            'aventure': t('categories.adventure', 'Aventure'),
            'culturel': t('categories.cultural', 'Culturel'),
            'balnéaire': t('categories.beach', 'Balnéaire'),
            'montagne': t('categories.mountain', 'Montagne'),
            'désert': t('categories.desert', 'Désert')
        };
        
        return translations[subCategory] || subCategory || t('noCategory', 'Sans catégorie');
    };

    // 🔥 FUNCIÓN MEJORADA: Redirigir a PropertyMap
    const handleSubCategoryClick = (e) => {
        e.stopPropagation(); // Prevenir que se propague el evento
        
        // Redirigir a /PropertyMap con datos del post
        history.push('/PropertyMap', { 
            postData: post,
            from: 'CardBodyTitle',
            subCategory: post.subCategory
        });
    };

    // 🔥 NUEVA FUNCIÓN: Redirigir desde el ícono del mapa
    const handleMapIconClick = (e) => {
        e.stopPropagation();
        
        history.push('/map', { 
            postData: post,
            from: 'MapIcon',
            destinacion: post.destinacion
        });
    };

    // ========== FUNCIONES DEL DROPDOWN ==========

    const handleChatWithAgency = () => {
        if (!auth.user) {
            setShowAuthModal(true);
            return;
        }

        if (!post.user || !post.user._id) {
            alert(t('agency.contactError', 'No se puede contactar con esta agencia'));
            return;
        }

        // ✅ AGREGAR USUARIO PARA CHAT
        dispatch({
            type: 'MESS_TYPES.ADD_USER',
            payload: {
                ...post.user,
                text: '',
                media: []
            }
        });

        history.push(`/message/${post.user._id}`);
        setShowDropdown(false);
    };

    const handleViewAgencyProfile = () => {
        if (!post.user || !post.user._id) {
            alert(t('agency.profileError', 'No se puede ver el perfil de esta agencia'));
            return;
        }

        history.push(`/profile/${post.user._id}`);
        setShowDropdown(false);
    };

    const handleEditPost = () => {
        if (!auth.user) {
            setShowAuthModal(true);
            return;
        }

        history.push('/createpost', {
            isEdit: true,
            postData: post
        });

        dispatch({
            type: 'GLOBALTYPES.STATUS',
            payload: { ...post, onEdit: true }
        });

        setShowDropdown(false);
    };

    const handleDeletePost = async () => {
        if (!auth.user) {
            setShowAuthModal(true);
            return;
        }

        if (window.confirm(t('post.deleteConfirmation', '¿Estás seguro de que quieres eliminar esta publicación?'))) {
            setIsDeleting(true);
            try {
                await dispatch(deletePost({ post, auth, socket }));
            } catch (error) {
                console.error('Error al eliminar el post:', error);
            } finally {
                setIsDeleting(false);
                setShowDropdown(false);
            }
        }
    };

    const handleFollowAgency = () => {
        console.log("Seguir agencia:", post.user?._id);
        setShowDropdown(false);
    };

    const handleSharePost = () => {
        setShowShareModal(true);
        setShowDropdown(false);
    };

    const handleViewDetails = () => {
        history.push(`/post/${post._id}`);
        setShowDropdown(false);
    };

    // ========== OPCIONES DEL DROPDOWN ==========

    const getDropdownOptions = () => {
        const options = [];

        // Opciones de administración
        if (hasAdminRights) {
            options.push(
                { icon: "create", text: t('editPost', 'Modifier le post'), action: handleEditPost },
                { icon: "delete_outline", text: t('deletePost', 'Supprimer le post'), action: handleDeletePost }
            );
        }

        // Opciones del dueño del post
        if (isPostOwner) {
            options.push(
                { icon: "create", text: t('editPost', 'Modifier le post'), action: handleEditPost },
                { icon: "delete_outline", text: t('deletePost', 'Supprimer le post'), action: handleDeletePost }
            );
        }

        // Opciones para todos los usuarios autenticados
        if (auth.user) {
            options.push(
                { icon: "chat", text: t('writeToAgency', 'Écrire à l\'agence'), action: handleChatWithAgency },
                { icon: "person_add", text: t('followAgency', 'Suivre l\'agence'), action: handleFollowAgency },
                { icon: "share", text: t('sharePost', 'Partager'), action: handleSharePost },
                { icon: "info", text: t('viewDetails', 'Voir détails'), action: handleViewDetails }
            );
        }

        // Eliminar duplicados
        return options.filter((option, index, self) => 
            index === self.findIndex(o => o.text === option.text)
        );
    };

    const dropdownOptions = getDropdownOptions();

    const handleOptionClick = (action) => {
        action();
        setShowDropdown(false);
    };

    const DropdownItem = ({ icon, text, onClick, isDanger = false }) => (
        <div 
            style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                padding: '10px 12px',
                cursor: 'pointer',
                transition: 'background-color 0.2s ease',
                borderBottom: '1px solid #f1f5f9',
                fontSize: '14px',
                color: isDanger ? '#e53e3e' : '#4a5568'
            }}
            onClick={onClick}
            onMouseEnter={(e) => e.target.style.backgroundColor = '#f7fafc'}
            onMouseLeave={(e) => e.target.style.backgroundColor = 'transparent'}
        >
            <span className="material-icons" style={{ fontSize: '18px', width: '24px' }}>
                {icon}
            </span>
            <span>{text}</span>
        </div>
    );

    return (
        <div className="cardtitle" style={{ direction: isRTL ? 'rtl' : 'ltr' }}>
            <div className="card-header" style={{ padding: '16px 20px', borderBottom: '1px solid #e2e8f0' }}>
                {!isDetailPage && (
                    <div style={{ width: '100%' }}>
                        {/* Línea 1: Subcategoría con dropdown y destino */}
                        <div style={{ 
                            display: 'flex', 
                            alignItems: 'center', 
                            justifyContent: 'space-between',
                            marginBottom: '8px',
                            flexWrap: 'wrap',
                            gap: '8px',
                            position: 'relative'
                        }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flex: 1 }}>
                                {/* Badge de subcategoría con dropdown - AHORA CON ONCLICK */}
                                <div className="dropdown-container" style={{ position: 'relative', display: 'inline-block' }}>
                                    <div 
                                        style={{ 
                                            display: 'flex', 
                                            alignItems: 'center', 
                                            gap: '6px',
                                            backgroundColor: '#edf2f7',
                                            padding: '4px 8px 4px 12px',
                                            borderRadius: '20px',
                                            border: '1px solid #e2e8f0',
                                            cursor: 'pointer', // Siempre clickable para PropertyMap
                                            transition: 'all 0.2s ease',
                                            minWidth: 'fit-content'
                                        }}
                                        onClick={handleSubCategoryClick} // 🔥 CLICK PARA PROPERTYMAP
                                        onMouseEnter={() => auth.user && setShowDropdown(true)}
                                        title="Voir sur la carte" // Tooltip
                                    >
                                        <span style={{ 
                                            fontSize: '14px', 
                                            fontWeight: '600', 
                                            color: '#2d3748'
                                        }}>
                                            {getSubCategoryIcon(post.subCategory)} {translateSubCategory(post.subCategory)}
                                        </span>
                                        {auth.user && (
                                            <i className={`fas fa-chevron-${showDropdown ? 'up' : 'down'}`} 
                                               style={{ 
                                                   fontSize: '10px', 
                                                   color: '#718096',
                                                   transition: 'transform 0.2s ease'
                                               }}></i>
                                        )}
                                    </div>

                                    {/* Dropdown Menu - Solo para usuarios autenticados */}
                                    {showDropdown && auth.user && (
                                        <div style={{
                                            position: 'absolute',
                                            top: '100%',
                                            [isRTL ? 'right' : 'left']: '0',
                                            marginTop: '4px',
                                            backgroundColor: 'white',
                                            border: '1px solid #e2e8f0',
                                            borderRadius: '8px',
                                            boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
                                            minWidth: '240px',
                                            zIndex: 1000,
                                            overflow: 'hidden'
                                        }}
                                        onMouseLeave={() => setShowDropdown(false)}
                                        >
                                            {dropdownOptions.map((option, index) => (
                                                <DropdownItem
                                                    key={index}
                                                    icon={option.icon}
                                                    text={option.text}
                                                    onClick={() => handleOptionClick(option.action)}
                                                    isDanger={option.icon === 'delete_outline'}
                                                />
                                            ))}
                                        </div>
                                    )}
                                </div>
                                
                                {post.destinacion && (
                                    <>
                                        <span style={{ color: '#a0aec0' }}>•</span>
                                        <div 
                                            style={{ 
                                                display: 'flex', 
                                                alignItems: 'center', 
                                                gap: '4px',
                                                cursor: 'pointer', // 🔥 HACER CLICKABLE
                                                transition: 'color 0.2s ease'
                                            }}
                                            onClick={handleMapIconClick} // 🔥 CLICK PARA PROPERTYMAP
                                            title="Voir la destination sur la carte" // Tooltip
                                        >
                                            <i className="fas fa-map-marker-alt" style={{ 
                                                color: '#e53e3e', 
                                                fontSize: '12px',
                                                transition: 'transform 0.2s ease'
                                            }}></i>
                                            <span style={{ 
                                                fontSize: '14px', 
                                                fontWeight: '500', 
                                                color: '#4a5568'
                                            }}>
                                                {post.destinacion}
                                            </span>
                                        </div>
                                    </>
                                )}
                            </div>
                        </div>

                        {/* Línea 2: Fecha y ubicación - SIMPLIFICADA */}
                        <div style={{ 
                            display: 'flex', 
                            alignItems: 'center', 
                            gap: '12px',
                            flexWrap: 'wrap',
                            fontSize: '13px',
                            color: '#718096'
                        }}>
                            {post.datedepar && (
                                <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                                    <i className="far fa-calendar-alt" style={{ fontSize: '12px' }}></i>
                                    <span style={{ fontWeight: '500' }}>
                                        {t('departure', 'Départ')} {formatDate(post.datedepar)}
                                    </span>
                                    <span style={{ color: '#cbd5e0', fontSize: '12px' }}>
                                        ({getDayName(post.datedepar)})
                                    </span>
                                </div>
                            )}
                            
                            {post.wilaya && (
                                <>
                                    <span style={{ color: '#e2e8f0' }}>|</span>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                                        <i className="fas fa-map-pin" style={{ fontSize: '10px' }}></i>
                                        <span>
                                            {post.wilaya}
                                            {post.commune && `, ${post.commune}`}
                                        </span>
                                    </div>
                                </>
                            )}
                        </div>
                    </div>
                )}
            </div>

            {/* Vista para página de detalle - AHORA TAMBIÉN CON ONCLICK */}
            {isDetailPage && (
                <div style={{ padding: '20px' }}>
                    {/* Subcategoría clickeable */}
                    <h2 
                        style={{ 
                            fontSize: '24px', 
                            fontWeight: '700', 
                            color: '#2d3748',
                            marginBottom: '8px',
                            textAlign: isRTL ? 'right' : 'left',
                            cursor: 'pointer',
                            display: 'inline-block',
                            transition: 'color 0.2s ease',
                            padding: '8px 12px',
                            borderRadius: '8px'
                        }}
                        onClick={handleSubCategoryClick}
                        onMouseEnter={(e) => {
                            e.target.style.color = '#1e88e5';
                            e.target.style.backgroundColor = '#f0f9ff';
                        }}
                        onMouseLeave={(e) => {
                            e.target.style.color = '#2d3748';
                            e.target.style.backgroundColor = 'transparent';
                        }}
                        title="Voir sur la carte"
                    >
                        {getSubCategoryIcon(post.subCategory)} {translateSubCategory(post.subCategory)}
                    </h2>
                    
                    {post.destinacion && (
                        <div 
                            style={{ 
                                display: 'flex', 
                                alignItems: 'center', 
                                gap: '8px',
                                marginBottom: '12px',
                                fontSize: '16px',
                                color: '#4a5568',
                                cursor: 'pointer',
                                padding: '6px 10px',
                                borderRadius: '6px',
                                transition: 'all 0.2s ease'
                            }}
                            onClick={handleMapIconClick}
                            onMouseEnter={(e) => {
                                e.target.style.color = '#1e88e5';
                                e.target.style.backgroundColor = '#f0f9ff';
                            }}
                            onMouseLeave={(e) => {
                                e.target.style.color = '#4a5568';
                                e.target.style.backgroundColor = 'transparent';
                            }}
                            title="Voir la destination sur la carte"
                        >
                            <i className="fas fa-map-marker-alt" style={{ color: '#e53e3e' }}></i>
                            <span>{post.destinacion}</span>
                        </div>
                    )}

                    {/* Fechas simplificadas */}
                    {post.datedepar && (
                        <div style={{ 
                            display: 'flex', 
                            alignItems: 'center', 
                            gap: '16px',
                            marginTop: '12px',
                            fontSize: '14px',
                            color: '#718096'
                        }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                                <i className="far fa-calendar-alt"></i>
                                <span>
                                    <strong>Départ:</strong> {formatDate(post.datedepar)} ({getDayName(post.datedepar)})
                                </span>
                            </div>
                        </div>
                    )}
                </div>
            )}

            {/* Modal de Share */}
            {showShareModal && (
                <ShareModal 
                    url={`${window.location.origin}/post/${post._id}`}
                    onClose={() => setShowShareModal(false)}
                />
            )}

            {/* Modal de autenticación simplificado */}
            {showAuthModal && (
                <div style={{
                    position: 'fixed',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    backgroundColor: 'rgba(0,0,0,0.5)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    zIndex: 10000
                }}>
                    <div style={{
                        backgroundColor: 'white',
                        padding: '20px',
                        borderRadius: '12px',
                        textAlign: 'center',
                        minWidth: '300px'
                    }}>
                        <h3 style={{ marginBottom: '16px', color: '#2d3748' }}>
                            {t('auth.required', 'Authentification Requise')}
                        </h3>
                        <p style={{ marginBottom: '20px', color: '#718096' }}>
                            {t('auth.loginToContinue', 'Veuillez vous connecter pour continuer')}
                        </p>
                        <div style={{ display: 'flex', gap: '12px', justifyContent: 'center' }}>
                            <button
                                onClick={() => history.push('/login')}
                                style={{
                                    padding: '10px 20px',
                                    backgroundColor: '#4a5568',
                                    color: 'white',
                                    border: 'none',
                                    borderRadius: '6px',
                                    cursor: 'pointer'
                                }}
                            >
                                {t('auth.login', 'Connexion')}
                            </button>
                            <button
                                onClick={() => history.push('/register')}
                                style={{
                                    padding: '10px 20px',
                                    backgroundColor: '#e2e8f0',
                                    color: '#4a5568',
                                    border: 'none',
                                    borderRadius: '6px',
                                    cursor: 'pointer'
                                }}
                            >
                                {t('auth.register', 'Inscription')}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default CardBodyTitle;