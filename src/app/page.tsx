import Link from 'next/link';

const problems = [
  { id: 1, title: 'Problem 1: Sum of Two Numbers' },
  { id: 2, title: 'Problem 2: Reverse a String' },
  { id: 3, title: 'Problem 3: Factorial Calculation' },
  { id: 4, title: 'Problem 4: Find Maximum Number' },
  { id: 5, title: 'Problem 5: Fibonacci Sequence' },
];

export default function Home() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-black">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-white mb-4">Welcome to Letscode</h1>
        <p className="text-lg text-gray-300 mb-8">
          We will help you become better developers.
        </p>
        <div className="space-y-4">
          {problems.map((problem) => (
            <Link
              key={problem.id}
              href={`/problems/${problem.id}`}
              className="block px-4 py-2 bg-gray-800 hover:bg-gray-700 rounded text-lg font-semibold"
            >
              {problem.title}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
