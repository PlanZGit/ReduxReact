import "./App.css";
// import CakeContainer from "./components/CakeContainer";
import { Provider } from "react-redux";
import store from "./redux/store";
// import HookCakeContainer from "./components/HookCakeContainer";
// import IceCreamContainer from "./components/IceCreamContainer";
// import NewCakeContainer from "./components/NewCakeContainer";
// import ItemContainer from "./components/ItemContainer";
import UserContiner from "./components/UserContiner";

function App() {
  return (
    <Provider store={store}>
      <div className="App">
        {/* <ItemContainer cake />
        <ItemContainer />
        <CakeContainer />
        <HookCakeContainer />
        <IceCreamContainer />
        <NewCakeContainer /> */}
        <UserContiner />
      </div>
    </Provider>
  );
}

export default App;
