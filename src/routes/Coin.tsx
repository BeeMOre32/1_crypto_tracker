import { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { useQuery } from "react-query";

import {
  Link,
  Outlet,
  Route,
  Router,
  Routes,
  useLocation,
  useMatch,
  useParams,
} from "react-router-dom";
import styled from "styled-components";
import { InfoData } from "../interface/Coininfo";
import { PriceInfo } from "../interface/PriceInfo";
import { fetchInfo, fetchPrice } from "./fetch";

interface ILocation {
  state: {
    name: string;
  };
}

const Container = styled.div`
  padding: 0px 15px;
  max-width: 480px;
  margin: 0 auto;
  height: 100vh;
  box-sizing: border-box;
`;

const Header = styled.header`
  height: 10vh;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  a {
    position: absolute;
    left: 0;
    width: 80px;
    height: 50px;
    padding: 10px;
    border-radius: 8px;
    background-color: black;
  }
`;
const Loader = styled.span`
  display: block;
  text-align: center;
`;

const Warpper = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-template-rows: 1fr 1fr;
  padding: 10px;
  width: 100%;
  border-radius: 8px;
  background-color: rgb(0, 0, 0);
  gap: 5px;
`;

const CoinContext = styled.div`
  padding: 10px;
  background-color: rgb(0, 0, 0);
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;
const Description = styled.p`
  color: ${(props) => props.theme.textColor};
`;
const DesCointainer = styled.div`
  margin-top: 20px;
  box-sizing: border-box;
`;
const CoinSpanbig = styled.span`
  color: ${(props) => props.theme.textColor};
  font-size: 1.25rem;
  background-color: inherit;
`;
const CoinSpanSm = styled(CoinSpanbig)`
  font-size: 1rem;
`;
const PriceWrapper = styled(Warpper)`
  margin-top: 20px;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: 1fr 1fr;
`;
const Title = styled.h1`
  color: ${(props) => props.theme.accentColor};
  font-size: 2em;
`;

const Tabs = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  padding: 10px;
  gap: 10px;
  margin-top: 30px;
`;

const Tab = styled.div<{ isActive: boolean }>`
  display: flex;
  text-transform: uppercase;
  align-items: center;
  justify-content: center;
  border-radius: 10px;
  background-color: ${(props) =>
    props.isActive ? props.theme.accentColor : `black`};
  color: ${(props) => props.theme.textColor};
  height: 30px;
  a {
    display: block;
  }
`;

function Coins() {
  const { coinId } = useParams();
  const { state } = useLocation() as ILocation;
  const PriceMatch = useMatch("/:coinId/Price");
  const ChartsMatch = useMatch("/:coinId/Charts");
  const { isLoading: infoLoading, data: infoData } = useQuery<InfoData>(
    ["info", coinId],
    () => fetchInfo(coinId)
  );
  const { isLoading: tickersLoading, data: tickersData } = useQuery<PriceInfo>(
    ["tickers", coinId],
    () => fetchPrice(coinId),
    {
      refetchInterval: 5000,
    }
  );
  const loading = infoLoading && tickersLoading;

  return (
    <Container>
      <Helmet>
        <title>
          {state?.name ? state.name : loading ? "Loading..." : infoData?.name}
        </title>
      </Helmet>
      <Header>
        <Link to="/">Back to Home</Link>
        <Title>
          {state?.name ? state.name : loading ? "Loading..." : infoData?.name}
        </Title>
      </Header>
      {loading ? (
        <Loader>Loading...</Loader>
      ) : (
        <>
          <Warpper>
            <CoinContext>
              <CoinSpanbig>Rank</CoinSpanbig>
            </CoinContext>
            <CoinContext>
              <CoinSpanbig>Symbol</CoinSpanbig>
            </CoinContext>
            <CoinContext>
              <CoinSpanbig>Price</CoinSpanbig>
            </CoinContext>
            <CoinContext>
              <CoinSpanSm>{infoData?.rank}</CoinSpanSm>
            </CoinContext>
            <CoinContext>
              <CoinSpanSm>{infoData?.symbol}</CoinSpanSm>
            </CoinContext>
            <CoinContext>
              <CoinSpanSm>
                ${tickersData?.quotes.USD.price.toFixed(3)}
              </CoinSpanSm>
            </CoinContext>
          </Warpper>
          <DesCointainer>
            <Description>{infoData?.description}</Description>
          </DesCointainer>
          <PriceWrapper>
            <CoinContext>
              <CoinSpanbig>Total Supply</CoinSpanbig>
            </CoinContext>
            <CoinContext>
              <CoinSpanbig>Max Supply</CoinSpanbig>
            </CoinContext>
            <CoinContext>
              <CoinSpanSm>{tickersData?.total_supply}</CoinSpanSm>
            </CoinContext>
            <CoinContext>
              <CoinSpanSm>{tickersData?.max_supply}</CoinSpanSm>
            </CoinContext>
          </PriceWrapper>
          <Tabs>
            <Tab isActive={PriceMatch !== null}>
              <Link to={`/${coinId}/Price`}>Price</Link>
            </Tab>

            <Tab isActive={ChartsMatch !== null}>
              <Link to={`/${coinId}/Charts`}>Charts</Link>
            </Tab>
          </Tabs>
          <Outlet></Outlet>
        </>
      )}
    </Container>
  );
}

export default Coins;
