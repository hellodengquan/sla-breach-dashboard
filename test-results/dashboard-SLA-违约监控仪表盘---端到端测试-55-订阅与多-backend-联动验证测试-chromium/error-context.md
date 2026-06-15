# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: dashboard.spec.js >> SLA 违约监控仪表盘 - 端到端测试 >> 55. 订阅与多 backend 联动验证测试
- Location: tests/e2e/dashboard.spec.js:825:3

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
    52 × waiting for element to be visible, enabled and stable
       - element is not visible
     - retrying click action
       - waiting 500ms

```

# Page snapshot

```yaml
- generic [ref=e1]:
  - generic [ref=e3]:
    - banner [ref=e4]:
      - generic [ref=e5]:
        - heading "SLA 违约监控仪表盘" [level=1] [ref=e6]
        - paragraph [ref=e7]:
          - text: "实时监控客服工单 SLA 超时情况 · 更新于 2026/6/15 14:32:37 · 当前用户:"
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
  740 |     await expect(page.locator('.modal-overlay')).toBeVisible();
  741 |     await expect(page.getByText('新建 Dashboard 视图')).toBeVisible();
  742 | 
  743 |     const nameInput = page.locator('.modal-content .form-input');
  744 |     await nameInput.fill('我的自定义视图');
  745 | 
  746 |     const createButton = page.getByRole('button', { name: '创建' });
  747 |     await expect(createButton).toBeVisible();
  748 | 
  749 |     await createButton.click();
  750 |     await page.waitForTimeout(500);
  751 | 
  752 |     const viewTabs = page.locator('.view-tab');
  753 |     const countAfter = await viewTabs.count();
  754 |     expect(countAfter).toBe(5);
  755 |   });
  756 | 
  757 |   test('51. 视图管理列表测试', async ({ page }) => {
  758 |     await page.getByRole('button', { name: '🎛️ 视图管理' }).click();
  759 |     await page.waitForTimeout(500);
  760 | 
  761 |     await expect(page.getByText('📋 视图管理')).toBeVisible();
  762 | 
  763 |     const viewItems = page.locator('.view-item-manage');
  764 |     await expect(viewItems).toHaveCount(4);
  765 | 
  766 |     const defaultBadge = page.locator('.default-badge');
  767 |     await expect(defaultBadge).toHaveCount(1);
  768 |     await expect(defaultBadge).toContainText('默认');
  769 |   });
  770 | 
  771 |   test('52. 组件分类展示测试', async ({ page }) => {
  772 |     await page.getByRole('button', { name: '🎛️ 视图管理' }).click();
  773 |     await page.waitForTimeout(500);
  774 | 
  775 |     await page.getByRole('button', { name: '✏️ 编辑视图' }).click();
  776 |     await page.waitForTimeout(300);
  777 | 
  778 |     const categories = page.locator('.widget-category');
  779 |     await expect(categories).toHaveCount(8);
  780 | 
  781 |     const widgetOptions = page.locator('.widget-option');
  782 |     await expect(widgetOptions).toHaveCount(10);
  783 |   });
  784 | 
  785 |   test('53. 组件选择切换测试', async ({ page }) => {
  786 |     await page.getByRole('button', { name: '🎛️ 视图管理' }).click();
  787 |     await page.waitForTimeout(500);
  788 | 
  789 |     await page.getByRole('button', { name: '✏️ 编辑视图' }).click();
  790 |     await page.waitForTimeout(300);
  791 | 
  792 |     const firstWidget = page.locator('.widget-option').first();
  793 |     const initialSelected = await firstWidget.evaluate(el => el.classList.contains('selected'));
  794 | 
  795 |     await firstWidget.click();
  796 |     
  797 |     const afterSelected = await firstWidget.evaluate(el => el.classList.contains('selected'));
  798 |     expect(afterSelected).not.toBe(initialSelected);
  799 |   });
  800 | 
  801 |   test('54. 完整新功能导航流程测试 - 从告警到视图', async ({ page }) => {
  802 |     await expect(page.getByRole('heading', { name: 'SLA 违约监控仪表盘' })).toBeVisible();
  803 | 
  804 |     await page.getByRole('button', { name: '🔔 告警管理' }).click();
  805 |     await page.waitForTimeout(500);
  806 |     await expect(page.getByText('🔔 告警管理与 Silencing')).toBeVisible();
  807 | 
  808 |     await page.getByRole('button', { name: '📩 订阅推送' }).click();
  809 |     await page.waitForTimeout(500);
  810 |     await expect(page.getByText('📩 SLO 报表订阅推送')).toBeVisible();
  811 | 
  812 |     await page.getByRole('button', { name: '🔌 数据源' }).click();
  813 |     await page.waitForTimeout(500);
  814 |     await expect(page.getByText('🔌 多 Metrics Backend 适配')).toBeVisible();
  815 | 
  816 |     await page.getByRole('button', { name: '🎛️ 视图管理' }).click();
  817 |     await page.waitForTimeout(500);
  818 |     await expect(page.getByText('🎛️ 自定义 Dashboard 视图')).toBeVisible();
  819 | 
  820 |     await page.getByRole('button', { name: '📊 总览' }).click();
  821 |     await page.waitForTimeout(500);
  822 |     await expect(page.getByText('累计违约数量')).toBeVisible();
  823 |   });
  824 | 
  825 |   test('55. 订阅与多 backend 联动验证测试', async ({ page }) => {
  826 |     await page.getByRole('button', { name: '🔌 数据源' }).click();
  827 |     await page.waitForTimeout(500);
  828 | 
  829 |     const datadogCard = page.locator('.backend-card').filter({ hasText: 'Datadog' });
  830 |     await datadogCard.getByRole('button', { name: '切换' }).click();
  831 |     await page.waitForTimeout(1000);
  832 | 
  833 |     await page.getByRole('button', { name: '📩 订阅推送' }).click();
  834 |     await page.waitForTimeout(500);
  835 | 
  836 |     const subscriptions = page.locator('.subscription-item');
  837 |     await expect(subscriptions).toHaveCount(5);
  838 | 
  839 |     const firstToggle = page.locator('.toggle-switch input').first();
> 840 |     await firstToggle.click();
      |                       ^ Error: locator.click: Test timeout of 30000ms exceeded.
  841 |     await page.waitForTimeout(300);
  842 | 
  843 |     await page.getByRole('button', { name: '🔌 数据源' }).click();
  844 |     await page.waitForTimeout(500);
  845 |     
  846 |     const currentBadge = page.locator('.current-badge');
  847 |     const parentCard = currentBadge.locator('..').locator('..');
  848 |     await expect(parentCard).toContainText('Datadog');
  849 |   });
  850 | });
  851 | 
```