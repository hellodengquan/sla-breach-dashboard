import { useState } from 'react';

export default function ViewSharing({ initialShares, dashboardViews, teams, users }) {
  const [shares, setShares] = useState(initialShares || []);
  const [activeTab, setActiveTab] = useState('shares');
  const [selectedShare, setSelectedShare] = useState(null);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [copiedLink, setCopiedLink] = useState(null);

  const [newShare, setNewShare] = useState({
    viewId: '',
    sharedWith: [],
    accessLevel: 'view',
    expiresInDays: 30,
    signInRequired: true,
  });

  const accessLevelLabels = {
    view: '只读',
    edit: '可编辑',
  };

  const accessLevelColors = {
    view: '#3742FA',
    edit: '#FFA502',
  };

  const stats = {
    totalShares: shares.length,
    activeShares: shares.filter(s => s.enabled).length,
    totalSignIns: shares.reduce((sum, s) => sum + s.signIns.length, 0),
    uniqueUsers: new Set(shares.flatMap(s => s.signIns.map(si => si.userId))).size,
  };

  const copyToClipboard = (link) => {
    navigator.clipboard?.writeText(link);
    setCopiedLink(link);
    setTimeout(() => setCopiedLink(null), 2000);
  };

  const toggleShare = (shareId) => {
    setShares(prev => prev.map(s =>
      s.id === shareId ? { ...s, enabled: !s.enabled } : s
    ));
  };

  const deleteShare = (shareId) => {
    setShares(prev => prev.filter(s => s.id !== shareId));
  };

  const handleCreateShare = () => {
    if (!newShare.viewId || newShare.sharedWith.length === 0) return;

    const view = dashboardViews?.find(v => v.id === newShare.viewId);
    const now = new Date();
    const expires = new Date(now);
    expires.setDate(expires.getDate() + newShare.expiresInDays);

    const newId = `share-${Date.now()}`;
    setShares(prev => [...prev, {
      id: newId,
      viewId: newShare.viewId,
      viewName: view?.name || '未命名视图',
      sharedBy: 'current-user',
      sharedByName: '当前用户',
      sharedWith: newShare.sharedWith,
      sharedWithNames: newShare.sharedWith.map(id => teams?.find(t => t.id === id)?.name || id),
      createdAt: now.toISOString(),
      expiresAt: expires.toISOString(),
      accessLevel: newShare.accessLevel,
      link: `https://sla.example.com/dashboard/share/${Math.random().toString(36).slice(2, 10)}`,
      enabled: true,
      signInRequired: newShare.signInRequired,
      signIns: [],
    }]);

    setShowCreateModal(false);
    setNewShare({
      viewId: '',
      sharedWith: [],
      accessLevel: 'view',
      expiresInDays: 30,
      signInRequired: true,
    });
  };

  const toggleTeamSelection = (teamId) => {
    setNewShare(prev => ({
      ...prev,
      sharedWith: prev.sharedWith.includes(teamId)
        ? prev.sharedWith.filter(t => t !== teamId)
        : [...prev.sharedWith, teamId],
    }));
  };

  return (
    <div className="chart-card view-sharing-container">
      <div className="chart-header">
        <div>
          <h3 className="chart-title">🔗 视图共享与签到追踪</h3>
          <span className="chart-subtitle">
            {stats.activeShares} 个活跃共享 · {stats.totalSignIns} 次访问 · {stats.uniqueUsers} 位独立用户
          </span>
        </div>
        <button
          className="btn btn-primary"
          onClick={() => setShowCreateModal(true)}
        >
          + 创建共享
        </button>
      </div>

      <div className="sharing-stats-row">
        <div className="sharing-stat-item">
          <span className="sharing-stat-value" style={{ color: '#45B7D1' }}>{stats.totalShares}</span>
          <span className="sharing-stat-label">共享总数</span>
        </div>
        <div className="sharing-stat-item">
          <span className="sharing-stat-value" style={{ color: '#2ED573' }}>{stats.activeShares}</span>
          <span className="sharing-stat-label">活跃共享</span>
        </div>
        <div className="sharing-stat-item">
          <span className="sharing-stat-value" style={{ color: '#FFA502' }}>{stats.totalSignIns}</span>
          <span className="sharing-stat-label">总访问次数</span>
        </div>
        <div className="sharing-stat-item">
          <span className="sharing-stat-value" style={{ color: '#FF6B6B' }}>{stats.uniqueUsers}</span>
          <span className="sharing-stat-label">独立用户</span>
        </div>
      </div>

      <div className="sharing-tabs">
        <button
          className={`tab-btn ${activeTab === 'shares' ? 'active' : ''}`}
          onClick={() => setActiveTab('shares')}
        >
          📤 共享链接
        </button>
        <button
          className={`tab-btn ${activeTab === 'signins' ? 'active' : ''}`}
          onClick={() => {
            setActiveTab('signins');
            setSelectedShare(null);
          }}
        >
          📝 签到记录
        </button>
      </div>

      {activeTab === 'shares' ? (
        <div className="shares-list">
          {shares.map(share => (
            <div
              key={share.id}
              className={`share-card ${share.enabled ? '' : 'disabled'}`}
              onClick={() => {
                setSelectedShare(share);
                setActiveTab('signins');
              }}
            >
              <div className="share-card-header">
                <div className="share-info">
                  <strong className="share-view-name">
                    📊 {share.viewName}
                  </strong>
                  <span
                    className="share-access-tag"
                    style={{
                      backgroundColor: `${accessLevelColors[share.accessLevel]}20`,
                      color: accessLevelColors[share.accessLevel],
                    }}
                  >
                    {accessLevelLabels[share.accessLevel]}
                  </span>
                  <span className={`share-status-badge ${share.enabled ? 'enabled' : 'disabled'}`}>
                    {share.enabled ? '已启用' : '已停用'}
                  </span>
                </div>
                <div className="share-signin-count">
                  👥 {share.signIns.length} 次访问
                </div>
              </div>

              <div className="share-card-body">
                <div className="share-meta-row">
                  <span>创建者: {share.sharedByName}</span>
                  <span>创建时间: {share.createdAt}</span>
                </div>
                <div className="share-meta-row">
                  <span>
                    共享给: {share.sharedWithNames?.join(', ') || '未设置'}
                  </span>
                  <span>过期: {share.expiresAt}</span>
                </div>
                <div className="share-link-row">
                  <code className="share-link">{share.link}</code>
                  <button
                    className="btn btn-secondary btn-sm"
                    onClick={(e) => {
                      e.stopPropagation();
                      copyToClipboard(share.link);
                    }}
                  >
                    {copiedLink === share.link ? '✓ 已复制' : '📋 复制链接'}
                  </button>
                </div>
                {share.signInRequired && (
                  <div className="share-security-tag">
                    🔒 需要登录验证
                  </div>
                )}
              </div>

              <div className="share-card-actions" onClick={(e) => e.stopPropagation()}>
                <label className="toggle-switch">
                  <input
                    type="checkbox"
                    checked={share.enabled}
                    onChange={() => toggleShare(share.id)}
                  />
                  <span className="toggle-slider" />
                </label>
                <button
                  className="btn-icon"
                  onClick={() => deleteShare(share.id)}
                  title="删除共享"
                >
                  🗑️
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="signins-container">
          {selectedShare && (
            <div className="selected-share-info" style={{ marginBottom: 16 }}>
              <button
                className="btn btn-secondary btn-sm"
                onClick={() => setSelectedShare(null)}
                style={{ marginRight: 12 }}
              >
                ← 查看全部
              </button>
              <span>
                正在查看 <strong>{selectedShare.viewName}</strong> 的签到记录
                ({selectedShare.signIns.length} 条)
              </span>
            </div>
          )}
          <div className="table-container">
            <table className="tickets-table">
              <thead>
                <tr>
                  <th>用户</th>
                  <th>所属团队</th>
                  <th>访问视图</th>
                  <th>签到时间</th>
                  <th>设备/浏览器</th>
                </tr>
              </thead>
              <tbody>
                {(selectedShare
                  ? selectedShare.signIns.map(si => ({ ...si, viewName: selectedShare.viewName }))
                  : shares.flatMap(s =>
                      s.signIns.map(si => ({ ...si, viewName: s.viewName }))
                    )
                ).map((signIn, idx) => (
                  <tr key={`${signIn.userId}-${signIn.signedInAt}-${idx}`}>
                    <td>
                      <div className="signin-user-cell">
                        <span className="user-avatar-sm">
                          {users?.find(u => u.id === signIn.userId)?.avatar || '👤'}
                        </span>
                        <strong>{signIn.userName}</strong>
                      </div>
                    </td>
                    <td>{signIn.team}</td>
                    <td>📊 {signIn.viewName}</td>
                    <td>{signIn.signedInAt}</td>
                    <td><span className="device-tag">{signIn.device}</span></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {showCreateModal && (
        <div className="modal-overlay" onClick={() => setShowCreateModal(false)}>
          <div className="modal-content create-share-modal" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3>创建视图共享</h3>
              <button className="modal-close" onClick={() => setShowCreateModal(false)}>×</button>
            </div>
            <div className="modal-body">
              <div className="form-group">
                <label className="form-label">选择视图</label>
                <select
                  className="form-select"
                  value={newShare.viewId}
                  onChange={(e) => setNewShare(prev => ({ ...prev, viewId: e.target.value }))}
                >
                  <option value="">请选择要共享的视图</option>
                  {dashboardViews?.map(view => (
                    <option key={view.id} value={view.id}>{view.name}</option>
                  ))}
                </select>
              </div>

              <div className="form-group">
                <label className="form-label">共享给团队</label>
                <div className="team-checkboxes">
                  {teams?.map(team => (
                    <label
                      key={team.id}
                      className={`team-checkbox-item ${newShare.sharedWith.includes(team.id) ? 'checked' : ''}`}
                    >
                      <input
                        type="checkbox"
                        checked={newShare.sharedWith.includes(team.id)}
                        onChange={() => toggleTeamSelection(team.id)}
                      />
                      <span>👥 {team.name}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label className="form-label">访问权限</label>
                  <select
                    className="form-select"
                    value={newShare.accessLevel}
                    onChange={(e) => setNewShare(prev => ({ ...prev, accessLevel: e.target.value }))}
                  >
                    <option value="view">只读</option>
                    <option value="edit">可编辑</option>
                  </select>
                </div>
                <div className="form-group">
                  <label className="form-label">有效天数</label>
                  <select
                    className="form-select"
                    value={newShare.expiresInDays}
                    onChange={(e) => setNewShare(prev => ({ ...prev, expiresInDays: parseInt(e.target.value) }))}
                  >
                    <option value={7}>7 天</option>
                    <option value={30}>30 天</option>
                    <option value={90}>90 天</option>
                    <option value={365}>365 天</option>
                  </select>
                </div>
              </div>

              <div className="form-group">
                <label className="checkbox-label">
                  <input
                    type="checkbox"
                    checked={newShare.signInRequired}
                    onChange={(e) => setNewShare(prev => ({ ...prev, signInRequired: e.target.checked }))}
                  />
                  <span>🔒 需要登录验证才能访问</span>
                </label>
              </div>
            </div>
            <div className="modal-footer">
              <button className="btn btn-secondary" onClick={() => setShowCreateModal(false)}>
                取消
              </button>
              <button
                className="btn btn-primary"
                onClick={handleCreateShare}
                disabled={!newShare.viewId || newShare.sharedWith.length === 0}
              >
                创建共享链接
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
