/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useState, useCallback, useMemo } from 'react';
import { metricsBackends as initialBackends } from '../data/mockData';

const MetricsBackendContext = createContext(null);

export function MetricsBackendProvider({ children }) {
  const [backends] = useState(initialBackends);
  const [activeBackendId, setActiveBackendId] = useState('prometheus');
  const [isSyncing, setIsSyncing] = useState(false);

  const activeBackend = useMemo(() => 
    backends.find(b => b.id === activeBackendId) || backends[0],
    [backends, activeBackendId]
  );

  const switchBackend = useCallback((backendId) => {
    const backend = backends.find(b => b.id === backendId);
    if (backend && backend.status === 'active') {
      setIsSyncing(true);
      setTimeout(() => {
        setActiveBackendId(backendId);
        setIsSyncing(false);
      }, 800);
    }
  }, [backends]);

  const getBackendMetrics = useCallback((backendId) => {
    const backend = backends.find(b => b.id === backendId);
    if (!backend) return null;
    
    const multiplier = backendId === 'datadog' ? 1.05 : backendId === 'grafana-cloud' ? 0.95 : 1;
    
    return {
      latencyFactor: multiplier,
      errorRateFactor: multiplier,
      throughputFactor: 1 / multiplier,
    };
  }, [backends]);

  const testConnection = useCallback(async (backendId) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const backend = backends.find(b => b.id === backendId);
        resolve({
          success: backend?.status === 'active',
          latency: backend?.status === 'active' ? Math.floor(20 + Math.random() * 50) : null,
          message: backend?.status === 'active' ? '连接成功' : '后端不可用',
        });
      }, 1000);
    });
  }, [backends]);

  const value = {
    backends,
    activeBackend,
    activeBackendId,
    isSyncing,
    switchBackend,
    getBackendMetrics,
    testConnection,
  };

  return (
    <MetricsBackendContext.Provider value={value}>
      {children}
    </MetricsBackendContext.Provider>
  );
}

export function useMetricsBackend() {
  const context = useContext(MetricsBackendContext);
  if (!context) {
    throw new Error('useMetricsBackend must be used within a MetricsBackendProvider');
  }
  return context;
}
