import React, { useState, useEffect } from 'react';
import { v4 as uuid } from 'uuid';
import { toastHandler } from '../../../utils/utils';
import { ToastType } from '../../../constants/constants';
import styles from './FooterLinksManager.module.css';

const FooterLinksManager = () => {
  const [footerLinks, setFooterLinks] = useState([]);
  const [editingLink, setEditingLink] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);

  const initialLinkState = {
    id: '',
    icon: '',
    url: '',
    label: ''
  };

  const [linkForm, setLinkForm] = useState(initialLinkState);

  // ICONOS MODERNOS Y ACTUALES COMPLETAMENTE RENOVADOS
  const availableIcons = [
    // Redes Sociales Principales
    { value: 'AiOutlineTwitter', label: '🐦 Twitter / X', component: 'AiOutlineTwitter', category: 'social' },
    { value: 'AiFillLinkedin', label: '💼 LinkedIn', component: 'AiFillLinkedin', category: 'social' },
    { value: 'AiFillGithub', label: '🐙 GitHub', component: 'AiFillGithub', category: 'dev' },
    { value: 'AiFillFacebook', label: '📘 Facebook', component: 'AiFillFacebook', category: 'social' },
    { value: 'AiFillInstagram', label: '📷 Instagram', component: 'AiFillInstagram', category: 'social' },
    { value: 'AiFillYoutube', label: '📺 YouTube', component: 'AiFillYoutube', category: 'social' },
    { value: 'AiOutlineWhatsApp', label: '💬 WhatsApp', component: 'AiOutlineWhatsApp', category: 'messaging' },
    
    // Plataformas Modernas
    { value: 'AiFillTikTok', label: '🎵 TikTok', component: 'AiFillTikTok', category: 'social' },
    { value: 'AiFillDiscord', label: '🎮 Discord', component: 'AiFillDiscord', category: 'gaming' },
    { value: 'AiFillTwitch', label: '🟣 Twitch', component: 'AiFillTwitch', category: 'gaming' },
    { value: 'AiFillReddit', label: '🔴 Reddit', component: 'AiFillReddit', category: 'social' },
    { value: 'AiFillSnapchat', label: '👻 Snapchat', component: 'AiFillSnapchat', category: 'social' },
    { value: 'AiFillPinterest', label: '📌 Pinterest', component: 'AiFillPinterest', category: 'social' },
    
    // Desarrollo y Tecnología
    { value: 'AiFillGitlab', label: '🦊 GitLab', component: 'AiFillGitlab', category: 'dev' },
    { value: 'AiFillBitbucket', label: '🔵 Bitbucket', component: 'AiFillBitbucket', category: 'dev' },
    { value: 'AiFillCodepen', label: '✏️ CodePen', component: 'AiFillCodepen', category: 'dev' },
    { value: 'AiFillStackOverflow', label: '📚 Stack Overflow', component: 'AiFillStackOverflow', category: 'dev' },
    
    // Comunicación
    { value: 'AiOutlineMail', label: '📧 Email', component: 'AiOutlineMail', category: 'contact' },
    { value: 'AiOutlinePhone', label: '📞 Teléfono', component: 'AiOutlinePhone', category: 'contact' },
    { value: 'AiFillSlack', label: '💬 Slack', component: 'AiFillSlack', category: 'messaging' },
    { value: 'AiFillSkype', label: '🔵 Skype', component: 'AiFillSkype', category: 'messaging' },
    { value: 'AiFillTelegram', label: '✈️ Telegram', component: 'AiFillTelegram', category: 'messaging' },
    
    // Profesional y Negocios
    { value: 'AiFillBehance', label: '🎨 Behance', component: 'AiFillBehance', category: 'creative' },
    { value: 'AiFillDribbble', label: '🏀 Dribbble', component: 'AiFillDribbble', category: 'creative' },
    { value: 'AiFillFigma', label: '🎨 Figma', component: 'AiFillFigma', category: 'design' },
    { value: 'AiFillNotion', label: '📝 Notion', component: 'AiFillNotion', category: 'productivity' },
    
    // Música y Entretenimiento
    { value: 'AiFillSpotify', label: '🎵 Spotify', component: 'AiFillSpotify', category: 'music' },
    { value: 'AiFillSoundCloud', label: '☁️ SoundCloud', component: 'AiFillSoundCloud', category: 'music' },
    { value: 'AiFillApple', label: '🍎 Apple Music', component: 'AiFillApple', category: 'music' },
    { value: 'AiFillNetflix', label: '🎬 Netflix', component: 'AiFillNetflix', category: 'entertainment' },
    
    // Otros
    { value: 'AiOutlineGlobal', label: '🌐 Sitio Web', component: 'AiOutlineGlobal', category: 'web' },
    { value: 'AiFillShop', label: '🛒 Tienda Online', component: 'AiFillShop', category: 'business' },
    { value: 'AiFillBlog', label: '📝 Blog', component: 'AiFillBlog', category: 'content' },
    { value: 'AiFillPortfolio', label: '💼 Portfolio', component: 'AiFillPortfolio', category: 'professional' }
  ];

  // Cargar footer links desde localStorage
  useEffect(() => {
    const savedConfig = localStorage.getItem('adminStoreConfig');
    if (savedConfig) {
      try {
        const parsedConfig = JSON.parse(savedConfig);
        if (parsedConfig.footerLinks) {
          setFooterLinks(parsedConfig.footerLinks);
        } else {
          loadDefaultLinks();
        }
      } catch (error) {
        console.error('Error al cargar footer links:', error);
        loadDefaultLinks();
      }
    } else {
      loadDefaultLinks();
    }
  }, []);

  const loadDefaultLinks = () => {
    const defaultLinks = [
      {
        id: 1,
        icon: 'AiOutlineTwitter',
        url: 'https://twitter.com/Swastik2001',
        label: 'Twitter'
      },
      {
        id: 2,
        icon: 'AiFillLinkedin',
        url: 'https://www.linkedin.com/in/swastik-patro-2a54bb19b/',
        label: 'LinkedIn'
      },
      {
        id: 3,
        icon: 'AiFillGithub',
        url: 'https://github.com/swastikpatro',
        label: 'GitHub'
      }
    ];
    setFooterLinks(defaultLinks);
    saveFooterLinks(defaultLinks);
  };

  const saveFooterLinks = (newLinks) => {
    const savedConfig = localStorage.getItem('adminStoreConfig') || '{}';
    let config = {};
    
    try {
      config = JSON.parse(savedConfig);
    } catch (error) {
      console.error('Error al cargar configuración:', error);
      config = {};
    }

    config.footerLinks = newLinks;
    config.lastModified = new Date().toISOString();
    localStorage.setItem('adminStoreConfig', JSON.stringify(config));

    // Disparar evento para actualización en tiempo real
    window.dispatchEvent(new CustomEvent('footerLinksUpdated', { 
      detail: { footerLinks: newLinks } 
    }));

    setHasUnsavedChanges(false);
    toastHandler(ToastType.Success, '✅ Footer Links actualizados en tiempo real');
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setLinkForm(prev => ({
      ...prev,
      [name]: value
    }));
    setHasUnsavedChanges(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Validaciones
    if (!linkForm.icon) {
      toastHandler(ToastType.Error, 'Selecciona un icono');
      return;
    }
    
    if (!linkForm.url.trim()) {
      toastHandler(ToastType.Error, 'La URL es requerida');
      return;
    }

    if (!linkForm.label.trim()) {
      toastHandler(ToastType.Error, 'La etiqueta es requerida');
      return;
    }

    // Validar URL
    try {
      new URL(linkForm.url);
    } catch (error) {
      toastHandler(ToastType.Error, 'URL inválida');
      return;
    }

    const newLink = {
      ...linkForm,
      id: editingLink ? editingLink.id : Date.now(),
      label: linkForm.label.trim(),
      url: linkForm.url.trim()
    };

    let updatedLinks;
    if (editingLink) {
      updatedLinks = footerLinks.map(link => link.id === editingLink.id ? newLink : link);
      toastHandler(ToastType.Success, '✅ Link actualizado exitosamente');
    } else {
      updatedLinks = [...footerLinks, newLink];
      toastHandler(ToastType.Success, '✅ Link creado exitosamente');
    }

    setFooterLinks(updatedLinks);
    saveFooterLinks(updatedLinks);
    resetForm();
  };

  const resetForm = () => {
    setLinkForm(initialLinkState);
    setEditingLink(null);
    setShowForm(false);
    setHasUnsavedChanges(false);
  };

  const editLink = (link) => {
    setLinkForm({
      id: link.id,
      icon: link.icon,
      url: link.url,
      label: link.label
    });
    setEditingLink(link);
    setShowForm(true);
    setHasUnsavedChanges(false);
  };

  const deleteLink = (linkId) => {
    if (!window.confirm('¿Estás seguro de eliminar este link?')) {
      return;
    }

    const updatedLinks = footerLinks.filter(link => link.id !== linkId);
    setFooterLinks(updatedLinks);
    saveFooterLinks(updatedLinks);
    toastHandler(ToastType.Success, '✅ Link eliminado exitosamente');
  };

  const handleCancel = () => {
    if (hasUnsavedChanges) {
      if (!window.confirm('¿Estás seguro de cancelar? Se perderán los cambios no guardados.')) {
        return;
      }
    }
    resetForm();
  };

  const getIconDisplay = (iconName) => {
    const icon = availableIcons.find(i => i.value === iconName);
    return icon ? icon.label : iconName;
  };

  // Agrupar iconos por categoría
  const groupedIcons = availableIcons.reduce((acc, icon) => {
    if (!acc[icon.category]) {
      acc[icon.category] = [];
    }
    acc[icon.category].push(icon);
    return acc;
  }, {});

  const categoryLabels = {
    social: '📱 Redes Sociales',
    dev: '💻 Desarrollo',
    messaging: '💬 Mensajería',
    gaming: '🎮 Gaming',
    creative: '🎨 Creatividad',
    design: '🎨 Diseño',
    productivity: '📋 Productividad',
    music: '🎵 Música',
    entertainment: '🎬 Entretenimiento',
    contact: '📞 Contacto',
    web: '🌐 Web',
    business: '💼 Negocios',
    content: '📝 Contenido',
    professional: '👔 Profesional'
  };

  return (
    <div className={styles.footerLinksManager}>
      <div className={styles.header}>
        <h2>🔗 Gestión de Footer Links</h2>
        <div className={styles.headerActions}>
          {hasUnsavedChanges && (
            <span className={styles.changesIndicator}>
              🔴 Cambios sin guardar
            </span>
          )}
          <button 
            className="btn btn-primary"
            onClick={() => setShowForm(!showForm)}
          >
            {showForm ? 'Cancelar' : '+ Nuevo Link'}
          </button>
        </div>
      </div>

      <div className={styles.infoBox}>
        <h4>ℹ️ Información Importante</h4>
        <p>Los cambios se aplican automáticamente en el footer de la tienda. Ahora incluye iconos modernos de todas las plataformas actuales: TikTok, Discord, Twitch, Figma, Notion, Spotify y muchas más. Para exportar los cambios permanentemente, ve a la sección "🗂️ Sistema Backup".</p>
      </div>

      {/* ESTADÍSTICAS MEJORADAS */}
      <div className={styles.statsContainer}>
        <div className={styles.statCard}>
          <h4>📊 Estado Actual de Footer Links</h4>
          <div className={styles.stats}>
            <div className={styles.statItem}>
              <span className={styles.statNumber}>{footerLinks.length}</span>
              <span className={styles.statLabel}>Total Links</span>
            </div>
            <div className={styles.statItem}>
              <span className={styles.statNumber}>{footerLinks.filter(link => 
                ['AiOutlineTwitter', 'AiFillLinkedin', 'AiFillFacebook', 'AiFillInstagram', 'AiFillTikTok'].includes(link.icon)
              ).length}</span>
              <span className={styles.statLabel}>Redes Sociales</span>
            </div>
            <div className={styles.statItem}>
              <span className={styles.statNumber}>{footerLinks.filter(link => 
                ['AiFillGithub', 'AiFillGitlab', 'AiFillCodepen', 'AiFillStackOverflow'].includes(link.icon)
              ).length}</span>
              <span className={styles.statLabel}>Desarrollo</span>
            </div>
          </div>
        </div>
      </div>

      {showForm && (
        <form className={styles.linkForm} onSubmit={handleSubmit}>
          <div className={styles.formHeader}>
            <h3>{editingLink ? 'Editar Link' : 'Nuevo Link'}</h3>
            {hasUnsavedChanges && (
              <span className={styles.unsavedIndicator}>
                🔴 Cambios sin guardar
              </span>
            )}
          </div>

          <div className={styles.formGrid}>
            <div className={styles.formGroup}>
              <label>Icono Moderno * (Categorizado)</label>
              <select
                name="icon"
                value={linkForm.icon}
                onChange={handleInputChange}
                className="form-select"
                required
              >
                <option value="">Seleccionar icono moderno</option>
                {Object.entries(groupedIcons).map(([category, icons]) => (
                  <optgroup key={category} label={categoryLabels[category]}>
                    {icons.map(icon => (
                      <option key={icon.value} value={icon.value}>
                        {icon.label}
                      </option>
                    ))}
                  </optgroup>
                ))}
              </select>
            </div>

            <div className={styles.formGroup}>
              <label>Etiqueta *</label>
              <input
                type="text"
                name="label"
                value={linkForm.label}
                onChange={handleInputChange}
                className="form-input"
                placeholder="Ej: Mi TikTok"
                required
              />
            </div>
          </div>

          <div className={styles.formGroup}>
            <label>URL *</label>
            <input
              type="url"
              name="url"
              value={linkForm.url}
              onChange={handleInputChange}
              className="form-input"
              placeholder="https://ejemplo.com"
              required
            />
          </div>

          <div className={styles.formActions}>
            <button type="submit" className="btn btn-primary">
              💾 {editingLink ? 'Actualizar' : 'Crear'} Link
            </button>
            <button type="button" onClick={handleCancel} className="btn btn-hipster">
              Cancelar
            </button>
          </div>
        </form>
      )}

      <div className={styles.linksList}>
        <div className={styles.listHeader}>
          <h3>Links Existentes ({footerLinks.length})</h3>
        </div>

        {footerLinks.length === 0 ? (
          <div className={styles.emptyState}>
            <h3>🔗 No hay links creados</h3>
            <p>Crea tu primer link para el footer de la tienda con iconos modernos.</p>
            <button 
              className="btn btn-primary"
              onClick={() => setShowForm(true)}
            >
              ➕ Crear Primer Link
            </button>
          </div>
        ) : (
          <div className={styles.linksGrid}>
            {footerLinks.map(link => (
              <div key={link.id} className={styles.linkCard}>
                <div className={styles.linkIcon}>
                  <span>{getIconDisplay(link.icon)}</span>
                </div>
                <div className={styles.linkInfo}>
                  <h4>{link.label}</h4>
                  <p className={styles.linkUrl}>{link.url}</p>
                  <span className={styles.linkComponent}>Componente: {link.icon}</span>
                </div>
                <div className={styles.linkActions}>
                  <button
                    onClick={() => editLink(link)}
                    className="btn btn-primary"
                  >
                    Editar
                  </button>
                  <button
                    onClick={() => deleteLink(link.id)}
                    className="btn btn-danger"
                  >
                    Eliminar
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default FooterLinksManager;