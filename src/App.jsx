import { useState } from 'react';
import './App.css';
import { AuthProvider, useAuth } from './context/AuthContext';
import { MetricsBackendProvider } from './context/MetricsBackendContext';
import StatCard from './components/StatCard';
import CustomerGroupChart from './components/CustomerGroupChart';
import TrendChart from './components/TrendChart';
import SLOBudget from './components/SLOBudget';
import ServiceDependencyGraph from './components/ServiceDependencyGraph';
import HistoryPlayback from './components/HistoryPlayback';
import PDFReport from './components/PDFReport';
import TeamPermissions from './components/TeamPermissions';
import AlertSilencing from './components/AlertSilencing';
import SLOSubscription from './components/SLOSubscription';
import MetricsBackendManager from './components/MetricsBackendManager';
import CustomDashboardView from './components/CustomDashboardView';
import AlertStormCluster from './components/AlertStormCluster';
import ViewSharing from './components/ViewSharing';
import CrossTeamSLO from './components/CrossTeamSLO';
import { 
  statisticsData, 
  customerGroupData, 
  trendData, 
  recentTickets,
  sloData,
  burnRateData,
  serviceDependencyNodes,
  serviceDependencyEdges,
  serviceMetrics,
  historicalSnapshots,
  generateHistoricalData,
  teams,
  alertRules,
  activeAlerts,
  subscriptions,
  dashboardViews,
  availableWidgets,
  rawStormAlerts,
  alertClusters,
  viewShares,
  crossTeamSLOData,
  users,
} from './data/mockData';

