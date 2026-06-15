import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';

export default function TrendChart({ data }) {
  return (
    <div className="chart-card">
      <div className="chart-header">
        <h3 className="chart-title">SLA 违约趋势</h3>
        <span className="chart-subtitle">近15天数据</span>
      </div>
      <div className="chart-body">
        <ResponsiveContainer width="100%" height={320}>
          <AreaChart data={data} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
            <defs>
              <linearGradient id="colorBreaches" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#FF6B6B" stopOpacity={0.3} />
                <stop offset="95%" stopColor="#FF6B6B" stopOpacity={0} />
              </linearGradient>
              <linearGradient id="colorResolved" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#4ECDC4" stopOpacity={0.3} />
                <stop offset="95%" stopColor="#4ECDC4" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
            <XAxis 
              dataKey="date" 
              stroke="#999" 
              fontSize={12}
              tickLine={false}
              axisLine={{ stroke: '#e0e0e0' }}
            />
            <YAxis 
              stroke="#999" 
              fontSize={12}
              tickLine={false}
              axisLine={{ stroke: '#e0e0e0' }}
            />
            <Tooltip 
              contentStyle={{ 
                borderRadius: '8px', 
                border: 'none', 
                boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
                padding: '12px 16px'
              }}
              labelStyle={{ fontWeight: 'bold', marginBottom: '8px' }}
            />
            <Legend 
              verticalAlign="top" 
              height={36}
              formatter={(value) => (
                <span style={{ fontSize: '12px', color: '#666' }}>
                  {value === 'breaches' ? '违约数量' : '已解决数量'}
                </span>
              )}
            />
            <Area 
              type="monotone" 
              dataKey="breaches" 
              stroke="#FF6B6B" 
              strokeWidth={2}
              fillOpacity={1} 
              fill="url(#colorBreaches)" 
              name="breaches"
              animationDuration={1500}
            />
            <Area 
              type="monotone" 
              dataKey="resolved" 
              stroke="#4ECDC4" 
              strokeWidth={2}
              fillOpacity={1} 
              fill="url(#colorResolved)" 
              name="resolved"
              animationDuration={1500}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
