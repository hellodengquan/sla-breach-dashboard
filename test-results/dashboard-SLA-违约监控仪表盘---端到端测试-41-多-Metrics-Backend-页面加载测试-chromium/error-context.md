# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: dashboard.spec.js >> SLA 违约监控仪表盘 - 端到端测试 >> 41. 多 Metrics Backend 页面加载测试
- Location: tests/e2e/dashboard.spec.js:609:3

# Error details

```
Error: expect(locator).toBeVisible() failed

Locator: getByText('Prometheus')
Expected: visible
Error: strict mode violation: getByText('Prometheus') resolved to 4 elements:
    1) <strong>Prometheus</strong> aka getByRole('strong').filter({ hasText: 'Prometheus' })
    2) <span class="backend-stat-value">Prometheus</span> aka locator('span').filter({ hasText: /^Prometheus$/ })
    3) <h4 class="backend-name">Prometheus</h4> aka getByRole('heading', { name: 'Prometheus' })
    4) <span class="backend-url">📍 http://prometheus.internal:9090</span> aka getByText('📍 http://prometheus.internal:')

Call log:
  - Expect "toBeVisible" with timeout 5000ms
  - waiting for getByText('Prometheus')

```

# Page snapshot

```yaml
- generic [ref=e1]:
  - generic [ref=e3]:
    - banner [ref=e4]:
      - generic [ref=e5]:
        - heading "SLA 违约监控仪表盘" [level=1] [ref=e6]
        - paragraph [ref=e7]:
          - text: "实时监控客服工单 SLA 超时情况 · 更新于 2026/6/15 14:32:22 · 当前用户:"
          - strong [ref=e8]: 张三
          - generic [ref=e9]: (管理员)
      - generic [ref=e10]:
        - button "导出报告" [ref=e11] [cursor=pointer]
        - button "刷新数据" [ref=e12] [cursor=pointer]
    - navigation [ref=e13]:
      - button "📊 总览" [ref=e14] [cursor=pointer]
      - button "🎯 SLO & 错误预算" [ref=e15] [cursor=pointer]
      - button "🔔 告警管理" [ref=e16] [cursor=pointer]
      - button "📩 订阅推送" [ref=e17] [cursor=pointer]
      - button "🔗 服务依赖" [ref=e18] [cursor=pointer]
      - button "⏮️ 历史回放" [ref=e19] [cursor=pointer]
      - button "🔌 数据源" [active] [ref=e20] [cursor=pointer]
      - button "🎛️ 视图管理" [ref=e21] [cursor=pointer]
      - button "👥 团队权限" [ref=e22] [cursor=pointer]
      - button "📄 导出报告" [ref=e23] [cursor=pointer]
    - main [ref=e24]:
      - generic [ref=e25]:
        - generic [ref=e26]:
          - heading "🔌 多 Metrics Backend 适配" [level=3] [ref=e27]
          - generic [ref=e28]:
            - text: "当前:"
            - strong [ref=e29]: Prometheus
        - generic [ref=e30]:
          - generic [ref=e31]:
            - generic [ref=e32]: "4"
            - generic [ref=e33]: 已配置后端
          - generic [ref=e34]:
            - generic [ref=e35]: "3"
            - generic [ref=e36]: 活跃后端
          - generic [ref=e37]:
            - generic [ref=e38]: Prometheus
            - generic [ref=e39]: 当前使用
        - generic [ref=e40]:
          - generic [ref=e41]:
            - generic [ref=e42]:
              - generic [ref=e43]:
                - generic [ref=e44]: 📊
                - generic [ref=e45]:
                  - heading "Prometheus" [level=4] [ref=e46]
                  - text: ● 活跃
              - generic [ref=e47]: 当前
            - generic [ref=e48]:
              - paragraph [ref=e49]: 主要指标存储后端
              - generic [ref=e50]:
                - generic [ref=e51]: 📍 http://prometheus.internal:9090
                - generic [ref=e52]: "同步: 2026-06-15 13:00:00"
            - button "测试连接" [ref=e54] [cursor=pointer]
          - generic [ref=e55]:
            - generic [ref=e57]:
              - generic [ref=e58]: 🐶
              - generic [ref=e59]:
                - heading "Datadog" [level=4] [ref=e60]
                - text: ● 活跃
            - generic [ref=e61]:
              - paragraph [ref=e62]: 云原生监控平台
              - generic [ref=e63]:
                - generic [ref=e64]: 📍 https://api.datadoghq.com
                - generic [ref=e65]: "同步: 2026-06-15 13:00:00"
            - generic [ref=e66]:
              - button "测试连接" [ref=e67] [cursor=pointer]
              - button "切换" [ref=e68] [cursor=pointer]
          - generic [ref=e69]:
            - generic [ref=e71]:
              - generic [ref=e72]: 📈
              - generic [ref=e73]:
                - heading "Grafana Cloud" [level=4] [ref=e74]
                - text: ● 活跃
            - generic [ref=e75]:
              - paragraph [ref=e76]: 托管式 Grafana 实例
              - generic [ref=e77]:
                - generic [ref=e78]: 📍 https://grafana.grafana.net
                - generic [ref=e79]: "同步: 2026-06-15 12:55:00"
            - generic [ref=e80]:
              - button "测试连接" [ref=e81] [cursor=pointer]
              - button "切换" [ref=e82] [cursor=pointer]
          - generic [ref=e83]:
            - generic [ref=e85]:
              - generic [ref=e86]: ⏱️
              - generic [ref=e87]:
                - heading "InfluxDB" [level=4] [ref=e88]
                - text: ○ 未启用
            - generic [ref=e89]:
              - paragraph [ref=e90]: 时序数据库（备用）
              - generic [ref=e91]:
                - generic [ref=e92]: 📍 http://influxdb.internal:8086
                - generic [ref=e93]: "同步: 2026-06-10 00:00:00"
            - generic [ref=e94]:
              - button "测试连接" [disabled] [ref=e95]
              - button "切换" [disabled] [ref=e96]
        - generic [ref=e97]:
          - heading "💡 适配说明" [level=4] [ref=e98]
          - list [ref=e99]:
            - listitem [ref=e100]:
              - text: ✓
              - strong [ref=e101]: "统一查询接口:"
              - text: 通过统一的 metrics API 抽象层对接不同后端
            - listitem [ref=e102]:
              - text: ✓
              - strong [ref=e103]: "自动故障转移:"
              - text: 主后端不可用时自动切换到备用后端
            - listitem [ref=e104]:
              - text: ✓
              - strong [ref=e105]: "数据聚合:"
              - text: 支持从多个后端聚合指标数据
            - listitem [ref=e106]:
              - text: ✓
              - strong [ref=e107]: "缓存策略:"
              - text: 智能缓存减少后端查询压力
  - generic [ref=e108]: "0"
```

