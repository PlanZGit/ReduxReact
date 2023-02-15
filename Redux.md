# Redux

## Principles

folder - my-app/learnRedux/index.js

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

# Middleware

- Extend Redux with custom functionality
- Provides a third-party extension point between dispatching an action, and the moment it reaches the reducer.
- Use middleware for loggging , crash reporting , performing asynchoronous tasks, etc

      npm install redux-logger

      const reduxLoogger = require("redux-logger");
      const applyMiddleware = redux.applyMiddleware;
      const logger = reduxLoogger.createLogger();

      const store = createStore(rootReducer, applyMiddleware(logger)); //Hold app state

      const unsubscribe = store.subscribe(() => {}); //Subscribe

## Asycnc Actions

Async Actions - Asynchronous API calls to fetch data from an end point and use that data in your application.

Our Application - Fetches a list of users from an API end point and stores it in the redux store.
State? Actions? Reducer?

State:

    state = {
      loading : true,
      data: [],
      error: ''
    }

    loading - Display a loading spinner in your component
    data - List of users

Actions:

    FETCH_USERS_REQUEST - Fetch list of users
    FETCH_USER_SUCCESS - Fetched successfullly
    FETCH_USERS_FAILURE - Error fetching the data

Reducers:

    case: FETCH_USERS_REQUEST
      loading: true
    case: FETCH_USERS_Success
      loading: false
      users: data ( from API )
    case: FETCH_USERS_FAILURE
      loading: false
      error: error ( from API )

## Redux Thunk Middleware

Middleware Thunk allows action creator to return a function, instead of a action. The function can now preform side effects such as async tasks. The function can also dispatch regular actions which will be handle be the reducer. Works with ReactRedux.

- axios: Requests to an API end point
- redux-thunk: Define async action creators
