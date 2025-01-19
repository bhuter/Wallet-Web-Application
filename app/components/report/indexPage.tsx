"use client";

import React from 'react';
import dynamic from 'next/dynamic';
import { VictoryChart, VictoryLine, VictoryTooltip, VictoryTheme } from 'victory';
import 'leaflet/dist/leaflet.css';

// Dynamically import MapContainer and related components
const MapContainer = dynamic(() => import('react-leaflet').then(mod => mod.MapContainer), { ssr: false });
const TileLayer = dynamic(() => import('react-leaflet').then(mod => mod.TileLayer), { ssr: false });
const Marker = dynamic(() => import('react-leaflet').then(mod => mod.Marker), { ssr: false });
const Popup = dynamic(() => import('react-leaflet').then(mod => mod.Popup), { ssr: false });

interface Data {
  day: string;
  current: number;
  previous: number;
}

const SalesAnalytics = () => {
  const data = [
    { day: 'Mon', current: 12000, previous: 15000 },
    { day: 'Tue', current: 19000, previous: 23000 },
    { day: 'Wed', current: 30000, previous: 27000 },
    { day: 'Thur', current: 25000, previous: 22000 },
    { day: 'Fri', current: 22000, previous: 21000 },
    { day: 'Sat', current: 28000, previous: 29000 },
    { day: 'Sun', current: 32000, previous: 31000 },
  ];

  return (
    <div className="flex flex-wrap">
      {/* Sales Data Chart */}
      <div className="sales w-[40%] p-4 bg-white rounded-lg shadow-md">
        <h1 className="text-2xl font-semibold text-gray-500 mb-2">Revenue</h1>
        <div className="chart">
          <VictoryChart theme={VictoryTheme.material}>
            <VictoryLine
              data={data}
              x="day"
              y="current"
              labelComponent={<VictoryTooltip />}
              style={{ data: { stroke: 'rgb(75, 192, 192)' } }}
            />
            <VictoryLine
              data={data}
              x="day"
              y="previous"
              labelComponent={<VictoryTooltip />}
              style={{ data: { stroke: 'rgb(255, 99, 132)' } }}
            />
          </VictoryChart>
        </div>
      </div>

     
 
            {/* Daily Sales */}
            <div className="daily-orders w-[25%] p-4 bg-white rounded-lg shadow-md ml-6 h-max">
                <h4 className="text-xl font-semibold text-gray-700 mb-4">Total Daily Sales</h4>
                <div>
                    <ul>
                        <li className="flex justify-between items-center mb-2">
                            <h4 className="text-sm text-gray-400">Monday</h4>
                            <div className="amount text-gray-600 font-bold">$300.56</div>
                        </li>
                        <li className="flex justify-between items-center mb-2">
                            <h4 className="text-sm text-gray-400">Tuesday</h4>
                            <div className="amount text-gray-600 font-bold">$300.56</div>
                        </li>
                        <li className="flex justify-between items-center mb-2">
                            <h4 className="text-sm text-gray-400">Wednesday</h4>
                            <div className="amount text-gray-600 font-bold">$300.56</div>
                        </li>
                        <li className="flex justify-between items-center mb-2">
                            <h4 className="text-sm text-gray-400">Thursday</h4>
                            <div className="amount text-gray-600 font-bold">$300.56</div>
                        </li>
                        <li className="flex justify-between items-center">
                            <h4 className="text-sm text-gray-400">Friday</h4>
                            <div className="amount text-gray-600 font-bold">$300.56</div>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default SalesAnalytics;
