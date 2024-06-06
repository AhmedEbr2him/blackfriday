import '../../styles/ProductSinglePage.scss';
import { useParams, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import images from '../../utils/images';
import { AiOutlineMinus, AiOutlinePlus, AiFillCheckCircle, AiOutlineStar } from 'react-icons/ai';
import { MdCancel } from 'react-icons/md';
import { useEffect, useState } from 'react';
import { getSingleProduct } from '../../reducers/productSlice';
import { formatPrice, calculateDiscountPrice } from '../../utils/helpers';
import {
  addToBasket,
  getBasketTotal,
  setBasketMsgOff,
  setBasketMsgOn,
} from '../../reducers/basketSlice';

const ProductSinglePage = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const [previewImg, setPreviewImg] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const { singleProduct } = useSelector(state => state.productsReducer);
  const { basketMsgStatus, basket } = useSelector(state => state.basketReducer);
  const { authData } = useSelector(state => state.authReducer);

  const increaseQty = () => {
    setQuantity(prevQty => {
      let tempQty = prevQty + 1;

      if (tempQty > singleProduct?.stock) tempQty = singleProduct?.stock;
      return tempQty;
    });
  };
  const decreaseQty = () => {
    setQuantity(prevQty => {
      let tempQty = prevQty - 1;
      if (tempQty <= 0) tempQty = 1;
      return tempQty;
    });
  };

  //  BASKETCART FUNCTION //
  const basketHandler = product => {
    let discountedPrice = calculateDiscountPrice(product?.price, product?.discountPercentage);
    let totalPrice = quantity * discountedPrice;

    dispatch(addToBasket({ ...product, quantity: quantity, totalPrice, discountedPrice }));

    // FIRE BASKET MESSAGE
    dispatch(setBasketMsgOn());
  };

  // FIRE ACTION
  useEffect(() => {
    dispatch(getSingleProduct(id));
    dispatch(getBasketTotal(basket));
    // eslint-disable-next-line
  }, [dispatch, basket, id]);
  // FIRE THIS ACTION ONE TIME ONLY
  useEffect(() => {
    dispatch(setBasketMsgOff());
  }, []);

  return (
    <div>
      <main className='bg-secondary'>
        {/* SHOPPING BASKET ALERT */}
        <div className={`basket-alert ${basketMsgStatus ? 'show' : ''}`}>
          <div className='alert-content'>
            <div className='alert-msg grid px-4'>
              <AiFillCheckCircle size={20} className='text-lime' />
              <p className='fs-13'>
                A {singleProduct?.quantity}
                <span style={{ textDecoration: 'underLine', fontWeight: 'bold' }}>
                  {singleProduct?.title}
                </span>
                &nbsp;has been added to your Shopping Cart. You now have one items in your Shopping
                Cart.
              </p>
            </div>
            <div className='basket-alert-btns px-4 py-4'>
              <button
                type='button'
                className='alert-close-btn'
                onClick={() => dispatch(setBasketMsgOff())}
              >
                <MdCancel size={22} className='text-dark' />
              </button>
              <Link to='/basket' className='alert-btn fs-13 text-white bg-primary'>
                View Shopping Cart
              </Link>
              <Link to='/home' className='alert-btn fs-13 text-primary'>
                Continue Shopping
              </Link>
            </div>
          </div>
        </div>
        <div className='container '>
          <div className='sc-wrapper py-5 '>
            <div className='product-s bg-white grid'>
              <div className='product-s-img'>
                <div className='img-preview py-5'>
                  <div className='img-preview-zoom'>
                    <img
                      src={
                        singleProduct?.images ? singleProduct.images[previewImg] : images.no_image
                      }
                      alt={singleProduct?.title}
                      className='img-cover'
                    />
                  </div>
                  <div className='img-preview-collection flex justify-center'>
                    {singleProduct?.images?.map((image, index) => {
                      return (
                        <div
                          className={`collection-item ${
                            previewImg === index ? 'collection-item-active' : ''
                          }`}
                          key={index}
                          onClick={() => setPreviewImg(index)}
                        >
                          <img
                            src={image ? image : image.no_image}
                            alt={singleProduct?.title}
                            className='img-cover'
                          />
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
              <div className='product-s-details py-5'>
                <h3 className='title fw-6 fs-16'>{singleProduct?.title}</h3>
                <p className='description fs-14'>{singleProduct?.description}</p>

                <div className='rating my-2 flex align-center'>
                  <AiOutlineStar size={16} className='text-yellow' />
                  <span className='mx-1 fs-13'>{singleProduct?.rating}</span>
                </div>

                <div className='price flex align-center'>
                  <span className='discount-price fs-20 fw-7'>
                    {singleProduct?.price && singleProduct?.discountPercentage
                      ? formatPrice(
                          calculateDiscountPrice(
                            singleProduct.price,
                            singleProduct.discountPercentage
                          )
                        )
                      : 0}
                  </span>
                  <span className='actual-price text-dark mx-3'>
                    {formatPrice(singleProduct?.price)}
                  </span>
                  <span className='discounted-percent text-primary fs-12'>
                    {singleProduct?.discountPercentage} %
                  </span>
                </div>

                <div className='quantity py-3'>
                  <h5 className='fw-4'>Quantity:&nbsp;{quantity}</h5>
                  <div className='quantity-toggle flex'>
                    <button
                      className='qty-dec flex align-center justify-center'
                      onClick={() => decreaseQty()}
                    >
                      <AiOutlineMinus size={14} />
                    </button>
                    <div className='qty-value flex align-center justify-center fs-14 mx-2'>
                      {quantity}
                    </div>
                    <button
                      className='qty-dec flex align-center justify-center'
                      onClick={() => increaseQty()}
                    >
                      <AiOutlinePlus size={14} />
                    </button>
                  </div>
                </div>

                <div className='info py-1 flex flex-wrap align-center'>
                  <div className='fs-13'>
                    <span className='fs-6'>Brand:&nbsp;</span>
                    <span className='px-1'>{singleProduct?.brand}</span>
                  </div>

                  <div className='fs-13 mx-3'>
                    <span className='fw-6'>Category:&nbsp;</span>
                    <span className='px-1'>{singleProduct?.category}</span>
                  </div>
                </div>

                <div className='shop-btns'>
                  <Link to='/login' className='buy-btn shop-btn fs-14'>
                    Buy Now
                  </Link>
                  {authData.isLoggedIn ? (
                    <button
                      className='add-to-cart-btn shop-btn fs-14'
                      onClick={() => basketHandler(singleProduct)}
                    >
                      Add to Cart
                    </button>
                  ) : (
                    <Link to='/login' className='add-to-cart-btn shop-btn f-14'>
                      Add to Cart
                    </Link>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default ProductSinglePage;
