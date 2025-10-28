import { Plus, Edit, Trash2, MessageCircle, User, Bot } from 'lucide-react';

const NodeCard = ({ node, onAddChild, onEdit, onDelete, isSelected, onSelect }: any) => {
  const getNodeColor = (type : any) => {
    switch (type) {
      case 'start':
        return 'bg-green-100 border-green-300 text-green-800';
      case 'user':
        return 'bg-blue-100 border-blue-300 text-blue-800';
      case 'bot':
        return 'bg-purple-100 border-purple-300 text-purple-800';
      default:
        return 'bg-gray-100 border-gray-300 text-gray-800';
    }
  };

  const getNodeIcon = (type : any) => {
    switch (type) {
      case 'start':
        return <MessageCircle className="w-4 h-4" />;
      case 'user':
        return <User className="w-4 h-4" />;
      case 'bot':
        return <Bot className="w-4 h-4" />;
      default:
        return <MessageCircle className="w-4 h-4" />;
    }
  };

  const getTemplatePreview = () => {
    const { data } = node;
    if (data.job_valid_request) {
      const preview = data.job_valid_request.length > 50 
        ? data.job_valid_request.substring(0, 50) + '...' 
        : data.job_valid_request;
      return preview;
    }
    return 'Tidak ada template';
  };

  return (
    <div
      className={`
        relative bg-white rounded-xl shadow-lg border-2 p-4 cursor-pointer
        transition-all duration-200 hover:shadow-xl
        ${isSelected ? 'ring-2 ring-blue-500 ring-offset-2' : ''}
        ${getNodeColor(node.type)}
      `}
      onClick={() => onSelect(node)}
      style={{ minWidth: '280px', maxWidth: '320px' }}
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <div className="p-1 rounded bg-white/50">
            {getNodeIcon(node.type)}
          </div>
          <span className="font-semibold text-sm">{node.label}</span>
        </div>
        <div className="flex items-center gap-1">
          <button
            onClick={(e) => {
              e.stopPropagation();
              onAddChild(node.id);
            }}
            className="p-1.5 rounded-lg bg-white/70 hover:bg-white transition-colors"
            title="Add Child Node"
          >
            <Plus className="w-3.5 h-3.5" />
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              onEdit(node);
            }}
            className="p-1.5 rounded-lg bg-white/70 hover:bg-white transition-colors"
            title="Edit Node"
          >
            <Edit className="w-3.5 h-3.5" />
          </button>
          {node.type !== 'start' && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                onDelete(node.id);
              }}
              className="p-1.5 rounded-lg bg-red-100/70 hover:bg-red-100 text-red-600 transition-colors"
              title="Delete Node"
            >
              <Trash2 className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
      </div>

      {/* Body */}
      <div className="bg-white/50 rounded-lg p-3 mb-3">
        <div className="text-xs font-medium mb-1 opacity-70">Template Preview:</div>
        <div className="text-sm">
          {getTemplatePreview()}
        </div>
      </div>

      {/* Footer Info */}
      <div className="flex items-center justify-between text-xs opacity-70">
        <div>
          Type: <span className="font-medium">{node.type}</span>
        </div>
        <div>
          Children: <span className="font-medium">{node.children.length}</span>
        </div>
      </div>

      {/* Children indicator */}
      {node.children.length > 0 && (
        <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2">
          <div className="w-4 h-4 bg-blue-500 rounded-full flex items-center justify-center text-white text-xs font-bold">
            {node.children.length}
          </div>
        </div>
      )}
    </div>
  );
};

export default NodeCard;