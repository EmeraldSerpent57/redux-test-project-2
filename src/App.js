import { Fragment, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import Cart from './components/Cart/Cart';
import Layout from './components/Layout/Layout';
import Products from './components/Shop/Products';
import { uiActions } from './store/ui-slice';
import Notification from './components/UI/Notification';

let isInitial = true; 

function App() {
  const dispatch = useDispatch();
  const showCart = useSelector((state) => state.ui.cartIsVisible);
  const cart = useSelector((state) => state.cart);
  const notification = useSelector((state) => state.ui.notification);

  //watch for changes in cart state
  useEffect(() => {
    const sendCartData = async () => {
      //shows first that the data in the cart is pending being sent
      dispatch(
        uiActions.showNotification({
          status: "pending",
          title: "Sending...",
          message: "Sending cart data now!",
        })
      );
      //then we send the data to the firebase backend
      const response = await fetch(
        "https://redux-test-project-2-default-rtdb.firebaseio.com/cart.json",
        { method: "PUT", body: JSON.stringify(cart) }
      );

      //is there an error?
      if (!response.ok) {
        throw new Error("Sending cart data failed!");
      }

      //notification that data send was successful
      dispatch(
        uiActions.showNotification({
          status: "success",
          title: "Success!",
          message: "Cart data has been sent successfully!",
        })
      );
    };

    //if the cart is just being loaded, no cart data will be sent. only does this once!
    if (isInitial) {
      isInitial = false;
      return;
    };

    //catch any error that may have occurred and show error message
    sendCartData().catch((error) => {
      dispatch(
        uiActions.showNotification({
          status: "error",
          title: "Error!",
          message: "Sending cart data failed!",
        })
      );
    });
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
