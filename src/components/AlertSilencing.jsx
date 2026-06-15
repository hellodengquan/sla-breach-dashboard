import { useState } from 'react';

export default function AlertSilencing({ alertRules: initialRules, activeAlerts: initialAlerts }) {
  const [rules, setRules] = useState(initialRules);
  const [activeAlerts] = useState(initialAlerts);
  const [activeTab, setActiveTab] = useState('rules');
  const [showSilenceModal, setShowSilenceModal] = useState(false);
  const [selectedRule, setSelectedRule] = useState(null);
  const [silenceReason, setSilenceReason] = useState('');
  const [silenceDuration, setSilenceDuration] = useState('2h');

  const severityColors = {
    critical: '#FF4757',
    high: '#FFA502',
    warning: '#FFD93D',
    info: '#3742FA',
  };

  const severityLabels = {
    critical: '严重',
    high: '高',
    warning: '警告',
    info: '信息',
  };

  const handleSilence = (rule) => {
    setSelectedRule(rule);
    setShowSilenceModal(true);
    setSilenceReason('');
  };

  const confirmSilence = () => {
    if (!selectedRule || !silenceReason.trim()) return;

    const now = new Date();
    let until = new Date(now);
    
    switch (silenceDuration) {
      case '1h': until.setHours(until.getHours() + 1); break;
      case '2h': until.setHours(until.getHours() + 2); break;
      case '8h': until.setHours(until.getHours() + 8); break;
      case '24h': until.setHours(until.getHours() + 24); break;
      case '7d': until.setDate(until.getDate() + 7); break;
      default: until.setHours(until.getHours() + 2);
    }

    setRules(prev => prev.map(rule => 
      rule.id === selectedRule.id 
        ? {
            ...rule,
            silenced: true,
            silencedBy: 'current-user',
            silencedAt: now.toISOString(),
            silencedReason: silenceReason,
            silencedUntil: until.toISOString(),
          }
        : rule
    ));

    setShowSilenceModal(false);
    setSelectedRule(null);
  };

  const handleUnsilence = (ruleId) => {
    setRules(prev => prev.map(rule => 
      rule.id === ruleId 
        ? { ...rule, silenced: false, silencedBy: null, silencedAt: null, silencedReason: null, silencedUntil: null }
        : rule
    ));
  };

  const toggleRuleEnabled = (ruleId) => {
    setRules(prev => prev.map(rule => 
      rule.id === ruleId ? { ...rule, enabled: !rule.enabled } : rule
    ));
  };

  const stats = {
    total: rules.length,
    enabled: rules.filter(r => r.enabled).length,
    silenced: rules.filter(r => r.silenced).length,
    active: activeAlerts.length,
  };

  return (
    <div className="chart-card alert-silencing-container">
      <div className="chart-header">
        <h3 className="chart-title">🔔 告警管理与 Silencing</h3>
        <span className="chart-subtitle">{stats.active} 个活动告警 · {stats.silenced} 个已静默</span>
      </div>

      <div className="alert-stats-row">
        <div className="alert-stat-item">
          <span className="alert-stat-value">{stats.total}</span>
          <span className="alert-stat-label">告警规则总数</span>
        </div>
        <div className="alert-stat-item">
          <span className="alert-stat-value" style={{ color: '#2ED573' }}>{stats.enabled}</span>
          <span className="alert-stat-label">已启用</span>
        </div>
        <div className="alert-stat-item">
          <span className="alert-stat-value" style={{ color: '#FFA502' }}>{stats.silenced}</span>
          <span className="alert-stat-label">已静默</span>
        </div>
        <div className="alert-stat-item">
          <span className="alert-stat-value" style={{ color: '#FF4757' }}>{stats.active}</span>
          <span className="alert-stat-label">活动告警</span>
        </div>
      </div>

      <div className="alert-tabs">
        <button 
          className={`tab-btn ${activeTab === 'rules' ? 'active' : ''}`}
          onClick={() => setActiveTab('rules')}
        >
          📋 告警规则
        </button>
        <button 
          className={`tab-btn ${activeTab === 'active' ? 'active' : ''}`}
          onClick={() => setActiveTab('active')}
        >
          ⚡ 活动告警
        </button>
      </div>

      {activeTab === 'rules' && (
        <div className="alert-rules-list">
          {rules.map(rule => (
            <div key={rule.id} className={`alert-rule-item ${rule.silenced ? 'silenced' : ''} ${!rule.enabled ? 'disabled' : ''}`}>
              <div className="alert-rule-header">
                <div className="alert-rule-info">
                  <span 
                    className="severity-badge"
                    style={{ backgroundColor: `${severityColors[rule.severity]}20`, color: severityColors[rule.severity] }}
                  >
                    {severityLabels[rule.severity]}
                  </span>
                  <span className="alert-rule-name">{rule.name}</span>
                  {rule.silenced && <span className="silenced-badge">🔇 已静默</span>}
                  {!rule.enabled && <span className="disabled-badge">⏸️ 已停用</span>}
                </div>
                <div className="alert-rule-actions">
                  <button 
                    className="btn-icon"
                    onClick={() => toggleRuleEnabled(rule.id)}
                    title={rule.enabled ? '停用规则' : '启用规则'}
                  >
                    {rule.enabled ? '⏸️' : '▶️'}
                  </button>
                  {rule.silenced ? (
                    <button 
                      className="btn btn-secondary btn-sm"
                      onClick={() => handleUnsilence(rule.id)}
                    >
                      解除静默
                    </button>
                  ) : (
                    <button 
                      className="btn btn-warning btn-sm"
                      onClick={() => handleSilence(rule)}
                    >
                      静默告警
                    </button>
                  )}
                </div>
              </div>
              <div className="alert-rule-details">
                <span className="rule-metric">指标: {rule.metric}</span>
                <span className="rule-condition">条件: {rule.operator} {rule.threshold}</span>
                {rule.silenced && (
                  <span className="rule-silence-info">
                    静默原因: {rule.silencedReason} · 至 {new Date(rule.silencedUntil).toLocaleString('zh-CN')}
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      {activeTab === 'active' && (
        <div className="active-alerts-list">
          {activeAlerts.length === 0 ? (
            <div className="empty-state">
              <span className="empty-icon">✅</span>
              <p>暂无活动告警</p>
            </div>
          ) : (
            activeAlerts.map(alert => (
              <div key={alert.id} className={`active-alert-item severity-${alert.severity}`}>
                <div className="alert-header">
                  <div className="alert-title">
                    <span 
                      className="severity-dot"
                      style={{ backgroundColor: severityColors[alert.severity] }}
                    />
                    <strong>{alert.ruleName}</strong>
                  </div>
                  <span className="alert-time">{alert.triggeredAt}</span>
                </div>
                <div className="alert-body">
                  <span className="alert-service">服务: {alert.service}</span>
                  <span className="alert-value">当前值: {alert.value}</span>
                  {alert.acknowledged ? (
                    <span className="alert-acknowledged">✓ 已确认 ({alert.acknowledgedBy})</span>
                  ) : (
                    <button className="btn btn-primary btn-sm">确认告警</button>
                  )}
                </div>
              </div>
            ))
          )}
        </div>
      )}

      {showSilenceModal && (
        <div className="modal-overlay" onClick={() => setShowSilenceModal(false)}>
          <div className="modal-content silence-modal" onClick={e => e.stopPropagation()}>
            <h3>静默告警规则</h3>
            <p className="modal-subtitle">规则: <strong>{selectedRule?.name}</strong></p>
            
            <div className="form-group">
              <label>静默时长</label>
              <select 
                className="form-select"
                value={silenceDuration}
                onChange={(e) => setSilenceDuration(e.target.value)}
              >
                <option value="1h">1 小时</option>
                <option value="2h">2 小时</option>
                <option value="8h">8 小时</option>
                <option value="24h">24 小时</option>
                <option value="7d">7 天</option>
              </select>
            </div>

            <div className="form-group">
              <label>静默原因</label>
              <textarea
                className="form-textarea"
                value={silenceReason}
                onChange={(e) => setSilenceReason(e.target.value)}
                placeholder="请输入静默原因..."
                rows={3}
              />
            </div>

            <div className="modal-actions">
              <button 
                className="btn btn-secondary"
                onClick={() => setShowSilenceModal(false)}
              >
                取消
              </button>
              <button 
                className="btn btn-primary"
                onClick={confirmSilence}
                disabled={!silenceReason.trim()}
              >
                确认静默
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
