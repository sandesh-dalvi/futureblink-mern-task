import { Handle, Position } from "@xyflow/react";
import { Loader2 } from "lucide-react";

const ResultNode = ({ data }) => {
  return (
    <div className=" bg-white rounded-lg shadow-lg border-2 border-green-500 p-4 min-w-75">
      <Handle
        type="target"
        position={Position.Left}
        style={{ background: "#22c55e", width: "12px", height: "12px" }}
      />
      <div className=" flex items-center gap-2 mb-3">
        <div className=" w-3 h-3 bg-green-500 rounded-full"></div>
        <h3 className=" font-semibold text-gray-800">AI Response</h3>
      </div>
      <div className=" p-3 bg-gray-50 rounded-lg min-h-25 max-h-50 overflow-y-auto">
        {data.loading ? (
          <div className=" flex items-center justify-center h-full">
            <Loader2 className=" w-6 h-6 animate-spin text-green-500" />
          </div>
        ) : data.value ? (
          <p className=" text-gray-700">{data.value}</p>
        ) : (
          <p className=" text-gray-400 italic">No response yet...</p>
        )}
      </div>
    </div>
  );
};

export default ResultNode;
