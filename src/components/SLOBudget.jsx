import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, ReferenceLine } from 'recharts';

const getStatusColor = (status) => {
  switch (status) {
    case 'healthy': return '#10B981';
    case 'warning': return '#F59E0B';
    case 'danger': return '#EF4444';
    default: return '#6B7280';
  }
};

const getStatusText = (status) => {
  switch (status) {
    case 'healthy': return '健康';
    case 'warning': return '警告';
    case 'danger': return '危险';
    default: return '未知';
  }
};

function SLOCard({ title, data }) {
  const percentageUsed = ((data.burnedBudget / data.errorBudget) * 100).toFixed(1);
  
  return (
    <div className="slo-card">
      <div className="slo-card-header">
        <h4 className="slo-card-title">{title}</h4>
        <span 
          className="slo-status-badge"
          style={{ backgroundColor: `${getStatusColor(data.status)}20`, color: getStatusColor(data.status) }}
        >
          {getStatusText(data.status)}
        </span>
      </div>
      
      <div className="slo-metrics">
        <div className="slo-metric">
          <span className="slo-metric-label">目标</span>
          <span className="slo-metric-value">{data.target}%</span>
        </div>
        <div className="slo-metric">
          <span className="slo-metric-label">当前</span>
          <span className="slo-metric-value" style={{ color: getStatusColor(data.status) }}>
            {data.current}%
          </span>
        </div>
        <div className="slo-metric">
          <span className="slo-metric-label">燃尽率</span>
          <span className="slo-metric-value">{(data.burnRate * 100).toFixed(0)}%</span>
        </div>
      </div>

      <div className="budget-progress">
        <div className="budget-labels">
          <span>错误预算使用</span>
          <span>{percentageUsed}%</span>
        </div>
        <div className="progress-bar">
          <div 
            className="progress-fill"
            style={{ 
              width: `${Math.min(percentageUsed, 100)}%`,
              backgroundColor: getStatusColor(data.status)
            }}
          ></div>
        </div>
        <div className="budget-numbers">
          <span>已消耗: {data.burnedBudget.toLocaleString()}</span>
          <span>剩余: {data.remainingBudget.toLocaleString()}</span>
        </div>
      </div>
    </div>
  );
}

export default function SLOBudget({ sloData, burnRateData }) {
  const totalBudget = Object.values(sloData).reduce((sum, d) => sum + d.errorBudget, 0);
  const totalBurned = Object.values(sloData).reduce((sum, d) => sum + d.burnedBudget, 0);
  const totalRemaining = totalBudget - totalBurned;
  const overallBurnRate = (totalBurned / totalBudget).toFixed(2);

  return (
    <div className="chart-card">
      <div className="chart-header">
        <h3 className="chart-title">SLO 错误预算与燃尽率</h3>
        <span className="chart-subtitle">总体燃尽率: {overallBurnRate}x</span>
      </div>

      <div className="slo-cards-grid">
        <SLOCard title="可用性 SLO" data={sloData.availability} />
        <SLOCard title="响应时间 SLO" data={sloData.responseTime} />
        <SLOCard title="解决时间 SLO" data={sloData.resolutionTime} />
      </div>

      <div className="burn-rate-section">
        <h4 className="section-title">错误预算燃尽趋势（近14天）</h4>
        <div style={{ height: 250, marginTop: 16 }}>
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={burnRateData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="day" stroke="#999" fontSize={12} tickLine={false} />
              <YAxis stroke="#999" fontSize={12} tickLine={false} />
              <Tooltip 
                contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}
                formatter={(value, name) => {
                  const labels = { burn: '当日消耗', budget: '日预算', cumulative: '累计消耗' };
                  return [value.toLocaleString(), labels[name] || name];
                }}
              />
              <ReferenceLine y={143} stroke="#F59E0B" strokeDasharray="5 5" label={{ value: '日预算线', position: 'right', fontSize: 11, fill: '#F59E0B' }} />
              <Line type="monotone" dataKey="burn" stroke="#FF6B6B" strokeWidth={2} name="burn" dot={{ r: 3 }} activeDot={{ r: 6 }} />
              <Line type="monotone" dataKey="cumulative" stroke="#667EEA" strokeWidth={2} name="cumulative" dot={{ r: 3 }} activeDot={{ r: 6 }} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="budget-burndown-section">
        <h4 className="section-title">预算消耗对比</h4>
        <div style={{ height: 200, marginTop: 16 }}>
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={Object.entries(sloData).map(([key, value]) => ({
              name: key === 'availability' ? '可用性' : key === 'responseTime' ? '响应时间' : '解决时间',
              已消耗: value.burnedBudget,
              剩余: value.remainingBudget,
            }))}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="name" stroke="#999" fontSize={12} tickLine={false} />
              <YAxis stroke="#999" fontSize={12} tickLine={false} />
              <Tooltip 
                contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}
              />
              <Bar dataKey="已消耗" fill="#FF6B6B" radius={[4, 4, 0, 0]} />
              <Bar dataKey="剩余" fill="#10B981" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="slo-summary">
        <div className="summary-item">
          <span className="summary-label">总错误预算</span>
          <span className="summary-value">{totalBudget.toLocaleString()}</span>
        </div>
        <div className="summary-item">
          <span className="summary-label">已消耗预算</span>
          <span className="summary-value danger">{totalBurned.toLocaleString()}</span>
        </div>
        <div className="summary-item">
          <span className="summary-label">剩余预算</span>
          <span className="summary-value success">{totalRemaining.toLocaleString()}</span>
        </div>
        <div className="summary-item">
          <span className="summary-label">预计耗尽时间</span>
          <span className="summary-value warning">
            {totalRemaining > 0 ? `${Math.ceil(totalRemaining / (totalBurned / 14))} 天` : '已耗尽'}
          </span>
        </div>
      </div>
    </div>
  );
}
