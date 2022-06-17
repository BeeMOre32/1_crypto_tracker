import { useEffect, useState } from "react";
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
  }
`;

function Coins() {
  const [loading, setLoaing] = useState(true);
  const { coinId } = useParams();
  const { state } = useLocation() as ILocation;
  const [info, setInfo] = useState<InfoData>();
  const [priceInfo, setPriceInfo] = useState<PriceInfo>();
  const PriceMatch = useMatch("/:coinId/Price");
  const ChartsMatch = useMatch("/:coinId/Charts");
  useEffect(() => {
    (async () => {
      const infoData = await (
        await fetch(`https://api.coinpaprika.com/v1/coins/${coinId}`)
      ).json();
      const priceData = await (
        await fetch(`https://api.coinpaprika.com/v1/tickers/${coinId}`)
      ).json();
      setInfo(infoData);
      setPriceInfo(priceData);
      setLoaing(false);
    })();
  }, [coinId]);
  return (
    <Container>
      <Header>
        <Title>
          {state?.name ? state.name : loading ? "Loading..." : info?.name}
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
              <CoinSpanbig>Opensource</CoinSpanbig>
            </CoinContext>
            <CoinContext>
              <CoinSpanSm>{info?.rank}</CoinSpanSm>
            </CoinContext>
            <CoinContext>
              <CoinSpanSm>{info?.symbol}</CoinSpanSm>
            </CoinContext>
            <CoinContext>
              <CoinSpanSm>{info?.open_source?.toString()}</CoinSpanSm>
            </CoinContext>
          </Warpper>
          <DesCointainer>
            <Description>{info?.description}</Description>
          </DesCointainer>
          <PriceWrapper>
            <CoinContext>
              <CoinSpanbig>Total Supply</CoinSpanbig>
            </CoinContext>
            <CoinContext>
              <CoinSpanbig>Max Supply</CoinSpanbig>
            </CoinContext>
            <CoinContext>
              <CoinSpanSm>{priceInfo?.total_supply}</CoinSpanSm>
            </CoinContext>
            <CoinContext>
              <CoinSpanSm>{priceInfo?.max_supply}</CoinSpanSm>
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
