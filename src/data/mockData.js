export const statisticsData = {
  totalBreaches: 1247,
  todayBreaches: 23,
  pendingBreaches: 156,
  breachRate: 8.7,
  totalBreachesChange: 12.5,
  todayBreachesChange: -5.2,
  pendingBreachesChange: 8.3,
  breachRateChange: 0.8,
};

export const customerGroupData = [
  { name: 'VIP客户', value: 320, color: '#FF6B6B' },
  { name: '企业客户', value: 456, color: '#4ECDC4' },
  { name: '普通客户', value: 287, color: '#45B7D1' },
  { name: '新客户', value: 184, color: '#96CEB4' },
];

export const trendData = [
  { date: '06/01', breaches: 42, resolved: 38 },
  { date: '06/02', breaches: 38, resolved: 35 },
  { date: '06/03', breaches: 55, resolved: 50 },
  { date: '06/04', breaches: 48, resolved: 45 },
  { date: '06/05', breaches: 62, resolved: 58 },
  { date: '06/06', breaches: 71, resolved: 65 },
  { date: '06/07', breaches: 58, resolved: 55 },
  { date: '06/08', breaches: 45, resolved: 42 },
  { date: '06/09', breaches: 52, resolved: 48 },
  { date: '06/10', breaches: 68, resolved: 62 },
  { date: '06/11', breaches: 75, resolved: 70 },
  { date: '06/12', breaches: 82, resolved: 78 },
  { date: '06/13', breaches: 65, resolved: 60 },
  { date: '06/14', breaches: 58, resolved: 55 },
  { date: '06/15', breaches: 23, resolved: 18 },
];

export const recentTickets = [
  { id: 'TK-20260615-001', customer: '阿里巴巴集团', subject: '支付系统异常', priority: '紧急', breachTime: '15分钟', status: '处理中' },
  { id: 'TK-20260615-002', customer: '腾讯科技', subject: '账号登录问题', priority: '高', breachTime: '32分钟', status: '待分配' },
  { id: 'TK-20260615-003', customer: '华为技术', subject: 'API接口响应慢', priority: '高', breachTime: '45分钟', status: '处理中' },
  { id: 'TK-20260615-004', customer: '字节跳动', subject: '数据导出失败', priority: '中', breachTime: '1小时', status: '已解决' },
  { id: 'TK-20260615-005', customer: '京东集团', subject: '订单状态同步异常', priority: '紧急', breachTime: '20分钟', status: '处理中' },
];

export const sloData = {
  availability: {
    target: 99.9,
    current: 99.87,
    status: 'warning',
    errorBudget: 1000,
    burnedBudget: 873,
    remainingBudget: 127,
    burnRate: 0.87,
  },
  responseTime: {
    target: 95,
    current: 92.3,
    status: 'danger',
    errorBudget: 500,
    burnedBudget: 485,
    remainingBudget: 15,
    burnRate: 0.97,
  },
  resolutionTime: {
    target: 98,
    current: 97.2,
    status: 'healthy',
    errorBudget: 800,
    burnedBudget: 452,
    remainingBudget: 348,
    burnRate: 0.57,
  },
};

export const burnRateData = [
  { day: '周一', burn: 65, budget: 143, cumulative: 65 },
  { day: '周二', burn: 82, budget: 143, cumulative: 147 },
  { day: '周三', burn: 95, budget: 143, cumulative: 242 },
  { day: '周四', burn: 78, budget: 143, cumulative: 320 },
  { day: '周五', burn: 110, budget: 143, cumulative: 430 },
  { day: '周六', burn: 45, budget: 143, cumulative: 475 },
  { day: '周日', burn: 52, budget: 143, cumulative: 527 },
  { day: '周一', burn: 88, budget: 143, cumulative: 615 },
  { day: '周二', burn: 76, budget: 143, cumulative: 691 },
  { day: '周三', burn: 92, budget: 143, cumulative: 783 },
  { day: '周四', burn: 68, budget: 143, cumulative: 851 },
  { day: '周五', burn: 105, budget: 143, cumulative: 956 },
  { day: '周六', burn: 38, budget: 143, cumulative: 994 },
  { day: '周日', burn: 42, budget: 143, cumulative: 1036 },
];

