import React from "react";
import Lottie, { useLottie } from "lottie-react";

import Swirl1 from "/public/mcdonald-sprite-3.json";

const App = () => {
  const options = {
    animationData: Swirl1,
    loop: false,
  };

  const { View } = useLottie(options);

  return <>{View}</>;
};

export default App;
