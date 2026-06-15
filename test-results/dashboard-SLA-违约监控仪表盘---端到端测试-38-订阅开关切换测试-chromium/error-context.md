# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: dashboard.spec.js >> SLA 违约监控仪表盘 - 端到端测试 >> 38. 订阅开关切换测试
- Location: tests/e2e/dashboard.spec.js:540:3

# Error details

```
Test timeout of 30000ms exceeded.
```

```
Error: locator.click: Test timeout of 30000ms exceeded.
Call log:
  - waiting for locator('.toggle-switch input').first()
    - locator resolved to <input checked type="checkbox"/>
  - attempting click action
    2 × waiting for element to be visible, enabled and stable
      - element is not visible
    - retrying click action
    - waiting 20ms
    2 × waiting for element to be visible, enabled and stable
      - element is not visible
    - retrying click action
      - waiting 100ms
    53 × waiting for element to be visible, enabled and stable
       - element is not visible
     - retrying click action
       - waiting 500ms
    - waiting for element to be visible, enabled and stable

```

# Page snapshot

```yaml
- generic [ref=e1]:
  - generic [ref=e3]:
    - banner [ref=e4]:
      - generic [ref=e5]:
        - heading "SLA 违约监控仪表盘" [level=1] [ref=e6]
        - paragraph [ref=e7]:
          - text: "实时监控客服工单 SLA 超时情况 · 更新于 2026/6/15 14:32:20 · 当前用户:"
          - strong [ref=e8]: 张三
          - generic [ref=e9]: (管理员)
      - generic [ref=e10]:
        - button "导出报告" [ref=e11] [cursor=pointer]
        - button "刷新数据" [ref=e12] [cursor=pointer]
    - navigation [ref=e13]:
      - button "📊 总览" [ref=e14] [cursor=pointer]
      - button "🎯 SLO & 错误预算" [ref=e15] [cursor=pointer]
      - button "🔔 告警管理" [ref=e16] [cursor=pointer]
      - button "📩 订阅推送" [active] [ref=e17] [cursor=pointer]
      - button "🔗 服务依赖" [ref=e18] [cursor=pointer]
      - button "⏮️ 历史回放" [ref=e19] [cursor=pointer]
      - button "🔌 数据源" [ref=e20] [cursor=pointer]
      - button "🎛️ 视图管理" [ref=e21] [cursor=pointer]
      - button "👥 团队权限" [ref=e22] [cursor=pointer]
      - button "📄 导出报告" [ref=e23] [cursor=pointer]
    - main [ref=e24]:
      - generic [ref=e25]:
        - generic [ref=e26]:
          - heading "📩 SLO 报表订阅推送" [level=3] [ref=e27]
          - button "+ 新建订阅" [ref=e28] [cursor=pointer]
        - generic [ref=e29]:
          - generic [ref=e30]:
            - generic [ref=e31]: "5"
            - generic [ref=e32]: 订阅总数
          - generic [ref=e33]:
            - generic [ref=e34]: "4"
            - generic [ref=e35]: 已启用
          - generic [ref=e36]:
            - generic [ref=e37]: "5"
            - generic [ref=e38]: 📧 邮件推送
          - generic [ref=e39]:
            - generic [ref=e40]: "2"
            - generic [ref=e41]: 🔗 Webhook
        - generic [ref=e42]:
          - generic [ref=e43]:
            - generic [ref=e44]:
              - generic [ref=e45]:
                - generic [ref=e46]: 日报
                - strong [ref=e47]: 每日 SLA 摘要
                - generic [ref=e48]: 摘要报告
              - generic [ref=e49]:
                - generic [ref=e50]:
                  - checkbox [checked]
                - button "🗑️" [ref=e52] [cursor=pointer]
            - generic [ref=e53]:
              - generic [ref=e55]: 📧 邮件
              - generic [ref=e57]: "收件人: zhangsan@example.com, lisi@example.com"
              - generic [ref=e58]: "上次发送: 2026-06-15 09:00:00"
              - generic [ref=e59]: 每日 09:00
          - generic [ref=e60]:
            - generic [ref=e61]:
              - generic [ref=e62]:
                - generic [ref=e63]: 实时告警
                - strong [ref=e64]: SLO 实时告警推送
                - generic [ref=e65]: 告警报告
              - generic [ref=e66]:
                - generic [ref=e67]:
                  - checkbox [checked]
                - button "🗑️" [ref=e69] [cursor=pointer]
            - generic [ref=e70]:
              - generic [ref=e71]:
                - generic [ref=e72]: 📧 邮件
                - generic [ref=e73]: 🔗 Webhook
              - generic [ref=e75]: "收件人: wangwu@example.com"
          - generic [ref=e76]:
            - generic [ref=e77]:
              - generic [ref=e78]:
                - generic [ref=e79]: 周报
                - strong [ref=e80]: 周度运维周报
                - generic [ref=e81]: 完整报告
              - generic [ref=e82]:
                - generic [ref=e83]:
                  - checkbox [checked]
                - button "🗑️" [ref=e85] [cursor=pointer]
            - generic [ref=e86]:
              - generic [ref=e88]: 📧 邮件
              - generic [ref=e90]: "收件人: all@example.com"
              - generic [ref=e91]: "上次发送: 2026-06-09 10:00:00"
              - generic [ref=e92]: 每周 10:00
          - generic [ref=e93]:
            - generic [ref=e94]:
              - generic [ref=e95]:
                - generic [ref=e96]: 月报
                - strong [ref=e97]: 月度管理报告
                - generic [ref=e98]: 完整报告
              - generic [ref=e99]:
                - generic [ref=e100]:
                  - checkbox
                - button "🗑️" [ref=e102] [cursor=pointer]
            - generic [ref=e103]:
              - generic [ref=e105]: 📧 邮件
              - generic [ref=e107]: "收件人: management@example.com"
              - generic [ref=e108]: 每月 08:00
          - generic [ref=e109]:
            - generic [ref=e110]:
              - generic [ref=e111]:
                - generic [ref=e112]: 预算告警
                - strong [ref=e113]: 错误预算耗尽预警
                - generic [ref=e114]: 告警报告
              - generic [ref=e115]:
                - generic [ref=e116]:
                  - checkbox [checked]
                - button "🗑️" [ref=e118] [cursor=pointer]
            - generic [ref=e119]:
              - generic [ref=e120]:
                - generic [ref=e121]: 📧 邮件
                - generic [ref=e122]: 🔗 Webhook
              - generic [ref=e124]: "收件人: oncall@example.com"
  - generic [ref=e125]: "0"
```

