import './App.css';
import StatCard from './components/StatCard';
import CustomerGroupChart from './components/CustomerGroupChart';
import TrendChart from './components/TrendChart';
import { statisticsData, customerGroupData, trendData, recentTickets } from './data/mockData';

function App() {
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

  return (
    <div className="dashboard">
      <header className="dashboard-header">
        <div>
          <h1 className="dashboard-title">SLA 违约监控仪表盘</h1>
          <p className="dashboard-subtitle">实时监控客服工单 SLA 超时情况 · 更新于 {new Date().toLocaleString('zh-CN')}</p>
        </div>
        <div className="header-actions">
          <button className="btn btn-primary">导出报告</button>
          <button className="btn btn-secondary">刷新数据</button>
        </div>
      </header>

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
    </div>
  );
}

export default App;
