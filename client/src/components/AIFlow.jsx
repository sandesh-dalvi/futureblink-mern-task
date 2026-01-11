import { useState, useCallback, useEffect } from "react";
import {
  ReactFlow,
  addEdge,
  Controls,
  MiniMap,
  Background,
  useNodesState,
  useEdgesState,
} from "@xyflow/react";

import { toast } from "sonner";
import axios from "axios";

import InputNode from "./InputNode";
import ResultNode from "./ResultNode";

const nodeTypes = {
  inputNode: InputNode,
  resultNode: ResultNode,
};

const initialNodes = [
  {
    id: "1",
    type: "inputNode",
    position: { x: 100, y: 100 },
    data: { value: "", onChange: () => {} },
  },
  {
    id: "2",
    type: "resultNode",
    position: { x: 500, y: 100 },
    data: { value: "", loading: false },
  },
];
const initialEdges = [
  {
    id: "e1-2",
    source: "1",
    target: "2",
    animated: false,
    style: { stroke: "#9ca3af", strokeWidth: 2 },
  },
];

export default function AIFlow() {
  const [inputText, setInputText] = useState("");
  const [resultText, setResultText] = useState("");
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);

  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

  //update nodes when data changes
  useEffect(() => {
    setNodes((nds) =>
      nds.map((node) => {
        if (node.id === "1") {
          return {
            ...node,
            data: { ...node.data, value: inputText, onChange: setInputText },
          };
        }
        if (node.id === "2") {
          return {
            ...node,
            data: { ...node.data, value: resultText, loading: loading },
          };
        }
        return node;
      })
    );
  }, [inputText, resultText, loading, setNodes]);

  useEffect(() => {
    setEdges((eds) =>
      eds.map((edge) => ({
        ...edge,
        animated: loading,
        style: { stroke: loading ? "#3b82f6" : "#9ca3af", strokeWidth: 2 },
      }))
    );
  }, [loading, setEdges]);

  const onConnect = useCallback(
    (params) => setEdges((edgesSnapshot) => addEdge(params, edgesSnapshot)),
    [setEdges]
  );

  const handleRunFlow = async () => {
    if (!inputText.trim()) {
      toast.error("Please enter a prompt.");
      return;
    }

    setLoading(true);
    setResultText("");

    try {
      const prompt = inputText;
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/ask-ai`,
        {
          prompt,
        }
      );

      //   console.log(response.data);
      setResultText(response.data.response);
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
          "An error occurred while fetching AI response."
      );
    } finally {
      setLoading(false);
    }
  };
  const handleSaveFlow = async () => {
    if (!inputText.trim() || !resultText.trim()) {
      toast.error("Please run the flow before saving");
      return;
    }

    setSaving(true);
    const interaction = { prompt: inputText, response: resultText };
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/save-interaction`,
        {
          ...interaction,
        }
      );

      const data = response.data;
      toast.success(data.message || "Flow saved successfully");
    } catch (error) {
      toast.error("Error saving flow. Please try again.");
    } finally {
      setSaving(false);
    }
  };

  const handleResetFlow = () => {
    setInputText("");
    setResultText("");
    setLoading(false);
    setSaving(false);
  };

  return (
    <>
      <div className=" bg-white border-b border-gray-200 p-4">
        <div className=" max-w-7xl mx-auto flex items-center justify-between">
          <div className=" flex gap-3">
            <button
              type="button"
              className=" px-6 py-2 bg-blue-600 text-white rounded-3xl shadow-xl hover:bg-blue-700 hover:shadow-2xl transition-all duration-300 font-medium cursor-pointer"
              onClick={handleRunFlow}
              disabled={loading}
            >
              {loading ? "Running..." : "Run Flow"}
            </button>
            <button
              type="button"
              className=" px-6 py-2 bg-green-600 text-white rounded-3xl shadow-xl hover:bg-green-700 hover:shadow-2xl transition-all duration-300 font-medium cursor-pointer"
              onClick={handleSaveFlow}
              disabled={saving}
            >
              {saving ? "Saving..." : " Save"}
            </button>
            <button
              type="button"
              className=" px-6 py-2 bg-red-600 text-white rounded-3xl shadow-xl hover:bg-red-700 hover:shadow-2xl transition-all duration-300 font-medium cursor-pointer"
              onClick={handleResetFlow}
            >
              Reset Flow
            </button>
          </div>

          {/*  */}
        </div>
      </div>

      {/* ReactFlow Canvas */}
      <div style={{ width: "100vw", height: "100vh" }}>
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
          nodeTypes={nodeTypes}
          fitView
          className=" bg-gray-50"
        >
          <Controls />
          <MiniMap />
          <Background variant="dots" gap={12} size={1} />
        </ReactFlow>
      </div>
    </>
  );
}
