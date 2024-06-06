import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { FaHourglassEnd } from 'react-icons/fa';
import { PaymentMethods, BasketItem, CheckoutSummary } from '../../components/common';
import {
  getBasketTotal,
  clearBasket,
  getCheckOutAll,
  setCheckOutAll,
  unSetCheckOutAll,
} from '../../reducers/basketSlice';
const BasketPage = () => {
  const dispatch = useDispatch();
  const { basket, totalAmount, checkOutCount, checkOutTotal, checkOutAll } = useSelector(
    (state) => state.basketReducer
  );

  const checkHandler = (e) => {
    if (e.target.checked) {
      dispatch(setCheckOutAll(basket));
    } else {
      dispatch(unSetCheckOutAll(basket));
    }
  };

  useEffect(() => {
    dispatch(getCheckOutAll(basket));
  }, [dispatch, basket]);

  // When basket is empty
  if (basket.length === 0) {
    return (
      <main className="bg-secondary">
        <div className="container">
          <div className="sc-wrapper py-4 flex align-center justify-center">
            <FaHourglassEnd />
            <h3 className="mx-2">No items found in the cart.</h3>
          </div>
        </div>
      </main>
    );
  }

  // When basaket is not empty
  return (
    <main className="bg-secondary">
      <div className="container">
        <div className="sc-wrapper">
          <div className="basket grid">
            <div className="basket-l py-4">
              <div className="basket-top bg-white py-3 px-4">
                <h2>
                  Shopping Cart <span className="text-primary">({basket.length})</span>
                </h2>
                <div className="flex align-center justify-between">
                  <div className="checkbox-item flex py-3">
                    <div className="checkbox-icon flex algin-center">
                      <input
                        type="checkbox"
                        name="checkbox"
                        id="checkall"
                        className="form-control"
                        value={'undefined'}
                        onChange={checkHandler}
                        checked={checkOutAll}
                      />
                    </div>
                    <p className="mx-2">Select all items</p>
                  </div>

                  <button
                    type="button"
                    className="fw-7 fs-16 text-primary"
                    onClick={() => dispatch(clearBasket())}
                  >
                    Delete
                  </button>
                </div>
              </div>

              <div className="basket-list bg-white my-3">
                {basket.map((basketItem, index) => {
                  return <BasketItem item={basketItem} key={index} />;
                })}
              </div>
            </div>

            {/* basket right */}
            <div className="basket-r py-4">
              <CheckoutSummary
                checkOutCount={Number(checkOutCount)}
                checkOutTotal={Number(checkOutTotal)}
              />
              <PaymentMethods />
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default BasketPage;