export const serviceDependencyNodes = [
  { id: 'api-gateway', type: 'input', data: { label: 'API网关', status: 'healthy' }, position: { x: 400, y: 50 } },
  { id: 'auth-service', type: 'default', data: { label: '认证服务', status: 'healthy' }, position: { x: 200, y: 150 } },
  { id: 'user-service', type: 'default', data: { label: '用户服务', status: 'warning' }, position: { x: 400, y: 150 } },
  { id: 'ticket-service', type: 'default', data: { label: '工单服务', status: 'danger' }, position: { x: 600, y: 150 } },
  { id: 'payment-service', type: 'default', data: { label: '支付服务', status: 'healthy' }, position: { x: 150, y: 280 } },
  { id: 'notification-service', type: 'default', data: { label: '通知服务', status: 'healthy' }, position: { x: 350, y: 280 } },
  { id: 'report-service', type: 'default', data: { label: '报表服务', status: 'warning' }, position: { x: 550, y: 280 } },
  { id: 'database-primary', type: 'output', data: { label: '主数据库', status: 'healthy' }, position: { x: 300, y: 400 } },
  { id: 'database-replica', type: 'output', data: { label: '只读库', status: 'healthy' }, position: { x: 500, y: 400 } },
];

export const serviceDependencyEdges = [
  { id: 'e1', source: 'api-gateway', target: 'auth-service', animated: true, style: { stroke: '#4ECDC4', strokeWidth: 2 } },
  { id: 'e2', source: 'api-gateway', target: 'user-service', animated: true, style: { stroke: '#4ECDC4', strokeWidth: 2 } },
  { id: 'e3', source: 'api-gateway', target: 'ticket-service', animated: true, style: { stroke: '#FF6B6B', strokeWidth: 3 } },
  { id: 'e4', source: 'auth-service', target: 'user-service', animated: false, style: { stroke: '#4ECDC4', strokeWidth: 2 } },
  { id: 'e5', source: 'user-service', target: 'payment-service', animated: true, style: { stroke: '#4ECDC4', strokeWidth: 2 } },
  { id: 'e6', source: 'user-service', target: 'notification-service', animated: true, style: { stroke: '#4ECDC4', strokeWidth: 2 } },
  { id: 'e7', source: 'ticket-service', target: 'notification-service', animated: true, style: { stroke: '#FF6B6B', strokeWidth: 3 } },
  { id: 'e8', source: 'ticket-service', target: 'report-service', animated: true, style: { stroke: '#FFA502', strokeWidth: 2 } },
  { id: 'e9', source: 'payment-service', target: 'database-primary', animated: true, style: { stroke: '#4ECDC4', strokeWidth: 2 } },
  { id: 'e10', source: 'notification-service', target: 'database-primary', animated: true, style: { stroke: '#4ECDC4', strokeWidth: 2 } },
  { id: 'e11', source: 'report-service', target: 'database-replica', animated: true, style: { stroke: '#FFA502', strokeWidth: 2 } },
  { id: 'e12', source: 'user-service', target: 'database-primary', animated: true, style: { stroke: '#FFA502', strokeWidth: 2 } },
  { id: 'e13', source: 'ticket-service', target: 'database-primary', animated: true, style: { stroke: '#FF6B6B', strokeWidth: 3 } },
];

export const serviceMetrics = {
  'api-gateway': { latency: '12ms', errorRate: '0.1%', throughput: '12.5k/s' },
  'auth-service': { latency: '8ms', errorRate: '0.05%', throughput: '8.2k/s' },
  'user-service': { latency: '45ms', errorRate: '2.3%', throughput: '5.8k/s' },
  'ticket-service': { latency: '120ms', errorRate: '8.7%', throughput: '3.2k/s' },
  'payment-service': { latency: '25ms', errorRate: '0.2%', throughput: '2.1k/s' },
  'notification-service': { latency: '15ms', errorRate: '0.3%', throughput: '4.5k/s' },
  'report-service': { latency: '85ms', errorRate: '3.1%', throughput: '1.2k/s' },
  'database-primary': { latency: '5ms', errorRate: '0.01%', throughput: '15.3k/s' },
  'database-replica': { latency: '3ms', errorRate: '0.01%', throughput: '10.1k/s' },
};

