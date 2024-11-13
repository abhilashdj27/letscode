export const problemData = {
    1: {
      title: "Sum of Two Numbers",
      description: "Write a function that returns the sum of two numbers.",
      examples: [
        { input: "sum(2, 3)", output: "5" },
        { input: "sum(-1, 1)", output: "0" },
      ],
      testCases: [
        { args: [2, 3], expected: 5 },
        { args: [-1, 1], expected: 0 },
      ],
    },
    2: {
      title: "Square a Number",
      description: "Write a function that returns the square of a number.",
      examples: [
        { input: "square(4)", output: "16" },
        { input: "square(0)", output: "0" },
      ],
      testCases: [
        { args: [4], expected: 16 },
        { args: [0], expected: 0 },
      ],
    },
    // Define remaining problems (3, 4, 5) similarly
  };
  