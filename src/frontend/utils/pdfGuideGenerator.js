import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { toastHandler } from './utils';
import { ToastType } from '../constants/constants';

/**
 * Generador de guía PDF completa de la tienda Yero Shop!
 * Crea un tour guiado paso a paso con capturas de pantalla en tiempo real
 */

export class PDFGuideGenerator {
  constructor() {
    this.pdf = null;
    this.currentPage = 1;
    this.pageHeight = 297; // A4 height in mm
    this.pageWidth = 210; // A4 width in mm
    this.margin = 20;
    this.lineHeight = 7;
    this.currentY = this.margin;
  }

  /**
   * Inicializa el documento PDF
   */
  initializePDF() {
    this.pdf = new jsPDF('p', 'mm', 'a4');
    this.currentY = this.margin;
    
    // Configurar fuentes
    this.pdf.setFont('helvetica');
  }

  /**
   * Agrega una nueva página si es necesario
   */
  checkPageBreak(requiredHeight = 20) {
    if (this.currentY + requiredHeight > this.pageHeight - this.margin) {
      this.pdf.addPage();
      this.currentPage++;
      this.currentY = this.margin;
      return true;
    }
    return false;
  }

  /**
   * Agrega texto con formato
   */
  addText(text, fontSize = 12, style = 'normal', color = [0, 0, 0]) {
    this.pdf.setFontSize(fontSize);
    this.pdf.setTextColor(...color);
    
    if (style === 'bold') {
      this.pdf.setFont('helvetica', 'bold');
    } else {
      this.pdf.setFont('helvetica', 'normal');
    }

    // Dividir texto en líneas que quepan en la página
    const maxWidth = this.pageWidth - (this.margin * 2);
    const lines = this.pdf.splitTextToSize(text, maxWidth);
    
    lines.forEach(line => {
      this.checkPageBreak();
      this.pdf.text(line, this.margin, this.currentY);
      this.currentY += this.lineHeight;
    });
  }

  /**
   * Agrega un título con formato especial
   */
  addTitle(title, level = 1) {
    this.checkPageBreak(15);
    
    const fontSize = level === 1 ? 18 : level === 2 ? 16 : 14;
    const color = level === 1 ? [30, 64, 175] : [59, 130, 246]; // Azul primario
    
    this.currentY += 5; // Espacio antes del título
    this.addText(title, fontSize, 'bold', color);
    this.currentY += 3; // Espacio después del título
  }

  /**
   * Agrega una línea separadora
   */
  addSeparator() {
    this.checkPageBreak(5);
    this.pdf.setDrawColor(200, 200, 200);
    this.pdf.line(this.margin, this.currentY, this.pageWidth - this.margin, this.currentY);
    this.currentY += 5;
  }

  /**
   * Captura screenshot de un elemento específico
   */
  async captureElement(selector, description) {
    try {
      const element = document.querySelector(selector);
      if (!element) {
        console.warn(`Elemento ${selector} no encontrado`);
        return null;
      }

      const canvas = await html2canvas(element, {
        scale: 1,
        useCORS: true,
        allowTaint: true,
        backgroundColor: '#ffffff'
      });

      return {
        canvas,
        description,
        width: canvas.width,
        height: canvas.height
      };
    } catch (error) {
      console.error('Error capturando elemento:', error);
      return null;
    }
  }

  /**
   * Agrega una imagen al PDF
   */
  addImage(canvas, description, maxWidth = 160) {
    if (!canvas) return;

    const imgWidth = maxWidth;
    const imgHeight = (canvas.height * maxWidth) / canvas.width;
    
    this.checkPageBreak(imgHeight + 15);
    
    // Agregar descripción
    if (description) {
      this.addText(description, 10, 'bold', [100, 100, 100]);
      this.currentY += 2;
    }

    // Agregar imagen
    const imgData = canvas.toDataURL('image/jpeg', 0.8);
    this.pdf.addImage(imgData, 'JPEG', this.margin, this.currentY, imgWidth, imgHeight);
    this.currentY += imgHeight + 10;
  }