export const generateHistoricalData = (days = 30) => {
  const data = [];
  const baseDate = new Date('2026-06-15');
  
  for (let i = days - 1; i >= 0; i--) {
    const date = new Date(baseDate);
    date.setDate(date.getDate() - i);
    const dateStr = `${(date.getMonth() + 1).toString().padStart(2, '0')}/${date.getDate().toString().padStart(2, '0')}`;
    
    const baseBreaches = 30 + Math.random() * 40;
    const weekendFactor = (date.getDay() === 0 || date.getDay() === 6) ? 0.6 : 1;
    const breaches = Math.round(baseBreaches * weekendFactor);
    const resolved = Math.round(breaches * (0.8 + Math.random() * 0.15));
    
    data.push({
      date: dateStr,
      fullDate: date.toISOString().split('T')[0],
      breaches,
      resolved,
      pending: breaches - resolved,
      avgResponseTime: Math.round(15 + Math.random() * 25),
      slaCompliance: Math.round((90 + Math.random() * 9) * 10) / 10,
    });
  }
  
  return data;
};

export const historicalSnapshots = [
  { id: 'snap-001', timestamp: '2026-06-15 13:00:00', totalBreaches: 1247, pendingBreaches: 156, breachRate: 8.7, criticalIncidents: 3 },
  { id: 'snap-002', timestamp: '2026-06-15 12:00:00', totalBreaches: 1235, pendingBreaches: 148, breachRate: 8.6, criticalIncidents: 2 },
  { id: 'snap-003', timestamp: '2026-06-15 11:00:00', totalBreaches: 1218, pendingBreaches: 142, breachRate: 8.5, criticalIncidents: 2 },
  { id: 'snap-004', timestamp: '2026-06-15 10:00:00', totalBreaches: 1202, pendingBreaches: 138, breachRate: 8.4, criticalIncidents: 1 },
  { id: 'snap-005', timestamp: '2026-06-15 09:00:00', totalBreaches: 1189, pendingBreaches: 135, breachRate: 8.3, criticalIncidents: 1 },
  { id: 'snap-006', timestamp: '2026-06-15 08:00:00', totalBreaches: 1178, pendingBreaches: 132, breachRate: 8.2, criticalIncidents: 0 },
  { id: 'snap-007', timestamp: '2026-06-14 23:00:00', totalBreaches: 1124, pendingBreaches: 128, breachRate: 7.9, criticalIncidents: 0 },
  { id: 'snap-008', timestamp: '2026-06-14 20:00:00', totalBreaches: 1098, pendingBreaches: 125, breachRate: 7.7, criticalIncidents: 1 },
];

export const teams = [
  { id: 'team-1', name: '技术支持团队', description: '负责一线客户技术支持', members: 12, slaTarget: 95 },
  { id: 'team-2', name: '产品研发团队', description: '负责产品功能开发与维护', members: 25, slaTarget: 98 },
  { id: 'team-3', name: '运维保障团队', description: '负责系统运维与稳定性保障', members: 8, slaTarget: 99.9 },
  { id: 'team-4', name: '客户成功团队', description: '负责客户关系维护与满意度', members: 10, slaTarget: 97 },
  { id: 'team-5', name: '质量保障团队', description: '负责产品质量与测试', members: 6, slaTarget: 99 },
];

export const teamPermissions = {
  admin: {
    name: '管理员',
    permissions: ['view_all', 'edit_slo', 'manage_users', 'export_reports', 'view_dependencies', 'replay_history', 'manage_teams', 'configure_alerts'],
  },
  manager: {
    name: '经理',
    permissions: ['view_all', 'export_reports', 'view_dependencies', 'replay_history', 'view_teams'],
  },
  engineer: {
    name: '工程师',
    permissions: ['view_dashboard', 'view_tickets', 'update_tickets', 'view_dependencies'],
  },
  viewer: {
    name: '查看者',
    permissions: ['view_dashboard', 'view_tickets'],
  },
};

