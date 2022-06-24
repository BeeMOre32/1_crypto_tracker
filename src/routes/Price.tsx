import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import { PriceInfo } from "../interface/PriceInfo";
import { fetchPrice } from "./fetch";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
`;
const Context = styled.div`
  width: 100%;
  height: 40px;
  border-radius: 10px;
  margin-top: 30px;
  background-color: ${(props) => props.theme.textColor};
  padding: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  span {
    background-color: ${(props) => props.theme.textColor};
    color: ${(props) => props.theme.bgColor};
  }
`;

function Price() {
  const { coinId } = useParams();
  const { data, isLoading } = useQuery<PriceInfo>(["tickers", coinId], () =>
    fetchPrice(coinId)
  );

  return (
    <>
      {isLoading ? (
        <span>Loading...</span>
      ) : (
        <Wrapper>
          <Context>
            <span>Current Price: {data?.quotes.USD.price}$</span>
          </Context>
          <Context>
            <span>
              1 Hours ago rate of chagne: {data?.quotes.USD.percent_change_1h}%
            </span>
          </Context>
          <Context>
            <span>
              30 Min ago rate of chagne: {data?.quotes.USD.percent_change_30m}%
            </span>
          </Context>
          <Context>
            <span>
              15 Min ago rate of chagne: {data?.quotes.USD.percent_change_15m}%
            </span>
          </Context>
        </Wrapper>
      )}
    </>
  );
}

export default Price;