# Test source

```ts
  515 |   test('36. 订阅推送页面加载测试', async ({ page }) => {
  516 |     await page.getByRole('button', { name: '📩 订阅推送' }).click();
  517 |     await page.waitForTimeout(500);
  518 | 
  519 |     await expect(page.getByText('📩 SLO 报表订阅推送')).toBeVisible();
  520 |     await expect(page.getByRole('button', { name: '+ 新建订阅' })).toBeVisible();
  521 | 
  522 |     const subStats = page.locator('.sub-stat-item');
  523 |     await expect(subStats).toHaveCount(4);
  524 |   });
  525 | 
  526 |   test('37. 订阅列表展示测试', async ({ page }) => {
  527 |     await page.getByRole('button', { name: '📩 订阅推送' }).click();
  528 |     await page.waitForTimeout(500);
  529 | 
  530 |     const subscriptions = page.locator('.subscription-item');
  531 |     await expect(subscriptions).toHaveCount(5);
  532 | 
  533 |     const typeBadges = page.locator('.sub-type-badge');
  534 |     await expect(typeBadges.first()).toBeVisible();
  535 | 
  536 |     await expect(page.getByText('每日 SLA 摘要')).toBeVisible();
  537 |     await expect(page.getByText('SLO 实时告警推送')).toBeVisible();
  538 |   });
  539 | 
  540 |   test('38. 订阅开关切换测试', async ({ page }) => {
  541 |     await page.getByRole('button', { name: '📩 订阅推送' }).click();
  542 |     await page.waitForTimeout(500);
  543 | 
  544 |     const toggleSwitches = page.locator('.toggle-switch input');
  545 |     const firstSwitch = toggleSwitches.first();
  546 |     
  547 |     const initialChecked = await firstSwitch.isChecked();
  548 |     
  549 |     await firstSwitch.click();
  550 |     
  551 |     const afterChecked = await firstSwitch.isChecked();
  552 |     expect(afterChecked).not.toBe(initialChecked);
  553 |   });
  554 | 
  555 |   test('39. 新建订阅弹窗测试', async ({ page }) => {
  556 |     await page.getByRole('button', { name: '📩 订阅推送' }).click();
  557 |     await page.waitForTimeout(500);
  558 | 
  559 |     await page.getByRole('button', { name: '+ 新建订阅' }).click();
  560 |     await page.waitForTimeout(300);
  561 | 
  562 |     await expect(page.locator('.modal-overlay')).toBeVisible();
  563 |     await expect(page.getByText('新建订阅')).toBeVisible();
  564 | 
  565 |     const nameInput = page.locator('.create-sub-modal .form-input').first();
  566 |     await nameInput.fill('测试订阅');
  567 | 
  568 |     const typeSelect = page.locator('.create-sub-modal .form-select').first();
  569 |     await typeSelect.selectOption('weekly');
  570 | 
  571 |     const reportTypeSelect = page.locator('.create-sub-modal .form-select').nth(1);
  572 |     await reportTypeSelect.selectOption('full');
  573 | 
  574 |     await expect(page.locator('.channel-options')).toBeVisible();
  575 |     const channelOptions = page.locator('.channel-option');
  576 |     await expect(channelOptions).toHaveCount(3);
  577 | 
  578 |     const recipientInput = page.locator('.recipient-input-row .form-input').first();
  579 |     await recipientInput.fill('test@example.com');
  580 | 
  581 |     await expect(page.getByRole('button', { name: '创建订阅' })).toBeVisible();
  582 | 
  583 |     await page.getByRole('button', { name: '取消' }).click();
  584 |     await page.waitForTimeout(300);
  585 |     await expect(page.locator('.modal-overlay')).not.toBeVisible();
  586 |   });
  587 | 
  588 |   test('40. 订阅渠道多选测试', async ({ page }) => {
  589 |     await page.getByRole('button', { name: '📩 订阅推送' }).click();
  590 |     await page.waitForTimeout(500);
  591 | 
  592 |     await page.getByRole('button', { name: '+ 新建订阅' }).click();
  593 |     await page.waitForTimeout(300);
  594 | 
  595 |     const emailOption = page.locator('.channel-option').first();
  596 |     const webhookOption = page.locator('.channel-option').nth(1);
  597 | 
  598 |     const initialEmailChecked = await emailOption.evaluate(el => el.querySelector('input').checked);
  599 |     expect(initialEmailChecked).toBe(true);
  600 | 
  601 |     await webhookOption.click();
  602 |     
  603 |     const webhookChecked = await webhookOption.evaluate(el => el.querySelector('input').checked);
  604 |     expect(webhookChecked).toBe(true);
  605 | 
  606 |     await page.getByRole('button', { name: '取消' }).click();
  607 |   });
  608 | 
  609 |   test('41. 多 Metrics Backend 页面加载测试', async ({ page }) => {
  610 |     await page.getByRole('button', { name: '🔌 数据源' }).click();
  611 |     await page.waitForTimeout(500);
  612 | 
  613 |     await expect(page.getByText('🔌 多 Metrics Backend 适配')).toBeVisible();
  614 |     await expect(page.getByText(/当前:/)).toBeVisible();
> 615 |     await expect(page.getByText('Prometheus')).toBeVisible();
      |                                                ^ Error: expect(locator).toBeVisible() failed
  616 |   });
  617 | 
  618 |   test('42. Metrics Backend 列表展示测试', async ({ page }) => {
  619 |     await page.getByRole('button', { name: '🔌 数据源' }).click();
  620 |     await page.waitForTimeout(500);
  621 | 
  622 |     const backendCards = page.locator('.backend-card');
  623 |     await expect(backendCards).toHaveCount(4);
  624 | 
  625 |     await expect(page.getByText('Prometheus')).toBeVisible();
  626 |     await expect(page.getByText('Datadog')).toBeVisible();
  627 |     await expect(page.getByText('Grafana Cloud')).toBeVisible();
  628 |     await expect(page.getByText('InfluxDB')).toBeVisible();
  629 |   });
  630 | 
  631 |   test('43. 当前 Backend 标识测试', async ({ page }) => {
  632 |     await page.getByRole('button', { name: '🔌 数据源' }).click();
  633 |     await page.waitForTimeout(500);
  634 | 
  635 |     const currentBadge = page.locator('.current-badge');
  636 |     await expect(currentBadge).toHaveCount(1);
  637 |     await expect(currentBadge).toContainText('当前');
  638 | 
  639 |     const activeCard = page.locator('.backend-card.active');
  640 |     await expect(activeCard).toHaveCount(1);
  641 |   });
  642 | 
  643 |   test('44. 切换 Metrics Backend 测试', async ({ page }) => {
  644 |     await page.getByRole('button', { name: '🔌 数据源' }).click();
  645 |     await page.waitForTimeout(500);
  646 | 
  647 |     const datadogCard = page.locator('.backend-card').filter({ hasText: 'Datadog' });
  648 |     const switchButton = datadogCard.getByRole('button', { name: '切换' });
  649 |     
  650 |     await expect(switchButton).toBeVisible();
  651 |     
  652 |     await switchButton.click();
  653 |     await page.waitForTimeout(1000);
  654 | 
  655 |     const currentBadge = page.locator('.current-badge');
  656 |     const parentCard = currentBadge.locator('..').locator('..');
  657 |     await expect(parentCard).toContainText('Datadog');
  658 |   });
  659 | 
  660 |   test('45. Metrics Backend 连接测试功能', async ({ page }) => {
  661 |     await page.getByRole('button', { name: '🔌 数据源' }).click();
  662 |     await page.waitForTimeout(500);
  663 | 
  664 |     const firstCard = page.locator('.backend-card').first();
  665 |     const testButton = firstCard.getByRole('button', { name: '测试连接' });
  666 |     
  667 |     await expect(testButton).toBeVisible();
  668 |     
  669 |     await testButton.click();
  670 |     
  671 |     await page.waitForTimeout(1500);
  672 |     
  673 |     const testResult = firstCard.locator('.test-result');
  674 |     await expect(testResult).toBeVisible();
  675 |   });
  676 | 
  677 |   test('46. Metrics Backend 状态标识测试', async ({ page }) => {
  678 |     await page.getByRole('button', { name: '🔌 数据源' }).click();
  679 |     await page.waitForTimeout(500);
  680 | 
  681 |     const activeStatus = page.locator('.backend-status.status-active');
  682 |     await expect(activeStatus).toHaveCount(3);
  683 | 
  684 |     const inactiveStatus = page.locator('.backend-status.status-inactive');
  685 |     await expect(inactiveStatus).toHaveCount(1);
  686 |   });
  687 | 
  688 |   test('47. 自定义 Dashboard 视图页面加载测试', async ({ page }) => {
  689 |     await page.getByRole('button', { name: '🎛️ 视图管理' }).click();
  690 |     await page.waitForTimeout(500);
  691 | 
  692 |     await expect(page.getByText('🎛️ 自定义 Dashboard 视图')).toBeVisible();
  693 |     await expect(page.getByRole('button', { name: '✏️ 编辑视图' })).toBeVisible();
  694 |     await expect(page.getByRole('button', { name: '+ 新建视图' })).toBeVisible();
  695 |   });
  696 | 
  697 |   test('48. 视图标签页切换测试', async ({ page }) => {
  698 |     await page.getByRole('button', { name: '🎛️ 视图管理' }).click();
  699 |     await page.waitForTimeout(500);
  700 | 
  701 |     const viewTabs = page.locator('.view-tab');
  702 |     await expect(viewTabs).toHaveCount(4);
  703 | 
  704 |     await expect(page.locator('.view-tab.active')).toBeVisible();
  705 | 
  706 |     const opsView = page.getByRole('button', { name: /运维视图/ });
  707 |     await opsView.click();
  708 |     await page.waitForTimeout(300);
  709 |     
  710 |     const activeTab = page.locator('.view-tab.active');
  711 |     await expect(activeTab).toContainText('运维视图');
  712 |   });
  713 | 
  714 |   test('49. 视图编辑模式切换测试', async ({ page }) => {
  715 |     await page.getByRole('button', { name: '🎛️ 视图管理' }).click();
```