  /**
   * Agrega la portada del documento
   */
  addCover() {
    // Logo y título principal
    this.pdf.setFontSize(28);
    this.pdf.setTextColor(30, 64, 175);
    this.pdf.setFont('helvetica', 'bold');
    this.pdf.text('Yero Shop!', this.pageWidth / 2, 50, { align: 'center' });
    
    this.pdf.setFontSize(20);
    this.pdf.setTextColor(100, 100, 100);
    this.pdf.text('Guía Completa de Usuario', this.pageWidth / 2, 65, { align: 'center' });
    
    this.pdf.setFontSize(14);
    this.pdf.text('Tour Guiado Paso a Paso', this.pageWidth / 2, 75, { align: 'center' });

    // Información de la tienda
    this.currentY = 100;
    this.addText('🏪 La plataforma de comercio detrás de todo', 16, 'bold', [59, 130, 246]);
    this.currentY += 5;
    
    this.addText('📍 Santiago de Cuba, Cuba', 12);
    this.addText('📱 WhatsApp: +53 54690878', 12);
    this.addText('🌐 yeroshop.vercel.app', 12);
    
    this.currentY += 20;
    this.addSeparator();
    
    // Tabla de contenidos
    this.addTitle('📋 Contenido de la Guía', 2);
    
    const contents = [
      '1. Introducción a Yero Shop!',
      '2. Navegación Principal',
      '3. Explorar Productos y Categorías',
      '4. Búsqueda Avanzada',
      '5. Gestión de Carrito de Compras',
      '6. Lista de Deseos',
      '7. Registro e Inicio de Sesión',
      '8. Gestión de Direcciones',
      '9. Proceso de Checkout',
      '10. Configuración de Monedas',
      '11. Pedidos por WhatsApp',
      '12. Panel de Administración',
      '13. Consejos y Trucos',
      '14. Preguntas Frecuentes'
    ];

    contents.forEach(item => {
      this.addText(item, 11);
    });

    // Fecha de generación
    this.currentY = this.pageHeight - 40;
    this.addText(`📅 Guía generada el: ${new Date().toLocaleDateString('es-CU', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })}`, 10, 'normal', [150, 150, 150]);
  }

  /**
   * Agrega sección de introducción
   */
  addIntroduction() {
    this.pdf.addPage();
    this.currentPage++;
    this.currentY = this.margin;

    this.addTitle('🎯 1. Introducción a Yero Shop!');
    
    this.addText('¡Bienvenido a Yero Shop!, tu tienda online de confianza en Santiago de Cuba! Esta guía te ayudará a aprovechar al máximo todas las funcionalidades de nuestra plataforma de comercio electrónico.', 12);
    
    this.addTitle('✨ Características Principales:', 2);
    
    const features = [
      '🛍️ Catálogo completo de productos electrónicos',
      '🔍 Búsqueda inteligente con sugerencias',
      '🛒 Carrito de compras avanzado',
      '❤️ Lista de deseos personalizada',
      '📍 Gestión de direcciones de entrega',
      '💱 Múltiples monedas (CUP, USD, EUR, MLC)',
      '🎫 Sistema de cupones de descuento',
      '📱 Pedidos directos por WhatsApp',
      '🚚 Entrega a domicilio y recogida en tienda',
      '👑 Panel de administración completo'
    ];

    features.forEach(feature => {
      this.addText(feature, 11);
    });

    this.addSeparator();
    
    this.addTitle('🎯 Objetivo de esta Guía:', 2);
    this.addText('Esta guía te llevará paso a paso por todas las funcionalidades de Yero Shop!, desde la navegación básica hasta funciones avanzadas como la gestión de pedidos y configuración de monedas.', 12);
  }

