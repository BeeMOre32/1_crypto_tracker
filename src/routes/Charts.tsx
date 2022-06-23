import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import { fetchCoinHistoy } from "./fetch";
import ApexChart from "react-apexcharts";
interface ICoinHistory {
  time_open: number;
  time_close: number;
  open: string;
  high: string;
  low: string;
  close: string;
  volume: string;
  market_cap: number;
}

function Charts() {
  const { coinId } = useParams();
  const { isLoading, data } = useQuery<ICoinHistory[]>([`Histoy`, coinId], () =>
    fetchCoinHistoy(coinId)
  );

  return (
    <div>
      {isLoading ? (
        "loading charts..."
      ) : (
        <ApexChart
          type="line"
          series={[
            {
              name: "sales",
              data: data?.map((price) => price.close) as unknown as number[],
            },
          ]}
          options={{
            chart: {
              height: 500,
              width: 300,
              toolbar: {
                show: false,
              },
              background: "transparent",
            },
            grid: { show: false },
            stroke: {
              curve: "smooth",
              width: 5,
            },
            theme: { mode: "dark" },
            yaxis: { show: false },
            xaxis: {
              labels: { show: false },
              axisTicks: { show: false },
              axisBorder: { show: false },
            },
            fill: {
              type: "gradient",
              gradient: { gradientToColors: ["#0be881"], stops: [0, 100] },
            },
            tooltip: { y: { formatter: (value) => `$${value.toFixed(2)}` } },
            colors: [" #0fbcf9"],
          }}
        />
      )}
    </div>
  );
}
export default Charts;
