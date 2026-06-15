import { useState } from 'react';
import { useAuth } from '../context/AuthContext';

const permissionLabels = {
  view_all: '查看所有数据',
  view_dashboard: '查看仪表盘',
  view_tickets: '查看工单',
  update_tickets: '更新工单',
  edit_slo: '编辑SLO配置',
  manage_users: '管理用户',
  manage_teams: '管理团队',
  export_reports: '导出报告',
  view_dependencies: '查看依赖图',
  replay_history: '历史回放',
  view_teams: '查看团队',
  configure_alerts: '配置告警',
};

const roleColors = {
  admin: '#EF4444',
  manager: '#F59E0B',
  engineer: '#3B82F6',
  viewer: '#6B7280',
};

export default function TeamPermissions({ teams }) {
  const { currentUser, hasPermission, loginAsUser, users, teamPermissions } = useAuth();
  const [activeTab, setActiveTab] = useState('users');
  const [selectedTeam, setSelectedTeam] = useState(null);

  const getTeamById = (teamId) => teams.find(t => t.id === teamId);

  return (
    <div className="chart-card">
      <div className="chart-header">
        <h3 className="chart-title">团队与权限管理</h3>
        <div className="current-user-badge">
          <span className="user-avatar">{currentUser.avatar}</span>
          <div className="user-info">
            <span className="user-name">{currentUser.name}</span>
            <span 
              className="user-role"
              style={{ color: roleColors[currentUser.role] }}
            >
              {teamPermissions[currentUser.role]?.name || currentUser.role}
            </span>
          </div>
        </div>
      </div>

      <div className="permission-tabs">
        <button 
          className={`tab-btn ${activeTab === 'users' ? 'active' : ''}`}
          onClick={() => setActiveTab('users')}
        >
          👥 用户列表
        </button>
        <button 
          className={`tab-btn ${activeTab === 'teams' ? 'active' : ''}`}
          onClick={() => setActiveTab('teams')}
        >
          🏢 团队信息
        </button>
        <button 
          className={`tab-btn ${activeTab === 'roles' ? 'active' : ''}`}
          onClick={() => setActiveTab('roles')}
        >
          🔐 角色权限
        </button>
        {hasPermission('manage_users') && (
          <button 
            className={`tab-btn ${activeTab === 'switch' ? 'active' : ''}`}
            onClick={() => setActiveTab('switch')}
          >
            🔄 切换角色
          </button>
        )}
      </div>

      {activeTab === 'users' && (
        <div className="users-list">
          <table className="users-table">
            <thead>
              <tr>
                <th>用户</th>
                <th>邮箱</th>
                <th>角色</th>
                <th>所属团队</th>
                <th>权限预览</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => {
                const team = getTeamById(user.team);
                const perms = teamPermissions[user.role]?.permissions || [];
                return (
                  <tr key={user.id} className={user.id === currentUser.id ? 'current-user-row' : ''}>
                    <td>
                      <div className="user-cell">
                        <span className="user-avatar-small">{user.avatar}</span>
                        <span>{user.name}</span>
                        {user.id === currentUser.id && <span className="current-tag">当前</span>}
                      </div>
                    </td>
                    <td className="text-muted">{user.email}</td>
                    <td>
                      <span 
                        className="role-badge"
                        style={{ 
                          backgroundColor: `${roleColors[user.role]}20`,
                          color: roleColors[user.role]
                        }}
                      >
                        {teamPermissions[user.role]?.name || user.role}
                      </span>
                    </td>
                    <td>{team?.name || '-'}</td>
                    <td>
                      <div className="permission-chips">
                        {perms.slice(0, 3).map((p, i) => (
                          <span key={i} className="permission-chip">
                            {permissionLabels[p] || p}
                          </span>
                        ))}
                        {perms.length > 3 && (
                          <span className="permission-chip more">+{perms.length - 3}</span>
                        )}
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}

      {activeTab === 'teams' && (
        <div className="teams-grid">
          {teams.map((team) => (
            <div 
              key={team.id} 
              className={`team-card ${selectedTeam === team.id ? 'selected' : ''}`}
              onClick={() => setSelectedTeam(selectedTeam === team.id ? null : team.id)}
            >
              <div className="team-card-header">
                <h4 className="team-name">{team.name}</h4>
                <span className="team-members">{team.members} 人</span>
              </div>
              <p className="team-description">{team.description}</p>
              <div className="team-sla">
                <span className="sla-label">SLA 目标</span>
                <span className="sla-value">{team.slaTarget}%</span>
              </div>
              {selectedTeam === team.id && (
                <div className="team-members-list">
                  <h5>团队成员:</h5>
                  <div className="member-avatars">
                    {users
                      .filter(u => u.team === team.id)
                      .map(u => (
                        <div key={u.id} className="member-avatar" title={u.name}>
                          {u.avatar}
                        </div>
                      ))
                    }
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {activeTab === 'roles' && (
        <div className="roles-matrix">
          <table className="permissions-table">
            <thead>
              <tr>
                <th>权限</th>
                {Object.entries(teamPermissions).map(([key, role]) => (
                  <th key={key} style={{ color: roleColors[key] }}>
                    {role.name}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {Object.entries(permissionLabels).map(([permKey, permLabel]) => (
                <tr key={permKey}>
                  <td className="permission-name">{permLabel}</td>
                  {Object.entries(teamPermissions).map(([roleKey, role]) => (
                    <td key={roleKey} className="permission-cell">
                      {role.permissions.includes(permKey) || role.permissions.includes('view_all') ? (
                        <span className="check-icon" style={{ color: '#10B981' }}>✓</span>
                      ) : (
                        <span className="cross-icon" style={{ color: '#D1D5DB' }}>✗</span>
                      )}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {activeTab === 'switch' && hasPermission('manage_users') && (
        <div className="role-switch-panel">
          <h4 className="section-title">切换用户角色（用于测试权限）</h4>
          <div className="role-switch-grid">
            {users.map((user) => (
              <button
                key={user.id}
                className={`user-switch-btn ${user.id === currentUser.id ? 'active' : ''}`}
                onClick={() => loginAsUser(user.id)}
              >
                <span className="user-avatar-large">{user.avatar}</span>
                <div className="user-switch-info">
                  <span className="user-switch-name">{user.name}</span>
                  <span 
                    className="user-switch-role"
                    style={{ color: roleColors[user.role] }}
                  >
                    {teamPermissions[user.role]?.name || user.role}
                  </span>
                </div>
                {user.id === currentUser.id && (
                  <span className="active-indicator">✓</span>
                )}
              </button>
            ))}
          </div>
          <div className="permission-notice">
            <p>💡 提示：切换不同用户可以体验不同的权限控制效果。</p>
            <p className="text-muted small">
              管理员可以看到所有功能，经理可以导出报告和查看历史，
              工程师只能查看仪表盘和工单，查看者只能查看基本信息。
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
