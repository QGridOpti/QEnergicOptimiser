import React, { useState } from "react";
import logo from "../Images/logo.webp"; // Adjust the path as necessary
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMapEvents,
  Polyline,
  Polygon,
  Circle,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import * as L from "leaflet";

import markerIcon2xUrl from "leaflet/dist/images/marker-icon-2x.png";
import markerIconUrl from "leaflet/dist/images/marker-icon.png";
import markerShadowUrl from "leaflet/dist/images/marker-shadow.png";

import {
  Calculator,
  Trash2,
  Activity,
  Target,
  Map,
  Power,
  BarChart3,
} from "lucide-react";

const locationIcon = new L.Icon({
  iconUrl: new URL(markerIconUrl, import.meta.url).href,
  iconRetinaUrl: new URL(markerIcon2xUrl, import.meta.url).href,
  shadowUrl: new URL(markerShadowUrl, import.meta.url).href,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

const redCircleSvg = `
  <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30">
    <circle cx="15" cy="15" r="10" fill="red" />
  </svg>
`;

const centroidIcon = new L.Icon({
  iconUrl: "data:image/svg+xml;base64," + btoa(redCircleSvg),
  iconSize: [30, 30],
  iconAnchor: [15, 15],
  popupAnchor: [0, -15],
});

function MapClickHandler({ polygonPoints, setPolygonPoints }) {
  useMapEvents({
    click(e) {
      const { lat, lng } = e.latlng;
      setPolygonPoints([...polygonPoints, [lat, lng]]);
    },
  });
  return null;
}

export default function MicrogridOptimizer() {
  const [polygonPoints, setPolygonPoints] = useState([]);
  const [centroids, setCentroids] = useState([]);
  const [gridType, setGridType] = useState("traditional");
  const [customGridType, setCustomGridType] = useState("");
  const [isCalculating, setIsCalculating] = useState(false);
  const [stats, setStats] = useState({
    totalGrids: 0,
    estimatedCoverage: 0,
    powerCapacity: 0,
  });
  const [expectedCapacity, setExpectedCapacity] = useState(10); // default 10 MW

  const [manualLat, setManualLat] = useState("");
  const [manualLng, setManualLng] = useState("");
  const [minBudget, setMinBudget] = useState(1000);
  const [maxBudget, setMaxBudget] = useState(10000);
  const [selectedBudget, setSelectedBudget] = useState(5000);

  const selectedRegionArea = polygonPoints.length * 3;

  const calculateCentroids = () => {
    if (polygonPoints.length < 3) {
      alert("Please select at least 3 points.");
      return;
    }
    setIsCalculating(true);
    setTimeout(() => {
      const numGrids = Math.max(1, Math.floor(polygonPoints.length / 3));
      const groups = Array.from({ length: numGrids }, () => []);
      polygonPoints.forEach((p, i) => groups[i % numGrids].push(p));
      const calculatedCentroids = groups.map((group) => {
        const latAvg = group.reduce((sum, p) => sum + p[0], 0) / group.length;
        const lngAvg = group.reduce((sum, p) => sum + p[1], 0) / group.length;
        return [latAvg, lngAvg];
      });
      setCentroids(calculatedCentroids);
      setStats({
        totalGrids: calculatedCentroids.length,
        estimatedCoverage: calculatedCentroids.length * 12,
        powerCapacity: calculatedCentroids.length * 1.2,
      });
      setIsCalculating(false);
    }, 1000);
  };

  const clearSelection = () => {
    setPolygonPoints([]);
    setCentroids([]);
    setStats({ totalGrids: 0, estimatedCoverage: 0, powerCapacity: 0 });
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-500 via-slate-800 to-indigo-900 p-4">
      <div className="mb-6">
        <div className="flex items-center gap-3 mb-2 text-white">
          {/* QEnergy */}
          <img className="w-40 h-30" src={logo} alt="logo" />
        </div>
        <p className=" text-lg md:text-[40px] text-[#FAB12F] font-bold">
          QEnergic Solar Grid placement optimization Software
        </p>
        <p className="lg:mx-60 mt-5 text-white">This software enables energy developers, governments, and utility providers to maximumise energy access by using quantum optimization and geospatial intelligence to deliver precise, scalable, and data-driven grid placement solutions.</p>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-x-4 gap-y-2">
        <div className="lg:col-span-2 order-1">
          <div className="bg-gradient-to-br from-slate-800 to-slate-700 rounded-2xl p-4 md:p-6 border border-slate-600 shadow-2xl">
            <div className="bg-slate-900/50 rounded-lg p-3 mb-4">
              <div className="flex items-center gap-3 mb-6">
                <Map className="w-5 h-5 text-blue-400" />
                <h2 className="text-lg font-semibold text-white">
                  Interactive Map
                </h2>
              </div>
              <div className="flex flex-col items-center gap-2 text-sm text-gray-300">
                <Target className="w-4 h-4 text-emerald-400" />
                <span>
                  Click on the map to select boundary points • Need at least 3
                  points to optimize
                </span>
                {/* Location Input */}
        <div className="mb-4">

          <div className="flex">
          {/* <h3 className="text-white text-base font-semibold mb-2">Add Points</h3> */}
          <div className="grid grid-cols-2 gap-2 mb-2">
            <input
              type="number"
              value={manualLat}
              onChange={(e) => setManualLat(e.target.value)}
              placeholder="Latitude"
              step="0.0001"
              className="w-full bg-slate-700 border border-slate-500 text-white px-3 py-2 rounded-md text-sm focus:ring-2 focus:ring-emerald-500 focus:border-transparent placeholder-gray-400"
            />
            <input
              type="number"
              value={manualLng}
              onChange={(e) => setManualLng(e.target.value)}
              placeholder="Longitude"
              step="0.0001"
              className="w-full bg-slate-700 border border-slate-500 text-white px-3 py-2 rounded-md text-sm focus:ring-2 focus:ring-emerald-500 focus:border-transparent placeholder-gray-400"
            />
          </div>
          <button
            onClick={() => {
              const lat = parseFloat(manualLat);
              const lng = parseFloat(manualLng);
              if (!isNaN(lat) && !isNaN(lng)) {
                setPolygonPoints([...polygonPoints, [lat, lng]]);
                setManualLat("");
                setManualLng("");
              } else {
                alert("Please enter valid coordinates.");
              }
            }}
            className="w-full bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors duration-200"
          >
            Add Point
          </button>
          </div>
          {/* Action Buttons */}
         <div className="flex gap-2 pt-3 items-center justify-between">
              <button
                onClick={calculateCentroids}
                disabled={polygonPoints.length < 3 || isCalculating}
                className="flex-1 h-10 bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 disabled:from-gray-500 disabled:to-gray-600 disabled:cursor-not-allowed text-white px-4 py-2 rounded-lg text-sm font-medium flex items-center justify-center gap-2 transition-all duration-200"
              >
                {isCalculating ? (
                  <>
                    <Activity className="w-4 h-4 animate-spin" />
                    Calculating...
                  </>
                ) : (
                  <>
                    <Calculator className="w-4 h-4" />
                    Optimize
                  </>
                )}
              </button>
              <button
                onClick={clearSelection}
                className="bg-gradient-to-r  h-10 from-red-500 to-pink-500 hover:from-red-600 hover:to-pink-600 text-white px-4 py-2 rounded-lg text-sm font-medium flex items-center justify-center gap-2 transition-all duration-200"
              >
                <Trash2 className="w-4 h-4" />
                Clear
              </button>
            </div>
        </div>
        
              </div>
            </div>

            <div className="w-full h-[500px] rounded-xl overflow-hidden">
              <MapContainer center={[7.9465, -1.0232]} zoom={6} className="w-full h-full">
                <TileLayer
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                  attribution="&copy; OpenStreetMap contributors"
                />
                <MapClickHandler polygonPoints={polygonPoints} setPolygonPoints={setPolygonPoints} />
                {polygonPoints.map((point, index) => (
                  <Marker key={`pt-${index}`} position={point} icon={locationIcon}>
                    <Popup>Point {index + 1}</Popup>
                  </Marker>
                ))}
                {centroids.map((point, index) => (
                  <Circle
                    key={`coverage-${index}`}
                    center={point}
                    radius={10000} // 10 km in meters
                    pathOptions={{
                      color: "red",
                      fillColor: "red",
                      fillOpacity: 0.2,
                    }}
                  />
                ))}

                {polygonPoints.length > 2 && (
                  <Polygon positions={polygonPoints} pathOptions={{ color: "lime" }} />
                )}
              </MapContainer>
            </div>
          </div>
        </div>

        <div className="lg:col-span-1 order-2 space-y-3">
          {/* Quick Controls - Primary action area */}
          

          {/* Live Analytics */}
          <div className="bg-gradient-to-br from-slate-800 to-slate-700 rounded-2xl p-4 border border-slate-600 shadow-2xl">
            <div className="flex items-center gap-3 mb-4">
              <BarChart3 className="w-5 h-5 text-blue-400" />
              <h3 className="text-lg font-semibold text-white">Live Analytics</h3>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div className="bg-slate-900/50 rounded-lg p-3 text-center">
                <div className="text-2xl font-bold text-emerald-400">
                  {polygonPoints.length}
                </div>
                <div className="text-xs text-gray-400">Location Points</div>
              </div>
              <div className="bg-slate-900/50 rounded-lg p-3 text-center">
                <div className="text-2xl font-bold text-blue-400">
                  {stats.totalGrids}
                </div>
                <div className="text-xs text-gray-400">Toatal Number of Grids</div>
              </div>
              <div className="bg-slate-900/50 rounded-lg p-3 text-center">
                <div className="text-2xl font-bold text-purple-400">
                  {stats.estimatedCoverage.toFixed(0)}%
                </div>
                <div className="text-xs text-gray-400">Population Coverage</div>
              </div>
              <div className="bg-slate-900/50 rounded-lg p-3 text-center">
                <div className="text-2xl font-bold text-yellow-400">
                  {stats.powerCapacity.toFixed(1)}MW
                </div>
                <div className="text-xs text-gray-400">Energy Output</div>
              </div>
            </div>
          </div>

          {/* Region Details - Compact version */}
          <div className="bg-gradient-to-br from-slate-800 to-slate-700 rounded-2xl p-4 border border-slate-600 shadow-2xl">
            <div className="flex items-center gap-3 mb-3">
              <Activity className="w-5 h-5 text-emerald-400" />
              <h3 className="text-lg font-semibold text-white">Region Details</h3>
            </div>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-400">Grid Area</span>
                <span className="text-sm font-medium text-white">
                  {selectedRegionArea.toFixed(1)} km²
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-400">Efficiency</span>
                <span className="text-sm font-medium text-emerald-400">
                  {stats.totalGrids > 0 ? "Optimized" : "Pending"}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-400">Population Est.</span>
                <span className="text-sm font-medium text-white">
                  {(selectedRegionArea * 120).toFixed(0)} people
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-400">Grid Type</span>
                <span className="text-sm font-medium text-white capitalize">
                  {gridType === "custom" ? customGridType || "Custom" : gridType}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-400">Installation Cost</span>
                <span className="text-sm font-medium text-white">
                  ${selectedBudget.toLocaleString()}
                </span>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-slate-800 to-slate-700 rounded-2xl p-4 border border-slate-600 shadow-2xl">
            <div className="flex items-center gap-3 mb-4">
              <Power className="w-5 h-5 text-yellow-400" />
              <h3 className="text-lg font-semibold text-white">System Status</h3>
            </div>
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse"></div>
                <span className="text-sm text-gray-300">Optimizer: Active</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse"></div>
                <span className="text-sm text-gray-300">Map: Online</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 bg-purple-400 rounded-full animate-pulse"></div>
                <span className="text-sm text-gray-300">Analytics: Running</span>
              </div>
            </div>
          </div>

          
        </div>
        {/* Grid Type Selection */}
        <div className="mb-4">
          <h3 className="text-white text-base font-semibold mb-2">Solar Grid Configuration</h3>
          <div className="space-y-3">
            <div>
              <label className="block text-white text-sm font-medium mb-1">
                Grid Type
              </label>
              <select
                value={gridType}
                onChange={(e) => {
                  setGridType(e.target.value);
                  if (e.target.value !== "custom") setCustomGridType("");
                }}
                className="w-full bg-slate-700 border border-slate-500 text-white px-3 py-2 rounded-md text-sm focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
              >
                <option value="traditional">Traditional Solar</option>
                <option value="all-weather">All-Weather Solar</option>
                <option value="custom">Both (Hybrid)</option>
              </select>
            </div>

            {gridType === "custom" && (
              <div>
                <label className="block text-white text-sm font-medium mb-1">
                  Custom Configuration
                </label>
                <input
                  type="text"
                  value={customGridType}
                  placeholder="e.g., 70% Traditional + 30% All-Weather"
                  onChange={(e) => setCustomGridType(e.target.value)}
                  className="w-full bg-slate-700 border border-slate-500 text-white px-3 py-2 rounded-md text-sm focus:ring-2 focus:ring-emerald-500 focus:border-transparent placeholder-gray-400"
                />
              </div>
            )}
          </div>
        </div>

        {/* Budget Configuration */}
        <div className="mb-4">
          <h3 className="text-white text-base font-semibold mb-2">Budget Planning</h3>
          <div className="grid grid-cols-2 gap-3 mb-3">
            <div>
              <label className="block text-white text-sm font-medium mb-1">
                Min Budget ($)
              </label>
              <input
                type="number"
                value={minBudget}
                onChange={(e) => setMinBudget(Number(e.target.value))}
                placeholder="50000"
                className="w-full bg-slate-700 border border-slate-500 text-white px-3 py-2 rounded-md text-sm focus:ring-2 focus:ring-emerald-500 focus:border-transparent placeholder-gray-400"
              />
            </div>
            <div>
              <label className="block text-white text-sm font-medium mb-1">
                Max Budget ($)
              </label>
              <input
                type="number"
                value={maxBudget}
                onChange={(e) => setMaxBudget(Number(e.target.value))}
                placeholder="500000"
                className="w-full bg-slate-700 border border-slate-500 text-white px-3 py-2 rounded-md text-sm focus:ring-2 focus:ring-emerald-500 focus:border-transparent placeholder-gray-400"
              />
            </div>
            {minBudget < maxBudget && (
            <div className="">
              <label className="block text-white text-sm font-medium mb-1">
                Selected: ${selectedBudget.toLocaleString()}
              </label>
              <input
                type="range"
                min={minBudget}
                max={maxBudget}
                value={selectedBudget}
                onChange={(e) => setSelectedBudget(Number(e.target.value))}
                className="w-full h-2 bg-slate-600 rounded-lg appearance-none cursor-pointer accent-emerald-500"
              />
            </div>
          )}
          </div>

          
        </div>

        {/* Capacity Planning */}
        <div className="mb-4">
          <h3 className="text-white text-base font-semibold mb-2">Capacity</h3>
          <div>
            <label className="block text-white text-sm font-medium mb-1">
              Expected Capacity (MW)
            </label>
            <input
              type="number"
              value={expectedCapacity}
              onChange={(e) => setExpectedCapacity(Number(e.target.value))}
              placeholder="10.5"
              className="w-full bg-slate-700 border border-slate-500 text-white px-3 py-2 rounded-md text-sm focus:ring-2 focus:ring-emerald-500 focus:border-transparent placeholder-gray-400"
            />
          </div>
        </div>

        

        {/* Action Buttons */}
         
      </div>
    
      
    </div >
  );
}
