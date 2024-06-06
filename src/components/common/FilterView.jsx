import '../../styles/FilterView.scss';

import { useDispatch, useSelector } from 'react-redux';
import { BsFillGridFill } from 'react-icons/bs';
import { FaThList } from 'react-icons/fa';
import { constants } from '../../constants';

import {
  setGridView,
  setListView,
  loadProducts,
  priceSort,
} from '../../reducers/filterSilce';
import { useEffect } from 'react';

const FilterView = () => {
  const dispatch = useDispatch();
  const { products } = useSelector(state => state.productsReducer);
  const { sort_by, filtered_products, grid_view } = useSelector(
    state => state.filterReducer
  );

  //FIRE ACTION
  useEffect(() => {
    if (products && products.length > 0) {
      dispatch(loadProducts(products));
      dispatch(priceSort(sort_by)); //initial sort by best match or as it is fetched from api
    }
  }, [dispatch, products, sort_by]);

  return (
    <div className='filter-top'>
      <div className='container'>
        <div className='filter-top-content py-3 flex align-center justify-between bg-white px-3'>
          <div className='filter-top-sort flex align-center'>
            <p className='fs-13 text-dark'>Sort By:</p>
            <select
              name='filter'
              className='fs-13 mx-2 filter-select'
              onChange={e => dispatch(priceSort(e.target.value))}>
              <option defaultValue={constants.BEST_MATCH} value={constants.BEST_MATCH}>
                Best Match
              </option>
              <option defaultValue={constants.HIGH_TO_LOW} value={constants.HIGH_TO_LOW}>
                Price High To Low
              </option>
              <option defaultValue={constants.LOW_TO_HIGH} value={constants.LOW_TO_HIGH}>
                Price Low To High
              </option>
            </select>
          </div>

          <div className='filter-top-view flex align-center'>
            <p className='op-07 text-dark fs-13'>View:</p>
            <button
              type='button'
              className='grid-btn'
              title='GridView'
              onClick={() => dispatch(setGridView())}>
              <BsFillGridFill />
            </button>
            <button
              type='button'
              className='list-btn'
              title='ListView'
              onClick={() => dispatch(setListView())}>
              <FaThList />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FilterView;
