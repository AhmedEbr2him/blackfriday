import { formatPrice } from '../../utils/helpers';

const CheckoutSummary = ({ checkOutCount, checkOutTotal }) => {
  return (
    <div>
      <div className='summary bg-white py-3 px-4'>
        <h2>Summary</h2>
        <div className='flex align-center justify-between my-2'>
          <p className='fw-6'>Total</p>
          <p className='fw-6 fs-24'>
            <span className='fw-7 text-yellow'>US&nbsp;</span>{' '}
            {formatPrice(checkOutTotal)}
          </p>
        </div>

        <button type='button' className='checkout-btn'>
          Checkout ({checkOutCount})
        </button>
      </div>
    </div>
  );
};

export default CheckoutSummary;
