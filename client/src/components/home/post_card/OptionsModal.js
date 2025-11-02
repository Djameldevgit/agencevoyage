import React, { useRef } from 'react';
import { useTranslation } from "react-i18next";

const OptionsModal = ({
  showOptionsModal,
  setShowOptionsModal,
  isPostOwner,
  isAdmin,
  handleEditPost,
  handleDeleteClick,
  handleContactSeller,
  handleShare,
  auth,
  saved,
  saveLoad,
  handleSavePost,
  handleUnSavePost,
  
}) => {
  const optionsModalRef = useRef(null);
  const { t } = useTranslation(['cardbodycarousel', 'common']);

  if (!showOptionsModal) return null;

  return (
    <div style={{
      position: "fixed",
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: "rgba(0, 0, 0, 0.8)",
      display: "flex",
      alignItems: "flex-end",
      justifyContent: "center",
      zIndex: 9999,
      backdropFilter: "blur(10px)"
    }}>
      <div ref={optionsModalRef} style={{
        background: "white",
        width: "100%",
        maxWidth: "500px",
        borderTopLeftRadius: "20px",
        borderTopRightRadius: "20px",
        padding: "20px 0",
        transform: "translateY(0)",
        animation: "slideUp 0.3s ease",
        boxShadow: "0 -4px 20px rgba(0, 0, 0, 0.15)"
      }}>
        <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
          {(isPostOwner || isAdmin) && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                handleEditPost(e);
                setShowOptionsModal(false);
              }}
              style={{
                background: "none",
                border: "none",
                padding: "16px 24px",
                textAlign: "left",
                fontSize: "16px",
                color: "#333",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                gap: "12px",
                transition: "background-color 0.2s ease",
                backgroundColor: "rgba(255, 193, 7, 0.1)",
                borderLeft: "3px solid #ffc107"
              }}
            >
              <span className="material-icons" style={{ color: "#ffc107" }}>edit</span>
              {isAdmin && !isPostOwner ? t('edit_post_admin') : t('edit_post')}
            </button>
          )}

          {(isPostOwner || isAdmin) && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                handleDeleteClick(e);
                setShowOptionsModal(false);
              }}
              style={{
                background: "none",
                border: "none",
                padding: "16px 24px",
                textAlign: "left",
                fontSize: "16px",
                color: "#e74c3c",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                gap: "12px",
                transition: "background-color 0.2s ease"
              }}
            >
              <span className="material-icons" style={{ color: "#e74c3c" }}>delete</span>
              {isAdmin && !isPostOwner ? t('delete_post_admin') : t('delete_post')}
            </button>
          )}
          <button
            onClick={(e) => {
              e.stopPropagation();
              handleContactSeller();
              setShowOptionsModal(false);
            }}
            style={{
              background: "none",
              border: "none",
              padding: "16px 24px",
              textAlign: "left",
              fontSize: "16px",
              color: "#333",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              gap: "12px",
              transition: "background-color 0.2s ease"
            }}
          >
            <span className="material-icons" style={{ color: "#007bff" }}>chat</span>
            {t('contact_seller')}
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              handleShare();
              setShowOptionsModal(false);
            }}
            style={{
              background: "none",
              border: "none",
              padding: "16px 24px",
              textAlign: "left",
              fontSize: "16px",
              color: "#333",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              gap: "12px",
              transition: "background-color 0.2s ease"
            }}
          >
            <span className="material-icons" style={{ color: "#007bff" }}>share</span>
            {t('share')}
          </button>

          {auth.user && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                saved ? handleUnSavePost() : handleSavePost();
                setShowOptionsModal(false);
              }}
              disabled={saveLoad}
              style={{
                background: "none",
                border: "none",
                padding: "16px 24px",
                textAlign: "left",
                fontSize: "16px",
                color: saveLoad ? "#999" : "#333",
                cursor: saveLoad ? "not-allowed" : "pointer",
                display: "flex",
                alignItems: "center",
                gap: "12px",
                transition: "background-color 0.2s ease",
                opacity: saveLoad ? 0.6 : 1
              }}
            >
              <span className="material-icons" style={{ color: saved ? "#ff8c00" : "#666" }}>
                {saved ? 'bookmark' : 'bookmark_border'}
              </span>
              {saveLoad ? t('saving') : (saved ? t('saved') : t('save'))}
            </button>
          )}

          <div style={{ padding: "8px 16px", marginTop: "8px" }}>
            <button
              onClick={() => setShowOptionsModal(false)}
              style={{
                background: "rgba(0, 0, 0, 0.05)",
                border: "none",
                padding: "16px",
                borderRadius: "12px",
                fontSize: "16px",
                color: "#333",
                cursor: "pointer",
                width: "100%",
                fontWeight: "600",
                transition: "background-color 0.2s ease"
              }}
            >
              {t('cancel')}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default React.memo(OptionsModal);