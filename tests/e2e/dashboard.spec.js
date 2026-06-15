import { test, expect } from '@playwright/test';

test.describe('SLA 违约监控仪表盘 - 端到端测试', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');
  });

  test('1. 仪表盘总览页面加载测试', async ({ page }) => {
    await expect(page.getByRole('heading', { name: 'SLA 违约监控仪表盘' })).toBeVisible();
    await expect(page.getByText('累计违约数量')).toBeVisible();
    await expect(page.getByText('今日违约数量')).toBeVisible();
    await expect(page.getByText('待处理违约')).toBeVisible();
    await expect(page.getByText('整体违约率')).toBeVisible();
    await expect(page.getByRole('img').first()).toBeVisible();
  });

  test('2. 统计卡片数据展示测试', async ({ page }) => {
    const statCards = page.locator('.stat-card');
    await expect(statCards).toHaveCount(4);

    const firstCard = statCards.first();
    await expect(firstCard.locator('.stat-card-title')).toContainText('累计违约数量');
    await expect(firstCard.locator('.stat-card-value')).toBeVisible();
    await expect(firstCard.locator('.stat-card-change')).toBeVisible();
  });

  test('3. 导航标签页功能测试', async ({ page }) => {
    const tabs = [
      { name: '📊 总览', selector: '总览' },
      { name: '🎯 SLO & 错误预算', selector: 'SLO & 错误预算' },
      { name: '🔗 服务依赖', selector: '服务依赖' },
      { name: '⏮️ 历史回放', selector: '历史回放' },
      { name: '👥 团队权限', selector: '团队权限' },
      { name: '📄 导出报告', selector: '导出报告' },
    ];

    for (const tab of tabs) {
      const tabButton = page.getByRole('button', { name: tab.name });
      await expect(tabButton).toBeVisible();
      await tabButton.click();
      await page.waitForTimeout(500);
    }
  });

  test('4. SLO 错误预算页面功能测试', async ({ page }) => {
    await page.getByRole('button', { name: '🎯 SLO & 错误预算' }).click();
    await page.waitForTimeout(500);

    await expect(page.getByText('SLO 错误预算与燃尽率')).toBeVisible();
    await expect(page.getByText('可用性 SLO')).toBeVisible();
    await expect(page.getByText('响应时间 SLO')).toBeVisible();
    await expect(page.getByText('解决时间 SLO')).toBeVisible();

    const progressBars = page.locator('.progress-bar');
    await expect(progressBars).toHaveCount(3);

    await expect(page.getByText('错误预算燃尽趋势')).toBeVisible();
    await expect(page.getByText('预算消耗对比')).toBeVisible();
    await expect(page.getByText('总错误预算')).toBeVisible();
  });

  test('5. 服务依赖图页面功能测试', async ({ page }) => {
    await page.getByRole('button', { name: '🔗 服务依赖' }).click();
    await page.waitForTimeout(1000);

    await expect(page.getByText('跨服务依赖图')).toBeVisible();
    const statusSummary = page.locator('.service-status-summary');
    await expect(statusSummary).toBeVisible();
    await expect(statusSummary.getByText(/正常/)).toBeVisible();
    await expect(statusSummary.getByText(/警告/)).toBeVisible();
    await expect(statusSummary.getByText(/故障/)).toBeVisible();

    await expect(page.locator('.react-flow-wrapper')).toBeVisible();

    const serviceNodes = page.locator('.service-node');
    await expect(serviceNodes.first()).toBeVisible();
  });

  test('6. 服务节点点击交互测试', async ({ page }) => {
    await page.getByRole('button', { name: '🔗 服务依赖' }).click();
    await page.waitForTimeout(1000);

    const firstNode = page.locator('.service-node').first();
    await firstNode.click();
    await page.waitForTimeout(500);

    await expect(page.locator('.service-detail-panel')).toBeVisible();
    await expect(page.getByText('延迟')).toBeVisible();
    await expect(page.getByText('错误率')).toBeVisible();
    await expect(page.getByText('吞吐量')).toBeVisible();
  });

  test('7. 历史回放页面功能测试', async ({ page }) => {
    await page.getByRole('button', { name: '⏮️ 历史回放' }).click();
    await page.waitForTimeout(500);

    await expect(page.getByText('历史数据回放')).toBeVisible();

    const playbackControls = page.locator('.playback-controls');
    await expect(playbackControls).toBeVisible();

    const controlButtons = playbackControls.locator('.control-btn');
    await expect(controlButtons).toHaveCount(4);

    await expect(page.locator('.timeline')).toBeVisible();

    const timelinePoints = page.locator('.timeline-point');
    await expect(timelinePoints).toHaveCount(8);
  });

  test('8. 历史回放播放控制测试', async ({ page }) => {
    await page.getByRole('button', { name: '⏮️ 历史回放' }).click();
    await page.waitForTimeout(500);

    const playButton = page.locator('.play-btn');
    await expect(playButton).toBeVisible();
    await playButton.click();
    await page.waitForTimeout(1500);

    const pauseButton = page.locator('.play-btn');
    await pauseButton.click();

    const nextButton = page.locator('.control-btn').nth(2);
    await nextButton.click();
    await page.waitForTimeout(300);

    const prevButton = page.locator('.control-btn').nth(1);
    await prevButton.click();
  });

  test('9. 历史回放速度调节测试', async ({ page }) => {
    await page.getByRole('button', { name: '⏮️ 历史回放' }).click();
    await page.waitForTimeout(500);

    const speedSelect = page.locator('.speed-select');
    await expect(speedSelect).toBeVisible();

    await speedSelect.selectOption('2');
    await expect(speedSelect).toHaveValue('2');

    await speedSelect.selectOption('0.5');
    await expect(speedSelect).toHaveValue('0.5');
  });

  test('10. 历史时间轴点击测试', async ({ page }) => {
    await page.getByRole('button', { name: '⏮️ 历史回放' }).click();
    await page.waitForTimeout(500);

    const timelinePoints = page.locator('.timeline-point');
    const thirdPoint = timelinePoints.nth(2);
    await thirdPoint.click();
    await page.waitForTimeout(500);

    await expect(page.locator('.snapshot-details')).toBeVisible();
    await expect(page.getByText('累计违约')).toBeVisible();
    await expect(page.getByText('待处理')).toBeVisible();
    await expect(page.getByText('违约率')).toBeVisible();
  });

  test('11. 团队权限页面功能测试', async ({ page }) => {
    await page.getByRole('button', { name: '👥 团队权限' }).click();
    await page.waitForTimeout(500);

    await expect(page.getByText('团队与权限管理')).toBeVisible();
    await expect(page.locator('.current-user-badge')).toBeVisible();

    const permissionTabs = page.locator('.permission-tabs .tab-btn');
    await expect(permissionTabs).toHaveCount(4);
  });

  test('12. 用户列表展示测试', async ({ page }) => {
    await page.getByRole('button', { name: '👥 团队权限' }).click();
    await page.waitForTimeout(500);

    await page.getByRole('button', { name: '👥 用户列表' }).click();
    await expect(page.locator('.users-table')).toBeVisible();

    const tableRows = page.locator('.users-table tbody tr');
    await expect(tableRows).toHaveCount(5);

    const roleBadges = page.locator('.role-badge');
    await expect(roleBadges.first()).toBeVisible();
  });

  test('13. 团队信息展示测试', async ({ page }) => {
    await page.getByRole('button', { name: '👥 团队权限' }).click();
    await page.waitForTimeout(500);

    await page.getByRole('button', { name: '🏢 团队信息' }).click();

    const teamCards = page.locator('.team-card');
    await expect(teamCards).toHaveCount(5);

    const firstTeam = teamCards.first();
    await firstTeam.click();
    await expect(firstTeam).toHaveClass(/selected/);

    await expect(page.locator('.team-members-list').first()).toBeVisible();
  });

  test('14. 角色权限矩阵测试', async ({ page }) => {
    await page.getByRole('button', { name: '👥 团队权限' }).click();
    await page.waitForTimeout(500);

    await page.getByRole('button', { name: '🔐 角色权限' }).click();

    await expect(page.locator('.permissions-table')).toBeVisible();

    const tableHeaders = page.locator('.permissions-table th');
    await expect(tableHeaders).toHaveCount(5);

    const checkIcons = page.locator('.check-icon');
    await expect(checkIcons.first()).toBeVisible();
  });

  test('15. 角色切换功能测试', async ({ page }) => {
    await page.getByRole('button', { name: '👥 团队权限' }).click();
    await page.waitForTimeout(500);

    await page.getByRole('button', { name: '🔄 切换角色' }).click();

    const switchButtons = page.locator('.user-switch-btn');
    await expect(switchButtons).toHaveCount(5);

    const secondUser = switchButtons.nth(1);
    await secondUser.click();
    await expect(secondUser).toHaveClass(/active/);
  });

  test('16. 权限隔离验证 - 不同角色可见标签页', async ({ page }) => {
    await page.getByRole('button', { name: '👥 团队权限' }).click();
    await page.waitForTimeout(500);

    await page.getByRole('button', { name: '🔄 切换角色' }).click();
    await page.waitForTimeout(300);

    const viewerUser = page.getByRole('button', { name: /钱七/ });
    await viewerUser.click();
    await page.waitForTimeout(500);

    const navTabs = page.locator('.dashboard-nav .nav-tab');
    const tabCount = await navTabs.count();
    expect(tabCount).toBeLessThan(6);
  });

  test('17. PDF 导出报告页面功能测试', async ({ page }) => {
    await page.getByRole('button', { name: '📄 导出报告' }).click();
    await page.waitForTimeout(500);

    await expect(page.getByText('📄 导出 PDF 报告')).toBeVisible();
    await expect(page.locator('.report-options')).toBeVisible();

    const reportTypeSelect = page.locator('.option-select').first();
    await expect(reportTypeSelect).toBeVisible();
    await reportTypeSelect.selectOption('full');
    await expect(reportTypeSelect).toHaveValue('full');

    const dateRangeSelect = page.locator('.option-select').nth(1);
    await expect(dateRangeSelect).toBeVisible();
    await dateRangeSelect.selectOption('30days');
    await expect(dateRangeSelect).toHaveValue('30days');
  });

  test('18. PDF 报告类型切换测试', async ({ page }) => {
    await page.getByRole('button', { name: '📄 导出报告' }).click();
    await page.waitForTimeout(500);

    const reportTypeSelect = page.locator('.option-select').first();
    await reportTypeSelect.selectOption('full');
    await page.waitForTimeout(300);

    await expect(page.locator('.report-preview-info')).toBeVisible();
    await expect(page.getByText('完整报告包含')).toBeVisible();
    await expect(page.getByText('核心指标概览')).toBeVisible();
    await expect(page.getByText('SLO 状态详情')).toBeVisible();
    await expect(page.getByText('错误预算分析')).toBeVisible();
  });

  test('19. 导出按钮存在测试', async ({ page }) => {
    await page.getByRole('button', { name: '📄 导出报告' }).click();
    await page.waitForTimeout(500);

    const exportButtons = page.locator('.report-actions .btn');
    await expect(exportButtons).toHaveCount(2);

    await expect(exportButtons.first()).toContainText('生成数据报告');
    await expect(exportButtons.nth(1)).toContainText('导出仪表盘截图');
  });

  test('20. 响应式设计测试 - 移动端布局', async ({ page }) => {
    await page.setViewportSize({ width: 768, height: 1024 });
    await page.goto('/');
    await page.waitForLoadState('networkidle');

    await expect(page.getByRole('heading', { name: 'SLA 违约监控仪表盘' })).toBeVisible();

    const statCards = page.locator('.stat-card');
    await expect(statCards).toHaveCount(4);

    await page.setViewportSize({ width: 1280, height: 800 });
  });

  test('21. 工单列表展示测试', async ({ page }) => {
    await page.getByRole('button', { name: '📊 总览' }).click();
    await page.waitForTimeout(500);

    await expect(page.getByText('最近违约工单')).toBeVisible();

    const ticketsTable = page.locator('.tickets-table');
    await expect(ticketsTable).toBeVisible();

    const ticketRows = ticketsTable.locator('tbody tr');
    await expect(ticketRows).toHaveCount(5);

    const priorityBadges = page.locator('.priority-badge');
    await expect(priorityBadges.first()).toBeVisible();

    const statusBadges = page.locator('.status-badge');
    await expect(statusBadges.first()).toBeVisible();
  });

  test('22. 趋势图和客户分布图测试', async ({ page }) => {
    await page.getByRole('button', { name: '📊 总览' }).click();
    await page.waitForTimeout(1000);

    const chartCards = page.locator('.chart-card');
    const chartCount = await chartCards.count();
    expect(chartCount).toBeGreaterThanOrEqual(2);

    await expect(page.getByText('SLA 违约趋势')).toBeVisible();
    await expect(page.getByText('客户分组统计')).toBeVisible();
  });

  test('23. 头部操作按钮测试', async ({ page }) => {
    const headerActions = page.locator('.header-actions');
    await expect(headerActions.getByRole('button', { name: '导出报告', exact: true })).toBeVisible();
    await expect(headerActions.getByRole('button', { name: '刷新数据', exact: true })).toBeVisible();
  });

  test('24. 当前用户信息显示测试', async ({ page }) => {
    await expect(page.getByText('当前用户')).toBeVisible();
    await expect(page.getByText('管理员')).toBeVisible();
  });

  test('25. 统计卡片悬停效果测试', async ({ page }) => {
    const firstCard = page.locator('.stat-card').first();
    await firstCard.hover();

    const boxShadow = await firstCard.evaluate((el) => {
      return window.getComputedStyle(el).boxShadow;
    });
    expect(boxShadow).not.toBe('none');
  });

  test('26. SLO 卡片状态标签测试', async ({ page }) => {
    await page.getByRole('button', { name: '🎯 SLO & 错误预算' }).click();
    await page.waitForTimeout(500);

    const statusBadges = page.locator('.slo-status-badge');
    await expect(statusBadges).toHaveCount(3);

    const statusTexts = ['健康', '警告', '危险'];
    for (const text of statusTexts) {
      await expect(page.getByText(text).first()).toBeVisible();
    }
  });

  test('27. SLO 摘要统计测试', async ({ page }) => {
    await page.getByRole('button', { name: '🎯 SLO & 错误预算' }).click();
    await page.waitForTimeout(500);

    const summaryItems = page.locator('.summary-item');
    await expect(summaryItems).toHaveCount(4);

    await expect(page.getByText('总错误预算')).toBeVisible();
    await expect(page.getByText('已消耗预算')).toBeVisible();
    await expect(page.getByText('剩余预算')).toBeVisible();
    await expect(page.getByText('预计耗尽时间')).toBeVisible();
  });

  test('28. 服务状态汇总测试', async ({ page }) => {
    await page.getByRole('button', { name: '🔗 服务依赖' }).click();
    await page.waitForTimeout(500);

    const statusSummary = page.locator('.service-status-summary');
    await expect(statusSummary).toBeVisible();

    await expect(statusSummary.getByText(/正常/)).toBeVisible();
    await expect(statusSummary.getByText(/警告/)).toBeVisible();
    await expect(statusSummary.getByText(/故障/)).toBeVisible();
  });

  test('29. 历史图表展示测试', async ({ page }) => {
    await page.getByRole('button', { name: '⏮️ 历史回放' }).click();
    await page.waitForTimeout(1000);

    await expect(page.getByText('30天历史趋势')).toBeVisible();
    await expect(page.getByText('SLA 合规率')).toBeVisible();
    await expect(page.getByText('平均响应时间')).toBeVisible();
  });

  test('30. 完整用户流程测试 - 从总览到导出', async ({ page }) => {
    await expect(page.getByRole('heading', { name: 'SLA 违约监控仪表盘' })).toBeVisible();

    await page.getByRole('button', { name: '🎯 SLO & 错误预算' }).click();
    await page.waitForTimeout(500);
    await expect(page.getByText('SLO 错误预算与燃尽率')).toBeVisible();

    await page.getByRole('button', { name: '🔗 服务依赖' }).click();
    await page.waitForTimeout(1000);
    await expect(page.locator('.react-flow-wrapper')).toBeVisible();

    await page.getByRole('button', { name: '⏮️ 历史回放' }).click();
    await page.waitForTimeout(500);
    await expect(page.getByText('历史数据回放')).toBeVisible();

    await page.getByRole('button', { name: '👥 团队权限' }).click();
    await page.waitForTimeout(500);
    await expect(page.getByText('团队与权限管理')).toBeVisible();

    await page.getByRole('button', { name: '📄 导出报告' }).click();
    await page.waitForTimeout(500);
    await expect(page.getByText('📄 导出 PDF 报告')).toBeVisible();

    await page.getByRole('button', { name: '📊 总览' }).click();
    await page.waitForTimeout(500);
    await expect(page.getByText('最近违约工单')).toBeVisible();
  });

  test('31. 告警管理页面加载测试', async ({ page }) => {
    await page.getByRole('button', { name: '🔔 告警管理' }).click();
    await page.waitForTimeout(500);

    await expect(page.getByRole('heading', { name: '🔔 告警管理与 Silencing' })).toBeVisible();

    const alertStats = page.locator('.alert-stat-item');
    await expect(alertStats).toHaveCount(4);

    await expect(page.locator('.alert-stats-row').getByText('告警规则总数')).toBeVisible();
    await expect(page.locator('.alert-stats-row').getByText('已启用')).toBeVisible();
    await expect(page.locator('.alert-stats-row').getByText('已静默')).toBeVisible();
    await expect(page.locator('.alert-stats-row').getByText('活动告警')).toBeVisible();
  });

  test('32. 告警规则与活动告警标签切换测试', async ({ page }) => {
    await page.getByRole('button', { name: '🔔 告警管理' }).click();
    await page.waitForTimeout(500);

    const alertTabs = page.locator('.alert-tabs .tab-btn');
    await expect(alertTabs).toHaveCount(2);

    await page.getByRole('button', { name: '⚡ 活动告警' }).click();
    await page.waitForTimeout(300);
    await expect(page.locator('.active-alerts-list')).toBeVisible();

    await page.getByRole('button', { name: '📋 告警规则' }).click();
    await page.waitForTimeout(300);
    await expect(page.locator('.alert-rules-list')).toBeVisible();
  });

  test('33. 告警规则列表展示测试', async ({ page }) => {
    await page.getByRole('button', { name: '🔔 告警管理' }).click();
    await page.waitForTimeout(500);

    const alertRules = page.locator('.alert-rule-item');
    await expect(alertRules).toHaveCount(6);

    const severityBadges = page.locator('.severity-badge');
    await expect(severityBadges.first()).toBeVisible();

    await expect(page.getByText('SLA 违约率超标')).toBeVisible();
    await expect(page.getByText('响应时间超时')).toBeVisible();
  });

  test('34. 告警 silencing 功能测试', async ({ page }) => {
    await page.getByRole('button', { name: '🔔 告警管理' }).click();
    await page.waitForTimeout(500);

    const silenceButtons = page.getByRole('button', { name: '静默告警' });
    const firstSilenceBtn = silenceButtons.first();
    await expect(firstSilenceBtn).toBeVisible();

    await firstSilenceBtn.click();
    await page.waitForTimeout(300);

    await expect(page.locator('.modal-overlay')).toBeVisible();
    await expect(page.getByText('静默告警规则')).toBeVisible();

    const durationSelect = page.locator('.silence-modal .form-select');
    await expect(durationSelect).toBeVisible();

    const reasonInput = page.locator('.silence-modal .form-textarea');
    await expect(reasonInput).toBeVisible();
    await reasonInput.fill('系统维护升级');

    await expect(page.getByRole('button', { name: '确认静默' })).toBeVisible();

    await page.getByRole('button', { name: '取消' }).click();
    await page.waitForTimeout(300);
    await expect(page.locator('.modal-overlay')).not.toBeVisible();
  });

  test('35. 已静默告警标识与解除测试', async ({ page }) => {
    await page.getByRole('button', { name: '🔔 告警管理' }).click();
    await page.waitForTimeout(500);

    const silencedBadge = page.locator('.silenced-badge');
    await expect(silencedBadge).toBeVisible();

    const unsilenceButtons = page.getByRole('button', { name: '解除静默' });
    await expect(unsilenceButtons.first()).toBeVisible();
  });

  test('36. 订阅推送页面加载测试', async ({ page }) => {
    await page.getByRole('button', { name: '📩 订阅推送' }).click();
    await page.waitForTimeout(500);

    await expect(page.getByText('📩 SLO 报表订阅推送')).toBeVisible();
    await expect(page.getByRole('button', { name: '+ 新建订阅' })).toBeVisible();

    const subStats = page.locator('.sub-stat-item');
    await expect(subStats).toHaveCount(4);
  });

  test('37. 订阅列表展示测试', async ({ page }) => {
    await page.getByRole('button', { name: '📩 订阅推送' }).click();
    await page.waitForTimeout(500);

    const subscriptions = page.locator('.subscription-item');
    await expect(subscriptions).toHaveCount(5);

    const typeBadges = page.locator('.sub-type-badge');
    await expect(typeBadges.first()).toBeVisible();

    await expect(page.getByText('每日 SLA 摘要')).toBeVisible();
    await expect(page.getByText('SLO 实时告警推送')).toBeVisible();
  });

  test('38. 订阅开关切换测试', async ({ page }) => {
    await page.getByRole('button', { name: '📩 订阅推送' }).click();
    await page.waitForTimeout(500);

    const toggleSliders = page.locator('.toggle-slider');
    const firstSlider = toggleSliders.first();
    
    const firstSwitch = page.locator('.toggle-switch input').first();
    const initialChecked = await firstSwitch.isChecked();
    
    await firstSlider.click();
    await page.waitForTimeout(300);
    
    const afterChecked = await firstSwitch.isChecked();
    expect(afterChecked).not.toBe(initialChecked);
  });

  test('39. 新建订阅弹窗测试', async ({ page }) => {
    await page.getByRole('button', { name: '📩 订阅推送' }).click();
    await page.waitForTimeout(500);

    await page.getByRole('button', { name: '+ 新建订阅' }).click();
    await page.waitForTimeout(300);

    await expect(page.locator('.modal-overlay')).toBeVisible();
    await expect(page.locator('.create-sub-modal').getByRole('heading', { name: '新建订阅' })).toBeVisible();

    const nameInput = page.locator('.create-sub-modal .form-input').first();
    await nameInput.fill('测试订阅');

    const typeSelect = page.locator('.create-sub-modal .form-select').first();
    await typeSelect.selectOption('weekly');

    const reportTypeSelect = page.locator('.create-sub-modal .form-select').nth(1);
    await reportTypeSelect.selectOption('full');

    await expect(page.locator('.channel-options')).toBeVisible();
    const channelOptions = page.locator('.channel-option');
    await expect(channelOptions).toHaveCount(3);

    const recipientInput = page.locator('.recipient-input-row .form-input').first();
    await recipientInput.fill('test@example.com');

    await expect(page.getByRole('button', { name: '创建订阅' })).toBeVisible();

    await page.getByRole('button', { name: '取消' }).click();
    await page.waitForTimeout(300);
    await expect(page.locator('.modal-overlay')).not.toBeVisible();
  });

  test('40. 订阅渠道多选测试', async ({ page }) => {
    await page.getByRole('button', { name: '📩 订阅推送' }).click();
    await page.waitForTimeout(500);

    await page.getByRole('button', { name: '+ 新建订阅' }).click();
    await page.waitForTimeout(300);

    const emailOption = page.locator('.channel-option').first();
    const webhookOption = page.locator('.channel-option').nth(1);

    const initialEmailChecked = await emailOption.evaluate(el => el.querySelector('input').checked);
    expect(initialEmailChecked).toBe(true);

    await webhookOption.click();
    
    const webhookChecked = await webhookOption.evaluate(el => el.querySelector('input').checked);
    expect(webhookChecked).toBe(true);

    await page.getByRole('button', { name: '取消' }).click();
  });

  test('41. 多 Metrics Backend 页面加载测试', async ({ page }) => {
    await page.getByRole('button', { name: '🔌 数据源' }).click();
    await page.waitForTimeout(500);

    await expect(page.getByRole('heading', { name: '🔌 多 Metrics Backend 适配' })).toBeVisible();
    await expect(page.locator('.backend-stats')).toBeVisible();
    await expect(page.locator('.backend-card').first().getByRole('heading', { name: 'Prometheus' })).toBeVisible();
  });

  test('42. Metrics Backend 列表展示测试', async ({ page }) => {
    await page.getByRole('button', { name: '🔌 数据源' }).click();
    await page.waitForTimeout(500);

    const backendCards = page.locator('.backend-card');
    await expect(backendCards).toHaveCount(4);

    await expect(backendCards.nth(0).getByRole('heading', { name: 'Prometheus' })).toBeVisible();
    await expect(backendCards.nth(1).getByRole('heading', { name: 'Datadog' })).toBeVisible();
    await expect(backendCards.nth(2).getByRole('heading', { name: 'Grafana Cloud' })).toBeVisible();
    await expect(backendCards.nth(3).getByRole('heading', { name: 'InfluxDB' })).toBeVisible();
  });

  test('43. 当前 Backend 标识测试', async ({ page }) => {
    await page.getByRole('button', { name: '🔌 数据源' }).click();
    await page.waitForTimeout(500);

    const currentBadge = page.locator('.current-badge');
    await expect(currentBadge).toHaveCount(1);
    await expect(currentBadge).toContainText('当前');

    const activeCard = page.locator('.backend-card.active');
    await expect(activeCard).toHaveCount(1);
  });

  test('44. 切换 Metrics Backend 测试', async ({ page }) => {
    await page.getByRole('button', { name: '🔌 数据源' }).click();
    await page.waitForTimeout(500);

    const datadogCard = page.locator('.backend-card').filter({ hasText: 'Datadog' });
    const switchButton = datadogCard.getByRole('button', { name: '切换' });
    
    await expect(switchButton).toBeVisible();
    
    await switchButton.click();
    await page.waitForTimeout(1000);

    const currentBadge = page.locator('.current-badge');
    const parentCard = currentBadge.locator('..').locator('..');
    await expect(parentCard).toContainText('Datadog');
  });

  test('45. Metrics Backend 连接测试功能', async ({ page }) => {
    await page.getByRole('button', { name: '🔌 数据源' }).click();
    await page.waitForTimeout(500);

    const firstCard = page.locator('.backend-card').first();
    const testButton = firstCard.getByRole('button', { name: '测试连接' });
    
    await expect(testButton).toBeVisible();
    
    await testButton.click();
    
    await page.waitForTimeout(1500);
    
    const testResult = firstCard.locator('.test-result');
    await expect(testResult).toBeVisible();
  });

  test('46. Metrics Backend 状态标识测试', async ({ page }) => {
    await page.getByRole('button', { name: '🔌 数据源' }).click();
    await page.waitForTimeout(500);

    const activeStatus = page.locator('.backend-status.status-active');
    await expect(activeStatus).toHaveCount(3);

    const inactiveStatus = page.locator('.backend-status.status-inactive');
    await expect(inactiveStatus).toHaveCount(1);
  });

  test('47. 自定义 Dashboard 视图页面加载测试', async ({ page }) => {
    await page.getByRole('button', { name: '🎛️ 视图管理' }).click();
    await page.waitForTimeout(500);

    await expect(page.getByText('🎛️ 自定义 Dashboard 视图')).toBeVisible();
    await expect(page.getByRole('button', { name: '✏️ 编辑视图' })).toBeVisible();
    await expect(page.getByRole('button', { name: '+ 新建视图' })).toBeVisible();
  });

  test('48. 视图标签页切换测试', async ({ page }) => {
    await page.getByRole('button', { name: '🎛️ 视图管理' }).click();
    await page.waitForTimeout(500);

    const viewTabs = page.locator('.view-tab');
    await expect(viewTabs).toHaveCount(4);

    await expect(page.locator('.view-tab.active')).toBeVisible();

    const opsView = page.getByRole('button', { name: /运维视图/ });
    await opsView.click();
    await page.waitForTimeout(300);
    
    const activeTab = page.locator('.view-tab.active');
    await expect(activeTab).toContainText('运维视图');
  });

  test('49. 视图编辑模式切换测试', async ({ page }) => {
    await page.getByRole('button', { name: '🎛️ 视图管理' }).click();
    await page.waitForTimeout(500);

    const editButton = page.getByRole('button', { name: '✏️ 编辑视图' });
    await editButton.click();
    await page.waitForTimeout(300);

    await expect(page.locator('.widget-picker')).toBeVisible();
    await expect(page.getByText('选择要显示的组件')).toBeVisible();

    const doneButton = page.getByRole('button', { name: '✓ 完成编辑' });
    await expect(doneButton).toBeVisible();
    await doneButton.click();
    await page.waitForTimeout(300);

    await expect(page.locator('.view-preview')).toBeVisible();
  });

  test('50. 新建视图弹窗测试', async ({ page }) => {
    await page.getByRole('button', { name: '🎛️ 视图管理' }).click();
    await page.waitForTimeout(500);

    await page.getByRole('button', { name: '+ 新建视图' }).click();
    await page.waitForTimeout(300);

    await expect(page.locator('.modal-overlay')).toBeVisible();
    await expect(page.getByText('新建 Dashboard 视图')).toBeVisible();

    const nameInput = page.locator('.modal-content .form-input');
    await nameInput.fill('我的自定义视图');

    const createButton = page.getByRole('button', { name: '创建' });
    await expect(createButton).toBeVisible();

    await createButton.click();
    await page.waitForTimeout(500);

    const viewTabs = page.locator('.view-tab');
    const countAfter = await viewTabs.count();
    expect(countAfter).toBe(5);
  });

  test('51. 视图管理列表测试', async ({ page }) => {
    await page.getByRole('button', { name: '🎛️ 视图管理' }).click();
    await page.waitForTimeout(500);

    await expect(page.getByText('📋 视图管理')).toBeVisible();

    const viewItems = page.locator('.view-item-manage');
    await expect(viewItems).toHaveCount(4);

    const defaultBadge = page.locator('.default-badge');
    await expect(defaultBadge).toHaveCount(1);
    await expect(defaultBadge).toContainText('默认');
  });

  test('52. 组件分类展示测试', async ({ page }) => {
    await page.getByRole('button', { name: '🎛️ 视图管理' }).click();
    await page.waitForTimeout(500);

    await page.getByRole('button', { name: '✏️ 编辑视图' }).click();
    await page.waitForTimeout(300);

    const categories = page.locator('.widget-category');
    await expect(categories).toHaveCount(8);

    const widgetOptions = page.locator('.widget-option');
    await expect(widgetOptions).toHaveCount(10);
  });

  test('53. 组件选择切换测试', async ({ page }) => {
    await page.getByRole('button', { name: '🎛️ 视图管理' }).click();
    await page.waitForTimeout(500);

    await page.getByRole('button', { name: '✏️ 编辑视图' }).click();
    await page.waitForTimeout(300);

    const firstWidget = page.locator('.widget-option').first();
    const initialSelected = await firstWidget.evaluate(el => el.classList.contains('selected'));

    await firstWidget.click();
    
    const afterSelected = await firstWidget.evaluate(el => el.classList.contains('selected'));
    expect(afterSelected).not.toBe(initialSelected);
  });

  test('54. 完整新功能导航流程测试 - 从告警到视图', async ({ page }) => {
    await expect(page.getByRole('heading', { name: 'SLA 违约监控仪表盘' })).toBeVisible();

    await page.getByRole('button', { name: '🔔 告警管理' }).click();
    await page.waitForTimeout(500);
    await expect(page.getByText('🔔 告警管理与 Silencing')).toBeVisible();

    await page.getByRole('button', { name: '📩 订阅推送' }).click();
    await page.waitForTimeout(500);
    await expect(page.getByText('📩 SLO 报表订阅推送')).toBeVisible();

    await page.getByRole('button', { name: '🔌 数据源' }).click();
    await page.waitForTimeout(500);
    await expect(page.getByText('🔌 多 Metrics Backend 适配')).toBeVisible();

    await page.getByRole('button', { name: '🎛️ 视图管理' }).click();
    await page.waitForTimeout(500);
    await expect(page.getByText('🎛️ 自定义 Dashboard 视图')).toBeVisible();

    await page.getByRole('button', { name: '📊 总览' }).click();
    await page.waitForTimeout(500);
    await expect(page.getByText('累计违约数量')).toBeVisible();
  });

  test('55. 订阅与多 backend 联动验证测试', async ({ page }) => {
    await page.getByRole('button', { name: '🔌 数据源' }).click();
    await page.waitForTimeout(500);

    const datadogCard = page.locator('.backend-card').filter({ hasText: 'Datadog' });
    await datadogCard.getByRole('button', { name: '切换' }).click();
    await page.waitForTimeout(1000);

    await page.getByRole('button', { name: '📩 订阅推送' }).click();
    await page.waitForTimeout(500);

    const subscriptions = page.locator('.subscription-item');
    await expect(subscriptions).toHaveCount(5);

    const firstToggleSlider = page.locator('.toggle-slider').first();
    const firstToggleInput = page.locator('.toggle-switch input').first();
    const initialChecked = await firstToggleInput.isChecked();
    
    await firstToggleSlider.click();
    await page.waitForTimeout(300);
    
    const afterChecked = await firstToggleInput.isChecked();
    expect(afterChecked).not.toBe(initialChecked);

    await page.getByRole('button', { name: '🔌 数据源' }).click();
    await page.waitForTimeout(500);
    
    const currentBadge = page.locator('.current-badge');
    const parentCard = currentBadge.locator('..').locator('..');
    await expect(parentCard).toContainText('Datadog');
  });
});
