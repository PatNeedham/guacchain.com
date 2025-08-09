'use client';

import { useState, useEffect } from 'react';

interface AvocadoBlock {
  id: string;
  position: number; // 0-100 percentage along the conveyor
  processed: boolean;
  nftCertified: boolean;
}

interface ConveyorSystemProps {
  isActive: boolean;
  speed: number; // 1-10 speed multiplier
  upgrades: any[];
}

export default function ConveyorSystem({ isActive, speed, upgrades }: ConveyorSystemProps) {
  const [avocados, setAvocados] = useState<AvocadoBlock[]>([]);
  const [miningProgress, setMiningProgress] = useState(0);
  const [totalProcessed, setTotalProcessed] = useState(0);
  const [showNftCert, setShowNftCert] = useState(false);

  const hasBlockchainValidators = upgrades.find(u => u.id === 'blockchain-validators' && u.purchased);

  // Add new avocados to the conveyor
  useEffect(() => {
    if (!isActive) return;

    const interval = setInterval(() => {
      const newAvocado: AvocadoBlock = {
        id: `avocado-${Date.now()}-${Math.random()}`,
        position: 0,
        processed: false,
        nftCertified: false,
      };
      
      setAvocados(prev => [...prev, newAvocado]);
    }, 3000 / speed); // Spawn rate affected by speed

    return () => clearInterval(interval);
  }, [isActive, speed]);

  // Move avocados along the conveyor
  useEffect(() => {
    if (!isActive) return;

    const interval = setInterval(() => {
      setAvocados(prev => 
        prev.map(avocado => ({
          ...avocado,
          position: avocado.position + (0.5 * speed), // Move along conveyor
        }))
        .filter(avocado => avocado.position <= 100) // Remove avocados that reached the end
      );

      // Update mining progress
      if (hasBlockchainValidators) {
        setMiningProgress(prev => (prev + 0.5) % 100);
      }
    }, 50); // Smooth 50ms updates

    return () => clearInterval(interval);
  }, [isActive, speed, hasBlockchainValidators]);

  // Process avocados when they reach the lab
  useEffect(() => {
    const processedAvocados = avocados.filter(a => a.position >= 95 && !a.processed);
    if (processedAvocados.length > 0) {
      setTotalProcessed(prev => prev + processedAvocados.length);
      
      // Show NFT certificate occasionally
      if (Math.random() > 0.7) {
        setShowNftCert(true);
        setTimeout(() => setShowNftCert(false), 3000);
      }

      // Mark as processed
      setAvocados(prev => 
        prev.map(a => 
          a.position >= 95 ? { ...a, processed: true, nftCertified: true } : a
        )
      );
    }
  }, [avocados]);

  if (!isActive) {
    return (
      <div className="absolute bottom-8 left-0 right-0 h-16 bg-gray-600/50 rounded-lg flex items-center justify-center">
        <span className="text-white text-sm opacity-70">🏭 Conveyor System Offline</span>
      </div>
    );
  }

  return (
    <div className="absolute bottom-8 left-0 right-0 h-20">
      {/* Entry Funnel */}
      <div className="absolute left-4 top-0 w-12 h-16 bg-gradient-to-b from-yellow-600 to-yellow-800 rounded-t-lg flex items-end justify-center">
        <span className="text-xl mb-1">📦</span>
      </div>

      {/* Conveyor Belt */}
      <div className="absolute left-16 right-16 top-6 h-8 bg-gradient-to-r from-gray-700 via-gray-600 to-gray-700 rounded-full shadow-inner overflow-hidden">
        {/* Belt movement animation */}
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-gray-500 to-transparent opacity-30 animate-pulse" />
        
        {/* Conveyor track marks */}
        <div className="absolute inset-0 flex items-center">
          {Array.from({ length: 20 }).map((_, i) => (
            <div 
              key={i} 
              className="flex-1 border-l border-gray-500 h-2 opacity-50"
              style={{ animation: `conveyor-marks 2s linear infinite ${i * 0.1}s` }}
            />
          ))}
        </div>

        {/* Avocados on the conveyor */}
        {avocados.map(avocado => (
          <div
            key={avocado.id}
            className="absolute top-1/2 transform -translate-y-1/2 transition-all duration-100 ease-linear"
            style={{ 
              left: `${avocado.position}%`,
              zIndex: 10,
            }}
          >
            {/* Avocado */}
            <div className="relative">
              <span className="text-lg drop-shadow-lg">🥑</span>
              
              {/* Chain link to next avocado */}
              {avocados.find(a => a.id !== avocado.id && Math.abs(a.position - avocado.position) < 8 && a.position > avocado.position) && (
                <div className="absolute left-6 top-1/2 w-4 h-1 bg-yellow-400 transform -translate-y-1/2">
                  <div className="absolute inset-0 bg-gradient-to-r from-yellow-300 to-yellow-500 animate-pulse" />
                  <span className="absolute -top-1 left-1 text-xs">⛓️</span>
                </div>
              )}

              {/* NFT certification badge */}
              {avocado.nftCertified && (
                <div className="absolute -top-2 -right-2 w-4 h-4 bg-purple-500 rounded-full flex items-center justify-center">
                  <span className="text-xs">✓</span>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Processing Lab */}
      <div className="absolute right-4 top-0 w-16 h-16 bg-gradient-to-b from-blue-600 to-blue-800 rounded-lg flex flex-col items-center justify-center">
        <span className="text-xl">🔬</span>
        <div className="text-xs text-white mt-1">LAB</div>
      </div>

      {/* Mining Progress (if blockchain validators upgrade is active) */}
      {hasBlockchainValidators && (
        <div className="absolute left-1/2 transform -translate-x-1/2 -top-8 bg-black/80 text-white p-2 rounded text-xs min-w-48">
          <div className="flex items-center justify-between mb-1">
            <span>⛏️ Mining GuacBlocks</span>
            <span>{Math.round(miningProgress)}%</span>
          </div>
          <div className="w-full bg-gray-700 rounded-full h-2">
            <div 
              className="bg-gradient-to-r from-green-400 to-yellow-400 h-2 rounded-full transition-all duration-100"
              style={{ width: `${miningProgress}%` }}
            />
          </div>
          <div className="text-xs opacity-75 mt-1">
            Hash Rate: {(speed * 123.45).toFixed(2)} GH/s
          </div>
        </div>
      )}

      {/* Production Stats */}
      <div className="absolute left-1/2 transform -translate-x-1/2 -top-16 bg-green-800/80 text-white p-1 rounded text-xs">
        <div>🏭 Processed: {totalProcessed} avocados</div>
      </div>

      {/* NFT Certificate Popup */}
      {showNftCert && (
        <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-purple-600 text-white p-3 rounded-lg shadow-lg animate-bounce z-20">
          <div className="text-center">
            <div className="text-lg">🎨 NFT Minted!</div>
            <div className="text-xs mt-1">Premium Organic Avocado #A{Math.floor(Math.random() * 9999)}</div>
            <div className="text-xs opacity-75">Blockchain Verified ✓</div>
          </div>
        </div>
      )}

      <style jsx>{`
        @keyframes conveyor-marks {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
      `}</style>
    </div>
  );
}