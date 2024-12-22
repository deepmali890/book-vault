import { Data } from '../Utils/Data';
import Chart from "chart.js/auto";
import React, { useState } from 'react'
import { Bar, Line, Pie } from "react-chartjs-2";

const Home = () => {
    let [chartData, setChartData] = useState({
        labels: Data.map((data) => data.year),
        datasets: [
          {
            label: "User Gained",
            data: Data.map((data) => data.userGain),
            backgroundColor: [
              "rgba(75,192,192,1)",
              "#ecf0f1",
              "#E23670",
              "#f3ba2f",
              "#2a71d0",
            ],
            borderColor: "white",
            borderWidth: 1,
          },
        ],
      });
  return (
    <div>
          <div className=''>
      <div className="w-full grid grid-flow-col ps-10 pt-[30px] h-screen ">
       
        <div className="w-[350px] h-[200px] bg-[#E23670] rounded-[10px] py-[20px]">
          <Bar data={chartData} className="w-full" />
        </div>
        <div className="w-[200px] h-[200px] bg-blue-400 rounded-[10px] p-[10px]">
          <Pie data={chartData} />
        </div>

        <div className="w-[350px] h-[200px] bg-[#11d0da] text-white rounded-[10px] py-[20px]">
          <Line data={chartData} />
        </div>
      </div>
    </div>
    </div>
  )
}

export default Home
