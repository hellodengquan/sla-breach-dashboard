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
