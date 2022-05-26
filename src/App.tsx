import "regenerator-runtime/runtime";
import { useEffect } from "react";
import { Navigate } from "react-router";
import { HashRouter, Routes, Route } from "react-router-dom";
import { useIdle, useInterval } from "react-use";

import { Layout } from "./components";
import { useAppDispatch } from "./redux/hooks";
import { fetchAssetsAndMetadata, fetchRefPrices } from "./redux/assetsSlice";
import { fetchAccount } from "./redux/accountSlice";
import { fetchConfig } from "./redux/appSlice";
import Home from "./screens/home/Home";

const IDLE_INTERVAL = 30e3;
const REFETCH_INTERVAL = 60e3;

const App = () => {
  const isIdle = useIdle(IDLE_INTERVAL);
  const dispatch = useAppDispatch();

  const fetchData = () => {

    dispatch(fetchAssetsAndMetadata()).then(() => dispatch(fetchRefPrices()));
    dispatch(fetchAccount());
  };

  useEffect(() => {
    dispatch(fetchConfig());
  }, []);
  useEffect(fetchData, []);
  useInterval(fetchData, !isIdle ? REFETCH_INTERVAL : null);

  return (
    <HashRouter>
      <Layout>
        <Routes>
          <Route path="/home" element={<Home />} />
        </Routes>
      </Layout>
    </HashRouter>
  );
};

export default App;