  /**
   * Agrega sección de navegación
   */
  addNavigationSection() {
    this.pdf.addPage();
    this.currentPage++;
    this.currentY = this.margin;

    this.addTitle('🧭 2. Navegación Principal');
    
    this.addText('La barra de navegación de Yero Shop! está diseñada para ser intuitiva y accesible desde cualquier dispositivo.', 12);
    
    this.addTitle('🔝 Barra Superior:', 2);
    
    const navElements = [
      '🏠 Logo "Yero Shop!" - Lleva al inicio',
      '🔍 Barra de búsqueda - Busca productos específicos',
      '📱 "Explorar" - Ve al catálogo completo',
      '👤 Perfil/Login - Gestiona tu cuenta',
      '❤️ Lista de deseos - Productos guardados',
      '🛒 Carrito - Productos para comprar'
    ];

    navElements.forEach(element => {
      this.addText(element, 11);
    });

    this.addTitle('📱 Navegación Móvil:', 2);
    this.addText('En dispositivos móviles, la navegación se adapta automáticamente para una mejor experiencia táctil. Los iconos se reorganizan para facilitar el acceso con una sola mano.', 12);
  }

  /**
   * Agrega sección de productos
   */
  addProductsSection() {
    this.pdf.addPage();
    this.currentPage++;
    this.currentY = this.margin;

    this.addTitle('📦 3. Explorar Productos y Categorías');
    
    this.addTitle('🏠 Página de Inicio:', 2);
    this.addText('La página principal muestra:', 12);
    
    const homeFeatures = [
      '🎯 Banner principal con mensaje de bienvenida',
      '📂 Categorías principales con imágenes atractivas',
      '⭐ Productos destacados seleccionados',
      '🔗 Enlaces rápidos a secciones importantes'
    ];

    homeFeatures.forEach(feature => {
      this.addText(feature, 11);
    });

    this.addTitle('📂 Sistema de Categorías:', 2);
    this.addText('Las categorías están organizadas visualmente con imágenes representativas. Al hacer clic en una categoría, se filtran automáticamente los productos relacionados.', 12);

    this.addTitle('🛍️ Página de Productos:', 2);
    this.addText('La página de productos incluye:', 12);
    
    const productFeatures = [
      '🎛️ Filtros avanzados (precio, marca, categoría, calificación)',
      '📊 Ordenamiento (precio, nombre, popularidad)',
      '📄 Paginación inteligente',
      '🔍 Búsqueda en tiempo real',
      '📱 Diseño responsivo para todos los dispositivos'
    ];

    productFeatures.forEach(feature => {
      this.addText(feature, 11);
    });
  }

  /**
   * Agrega sección de búsqueda
   */
  addSearchSection() {
    this.pdf.addPage();
    this.currentPage++;
    this.currentY = this.margin;

    this.addTitle('🔍 4. Búsqueda Avanzada');
    
    this.addText('El sistema de búsqueda de Yero Shop! utiliza tecnología avanzada para encontrar exactamente lo que necesitas.', 12);
    
    this.addTitle('🚀 Características de la Búsqueda:', 2);
    
    const searchFeatures = [
      '⚡ Sugerencias en tiempo real mientras escribes',
      '🧠 Búsqueda inteligente con corrección automática',
      '💾 Caché de búsquedas para mayor velocidad',
      '🎯 Filtrado automático por nombre de producto',
      '📱 Optimizada para dispositivos móviles'
    ];

    searchFeatures.forEach(feature => {
      this.addText(feature, 11);
    });

    this.addTitle('📝 Cómo Usar la Búsqueda:', 2);
    
    const searchSteps = [
      '1. 📝 Escribe el nombre del producto en la barra de búsqueda',
      '2. 👀 Observa las sugerencias que aparecen automáticamente',
      '3. 🖱️ Haz clic en una sugerencia o presiona Enter',
      '4. 📋 Los resultados se mostrarán filtrados automáticamente',
      '5. 🎛️ Usa los filtros adicionales para refinar tu búsqueda'
    ];

    searchSteps.forEach(step => {
      this.addText(step, 11);
    });
  }

