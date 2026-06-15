import { useState } from 'react';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

export default function PDFReport({ 
  statisticsData, 
  sloData, 
  recentTickets, 
  customerGroupData 
}) {
  const [isGenerating, setIsGenerating] = useState(false);
  const [reportType, setReportType] = useState('summary');
  const [dateRange, setDateRange] = useState('7days');

  const generatePDF = async () => {
    setIsGenerating(true);
    
    try {
      const doc = new jsPDF('p', 'mm', 'a4');
      const pageWidth = doc.internal.pageSize.getWidth();
      const pageHeight = doc.internal.pageSize.getHeight();
      
      let yPosition = 20;
      
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(20);
      doc.setTextColor(102, 126, 234);
      doc.text('SLA 违约监控报告', pageWidth / 2, yPosition, { align: 'center' });
      
      yPosition += 8;
      doc.setFontSize(10);
      doc.setTextColor(107, 114, 128);
      doc.setFont('helvetica', 'normal');
      doc.text(`生成时间: ${new Date().toLocaleString('zh-CN')}`, pageWidth / 2, yPosition, { align: 'center' });
      
      yPosition += 10;
      doc.setDrawColor(102, 126, 234);
      doc.setLineWidth(0.5);
      doc.line(20, yPosition, pageWidth - 20, yPosition);
      
      yPosition += 15;
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(14);
      doc.setTextColor(26, 26, 46);
      doc.text('一、核心指标概览', 20, yPosition);
      
      yPosition += 10;
      const stats = [
        { label: '累计违约数量', value: statisticsData.totalBreaches.toLocaleString() },
        { label: '今日违约数量', value: statisticsData.todayBreaches.toString() },
        { label: '待处理违约', value: statisticsData.pendingBreaches.toString() },
        { label: '整体违约率', value: `${statisticsData.breachRate}%` },
      ];
      
      stats.forEach((stat, index) => {
        const x = 20 + (index % 2) * 90;
        const y = yPosition + Math.floor(index / 2) * 15;
        
        doc.setFont('helvetica', 'normal');
        doc.setFontSize(10);
        doc.setTextColor(107, 114, 128);
        doc.text(stat.label, x, y);
        
        doc.setFont('helvetica', 'bold');
        doc.setFontSize(14);
        doc.setTextColor(26, 26, 46);
        doc.text(stat.value, x, y + 7);
      });
      
      yPosition += 40;
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(14);
      doc.setTextColor(26, 26, 46);
      doc.text('二、SLO 状态', 20, yPosition);
      
      yPosition += 10;
      const sloItems = [
        { name: '可用性 SLO', target: sloData.availability.target, current: sloData.availability.current, status: sloData.availability.status },
        { name: '响应时间 SLO', target: sloData.responseTime.target, current: sloData.responseTime.current, status: sloData.responseTime.status },
        { name: '解决时间 SLO', target: sloData.resolutionTime.target, current: sloData.resolutionTime.current, status: sloData.resolutionTime.status },
      ];
      
      sloItems.forEach((item, index) => {
        const y = yPosition + index * 12;
        
        const statusColors = {
          healthy: [16, 185, 129],
          warning: [245, 158, 11],
          danger: [239, 68, 68],
        };
        const color = statusColors[item.status] || [107, 114, 128];
        
        doc.setFont('helvetica', 'normal');
        doc.setFontSize(10);
        doc.setTextColor(107, 114, 128);
        doc.text(item.name, 25, y);
        
        doc.setTextColor(26, 26, 46);
        doc.text(`目标: ${item.target}%`, 80, y);
        
        doc.setTextColor(...color);
        doc.setFont('helvetica', 'bold');
        doc.text(`当前: ${item.current}%`, 130, y);
        
        const statusText = { healthy: '健康', warning: '警告', danger: '危险' };
        doc.setTextColor(...color);
        doc.text(statusText[item.status] || '未知', 175, y);
      });
      
      yPosition += 50;
      if (yPosition > pageHeight - 60) {
        doc.addPage();
        yPosition = 20;
      }
      
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(14);
      doc.setTextColor(26, 26, 46);
      doc.text('三、错误预算分析', 20, yPosition);
      
      yPosition += 10;
      const totalBudget = Object.values(sloData).reduce((sum, d) => sum + d.errorBudget, 0);
      const totalBurned = Object.values(sloData).reduce((sum, d) => sum + d.burnedBudget, 0);
      const totalRemaining = totalBudget - totalBurned;
      
      const budgetItems = [
        { label: '总错误预算', value: totalBudget.toLocaleString() },
        { label: '已消耗预算', value: totalBurned.toLocaleString() },
        { label: '剩余预算', value: totalRemaining.toLocaleString() },
        { label: '预计耗尽时间', value: `${Math.ceil(totalRemaining / (totalBurned / 14))} 天` },
      ];
      
      budgetItems.forEach((item, index) => {
        const x = 20 + (index % 2) * 90;
        const y = yPosition + Math.floor(index / 2) * 15;
        
        doc.setFont('helvetica', 'normal');
        doc.setFontSize(10);
        doc.setTextColor(107, 114, 128);
        doc.text(item.label, x, y);
        
        doc.setFont('helvetica', 'bold');
        doc.setFontSize(12);
        doc.setTextColor(26, 26, 46);
        doc.text(item.value, x, y + 7);
      });
      
      yPosition += 40;
      if (yPosition > pageHeight - 60) {
        doc.addPage();
        yPosition = 20;
      }
      
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(14);
      doc.setTextColor(26, 26, 46);
      doc.text('四、客户分组统计', 20, yPosition);
      
      yPosition += 10;
      customerGroupData.forEach((group, index) => {
        const y = yPosition + index * 10;
        const percentage = ((group.value / customerGroupData.reduce((s, g) => s + g.value, 0)) * 100).toFixed(1);
        
        doc.setFont('helvetica', 'normal');
        doc.setFontSize(10);
        doc.setTextColor(107, 114, 128);
        doc.text(group.name, 25, y);
        
        doc.setTextColor(26, 26, 46);
        doc.setFont('helvetica', 'bold');
        doc.text(group.value.toLocaleString(), 80, y);
        
        doc.setTextColor(107, 114, 128);
        doc.setFont('helvetica', 'normal');
        doc.text(`${percentage}%`, 110, y);
        
        const barWidth = 80 * (percentage / 100);
        doc.setFillColor(group.color.startsWith('#') ? parseInt(group.color.slice(1), 16) : 102);
        doc.roundedRect(130, y - 4, barWidth, 8, 2, 2, 'F');
      });
      
      yPosition += 60;
      if (yPosition > pageHeight - 60) {
        doc.addPage();
        yPosition = 20;
      }
      
      if (reportType === 'full') {
        doc.setFont('helvetica', 'bold');
        doc.setFontSize(14);
        doc.setTextColor(26, 26, 46);
        doc.text('五、近期违约工单', 20, yPosition);
        
        yPosition += 10;
        doc.setFont('helvetica', 'bold');
        doc.setFontSize(9);
        doc.setTextColor(107, 114, 128);
        
        const headers = ['工单编号', '客户', '问题描述', '优先级', '超时时间', '状态'];
        const colWidths = [35, 35, 50, 20, 20, 20];
        let xPos = 20;
        
        headers.forEach((header, i) => {
          doc.text(header, xPos, yPosition);
          xPos += colWidths[i];
        });
        
        yPosition += 6;
        doc.setDrawColor(229, 231, 235);
        doc.line(20, yPosition, pageWidth - 20, yPosition);
        yPosition += 8;
        
        recentTickets.forEach((ticket) => {
          if (yPosition > pageHeight - 30) {
            doc.addPage();
            yPosition = 25;
          }
          
          doc.setFont('helvetica', 'normal');
          doc.setFontSize(8);
          doc.setTextColor(102, 126, 234);
          doc.text(ticket.id, 20, yPosition);
          
          doc.setTextColor(26, 26, 46);
          doc.text(ticket.customer, 55, yPosition);
          doc.text(ticket.subject, 90, yPosition);
          
          const priorityColors = { '紧急': '#EF4444', '高': '#F59E0B', '中': '#10B981' };
          doc.setTextColor(priorityColors[ticket.priority] ? 107 : 107);
          doc.text(ticket.priority, 140, yPosition);
          
          doc.setTextColor(239, 68, 68);
          doc.text(ticket.breachTime, 160, yPosition);
          
          doc.setTextColor(55, 66, 250);
          doc.text(ticket.status, 180, yPosition);
          
          yPosition += 10;
        });
      }
      
      yPosition = pageHeight - 20;
      doc.setFont('helvetica', 'italic');
      doc.setFontSize(8);
      doc.setTextColor(156, 163, 175);
      doc.text('本报告由 SLA 违约监控系统自动生成', pageWidth / 2, yPosition, { align: 'center' });
      
      doc.save(`SLA报告_${new Date().toISOString().split('T')[0]}.pdf`);
    } catch (error) {
      console.error('PDF生成失败:', error);
      alert('PDF生成失败，请重试');
    } finally {
      setIsGenerating(false);
    }
  };

  const generateDashboardPDF = async () => {
    setIsGenerating(true);
    
    try {
      const dashboardElement = document.getElementById('dashboard-content');
      if (!dashboardElement) {
        alert('未找到仪表盘内容');
        setIsGenerating(false);
        return;
      }
      
      const canvas = await html2canvas(dashboardElement, {
        scale: 2,
        useCORS: true,
        logging: false,
        backgroundColor: '#f5f7fa',
      });
      
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF('l', 'mm', 'a4');
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = pdf.internal.pageSize.getHeight();
      const imgWidth = canvas.width;
      const imgHeight = canvas.height;
      const ratio = Math.min(pdfWidth / imgWidth, pdfHeight / imgHeight);
      const imgX = (pdfWidth - imgWidth * ratio) / 2;
      const imgY = (pdfHeight - imgHeight * ratio) / 2;
      
      pdf.addImage(imgData, 'PNG', imgX, imgY, imgWidth * ratio, imgHeight * ratio);
      pdf.save(`仪表盘快照_${new Date().toISOString().split('T')[0]}.pdf`);
    } catch (error) {
      console.error('仪表盘截图失败:', error);
      alert('仪表盘截图失败，请重试');
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="pdf-report-panel">
      <h4 className="panel-title">📄 导出 PDF 报告</h4>
      
      <div className="report-options">
        <div className="option-group">
          <label className="option-label">报告类型</label>
          <select 
            className="option-select"
            value={reportType}
            onChange={(e) => setReportType(e.target.value)}
          >
            <option value="summary">摘要报告</option>
            <option value="full">完整报告（含工单明细）</option>
          </select>
        </div>
        
        <div className="option-group">
          <label className="option-label">时间范围</label>
          <select 
            className="option-select"
            value={dateRange}
            onChange={(e) => setDateRange(e.target.value)}
          >
            <option value="7days">最近7天</option>
            <option value="14days">最近14天</option>
            <option value="30days">最近30天</option>
            <option value="90days">最近90天</option>
          </select>
        </div>
      </div>
      
      <div className="report-actions">
        <button 
          className="btn btn-primary"
          onClick={generatePDF}
          disabled={isGenerating}
        >
          {isGenerating ? '生成中...' : '📊 生成数据报告'}
        </button>
        <button 
          className="btn btn-secondary"
          onClick={generateDashboardPDF}
          disabled={isGenerating}
        >
          📷 导出仪表盘截图
        </button>
      </div>
      
      {reportType === 'full' && (
        <div className="report-preview-info">
          <p>完整报告包含:</p>
          <ul>
            <li>✓ 核心指标概览</li>
            <li>✓ SLO 状态详情</li>
            <li>✓ 错误预算分析</li>
            <li>✓ 客户分组统计</li>
            <li>✓ 近期违约工单明细</li>
          </ul>
        </div>
      )}
    </div>
  );
}
