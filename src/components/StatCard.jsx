export default function StatCard({ title, value, unit, change, icon, color }) {
  const isPositive = change >= 0;
  
  return (
    <div className="stat-card" style={{ borderLeftColor: color }}>
      <div className="stat-card-header">
        <span className="stat-card-title">{title}</span>
        <div className="stat-card-icon" style={{ backgroundColor: `${color}20`, color }}>
          {icon}
        </div>
      </div>
      <div className="stat-card-value">
        {value.toLocaleString()}
        {unit && <span className="stat-card-unit">{unit}</span>}
      </div>
      <div className={`stat-card-change ${isPositive ? 'positive' : 'negative'}`}>
        {isPositive ? '↑' : '↓'} {Math.abs(change)}% 较昨日
      </div>
    </div>
  );
}