export const users = [
  { id: 'user-1', name: '张三', email: 'zhangsan@example.com', role: 'admin', team: 'team-2', avatar: '👨‍💼' },
  { id: 'user-2', name: '李四', email: 'lisi@example.com', role: 'manager', team: 'team-1', avatar: '👩‍💼' },
  { id: 'user-3', name: '王五', email: 'wangwu@example.com', role: 'engineer', team: 'team-3', avatar: '👨‍💻' },
  { id: 'user-4', name: '赵六', email: 'zhaoliu@example.com', role: 'engineer', team: 'team-1', avatar: '👩‍💻' },
  { id: 'user-5', name: '钱七', email: 'qianqi@example.com', role: 'viewer', team: 'team-4', avatar: '👤' },
];

export const alertRules = [
  { id: 'alert-001', name: 'SLA 违约率超标', severity: 'critical', metric: 'breach_rate', threshold: 10, operator: '>', enabled: true, silenced: false, createdAt: '2026-06-01' },
  { id: 'alert-002', name: '响应时间超时', severity: 'high', metric: 'avg_response_time', threshold: 30, operator: '>', enabled: true, silenced: false, createdAt: '2026-06-02' },
  { id: 'alert-003', name: '工单积压预警', severity: 'warning', metric: 'pending_tickets', threshold: 200, operator: '>', enabled: true, silenced: true, silencedBy: 'user-3', silencedAt: '2026-06-14', silencedReason: '系统升级维护', silencedUntil: '2026-06-16' },
  { id: 'alert-004', name: '错误预算耗尽警告', severity: 'high', metric: 'error_budget_remaining', threshold: 20, operator: '<', enabled: true, silenced: false, createdAt: '2026-06-05' },
  { id: 'alert-005', name: '服务可用性下降', severity: 'critical', metric: 'availability', threshold: 99, operator: '<', enabled: true, silenced: false, createdAt: '2026-06-03' },
  { id: 'alert-006', name: '数据库连接异常', severity: 'high', metric: 'db_connection_errors', threshold: 5, operator: '>', enabled: false, silenced: false, createdAt: '2026-06-10' },
];

export const activeAlerts = [
  { id: 'active-001', ruleId: 'alert-001', ruleName: 'SLA 违约率超标', severity: 'critical', value: 12.5, triggeredAt: '2026-06-15 10:30:00', acknowledged: false, service: 'ticket-service' },
  { id: 'active-002', ruleId: 'alert-004', ruleName: '错误预算耗尽警告', severity: 'high', value: 15.3, triggeredAt: '2026-06-15 09:15:00', acknowledged: true, acknowledgedBy: 'user-3', acknowledgedAt: '2026-06-15 09:20:00', service: 'ticket-service' },
  { id: 'active-003', ruleId: 'alert-002', ruleName: '响应时间超时', severity: 'high', value: 45.2, triggeredAt: '2026-06-15 11:45:00', acknowledged: false, service: 'user-service' },
];

export const subscriptions = [
  { id: 'sub-001', name: '每日 SLA 摘要', type: 'daily', channels: ['email'], recipients: ['zhangsan@example.com', 'lisi@example.com'], time: '09:00', enabled: true, reportType: 'summary', lastSent: '2026-06-15 09:00:00' },
  { id: 'sub-002', name: 'SLO 实时告警推送', type: 'realtime', channels: ['email', 'webhook'], recipients: ['wangwu@example.com'], webhookUrl: 'https://hooks.example.com/slo-alert', enabled: true, reportType: 'alert', sloThreshold: 0.8 },
  { id: 'sub-003', name: '周度运维周报', type: 'weekly', channels: ['email'], recipients: ['all@example.com'], time: '10:00', weekday: 1, enabled: true, reportType: 'full', lastSent: '2026-06-09 10:00:00' },
  { id: 'sub-004', name: '月度管理报告', type: 'monthly', channels: ['email'], recipients: ['management@example.com'], time: '08:00', dayOfMonth: 1, enabled: false, reportType: 'full' },
  { id: 'sub-005', name: '错误预算耗尽预警', type: 'budget_alert', channels: ['email', 'webhook'], recipients: ['oncall@example.com'], webhookUrl: 'https://hooks.example.com/budget-alert', enabled: true, reportType: 'alert', budgetThreshold: 0.2 },
];

