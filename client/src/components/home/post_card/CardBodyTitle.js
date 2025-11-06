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
        return moment(dateString).format('DD/MM/YYYY');
    };

    const getDayName = (dateString) => {
        if (!dateString) return '';
        
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

    // 🔥 FUNCIÓN: Traducir subCategory
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

    // 🔥 FUNCIÓN CORREGIDA: Solo destinacion redirige al mapa
    const handleDestinationClick = (e) => {
        e.stopPropagation();
        
        history.push('/PropertyMap', { 
            postData: post,
            from: 'Destination'
        });
    };

    // 🔥 FUNCIÓN: Manejar click en subcategoría (SOLO para dropdown)
    const handleSubCategoryClick = (e) => {
        e.stopPropagation();
        if (auth.user) {
            setShowDropdown(!showDropdown);
        }
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
            alert(t('agency.profileError', 'No se puede ver el profil de cette agence'));
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

        if (window.confirm(t('post.deleteConfirmation', 'Êtes-vous sûr de vouloir supprimer cette publication?'))) {
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
                padding: '12px 16px',
                cursor: 'pointer',
                transition: 'background-color 0.2s ease',
                borderBottom: '1px solid #f1f5f9',
                fontSize: '15px',
                color: isDanger ? '#e53e3e' : '#4a5568'
            }}
            onClick={onClick}
            onMouseEnter={(e) => e.target.style.backgroundColor = '#f7fafc'}
            onMouseLeave={(e) => e.target.style.backgroundColor = 'transparent'}
        >
            <span className="material-icons" style={{ fontSize: '20px', width: '24px' }}>
                {icon}
            </span>
            <span>{text}</span>
        </div>
    );

    return (
        <div className="cardtitle" style={{ direction: isRTL ? 'rtl' : 'ltr' }}>
            <div className="card-header" style={{ padding: '20px', borderBottom: '1px solid #e2e8f0' }}>
                {!isDetailPage && (
                    <div style={{ width: '100%' }}>
                        {/* Línea 1: Subcategoría con dropdown y destino */}
                        <div style={{ 
                            display: 'flex', 
                            alignItems: 'center', 
                            justifyContent: 'space-between',
                            marginBottom: '12px',
                            flexWrap: 'wrap',
                            gap: '12px',
                            position: 'relative'
                        }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flex: 1 }}>
                                {/* 🔥 SUBCATEGORÍA - SOLO PARA DROPDOWN */}
                                <div className="dropdown-container" style={{ position: 'relative', display: 'inline-block' }}>
                                    <div 
                                        style={{ 
                                            display: 'flex', 
                                            alignItems: 'center', 
                                            gap: '8px',
                                            backgroundColor: '#edf2f7',
                                            padding: '8px 16px 8px 20px',
                                            borderRadius: '25px',
                                            border: '1px solid #e2e8f0',
                                            cursor: auth.user ? 'pointer' : 'default', // Solo clickeable si hay usuario
                                            transition: 'all 0.2s ease',
                                            minWidth: 'fit-content'
                                        }}
                                        onClick={handleSubCategoryClick} // 🔥 SOLO abre/cierra dropdown
                                        title={auth.user ? t('cardbody.moreOptions', 'Plus d\'options') : ''}
                                    >
                                        <span style={{ 
                                            fontSize: '16px', 
                                            fontWeight: '600', 
                                            color: '#2d3748'
                                        }}>
                                            {getSubCategoryIcon(post.subCategory)} {translateSubCategory(post.subCategory)}
                                        </span>
                                        {auth.user && (
                                            <i className={`fas fa-chevron-${showDropdown ? 'up' : 'down'}`} 
                                               style={{ 
                                                   fontSize: '12px', 
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
                                            marginTop: '8px',
                                            backgroundColor: 'white',
                                            border: '1px solid #e2e8f0',
                                            borderRadius: '12px',
                                            boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
                                            minWidth: '280px',
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
                                
                                {/* 🔥 DESTINACION - SOLO ESTE REDIRIGE AL MAPA */}
                                {post.destinacion && (
                                    <>
                                        <span style={{ color: '#a0aec0', fontSize: '18px' }}>•</span>
                                        <div 
                                            style={{ 
                                                display: 'flex', 
                                                alignItems: 'center', 
                                                gap: '8px',
                                                cursor: 'pointer', // 🔥 SIEMPRE clickeable
                                                transition: 'all 0.3s ease',
                                                padding: '6px 12px',
                                                borderRadius: '20px'
                                            }}
                                            onClick={handleDestinationClick} // 🔥 SOLO ESTE redirige al mapa
                                            onMouseEnter={(e) => {
                                                e.target.style.backgroundColor = '#f0f9ff';
                                                e.target.style.color = '#1e88e5';
                                            }}
                                            onMouseLeave={(e) => {
                                                e.target.style.backgroundColor = 'transparent';
                                                e.target.style.color = '#4a5568';
                                            }}
                                            title={t('cardbody.viewDestinationOnMap', 'Voir la destination sur la carte')}
                                        >
                                            <i className="fas fa-map-marker-alt" style={{ 
                                                color: '#e53e3e', 
                                                fontSize: '16px',
                                                transition: 'transform 0.2s ease'
                                            }}></i>
                                            <span style={{ 
                                                fontSize: '16px', 
                                                fontWeight: '500', 
                                                color: 'inherit'
                                            }}>
                                                {post.destinacion}
                                            </span>
                                            <i className="fas fa-external-link-alt" style={{ 
                                                fontSize: '12px', 
                                                color: '#a0aec0',
                                                marginLeft: '4px'
                                            }}></i>
                                        </div>
                                    </>
                                )}
                            </div>
                        </div>

                        {/* Línea 2: Fecha y ubicación */}
                        <div style={{ 
                            display: 'flex', 
                            alignItems: 'center', 
                            gap: '16px',
                            flexWrap: 'wrap',
                            fontSize: '15px',
                            color: '#718096'
                        }}>
                            {post.datedepar && (
                                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                    <i className="far fa-calendar-alt" style={{ fontSize: '14px' }}></i>
                                    <span style={{ fontWeight: '500' }}>
                                        {t('departure', 'Départ')} {formatDate(post.datedepar)}
                                    </span>
                                    <span style={{ color: '#cbd5e0', fontSize: '14px' }}>
                                        ({getDayName(post.datedepar)})
                                    </span>
                                </div>
                            )}
                            
                            {post.wilaya && (
                                <>
                                    <span style={{ color: '#e2e8f0' }}>|</span>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                                        <i className="fas fa-map-pin" style={{ fontSize: '12px' }}></i>
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

            {/* Vista para página de detalle */}
            {isDetailPage && (
                <div style={{ padding: '24px' }}>
                    {/* Subcategoría - SOLO para dropdown */}
                    <div 
                        style={{ 
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '8px',
                            marginBottom: '12px',
                            cursor: auth.user ? 'pointer' : 'default',
                            transition: 'all 0.2s ease',
                            padding: '12px 16px',
                            borderRadius: '12px',
                            backgroundColor: '#edf2f7'
                        }}
                        onClick={handleSubCategoryClick}
                        onMouseEnter={(e) => {
                            if (auth.user) {
                                e.target.style.backgroundColor = '#e2e8f0';
                            }
                        }}
                        onMouseLeave={(e) => {
                            if (auth.user) {
                                e.target.style.backgroundColor = '#edf2f7';
                            }
                        }}
                        title={auth.user ? t('cardbody.moreOptions', 'Plus d\'options') : ''}
                    >
                        <span style={{ 
                            fontSize: '24px', 
                            fontWeight: '700', 
                            color: '#2d3748'
                        }}>
                            {getSubCategoryIcon(post.subCategory)} {translateSubCategory(post.subCategory)}
                        </span>
                        {auth.user && (
                            <i className={`fas fa-chevron-${showDropdown ? 'up' : 'down'}`} 
                               style={{ 
                                   fontSize: '14px', 
                                   color: '#718096'
                               }}></i>
                        )}
                    </div>
                    
                    {/* Destinacion - SOLO ESTE redirige al mapa */}
                    {post.destinacion && (
                        <div 
                            style={{ 
                                display: 'flex', 
                                alignItems: 'center', 
                                gap: '12px',
                                marginBottom: '16px',
                                fontSize: '18px',
                                color: '#4a5568',
                                cursor: 'pointer',
                                padding: '10px 16px',
                                borderRadius: '10px',
                                transition: 'all 0.3s ease',
                                border: '2px solid transparent'
                            }}
                            onClick={handleDestinationClick}
                            onMouseEnter={(e) => {
                                e.target.style.color = '#1e88e5';
                                e.target.style.backgroundColor = '#f0f9ff';
                                e.target.style.borderColor = '#1e88e5';
                                e.target.style.transform = 'translateY(-2px)';
                            }}
                            onMouseLeave={(e) => {
                                e.target.style.color = '#4a5568';
                                e.target.style.backgroundColor = 'transparent';
                                e.target.style.borderColor = 'transparent';
                                e.target.style.transform = 'translateY(0)';
                            }}
                            title={t('cardbody.viewDestinationOnMap', 'Voir la destination sur la carte')}
                        >
                            <i className="fas fa-map-marker-alt" style={{ color: '#e53e3e', fontSize: '18px' }}></i>
                            <span style={{ fontWeight: '600' }}>{post.destinacion}</span>
                            <i className="fas fa-external-link-alt" style={{ 
                                fontSize: '14px', 
                                color: '#a0aec0',
                                marginLeft: '8px'
                            }}></i>
                        </div>
                    )}

                    {/* Fechas */}
                    {post.datedepar && (
                        <div style={{ 
                            display: 'flex', 
                            alignItems: 'center', 
                            gap: '20px',
                            marginTop: '16px',
                            fontSize: '16px',
                            color: '#718096'
                        }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                <i className="far fa-calendar-alt" style={{ fontSize: '16px' }}></i>
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

            {/* Modal de autenticación */}
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
                        padding: '24px',
                        borderRadius: '12px',
                        textAlign: 'center',
                        minWidth: '320px'
                    }}>
                        <h3 style={{ marginBottom: '20px', color: '#2d3748', fontSize: '20px' }}>
                            {t('auth.required', 'Authentification Requise')}
                        </h3>
                        <p style={{ marginBottom: '24px', color: '#718096', fontSize: '16px' }}>
                            {t('auth.loginToContinue', 'Veuillez vous connecter pour continuer')}
                        </p>
                        <div style={{ display: 'flex', gap: '16px', justifyContent: 'center' }}>
                            <button
                                onClick={() => history.push('/login')}
                                style={{
                                    padding: '12px 24px',
                                    backgroundColor: '#4a5568',
                                    color: 'white',
                                    border: 'none',
                                    borderRadius: '8px',
                                    cursor: 'pointer',
                                    fontSize: '15px'
                                }}
                            >
                                {t('auth.login', 'Connexion')}
                            </button>
                            <button
                                onClick={() => history.push('/register')}
                                style={{
                                    padding: '12px 24px',
                                    backgroundColor: '#e2e8f0',
                                    color: '#4a5568',
                                    border: 'none',
                                    borderRadius: '8px',
                                    cursor: 'pointer',
                                    fontSize: '15px'
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