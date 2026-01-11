import { Handle, Position } from "@xyflow/react";

const InputNode = ({ data }) => {
  return (
    <div className=" bg-white rounded-lg shadow-lg border-2 border-blue-500 p-4 min-w-75">
      <div className=" flex items-center gap-2 mb-3">
        <div className=" w-3 h-3 bg-blue-500 rounded-full"></div>
        <h3 className=" font-semibold text-gray-800">Input Prompt</h3>
      </div>
      <textarea
        value={data.value}
        placeholder="Enter your question..."
        onChange={(e) => data.onChange(e.target.value)}
        className="nodrag w-full p-3 border border-gray-300 rounded-lg resize-none"
        rows={4}
      />
      <Handle
        type="source"
        position={Position.Right}
        style={{ background: "#3b82f6", width: "12px", height: "12px" }}
      />
    </div>
  );
};

export default InputNode;
