import React from "react";
import { useLottie } from "lottie-react";
import Swirl1 from "/public/mcdonald-sprite-3.json";
import Lottie from "lottie-react";

// const App = () => {
//   const options = {
//     animationData: Swirl1,
//     loop: false,
//   };

//   const { View } = useLottie(options);

//   return <>{View}</>;
// };

// export default App;

const App = () => <Lottie animationData={Swirl1} loop={false} />;

export default App;
