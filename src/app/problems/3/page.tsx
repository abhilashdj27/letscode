"use client";

import { useState } from 'react';
import Editor from '@monaco-editor/react';

export default function Problem3Page() {
  const [code, setCode] = useState(`
function factorial(n) {
  // Write your logic here
}
`);

  const [testResults, setTestResults] = useState<{ testCase: string, status: string }[]>([]);

  const testCases = [
    { input: "5", expected: "120" },
    { input: "3", expected: "6" },
    { input: "1", expected: "1" },
    { input: "0", expected: "1" },
  ];

  const handleRunCode = () => {
    const newTestResults = testCases.map((testCase, index) => {
      try {
        const wrappedCode = `
          ${code}
          return factorial(${testCase.input});
        `;
        const func = new Function('factorial', wrappedCode);

        const actualOutput = func(function factorial(n: number): number {
          if (n === 0) return 1;
          let result = 1;
          for (let i = 1; i <= n; i++) {
            result *= i;
          }
          return result;
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
        <h2 className="text-2xl font-bold mb-4">Problem 3: Factorial Calculation</h2>
        <p>Write a function to calculate the factorial of a given number.</p>
        <p><strong>Example:</strong></p>
        <pre className="bg-gray-200 p-2 rounded mb-4">
          Input: 5
          Output: 120
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
