import { useState } from 'react';

export default function CustomDashboardView({ views: initialViews, availableWidgets, onViewChange }) {
  const [views, setViews] = useState(initialViews);
  const [currentViewId, setCurrentViewId] = useState(initialViews.find(v => v.isDefault)?.id || initialViews[0]?.id);
  const [isEditing, setIsEditing] = useState(false);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [newViewName, setNewViewName] = useState('');

  const currentView = views.find(v => v.id === currentViewId) || views[0];

  const handleSwitchView = (viewId) => {
    setCurrentViewId(viewId);
    if (onViewChange) {
      const view = views.find(v => v.id === viewId);
      onViewChange(view);
    }
  };

  const handleCreateView = () => {
    if (!newViewName.trim()) return;
    
    const newView = {
      id: `view-${Date.now()}`,
      name: newViewName,
      isDefault: false,
      layout: 'grid',
      widgets: ['stats', 'trend'],
      createdAt: new Date().toISOString(),
      createdBy: 'current-user',
    };
    
    setViews(prev => [...prev, newView]);
    setCurrentViewId(newView.id);
    setShowCreateModal(false);
    setNewViewName('');
  };

  const toggleWidget = (widgetId) => {
    if (!isEditing) return;
    
    setViews(prev => prev.map(view => {
      if (view.id !== currentViewId) return view;
      
      const hasWidget = view.widgets.includes(widgetId);
      return {
        ...view,
        widgets: hasWidget
          ? view.widgets.filter(w => w !== widgetId)
          : [...view.widgets, widgetId],
      };
    }));
  };

  const setAsDefault = (viewId) => {
    setViews(prev => prev.map(view => ({
      ...view,
      isDefault: view.id === viewId,
    })));
  };

  const deleteView = (viewId) => {
    if (views.length <= 1) return;
    if (!confirm('确定要删除这个视图吗？')) return;
    
    setViews(prev => {
      const newViews = prev.filter(v => v.id !== viewId);
      if (currentViewId === viewId) {
        setCurrentViewId(newViews[0].id);
      }
      return newViews;
    });
  };

  const toggleLayout = () => {
    setViews(prev => prev.map(view => 
      view.id === currentViewId 
        ? { ...view, layout: view.layout === 'grid' ? 'list' : 'grid' }
        : view
    ));
  };

  const widgetCategories = [...new Set(availableWidgets.map(w => w.category))];

  return (
    <div className="chart-card custom-dashboard-container">
      <div className="chart-header">
        <h3 className="chart-title">🎛️ 自定义 Dashboard 视图</h3>
        <div className="view-actions">
          <button 
            className={`btn btn-sm ${isEditing ? 'btn-primary' : 'btn-secondary'}`}
            onClick={() => setIsEditing(!isEditing)}
          >
            {isEditing ? '✓ 完成编辑' : '✏️ 编辑视图'}
          </button>
          <button 
            className="btn btn-primary btn-sm"
            onClick={() => setShowCreateModal(true)}
          >
            + 新建视图
          </button>
        </div>
      </div>

      <div className="view-tabs">
        {views.map(view => (
          <button
            key={view.id}
            className={`view-tab ${view.id === currentViewId ? 'active' : ''}`}
            onClick={() => handleSwitchView(view.id)}
          >
            {view.isDefault && <span className="default-star">⭐</span>}
            {view.name}
          </button>
        ))}
      </div>

      <div className="current-view-info">
        <div className="view-meta-row">
          <span>
            <strong>布局:</strong> {currentView?.layout === 'grid' ? '网格布局' : '列表布局'}
          </span>
          <span>
            <strong>组件数:</strong> {currentView?.widgets.length} 个
          </span>
          {isEditing && (
            <button className="btn btn-secondary btn-sm" onClick={toggleLayout}>
              切换布局
            </button>
          )}
        </div>
      </div>

      {isEditing ? (
        <div className="widget-picker">
          <h4 className="picker-title">选择要显示的组件</h4>
          {widgetCategories.map(category => (
            <div key={category} className="widget-category">
              <h5 className="category-title">
                {category === 'overview' && '📊 概览'}
                {category === 'charts' && '📈 图表'}
                {category === 'slo' && '🎯 SLO'}
                {category === 'infrastructure' && '🔗 基础设施'}
                {category === 'tickets' && '📋 工单'}
                {category === 'alerts' && '🔔 告警'}
                {category === 'teams' && '👥 团队'}
                {category === 'history' && '⏮️ 历史'}
              </h5>
              <div className="widget-grid">
                {availableWidgets.filter(w => w.category === category).map(widget => (
                  <button
                    key={widget.id}
                    className={`widget-option ${currentView?.widgets.includes(widget.id) ? 'selected' : ''}`}
                    onClick={() => toggleWidget(widget.id)}
                  >
                    <span className="widget-icon">{widget.icon}</span>
                    <span className="widget-name">{widget.name}</span>
                    {currentView?.widgets.includes(widget.id) && <span className="widget-check">✓</span>}
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className={`view-preview ${currentView?.layout === 'grid' ? 'grid-layout' : 'list-layout'}`}>
          {currentView?.widgets.map(widgetId => {
            const widget = availableWidgets.find(w => w.id === widgetId);
            if (!widget) return null;
            return (
              <div key={widgetId} className="preview-widget">
                <div className="widget-preview-header">
                  <span className="widget-icon">{widget.icon}</span>
                  <span className="widget-name">{widget.name}</span>
                </div>
                <div className="widget-preview-content">
                  <div className="placeholder-bars">
                    <div className="placeholder-bar" style={{ width: '80%' }} />
                    <div className="placeholder-bar" style={{ width: '60%' }} />
                    <div className="placeholder-bar" style={{ width: '90%' }} />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      <div className="view-management">
        <h4 className="management-title">📋 视图管理</h4>
        <div className="views-list-management">
          {views.map(view => (
            <div key={view.id} className="view-item-manage">
              <div className="view-item-info">
                <strong>{view.name}</strong>
                {view.isDefault && <span className="default-badge">默认</span>}
                <span className="view-widget-count">{view.widgets.length} 个组件</span>
              </div>
              <div className="view-item-actions">
                {!view.isDefault && (
                  <button 
                    className="btn btn-secondary btn-sm"
                    onClick={() => setAsDefault(view.id)}
                  >
                    设为默认
                  </button>
                )}
                {views.length > 1 && !view.isDefault && (
                  <button 
                    className="btn btn-danger btn-sm"
                    onClick={() => deleteView(view.id)}
                  >
                    删除
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {showCreateModal && (
        <div className="modal-overlay" onClick={() => setShowCreateModal(false)}>
          <div className="modal-content" onClick={e => e.stopPropagation()}>
            <h3>新建 Dashboard 视图</h3>
            
            <div className="form-group">
              <label>视图名称</label>
              <input
                type="text"
                className="form-input"
                value={newViewName}
                onChange={(e) => setNewViewName(e.target.value)}
                placeholder="输入视图名称"
                autoFocus
              />
            </div>

            <div className="modal-actions">
              <button 
                className="btn btn-secondary"
                onClick={() => setShowCreateModal(false)}
              >
                取消
              </button>
              <button 
                className="btn btn-primary"
                onClick={handleCreateView}
                disabled={!newViewName.trim()}
              >
                创建
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
