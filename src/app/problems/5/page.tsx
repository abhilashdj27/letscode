"use client";

import { useState } from 'react';
import Editor from '@monaco-editor/react';

export default function Problem5Page() {
  const [code, setCode] = useState(`
function fibonacci(n: number): number[] {
   // Write your logic here
}
`);

  const [testResults, setTestResults] = useState<{ testCase: string; status: string; output: string }[]>([]);

  const testCases = [
    { input: 5, expected: "[0, 1, 1, 2, 3]" },
    { input: 8, expected: "[0, 1, 1, 2, 3, 5, 8, 13]" },
    { input: 0, expected: "[]" },
    { input: 1, expected: "[0]" },
  ];

  const handleRunCode = () => {
    const newTestResults = testCases.map((testCase) => {
      try {
        const wrappedCode = `
          ${code}
          return fibonacci(${testCase.input});
        `;
        const func = new Function('fibonacci', wrappedCode);

        const actualOutput = func(function fibonacci(n: number): number[] {
          if (n <= 0) return [];
          if (n === 1) return [0];
          const fibSeq = [0, 1];
          for (let i = 2; i < n; i++) {
            fibSeq.push(fibSeq[i - 1] + fibSeq[i - 2]);
          }
          return fibSeq;
        });

        const formattedExpected = testCase.expected.replace(/\s/g, '');
        const formattedActual = JSON.stringify(actualOutput).replace(/\s/g, '');

        const status = formattedActual === formattedExpected
          ? "Test Passed"
          : `Test Failed: Expected "${formattedExpected}", but got "${formattedActual}"`;

        return {
          testCase: String(testCase.input),
          status,
          output: JSON.stringify(actualOutput)
        };
      } catch (err: unknown) {
        if (err instanceof Error) {
          return {
            testCase: String(testCase.input),
            status: `Error: ${err.message}`,
            output: err.message
          };
        } else {
          return {
            testCase: String(testCase.input),
            status: "Unknown Error",
            output: "Unknown Error"
          };
        }
      }
    });

    setTestResults(newTestResults);
  };

  return (
    <div className="flex min-h-screen p-8 bg-gray-100">
      <div className="w-1/2 pr-4 text-black">
        <h2 className="text-2xl font-bold mb-4">Problem 5: Fibonacci Sequence</h2>
        <p>Write a function that returns the first `n` numbers in the Fibonacci sequence.</p>
        <p><strong>Example:</strong></p>
        <pre className="bg-gray-200 p-2 rounded mb-4">
          Input: 5
          Output: [0, 1, 1, 2, 3]
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
                  <pre className="bg-gray-200 p-2 rounded mt-2">{testResult.output}</pre>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
