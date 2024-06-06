import images from '../../utils/images';
import '../../styles/HomePage.scss';
import { FilterView, Preloader, ProductList, Title } from '../../components/common';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { getProducts } from '../../reducers/productSlice';
import { ToastContainer } from 'react-toastify';
const HomePage = () => {
  const dispatch = useDispatch();
  const { productsLoading } = useSelector(state => state.productsReducer);
  const { filtered_products } = useSelector(state => state.filterReducer);

  // FIRE ACTION
  useEffect(() => {
    dispatch(getProducts());
  }, [dispatch]);

  return (
    <main className='bg-secondary'>
      <section className='sc-banner'>
        <div className='banner-item h-100 img-cover'>
          <img src={images.banner_1} alt='Section Banner' className='img-cover' />
        </div>
      </section>

      <section className='sc-wrapper py-5'>
        <Title title={'Our Products'} />

        {productsLoading ? (
          <Preloader />
        ) : (
          <div>
            <FilterView />
            <br /> <br />
            <ProductList products={filtered_products} />
          </div>
        )}
      </section>
      <ToastContainer />
    </main>
  );
};

export default HomePage;
