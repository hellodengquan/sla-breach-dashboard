import { useState, useMemo } from 'react';

export default function AlertStormCluster({ rawAlerts, clusters: initialClusters }) {
  const [clusters, setClusters] = useState(initialClusters || []);
  const [activeTab, setActiveTab] = useState('clusters');
  const [selectedCluster, setSelectedCluster] = useState(null);
  const [showRawDetail, setShowRawDetail] = useState(false);

  const clusterSeverityColors = {
    critical: '#FF4757',
    high: '#FFA502',
    warning: '#2ED573',
    info: '#3742FA',
  };

  const clusterStatusLabels = {
    active: '活动中',
    acknowledged: '已确认',
    resolved: '已解决',
  };

  const clusterStatusColors = {
    active: '#FF4757',
    acknowledged: '#FFA502',
    resolved: '#2ED573',
  };

  const stats = useMemo(() => {
    const totalRaw = rawAlerts?.length || 0;
    const totalClusters = clusters.length;
    const activeClusters = clusters.filter(c => c.status === 'active').length;
    const totalDeduplicated = clusters.reduce((sum, c) => sum + Math.floor(c.count * c.deduplicatedRate), 0);
    const dedupRate = totalRaw > 0 ? ((totalDeduplicated / totalRaw) * 100).toFixed(1) : 0;

    return { totalRaw, totalClusters, activeClusters, totalDeduplicated, dedupRate };
  }, [rawAlerts, clusters]);

  const acknowledgeCluster = (clusterId) => {
    setClusters(prev => prev.map(c =>
      c.id === clusterId ? { ...c, status: 'acknowledged' } : c
    ));
  };

  const resolveCluster = (clusterId) => {
    setClusters(prev => prev.map(c =>
      c.id === clusterId ? { ...c, status: 'resolved' } : c
    ));
  };

  const getAlertsByClusterFingerprint = (fingerprint) => {
    return rawAlerts?.filter(a => a.fingerprint === fingerprint) || [];
  };

  return (
    <div className="chart-card storm-cluster-container">
      <div className="chart-header">
        <div>
          <h3 className="chart-title">🌪️ 告警风暴聚类与去重</h3>
          <span className="chart-subtitle">
            共 {stats.totalRaw} 条原始告警 · 聚合为 {stats.totalClusters} 个聚类 · 去重率 {stats.dedupRate}%
          </span>
        </div>
      </div>

      <div className="storm-stats-row">
        <div className="storm-stat-item">
          <span className="storm-stat-value" style={{ color: '#FF6B6B' }}>{stats.totalRaw}</span>
          <span className="storm-stat-label">原始告警数</span>
        </div>
        <div className="storm-stat-item">
          <span className="storm-stat-value" style={{ color: '#45B7D1' }}>{stats.totalClusters}</span>
          <span className="storm-stat-label">聚类数量</span>
        </div>
        <div className="storm-stat-item">
          <span className="storm-stat-value" style={{ color: '#FF4757' }}>{stats.activeClusters}</span>
          <span className="storm-stat-label">活动聚类</span>
        </div>
        <div className="storm-stat-item">
          <span className="storm-stat-value" style={{ color: '#2ED573' }}>{stats.dedupRate}%</span>
          <span className="storm-stat-label">去重压缩率</span>
        </div>
      </div>

      <div className="storm-tabs">
        <button
          className={`tab-btn ${activeTab === 'clusters' ? 'active' : ''}`}
          onClick={() => setActiveTab('clusters')}
        >
          📦 聚类视图
        </button>
        <button
          className={`tab-btn ${activeTab === 'raw' ? 'active' : ''}`}
          onClick={() => setActiveTab('raw')}
        >
          📋 原始告警
        </button>
      </div>

      {activeTab === 'clusters' ? (
        <div className="cluster-list">
          {clusters.map(cluster => (
            <div
              key={cluster.id}
              className={`cluster-card ${cluster.status}`}
              onClick={() => {
                setSelectedCluster(cluster);
                setShowRawDetail(true);
              }}
            >
              <div className="cluster-card-header">
                <div className="cluster-info">
                  <span
                    className="severity-badge"
                    style={{
                      backgroundColor: `${clusterSeverityColors[cluster.severity]}20`,
                      color: clusterSeverityColors[cluster.severity],
                    }}
                  >
                    {cluster.severity === 'critical' ? '严重' : cluster.severity === 'high' ? '高' : cluster.severity}
                  </span>
                  <strong className="cluster-rule-name">{cluster.ruleName}</strong>
                  <span
                    className="cluster-status-tag"
                    style={{
                      backgroundColor: `${clusterStatusColors[cluster.status]}20`,
                      color: clusterStatusColors[cluster.status],
                    }}
                  >
                    {clusterStatusLabels[cluster.status]}
                  </span>
                </div>
                <div className="cluster-count-badge">
                  × {cluster.count}
                </div>
              </div>

              <div className="cluster-card-body">
                <div className="cluster-meta-row">
                  <span>📍 {cluster.service}</span>
                  <span>🖥️ {cluster.affectedHosts.length} 台主机</span>
                  <span>📊 均值: {cluster.avgValue} / 峰值: {cluster.maxValue}</span>
                </div>
                <div className="cluster-time-range">
                  <span>⏱️ {cluster.firstTriggered}</span>
                  <span>→</span>
                  <span>{cluster.lastTriggered}</span>
                  <span style={{ color: cluster.deduplicatedRate > 0 ? '#2ED573' : '#747D8C' }}>
                    压缩 {(cluster.deduplicatedRate * 100).toFixed(0)}%
                  </span>
                </div>
                <div className="cluster-hosts">
                  {cluster.affectedHosts.slice(0, 5).map(host => (
                    <span key={host} className="host-tag">{host}</span>
                  ))}
                  {cluster.affectedHosts.length > 5 && (
                    <span className="host-tag more-tag">+{cluster.affectedHosts.length - 5}</span>
                  )}
                </div>
              </div>

              <div className="cluster-card-actions" onClick={(e) => e.stopPropagation()}>
                {cluster.status === 'active' && (
                  <button
                    className="btn btn-secondary btn-sm"
                    onClick={() => acknowledgeCluster(cluster.id)}
                  >
                    ✓ 确认
                  </button>
                )}
                {cluster.status === 'acknowledged' && (
                  <button
                    className="btn btn-primary btn-sm"
                    onClick={() => resolveCluster(cluster.id)}
                  >
                    ✅ 解决
                  </button>
                )}
                <button
                  className="btn btn-secondary btn-sm"
                  onClick={() => {
                    setSelectedCluster(cluster);
                    setShowRawDetail(true);
                  }}
                >
                  查看明细
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="raw-alerts-container">
          <div className="table-container">
            <table className="tickets-table">
              <thead>
                <tr>
                  <th>告警ID</th>
                  <th>规则名称</th>
                  <th>严重级别</th>
                  <th>服务</th>
                  <th>主机</th>
                  <th>数值</th>
                  <th>触发时间</th>
                  <th>指纹</th>
                </tr>
              </thead>
              <tbody>
                {rawAlerts?.map(alert => (
                  <tr key={alert.id}>
                    <td className="ticket-id">{alert.id}</td>
                    <td>{alert.ruleName}</td>
                    <td>
                      <span
                        className="severity-badge"
                        style={{
                          backgroundColor: `${clusterSeverityColors[alert.severity]}20`,
                          color: clusterSeverityColors[alert.severity],
                        }}
                      >
                        {alert.severity === 'critical' ? '严重' : alert.severity === 'high' ? '高' : alert.severity}
                      </span>
                    </td>
                    <td>{alert.service}</td>
                    <td>{alert.host}</td>
                    <td><strong>{alert.value}</strong></td>
                    <td>{alert.triggeredAt}</td>
                    <td><code className="fingerprint-code">{alert.fingerprint}</code></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {showRawDetail && selectedCluster && (
        <div className="modal-overlay" onClick={() => setShowRawDetail(false)}>
          <div className="modal-content large-modal" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3>聚类明细 - {selectedCluster.ruleName}</h3>
              <button className="modal-close" onClick={() => setShowRawDetail(false)}>×</button>
            </div>
            <div className="modal-body">
              <div className="cluster-detail-summary">
                <div><span className="label">服务:</span> <strong>{selectedCluster.service}</strong></div>
                <div><span className="label">告警数量:</span> <strong>{selectedCluster.count}</strong></div>
                <div><span className="label">影响主机:</span> <strong>{selectedCluster.affectedHosts.length} 台</strong></div>
                <div><span className="label">时间范围:</span> <strong>{selectedCluster.firstTriggered} ~ {selectedCluster.lastTriggered}</strong></div>
              </div>
              <h4 style={{ marginTop: 20 }}>关联原始告警</h4>
              <div className="table-container">
                <table className="tickets-table">
                  <thead>
                    <tr>
                      <th>告警ID</th>
                      <th>主机</th>
                      <th>数值</th>
                      <th>触发时间</th>
                    </tr>
                  </thead>
                  <tbody>
                    {getAlertsByClusterFingerprint(selectedCluster.fingerprint).map(alert => (
                      <tr key={alert.id}>
                        <td className="ticket-id">{alert.id}</td>
                        <td>{alert.host}</td>
                        <td><strong>{alert.value}</strong></td>
                        <td>{alert.triggeredAt}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
