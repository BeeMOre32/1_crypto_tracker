import { Link, useParams } from "react-router-dom";
import styled from "styled-components";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import axios from "axios";

const Container = styled.div`
  padding: 0px 15px;
  max-width: 480px;
  margin: 0 auto;
`;

const Header = styled.header`
  height: 10vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const CoinsList = styled.ul`
  list-style: none;
`;

const Coins = styled(motion.div)`
  background-color: white;
  color: ${(prps) => prps.theme.bgColor};
  margin-bottom: 10px;
  border-radius: 13px;
  padding: 17px;
  transition: color 0.2s ease-in-out;
  a {
    display: flex;
    align-items: center;
  }
  &:hover {
    a {
      color: ${(props) => props.theme.accentColor};
    }
  }
`;

const Img = styled.img`
  width: 25px;
  height: 25px;
  margin-right: 0.5em;
  background-color: inherit;
`;

const Loader = styled.span`
  display: block;
  text-align: center;
`;

const Title = styled.h1`
  color: ${(props) => props.theme.accentColor};
  font-size: 2em;
`;

interface CoinInterface {
  id: string;
  name: string;
  symbol: string;
  rank: number;
  is_new: boolean;
  is_active: boolean;
  type: string;
}

function Coin() {
  const [coins, setCoins] = useState<CoinInterface[]>([]);
  const [loading, setLoaing] = useState(true);
  useEffect(() => {
    axios
      .get("https://api.coinpaprika.com/v1/coins")
      .then((data) => {
        setCoins(data.data.slice(0, 100));
        setLoaing(false);
      })
      .catch(() => {
        alert(
          `opps! There is error. you might have check your internet connection`
        );
      });
  }, []);
  return (
    <Container>
      <Header>
        <Title>Coins</Title>
      </Header>
      {loading ? (
        <Loader>Loading...</Loader>
      ) : (
        <CoinsList>
          {coins.map((coin) => (
            <Coins
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              key={coin.id}
            >
              <Link to={`/${coin.id}`} state={{ name: coin.name }}>
                <Img
                  src={`
                  https://coinicons-api.vercel.app/api/icon/${coin.symbol.toLowerCase()}
                `}
                  alt=""
                />
                {coin.name} &rarr;
              </Link>
            </Coins>
          ))}
        </CoinsList>
      )}
    </Container>
  );
}
export default Coin;