function DashboardContent() {
  const { currentUser, hasPermission, teamPermissions } = useAuth();
  const [activeTab, setActiveTab] = useState('overview');

  const getPriorityColor = (priority) => {
    switch (priority) {
      case '紧急': return '#FF4757';
      case '高': return '#FFA502';
      case '中': return '#2ED573';
      default: return '#747D8C';
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case '处理中': return '#3742FA';
      case '待分配': return '#FFA502';
      case '已解决': return '#2ED573';
      default: return '#747D8C';
    }
  };

  const tabs = [
    { id: 'overview', name: '📊 总览', permission: 'view_dashboard' },
    { id: 'slo', name: '🎯 SLO & 错误预算', permission: 'view_dashboard' },
    { id: 'cross-team', name: '🏢 跨团队 SLO', permission: 'view_teams' },
    { id: 'alerts', name: '🔔 告警管理', permission: 'configure_alerts' },
    { id: 'storm', name: '🌪️ 告警风暴聚类', permission: 'configure_alerts' },
    { id: 'subscriptions', name: '📩 订阅推送', permission: 'export_reports' },
    { id: 'dependencies', name: '🔗 服务依赖', permission: 'view_dependencies' },
    { id: 'history', name: '⏮️ 历史回放', permission: 'replay_history' },
    { id: 'backends', name: '🔌 数据源', permission: 'view_all' },
    { id: 'views', name: '🎛️ 视图管理', permission: 'view_dashboard' },
    { id: 'sharing', name: '🔗 视图共享', permission: 'view_dashboard' },
    { id: 'teams', name: '👥 团队权限', permission: 'view_teams' },
    { id: 'export', name: '📄 导出报告', permission: 'export_reports' },
  ].filter(tab => hasPermission(tab.permission));

  const renderContent = () => {
    switch (activeTab) {
      case 'overview':
        return (
          <>
            <section className="stats-grid">
              <StatCard
                title="累计违约数量"
                value={statisticsData.totalBreaches}
                change={statisticsData.totalBreachesChange}
                icon="📊"
                color="#FF6B6B"
              />
              <StatCard
                title="今日违约数量"
                value={statisticsData.todayBreaches}
                change={statisticsData.todayBreachesChange}
                icon="⚠️"
                color="#FFA502"
              />
              <StatCard
                title="待处理违约"
                value={statisticsData.pendingBreaches}
                change={statisticsData.pendingBreachesChange}
                icon="⏰"
                color="#45B7D1"
              />
              <StatCard
                title="整体违约率"
                value={statisticsData.breachRate}
                unit="%"
                change={statisticsData.breachRateChange}
                icon="📈"
                color="#96CEB4"
              />
            </section>

            <section className="charts-section">
              <div className="chart-wrapper trend-wrapper">
                <TrendChart data={trendData} />
              </div>
              <div className="chart-wrapper group-wrapper">
                <CustomerGroupChart data={customerGroupData} />
              </div>
            </section>

            {hasPermission('view_tickets') && (
              <section className="tickets-section">
                <div className="chart-card">
                  <div className="chart-header">
                    <h3 className="chart-title">最近违约工单</h3>
                    <span className="chart-subtitle">共 {recentTickets.length} 条记录</span>
                  </div>
                  <div className="table-container">
                    <table className="tickets-table">
                      <thead>
                        <tr>
                          <th>工单编号</th>
                          <th>客户名称</th>
                          <th>问题描述</th>
                          <th>优先级</th>
                          <th>超时时间</th>
                          <th>状态</th>
                        </tr>
                      </thead>
                      <tbody>
                        {recentTickets.map((ticket) => (
                          <tr key={ticket.id}>
                            <td className="ticket-id">{ticket.id}</td>
                            <td className="ticket-customer">{ticket.customer}</td>
                            <td className="ticket-subject">{ticket.subject}</td>
                            <td>
                              <span 
                                className="priority-badge" 
                                style={{ backgroundColor: `${getPriorityColor(ticket.priority)}20`, color: getPriorityColor(ticket.priority) }}
                              >
                                {ticket.priority}
                              </span>
                            </td>
                            <td className="breach-time">{ticket.breachTime}</td>
                            <td>
                              <span 
                                className="status-badge"
                                style={{ backgroundColor: `${getStatusColor(ticket.status)}20`, color: getStatusColor(ticket.status) }}
                              >
                                {ticket.status}
                              </span>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </section>
            )}
          </>
        );
      
      case 'slo':
        return <SLOBudget sloData={sloData} burnRateData={burnRateData} />;
      
      case 'cross-team':
        return <CrossTeamSLO crossTeamData={crossTeamSLOData} />;
      
      case 'alerts':
        return <AlertSilencing alertRules={alertRules} activeAlerts={activeAlerts} />;
      
      case 'storm':
        return <AlertStormCluster rawAlerts={rawStormAlerts} clusters={alertClusters} />;
      
      case 'subscriptions':
        return <SLOSubscription subscriptions={subscriptions} />;
      
      case 'dependencies':
        return (
          <ServiceDependencyGraph 
            nodes={serviceDependencyNodes} 
            edges={serviceDependencyEdges}
            serviceMetrics={serviceMetrics}
          />
        );
      
      case 'history':
        return (
          <HistoryPlayback 
            snapshots={historicalSnapshots}
            generateHistoricalData={generateHistoricalData}
          />
        );
      
      case 'backends':
        return <MetricsBackendManager />;
      
      case 'views':
        return <CustomDashboardView views={dashboardViews} availableWidgets={availableWidgets} />;
      
      case 'sharing':
        return (
          <ViewSharing
            initialShares={viewShares}
            dashboardViews={dashboardViews}
            teams={teams}
            users={users}
          />
        );
      
      case 'teams':
        return <TeamPermissions teams={teams} />;
      
      case 'export':
        return (
          <PDFReport
            statisticsData={statisticsData}
            sloData={sloData}
            recentTickets={recentTickets}
            customerGroupData={customerGroupData}
          />
        );
      
      default:
        return null;
    }
  };

  return (
    <div className="dashboard" id="dashboard-content">
      <header className="dashboard-header">
        <div>
          <h1 className="dashboard-title">SLA 违约监控仪表盘</h1>
          <p className="dashboard-subtitle">
            实时监控客服工单 SLA 超时情况 · 更新于 {new Date().toLocaleString('zh-CN')}
            {' · '}
            当前用户: <strong>{currentUser.name}</strong>
            <span className="role-indicator">({teamPermissions[currentUser.role]?.name || currentUser.role})</span>
          </p>
        </div>
        <div className="header-actions">
          {hasPermission('export_reports') && (
            <button 
              className="btn btn-primary"
              onClick={() => setActiveTab('export')}
            >
              导出报告
            </button>
          )}
          <button className="btn btn-secondary" onClick={() => window.location.reload()}>
            刷新数据
          </button>
        </div>
      </header>

      <nav className="dashboard-nav">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            className={`nav-tab ${activeTab === tab.id ? 'active' : ''}`}
            onClick={() => setActiveTab(tab.id)}
          >
            {tab.name}
          </button>
        ))}
      </nav>

      <main className="dashboard-main">
        {renderContent()}
      </main>
    </div>
  );
}

function App() {
  return (
    <AuthProvider>
      <MetricsBackendProvider>
        <DashboardContent />
      </MetricsBackendProvider>
    </AuthProvider>
  );
}

export default App;
