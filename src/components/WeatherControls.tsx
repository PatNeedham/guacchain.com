'use client';

import { useState } from 'react';

interface WeatherControlsProps {
  digitalFog: number;
  setDigitalFog: (value: number) => void;
  blockchainRain: boolean;
  setBlockchainRain: (value: boolean) => void;
  solarFlares: boolean;
  setSolarFlares: (value: boolean) => void;
  wifiStorms: number;
  setWifiStorms: (value: number) => void;
}

export default function WeatherControls({
  digitalFog,
  setDigitalFog,
  blockchainRain,
  setBlockchainRain,
  solarFlares,
  setSolarFlares,
  wifiStorms,
  setWifiStorms,
}: WeatherControlsProps) {
  return (
    <div className="bg-blue-900/80 backdrop-blur-sm p-4 rounded-lg shadow-lg">
      <h3 className="text-lg font-bold text-white mb-4">🌤️ Weather Controls</h3>
      
      {/* Digital Fog */}
      <div className="mb-4">
        <label className="block text-sm font-medium text-blue-100 mb-2">
          Digital Fog: {digitalFog}%
        </label>
        <input
          type="range"
          min="0"
          max="100"
          value={digitalFog}
          onChange={(e) => setDigitalFog(parseInt(e.target.value))}
          className="w-full h-2 bg-blue-200 rounded-lg appearance-none cursor-pointer slider"
          title="Increases digital opacity effects on the farm view"
        />
        <span className="text-xs text-blue-200">Creates mysterious digital haze over your farm</span>
      </div>

      {/* Blockchain Rain */}
      <div className="mb-4">
        <label className="flex items-center space-x-2 cursor-pointer">
          <input
            type="checkbox"
            checked={blockchainRain}
            onChange={(e) => setBlockchainRain(e.target.checked)}
            className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500"
          />
          <span className="text-sm font-medium text-blue-100">⛈️ Blockchain Rain</span>
        </label>
        <span className="text-xs text-blue-200 ml-6">Data blocks fall from the digital sky</span>
      </div>

      {/* Solar Flares */}
      <div className="mb-4">
        <label className="flex items-center space-x-2 cursor-pointer">
          <input
            type="checkbox"
            checked={solarFlares}
            onChange={(e) => setSolarFlares(e.target.checked)}
            className="w-4 h-4 text-orange-600 bg-gray-100 border-gray-300 rounded focus:ring-orange-500"
          />
          <span className="text-sm font-medium text-blue-100">☀️ Solar Flares</span>
        </label>
        <span className="text-xs text-blue-200 ml-6">Cosmic energy boosts tree photosynthesis</span>
      </div>

      {/* WiFi Storms */}
      <div className="mb-4">
        <label className="block text-sm font-medium text-blue-100 mb-2">
          📶 WiFi Storms: Level {wifiStorms}
        </label>
        <input
          type="range"
          min="0"
          max="5"
          value={wifiStorms}
          onChange={(e) => setWifiStorms(parseInt(e.target.value))}
          className="w-full h-2 bg-blue-200 rounded-lg appearance-none cursor-pointer slider"
          title="Signal interference affects smart farming equipment"
        />
        <span className="text-xs text-blue-200">Signal waves disrupt digital farming tools</span>
      </div>
    </div>
  );
}