export const metricsBackends = [
  { id: 'prometheus', name: 'Prometheus', type: 'prometheus', status: 'active', url: 'http://prometheus.internal:9090', description: '主要指标存储后端', lastSync: '2026-06-15 13:00:00' },
  { id: 'datadog', name: 'Datadog', type: 'datadog', status: 'active', url: 'https://api.datadoghq.com', apiKey: '*********abc123', description: '云原生监控平台', lastSync: '2026-06-15 13:00:00' },
  { id: 'grafana-cloud', name: 'Grafana Cloud', type: 'grafana', status: 'active', url: 'https://grafana.grafana.net', apiKey: '*********def456', description: '托管式 Grafana 实例', lastSync: '2026-06-15 12:55:00' },
  { id: 'influxdb', name: 'InfluxDB', type: 'influxdb', status: 'inactive', url: 'http://influxdb.internal:8086', description: '时序数据库（备用）', lastSync: '2026-06-10 00:00:00' },
];

export const dashboardViews = [
  { id: 'view-default', name: '默认视图', isDefault: true, layout: 'grid', widgets: ['stats', 'trend', 'group', 'tickets'], createdAt: '2026-06-01', createdBy: 'system' },
  { id: 'view-ops', name: '运维视图', isDefault: false, layout: 'grid', widgets: ['stats', 'slo', 'dependencies', 'alerts'], createdAt: '2026-06-05', createdBy: 'user-3' },
  { id: 'view-manager', name: '管理视图', isDefault: false, layout: 'list', widgets: ['stats', 'trend', 'slo', 'tickets', 'team'], createdAt: '2026-06-08', createdBy: 'user-2' },
  { id: 'view-slo', name: 'SLO 详情视图', isDefault: false, layout: 'grid', widgets: ['slo', 'burnrate', 'trend'], createdAt: '2026-06-10', createdBy: 'user-1' },
];

export const availableWidgets = [
  { id: 'stats', name: '统计卡片', icon: '📊', category: 'overview' },
  { id: 'trend', name: '违约趋势图', icon: '📈', category: 'charts' },
  { id: 'group', name: '客户分组图', icon: '🥧', category: 'charts' },
  { id: 'slo', name: 'SLO 状态', icon: '🎯', category: 'slo' },
  { id: 'burnrate', name: '错误预算燃尽', icon: '🔥', category: 'slo' },
  { id: 'dependencies', name: '服务依赖图', icon: '🔗', category: 'infrastructure' },
  { id: 'tickets', name: '工单列表', icon: '📋', category: 'tickets' },
  { id: 'alerts', name: '告警列表', icon: '🔔', category: 'alerts' },
  { id: 'team', name: '团队概览', icon: '👥', category: 'teams' },
  { id: 'history', name: '历史回放', icon: '⏮️', category: 'history' },
];

