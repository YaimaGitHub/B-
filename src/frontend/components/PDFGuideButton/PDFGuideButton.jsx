import React, { useState } from 'react';
import { generateStoreGuide, generateInteractiveGuide } from '../../utils/pdfGuideGenerator';
import { toastHandler } from '../../utils/utils';
import { ToastType } from '../../constants/constants';
import styles from './PDFGuideButton.module.css';

const PDFGuideButton = ({ variant = 'standard', className = '' }) => {
  const [isGenerating, setIsGenerating] = useState(false);
  const [showOptions, setShowOptions] = useState(false);

  const handleGenerateStandardGuide = async () => {
    setIsGenerating(true);
    setShowOptions(false);
    
    try {
      toastHandler(ToastType.Info, '📄 Preparando guía completa de Yero Shop!...');
      
      // Simular tiempo de preparación
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      const success = await generateStoreGuide();
      
      if (success) {
        toastHandler(ToastType.Success, '🎉 ¡Guía PDF lista! Revisa tu carpeta de descargas');
        toastHandler(ToastType.Info, '📖 La guía incluye tour completo paso a paso');
      }
      
    } catch (error) {
      console.error('Error:', error);
      toastHandler(ToastType.Error, 'Error al generar la guía');
    } finally {
      setIsGenerating(false);
    }
  };

  const handleGenerateInteractiveGuide = async () => {
    setIsGenerating(true);
    setShowOptions(false);
    
    try {
      toastHandler(ToastType.Info, '📸 Generando guía con capturas en tiempo real...');
      
      // Simular tiempo de captura
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      const success = await generateInteractiveGuide();
      
      if (success) {
        toastHandler(ToastType.Success, '🎉 ¡Guía interactiva lista con capturas actuales!');
        toastHandler(ToastType.Info, '📸 Incluye screenshots de la tienda en tiempo real');
      }
      
    } catch (error) {
      console.error('Error:', error);
      toastHandler(ToastType.Error, 'Error al generar la guía interactiva');
    } finally {
      setIsGenerating(false);
    }
  };

  const toggleOptions = () => {
    setShowOptions(!showOptions);
  };

  if (variant === 'simple') {
    return (
      <button
        onClick={handleGenerateStandardGuide}
        disabled={isGenerating}
        className={`btn btn-success ${styles.simpleButton} ${className}`}
      >
        {isGenerating ? (
          <span className={styles.loading}>
            <span className="loader-2"></span>
            Generando...
          </span>
        ) : (
          <>
            <span className={styles.icon}>📄</span>
            Descargar Guía PDF
          </>
        )}
      </button>
    );
  }

  return (
    <div className={`${styles.pdfGuideContainer} ${className}`}>
      <button
        onClick={toggleOptions}
        disabled={isGenerating}
        className={`btn btn-success ${styles.mainButton}`}
      >
        {isGenerating ? (
          <span className={styles.loading}>
            <span className="loader-2"></span>
            Generando guía...
          </span>
        ) : (
          <>
            <span className={styles.icon}>📚</span>
            <span className={styles.buttonText}>
              <span className={styles.mainText}>Guía de Usuario</span>
              <span className={styles.subText}>Tour completo de la tienda</span>
            </span>
            <span className={styles.arrow}>{showOptions ? '▲' : '▼'}</span>
          </>
        )}
      </button>

      {showOptions && !isGenerating && (
        <div className={styles.optionsMenu}>
          <div className={styles.optionsHeader}>
            <h4>📖 Selecciona el tipo de guía:</h4>
          </div>
          
          <button
            onClick={handleGenerateStandardGuide}
            className={`btn btn-primary ${styles.optionButton}`}
          >
            <div className={styles.optionContent}>
              <span className={styles.optionIcon}>📄</span>
              <div className={styles.optionText}>
                <strong>Guía Estándar</strong>
                <small>Tour completo paso a paso con instrucciones detalladas</small>
              </div>
            </div>
          </button>

          <button
            onClick={handleGenerateInteractiveGuide}
            className={`btn btn-hipster ${styles.optionButton}`}
          >
            <div className={styles.optionContent}>
              <span className={styles.optionIcon}>📸</span>
              <div className={styles.optionText}>
                <strong>Guía Interactiva</strong>
                <small>Incluye capturas de pantalla actuales de la tienda</small>
              </div>
            </div>
          </button>

          <div className={styles.optionsFooter}>
            <small>💡 Ambas guías incluyen información completa sobre todas las funcionalidades</small>
          </div>
        </div>
      )}

      {/* Información adicional */}
      <div className={styles.infoBox}>
        <div className={styles.infoContent}>
          <span className={styles.infoIcon}>ℹ️</span>
          <div className={styles.infoText}>
            <strong>Guía Completa de Yero Shop!</strong>
            <p>Tour paso a paso con todas las funcionalidades: navegación, productos, carrito, checkout, direcciones, monedas y más.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PDFGuideButton;