"use client";

import { useState } from 'react';
import Editor from '@monaco-editor/react';

export default function Problem2Page() {
  const [code, setCode] = useState(`
function reverseString(str) {
  // Write your logic here
}
`);

  const [testResults, setTestResults] = useState<{ testCase: string, status: string }[]>([]);

  const testCases = [
    { input: '"hello"', expected: "olleh" },
    { input: '"world"', expected: "dlrow" },
    { input: '"a"', expected: "a" },
    { input: '"abc"', expected: "cba" },
  ];

  const handleRunCode = () => {
    const newTestResults = testCases.map((testCase, index) => {
      try {
        // Wrap user code in a function and execute it
        const wrappedCode = `
          ${code}
          return reverseString(${testCase.input});
        `;

        // Create a new function from the user's code and run it, passing reverseString as a parameter
        const func = new Function('reverseString', wrappedCode);

        // Execute the function and capture the result
        const actualOutput = func(function reverseString(str: string): string {
          // Default logic, to avoid errors if the user hasn't written any logic
          return str.split('').reverse().join('');
        });

        // Compare the actual output with the expected output
        const status = actualOutput === testCase.expected
          ? "Test Passed"
          : `Test Failed: Expected "${testCase.expected}", but got "${actualOutput}"`;

        return {
          testCase: testCase.input,
          status
        };
      } catch (err: unknown) {
        if (err instanceof Error) {
          return {
            testCase: testCase.input,
            status: `Error: ${err.message}`
          };
        } else {
          return {
            testCase: testCase.input,
            status: "Unknown Error"
          };
        }
      }
    });

    setTestResults(newTestResults);
  };

  return (
    <div className="flex min-h-screen p-8 bg-gray-100">
      <div className="w-1/2 pr-4 text-black">
        <h2 className="text-2xl font-bold mb-4">Problem 2: Reverse a String</h2>
        <p>Write a function that takes a string and returns it reversed.</p>
        <p><strong>Example:</strong></p>
        <pre className="bg-gray-200 p-2 rounded mb-4">
          Input: "hello"
          Output: "olleh"
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
