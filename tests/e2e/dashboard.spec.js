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
});
