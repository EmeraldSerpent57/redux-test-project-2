import { uiActions } from './ui-slice';
import { cartActions } from './cart-slice';

//async func for fetching stored data from firebase
export const fetchCartData = () => {
    return async (dispatch) => {
        const fetchData = async () => {
            const response = await fetch(
              "https://redux-test-project-2-default-rtdb.firebaseio.com/cart.json"
              );
            
            if (!response.ok) {
                throw new Error('Could not fetch cart data.');
            }

            const data = await response.json();

            return data;
        };

        try {
            const cartData = await fetchData();
            dispatch(
              cartActions.replaceCart({
                items: cartData.items || [],
                totalQuantity: cartData.totalQuantity,
              })
             );
        } catch (error) {
            dispatch(
                uiActions.showNotification({
                  status: "error",
                  title: "Error!",
                  message: "Fetching cart data failed.",
                })
            );
        }
    };
};

//async func for sending cart data to firebase
export const sendCartData = (cart) => {
    return async (dispatch) => {
        //shows first that the data in the cart is pending being sent
        dispatch(
            uiActions.showNotification({
                status: "pending",
                title: "Sending...",
                message: "Sending cart data now!",
            })
        );

        const sendRequest = async () => {
          //then we send the data to the firebase backend
          const response = await fetch(
            "https://redux-test-project-2-default-rtdb.firebaseio.com/cart.json",
            { 
              method: "PUT", 
              body: JSON.stringify({
                items: cart.items,
                totalQuantity: cart.totalQuantity,
              }),
            }
          );

          //is there an error?
          if (!response.ok) {
            throw new Error("Sending cart data failed!");
          }
        };

    try{
        await sendRequest();

        //notification that data send was successful
       dispatch(
        uiActions.showNotification({
          status: "success",
          title: "Success!",
          message: "Cart data has been sent successfully!",
        })
      );
    } catch (error) {
        //catch any error that may have occurred and show error message
        dispatch(
            uiActions.showNotification({
              status: "error",
              title: "Error!",
              message: "Sending cart data failed!",
            })
          );
       }
    };
};