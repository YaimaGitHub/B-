import { useNavigate } from 'react-router-dom';
import { useAuthContext } from '../../contexts/AuthContextProvider';
import { removeLocalStorage, toastHandler } from '../../utils/utils';
import { ToastType, LOCAL_STORAGE_KEYS } from '../../constants/constants';
import { useAllProductsContext } from '../../contexts/ProductsContextProvider';
import { useFiltersContext } from '../../contexts/FiltersContextProvider';
import PDFGuideButton from '../../components/PDFGuideButton/PDFGuideButton';
import styles from './Profile.module.css';

const Profile = () => {
  const navigate = useNavigate();
  const {
    updateUserAuth,
    user: { firstName, lastName, email },
  } = useAuthContext();
  const {
    clearCartInContext,
    clearWishlistInContext,
    clearAddressInContext,
    timedMainPageLoader,
  } = useAllProductsContext();

  const { clearFilters } = useFiltersContext();

  const handleLogout = async () => {
    await timedMainPageLoader();
    updateUserAuth({ user: null, token: null });
    removeLocalStorage(LOCAL_STORAGE_KEYS.User);
    removeLocalStorage(LOCAL_STORAGE_KEYS.Token);

    clearCartInContext();
    clearWishlistInContext();
    clearFilters();
    clearAddressInContext();
    toastHandler(ToastType.Success, 'Sesión cerrada exitosamente');

    navigate('/');
  };

  return (
    <div className={styles.profile}>
      <p className={styles.row}>
        <span>Nombre:</span> {`${firstName} ${lastName}`}
      </p>

      <p className={styles.row}>
        <span>Email:</span> {email}
      </p>

      {/* Sección de ayuda */}
      <div className={styles.helpSection}>
        <h4>📚 Centro de Ayuda</h4>
        <p>Descarga la guía completa para aprender a usar todas las funcionalidades de Yero Shop!</p>
        <PDFGuideButton />
      </div>

      <button className='btn btn-danger' onClick={handleLogout}>
        cerrar sesión
      </button>
    </div>
  );
};

export default Profile;