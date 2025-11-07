import React, { useState, useEffect } from "react";
import { useLocation, useHistory } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useSelector, useDispatch } from "react-redux";
import moment from "moment";
import ShareModal from './ShareModal';
import { deletePost } from '../../../redux/actions/postAction';
import { CardBody } from "react-bootstrap";

const CardBodyTitle = ({ post }) => {
    const location = useLocation();
    const history = useHistory();
    const { t, i18n } = useTranslation(['cardtitle','categories','descripcion', 'common']);
    const { auth, socket } = useSelector(state => state);
    const dispatch = useDispatch();

    const isRTL = i18n.language === 'ar' || i18n.language === 'ara';
    const isDetailPage = location.pathname === `/post/${post._id}`;
    const [showDropdown, setShowDropdown] = useState(false);
    const [showShareModal, setShowShareModal] = useState(false);
    const [showAuthModal, setShowAuthModal] = useState(false);
    const [isDeleting, setIsDeleting] = useState(false);

    useEffect(() => {
        const lang = i18n.language === 'ar' ? 'ar' : 'fr';
        moment.locale(lang);
    }, [i18n.language]);

    const isSuperUtilisateur = auth.user?.role === "Super-utilisateur";
    const isAdmin = auth.user?.role === "admin";
    const isPostOwner = auth.user && post && auth.user._id === post.user?._id;
    const hasAdminRights = isSuperUtilisateur || isAdmin;

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (showDropdown && !event.target.closest('.dropdown-container')) {
                setShowDropdown(false);
            }
        };
        document.addEventListener('click', handleClickOutside);
        return () => document.removeEventListener('click', handleClickOutside);
    }, [showDropdown]);

    const formatDate = (dateString) => {
        if (!dateString) return '';
        return moment(dateString).format('DD/MM/YYYY');
    };

    const getDayName = (dateString) => {
        if (!dateString) return '';
        const days = { 
            'Monday': t('days.monday', 'Lun'), 
            'Tuesday': t('days.tuesday', 'Mar'), 
            'Wednesday': t('days.wednesday', 'Mer'), 
            'Thursday': t('days.thursday', 'Jeu'), 
            'Friday': t('days.friday', 'Ven'), 
            'Saturday': t('days.saturday', 'Sam'), 
            'Sunday': t('days.sunday', 'Dim') 
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

    const handleDestinationClick = (e) => {
        e.stopPropagation();
        history.push('/map', { postData: post, from: 'Destination' });
    };

    const handleSubCategoryClick = (e) => {
        e.stopPropagation();
        if (auth.user) setShowDropdown(!showDropdown);
    };

    // Funciones del dropdown
    const handleChatWithAgency = () => {
        if (!auth.user) { setShowAuthModal(true); return; }
        if (!post.user || !post.user._id) {
            alert(t('agency.contactError', 'Impossible de contacter cette agence'));
            return;
        }
        dispatch({ type: 'MESS_TYPES.ADD_USER', payload: { ...post.user, text: '', media: [] } });
        history.push(`/message/${post.user._id}`);
        setShowDropdown(false);
    };

    const handleViewAgencyProfile = () => {
        if (!post.user || !post.user._id) {
            alert(t('agency.profileError', 'Impossible de voir le profil de cette agence'));
            return;
        }
        history.push(`/profile/${post.user._id}`);
        setShowDropdown(false);
    };

    const handleEditPost = () => {
        if (!auth.user) { setShowAuthModal(true); return; }
        history.push('/createpost', { isEdit: true, postData: post });
        dispatch({ type: 'GLOBALTYPES.STATUS', payload: { ...post, onEdit: true } });
        setShowDropdown(false);
    };

    const handleDeletePost = async () => {
        if (!auth.user) { setShowAuthModal(true); return; }
        if (window.confirm(t('post.deleteConfirmation', 'Êtes-vous sûr de vouloir supprimer cette publication?'))) {
            setIsDeleting(true);
            try { await dispatch(deletePost({ post, auth, socket })); }
            catch (error) { console.error('Error al eliminar el post:', error); }
            finally { setIsDeleting(false); setShowDropdown(false); }
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

    const getDropdownOptions = () => {
        const options = [];
        if (hasAdminRights) {
            options.push(
                { icon: "create", text: t('editPost', 'Modifier le post'), action: handleEditPost },
                { icon: "delete_outline", text: t('deletePost', 'Supprimer le post'), action: handleDeletePost }
            );
        }
        if (isPostOwner) {
            options.push(
                { icon: "create", text: t('editPost', 'Modifier le post'), action: handleEditPost },
                { icon: "delete_outline", text: t('deletePost', 'Supprimer le post'), action: handleDeletePost }
            );
        }
        if (auth.user) {
            options.push(
                { icon: "chat", text: t('writeToAgency', 'Écrire à l\'agence'), action: handleChatWithAgency },
                { icon: "person_add", text: t('followAgency', 'Suivre l\'agence'), action: handleFollowAgency },
                { icon: "share", text: t('sharePost', 'Partager'), action: handleSharePost },
                { icon: "info", text: t('viewDetails', 'Voir détails'), action: handleViewDetails }
            );
        }
        return options.filter((option, index, self) => index === self.findIndex(o => o.text === option.text));
    };

    const dropdownOptions = getDropdownOptions();
    const handleOptionClick = (action) => { action(); setShowDropdown(false); };

    const DropdownItem = ({ icon, text, onClick, isDanger = false }) => (
        <div style={{
            display: 'flex', 
            alignItems: 'center', 
            gap: '8px', 
            padding: '10px 12px', 
            cursor: 'pointer',
            transition: 'background-color 0.2s', 
            borderBottom: '1px solid #f1f5f9', 
            fontSize: '14px',
            color: isDanger ? '#e53e3e' : '#4a5568',
            flexDirection: isRTL ? 'row-reverse' : 'row'
        }}
            onClick={onClick}
            onMouseEnter={(e) => e.target.style.backgroundColor = '#f7fafc'}
            onMouseLeave={(e) => e.target.style.backgroundColor = 'transparent'}>
            <span className="material-icons" style={{ 
                fontSize: '18px', 
                width: '20px',
                transform: isRTL ? 'scaleX(-1)' : 'none'
            }}>{icon}</span>
            <span>{text}</span>
        </div>
    );

    return (
        <div className="cardtitle" style={{ direction: isRTL ? 'rtl' : 'ltr' }}>
           
            <CardBody className="card-header" style={{ 
                padding: '7px 10px', 
                borderBottom: '1px solid #e2e8f0', 
                background: 'white',
                textAlign: isRTL ? 'right' : 'left'
            }}>
                {!isDetailPage && (
                    <div style={{ width: '100%' }}>
                        {/* 🔥 FILA 1: Subcategoría + Destinación (misma línea) */}
                        <div style={{ 
                            display: 'flex', 
                            alignItems: 'center', 
                            gap: '5px', 
                            marginBottom: '6px', 
                            flexWrap: 'wrap',
                            flexDirection: isRTL ? 'row-reverse' : 'row'
                        }}>

                            {/* SUBCATEGORÍA - MÁS GRANDE */}
                            <div className="dropdown-container" style={{ position: 'relative', display: 'inline-block' }}>
                                <div style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    backgroundColor: '#f8fafc',
                                    borderRadius: '12px',
                                    border: '1px solid #e2e8f0',
                                    cursor: auth.user ? 'pointer' : 'default',
                                    transition: 'all 0.2s',
                                    minWidth: 'fit-content',
                                    fontSize: '18px',
                                    fontWeight: '600',
                                    color: '#374151',
                                    flexDirection: isRTL ? 'row-reverse' : 'row',
                                    padding: isRTL ? '6px 8px 6px 12px' : '6px 12px 6px 8px'
                                }}
                                    onClick={handleSubCategoryClick}
                                    onMouseEnter={(e) => { if (auth.user) e.target.style.backgroundColor = '#f1f5f9'; }}
                                    onMouseLeave={(e) => { if (auth.user) e.target.style.backgroundColor = '#f8fafc'; }}
                                    title={auth.user ? t('cardbody.moreOptions', 'Plus d\'options') : ''}>
                                    <span>{getSubCategoryIcon(post.subCategory)}</span>
                                    <span style={{ margin: isRTL ? '0 8px 0 0' : '0 0 0 8px' }}>
                                        {translateSubCategory(post.subCategory)}
                                    </span>
                                    {auth.user && <i className={`fas fa-chevron-${showDropdown ? 'up' : 'down'}`}
                                        style={{
                                            fontSize: '10px',
                                            color: '#6b7280',
                                            margin: isRTL ? '0 8px 0 0' : '0 0 0 8px'
                                        }}></i>}
                                </div>

                                {showDropdown && auth.user && (
                                    <div style={{
                                        position: 'absolute', 
                                        top: '100%', 
                                        [isRTL ? 'left' : 'right']: '0',
                                        marginTop: '4px', 
                                        backgroundColor: 'white', 
                                        border: '1px solid #e2e8f0',
                                        borderRadius: '8px', 
                                        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)', 
                                        minWidth: '200px',
                                        zIndex: 1000, 
                                        overflow: 'hidden',
                                        textAlign: isRTL ? 'right' : 'left'
                                    }}
                                        onMouseLeave={() => setShowDropdown(false)}>
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

                            {/* DESTINACIÓN - MÁS GRANDE */}
                            {post.destinacion && (
                                <div style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '1px',
                                    cursor: 'pointer',
                                    transition: 'all 0.2s',
                                    borderRadius: '12px',
                                    background: 'white',
                                    border: '1px solid #e2e8f0',
                                    fontSize: '14px',
                                    fontWeight: '500',
                                    flexDirection: isRTL ? 'row-reverse' : 'row',
                                    padding: isRTL ? '6px 8px 6px 12px' : '6px 12px 6px 8px'
                                }}
                                    onClick={handleDestinationClick}
                                    onMouseEnter={(e) => { 
                                        e.target.style.backgroundColor = '#f0f9ff'; 
                                        e.target.style.borderColor = '#3b82f6'; 
                                    }}
                                    onMouseLeave={(e) => { 
                                        e.target.style.backgroundColor = 'white'; 
                                        e.target.style.borderColor = '#e2e8f0'; 
                                    }}
                                    title={t('cardbody.viewDestinationOnMap', 'Voir la destination sur la carte')}>

                                    <span style={{ 
                                        color: '#374151',
                                        margin: isRTL ? '0 0 0 8px' : '0 8px 0 0'
                                    }}>{post.destinacion}</span>
                                    <i className="fas fa-map-marker-alt" style={{
                                        color: '#ef4444',
                                        fontSize: '14px'
                                    }}></i>
                                </div>
                            )}
                        </div>

                        {/* 🔥 FILA 2: TODOS los demás campos en MISMA LÍNEA */}
                        <div style={{ 
                            display: 'flex', 
                            alignItems: 'center', 
                            gap: '12px', 
                            flexWrap: 'wrap', 
                            fontSize: '12px', 
                            color: '#6b7280',
                            flexDirection: isRTL ? 'row-reverse' : 'row'
                        }}>

                            {/* FECHA */}
                            {post.datedepar && (
                                <div style={{ 
                                    display: 'flex', 
                                    alignItems: 'center', 
                                    gap: '4px',
                                    flexDirection: isRTL ? 'row-reverse' : 'row'
                                }}>
                                    <i className="far fa-calendar-alt" style={{ 
                                        fontSize: '11px', 
                                        color: '#8b5cf6' 
                                    }}></i>
                                    <span style={{ fontWeight: '500' }}>
                                        {t('departure', 'Départ')} {formatDate(post.datedepar)}
                                    </span>
                                    <span style={{ color: '#d1d5db' }}>
                                        ({getDayName(post.datedepar)})
                                    </span>
                                </div>
                            )}

                            {/* UBICACIÓN */}
                            {post.wilaya && (
                                <div style={{ 
                                    display: 'flex', 
                                    alignItems: 'center', 
                                    gap: '4px',
                                    flexDirection: isRTL ? 'row-reverse' : 'row'
                                }}>
                                    <i className="fas fa-map-pin" style={{ 
                                        fontSize: '10px', 
                                        color: '#10b981' 
                                    }}></i>
                                    <span>
                                        {post.wilaya}{post.commune && `, ${post.commune}`}
                                    </span>
                                </div>
                            )}
                        </div>
                    </div>
                )}
            </CardBody>

            {/* VISTA DETALLE COMPACTA */}
            {isDetailPage && (
                <div style={{ padding: '8px', textAlign: isRTL ? 'right' : 'left' }}>
                    {/* FILA 1: Subcategoría - TODO EL ANCHO */}
                    <div style={{ marginBottom: '8px' }}>
                        <div style={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            cursor: auth.user ? 'pointer' : 'default',
                            transition: 'all 0.2s',
                            padding: '12px 16px',
                            borderRadius: '8px',
                            backgroundColor: '#f8fafc',
                            border: '1px solid #e2e8f0',
                            fontSize: '18px',
                            fontWeight: '700',
                            width: '100%',
                            boxSizing: 'border-box',
                            flexDirection: isRTL ? 'row-reverse' : 'row'
                        }}
                            onClick={handleSubCategoryClick}
                            onMouseEnter={(e) => { if (auth.user) e.target.style.backgroundColor = '#f1f5f9'; }}
                            onMouseLeave={(e) => { if (auth.user) e.target.style.backgroundColor = '#f8fafc'; }}>
                            <div style={{ 
                                display: 'flex', 
                                alignItems: 'center', 
                                gap: '8px',
                                flexDirection: isRTL ? 'row-reverse' : 'row'
                            }}>
                                <span style={{ fontSize: '20px' }}>{getSubCategoryIcon(post.subCategory)}</span>
                                <span>{translateSubCategory(post.subCategory)}</span>
                            </div>
                            {auth.user && <i className={`fas fa-chevron-${showDropdown ? 'up' : 'down'}`}
                                style={{
                                    fontSize: '14px',
                                    color: '#6b7280'
                                }}></i>}
                        </div>
                    </div>

                    {/* FILA 2: Destinación - TODO EL ANCHO */}
                    {post.destinacion && (
                        <div style={{ marginBottom: '8px' }}>
                            <div style={{
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'space-between',
                                cursor: 'pointer',
                                transition: 'all 0.2s',
                                padding: '12px 16px',
                                borderRadius: '8px',
                                background: 'white',
                                border: '1px solid #e2e8f0',
                                fontSize: '18px',
                                fontWeight: '600',
                                width: '100%',
                                boxSizing: 'border-box',
                                flexDirection: isRTL ? 'row-reverse' : 'row'
                            }}
                                onClick={handleDestinationClick}
                                onMouseEnter={(e) => {
                                    e.target.style.backgroundColor = '#f0f9ff';
                                    e.target.style.borderColor = '#3b82f6';
                                }}
                                onMouseLeave={(e) => {
                                    e.target.style.backgroundColor = 'white';
                                    e.target.style.borderColor = '#e2e8f0';
                                }}>
                                <div style={{ 
                                    display: 'flex', 
                                    alignItems: 'center', 
                                    gap: '8px',
                                    flexDirection: isRTL ? 'row-reverse' : 'row'
                                }}>
                                    <i className="fas fa-map-marker-alt" style={{
                                        color: '#ef4444',
                                        fontSize: '16px'
                                    }}></i>
                                    <span>{post.destinacion}</span>
                                </div>
                                <i className="fas fa-external-link-alt" style={{
                                    fontSize: '14px',
                                    color: '#9ca3af'
                                }}></i>
                            </div>
                        </div>
                    )}

                    {/* FILA 3: Campos adicionales */}
                    <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '16px',
                        flexWrap: 'wrap',
                        fontSize: '14px',
                        color: '#6b7280',
                        padding: '0 8px',
                        flexDirection: isRTL ? 'row-reverse' : 'row'
                    }}>
                        {post.datedepar && (
                            <div style={{ 
                                display: 'flex', 
                                alignItems: 'center', 
                                gap: '6px',
                                flexDirection: isRTL ? 'row-reverse' : 'row'
                            }}>
                                <i className="far fa-calendar-alt" style={{ fontSize: '12px', color: '#8b5cf6' }}></i>
                                <span><strong>{t('departure', 'Départ')}:</strong> {formatDate(post.datedepar)}</span>
                                <span style={{ color: '#d1d5db' }}>({getDayName(post.datedepar)})</span>
                            </div>
                        )}

                        {post.wilaya && (
                            <div style={{ 
                                display: 'flex', 
                                alignItems: 'center', 
                                gap: '6px',
                                flexDirection: isRTL ? 'row-reverse' : 'row'
                            }}>
                                <i className="fas fa-map-pin" style={{ fontSize: '11px', color: '#10b981' }}></i>
                                <span>{post.wilaya}{post.commune && `, ${post.commune}`}</span>
                            </div>
                        )}
                    </div>
                </div>
            )}
            
            {/* Modales */}
            {showShareModal && <ShareModal url={`${window.location.origin}/post/${post._id}`} onClose={() => setShowShareModal(false)} />}

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
                        borderRadius: '8px', 
                        textAlign: 'center', 
                        minWidth: '280px',
                        direction: isRTL ? 'rtl' : 'ltr'
                    }}>
                        <h3 style={{ 
                            marginBottom: '12px', 
                            color: '#2d3748', 
                            fontSize: '16px' 
                        }}>{t('auth.required', 'Authentification Requise')}</h3>
                        <p style={{ 
                            marginBottom: '16px', 
                            color: '#718096', 
                            fontSize: '14px' 
                        }}>{t('auth.loginToContinue', 'Veuillez vous connecter pour continuer')}</p>
                        <div style={{ 
                            display: 'flex', 
                            gap: '10px', 
                            justifyContent: 'center',
                            flexDirection: isRTL ? 'row-reverse' : 'row'
                        }}>
                            <button onClick={() => history.push('/login')} style={{
                                padding: '8px 16px', 
                                backgroundColor: '#4a5568',
                                color: 'white', 
                                border: 'none', 
                                borderRadius: '6px', 
                                cursor: 'pointer', 
                                fontSize: '12px'
                            }}>
                                {t('auth.login', 'Connexion')}
                            </button>
                            <button onClick={() => history.push('/register')} style={{
                                padding: '8px 16px', 
                                backgroundColor: '#e2e8f0',
                                color: '#4a5568', 
                                border: 'none', 
                                borderRadius: '6px', 
                                cursor: 'pointer', 
                                fontSize: '12px'
                            }}>
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