import { Route, Routes } from "react-router-dom";
import Charts from "./routes/Charts";
import Coin from "./routes/Coin";
import Coins from "./routes/Coins";
import Price from "./routes/Price";

function Router() {
  return (
    <Routes>
      <Route path="/" element={<Coins />}></Route>
      <Route path="/:coinId" element={<Coin />}>
        <Route path="Price" element={<Price />}></Route>
        <Route path="Charts" element={<Charts />}></Route>
      </Route>
    </Routes>
  );
}

export default Router;
