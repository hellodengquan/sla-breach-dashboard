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
