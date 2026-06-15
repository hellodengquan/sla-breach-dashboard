import { useState, useEffect, useCallback, useRef, useMemo } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area } from 'recharts';

export default function HistoryPlayback({ snapshots, generateHistoricalData }) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [playbackSpeed, setPlaybackSpeed] = useState(1);
  const [historicalData] = useState(() => generateHistoricalData(30));
  const intervalRef = useRef(null);

  const selectedSnapshot = useMemo(() => snapshots[currentIndex], [currentIndex, snapshots]);

  const togglePlay = useCallback(() => {
    setIsPlaying(prev => !prev);
  }, []);

  const goToSnapshot = useCallback((index) => {
    setCurrentIndex(index);
  }, []);

  const goToPrev = useCallback(() => {
    setCurrentIndex(prev => Math.max(0, prev - 1));
  }, []);

  const goToNext = useCallback(() => {
    setCurrentIndex(prev => Math.min(snapshots.length - 1, prev + 1));
  }, [snapshots.length]);

  const reset = useCallback(() => {
    setCurrentIndex(0);
    setIsPlaying(false);
  }, []);

  useEffect(() => {
    if (isPlaying) {
      intervalRef.current = setInterval(() => {
        setCurrentIndex(prev => {
          if (prev >= snapshots.length - 1) {
            setIsPlaying(false);
            return prev;
          }
          return prev + 1;
        });
      }, 1000 / playbackSpeed);
    } else {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isPlaying, playbackSpeed, snapshots.length]);

  const formatTime = (timestamp) => {
    const date = new Date(timestamp);
    return date.toLocaleString('zh-CN', {
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  return (
    <div className="chart-card">
      <div className="chart-header">
        <h3 className="chart-title">历史数据回放</h3>
        <div className="playback-speed-control">
          <span className="speed-label">速度:</span>
          <select 
            className="speed-select"
            value={playbackSpeed}
            onChange={(e) => setPlaybackSpeed(Number(e.target.value))}
          >
            <option value={0.5}>0.5x</option>
            <option value={1}>1x</option>
            <option value={2}>2x</option>
            <option value={4}>4x</option>
          </select>
        </div>
      </div>

      <div className="playback-controls">
        <button className="control-btn" onClick={reset} title="重置">
          ⏮
        </button>
        <button className="control-btn" onClick={goToPrev} disabled={currentIndex === 0} title="上一个">
          ◀
        </button>
        <button 
          className="control-btn play-btn" 
          onClick={togglePlay}
          title={isPlaying ? '暂停' : '播放'}
        >
          {isPlaying ? '⏸' : '▶'}
        </button>
        <button 
          className="control-btn" 
          onClick={goToNext} 
          disabled={currentIndex === snapshots.length - 1}
          title="下一个"
        >
          ▶
        </button>
        <span className="playback-progress">
          {currentIndex + 1} / {snapshots.length}
        </span>
      </div>

      <div className="timeline-container">
        <div className="timeline">
          {snapshots.map((snapshot, index) => (
            <div
              key={snapshot.id}
              className={`timeline-point ${index === currentIndex ? 'active' : ''} ${index < currentIndex ? 'passed' : ''}`}
              onClick={() => goToSnapshot(index)}
              title={formatTime(snapshot.timestamp)}
            >
              <div className="timeline-dot">
                {snapshot.criticalIncidents > 0 && (
                  <span className="incident-badge">{snapshot.criticalIncidents}</span>
                )}
              </div>
              {index % 2 === 0 && (
                <span className="timeline-label">{formatTime(snapshot.timestamp).split(' ')[1]}</span>
              )}
            </div>
          ))}
        </div>
        <div className="timeline-line"></div>
      </div>

      {selectedSnapshot && (
        <div className="snapshot-details">
          <div className="snapshot-header">
            <h4 className="snapshot-time">📅 {formatTime(selectedSnapshot.timestamp)}</h4>
            {selectedSnapshot.criticalIncidents > 0 && (
              <span className="critical-badge">
                ⚠️ {selectedSnapshot.criticalIncidents} 个严重事件
              </span>
            )}
          </div>
          
          <div className="snapshot-metrics">
            <div className="snapshot-metric">
              <span className="metric-icon">📊</span>
              <div>
                <span className="metric-label">累计违约</span>
                <span className="metric-value">{selectedSnapshot.totalBreaches.toLocaleString()}</span>
              </div>
            </div>
            <div className="snapshot-metric">
              <span className="metric-icon">⏰</span>
              <div>
                <span className="metric-label">待处理</span>
                <span className="metric-value">{selectedSnapshot.pendingBreaches.toLocaleString()}</span>
              </div>
            </div>
            <div className="snapshot-metric">
              <span className="metric-icon">📈</span>
              <div>
                <span className="metric-label">违约率</span>
                <span className="metric-value">{selectedSnapshot.breachRate}%</span>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="historical-chart-section">
        <h4 className="section-title">30天历史趋势</h4>
        <div style={{ height: 220, marginTop: 16 }}>
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={historicalData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
              <defs>
                <linearGradient id="colorHistBreaches" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#FF6B6B" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#FF6B6B" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis 
                dataKey="date" 
                stroke="#999" 
                fontSize={11} 
                tickLine={false}
                interval={4}
              />
              <YAxis stroke="#999" fontSize={11} tickLine={false} />
              <Tooltip 
                contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}
                formatter={(value, name) => {
                  const labels = { 
                    breaches: '违约数量', 
                    slaCompliance: 'SLA合规率(%)',
                    avgResponseTime: '平均响应时间(分钟)'
                  };
                  return [value, labels[name] || name];
                }}
              />
              <Area 
                type="monotone" 
                dataKey="breaches" 
                stroke="#FF6B6B" 
                strokeWidth={2}
                fillOpacity={1} 
                fill="url(#colorHistBreaches)" 
                name="breaches"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        <div className="history-subcharts">
          <div style={{ height: 120, flex: 1 }}>
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={historicalData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="date" tick={false} axisLine={false} />
                <YAxis stroke="#999" fontSize={10} tickLine={false} width={40} />
                <Tooltip contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }} />
                <Line 
                  type="monotone" 
                  dataKey="slaCompliance" 
                  stroke="#10B981" 
                  strokeWidth={2} 
                  dot={false}
                  name="slaCompliance"
                />
              </LineChart>
            </ResponsiveContainer>
            <div className="subchart-label">SLA 合规率</div>
          </div>
          <div style={{ height: 120, flex: 1 }}>
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={historicalData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="date" tick={false} axisLine={false} />
                <YAxis stroke="#999" fontSize={10} tickLine={false} width={40} />
                <Tooltip contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }} />
                <Line 
                  type="monotone" 
                  dataKey="avgResponseTime" 
                  stroke="#667EEA" 
                  strokeWidth={2} 
                  dot={false}
                  name="avgResponseTime"
                />
              </LineChart>
            </ResponsiveContainer>
            <div className="subchart-label">平均响应时间</div>
          </div>
        </div>
      </div>
    </div>
  );
}
