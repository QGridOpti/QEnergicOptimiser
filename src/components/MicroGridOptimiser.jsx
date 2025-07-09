import React, { useState } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMapEvents } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import * as L from "leaflet";

import markerIcon2x from "leaflet/dist/images/marker-icon-2x.png";
import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";

import { Calculator, Trash2, Activity, Target, Map, Grid3x3, Power, BarChart3 } from "lucide-react";

const locationIcon = new L.Icon({
  iconUrl: markerIcon,
  iconRetinaUrl: markerIcon2x,
  shadowUrl: markerShadow,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
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
  const [isCalculating, setIsCalculating] = useState(false);
  const [stats, setStats] = useState({
    totalGrids: 0,
    estimatedCoverage: 0,
    powerCapacity: 0,
  });

  const selectedRegionArea = polygonPoints.length * 3; // Dummy estimate

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
      const calculatedCentroids = groups.map(group => {
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
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-indigo-900 p-4">
      <div className="mb-6">
        <div className="flex items-center gap-3 mb-2">
          <div className="p-2 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-lg">
            <Grid3x3 className="w-6 h-6 text-white" />
          </div>
          <h1 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
            Microgrid Planning System
          </h1>
        </div>
        <p className="text-gray-400 text-sm md:text-base">
          Advanced energy placement optimization platform
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 order-1">
          <div className="bg-gradient-to-br from-slate-800 to-slate-700 rounded-2xl p-4 md:p-6 border border-slate-600 shadow-2xl">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-4 gap-3">
              <div className="flex items-center gap-3">
                <Map className="w-5 h-5 text-blue-400" />
                <h2 className="text-lg font-semibold text-white">Interactive Map</h2>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={calculateCentroids}
                  disabled={polygonPoints.length < 3 || isCalculating}
                  className="bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 disabled:from-gray-600 disabled:to-gray-600 text-white px-4 py-2 rounded-lg font-medium transition-all duration-200 flex items-center gap-2 shadow-lg hover:shadow-emerald-500/25 disabled:cursor-not-allowed text-sm"
                >
                  {isCalculating ? (
                    <>
                      <Activity className="w-4 h-4 animate-spin" /> Calculating...
                    </>
                  ) : (
                    <>
                      <Calculator className="w-4 h-4" /> Optimize
                    </>
                  )}
                </button>
                <button
                  onClick={clearSelection}
                  className="bg-gradient-to-r from-red-500 to-pink-500 hover:from-red-600 hover:to-pink-600 text-white px-4 py-2 rounded-lg font-medium transition-all duration-200 flex items-center gap-2 shadow-lg hover:shadow-red-500/25 text-sm"
                >
                  <Trash2 className="w-4 h-4" /> Clear
                </button>
              </div>
            </div>

            <div className="bg-slate-900/50 rounded-lg p-3 mb-4">
              <div className="flex items-center gap-2 text-sm text-gray-300">
                <Target className="w-4 h-4 text-emerald-400" />
                <span>Click on the map to select boundary points • Need at least 3 points to optimize</span>
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
                  <Marker key={`centroid-${index}`} position={point}>
                    <Popup>Grid {index + 1}</Popup>
                  </Marker>
                ))}
              </MapContainer>
            </div>
          </div>
        </div>

        {/* Analytics Sidebar */}
        <div className="lg:col-span-1 order-2 space-y-4">
          <div className="bg-gradient-to-br from-slate-800 to-slate-700 rounded-2xl p-4 border border-slate-600 shadow-2xl">
            <div className="flex items-center gap-3 mb-4">
              <BarChart3 className="w-5 h-5 text-blue-400" />
              <h3 className="text-lg font-semibold text-white">Live Analytics</h3>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div className="bg-slate-900/50 rounded-lg p-3 text-center">
                <div className="text-2xl font-bold text-emerald-400">{polygonPoints.length}</div>
                <div className="text-xs text-gray-400">Points</div>
              </div>
              <div className="bg-slate-900/50 rounded-lg p-3 text-center">
                <div className="text-2xl font-bold text-blue-400">{stats.totalGrids}</div>
                <div className="text-xs text-gray-400">Grids</div>
              </div>
              <div className="bg-slate-900/50 rounded-lg p-3 text-center">
                <div className="text-2xl font-bold text-purple-400">{stats.estimatedCoverage.toFixed(0)}%</div>
                <div className="text-xs text-gray-400">Coverage</div>
              </div>
              <div className="bg-slate-900/50 rounded-lg p-3 text-center">
                <div className="text-2xl font-bold text-yellow-400">{stats.powerCapacity.toFixed(1)}</div>
                <div className="text-xs text-gray-400">MW</div>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-slate-800 to-slate-700 rounded-2xl p-4 border border-slate-600 shadow-2xl">
            <div className="flex items-center gap-3 mb-4">
              <Activity className="w-5 h-5 text-emerald-400" />
              <h3 className="text-lg font-semibold text-white">Region Details</h3>
            </div>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-400">Area</span>
                <span className="text-sm font-medium text-white">{selectedRegionArea.toFixed(1)} km²</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-400">Efficiency</span>
                <span className="text-sm font-medium text-emerald-400">{stats.totalGrids > 0 ? 'Optimized' : 'Pending'}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-400">Population Est.</span>
                <span className="text-sm font-medium text-white">{(selectedRegionArea * 120).toFixed(0)} people</span>
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
      </div>
    </div>
  );
}