  /**
   * Agrega sección del carrito
   */
  addCartSection() {
    this.pdf.addPage();
    this.currentPage++;
    this.currentY = this.margin;

    this.addTitle('🛒 5. Gestión de Carrito de Compras');
    
    this.addText('El carrito de Yero Shop! está diseñado para una experiencia de compra fluida y segura.', 12);
    
    this.addTitle('➕ Agregar Productos:', 2);
    
    const addSteps = [
      '1. 🎨 Selecciona el color deseado del producto',
      '2. 🛒 Haz clic en "Agregar al Carrito"',
      '3. ✅ Confirma que el producto se agregó (aparece notificación)',
      '4. 🔢 El contador del carrito se actualiza automáticamente'
    ];

    addSteps.forEach(step => {
      this.addText(step, 11);
    });

    this.addTitle('⚙️ Gestión en el Carrito:', 2);
    
    const cartFeatures = [
      '📊 Resumen detallado de precios',
      '🔢 Modificar cantidades de productos',
      '🎨 Ver colores seleccionados',
      '🗑️ Eliminar productos individuales',
      '🧹 Limpiar carrito completo',
      '❤️ Mover productos a lista de deseos',
      '💰 Cálculo automático de totales'
    ];

    cartFeatures.forEach(feature => {
      this.addText(feature, 11);
    });

    this.addTitle('💡 Consejos del Carrito:', 2);
    this.addText('• El carrito se sincroniza automáticamente con tu cuenta', 11);
    this.addText('• Los productos se reservan temporalmente mientras están en tu carrito', 11);
    this.addText('• Puedes modificar cantidades directamente desde el carrito', 11);
    this.addText('• El sistema verifica automáticamente la disponibilidad de stock', 11);
  }

  /**
   * Agrega sección de lista de deseos
   */
  addWishlistSection() {
    this.pdf.addPage();
    this.currentPage++;
    this.currentY = this.margin;

    this.addTitle('❤️ 6. Lista de Deseos');
    
    this.addText('La lista de deseos te permite guardar productos para comprar más tarde.', 12);
    
    this.addTitle('💝 Funcionalidades:', 2);
    
    const wishlistFeatures = [
      '❤️ Guardar productos favoritos',
      '🛒 Mover directamente al carrito',
      '👀 Seguimiento de productos de interés',
      '🔄 Sincronización con tu cuenta',
      '📱 Acceso desde cualquier dispositivo',
      '🧹 Gestión completa de la lista'
    ];

    wishlistFeatures.forEach(feature => {
      this.addText(feature, 11);
    });

    this.addTitle('📝 Cómo Usar la Lista de Deseos:', 2);
    
    const wishlistSteps = [
      '1. ❤️ Haz clic en el corazón de cualquier producto',
      '2. ✅ El producto se agrega automáticamente',
      '3. 📋 Ve a tu lista de deseos desde el menú',
      '4. 🛒 Mueve productos al carrito cuando quieras comprar',
      '5. 🗑️ Elimina productos que ya no te interesen'
    ];

    wishlistSteps.forEach(step => {
      this.addText(step, 11);
    });
  }

  /**
   * Agrega sección de autenticación
   */
  addAuthSection() {
    this.pdf.addPage();
    this.currentPage++;
    this.currentY = this.margin;

    this.addTitle('🔐 7. Registro e Inicio de Sesión');
    
    this.addTitle('📝 Crear Nueva Cuenta:', 2);
    
    const signupSteps = [
      '1. 🖱️ Haz clic en "Iniciar Sesión" en la navegación',
      '2. 📝 Selecciona "regístrate aquí"',
      '3. ✍️ Completa el formulario con tus datos',
      '4. 📧 Usa un email válido (Gmail, Yahoo, Hotmail, etc.)',
      '5. 🔒 Crea una contraseña segura (mínimo 6 caracteres)',
      '6. ✅ Confirma tu contraseña',
      '7. 🎉 ¡Listo! Ya puedes usar todas las funciones'
    ];

    signupSteps.forEach(step => {
      this.addText(step, 11);
    });

    this.addTitle('🚪 Iniciar Sesión:', 2);
    
    const loginOptions = [
      '👤 Cuenta personal - Usa tu email y contraseña',
      '👥 Cuenta de invitado - Acceso rápido para probar',
      '👑 Acceso administrador - Solo para personal autorizado'
    ];

    loginOptions.forEach(option => {
      this.addText(option, 11);
    });

    this.addTitle('🔒 Seguridad:', 2);
    this.addText('• Todas las contraseñas están encriptadas', 11);
    this.addText('• Tu información personal está protegida', 11);
    this.addText('• Sesiones seguras con tokens JWT', 11);
    this.addText('• Puedes cerrar sesión desde cualquier dispositivo', 11);
  }

