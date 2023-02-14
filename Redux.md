# Redux

## Principles

folder - src/redux/index.js

- Action - is an object with a type property.
- Action Creator - is a function that returns a action.
- Reducer - A function that accept state and action as arg.
- Redux Store :

        Holds application state
        getState()
        dispatch(action)
        subscribe(listener)
        unregistering listener

## Multiple Reducers

Create action and action creator for icecream.

- Using the same reducer works but will be differcult to debug

Instead use Multiple Reducers:

    //State
    const initialCakeState = {
      numOfCakes: 10,
    };
    const initialIceCreamState = {
      numOfIceCreams: 20,
    };

    //Reducer
    const cakeReducer = (state = initialCakeState, action) => {
      switch (action.type) {
        case BUY_CAKE:
          return {
            ...state,
            numOfCakes: state.numOfCakes - 1,
          };

        default:
          return state;
      }
    };

    //Reducer
    const iceCreamReducer = (state = initialIceCreamState, action) => {
      switch (action.type) {
        case BUY_ICECREAM:
          return {
            ...state,
            numOfIceCreams: state.numOfIceCreams - 1,
          };

        default:
          return state;
      }
    };

### Combine Reducers

Before we create our store, we combine our reducers:

    const combineReducers = redux.combineReducers;
    const rootReducer = combineReducers({
      cake: cakeReducer,
      iceCream: iceCreamReducer,
    });
    const store = createStore(rootReducer); //Hold app state

### Subscribe & Dispatch

Subscribe , Unsubscribe :

    const unsubscribe = store.subscribe(() =>
      console.log("Updated state", store.getState())
    ); //Subscribe

    unsubscribe(); //Unsubscibe

Disptach :

    store.dispatch(buyCake());
    store.dispatch(buyIceCream());
