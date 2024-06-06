import '../../styles/BasketPage.scss';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AiOutlineMinus, AiOutlinePlus } from 'react-icons/ai';
import { BsTrash } from 'react-icons/bs';
import { formatPrice } from '../../utils/helpers';
import {
  addQtyItem,
  getBasketTotal,
  minusQtyItem,
  removeFromBasket,
  addCheckOutItem,
  removeCheckOutItem,
} from '../../reducers/basketSlice';

const BasketItem = ({ item }) => {
  const dispatch = useDispatch();
  const {} = useSelector(state => state.basketReducer);
  const singleCheckOutHandler = e => {
    // {?} => main if the traget have a value to slove {A component is changing an uncontrolled input to be controlled} erro
    if (e.target?.checked) {
      dispatch(addCheckOutItem(item?.id));
    } else {
      dispatch(removeCheckOutItem(item?.id));
    }
  };

  return (
    <div className='basket-list-item grid px-3 py-3'>
      <div className='checkbox-item py-3'>
        <div className='checkbox-icon'>
          <input
            type='checkbox'
            className='form-control'
            key={item?.id}
            onChange={singleCheckOutHandler}
            checked={item?.checkOutStatus}
          />
        </div>
      </div>

      <div className='basket-list-item-info grid'>
        <div className='item-info-img'>
          <img src={item?.thumbnail} alt={item?.title} className='img-cover' />
        </div>

        <div className='item-info-details py-2'>
          <div className='item-info-details-top'>
            <h4>{item?.title}</h4>
            <button
              type='button'
              className='remove-btn'
              onClick={() => dispatch(removeFromBasket(item?.id))}
            >
              <BsTrash />
            </button>
          </div>

          <div className='flex align-center flex-wrap py-1'>
            <span className='fs-13 text-dark'>Brand:&nbsp;{item?.brand}</span>
            <span className='mx-3 fs-13 text-dark'>Category:&nbsp;{item?.category}</span>
          </div>

          <div className='flex align-center justify-between'>
            <span className='fw-7 fs-17 text-yellow'>{formatPrice(item?.price)}</span>

            <div className='quantity'>
              <div className='quantity-toggle flex'>
                <button
                  className={`qty-dec felx align-center justify-center ${
                    item?.quantity === 1 ? 'active' : ''
                  }`}
                  onClick={() => dispatch(minusQtyItem(item?.id))}
                >
                  <AiOutlineMinus />
                </button>

                <div className='qty-value flex align-center justify-center fs-14 mx-2'>
                  {item?.quantity}
                </div>

                <button
                  className={`qty-dec felx align-center justify-center ${
                    item?.quantity === item?.quantity ? 'active' : ''
                  }`}
                  onClick={() => dispatch(addQtyItem(item?.id))}
                >
                  <AiOutlinePlus size={14} />
                </button>
              </div>
            </div>
          </div>

          <div className='fs-14'>
            <span className='fw-6'>Total:&nbsp;</span>
            {formatPrice(item?.totalPrice)}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BasketItem;
