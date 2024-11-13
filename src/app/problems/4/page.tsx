"use client";

import { useState } from 'react';
import Editor from '@monaco-editor/react';

export default function Problem4Page() {
  const [code, setCode] = useState(`
function findMax(arr) {
  // Write your logic here
}
`);

  const [testResults, setTestResults] = useState<{ testCase: string, status: string }[]>([]);

  const testCases = [
    { input: "[1, 2, 3, 4, 5]", expected: "5" },
    { input: "[10, 20, 30]", expected: "30" },
    { input: "[0, -1, -2]", expected: "0" },
    { input: "[99, 100, 50, 101]", expected: "101" },
  ];

  const handleRunCode = () => {
    const newTestResults = testCases.map((testCase, index) => {
      try {
        const wrappedCode = `
          ${code}
          return findMax(${testCase.input});
        `;
        const func = new Function('findMax', wrappedCode);

        const actualOutput = func(function findMax(arr: number[]): number {
          return Math.max(...arr);
        });

        const status = actualOutput === parseInt(testCase.expected)
          ? "Test Passed"
          : `Test Failed: Expected "${testCase.expected}", but got "${actualOutput}"`;

        return { testCase: testCase.input, status };
      } catch (err: unknown) {
        if (err instanceof Error) {
          return { testCase: testCase.input, status: `Error: ${err.message}` };
        } else {
          return { testCase: testCase.input, status: "Unknown Error" };
        }
      }
    });

    setTestResults(newTestResults);
  };

  return (
    <div className="flex min-h-screen p-8 bg-gray-100">
      <div className="w-1/2 pr-4 text-black">
        <h2 className="text-2xl font-bold mb-4">Problem 4: Find Maximum Number</h2>
        <p>Write a function that returns the maximum number from an array.</p>
        <p><strong>Example:</strong></p>
        <pre className="bg-gray-200 p-2 rounded mb-4">
          Input: [1, 2, 3, 4, 5]
          Output: 5
        </pre>
      </div>
      <div className="w-1/2 pl-4">
        <Editor height="400px" defaultLanguage="javascript" value={code} onChange={(value) => setCode(value || '')} theme="vs-dark" />
        <button onClick={handleRunCode} className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">Run Code</button>
        <div className="mt-4">
          {testResults.length > 0 && (
            <div>
              {testResults.map((testResult, index) => (
                <div key={index} className={`mt-2 p-2 rounded ${testResult.status === "Test Passed" ? "bg-green-100" : "bg-red-100"} text-black`}>
                  <strong>Test {index + 1} (Input: {testResult.testCase}):</strong> {testResult.status}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
