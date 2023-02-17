import React from "react";
import { useSelector, useDispatch } from "react-redux";

function HookCakeContainer() {
  const numOfCakes = useSelector((state) => state.numOfCakes);
  // const dispatch = useDispatch()

  return (
    <div>
      HookCakeContainer
      <h2> Number of cakes : {numOfCakes}</h2>
      <button>Buy Cake</button>
    </div>
  );
}

export default HookCakeContainer;