  /**
   * Agrega sección de direcciones
   */
  addAddressSection() {
    this.pdf.addPage();
    this.currentPage++;
    this.currentY = this.margin;

    this.addTitle('📍 8. Gestión de Direcciones');
    
    this.addText('Yero Shop! ofrece dos tipos de servicio para recibir tus productos.', 12);
    
    this.addTitle('🚚 Entrega a Domicilio:', 2);
    
    const deliverySteps = [
      '1. 📍 Selecciona tu zona en Santiago de Cuba',
      '2. 🏠 Ingresa tu dirección completa',
      '3. 👤 Especifica quién recibirá el pedido',
      '4. 📞 Proporciona número de contacto del receptor',
      '5. 💰 El costo de entrega se calcula automáticamente'
    ];

    deliverySteps.forEach(step => {
      this.addText(step, 11);
    });

    this.addTitle('🏪 Recogida en Tienda:', 2);
    
    const pickupSteps = [
      '1. 📍 Selecciona "Recoger en local"',
      '2. 🗺️ Ve la ubicación exacta de la tienda',
      '3. 📱 Calcula la distancia desde tu ubicación',
      '4. 🕒 Coordina el horario de recogida',
      '5. 💰 Sin costo adicional de entrega'
    ];

    pickupSteps.forEach(step => {
      this.addText(step, 11);
    });

    this.addTitle('📋 Zonas de Entrega Disponibles:', 2);
    
    const zones = [
      'Vista Alegre - $300 CUP',
      'Sueño - $250 CUP',
      'San Pedrito - $150 CUP',
      'Altamira - $500 CUP',
      'Micro 7, 8, 9 - $150 CUP',
      'Y muchas más...'
    ];

    zones.forEach(zone => {
      this.addText(zone, 11);
    });
  }

  /**
   * Agrega sección de checkout
   */
  addCheckoutSection() {
    this.pdf.addPage();
    this.currentPage++;
    this.currentY = this.margin;

    this.addTitle('💳 9. Proceso de Checkout');
    
    this.addText('El proceso de finalización de compra en Yero Shop! es simple y seguro.', 12);
    
    this.addTitle('📋 Pasos del Checkout:', 2);
    
    const checkoutSteps = [
      '1. 🛒 Revisa los productos en tu carrito',
      '2. 📍 Selecciona o agrega una dirección de entrega',
      '3. 🎫 Aplica cupones de descuento si tienes',
      '4. 💰 Revisa el resumen de precios',
      '5. 📱 Confirma tu pedido por WhatsApp',
      '6. ✅ Recibe confirmación del pedido'
    ];

    checkoutSteps.forEach(step => {
      this.addText(step, 11);
    });

    this.addTitle('🎫 Sistema de Cupones:', 2);
    
    const couponInfo = [
      '🔍 Busca cupones disponibles en el checkout',
      '💰 Los descuentos se aplican automáticamente',
      '📊 Ve el ahorro en tiempo real',
      '⚠️ Los cupones tienen requisitos mínimos de compra',
      '🎯 Solo se aplican si todos los productos los permiten'
    ];

    couponInfo.forEach(info => {
      this.addText(info, 11);
    });

    this.addTitle('📱 Pedido por WhatsApp:', 2);
    this.addText('Yero Shop! utiliza WhatsApp para procesar pedidos de forma personal y directa:', 12);
    
    const whatsappFeatures = [
      '📋 Resumen completo del pedido',
      '👤 Información del cliente',
      '📍 Detalles de entrega',
      '💰 Desglose de precios',
      '🗺️ Enlaces de ubicación si es recogida',
      '📞 Contacto directo con la tienda'
    ];

    whatsappFeatures.forEach(feature => {
      this.addText(feature, 11);
    });
  }

