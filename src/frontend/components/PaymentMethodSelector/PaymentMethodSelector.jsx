import React from 'react';
import { PAYMENT_METHODS } from '../../constants/constants';
import { useCurrencyContext } from '../../contexts/CurrencyContextProvider';
import styles from './PaymentMethodSelector.module.css';

const PaymentMethodSelector = ({ selectedMethod, onMethodChange, totalAmount }) => {
  const { getCurrentCurrency, formatPriceWithCode } = useCurrencyContext();
  const currency = getCurrentCurrency();

  const surchargeAmount = Math.floor(totalAmount * 0.20);
  const totalWithSurcharge = totalAmount + surchargeAmount;

  return (
    <div className={styles.paymentSelector}>
      <div className={styles.selectorHeader}>
        <h4>💳 Método de Pago</h4>
        <p>Selecciona cómo deseas realizar el pago</p>
      </div>

      <div className={styles.paymentOptions}>
        <div className={styles.paymentOption}>
          <input
            type="radio"
            id="cash"
            name="paymentMethod"
            value={PAYMENT_METHODS.CASH}
            checked={selectedMethod === PAYMENT_METHODS.CASH}
            onChange={(e) => onMethodChange(e.target.value)}
          />
          <label htmlFor="cash" className={styles.paymentLabel}>
            <div className={styles.paymentIcon}>💵</div>
            <div className={styles.paymentInfo}>
              <h5>Pago en Efectivo</h5>
              <p>Pago tradicional sin recargos adicionales</p>
              <div className={styles.paymentTotal}>
                <span>Total: {formatPriceWithCode(totalAmount)}</span>
              </div>
            </div>
            <div className={styles.paymentBadge}>
              <span className={styles.noBadge}>Sin Recargo</span>
            </div>
          </label>
        </div>

        <div className={styles.paymentOption}>
          <input
            type="radio"
            id="bankTransfer"
            name="paymentMethod"
            value={PAYMENT_METHODS.BANK_TRANSFER}
            checked={selectedMethod === PAYMENT_METHODS.BANK_TRANSFER}
            onChange={(e) => onMethodChange(e.target.value)}
          />
          <label htmlFor="bankTransfer" className={styles.paymentLabel}>
            <div className={styles.paymentIcon}>🏦</div>
            <div className={styles.paymentInfo}>
              <h5>Transferencia Bancaria</h5>
              <p>Pago digital con recargo del 20%</p>
              <div className={styles.paymentTotal}>
                <span>Total: {formatPriceWithCode(totalWithSurcharge)}</span>
                <small>+{formatPriceWithCode(surchargeAmount)} recargo (20%)</small>
              </div>
            </div>
            <div className={styles.paymentBadge}>
              <span className={styles.surchargeBadge}>+20%</span>
            </div>
          </label>
        </div>
      </div>

      <div className={styles.paymentInfo}>
        <div className={styles.currencyInfo}>
          <h5>💱 Información de Moneda</h5>
          <div className={styles.currencyDisplay}>
            <span className={styles.currencyFlag}>{currency.flag}</span>
            <span className={styles.currencyName}>{currency.name} ({currency.code})</span>
            {currency.code !== 'CUP' && (
              <span className={styles.exchangeRate}>
                1 {currency.code} = {currency.rate.toLocaleString()} CUP
              </span>
            )}
          </div>
        </div>

        {selectedMethod === PAYMENT_METHODS.BANK_TRANSFER && (
          <div className={styles.surchargeExplanation}>
            <h5>ℹ️ Información del Recargo Bancario</h5>
            <div className={styles.surchargeDetails}>
              <p>• El recargo del 20% se aplica por costos de procesamiento bancario</p>
              <p>• Calculado sobre el subtotal de productos: {formatPriceWithCode(totalAmount)}</p>
              <p>• Recargo aplicado: {formatPriceWithCode(surchargeAmount)}</p>
              <p>• Total con recargo: {formatPriceWithCode(totalWithSurcharge)}</p>
              <p>• Moneda seleccionada: {currency.flag} {currency.name}</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PaymentMethodSelector;