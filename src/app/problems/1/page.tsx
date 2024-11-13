"use client";

import { useState } from 'react';
import Editor from '@monaco-editor/react';

export default function Problem1Page() {
  const [code, setCode] = useState(`
function sumOfTwoNumbers(a, b) {
  // Write your logic here
  
}
`);

  const [testResults, setTestResults] = useState<{ testCase: string, status: string }[]>([]);

  const testCases = [
    { input: "[1, 2]", expected: "3" },
    { input: "[10, 20]", expected: "30" },
    { input: "[0, 0]", expected: "0" },
    { input: "[-5, 5]", expected: "0" },
  ];

  const handleRunCode = () => {
    const newTestResults = testCases.map((testCase, index) => {
      try {
        const wrappedCode = `
          ${code}
          return sumOfTwoNumbers(...JSON.parse(${JSON.stringify(testCase.input)}));
        `;
        const func = new Function('sumOfTwoNumbers', wrappedCode);

        const actualOutput = func(function sumOfTwoNumbers(a: number, b: number): number {
          return a + b;
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
        <h2 className="text-2xl font-bold mb-4">Problem 1: Sum of Two Numbers</h2>
        <p>Write a function that returns the sum of two numbers.</p>
        <p><strong>Example:</strong></p>
        <pre className="bg-gray-200 p-2 rounded mb-4">
          Input: [1, 2]
          Output: 3
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
