import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { Preloader, ProductList, Title } from '../../components/common';
import { FaHourglassEnd } from 'react-icons/fa';
import { getSearchResult } from '../../reducers/searchSlice';

const SearchPage = () => {
  const dispatch = useDispatch();
  const { searchTerm } = useParams();
  const { searchResult, searchLoading } = useSelector(state => state.searchReducer);

  //FIRE ACTION
  useEffect(() => {
    dispatch(getSearchResult(searchTerm));
  }, [dispatch, searchTerm]);
  if (searchResult.length === 0) {
    return (
      <main className='bg-secondary'>
        <div className='container'>
          <div className='sc-wrapper py-5'>
            <p className='text-center fs-20 fw-7 text-primary flex align-center justify-center'>
              <FaHourglassEnd />
              <span className='px-2'>No products found !</span>
            </p>
          </div>
        </div>
      </main>
    );
  }
  return (
    <main className='bg-secondary'>
      <div className='container'>
        <div className='sc-wrapper py-5'>
          <Title title={'Your search result'} />
          <br /> <br />
          {searchLoading ? <Preloader /> : <ProductList products={searchResult} />}
        </div>
      </div>
    </main>
  );
};

export default SearchPage;
