/**
 * Trace Table & Dry Run Guide
 * Based on: "Trace Table Tutorial: Dry Running Algorithms with Ease | Unit 2 Computational thinking and Algorithm"
 * https://www.youtube.com/watch?v=q8cKb-nSZuA
 */

export const traceTableGuide = {
  title: 'Tracing and Algorithm',
  subtitle: 'Dry Running with Trace Tables',
  intro: `After designing an algorithm, testing it is essential. We do this by tracing the algorithm—manually simulating its execution step by step. Manually running the algorithm to verify behavior is called a desk check or dry run. To dry run an algorithm, we use the trace table technique.`,

  whatIsTraceTable: {
    title: 'What is a Trace Table?',
    description: `A trace table is a table that shows the values of variables at each step of the algorithm, and the output the algorithm produces for a given set of inputs. This lets you easily check whether the algorithm produces the desired output and whether the logic is correct or contains logical errors.`,
  },

  steps: [
    {
      step: 1,
      title: 'Set up columns',
      content: 'Create one column for the pseudocode step number (or line) you are executing, one column for each variable that changes (e.g. loop index, accumulators), and one column for output (e.g. values printed).',
    },
    {
      step: 2,
      title: 'Execute step by step',
      content: 'Start at the first step. For each step, write the step identifier in the "Step" column, then update the columns for any variables that change in that step, and write any output in the output column.',
    },
    {
      step: 3,
      title: 'Handle loops',
      content: 'For loops, each iteration gets a new row. Update the loop variable (e.g. i) and any variables modified in the loop body. Repeat until the loop condition fails.',
    },
    {
      step: 4,
      title: 'Verify result',
      content: 'Check that the final variable values and output match the expected result. If not, you have found a logical error to fix.',
    },
  ],

  example: {
    title: 'Simple trace example',
    pseudocode: [
      '1. number = 3',
      '2. print number',
      '3. for i from 1 to 3',
      '4.   number = number + 5',
      '5.   print number',
      '6. print "?"',
    ],
    traceColumns: ['Step', 'number', 'i', 'Output'],
    traceRows: [
      { step: '1', number: 3, i: '-', output: '' },
      { step: '2', number: 3, i: '-', output: '3' },
      { step: '3', number: 3, i: 1, output: '' },
      { step: '4', number: 8, i: 1, output: '' },
      { step: '5', number: 8, i: 1, output: '8' },
      { step: '3', number: 8, i: 2, output: '' },
      { step: '4', number: 13, i: 2, output: '' },
      { step: '5', number: 13, i: 2, output: '13' },
      { step: '3', number: 13, i: 3, output: '' },
      { step: '4', number: 18, i: 3, output: '' },
      { step: '5', number: 18, i: 3, output: '18' },
      { step: '6', number: 18, i: '-', output: '?' },
    ],
    note: 'Assignment like number = number + 5: substitute the current value of number on the right (e.g. 3), compute 3+5=8, then assign 8 to number.',
  },

  interviewTips: [
    'Practice drawing a small trace table on the whiteboard for 2–3 iterations of a loop to show you understand the algorithm.',
    'Use a trace table when the interviewer asks "walk me through an example" — it keeps your steps and variable values clear.',
    'Trace tables help you spot off-by-one errors and wrong loop bounds quickly.',
    'For recursive code, trace the first few calls (e.g. base case and one recursive case) in table form.',
  ],

  whyUse: [
    'Identify logical errors before or during coding.',
    'Optimize and reason about correctness.',
    'Communicate your reasoning clearly in interviews.',
    'Debug without running code (e.g. on a whiteboard).',
  ],
};
