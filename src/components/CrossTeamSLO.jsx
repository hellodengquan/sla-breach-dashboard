import { useState, useMemo } from 'react';
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend,
  ResponsiveContainer, BarChart, Bar, Cell,
} from 'recharts';

const TEAM_COLORS = ['#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4', '#FFEAA7', '#DDA0DD', '#FF7F50'];

export default function CrossTeamSLO({ crossTeamData }) {
  const { summary, teams: teamSLOs, timeline } = crossTeamData || { summary: {}, teams: [], timeline: [] };
  const [selectedTeam, setSelectedTeam] = useState(null);
  const [viewMode, setViewMode] = useState('ranking');

  const teamStatusLabels = {
    compliant: { text: '达标', color: '#2ED573' },
    at_risk: { text: '风险中', color: '#FFA502' },
    breeching: { text: '违约', color: '#FF4757' },
  };

  const trendIcons = {
    up: '📈',
    down: '📉',
    stable: '➡️',
  };

  const sortedTeams = useMemo(() => {
    return [...teamSLOs].sort((a, b) => a.rank - b.rank);
  }, [teamSLOs]);

  const rankingChartData = useMemo(() => {
    return sortedTeams.map((team, idx) => ({
      name: team.name,
      目标: team.target,
      实际: team.actual,
      差值: +(team.actual - team.target).toFixed(2),
      fill: TEAM_COLORS[idx % TEAM_COLORS.length],
    }));
  }, [sortedTeams]);

  const errorBudgetChartData = useMemo(() => {
    return sortedTeams.map((team, idx) => ({
      name: team.name,
      已消耗: team.errorBudget.burned,
      剩余: team.errorBudget.remaining,
      填充色: TEAM_COLORS[idx % TEAM_COLORS.length],
    }));
  }, [sortedTeams]);

  const getRankBadge = (rank) => {
    if (rank === 1) return '🥇';
    if (rank === 2) return '🥈';
    if (rank === 3) return '🥉';
    return `#${rank}`;
  };

  return (
    <div className="chart-card cross-team-slo-container">
      <div className="chart-header">
        <div>
          <h3 className="chart-title">🏢 跨团队 SLO 报告聚合</h3>
          <span className="chart-subtitle">
            报告周期: {summary.reportPeriod} · 生成于 {summary.generatedAt}
          </span>
        </div>
        <div className="cross-team-tabs">
          <button
            className={`tab-btn ${viewMode === 'ranking' ? 'active' : ''}`}
            onClick={() => setViewMode('ranking')}
          >
            🏆 排名视图
          </button>
          <button
            className={`tab-btn ${viewMode === 'trend' ? 'active' : ''}`}
            onClick={() => setViewMode('trend')}
          >
            📊 趋势对比
          </button>
          <button
            className={`tab-btn ${viewMode === 'detail' ? 'active' : ''}`}
            onClick={() => setViewMode('detail')}
          >
            📋 团队明细
          </button>
        </div>
      </div>

      <div className="cross-team-summary-row">
        <div className="cross-team-summary-item">
          <span className="cross-summary-value" style={{ color: '#45B7D1' }}>{summary.totalTeams}</span>
          <span className="cross-summary-label">参评团队</span>
        </div>
        <div className="cross-team-summary-item">
          <span className="cross-summary-value" style={{ color: '#2ED573' }}>{summary.avgCompliance}%</span>
          <span className="cross-summary-label">综合达标率</span>
        </div>
        <div className="cross-team-summary-item">
          <span className="cross-summary-value" style={{ color: '#2ED573' }}>{summary.compliantTeams}</span>
          <span className="cross-summary-label">达标团队</span>
        </div>
        <div className="cross-team-summary-item">
          <span className="cross-summary-value" style={{ color: '#FFA502' }}>{summary.atRiskTeams}</span>
          <span className="cross-summary-label">风险团队</span>
        </div>
        <div className="cross-team-summary-item">
          <span className="cross-summary-value" style={{ color: '#FF4757' }}>{summary.breechingTeams}</span>
          <span className="cross-summary-label">违约团队</span>
        </div>
      </div>

      {viewMode === 'ranking' && (
        <>
          <div className="charts-section" style={{ marginTop: 20 }}>
            <div className="chart-wrapper trend-wrapper" style={{ flex: 1.2 }}>
              <div className="chart-header" style={{ marginTop: 0, paddingTop: 0 }}>
                <h4 className="chart-title" style={{ fontSize: 16 }}>SLA 达标率排名对比</h4>
              </div>
              <ResponsiveContainer width="100%" height={320}>
                <BarChart data={rankingChartData} layout="vertical" margin={{ top: 10, right: 30, left: 110, bottom: 10 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                  <XAxis type="number" domain={[90, 100]} tickFormatter={(v) => `${v}%`} />
                  <YAxis type="category" dataKey="name" width={100} />
                  <Tooltip
                    formatter={(value, name) => {
                      if (name === '差值') return [`${value > 0 ? '+' : ''}${value}%`, name];
                      return [`${value}%`, name];
                    }}
                  />
                  <Legend />
                  <Bar dataKey="目标" fill="#747D8C33" barSize={18} radius={[0, 4, 4, 0]} />
                  <Bar dataKey="实际" barSize={18} radius={[0, 4, 4, 0]}>
                    {rankingChartData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={TEAM_COLORS[index % TEAM_COLORS.length]} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>

            <div className="chart-wrapper group-wrapper" style={{ flex: 1 }}>
              <div className="chart-header" style={{ marginTop: 0, paddingTop: 0 }}>
                <h4 className="chart-title" style={{ fontSize: 16 }}>错误预算消耗情况</h4>
              </div>
              <ResponsiveContainer width="100%" height={320}>
                <BarChart data={errorBudgetChartData} margin={{ top: 10, right: 10, left: 10, bottom: 10 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                  <XAxis dataKey="name" tick={{ fontSize: 11 }} />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="已消耗" stackId="a" fill="#FF6B6B" radius={[4, 4, 0, 0]} />
                  <Bar dataKey="剩余" stackId="a" fill="#2ED573" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="ranking-list" style={{ marginTop: 20 }}>
            <h4 style={{ marginBottom: 12, color: '#2F3542' }}>🏆 SLO 综合排行榜</h4>
            <div className="ranking-items">
              {sortedTeams.map((team, idx) => (
                <div
                  key={team.id}
                  className={`ranking-item ${selectedTeam?.id === team.id ? 'selected' : ''}`}
                  onClick={() => {
                    setSelectedTeam(team);
                    setViewMode('detail');
                  }}
                >
                  <div className="ranking-badge">{getRankBadge(team.rank)}</div>
                  <div className="ranking-team-info">
                    <div className="ranking-team-header">
                      <strong className="ranking-team-name" style={{ color: TEAM_COLORS[idx % TEAM_COLORS.length] }}>
                        {team.name}
                      </strong>
                      <span
                        className="ranking-status-tag"
                        style={{
                          backgroundColor: `${teamStatusLabels[team.status].color}20`,
                          color: teamStatusLabels[team.status].color,
                        }}
                      >
                        {teamStatusLabels[team.status].text}
                      </span>
                      <span className="ranking-trend" title="环比变化">
                        {trendIcons[team.trend]} {team.changeFromLastPeriod > 0 ? '+' : ''}{team.changeFromLastPeriod}%
                      </span>
                    </div>
                    <div className="ranking-team-meta">
                      <span>目标: {team.target}% | 实际: <strong>{team.actual}%</strong></span>
                      <span>👥 {team.members} 人</span>
                      <span>🎫 {team.tickets.total} 工单</span>
                      <span>预算消耗: {(team.errorBudget.burnRate * 100).toFixed(0)}%</span>
                    </div>
                  </div>
                  <div className="ranking-progress">
                    <div className="progress-bar-container" style={{ width: 120 }}>
                      <div
                        className="progress-bar-fill"
                        style={{
                          width: `${Math.min((team.actual / 100) * 100, 100)}%`,
                          backgroundColor: TEAM_COLORS[idx % TEAM_COLORS.length],
                        }}
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </>
      )}

      {viewMode === 'trend' && (
        <div style={{ marginTop: 20 }}>
          <h4 style={{ marginBottom: 12, color: '#2F3542' }}>📈 各团队 SLA 达标率趋势对比</h4>
          <ResponsiveContainer width="100%" height={400}>
            <LineChart data={timeline} margin={{ top: 10, right: 30, left: 10, bottom: 10 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="date" />
              <YAxis domain={[95, 100]} tickFormatter={(v) => `${v}%`} />
              <Tooltip formatter={(value) => [`${value}%`]} />
              <Legend />
              {sortedTeams.map((team, idx) => (
                <Line
                  key={team.id}
                  type="monotone"
                  dataKey={team.name}
                  stroke={TEAM_COLORS[idx % TEAM_COLORS.length]}
                  strokeWidth={2.5}
                  dot={{ r: 4 }}
                  activeDot={{ r: 6 }}
                />
              ))}
            </LineChart>
          </ResponsiveContainer>
        </div>
      )}

      {viewMode === 'detail' && (
        <div style={{ marginTop: 20 }}>
          {selectedTeam && (
            <div className="team-detail-header">
              <button
                className="btn btn-secondary btn-sm"
                onClick={() => setSelectedTeam(null)}
                style={{ marginRight: 12 }}
              >
                ← 返回全部
              </button>
              <span>
                正在查看 <strong>{selectedTeam.name}</strong> 的详细 SLO 数据
              </span>
            </div>
          )}

          <div className="team-detail-grid">
            {(selectedTeam ? [selectedTeam] : sortedTeams).map((team) => {
              const teamIdx = sortedTeams.findIndex(t => t.id === team.id);
              const burnPercent = (team.errorBudget.burnRate * 100).toFixed(1);
              const burnStatus = team.errorBudget.burnRate > 0.9
                ? '#FF4757'
                : team.errorBudget.burnRate > 0.7
                  ? '#FFA502'
                  : '#2ED573';

              return (
                <div
                  key={team.id}
                  className="team-detail-card"
                  style={{ borderTop: `4px solid ${TEAM_COLORS[teamIdx % TEAM_COLORS.length]}` }}
                >
                  <div className="team-detail-header-row">
                    <div>
                      <h4 style={{ margin: 0, color: TEAM_COLORS[teamIdx % TEAM_COLORS.length] }}>
                        {getRankBadge(team.rank)} {team.name}
                      </h4>
                      <div style={{ marginTop: 6 }}>
                        <span
                          style={{
                            backgroundColor: `${teamStatusLabels[team.status].color}20`,
                            color: teamStatusLabels[team.status].color,
                            padding: '2px 10px',
                            borderRadius: 12,
                            fontSize: 12,
                            marginRight: 8,
                          }}
                        >
                          {teamStatusLabels[team.status].text}
                        </span>
                        <span style={{ color: '#747D8C', fontSize: 12 }}>
                          {trendIcons[team.trend]} 环比 {team.changeFromLastPeriod > 0 ? '+' : ''}{team.changeFromLastPeriod}%
                        </span>
                      </div>
                    </div>
                    <div className="team-detail-big-number">
                      {team.actual}%
                      <div style={{ fontSize: 12, color: '#747D8C', fontWeight: 400, marginTop: 2 }}>
                        目标 {team.target}%
                      </div>
                    </div>
                  </div>

                  <div className="team-detail-metrics-grid">
                    <div className="team-metric-item">
                      <div className="team-metric-label">🎫 工单处理</div>
                      <div className="team-metric-value">
                        {team.tickets.breached} <span className="team-metric-sub">/ {team.tickets.total}</span>
                      </div>
                      <div className="team-metric-hint" style={{ color: '#FFA502' }}>
                        违约率 {team.tickets.breachRate}%
                      </div>
                    </div>

                    <div className="team-metric-item">
                      <div className="team-metric-label">⏱️ 响应时间</div>
                      <div className="team-metric-value">
                        {team.responseTime.avg}ms <span className="team-metric-sub">/ P95 {team.responseTime.p95}ms</span>
                      </div>
                      <div className="team-metric-hint" style={{ color: team.responseTime.p95 < team.responseTime.target ? '#2ED573' : '#FF4757' }}>
                        目标 ≤ {team.responseTime.target}ms
                      </div>
                    </div>

                    <div className="team-metric-item" style={{ gridColumn: 'span 2' }}>
                      <div className="team-metric-label">🔥 错误预算</div>
                      <div className="budget-bar-container">
                        <div className="budget-bar-burned" style={{ width: `${burnPercent}%`, backgroundColor: burnStatus }} />
                      </div>
                      <div className="budget-meta-row">
                        <span style={{ color: '#FF6B6B' }}>消耗: {team.errorBudget.burned}</span>
                        <span style={{ color: burnStatus, fontWeight: 600 }}>消耗率 {burnPercent}%</span>
                        <span style={{ color: '#2ED573' }}>剩余: {team.errorBudget.remaining}</span>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
