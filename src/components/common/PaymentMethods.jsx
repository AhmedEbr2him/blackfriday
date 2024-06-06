import '../../styles/BasketPage.scss';
import images from '../../utils/images';

const PaymentMethods = () => {
  return (
    <div className="payment-methods py-4 px-4 bg-white ">
      <h3>Payment methods</h3>
      <div className="flex align-center justify-start payment-methods-list py-3">
        <div className="payment-item">
          <img src={images.visa} alt="Visa Payment Method" />
        </div>
        <div className="payment-item">
          <img src={images.ucb} alt="UCB Payment Method" />
        </div>
        <div className="payment-item">
          <img src={images.mastercard} alt="Mastercard Payment Method" />
        </div>
        <div className="payment-item">
          <img src={images.americanexpress} alt="Americanexpress Payment Method" />
        </div>
      </div>
      <h3 className="py-2">Buyer Protection</h3>
      <p className="fs-14">
        Get full refunded if the item is not as descripted or if is not delivered.
      </p>
    </div>
  );
};

export default PaymentMethods;
