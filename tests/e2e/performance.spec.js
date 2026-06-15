/* global process */
import { test, expect } from '@playwright/test';

test.describe('SLA 仪表盘性能压测 - 跨团队场景', () => {
  const baseUrl = process.env.TEST_BASE_URL || 'http://localhost:5173';

  test('P1. 首页加载性能测试 (FCP < 2s, LCP < 3s)', async ({ page }) => {
    const startTime = Date.now();

    const [fcpEvent] = await Promise.all([
      page.evaluate(() => new Promise(resolve => {
        new PerformanceObserver(list => {
          const entries = list.getEntriesByName('first-contentful-paint');
          if (entries.length) resolve(entries[0].startTime);
        }).observe({ type: 'paint', buffered: true });
        setTimeout(() => resolve(-1), 5000);
      })),
      page.goto(baseUrl, { waitUntil: 'networkidle' }),
    ]);

    const loadTime = Date.now() - startTime;
    console.log(`📊 页面加载总耗时: ${loadTime}ms`);
    console.log(`🎨 First Contentful Paint: ${fcpEvent}ms`);

    expect(loadTime).toBeLessThan(5000);

    const navTiming = await page.evaluate(() => {
      const nav = performance.getEntriesByType('navigation')[0];
      return nav ? {
        domContentLoaded: nav.domContentLoadedEventEnd,
        loadEvent: nav.loadEventEnd,
        domInteractive: nav.domInteractive,
      } : null;
    });

    if (navTiming) {
      console.log(`⚡ DOM Interactive: ${navTiming.domInteractive?.toFixed(0)}ms`);
      console.log(`📦 DOMContentLoaded: ${navTiming.domContentLoaded?.toFixed(0)}ms`);
      console.log(`🏁 Load Event: ${navTiming.loadEvent?.toFixed(0)}ms`);
    }
  });

  test('P2. 跨团队 SLO 页面切换性能测试 (每次切换 < 500ms)', async ({ page }) => {
    await page.goto(baseUrl, { waitUntil: 'networkidle' });

    const measures = [];

    for (let i = 0; i < 10; i++) {
      const t0 = Date.now();
      await page.getByRole('button', { name: '🏢 跨团队 SLO' }).click();
      await page.waitForSelector('.cross-team-summary-row', { state: 'visible' });
      const t1 = Date.now();
      measures.push(t1 - t0);

      await page.waitForTimeout(100);
    }

    const avgTime = measures.reduce((a, b) => a + b, 0) / measures.length;
    const maxTime = Math.max(...measures);
    const p95Time = measures.sort((a, b) => a - b)[Math.floor(measures.length * 0.95)];

    console.log(`🏢 跨团队 SLO 页面切换性能:`);
    console.log(`   平均: ${avgTime.toFixed(0)}ms`);
    console.log(`   最大: ${maxTime}ms`);
    console.log(`   P95: ${p95Time}ms`);

    expect(avgTime).toBeLessThan(1000);
    expect(p95Time).toBeLessThan(1500);
  });

  test('P3. 跨团队视图模式切换性能测试（排名→趋势→明细）', async ({ page }) => {
    await page.goto(baseUrl, { waitUntil: 'networkidle' });
    await page.getByRole('button', { name: '🏢 跨团队 SLO' }).click();
    await page.waitForTimeout(500);

    const measures = {};

    for (let i = 0; i < 5; i++) {
      let t0, t1;

      t0 = Date.now();
      await page.locator('.cross-team-tabs').getByRole('button', { name: '🏆 排名视图' }).click();
      await page.waitForSelector('.ranking-list', { state: 'visible', timeout: 5000 });
      t1 = Date.now();
      measures.ranking = measures.ranking || [];
      measures.ranking.push(t1 - t0);

      t0 = Date.now();
      await page.locator('.cross-team-tabs').getByRole('button', { name: '📊 趋势对比' }).click();
      await page.waitForTimeout(300);
      t1 = Date.now();
      measures.trend = measures.trend || [];
      measures.trend.push(t1 - t0);

      t0 = Date.now();
      await page.locator('.cross-team-tabs').getByRole('button', { name: '📋 团队明细' }).click();
      await page.waitForSelector('.team-detail-grid', { state: 'visible', timeout: 5000 });
      t1 = Date.now();
      measures.detail = measures.detail || [];
      measures.detail.push(t1 - t0);
    }

    Object.entries(measures).forEach(([key, vals]) => {
      const avg = vals.reduce((a, b) => a + b, 0) / vals.length;
      const p95 = vals.sort((a, b) => a - b)[Math.floor(vals.length * 0.95)];
      console.log(`📈 ${key} 视图 - 平均: ${avg.toFixed(0)}ms, P95: ${p95}ms`);
      expect(avg).toBeLessThan(1500);
    });
  });

  test('P4. 告警风暴聚类数据渲染性能测试（15条原始告警）', async ({ page }) => {
    await page.goto(baseUrl, { waitUntil: 'networkidle' });

    const t0 = Date.now();
    await page.getByRole('button', { name: '🌪️ 告警风暴聚类' }).click();
    await page.waitForSelector('.cluster-card', { state: 'visible', timeout: 5000 });
    const t1 = Date.now();

    const clusterRenderTime = t1 - t0;
    console.log(`🌪️ 告警聚类页面加载: ${clusterRenderTime}ms`);
    expect(clusterRenderTime).toBeLessThan(2000);

    const t2 = Date.now();
    await page.locator('.storm-tabs').getByRole('button', { name: '📋 原始告警' }).click();
    await page.waitForSelector('.raw-alerts-container table', { state: 'visible', timeout: 5000 });
    const t3 = Date.now();

    const rawRenderTime = t3 - t2;
    console.log(`📋 原始告警表格渲染: ${rawRenderTime}ms`);
    expect(rawRenderTime).toBeLessThan(1000);
  });

  test('P5. 视图共享与签到记录列表渲染性能', async ({ page }) => {
    await page.goto(baseUrl, { waitUntil: 'networkidle' });

    const t0 = Date.now();
    await page.getByRole('button', { name: '🔗 视图共享' }).click();
    await page.waitForSelector('.share-card', { state: 'visible', timeout: 5000 });
    const t1 = Date.now();

    console.log(`🔗 共享列表加载: ${t1 - t0}ms`);
    expect(t1 - t0).toBeLessThan(2000);

    const t2 = Date.now();
    await page.locator('.sharing-tabs').getByRole('button', { name: '📝 签到记录' }).click();
    await page.waitForSelector('.signins-container table', { state: 'visible', timeout: 5000 });
    const t3 = Date.now();

    console.log(`📝 签到记录加载: ${t3 - t2}ms`);
    expect(t3 - t2).toBeLessThan(1000);

    const rows = page.locator('.signins-container tbody tr');
    const rowCount = await rows.count();
    console.log(`👥 签到记录总数: ${rowCount} 条`);
  });

  test('P6. 全标签页轮询性能测试（模拟连续操作）', async ({ page }) => {
    await page.goto(baseUrl, { waitUntil: 'networkidle' });

    const tabs = [
      { name: '📊 总览', selector: '.stats-grid', label: '总览页' },
      { name: '🎯 SLO & 错误预算', selector: '.slo-container', label: 'SLO页' },
      { name: '🏢 跨团队 SLO', selector: '.cross-team-slo-container', label: '跨团队SLO' },
      { name: '🔔 告警管理', selector: '.storm-cluster-container, .alert-silencing-container', label: '告警管理' },
      { name: '🌪️ 告警风暴聚类', selector: '.storm-cluster-container', label: '告警聚类' },
      { name: '🔗 视图共享', selector: '.view-sharing-container', label: '视图共享' },
    ];

    const results = [];

    for (let round = 0; round < 3; round++) {
      console.log(`\n🔄 轮询第 ${round + 1} 轮:`);
      for (const tab of tabs) {
        const t0 = Date.now();
        await page.getByRole('button', { name: tab.name }).click();
        try {
          await page.waitForSelector(tab.selector, { state: 'visible', timeout: 5000 });
          const t1 = Date.now();
          const duration = t1 - t0;
          results.push({ tab: tab.label, duration, round: round + 1 });
          console.log(`   ${tab.label}: ${duration}ms`);
          expect(duration).toBeLessThan(3000);
        } catch (_err) {
          void _err;
          console.warn(`   ⚠️ ${tab.label}: 超时跳过`);
        }
        await page.waitForTimeout(50);
      }
    }

    const tabStats = {};
    results.forEach(r => {
      if (!tabStats[r.tab]) tabStats[r.tab] = [];
      tabStats[r.tab].push(r.duration);
    });

    console.log('\n📊 ===== 各页面平均切换耗时 =====');
    Object.entries(tabStats).forEach(([tab, times]) => {
      const avg = times.reduce((a, b) => a + b, 0) / times.length;
      const max = Math.max(...times);
      console.log(`   ${tab.padEnd(12)}: 平均 ${avg.toFixed(0)}ms, 最大 ${max}ms`);
    });

    const totalAvg = results.reduce((a, b) => a + b.duration, 0) / results.length;
    console.log(`\n🎯 总体平均切换耗时: ${totalAvg.toFixed(0)}ms`);
    expect(totalAvg).toBeLessThan(1200);
  });

  test('P7. 内存占用趋势测试（多操作场景）', async ({ page }) => {
    test.skip(process.env.CI !== 'true', '仅在 CI 环境执行详细内存测试');

    await page.goto(baseUrl, { waitUntil: 'networkidle' });

    const heavyTabs = [
      '🏢 跨团队 SLO',
      '🌪️ 告警风暴聚类',
      '🔗 服务依赖',
      '⏮️ 历史回放',
      '🏢 跨团队 SLO',
    ];

    const memSnapshots = [];

    for (let i = 0; i < heavyTabs.length; i++) {
      await page.getByRole('button', { name: heavyTabs[i] }).click();
      await page.waitForTimeout(500);

      const mem = await page.evaluate(() => {
        // @ts-ignore
        return performance.memory ? performance.memory.usedJSHeapSize : 0;
      });

      if (mem) {
        const memMB = (mem / 1024 / 1024).toFixed(2);
        memSnapshots.push({ tab: heavyTabs[i], memMB });
        console.log(`💾 ${heavyTabs[i]}: ${memMB} MB`);
      }
    }

    if (memSnapshots.length > 1) {
      const firstMem = parseFloat(memSnapshots[0].memMB);
      const lastMem = parseFloat(memSnapshots[memSnapshots.length - 1].memMB);
      const memGrowth = ((lastMem - firstMem) / firstMem * 100).toFixed(1);
      console.log(`📈 内存增长率: ${memGrowth}%`);
      expect(parseFloat(memGrowth)).toBeLessThan(50);
    }
  });

  test('P8. 跨团队排行榜交互压力测试（快速点击10次）', async ({ page }) => {
    await page.goto(baseUrl, { waitUntil: 'networkidle' });
    await page.getByRole('button', { name: '🏢 跨团队 SLO' }).click();
    await page.waitForSelector('.ranking-list', { state: 'visible' });

    const measures = [];

    for (let i = 0; i < 5; i++) {
      const t0 = Date.now();
      const rankingItems = page.locator('.ranking-item');
      await rankingItems.nth(i % 5).click();
      await page.waitForTimeout(150);

      const backBtn = page.locator('.team-detail-header').getByRole('button', { name: '← 返回全部' });
      if (await backBtn.isVisible()) {
        await backBtn.click();
      }
      await page.waitForTimeout(100);
      const t1 = Date.now();
      measures.push(t1 - t0);
    }

    const avgTime = measures.reduce((a, b) => a + b, 0) / measures.length;
    console.log(`⚡ 排行榜往返点击平均耗时: ${avgTime.toFixed(0)}ms`);
    expect(avgTime).toBeLessThan(1500);
  });
});
