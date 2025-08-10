/**
 * Contenido estructurado para la guía PDF de Yero Shop!
 * Organiza toda la información del tour guiado
 */

export const GUIDE_CONTENT = {
  // Información básica de la tienda
  storeInfo: {
    name: 'Yero Shop!',
    tagline: 'La plataforma de comercio detrás de todo',
    location: 'Santiago de Cuba, Cuba',
    whatsapp: '+53 54690878',
    website: 'https://yeroshop.vercel.app',
    coordinates: '20.039585, -75.849663'
  },

  // Estructura del tour
  tourSections: [
    {
      id: 'introduction',
      title: '🎯 Introducción a Yero Shop!',
      icon: '🏪',
      description: 'Conoce nuestra plataforma de comercio electrónico',
      content: [
        'Bienvenido a la experiencia de compra online más completa de Cuba',
        'Plataforma diseñada para facilitar tus compras desde cualquier dispositivo',
        'Tecnología avanzada con interfaz intuitiva y segura'
      ]
    },
    {
      id: 'navigation',
      title: '🧭 Navegación Principal',
      icon: '🗺️',
      description: 'Aprende a moverte por la tienda',
      content: [
        'Barra de navegación intuitiva y responsiva',
        'Acceso rápido a todas las secciones importantes',
        'Diseño optimizado para móviles y escritorio'
      ]
    },
    {
      id: 'products',
      title: '📦 Catálogo de Productos',
      icon: '🛍️',
      description: 'Explora nuestro catálogo completo',
      content: [
        'Productos organizados por categorías',
        'Información detallada de cada artículo',
        'Imágenes de alta calidad y descripciones completas'
      ]
    },
    {
      id: 'search',
      title: '🔍 Búsqueda Inteligente',
      icon: '🧠',
      description: 'Encuentra exactamente lo que buscas',
      content: [
        'Sugerencias en tiempo real',
        'Búsqueda con corrección automática',
        'Filtros avanzados para refinar resultados'
      ]
    },
    {
      id: 'cart',
      title: '🛒 Carrito de Compras',
      icon: '💳',
      description: 'Gestiona tus productos para comprar',
      content: [
        'Agregar y modificar productos fácilmente',
        'Cálculo automático de totales',
        'Gestión de cantidades y colores'
      ]
    },
    {
      id: 'wishlist',
      title: '❤️ Lista de Deseos',
      icon: '💝',
      description: 'Guarda productos para después',
      content: [
        'Guardar productos favoritos',
        'Mover fácilmente al carrito',
        'Seguimiento de productos de interés'
      ]
    },
    {
      id: 'auth',
      title: '🔐 Cuenta de Usuario',
      icon: '👤',
      description: 'Registro y gestión de cuenta',
      content: [
        'Registro rápido y seguro',
        'Inicio de sesión con múltiples opciones',
        'Gestión completa del perfil'
      ]
    },
    {
      id: 'addresses',
      title: '📍 Direcciones de Entrega',
      icon: '🏠',
      description: 'Configura dónde recibir tus pedidos',
      content: [
        'Entrega a domicilio con cálculo de costos',
        'Opción de recogida en tienda',
        'Gestión múltiple de direcciones'
      ]
    },
    {
      id: 'checkout',
      title: '💳 Proceso de Compra',
      icon: '✅',
      description: 'Finaliza tus pedidos de forma segura',
      content: [
        'Checkout simplificado y seguro',
        'Aplicación de cupones de descuento',
        'Resumen detallado de precios'
      ]
    },
    {
      id: 'currencies',
      title: '💱 Múltiples Monedas',
      icon: '💰',
      description: 'Precios en tu moneda preferida',
      content: [
        'Soporte para CUP, USD, EUR y MLC',
        'Conversión automática en tiempo real',
        'Tasas actualizadas del mercado cubano'
      ]
    },
    {
      id: 'whatsapp',
      title: '📱 Pedidos por WhatsApp',
      icon: '💬',
      description: 'Comunicación directa con la tienda',
      content: [
        'Pedidos procesados vía WhatsApp',
        'Comunicación personal y directa',
        'Confirmación inmediata de pedidos'
      ]
    },
    {
      id: 'admin',
      title: '👑 Panel de Administración',
      icon: '⚙️',
      description: 'Gestión completa de la tienda',
      content: [
        'Control total de productos y categorías',
        'Gestión de cupones y zonas de entrega',
        'Sistema de backup y configuración'
      ]
    }
  ],

  // Consejos y trucos
  tips: [
    {
      category: 'Navegación',
      tips: [
        'Usa la búsqueda para encontrar productos específicos rápidamente',
        'Los filtros te ayudan a refinar resultados por precio, marca y categoría',
        'La paginación te permite explorar todo el catálogo organizadamente'
      ]
    },
    {
      category: 'Compras',
      tips: [
        'Revisa siempre la disponibilidad de stock antes de agregar al carrito',
        'Compara precios y aprovecha los descuentos disponibles',
        'Usa la lista de deseos para guardar productos para después'
      ]
    },
    {
      category: 'Entrega',
      tips: [
        'Calcula la distancia a la tienda si vas a recoger tu pedido',
        'Verifica que tu zona tenga entrega a domicilio disponible',
        'Coordina horarios de entrega o recogida por WhatsApp'
      ]
    },
    {
      category: 'Monedas',
      tips: [
        'Cambia la moneda según tu preferencia en Perfil > Monedas',
        'Las tasas se actualizan según el mercado cubano actual',
        'Todos los precios se convierten automáticamente'
      ]
    }
  ],

  // Preguntas frecuentes
  faqs: [
    {
      category: 'General',
      questions: [
        {
          q: '¿Qué es Yero Shop!?',
          a: 'Es una plataforma de comercio electrónico especializada en productos electrónicos, ubicada en Santiago de Cuba.'
        },
        {
          q: '¿Es seguro comprar en Yero Shop!?',
          a: 'Sí, utilizamos tecnología segura para proteger tu información y procesamos pedidos vía WhatsApp para mayor confianza.'
        },
        {
          q: '¿Necesito registrarme para comprar?',
          a: 'Sí, necesitas una cuenta para usar el carrito, lista de deseos y realizar pedidos.'
        }
      ]
    },
    {
      category: 'Productos',
      questions: [
        {
          q: '¿Cómo busco un producto específico?',
          a: 'Usa la barra de búsqueda en la parte superior. Aparecerán sugerencias mientras escribes.'
        },
        {
          q: '¿Puedo ver productos por categoría?',
          a: 'Sí, en la página principal hay categorías con imágenes. También puedes usar filtros en la página de productos.'
        },
        {
          q: '¿Cómo sé si un producto está disponible?',
          a: 'Los productos muestran su disponibilidad y stock. Los agotados aparecen marcados claramente.'
        }
      ]
    },
    {
      category: 'Compras',
      questions: [
        {
          q: '¿Cómo agrego productos al carrito?',
          a: 'Selecciona el color deseado y haz clic en "Agregar al Carrito". El producto se agregará automáticamente.'
        },
        {
          q: '¿Puedo modificar mi carrito?',
          a: 'Sí, puedes cambiar cantidades, eliminar productos o mover a lista de deseos desde la página del carrito.'
        },
        {
          q: '¿Cómo uso los cupones de descuento?',
          a: 'En el checkout, ingresa el código del cupón. Se aplicará automáticamente si cumples los requisitos.'
        }
      ]
    },
    {
      category: 'Entrega',
      questions: [
        {
          q: '¿Hacen entregas a domicilio?',
          a: 'Sí, entregamos en múltiples zonas de Santiago de Cuba. El costo se calcula según la zona.'
        },
        {
          q: '¿Puedo recoger en la tienda?',
          a: 'Sí, puedes recoger sin costo adicional. Te proporcionamos ubicación exacta y calculadora de distancia.'
        },
        {
          q: '¿Cómo coordino la entrega?',
          a: 'Después de confirmar el pedido, te contactamos por WhatsApp para coordinar horarios.'
        }
      ]
    },
    {
      category: 'Pagos',
      questions: [
        {
          q: '¿En qué monedas puedo ver los precios?',
          a: 'Soportamos CUP, USD, EUR y MLC. Puedes cambiar la moneda en tu perfil.'
        },
        {
          q: '¿Cómo se procesan los pagos?',
          a: 'Los pagos se coordinan directamente por WhatsApp según tu preferencia y disponibilidad.'
        },
        {
          q: '¿Las tasas de cambio están actualizadas?',
          a: 'Sí, usamos tasas del mercado informal cubano actualizadas regularmente.'
        }
      ]
    }
  ],

  // Información técnica
  technicalInfo: {
    features: [
      'Diseño responsivo para todos los dispositivos',
      'Búsqueda inteligente con sugerencias',
      'Sistema de filtros avanzado',
      'Carrito sincronizado con la cuenta',
      'Lista de deseos personalizada',
      'Gestión múltiple de direcciones',
      'Sistema de cupones de descuento',
      'Múltiples monedas con conversión automática',
      'Integración directa con WhatsApp',
      'Panel de administración completo'
    ],
    technologies: [
      'React.js para interfaz dinámica',
      'Context API para gestión de estado',
      'CSS Modules para estilos modulares',
      'React Router para navegación',
      'Axios para comunicación con API',
      'JWT para autenticación segura',
      'LocalStorage para persistencia',
      'Canvas Confetti para efectos visuales'
    ]
  }
};

/**
 * Obtiene contenido específico por sección
 */
export const getSectionContent = (sectionId) => {
  return GUIDE_CONTENT.tourSections.find(section => section.id === sectionId);
};

/**
 * Obtiene todas las preguntas frecuentes
 */
export const getAllFAQs = () => {
  return GUIDE_CONTENT.faqs;
};

/**
 * Obtiene consejos por categoría
 */
export const getTipsByCategory = (category) => {
  const tipSection = GUIDE_CONTENT.tips.find(tip => tip.category === category);
  return tipSection ? tipSection.tips : [];
};

/**
 * Genera tabla de contenidos
 */
export const generateTableOfContents = () => {
  return GUIDE_CONTENT.tourSections.map((section, index) => ({
    page: index + 2, // Asumiendo que la portada es página 1
    title: section.title,
    description: section.description
  }));
};