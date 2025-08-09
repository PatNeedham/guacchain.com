'use client';

import { useState } from 'react';
import Header from '@/components/Header';
import WeatherControls from '@/components/WeatherControls';
import FarmControls from '@/components/FarmControls';
import UpgradesStore from '@/components/UpgradesStore';
import FarmView from '@/components/FarmView';
import GuacamoleLaboratory from '@/components/GuacamoleLaboratory';

export default function Home() {
  // View state
  const [currentView, setCurrentView] = useState<'farm' | 'laboratory'>('farm');
  
  // Weather state
  const [digitalFog, setDigitalFog] = useState(0);
  const [blockchainRain, setBlockchainRain] = useState(false);
  const [solarFlares, setSolarFlares] = useState(false);
  const [wifiStorms, setWifiStorms] = useState(0);

  // Farm state
  const [soilQuality, setSoilQuality] = useState(50);
  const [workerHappiness, setWorkerHappiness] = useState(75);
  const [treeHealth, setTreeHealth] = useState(80);

  // Conveyor system state
  const [conveyorActive, setConveyorActive] = useState(false);
  const [conveyorSpeed, setConveyorSpeed] = useState(3);

  // Economy and upgrades
  const [money, setMoney] = useState(100);
  const [upgrades, setUpgrades] = useState([
    {
      id: 'quantum-fertilizer',
      name: 'Quantum Fertilizer',
      price: 50,
      description: 'Purple particle effects boost soil quantum entanglement',
      icon: '⚛️',
      purchased: false,
    },
    {
      id: 'wifi-sprinklers',
      name: 'WiFi-enabled Sprinklers',
      price: 75,
      description: 'Smart irrigation with signal wave animations',
      icon: '📡',
      purchased: false,
    },
    {
      id: 'solar-trees',
      name: 'Solar Panel Trees',
      price: 100,
      description: 'Harness the power of the sun with tree-mounted panels',
      icon: '⚡',
      purchased: false,
    },
    {
      id: 'smartphone-trees',
      name: 'Smartphone Trees',
      price: 120,
      description: 'Trees with social media notifications and apps',
      icon: '📱',
      purchased: false,
    },
    {
      id: 'conveyor-system',
      name: 'Blockchain Conveyor',
      price: 150,
      description: 'Automated avocado processing with literal blockchain technology',
      icon: '🏭',
      purchased: false,
    },
    {
      id: 'blockchain-validators',
      name: 'Blockchain Validators',
      price: 200,
      description: 'Mining rigs powered by organic avocado energy',
      icon: '⛏️',
      purchased: false,
    },
  ]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-sky-400 to-green-600">
      <Header currentView={currentView} onViewChange={setCurrentView} />
      
      {currentView === 'farm' ? (
        /* Farm View - Original Layout */
        <div className="pt-16 h-screen grid grid-cols-1 lg:grid-cols-4 gap-4 p-4">
          {/* Control Panel - Left sidebar on desktop, bottom on mobile */}
          <div className="lg:col-span-1 order-2 lg:order-1 space-y-4 max-h-screen overflow-y-auto">
            <WeatherControls
              digitalFog={digitalFog}
              setDigitalFog={setDigitalFog}
              blockchainRain={blockchainRain}
              setBlockchainRain={setBlockchainRain}
              solarFlares={solarFlares}
              setSolarFlares={setSolarFlares}
              wifiStorms={wifiStorms}
              setWifiStorms={setWifiStorms}
            />
            
            <FarmControls
              soilQuality={soilQuality}
              setSoilQuality={setSoilQuality}
              workerHappiness={workerHappiness}
              setWorkerHappiness={setWorkerHappiness}
              treeHealth={treeHealth}
              setTreeHealth={setTreeHealth}
              conveyorActive={conveyorActive}
              setConveyorActive={setConveyorActive}
              conveyorSpeed={conveyorSpeed}
              setConveyorSpeed={setConveyorSpeed}
              upgrades={upgrades}
            />
            
            <UpgradesStore
              money={money}
              setMoney={setMoney}
              upgrades={upgrades}
              setUpgrades={setUpgrades}
            />
          </div>

          {/* Farm View - Central area */}
          <div className="lg:col-span-3 order-1 lg:order-2 min-h-96 lg:min-h-full rounded-lg overflow-hidden shadow-lg">
            <FarmView
              digitalFog={digitalFog}
              blockchainRain={blockchainRain}
              solarFlares={solarFlares}
              wifiStorms={wifiStorms}
              treeHealth={treeHealth}
              upgrades={upgrades}
              conveyorActive={conveyorActive}
              conveyorSpeed={conveyorSpeed}
            />
          </div>
        </div>
      ) : (
        /* Laboratory View - Full Screen */
        <div className="pt-16 h-screen">
          <GuacamoleLaboratory
            money={money}
            setMoney={setMoney}
          />
        </div>
      )}
    </div>
  );
}