# Test source

```ts
  449 | 
  450 |     const alertTabs = page.locator('.alert-tabs .tab-btn');
  451 |     await expect(alertTabs).toHaveCount(2);
  452 | 
  453 |     await page.getByRole('button', { name: '⚡ 活动告警' }).click();
  454 |     await page.waitForTimeout(300);
  455 |     await expect(page.locator('.active-alerts-list')).toBeVisible();
  456 | 
  457 |     await page.getByRole('button', { name: '📋 告警规则' }).click();
  458 |     await page.waitForTimeout(300);
  459 |     await expect(page.locator('.alert-rules-list')).toBeVisible();
  460 |   });
  461 | 
  462 |   test('33. 告警规则列表展示测试', async ({ page }) => {
  463 |     await page.getByRole('button', { name: '🔔 告警管理' }).click();
  464 |     await page.waitForTimeout(500);
  465 | 
  466 |     const alertRules = page.locator('.alert-rule-item');
  467 |     await expect(alertRules).toHaveCount(6);
  468 | 
  469 |     const severityBadges = page.locator('.severity-badge');
  470 |     await expect(severityBadges.first()).toBeVisible();
  471 | 
  472 |     await expect(page.getByText('SLA 违约率超标')).toBeVisible();
  473 |     await expect(page.getByText('响应时间超时')).toBeVisible();
  474 |   });
  475 | 
  476 |   test('34. 告警 silencing 功能测试', async ({ page }) => {
  477 |     await page.getByRole('button', { name: '🔔 告警管理' }).click();
  478 |     await page.waitForTimeout(500);
  479 | 
  480 |     const silenceButtons = page.getByRole('button', { name: '静默告警' });
  481 |     const firstSilenceBtn = silenceButtons.first();
  482 |     await expect(firstSilenceBtn).toBeVisible();
  483 | 
  484 |     await firstSilenceBtn.click();
  485 |     await page.waitForTimeout(300);
  486 | 
  487 |     await expect(page.locator('.modal-overlay')).toBeVisible();
  488 |     await expect(page.getByText('静默告警规则')).toBeVisible();
  489 | 
  490 |     const durationSelect = page.locator('.silence-modal .form-select');
  491 |     await expect(durationSelect).toBeVisible();
  492 | 
  493 |     const reasonInput = page.locator('.silence-modal .form-textarea');
  494 |     await expect(reasonInput).toBeVisible();
  495 |     await reasonInput.fill('系统维护升级');
  496 | 
  497 |     await expect(page.getByRole('button', { name: '确认静默' })).toBeVisible();
  498 | 
  499 |     await page.getByRole('button', { name: '取消' }).click();
  500 |     await page.waitForTimeout(300);
  501 |     await expect(page.locator('.modal-overlay')).not.toBeVisible();
  502 |   });
  503 | 
  504 |   test('35. 已静默告警标识与解除测试', async ({ page }) => {
  505 |     await page.getByRole('button', { name: '🔔 告警管理' }).click();
  506 |     await page.waitForTimeout(500);
  507 | 
  508 |     const silencedBadge = page.locator('.silenced-badge');
  509 |     await expect(silencedBadge).toBeVisible();
  510 | 
  511 |     const unsilenceButtons = page.getByRole('button', { name: '解除静默' });
  512 |     await expect(unsilenceButtons.first()).toBeVisible();
  513 |   });
  514 | 
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
> 549 |     await firstSwitch.click();
      |                       ^ Error: locator.click: Test timeout of 30000ms exceeded.
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
  615 |     await expect(page.getByText('Prometheus')).toBeVisible();
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
```