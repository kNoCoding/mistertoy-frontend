// import { useDispatch, useSelector } from 'react-redux'
// const { useState, useEffect } = React
// const { useSelector, useDispatch } = ReactRedux

import { UserMsg } from './UserMsg.jsx'
// import { ShoppingCart } from './ShoppingCart.jsx'
// import { SET_CART_IS_SHOWN } from '../store/reducers/car.reducer.js'

export function AppFooter() {

    // const dispatch = useDispatch()
    // const [isCartShown, setIsCartShown] = useState(false)
    // const isCartShown = useSelector(storeState => storeState.carModule.isCartShown)
    // const count = useSelector(storeState => storeState.userModule.count)
    // const carsCount = useSelector(storeState => storeState.carModule.cars.length)


    // const cart = []

    return (
        <footer>
            {/* <h5>
                Currently {carsCount} cars in the shop
            </h5> */}
            {/* <p>
                Coffeerights to all - Count: {count}
            </p> */}
            <p>
                This is so fun!~
            </p>
            {/* <h5>
                <span>{cart.length}</span> Products in your Cart
                <a href="#" onClick={(ev) => {
                    ev.preventDefault()
                    dispatch({ type: SET_CART_IS_SHOWN, isCartShown: !isCartShown })
                }}>
                    ({(isCartShown) ? 'hide' : 'show'})
                </a>
            </h5> */}

            {/* <ShoppingCart isCartShown={isCartShown} /> */}
            <UserMsg />
        </footer>
    )
}