export const rawStormAlerts = [
  { id: 'raw-001', ruleId: 'alert-001', ruleName: 'SLA 违约率超标', severity: 'critical', value: 12.5, triggeredAt: '2026-06-15 10:30:12', service: 'ticket-service', host: 'prod-ticket-01', fingerprint: 'ticket-sla-breaches' },
  { id: 'raw-002', ruleId: 'alert-001', ruleName: 'SLA 违约率超标', severity: 'critical', value: 13.1, triggeredAt: '2026-06-15 10:30:15', service: 'ticket-service', host: 'prod-ticket-02', fingerprint: 'ticket-sla-breaches' },
  { id: 'raw-003', ruleId: 'alert-001', ruleName: 'SLA 违约率超标', severity: 'critical', value: 11.8, triggeredAt: '2026-06-15 10:30:22', service: 'ticket-service', host: 'prod-ticket-03', fingerprint: 'ticket-sla-breaches' },
  { id: 'raw-004', ruleId: 'alert-001', ruleName: 'SLA 违约率超标', severity: 'critical', value: 14.2, triggeredAt: '2026-06-15 10:30:45', service: 'ticket-service', host: 'prod-ticket-01', fingerprint: 'ticket-sla-breaches' },
  { id: 'raw-005', ruleId: 'alert-001', ruleName: 'SLA 违约率超标', severity: 'critical', value: 12.9, triggeredAt: '2026-06-15 10:31:02', service: 'ticket-service', host: 'prod-ticket-02', fingerprint: 'ticket-sla-breaches' },
  { id: 'raw-006', ruleId: 'alert-002', ruleName: '响应时间超时', severity: 'high', value: 45.2, triggeredAt: '2026-06-15 11:45:03', service: 'user-service', host: 'prod-user-01', fingerprint: 'user-response-time' },
  { id: 'raw-007', ruleId: 'alert-002', ruleName: '响应时间超时', severity: 'high', value: 52.8, triggeredAt: '2026-06-15 11:45:08', service: 'user-service', host: 'prod-user-02', fingerprint: 'user-response-time' },
  { id: 'raw-008', ruleId: 'alert-002', ruleName: '响应时间超时', severity: 'high', value: 48.1, triggeredAt: '2026-06-15 11:45:15', service: 'user-service', host: 'prod-user-01', fingerprint: 'user-response-time' },
  { id: 'raw-009', ruleId: 'alert-005', ruleName: '服务可用性下降', severity: 'critical', value: 98.5, triggeredAt: '2026-06-15 09:20:00', service: 'payment-service', host: 'prod-pay-01', fingerprint: 'payment-availability' },
  { id: 'raw-010', ruleId: 'alert-004', ruleName: '错误预算耗尽警告', severity: 'high', value: 15.3, triggeredAt: '2026-06-15 09:15:00', service: 'ticket-service', host: 'global', fingerprint: 'ticket-error-budget' },
  { id: 'raw-011', ruleId: 'alert-004', ruleName: '错误预算耗尽警告', severity: 'high', value: 14.8, triggeredAt: '2026-06-15 09:16:30', service: 'ticket-service', host: 'global', fingerprint: 'ticket-error-budget' },
  { id: 'raw-012', ruleId: 'alert-002', ruleName: '响应时间超时', severity: 'high', value: 61.5, triggeredAt: '2026-06-15 11:46:20', service: 'user-service', host: 'prod-user-03', fingerprint: 'user-response-time' },
  { id: 'raw-013', ruleId: 'alert-001', ruleName: 'SLA 违约率超标', severity: 'critical', value: 15.1, triggeredAt: '2026-06-15 10:31:45', service: 'ticket-service', host: 'prod-ticket-04', fingerprint: 'ticket-sla-breaches' },
  { id: 'raw-014', ruleId: 'alert-002', ruleName: '响应时间超时', severity: 'high', value: 44.2, triggeredAt: '2026-06-15 11:47:10', service: 'user-service', host: 'prod-user-02', fingerprint: 'user-response-time' },
  { id: 'raw-015', ruleId: 'alert-001', ruleName: 'SLA 违约率超标', severity: 'critical', value: 13.8, triggeredAt: '2026-06-15 10:32:30', service: 'ticket-service', host: 'prod-ticket-01', fingerprint: 'ticket-sla-breaches' },
];

