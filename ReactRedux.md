# React Redux

## Installation

- install react, redux and react-redux

      npx create-react-app my-app
      npm install redux react-redux

## Setup

Create Redux store and providing it to our application

### React App

- Create conponents folder - React Cake component : snippet rfce

### Actions

- Create redux folder - inside create cakeContainer.js, cakeTypes.js

_cakeTypes.js_ : Action

    export const BUY_CAKE = "BUY_CAKE";

_cakeContainer.js_ : Action Creator

    import { BUY_CAKE } from "./cakeTypes";

    export const buyCake = () => {
      return {
        type: BUY_CAKE,
      };
    };

### Reducer

- create _cakeReducer.js_

      import { BUY_CAKE } from "./cakeTypes";

      const initialState = {
        numOfCakes: 10,
      };

      const cakeReducer = (state = initialState, action) => {
        switch (action.type) {
          case BUY_CAKE:
            return { ...state, numOfCakes: state.numOfCakes - 1 };
          default:
            return state;
        }
      };

      export default cakeReducer;

### Store

Provide store at the top _App.js_ component will provide the store to every component in the application component tree.

- Create _store.js_ in redux folder

      import { createStore } from "redux";
      import cakeReducer from "./cake/cakeReducer";
      const store = createStore(cakeReducer);
      export default store;

- Wrap _App.js_ with provider and pass in store

      import "./App.css";
      import CakeContainer from "./components/CakeContainer";
      import { Provider } from "react"; //Provider
      import store from "./redux/store";

      function App() {
        return (
          <Provider store={store}> //Pass store
            <div className="App">
              <CakeContainer />
            </div>
          </Provider>
        );
      }

      export default App;

## Connect

- dispatch a buy cake on a button click

Step 1 : Define mapStateToProps function in _cakeContainer.js_

    const mapStateToProps = (state) => {
      return {
        numOfCakes: state.numOfCakes,
      };
    };

Step 2 : Define mapDispatchToProps function in _cakeContainer.js_ , create index.js and export action creators from it

    const mapDispatchToProps = dispatch => {
      return{
        buyCake: () => dispatch(buyCake())
      }
    }

Step 3 : Connect

    export default connect(mapStateToProps, mapDispatchToProps)(CakeContainer);

Summary:

- mapStateToProps: when you want to access the redux state in your component
  you define the mapStateToProps function. It gets the Redux state as a parameter which can be used to retrieve the appropriate state properties in our case we map state.numOfCakes to a prop call numOfCakes. Which we render in our JSX.
- mapDispatchToProps : this function gets the dispatch method as a parameter and allow us to map action creator to props in our component
- all of this is possible by using the connect function from react-redux, the connect function connects a react component to the redux store

## React Redux + Hooks

- React pattern
- Action creators, reducers, provide the store and connect the components
- Components can access state and dispatch actions
- React Hooks
- React Readux v7.1 , Hooks has been added
- Subscribe to store and dispatch actions without connect()

_HookCakeContainer.js_

    import { useSelector, useDispatch } from "react-redux";
    import { buyCake } from "../redux";

    const numOfCakes = useSelector((state) => state.numOfCakes);
    const dispatch = useDispatch();

# Multiple Reducer

Create rootReducer.js in redux folder.
Use the combineReducers from redux.

_rootReducer.js_

    import { combineReducers } from "redux";
    import cakeReducer from "./cake/cakeReducer";
    import iceCreamReducer from "./iceCream/iceCreamReducer";

    export const rootReducer = combineReducers({
      cake: cakeReducer,
      iceCream: iceCreamReducer,
    });

When mapping to component, add the obj name

    // Redux store is mapped to our component
    const mapStateToProps = (state) => {
      return {
        numOfIceCream: state.iceCream.numOfIceCream,
      };
    };

IMPORTANT : Export all Action Creator to redux store

_index.js_

    export { buyCake } from "./cake/cakeActions";
    export { buyIceCream } from "./iceCream/iceCreamActions";

# Middleware

## Setup redux-logger

npm install redux-loggor

    import { createStore, applyMiddleware } from "redux";
    import logger from "redux-logger";
    import { rootReducer } from "./rootReducer";

    const store = createStore(rootReducer, applyMiddleware(logger));

    export default store;

## Setup redux-devtools

https://github.com/zalmoxisus/redux-devtools-extension

Move to 1.3 Use redux-devtools-extension package from npm
npm install --save redux-devtools-extension

- inspect broswer
- go to redux tab

      import { createStore, applyMiddleware } from "redux";
      import logger from "redux-logger";
      import { composeWithDevTools } from "redux-devtools-extension";
      import { rootReducer } from "./rootReducer";

      const store = createStore(
        rootReducer,
        composeWithDevTools(applyMiddleware(logger))
      );

      export default store;

# Action payload

Config component by adding useState for number.
Then add input for userInput for payload.
Then change button onClick to a function call to buyCake passing number as argument. Fix mapDispatchToProps.

_NewCakeContainer.js_

    //useState
    const [number, setNumber] = useState(1);

    //UserInput
    <input type="text" value={number}
    onChange={(e) => { setNumber(e.target.value); }}/>

    // map our action creator to our prop
    const mapDispatchToProps = (dispatch) => {
      return {
        buyCake: (number) => dispatch(buyCake(number)),
      };
    };

Add in number parameter, payload, and set number to default value 1

_cakeActions.js_

    import { BUY_CAKE } from "./cakeTypes";

    export const buyCake = (number = 1) => {
      return {
        type: BUY_CAKE,
        payload: number,
      };
    };

Add in action.payload

_cakeReducer.js_

    case BUY_CAKE:
      return { ...state, numOfCakes: state.numOfCakes - action.payload };
