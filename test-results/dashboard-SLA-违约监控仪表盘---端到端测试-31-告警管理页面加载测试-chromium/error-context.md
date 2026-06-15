# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: dashboard.spec.js >> SLA 违约监控仪表盘 - 端到端测试 >> 31. 告警管理页面加载测试
- Location: tests/e2e/dashboard.spec.js:431:3

# Error details

```
Error: expect(locator).toBeVisible() failed

Locator: getByText('已静默')
Expected: visible
Error: strict mode violation: getByText('已静默') resolved to 3 elements:
    1) <span class="chart-subtitle">3 个活动告警 · 1 个已静默</span> aka getByText('个活动告警 · 1 个已静默')
    2) <span class="alert-stat-label">已静默</span> aka getByText('已静默', { exact: true })
    3) <span class="silenced-badge">🔇 已静默</span> aka getByText('🔇 已静默')

Call log:
  - Expect "toBeVisible" with timeout 5000ms
  - waiting for getByText('已静默')

```

# Page snapshot

```yaml
- generic [ref=e1]:
  - generic [ref=e3]:
    - banner [ref=e4]:
      - generic [ref=e5]:
        - heading "SLA 违约监控仪表盘" [level=1] [ref=e6]
        - paragraph [ref=e7]:
          - text: "实时监控客服工单 SLA 超时情况 · 更新于 2026/6/15 14:32:14 · 当前用户:"
          - strong [ref=e8]: 张三
          - generic [ref=e9]: (管理员)
      - generic [ref=e10]:
        - button "导出报告" [ref=e11] [cursor=pointer]
        - button "刷新数据" [ref=e12] [cursor=pointer]
    - navigation [ref=e13]:
      - button "📊 总览" [ref=e14] [cursor=pointer]
      - button "🎯 SLO & 错误预算" [ref=e15] [cursor=pointer]
      - button "🔔 告警管理" [active] [ref=e16] [cursor=pointer]
      - button "📩 订阅推送" [ref=e17] [cursor=pointer]
      - button "🔗 服务依赖" [ref=e18] [cursor=pointer]
      - button "⏮️ 历史回放" [ref=e19] [cursor=pointer]
      - button "🔌 数据源" [ref=e20] [cursor=pointer]
      - button "🎛️ 视图管理" [ref=e21] [cursor=pointer]
      - button "👥 团队权限" [ref=e22] [cursor=pointer]
      - button "📄 导出报告" [ref=e23] [cursor=pointer]
    - main [ref=e24]:
      - generic [ref=e25]:
        - generic [ref=e26]:
          - heading "🔔 告警管理与 Silencing" [level=3] [ref=e27]
          - generic [ref=e28]: 3 个活动告警 · 1 个已静默
        - generic [ref=e29]:
          - generic [ref=e30]:
            - generic [ref=e31]: "6"
            - generic [ref=e32]: 告警规则总数
          - generic [ref=e33]:
            - generic [ref=e34]: "5"
            - generic [ref=e35]: 已启用
          - generic [ref=e36]:
            - generic [ref=e37]: "1"
            - generic [ref=e38]: 已静默
          - generic [ref=e39]:
            - generic [ref=e40]: "3"
            - generic [ref=e41]: 活动告警
        - generic [ref=e42]:
          - button "📋 告警规则" [ref=e43] [cursor=pointer]
          - button "⚡ 活动告警" [ref=e44] [cursor=pointer]
        - generic [ref=e45]:
          - generic [ref=e46]:
            - generic [ref=e47]:
              - generic [ref=e48]:
                - generic [ref=e49]: 严重
                - generic [ref=e50]: SLA 违约率超标
              - generic [ref=e51]:
                - button "⏸️" [ref=e52] [cursor=pointer]
                - button "静默告警" [ref=e53] [cursor=pointer]
            - generic [ref=e54]:
              - generic [ref=e55]: "指标: breach_rate"
              - generic [ref=e56]: "条件: > 10"
          - generic [ref=e57]:
            - generic [ref=e58]:
              - generic [ref=e59]:
                - generic [ref=e60]: 高
                - generic [ref=e61]: 响应时间超时
              - generic [ref=e62]:
                - button "⏸️" [ref=e63] [cursor=pointer]
                - button "静默告警" [ref=e64] [cursor=pointer]
            - generic [ref=e65]:
              - generic [ref=e66]: "指标: avg_response_time"
              - generic [ref=e67]: "条件: > 30"
          - generic [ref=e68]:
            - generic [ref=e69]:
              - generic [ref=e70]:
                - generic [ref=e71]: 警告
                - generic [ref=e72]: 工单积压预警
                - generic [ref=e73]: 🔇 已静默
              - generic [ref=e74]:
                - button "⏸️" [ref=e75] [cursor=pointer]
                - button "解除静默" [ref=e76] [cursor=pointer]
            - generic [ref=e77]:
              - generic [ref=e78]: "指标: pending_tickets"
              - generic [ref=e79]: "条件: > 200"
              - generic [ref=e80]: "静默原因: 系统升级维护 · 至 2026/6/16 08:00:00"
          - generic [ref=e81]:
            - generic [ref=e82]:
              - generic [ref=e83]:
                - generic [ref=e84]: 高
                - generic [ref=e85]: 错误预算耗尽警告
              - generic [ref=e86]:
                - button "⏸️" [ref=e87] [cursor=pointer]
                - button "静默告警" [ref=e88] [cursor=pointer]
            - generic [ref=e89]:
              - generic [ref=e90]: "指标: error_budget_remaining"
              - generic [ref=e91]: "条件: < 20"
          - generic [ref=e92]:
            - generic [ref=e93]:
              - generic [ref=e94]:
                - generic [ref=e95]: 严重
                - generic [ref=e96]: 服务可用性下降
              - generic [ref=e97]:
                - button "⏸️" [ref=e98] [cursor=pointer]
                - button "静默告警" [ref=e99] [cursor=pointer]
            - generic [ref=e100]:
              - generic [ref=e101]: "指标: availability"
              - generic [ref=e102]: "条件: < 99"
          - generic [ref=e103]:
            - generic [ref=e104]:
              - generic [ref=e105]:
                - generic [ref=e106]: 高
                - generic [ref=e107]: 数据库连接异常
                - generic [ref=e108]: ⏸️ 已停用
              - generic [ref=e109]:
                - button "▶️" [ref=e110] [cursor=pointer]
                - button "静默告警" [ref=e111] [cursor=pointer]
            - generic [ref=e112]:
              - generic [ref=e113]: "指标: db_connection_errors"
              - generic [ref=e114]: "条件: > 5"
  - generic [ref=e115]: "0"
```

