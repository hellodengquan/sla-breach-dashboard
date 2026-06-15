import { useCallback, useState } from 'react';
import ReactFlow, {
  MiniMap,
  Controls,
  Background,
  Handle,
  Position,
  MarkerType,
} from 'reactflow';
import 'reactflow/dist/style.css';

const getStatusColor = (status) => {
  switch (status) {
    case 'healthy': return '#10B981';
    case 'warning': return '#F59E0B';
    case 'danger': return '#EF4444';
    default: return '#6B7280';
  }
};

const getStatusText = (status) => {
  switch (status) {
    case 'healthy': return '正常';
    case 'warning': return '警告';
    case 'danger': return '故障';
    default: return '未知';
  }
};

function CustomNode({ data, selected }) {
  const statusColor = getStatusColor(data.status);
  
  return (
    <div 
      className={`service-node ${selected ? 'selected' : ''}`}
      style={{ 
        borderColor: statusColor,
        boxShadow: selected ? `0 0 0 3px ${statusColor}40` : 'none'
      }}
    >
      {data.type === 'input' && (
        <Handle type="source" position={Position.Bottom} style={{ background: statusColor }} />
      )}
      {data.type === 'output' && (
        <Handle type="target" position={Position.Top} style={{ background: statusColor }} />
      )}
      {data.type === 'default' && (
        <>
          <Handle type="target" position={Position.Top} style={{ background: statusColor }} />
          <Handle type="source" position={Position.Bottom} style={{ background: statusColor }} />
        </>
      )}
      
      <div className="node-status-dot" style={{ backgroundColor: statusColor }}></div>
      <div className="node-content">
        <div className="node-label">{data.label}</div>
        <div className="node-status" style={{ color: statusColor }}>
          {getStatusText(data.status)}
        </div>
      </div>
    </div>
  );
}

const nodeTypes = {
  custom: CustomNode,
};

export default function ServiceDependencyGraph({ nodes: initialNodes, edges: initialEdges, serviceMetrics }) {
  const [nodes] = useState(() => 
    initialNodes.map(node => ({
      ...node,
      type: 'custom',
      data: { ...node.data, type: node.type }
    }))
  );
  
  const [edges] = useState(initialEdges.map(edge => ({
    ...edge,
    markerEnd: {
      type: MarkerType.ArrowClosed,
      color: edge.style?.stroke || '#666',
    },
  })));
  
  const [selectedNode, setSelectedNode] = useState(null);

  const onNodeClick = useCallback((_, node) => {
    setSelectedNode(node);
  }, []);

  const onPaneClick = useCallback(() => {
    setSelectedNode(null);
  }, []);

  const selectedMetrics = selectedNode ? serviceMetrics[selectedNode.id] : null;

  const healthyCount = nodes.filter(n => n.data.status === 'healthy').length;
  const warningCount = nodes.filter(n => n.data.status === 'warning').length;
  const dangerCount = nodes.filter(n => n.data.status === 'danger').length;

  return (
    <div className="chart-card">
      <div className="chart-header">
        <h3 className="chart-title">跨服务依赖图</h3>
        <div className="service-status-summary">
          <span className="status-summary-item healthy">
            <span className="status-dot"></span>
            正常 {healthyCount}
          </span>
          <span className="status-summary-item warning">
            <span className="status-dot"></span>
            警告 {warningCount}
          </span>
          <span className="status-summary-item danger">
            <span className="status-dot"></span>
            故障 {dangerCount}
          </span>
        </div>
      </div>

      <div className="dependency-graph-container">
        <div className="react-flow-wrapper">
          <ReactFlow
            nodes={nodes}
            edges={edges}
            nodeTypes={nodeTypes}
            onNodeClick={onNodeClick}
            onPaneClick={onPaneClick}
            fitView
            attributionPosition="bottom-right"
            proOptions={{ hideAttribution: true }}
          >
            <Controls 
              style={{ 
                backgroundColor: 'white', 
                borderRadius: '8px', 
                boxShadow: '0 2px 8px rgba(0,0,0,0.1)' 
              }} 
            />
            <MiniMap 
              style={{ 
                backgroundColor: 'white', 
                borderRadius: '8px', 
                boxShadow: '0 2px 8px rgba(0,0,0,0.1)' 
              }}
              nodeColor={(node) => getStatusColor(node.data.status)}
              maskColor="rgba(0, 0, 0, 0.05)"
            />
            <Background gap={16} size={1} color="#f0f0f0" />
          </ReactFlow>
        </div>

        {selectedNode && selectedMetrics && (
          <div className="service-detail-panel">
            <div className="detail-panel-header">
              <h4 className="detail-panel-title">{selectedNode.data.label}</h4>
              <span 
                className="detail-panel-status"
                style={{ 
                  backgroundColor: `${getStatusColor(selectedNode.data.status)}20`,
                  color: getStatusColor(selectedNode.data.status)
                }}
              >
                {getStatusText(selectedNode.data.status)}
              </span>
            </div>
            
            <div className="service-metrics">
              <div className="metric-row">
                <span className="metric-label">延迟</span>
                <span className="metric-value">{selectedMetrics.latency}</span>
              </div>
              <div className="metric-row">
                <span className="metric-label">错误率</span>
                <span className="metric-value" style={{ 
                  color: parseFloat(selectedMetrics.errorRate) > 2 ? '#EF4444' : 
                         parseFloat(selectedMetrics.errorRate) > 1 ? '#F59E0B' : '#10B981'
                }}>
                  {selectedMetrics.errorRate}
                </span>
              </div>
              <div className="metric-row">
                <span className="metric-label">吞吐量</span>
                <span className="metric-value">{selectedMetrics.throughput}</span>
              </div>
            </div>

            <div className="detail-panel-footer">
              <span className="service-id">ID: {selectedNode.id}</span>
            </div>
          </div>
        )}
      </div>

      {!selectedNode && (
        <div className="graph-hint">
          💡 点击任意服务节点查看详细指标
        </div>
      )}
    </div>
  );
}