export const alertClusters = [
  {
    id: 'cluster-001',
    fingerprint: 'ticket-sla-breaches',
    ruleName: 'SLA 违约率超标',
    severity: 'critical',
    service: 'ticket-service',
    count: 6,
    firstTriggered: '2026-06-15 10:30:12',
    lastTriggered: '2026-06-15 10:32:30',
    affectedHosts: ['prod-ticket-01', 'prod-ticket-02', 'prod-ticket-03', 'prod-ticket-04'],
    avgValue: 13.22,
    maxValue: 15.1,
    status: 'active',
    deduplicatedRate: 0.85,
  },
  {
    id: 'cluster-002',
    fingerprint: 'user-response-time',
    ruleName: '响应时间超时',
    severity: 'high',
    service: 'user-service',
    count: 5,
    firstTriggered: '2026-06-15 11:45:03',
    lastTriggered: '2026-06-15 11:47:10',
    affectedHosts: ['prod-user-01', 'prod-user-02', 'prod-user-03'],
    avgValue: 50.36,
    maxValue: 61.5,
    status: 'active',
    deduplicatedRate: 0.8,
  },
  {
    id: 'cluster-003',
    fingerprint: 'payment-availability',
    ruleName: '服务可用性下降',
    severity: 'critical',
    service: 'payment-service',
    count: 1,
    firstTriggered: '2026-06-15 09:20:00',
    lastTriggered: '2026-06-15 09:20:00',
    affectedHosts: ['prod-pay-01'],
    avgValue: 98.5,
    maxValue: 98.5,
    status: 'acknowledged',
    deduplicatedRate: 0,
  },
  {
    id: 'cluster-004',
    fingerprint: 'ticket-error-budget',
    ruleName: '错误预算耗尽警告',
    severity: 'high',
    service: 'ticket-service',
    count: 2,
    firstTriggered: '2026-06-15 09:15:00',
    lastTriggered: '2026-06-15 09:16:30',
    affectedHosts: ['global'],
    avgValue: 15.05,
    maxValue: 15.3,
    status: 'acknowledged',
    deduplicatedRate: 0.5,
  },
];

export const viewShares = [
  {
    id: 'share-001',
    viewId: 'view-default',
    viewName: '默认视图',
    sharedBy: 'user-1',
    sharedByName: '张三',
    sharedWith: ['team-1', 'team-2'],
    sharedWithNames: ['技术支持团队', '产品研发团队'],
    createdAt: '2026-06-10 10:00:00',
    expiresAt: '2026-07-10 10:00:00',
    accessLevel: 'view',
    link: 'https://sla.example.com/dashboard/share/abc123',
    enabled: true,
    signInRequired: true,
    signIns: [
      { userId: 'user-2', userName: '李四', team: '技术支持团队', signedInAt: '2026-06-15 09:15:00', device: 'Chrome / macOS' },
      { userId: 'user-3', userName: '王五', team: '运维保障团队', signedInAt: '2026-06-15 09:22:30', device: 'Safari / macOS' },
      { userId: 'user-4', userName: '赵六', team: '技术支持团队', signedInAt: '2026-06-15 10:05:12', device: 'Firefox / Windows' },
      { userId: 'user-2', userName: '李四', team: '技术支持团队', signedInAt: '2026-06-14 14:30:00', device: 'Chrome / macOS' },
      { userId: 'user-5', userName: '钱七', team: '客户成功团队', signedInAt: '2026-06-14 11:20:45', device: 'Edge / Windows' },
    ],
  },
  {
    id: 'share-002',
    viewId: 'view-ops',
    viewName: '运维视图',
    sharedBy: 'user-3',
    sharedByName: '王五',
    sharedWith: ['team-3'],
    sharedWithNames: ['运维保障团队'],
    createdAt: '2026-06-12 14:00:00',
    expiresAt: '2026-08-12 14:00:00',
    accessLevel: 'edit',
    link: 'https://sla.example.com/dashboard/share/def456',
    enabled: true,
    signInRequired: true,
    signIns: [
      { userId: 'user-3', userName: '王五', team: '运维保障团队', signedInAt: '2026-06-15 08:30:00', device: 'Chrome / Ubuntu' },
      { userId: 'user-3', userName: '王五', team: '运维保障团队', signedInAt: '2026-06-14 22:15:00', device: 'Safari / iOS' },
    ],
  },
  {
    id: 'share-003',
    viewId: 'view-manager',
    viewName: '管理视图',
    sharedBy: 'user-2',
    sharedByName: '李四',
    sharedWith: ['team-1', 'team-2', 'team-4', 'team-5'],
    sharedWithNames: ['技术支持团队', '产品研发团队', '客户成功团队', '质量保障团队'],
    createdAt: '2026-06-08 09:30:00',
    expiresAt: '2026-06-30 23:59:59',
    accessLevel: 'view',
    link: 'https://sla.example.com/dashboard/share/ghi789',
    enabled: false,
    signInRequired: true,
    signIns: [],
  },
];

