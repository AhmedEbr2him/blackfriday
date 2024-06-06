import { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import '../../styles/Navbar.scss';
import { FaUser } from 'react-icons/fa';
import { FiLogOut } from 'react-icons/fi';
import { FiLogIn } from 'react-icons/fi';
import { BsSearch, BsCaretDownFill, BsCaretUpFill } from 'react-icons/bs';
import { MdOutlineShoppingBag } from 'react-icons/md';
import { AiOutlineBars } from 'react-icons/ai';
import { getCategoriesList, getCategoryProducts } from '../../reducers/categorySlice';
import { getBasketTotal } from '../../reducers/basketSlice';
import { formatPrice } from '../../utils/helpers';
import { logOut } from '../../reducers/authSlice';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const Navbar = () => {
  const dispatch = useDispatch();
  const [showCategory, setShowCategory] = useState(false);
  const { categoreis, categoryProducts } = useSelector(state => state.categoryReducer);
  const { basket, itemsCount, totalAmount } = useSelector(state => state.basketReducer);
  const { authData } = useSelector(state => state.authReducer);
  const [searchTerm, setSearchTerm] = useState('');
  const menuRef = useRef(null);

  const toggleShowCategory = () => {
    setShowCategory(prevState => !prevState);
  };

  // CLOSE MENU WHEN PRESS ON ANY WHERE ON PAGE
  const handleCloseMenu = e => {
    if (menuRef.current && !menuRef.current.contains(e.target)) {
      setShowCategory(false);
    }
  };
  useEffect(() => {
    document.addEventListener('click', handleCloseMenu);
    return () => {
      document.removeEventListener('click', handleCloseMenu);
    };
  }, []);

  // SEARCH TERM FUNCTION
  const handleSearchTerm = e => {
    e.preventDefault();
    setSearchTerm(e.target.value);
  };
  //CATEGORIES
  useEffect(() => {
    dispatch(getCategoriesList(categoreis));
  }, [dispatch]);
  useEffect(() => {
    dispatch(getCategoryProducts(categoryProducts));
  }, [dispatch]);

  //BASKET
  useEffect(() => {
    dispatch(getBasketTotal(basket));
  }, [dispatch, basket]);

  const notify = () => {
    toast('You are logged out!');
  };
  const handleLogout = () => {
    dispatch(logOut());
    notify();
  };
  return (
    <nav className='navbar'>
      <div className='navbar-top bg-secondary flex align-center'>
        <div className='container w-100 flex align-center justify-end'>
          {authData.isLoggedIn ? (
            <Link to='/account' className='flex mx-4 align-center justify-end text-dark '>
              <FaUser size={14} />
              <span className='mx-2 fs-13 text-uppercase ls-1'>{authData.info.firstName}</span>
            </Link>
          ) : (
            <Link to='/login' className='mx-4 login-btn align-center justify-end text-dark'>
              <FiLogIn size={14} />
              <span className='mx-2 fs-13 text-uppercase ls-1'>Login</span>
            </Link>
          )}

          <button
            type='button'
            className='flex align-center justify-end text-dark'
            onClick={() => dispatch(logOut())}
          >
            <FiLogOut size={14} />
            <span className='mx-2 fs-13 text-uppercase ls-1' onClick={() => handleLogout}>
              Log Out
            </span>
          </button>
        </div>
      </div>

      <div className='navbar-main bg-primary'>
        <div className='container'>
          <div className='navbar-main-top flex align-center justify-between'>
            <Link to='/' className='navbar-brand'>
              <span className='text-yellow fs-26 fw-6'>Black</span>
              <span className='text-white fs-26 fw-6'>Friday.</span>
            </Link>

            <form className='navbar-search-form'>
              <div className='input-group bg-white'>
                <input
                  type='text'
                  placeholder='Search for Product, Brand or Category'
                  className='form-control'
                  value={searchTerm}
                  onChange={handleSearchTerm}
                />
                <Link
                  to={`search/${searchTerm}`}
                  className='btn btn-primary flex align-center text-white px-3'
                >
                  <BsSearch size={15} />
                  <span className='fs-15 mx-2'>Search</span>
                </Link>
              </div>
            </form>

            <div className='navbar-basket text-white flex align-center'>
              <Link to={'/basket'} className='basket-btn'>
                <MdOutlineShoppingBag size={30} />
                <span className='basket-count flex align-center justify-center'>{itemsCount}</span>
              </Link>

              <div className='text-end basket-count'>
                <p className='text-uppercase fs-14'>My cart</p>

                <Link to={'/basket'} className='fw-7'>
                  <span className='basket-amount'>{formatPrice(totalAmount)}</span>
                </Link>
              </div>
            </div>
          </div>

          <div className='navbar-main-bottom flex align-center justify-between'>
            <div className='navbar-cats-wrapper'>
              <div
                className='navbar-cats-btn flex align-center text-white px-2 py-2'
                onClick={toggleShowCategory}
                ref={menuRef}
              >
                <AiOutlineBars />
                <span className='text-uppercase mx-3 fs-13'>all categories</span>
                {showCategory ? <BsCaretUpFill /> : <BsCaretDownFill />}
              </div>

              <ul className={`category-list ${showCategory ? 'show-category-list' : ''}`}>
                {categoreis?.map((category, index) => {
                  return (
                    <li className='category-item' key={index}>
                      <Link
                        to={`category/${category}`}
                        className='category-item-link text-uppercase text-dark fs-12'
                      ></Link>
                    </li>
                  );
                })}
              </ul>
            </div>

            <ul className='navbar-nav flex align-center'>
              {categoreis.slice(0, 6).map((category, index) => {
                return (
                  <li className='nav-item' key={index}>
                    <Link to={`category/${category}`} className='nav-link no-wrap'></Link>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </div>
      <ToastContainer />
    </nav>
  );
};

export default Navbar;
