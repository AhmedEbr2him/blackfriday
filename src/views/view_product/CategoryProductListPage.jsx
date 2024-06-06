import { Title, Preloader } from '../../components/common';
import { getCategoryProducts } from '../../reducers/categorySlice';
import { ProductList } from '../../components/common';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { useEffect } from 'react';
const CategoryProductListPage = () => {
  const dispatch = useDispatch();
  const { categoryKey } = useParams();
  const { categoryLoading, categoryProducts } = useSelector(
    state => state.categoryReducer
  );

  useEffect(() => {
    dispatch(getCategoryProducts(categoryKey));
  }, [dispatch, categoryKey]);

  //FIRE THIS FUNCTIOH TO MAKE IT LOAD FOR DEFAULT
  useEffect(() => {
    dispatch(getCategoryProducts(categoryKey));
  }, [dispatch]);
  return (
    <main className='bg-secondary'>
      <div className='container'>
        <div className='sc-wrapper py-5'>
          <Title title={categoryKey} />
          {categoryLoading ? <Preloader /> : <ProductList products={categoryProducts} />}
        </div>
      </div>
    </main>
  );
};

export default CategoryProductListPage;
