import { useState } from 'react';

export default function SLOSubscription({ subscriptions: initialSubscriptions }) {
  const [subscriptions, setSubscriptions] = useState(initialSubscriptions);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [newSub, setNewSub] = useState({
    name: '',
    type: 'daily',
    channels: ['email'],
    recipients: [''],
    time: '09:00',
    reportType: 'summary',
    enabled: true,
  });

  const typeLabels = {
    daily: '日报',
    weekly: '周报',
    monthly: '月报',
    realtime: '实时告警',
    budget_alert: '预算告警',
  };

  const typeColors = {
    daily: '#45B7D1',
    weekly: '#96CEB4',
    monthly: '#DDA0DD',
    realtime: '#FF6B6B',
    budget_alert: '#FFA502',
  };

  const reportTypeLabels = {
    summary: '摘要报告',
    full: '完整报告',
    alert: '告警报告',
  };

  const channelIcons = {
    email: '📧',
    webhook: '🔗',
    sms: '📱',
  };

  const toggleSubscription = (subId) => {
    setSubscriptions(prev => prev.map(sub => 
      sub.id === subId ? { ...sub, enabled: !sub.enabled } : sub
    ));
  };

  const deleteSubscription = (subId) => {
    if (confirm('确定要删除这个订阅吗？')) {
      setSubscriptions(prev => prev.filter(sub => sub.id !== subId));
    }
  };

  const handleCreateSubmit = () => {
    if (!newSub.name.trim() || !newSub.recipients[0]?.trim()) return;
    
    const newId = `sub-${Date.now()}`;
    setSubscriptions(prev => [...prev, { ...newSub, id: newId, createdAt: new Date().toISOString() }]);
    setShowCreateModal(false);
    setNewSub({
      name: '',
      type: 'daily',
      channels: ['email'],
      recipients: [''],
      time: '09:00',
      reportType: 'summary',
      enabled: true,
    });
  };

  const toggleChannel = (channel) => {
    setNewSub(prev => ({
      ...prev,
      channels: prev.channels.includes(channel)
        ? prev.channels.filter(c => c !== channel)
        : [...prev.channels, channel],
    }));
  };

  const updateRecipient = (index, value) => {
    setNewSub(prev => {
      const newRecipients = [...prev.recipients];
      newRecipients[index] = value;
      return { ...prev, recipients: newRecipients };
    });
  };

  const addRecipient = () => {
    setNewSub(prev => ({ ...prev, recipients: [...prev.recipients, ''] }));
  };

  const removeRecipient = (index) => {
    setNewSub(prev => ({
      ...prev,
      recipients: prev.recipients.filter((_, i) => i !== index),
    }));
  };

  const stats = {
    total: subscriptions.length,
    enabled: subscriptions.filter(s => s.enabled).length,
    email: subscriptions.filter(s => s.channels.includes('email')).length,
    webhook: subscriptions.filter(s => s.channels.includes('webhook')).length,
  };

  return (
    <div className="chart-card subscription-container">
      <div className="chart-header">
        <h3 className="chart-title">📩 SLO 报表订阅推送</h3>
        <button 
          className="btn btn-primary btn-sm"
          onClick={() => setShowCreateModal(true)}
        >
          + 新建订阅
        </button>
      </div>

      <div className="subscription-stats">
        <div className="sub-stat-item">
          <span className="sub-stat-value">{stats.total}</span>
          <span className="sub-stat-label">订阅总数</span>
        </div>
        <div className="sub-stat-item">
          <span className="sub-stat-value" style={{ color: '#2ED573' }}>{stats.enabled}</span>
          <span className="sub-stat-label">已启用</span>
        </div>
        <div className="sub-stat-item">
          <span className="sub-stat-value">{stats.email}</span>
          <span className="sub-stat-label">📧 邮件推送</span>
        </div>
        <div className="sub-stat-item">
          <span className="sub-stat-value">{stats.webhook}</span>
          <span className="sub-stat-label">🔗 Webhook</span>
        </div>
      </div>

      <div className="subscription-list">
        {subscriptions.map(sub => (
          <div key={sub.id} className={`subscription-item ${!sub.enabled ? 'disabled' : ''}`}>
            <div className="subscription-header">
              <div className="subscription-info">
                <span 
                  className="sub-type-badge"
                  style={{ backgroundColor: `${typeColors[sub.type]}20`, color: typeColors[sub.type] }}
                >
                  {typeLabels[sub.type]}
                </span>
                <strong className="sub-name">{sub.name}</strong>
                <span className="sub-report-type">{reportTypeLabels[sub.reportType]}</span>
              </div>
              <div className="subscription-actions">
                <label className="toggle-switch">
                  <input
                    type="checkbox"
                    checked={sub.enabled}
                    onChange={() => toggleSubscription(sub.id)}
                  />
                  <span className="toggle-slider" />
                </label>
                <button 
                  className="btn-icon"
                  onClick={() => deleteSubscription(sub.id)}
                  title="删除订阅"
                >
                  🗑️
                </button>
              </div>
            </div>
            <div className="subscription-details">
              <div className="sub-channels">
                {sub.channels.map(ch => (
                  <span key={ch} className="channel-tag">
                    {channelIcons[ch]} {ch === 'email' ? '邮件' : ch === 'webhook' ? 'Webhook' : ch}
                  </span>
                ))}
              </div>
              <div className="sub-recipients">
                <span className="sub-meta">
                  收件人: {sub.recipients.slice(0, 2).join(', ')}
                  {sub.recipients.length > 2 && ` 等${sub.recipients.length}人`}
                </span>
              </div>
              {sub.lastSent && (
                <span className="sub-last-sent">上次发送: {sub.lastSent}</span>
              )}
              {sub.time && (
                <span className="sub-time">
                  {sub.type === 'daily' && `每日 ${sub.time}`}
                  {sub.type === 'weekly' && `每周 ${sub.time}`}
                  {sub.type === 'monthly' && `每月 ${sub.time}`}
                </span>
              )}
            </div>
          </div>
        ))}
      </div>

      {showCreateModal && (
        <div className="modal-overlay" onClick={() => setShowCreateModal(false)}>
          <div className="modal-content create-sub-modal" onClick={e => e.stopPropagation()}>
            <h3>新建订阅</h3>
            
            <div className="form-group">
              <label>订阅名称</label>
              <input
                type="text"
                className="form-input"
                value={newSub.name}
                onChange={(e) => setNewSub(prev => ({ ...prev, name: e.target.value }))}
                placeholder="输入订阅名称"
              />
            </div>

            <div className="form-group">
              <label>订阅类型</label>
              <select
                className="form-select"
                value={newSub.type}
                onChange={(e) => setNewSub(prev => ({ ...prev, type: e.target.value }))}
              >
                <option value="daily">日报</option>
                <option value="weekly">周报</option>
                <option value="monthly">月报</option>
                <option value="realtime">实时告警</option>
                <option value="budget_alert">预算告警</option>
              </select>
            </div>

            <div className="form-group">
              <label>报告类型</label>
              <select
                className="form-select"
                value={newSub.reportType}
                onChange={(e) => setNewSub(prev => ({ ...prev, reportType: e.target.value }))}
              >
                <option value="summary">摘要报告</option>
                <option value="full">完整报告</option>
                <option value="alert">告警报告</option>
              </select>
            </div>

            <div className="form-group">
              <label>推送渠道</label>
              <div className="channel-options">
                {['email', 'webhook', 'sms'].map(ch => (
                  <label key={ch} className={`channel-option ${newSub.channels.includes(ch) ? 'selected' : ''}`}>
                    <input
                      type="checkbox"
                      checked={newSub.channels.includes(ch)}
                      onChange={() => toggleChannel(ch)}
                    />
                    <span>{channelIcons[ch]} {ch === 'email' ? '邮件' : ch === 'webhook' ? 'Webhook' : '短信'}</span>
                  </label>
                ))}
              </div>
            </div>

            {(newSub.type === 'daily' || newSub.type === 'weekly' || newSub.type === 'monthly') && (
              <div className="form-group">
              <label>发送时间</label>
              <input
                type="time"
                className="form-input"
                value={newSub.time}
                onChange={(e) => setNewSub(prev => ({ ...prev, time: e.target.value }))}
              />
            </div>
            )}

            <div className="form-group">
              <label>收件人</label>
              {newSub.recipients.map((recipient, index) => (
                <div key={index} className="recipient-input-row">
                  <input
                    type="email"
                    className="form-input"
                    value={recipient}
                    onChange={(e) => updateRecipient(index, e.target.value)}
                    placeholder="email@example.com"
                  />
                  {newSub.recipients.length > 1 && (
                    <button 
                      className="btn-icon"
                      onClick={() => removeRecipient(index)}
                    >
                      ✕
                    </button>
                  )}
                </div>
              ))}
              <button 
                className="btn btn-secondary btn-sm add-recipient-btn"
                onClick={addRecipient}
              >
                + 添加收件人
              </button>
            </div>

            <div className="modal-actions">
              <button 
                className="btn btn-secondary"
                onClick={() => setShowCreateModal(false)}
              >
                取消
              </button>
              <button 
                className="btn btn-primary"
                onClick={handleCreateSubmit}
                disabled={!newSub.name.trim() || !newSub.recipients[0]?.trim()}
              >
                创建订阅
              </button>
            </div>
          </div>
          </div>
      )}
    </div>
  );
}
