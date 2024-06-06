import '../../styles/AccountPage.scss';
import { useSelector } from 'react-redux';

const AccountPage = () => {
  const { authData } = useSelector(state => state.authReducer);

  return (
    <main className='bg-secondary'>
      <div className='container'>
        <div className='sc-wrapper'>
          <div className='account-details bg-white grid'>
            <div className='account-details-left'>
              <div className='info-elem'>
                <span className='info-elem-label'>Full Name:&nbsp;</span>
                <span className='info-elem-value'>
                  {`${authData.info?.firstName} ${authData.info.lastName}`}
                </span>
              </div>
              <div className='info-elem'>
                <span className='info-elem-label'>Username:&nbsp;</span>
                <span className='info-elem-value'>{authData.info?.username}</span>
              </div>
              <div className='info-elem'>
                <span className='info-elem-label'>Email:&nbsp;</span>
                <span className='info-elem-value'>{authData.info?.email}</span>
              </div>
              <div className='info-elem'>
                <span className='info-elem-label'>Gender:&nbsp;</span>
                <span className='info-elem-value'>
                  {authData.info?.gender?.charAt(0).toUpperCase()}
                  {authData.info?.gender?.slice(1)}
                </span>
              </div>
            </div>

            <div className='account-details-right'>
              <img src={authData.info?.image} alt='user_image' />
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default AccountPage;
