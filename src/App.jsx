import './App.scss';

// Router import
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// Base layout
import {
  Home,
  Basket,
  Error,
  Search,
  Account,
  ViewProductSingle,
  ViewCategoryProductList,
  Login,
} from './views/index';

import { Navbar, Footer } from './components/common';

import ProductedRoute from './routers/ProductedRoute';
import PublicRoute from './routers/PublicRoute';
import { useSelector } from 'react-redux';

function App() {
  const { authData } = useSelector(state => state.authReducer);

  return (
    <Router>
      <Navbar />
      <Routes>
        {/**Protect Routes {make it to make user login to can access this fildes}*/}
        <Route element={<ProductedRoute authData={authData} />}>
          <Route path='account' element={<Account />} />
          <Route path='basket' element={<Basket />} />
        </Route>

        {/* Public Routes */}
        <Route element={<PublicRoute />}>
          <Route path='/' element={<Home />} />
          <Route path='/home' element={<Home />} />
          <Route path='error' element={<Error />} />
          <Route path='login' element={<Login />} />
          <Route path='product/:id' element={<ViewProductSingle />} />
          <Route path='category/:categoryKey' element={<ViewCategoryProductList />} />
          <Route path='search/:searchTerm' element={<Search />} />
          <Route path='*' element={<Error />} />
        </Route>
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
