import "@xyflow/react/dist/style.css";
import AIFlow from "./components/AIFlow";

export default function App() {
  return (
    <div className=" h-screen flex flex-col bg-gray-100 ">
      {/*  */}
      <div className=" bg-white shadow-md p-4">
        <div className=" max-w-7xl mx-auto">
          <h1 className=" text-2xl font-bold text-gray-800">Ask AI Flow</h1>
          <p>Connect prompts to AI responses</p>
        </div>
      </div>

      <AIFlow />
    </div>
  );
}
