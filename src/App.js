import { Fragment, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import Cart from './components/Cart/Cart';
import Layout from './components/Layout/Layout';
import Products from './components/Shop/Products';
import Notification from './components/UI/Notification';
import { sendCartData, fetchCartData } from './store/cart-actions';

let isInitial = true; 

function App() {
  const dispatch = useDispatch();
  const showCart = useSelector((state) => state.ui.cartIsVisible);
  const cart = useSelector((state) => state.cart);
  const notification = useSelector((state) => state.ui.notification);

  //fetches cart data if page is loading initially
  useEffect(() => {
    dispatch(fetchCartData());
  }, [dispatch]);

  //watch for changes in cart state
  useEffect(() => {
    //if the cart is just being loaded, no cart data will be sent. only does this once!
    if (isInitial) {
      isInitial = false;
      return;
    };

    dispatch(sendCartData(cart));
  }, [cart, dispatch]);

  return (
    <Fragment>
      {notification && (
        <Notification
          status={notification.status}
          title={notification.title}
          message={notification.message}
        />
      )}
      <Layout>
        {showCart && <Cart />}
        <Products />
      </Layout>
    </Fragment>
  );
}

export default App;

/* NOTE: using a 'PUT' request will override the cart of existing 
data with the incoming data */