# Test source

```ts
  342 |     await expect(page.getByText('当前用户')).toBeVisible();
  343 |     await expect(page.getByText('管理员')).toBeVisible();
  344 |   });
  345 | 
  346 |   test('25. 统计卡片悬停效果测试', async ({ page }) => {
  347 |     const firstCard = page.locator('.stat-card').first();
  348 |     await firstCard.hover();
  349 | 
  350 |     const boxShadow = await firstCard.evaluate((el) => {
  351 |       return window.getComputedStyle(el).boxShadow;
  352 |     });
  353 |     expect(boxShadow).not.toBe('none');
  354 |   });
  355 | 
  356 |   test('26. SLO 卡片状态标签测试', async ({ page }) => {
  357 |     await page.getByRole('button', { name: '🎯 SLO & 错误预算' }).click();
  358 |     await page.waitForTimeout(500);
  359 | 
  360 |     const statusBadges = page.locator('.slo-status-badge');
  361 |     await expect(statusBadges).toHaveCount(3);
  362 | 
  363 |     const statusTexts = ['健康', '警告', '危险'];
  364 |     for (const text of statusTexts) {
  365 |       await expect(page.getByText(text).first()).toBeVisible();
  366 |     }
  367 |   });
  368 | 
  369 |   test('27. SLO 摘要统计测试', async ({ page }) => {
  370 |     await page.getByRole('button', { name: '🎯 SLO & 错误预算' }).click();
  371 |     await page.waitForTimeout(500);
  372 | 
  373 |     const summaryItems = page.locator('.summary-item');
  374 |     await expect(summaryItems).toHaveCount(4);
  375 | 
  376 |     await expect(page.getByText('总错误预算')).toBeVisible();
  377 |     await expect(page.getByText('已消耗预算')).toBeVisible();
  378 |     await expect(page.getByText('剩余预算')).toBeVisible();
  379 |     await expect(page.getByText('预计耗尽时间')).toBeVisible();
  380 |   });
  381 | 
  382 |   test('28. 服务状态汇总测试', async ({ page }) => {
  383 |     await page.getByRole('button', { name: '🔗 服务依赖' }).click();
  384 |     await page.waitForTimeout(500);
  385 | 
  386 |     const statusSummary = page.locator('.service-status-summary');
  387 |     await expect(statusSummary).toBeVisible();
  388 | 
  389 |     await expect(statusSummary.getByText(/正常/)).toBeVisible();
  390 |     await expect(statusSummary.getByText(/警告/)).toBeVisible();
  391 |     await expect(statusSummary.getByText(/故障/)).toBeVisible();
  392 |   });
  393 | 
  394 |   test('29. 历史图表展示测试', async ({ page }) => {
  395 |     await page.getByRole('button', { name: '⏮️ 历史回放' }).click();
  396 |     await page.waitForTimeout(1000);
  397 | 
  398 |     await expect(page.getByText('30天历史趋势')).toBeVisible();
  399 |     await expect(page.getByText('SLA 合规率')).toBeVisible();
  400 |     await expect(page.getByText('平均响应时间')).toBeVisible();
  401 |   });
  402 | 
  403 |   test('30. 完整用户流程测试 - 从总览到导出', async ({ page }) => {
  404 |     await expect(page.getByRole('heading', { name: 'SLA 违约监控仪表盘' })).toBeVisible();
  405 | 
  406 |     await page.getByRole('button', { name: '🎯 SLO & 错误预算' }).click();
  407 |     await page.waitForTimeout(500);
  408 |     await expect(page.getByText('SLO 错误预算与燃尽率')).toBeVisible();
  409 | 
  410 |     await page.getByRole('button', { name: '🔗 服务依赖' }).click();
  411 |     await page.waitForTimeout(1000);
  412 |     await expect(page.locator('.react-flow-wrapper')).toBeVisible();
  413 | 
  414 |     await page.getByRole('button', { name: '⏮️ 历史回放' }).click();
  415 |     await page.waitForTimeout(500);
  416 |     await expect(page.getByText('历史数据回放')).toBeVisible();
  417 | 
  418 |     await page.getByRole('button', { name: '👥 团队权限' }).click();
  419 |     await page.waitForTimeout(500);
  420 |     await expect(page.getByText('团队与权限管理')).toBeVisible();
  421 | 
  422 |     await page.getByRole('button', { name: '📄 导出报告' }).click();
  423 |     await page.waitForTimeout(500);
  424 |     await expect(page.getByText('📄 导出 PDF 报告')).toBeVisible();
  425 | 
  426 |     await page.getByRole('button', { name: '📊 总览' }).click();
  427 |     await page.waitForTimeout(500);
  428 |     await expect(page.getByText('最近违约工单')).toBeVisible();
  429 |   });
  430 | 
  431 |   test('31. 告警管理页面加载测试', async ({ page }) => {
  432 |     await page.getByRole('button', { name: '🔔 告警管理' }).click();
  433 |     await page.waitForTimeout(500);
  434 | 
  435 |     await expect(page.getByText('🔔 告警管理与 Silencing')).toBeVisible();
  436 | 
  437 |     const alertStats = page.locator('.alert-stat-item');
  438 |     await expect(alertStats).toHaveCount(4);
  439 | 
  440 |     await expect(page.getByText('告警规则总数')).toBeVisible();
  441 |     await expect(page.getByText('已启用')).toBeVisible();
> 442 |     await expect(page.getByText('已静默')).toBeVisible();
      |                                         ^ Error: expect(locator).toBeVisible() failed
  443 |     await expect(page.getByText('活动告警')).toBeVisible();
  444 |   });
  445 | 
  446 |   test('32. 告警规则与活动告警标签切换测试', async ({ page }) => {
  447 |     await page.getByRole('button', { name: '🔔 告警管理' }).click();
  448 |     await page.waitForTimeout(500);
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
```