  /**
   * Agrega sección de monedas
   */
  addCurrencySection() {
    this.pdf.addPage();
    this.currentPage++;
    this.currentY = this.margin;

    this.addTitle('💱 10. Configuración de Monedas');
    
    this.addText('Yero Shop! soporta múltiples monedas para tu comodidad.', 12);
    
    this.addTitle('💰 Monedas Disponibles:', 2);
    
    const currencies = [
      '🇨🇺 CUP (Peso Cubano) - Moneda base',
      '🇺🇸 USD (Dólar Estadounidense) - Tasa del mercado',
      '🇪🇺 EUR (Euro) - Tasa del mercado',
      '🏦 MLC (Moneda Libremente Convertible) - Moneda digital'
    ];

    currencies.forEach(currency => {
      this.addText(currency, 11);
    });

    this.addTitle('🔄 Cambiar Moneda:', 2);
    
    const currencySteps = [
      '1. 👤 Ve a tu perfil',
      '2. 💱 Selecciona "Monedas"',
      '3. 🎯 Elige la moneda deseada',
      '4. ✅ Los precios se actualizan automáticamente',
      '5. 💾 Tu preferencia se guarda para futuras visitas'
    ];

    currencySteps.forEach(step => {
      this.addText(step, 11);
    });

    this.addTitle('📊 Conversión Automática:', 2);
    this.addText('Todos los precios se convierten automáticamente según las tasas de cambio actuales del mercado cubano. La conversión es transparente y se muestra en tiempo real.', 12);
  }

  /**
   * Agrega sección del panel de administración
   */
  addAdminSection() {
    this.pdf.addPage();
    this.currentPage++;
    this.currentY = this.margin;

    this.addTitle('👑 11. Panel de Administración');
    
    this.addText('El panel de administración permite gestionar completamente la tienda (solo para administradores).', 12);
    
    this.addTitle('🛠️ Funcionalidades del Admin:', 2);
    
    const adminFeatures = [
      '📦 Gestión completa de productos',
      '📂 Administración de categorías',
      '🎫 Control de cupones de descuento',
      '📍 Configuración de zonas de entrega',
      '💬 Gestión de mensajes de la tienda',
      '💱 Configuración de tasas de cambio',
      '💾 Sistema de backup completo',
      '📊 Estadísticas en tiempo real'
    ];

    adminFeatures.forEach(feature => {
      this.addText(feature, 11);
    });

    this.addTitle('🔐 Acceso de Administrador:', 2);
    this.addText('Para acceder al panel de administración:', 12);
    
    const adminSteps = [
      '1. 🚪 Ve a la página de login',
      '2. 👑 Haz clic en "Acceso Administrador"',
      '3. 🔑 Ingresa las credenciales de administrador',
      '4. ✅ Accede al panel de control completo'
    ];

    adminSteps.forEach(step => {
      this.addText(step, 11);
    });
  }

  /**
   * Agrega consejos y trucos
   */
  addTipsSection() {
    this.pdf.addPage();
    this.currentPage++;
    this.currentY = this.margin;

    this.addTitle('💡 12. Consejos y Trucos');
    
    this.addTitle('🚀 Optimiza tu Experiencia:', 2);
    
    const tips = [
      '📱 Usa la app en modo pantalla completa para mejor experiencia',
      '🔍 Aprovecha las sugerencias de búsqueda para encontrar productos rápido',
      '❤️ Guarda productos en lista de deseos para comprar después',
      '🎫 Revisa cupones disponibles antes de finalizar compra',
      '📍 Calcula distancia a la tienda si vas a recoger',
      '💱 Cambia de moneda según tu preferencia',
      '🔔 Mantén las notificaciones activadas para ofertas',
      '📱 Usa WhatsApp para comunicación directa con la tienda'
    ];

    tips.forEach(tip => {
      this.addText(tip, 11);
    });

    this.addTitle('⚡ Funciones Avanzadas:', 2);
    
    const advancedTips = [
      '🎛️ Combina múltiples filtros para búsquedas precisas',
      '📊 Ordena productos por precio o popularidad',
      '🎨 Compara colores disponibles antes de elegir',
      '📦 Verifica disponibilidad de envío por producto',
      '💰 Usa el calculador de distancia para planificar recogida',
      '🔄 Sincroniza tu carrito entre dispositivos'
    ];

    advancedTips.forEach(tip => {
      this.addText(tip, 11);
    });
  }