export const crossTeamSLOData = {
  summary: {
    totalTeams: 5,
    avgCompliance: 96.8,
    compliantTeams: 3,
    atRiskTeams: 2,
    breechingTeams: 0,
    reportPeriod: '2026-06-01 ~ 2026-06-15',
    generatedAt: '2026-06-15 14:30:00',
  },
  teams: [
    {
      id: 'team-1',
      name: '技术支持团队',
      target: 95,
      actual: 97.2,
      status: 'compliant',
      rank: 2,
      errorBudget: { total: 500, burned: 198, remaining: 302, burnRate: 0.396 },
      tickets: { total: 1250, breached: 35, breachRate: 2.8 },
      responseTime: { avg: 18, p95: 42, target: 30 },
      members: 12,
      trend: 'up',
      changeFromLastPeriod: 1.5,
    },
    {
      id: 'team-2',
      name: '产品研发团队',
      target: 98,
      actual: 98.9,
      status: 'compliant',
      rank: 1,
      errorBudget: { total: 300, burned: 66, remaining: 234, burnRate: 0.22 },
      tickets: { total: 890, breached: 10, breachRate: 1.1 },
      responseTime: { avg: 22, p95: 55, target: 25 },
      members: 25,
      trend: 'up',
      changeFromLastPeriod: 0.8,
    },
    {
      id: 'team-3',
      name: '运维保障团队',
      target: 99.9,
      actual: 98.7,
      status: 'at_risk',
      rank: 4,
      errorBudget: { total: 150, burned: 142, remaining: 8, burnRate: 0.947 },
      tickets: { total: 520, breached: 7, breachRate: 1.3 },
      responseTime: { avg: 8, p95: 15, target: 10 },
      members: 8,
      trend: 'down',
      changeFromLastPeriod: -0.3,
    },
    {
      id: 'team-4',
      name: '客户成功团队',
      target: 97,
      actual: 97.5,
      status: 'compliant',
      rank: 3,
      errorBudget: { total: 400, burned: 180, remaining: 220, burnRate: 0.45 },
      tickets: { total: 680, breached: 17, breachRate: 2.5 },
      responseTime: { avg: 35, p95: 78, target: 45 },
      members: 10,
      trend: 'stable',
      changeFromLastPeriod: 0.2,
    },
    {
      id: 'team-5',
      name: '质量保障团队',
      target: 99,
      actual: 96.5,
      status: 'at_risk',
      rank: 5,
      errorBudget: { total: 200, burned: 186, remaining: 14, burnRate: 0.93 },
      tickets: { total: 340, breached: 12, breachRate: 3.5 },
      responseTime: { avg: 28, p95: 68, target: 20 },
      members: 6,
      trend: 'down',
      changeFromLastPeriod: -1.2,
    },
  ],
  timeline: [
    { date: '06/01', '技术支持团队': 96.8, '产品研发团队': 98.5, '运维保障团队': 99.2, '客户成功团队': 97.1, '质量保障团队': 97.8 },
    { date: '06/03', '技术支持团队': 97.0, '产品研发团队': 98.7, '运维保障团队': 99.0, '客户成功团队': 97.3, '质量保障团队': 97.5 },
    { date: '06/05', '技术支持团队': 96.5, '产品研发团队': 98.6, '运维保障团队': 98.8, '客户成功团队': 97.2, '质量保障团队': 97.1 },
    { date: '06/07', '技术支持团队': 96.9, '产品研发团队': 98.8, '运维保障团队': 98.9, '客户成功团队': 97.5, '质量保障团队': 96.8 },
    { date: '06/09', '技术支持团队': 97.1, '产品研发团队': 98.9, '运维保障团队': 98.7, '客户成功团队': 97.4, '质量保障团队': 96.6 },
    { date: '06/11', '技术支持团队': 97.3, '产品研发团队': 99.0, '运维保障团队': 98.8, '客户成功团队': 97.6, '质量保障团队': 96.5 },
    { date: '06/13', '技术支持团队': 97.2, '产品研发团队': 98.9, '运维保障团队': 98.6, '客户成功团队': 97.5, '质量保障团队': 96.4 },
    { date: '06/15', '技术支持团队': 97.2, '产品研发团队': 98.9, '运维保障团队': 98.7, '客户成功团队': 97.5, '质量保障团队': 96.5 },
  ],
};
