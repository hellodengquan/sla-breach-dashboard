import { useState } from 'react';
import { useMetricsBackend } from '../context/MetricsBackendContext';

export default function MetricsBackendManager() {
  const { backends, activeBackend, activeBackendId, isSyncing, switchBackend, testConnection } = useMetricsBackend();
  const [testingBackend, setTestingBackend] = useState(null);
  const [testResult, setTestResult] = useState(null);

  const backendTypeIcons = {
    prometheus: '📊',
    datadog: '🐶',
    grafana: '📈',
    influxdb: '⏱️',
  };

  const handleTestConnection = async (backendId) => {
    setTestingBackend(backendId);
    setTestResult(null);
    const result = await testConnection(backendId);
    setTestResult({ backendId, ...result });
    setTestingBackend(null);
    
    setTimeout(() => setTestResult(null), 3000);
  };

  const handleSwitch = (backendId) => {
    const backend = backends.find(b => b.id === backendId);
    if (backend?.status === 'active') {
      switchBackend(backendId);
    }
  };

  return (
    <div className="chart-card backend-manager-container">
      <div className="chart-header">
        <h3 className="chart-title">🔌 多 Metrics Backend 适配</h3>
        <span className="chart-subtitle">
          当前: <strong style={{ color: activeBackend.status === 'active' ? '#2ED573' : '#FF6B6B' }}>
            {activeBackend.name}
          </strong>
          {isSyncing && <span className="sync-indicator"> 同步中...</span>}
        </span>
      </div>

      <div className="backend-stats">
        <div className="backend-stat-item">
          <span className="backend-stat-value">{backends.length}</span>
          <span className="backend-stat-label">已配置后端</span>
        </div>
        <div className="backend-stat-item">
          <span className="backend-stat-value" style={{ color: '#2ED573' }}>
            {backends.filter(b => b.status === 'active').length}
          </span>
          <span className="backend-stat-label">活跃后端</span>
        </div>
        <div className="backend-stat-item">
          <span className="backend-stat-value">{activeBackend.name}</span>
          <span className="backend-stat-label">当前使用</span>
        </div>
      </div>

      <div className="backend-list">
        {backends.map(backend => (
          <div 
            key={backend.id} 
            className={`backend-card ${backend.id === activeBackendId ? 'active' : ''} ${backend.status !== 'active' ? 'inactive' : ''}`}
          >
            <div className="backend-card-header">
              <div className="backend-info">
                <span className="backend-icon">{backendTypeIcons[backend.type] || '📊'}</span>
                <div>
                  <h4 className="backend-name">{backend.name}</h4>
                  <span className={`backend-status status-${backend.status}`}>
                    {backend.status === 'active' ? '● 活跃' : '○ 未启用'}
                  </span>
                </div>
              </div>
              {backend.id === activeBackendId && (
                <span className="current-badge">当前</span>
              )}
            </div>

            <div className="backend-card-body">
              <p className="backend-desc">{backend.description}</p>
              <div className="backend-meta">
                <span className="backend-url">📍 {backend.url}</span>
                {backend.lastSync && (
                  <span className="backend-sync">同步: {backend.lastSync}</span>
                )}
              </div>
            </div>

            <div className="backend-card-actions">
              <button 
                className="btn btn-secondary btn-sm"
                onClick={() => handleTestConnection(backend.id)}
                disabled={testingBackend === backend.id || backend.status !== 'active'}
              >
                {testingBackend === backend.id ? '测试中...' : '测试连接'}
              </button>
              {backend.id !== activeBackendId && (
                <button 
                  className="btn btn-primary btn-sm"
                  onClick={() => handleSwitch(backend.id)}
                  disabled={backend.status !== 'active' || isSyncing}
                >
                  {isSyncing && testingBackend === backend.id ? '切换中...' : '切换'}
                </button>
              )}
            </div>

            {testResult && testResult.backendId === backend.id && (
              <div className={`test-result ${testResult.success ? 'success' : 'error'}`}>
                {testResult.success ? (
                  <span>✓ {testResult.message} · {testResult.latency}ms</span>
                ) : (
                  <span>✗ {testResult.message}</span>
                )}
              </div>
            )}
          </div>
        ))}
      </div>

      <div className="backend-integration-info">
        <h4 className="info-title">💡 适配说明</h4>
        <ul className="info-list">
          <li><strong>统一查询接口:</strong> 通过统一的 metrics API 抽象层对接不同后端</li>
          <li><strong>自动故障转移:</strong> 主后端不可用时自动切换到备用后端</li>
          <li><strong>数据聚合:</strong> 支持从多个后端聚合指标数据</li>
          <li><strong>缓存策略:</strong> 智能缓存减少后端查询压力</li>
        </ul>
      </div>
    </div>
  );
}