  /**
   * Agrega preguntas frecuentes
   */
  addFAQSection() {
    this.pdf.addPage();
    this.currentPage++;
    this.currentY = this.margin;

    this.addTitle('❓ 13. Preguntas Frecuentes');
    
    const faqs = [
      {
        q: '🛒 ¿Cómo puedo modificar mi carrito?',
        a: 'Puedes cambiar cantidades, eliminar productos o mover a lista de deseos directamente desde la página del carrito.'
      },
      {
        q: '📱 ¿Cómo funciona el pedido por WhatsApp?',
        a: 'Al finalizar compra, se genera automáticamente un mensaje con todos los detalles que se envía a nuestro WhatsApp oficial.'
      },
      {
        q: '💱 ¿Puedo cambiar la moneda de los precios?',
        a: 'Sí, ve a Perfil > Monedas y selecciona entre CUP, USD, EUR o MLC. Los precios se actualizan automáticamente.'
      },
      {
        q: '🚚 ¿Cuánto cuesta la entrega?',
        a: 'El costo varía según la zona en Santiago de Cuba. Se calcula automáticamente al seleccionar tu dirección.'
      },
      {
        q: '🎫 ¿Cómo uso los cupones de descuento?',
        a: 'En el checkout, ingresa el código del cupón. Solo se aplica si todos los productos del carrito lo permiten.'
      },
      {
        q: '📍 ¿Puedo recoger en la tienda?',
        a: 'Sí, selecciona "Recoger en local" al agregar dirección. Incluye mapa y calculadora de distancia.'
      }
    ];

    faqs.forEach(faq => {
      this.addTitle(faq.q, 3);
      this.addText(faq.a, 11);
      this.currentY += 3;
    });
  }

  /**
   * Agrega información de contacto
   */
  addContactSection() {
    this.pdf.addPage();
    this.currentPage++;
    this.currentY = this.margin;

    this.addTitle('📞 14. Información de Contacto');
    
    this.addText('¿Necesitas ayuda? Contáctanos por cualquiera de estos medios:', 12);
    
    this.addTitle('📱 WhatsApp Oficial:', 2);
    this.addText('+53 54690878', 14, 'bold', [37, 211, 102]);
    this.addText('Disponible para consultas, pedidos y soporte técnico', 11);
    
    this.addTitle('🏪 Ubicación Física:', 2);
    this.addText('Santiago de Cuba, Cuba', 12, 'bold');
    this.addText('Coordenadas GPS: 20.039585, -75.849663', 11);
    
    this.addTitle('🌐 Sitio Web:', 2);
    this.addText('https://yeroshop.vercel.app', 12, 'bold', [59, 130, 246]);
    
    this.addTitle('📧 Redes Sociales:', 2);
    this.addText('🐦 Twitter: @yero_shop', 11);
    this.addText('💼 LinkedIn: Yero Shop', 11);
    this.addText('📘 Facebook: Yero Shop', 11);

    this.addSeparator();
    
    this.addTitle('🙏 Agradecimientos:', 2);
    this.addText('Gracias por elegir Yero Shop! Tu confianza es nuestro mayor tesoro. Trabajamos cada día para superar tus expectativas y brindarte la mejor experiencia de compra online en Cuba.', 12);
    
    this.currentY += 10;
    this.addText('✨ "La plataforma de comercio detrás de todo" ✨', 14, 'bold', [59, 130, 246]);
  }

  /**
   * Agrega numeración de páginas
   */
  addPageNumbers() {
    const totalPages = this.pdf.internal.getNumberOfPages();
    
    for (let i = 1; i <= totalPages; i++) {
      this.pdf.setPage(i);
      this.pdf.setFontSize(10);
      this.pdf.setTextColor(150, 150, 150);
      this.pdf.text(
        `Página ${i} de ${totalPages}`,
        this.pageWidth / 2,
        this.pageHeight - 10,
        { align: 'center' }
      );
      
      // Agregar marca de agua en cada página
      this.pdf.setTextColor(240, 240, 240);
      this.pdf.setFontSize(40);
      this.pdf.text(
        'Yero Shop!',
        this.pageWidth / 2,
        this.pageHeight / 2,
        { align: 'center', angle: 45 }
      );
    }
  }

