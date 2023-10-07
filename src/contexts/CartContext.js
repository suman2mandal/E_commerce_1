import React,{createContext,useState,useEffect} from 'react';

export const CartContext = createContext();

const CartProvider= ({children}) => {
  const [cart,setCart] = useState([]);
  const [itemAmount, setItemAmount] = useState(0);


  //no need as i have directly used the cart in the totalItems
  // useEffect(()=>{
  //     if(cart){
  //        const amount = cart.render((accumulator,currentValue) => {return accumulator + currentValue.amount}, 0);
  //     }
  //     setItemAmount(amount);
  // },[cart])
  const addToCart = (product,id)=>{
    const newItem = {...product,amount:1}
    const cartItem = cart.find((item)=>{
        console.log(item.id,'id',id,'id..')
      return item.id === id;
    })
    if(cartItem) {
      const newCart = [...cart].map((item) => {
        if(item.id===id){
          return {...item,amount:cartItem.amount+1}
        }else{
          return item;
        }
      })
      setCart(newCart);
    }else{
      setCart([...cart,newItem]);
    }
  }
   const removeFromCart = (id) => {
    const newCart = [...cart].filter((item) => item.id !== id);
    setCart(newCart);
   }

   const clearCart = () => {
        setCart([]);
   }

   const increaseAmount = (id) => {
        const newCart = [...cart].map((item) => {
        if(item.id===id){
            return {...item,amount:item.amount+1}
        }else{
            return item;
        }
        })
        setCart(newCart);
   }

   const decreaseAmount = (id) => {
        const newCart = [...cart].map((item) => {

        // This was not working because I was not adding the
        //     items to setCart instead I was just returning them
        //     and another update have to make
        //     logically if we think the items only remains inside the
        //     cart till it's 1 and after that it will be removed
        //     so item.amount==1 is the condition for removing the item
        if(item.id===id){
            if(item.amount===1){
                removeFromCart(id);
            }else{
                setCart([...cart].map((item) => {
                if(item.id===id){
                    return {...item,amount:item.amount-1}
                }else{
                    return item;
                }
                }))
            }

        }
    })
   }

       // //searching for the item in the cart
       //  const cartItem = cart.find((item)=>{
       //      return item.id === id;
       //  });
       //  //if the item is found
       //  if(cartItem) {
       //      const newCart = cart.map((item) => {
       //          if (item.id === id) {
       //              return {...item, amount: cartItem.amount - 1}
       //          } else {
       //              return item;
       //          }
       //      })
       //      setCart(newCart);
       //  }
    // // here need to say the item will remain inside the cart
    // // is only checked here if it is less than 2 means 1 and we have modified the data
    // // so it will be removed from the cart
       //  if(cartItem.amount <2 ){
       //      removeFromCart(id);
       //  }


   const totalItems = cart.reduce((total,item) => {
        return total+item.amount;
   },0);

  const totalAmount = cart.reduce((total,item) => {
    return total+item.amount*item.price;
  },0);

  return <CartContext.Provider value={{totalAmount,totalItems,decreaseAmount,increaseAmount,cart,addToCart,removeFromCart,clearCart}}>{children}</CartContext.Provider>
};

export default CartProvider;