  /**
   * Genera el PDF completo
   */
  async generateCompletePDF() {
    try {
      toastHandler(ToastType.Info, '📄 Generando guía PDF completa...');
      
      this.initializePDF();
      
      // Agregar todas las secciones
      this.addCover();
      this.addIntroduction();
      this.addNavigationSection();
      this.addProductsSection();
      this.addSearchSection();
      this.addCartSection();
      this.addWishlistSection();
      this.addAuthSection();
      this.addAddressSection();
      this.addCheckoutSection();
      this.addCurrencySection();
      this.addAdminSection();
      this.addTipsSection();
      this.addFAQSection();
      this.addContactSection();
      
      // Agregar numeración de páginas
      this.addPageNumbers();
      
      // Generar nombre del archivo
      const timestamp = new Date().toISOString().split('T')[0];
      const fileName = `Yero-Shop-Guia-Completa-${timestamp}.pdf`;
      
      // Descargar el PDF
      this.pdf.save(fileName);
      
      toastHandler(ToastType.Success, '🎉 ¡Guía PDF descargada exitosamente!');
      toastHandler(ToastType.Info, `📁 Archivo: ${fileName}`);
      
      return true;
      
    } catch (error) {
      console.error('Error generando PDF:', error);
      toastHandler(ToastType.Error, 'Error al generar la guía PDF');
      return false;
    }
  }
}

/**
 * Función principal para generar y descargar la guía
 */
export const generateStoreGuide = async () => {
  const generator = new PDFGuideGenerator();
  return await generator.generateCompletePDF();
};

/**
 * Función para generar guía con capturas de pantalla en tiempo real
 */
export const generateInteractiveGuide = async () => {
  try {
    toastHandler(ToastType.Info, '📸 Generando guía interactiva con capturas...');
    
    const generator = new PDFGuideGenerator();
    generator.initializePDF();
    
    // Portada
    generator.addCover();
    
    // Capturar elementos actuales de la página
    const captures = [];
    
    // Intentar capturar navbar si existe
    const navbarCapture = await generator.captureElement('nav', '🧭 Barra de Navegación Principal');
    if (navbarCapture) captures.push(navbarCapture);
    
    // Intentar capturar hero si existe
    const heroCapture = await generator.captureElement('.hero', '🎯 Sección Principal de Bienvenida');
    if (heroCapture) captures.push(heroCapture);
    
    // Agregar capturas al PDF
    if (captures.length > 0) {
      generator.pdf.addPage();
      generator.currentY = generator.margin;
      generator.addTitle('📸 Capturas de Pantalla en Tiempo Real');
      
      captures.forEach(capture => {
        generator.addImage(capture.canvas, capture.description);
      });
    }
    
    // Agregar resto del contenido
    generator.addIntroduction();
    generator.addNavigationSection();
    generator.addProductsSection();
    generator.addSearchSection();
    generator.addCartSection();
    generator.addWishlistSection();
    generator.addAuthSection();
    generator.addAddressSection();
    generator.addCheckoutSection();
    generator.addCurrencySection();
    generator.addAdminSection();
    generator.addTipsSection();
    generator.addFAQSection();
    generator.addContactSection();
    
    // Finalizar
    generator.addPageNumbers();
    
    const timestamp = new Date().toISOString().split('T')[0];
    const fileName = `Yero-Shop-Guia-Interactiva-${timestamp}.pdf`;
    
    generator.pdf.save(fileName);
    
    toastHandler(ToastType.Success, '🎉 ¡Guía interactiva descargada exitosamente!');
    toastHandler(ToastType.Info, `📁 Archivo: ${fileName}`);
    
    return true;
    
  } catch (error) {
    console.error('Error generando guía interactiva:', error);
    toastHandler(ToastType.Error, 'Error al generar la guía interactiva');
    return false;
  }
};