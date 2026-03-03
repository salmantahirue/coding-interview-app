/**
 * 10 Coding Questions | 31 Real-Time Scenarios
 * Based on: "10 Coding Questions Asked In Interviews (31 Real-Time Scenarios) From My 200+ Interview Experience"
 */

export type DSA = 'Array' | 'String' | 'Hash Map' | 'Hash Set' | 'Two Pointers' | 'Sliding Window' | 'Linked List' | 'Stack' | 'Queue' | 'Binary Tree' | 'Graph' | 'BFS' | 'DFS' | 'Binary Search' | 'Dynamic Programming' | 'Recursion' | 'Backtracking' | 'Greedy';

export interface Complexity {
  time: string;
  space: string;
  note?: string;
}

export interface Scenario {
  id: string;
  title: string;
  description: string;
  example: string;
  exampleOutput: string;
  realWorldScenario: string;
  solution: string;
  solutionExplanation: string;
  traceTableSteps?: { step: string; variables: Record<string, string | number>; output?: string }[];
  complexity: Complexity;
  goodChoice: string;
  badChoice: string;
  designPattern?: string;
}

export interface Problem {
  id: string;
  number: number;
  title: string;
  shortTitle: string;
  category: string;
  dsa: DSA[];
  designPatterns: string[];
  scenarios: Scenario[];
  summary: string;
}

export const problems: Problem[] = [
  {
    id: 'two-sum',
    number: 1,
    title: 'Two Sum & Array Pair Problems',
    shortTitle: 'Two Sum',
    category: 'Array & Hash Map',
    dsa: ['Array', 'Hash Map', 'Two Pointers'],
    designPatterns: ['Hash Map Lookup', 'Complement Pattern'],
    summary: 'Find two indices such that their values add up to a target. Foundation for 3Sum, 4Sum, and pair-based problems.',
    scenarios: [
      {
        id: 'two-sum-basic',
        title: 'Two Sum (Exactly One Solution)',
        description: 'Given an array of integers and a target, return indices of the two numbers that add up to target. Assume exactly one solution exists.',
        example: 'nums = [2, 7, 11, 15], target = 9 → [0, 1]',
        exampleOutput: '[0, 1]',
        realWorldScenario: 'Finding two product IDs in inventory whose prices sum to a gift card value.',
        solution: `function twoSum(nums: number[], target: number): number[] {
  const map = new Map<number, number>();
  for (let i = 0; i < nums.length; i++) {
    const complement = target - nums[i];
    if (map.has(complement)) return [map.get(complement)!, i];
    map.set(nums[i], i);
  }
  return [];
}`,
        solutionExplanation: 'Store each number and its index in a Map. For each element, check if (target - current) exists in the map. One pass gives O(n) time.',
        traceTableSteps: [
          { step: 'Init: map = {}', variables: { i: 0, nums_i: 2, complement: 7, 'map.has(7)': 0 }, output: '' },
          { step: 'map.set(2, 0)', variables: { i: 0, nums_i: 2, complement: 7 }, output: '' },
          { step: 'i=1: complement=9-7=2', variables: { i: 1, nums_i: 7, complement: 2, 'map.has(2)': 1 }, output: '' },
          { step: 'Return [0, 1]', variables: {}, output: '[0, 1]' },
        ],
        complexity: { time: 'O(n)', space: 'O(n)', note: 'Single pass with hash map.' },
        goodChoice: 'Hash Map: O(n) time, single pass. Optimal for unsorted array.',
        badChoice: 'Nested loops: O(n²) time. Brute force is acceptable only when asked to minimize space and n is small.',
      },
      {
        id: 'two-sum-sorted',
        title: 'Two Sum II (Sorted Array)',
        description: 'Array is sorted in non-decreasing order. Find two numbers that add up to target. Return 1-based indices.',
        example: 'numbers = [2, 7, 11, 15], target = 9 → [1, 2]',
        exampleOutput: '[1, 2]',
        realWorldScenario: 'Sorted price list: find two items that fit a budget.',
        solution: `function twoSumSorted(numbers: number[], target: number): number[] {
  let left = 0, right = numbers.length - 1;
  while (left < right) {
    const sum = numbers[left] + numbers[right];
    if (sum === target) return [left + 1, right + 1];
    if (sum < target) left++;
    else right--;
  }
  return [];
}`,
        solutionExplanation: 'Two pointers at start and end. If sum < target, move left forward; if sum > target, move right backward. O(n) time, O(1) space.',
        complexity: { time: 'O(n)', space: 'O(1)', note: 'Two pointers; no extra space.' },
        goodChoice: 'Two pointers: O(n) time, O(1) space. Best when array is sorted.',
        badChoice: 'Hash map on sorted array still uses O(n) space; two pointers are strictly better here.',
      },
      {
        id: 'three-sum',
        title: 'Three Sum (Unique Triplets)',
        description: 'Find all unique triplets that sum to zero. Solution set must not contain duplicate triplets.',
        example: 'nums = [-1,0,1,2,-1,-4] → [[-1,-1,2],[-1,0,1]]',
        exampleOutput: '[[-1,-1,2],[-1,0,1]]',
        realWorldScenario: 'Select three stocks whose daily returns sum to zero (hedge).',
        solution: `function threeSum(nums: number[]): number[][] {
  nums.sort((a, b) => a - b);
  const result: number[][] = [];
  for (let i = 0; i < nums.length - 2; i++) {
    if (i > 0 && nums[i] === nums[i - 1]) continue;
    let left = i + 1, right = nums.length - 1;
    while (left < right) {
      const sum = nums[i] + nums[left] + nums[right];
      if (sum === 0) {
        result.push([nums[i], nums[left], nums[right]]);
        while (left < right && nums[left] === nums[left + 1]) left++;
        while (left < right && nums[right] === nums[right - 1]) right--;
        left++; right--;
      } else if (sum < 0) left++;
      else right--;
    }
  }
  return result;
}`,
        solutionExplanation: 'Sort array. Fix one element (i), then two-pointer for the remaining pair. Skip duplicates for i, left, and right.',
        complexity: { time: 'O(n²)', space: 'O(log n) or O(n) for sort', note: 'Sort + two pointers per fixed element.' },
        goodChoice: 'Sort + two pointers: O(n²) time. Avoids hash set for duplicates.',
        badChoice: 'Three nested loops O(n³) or hash set without careful duplicate handling.',
      },
    ],
  },
  {
    id: 'sliding-window',
    number: 2,
    title: 'Sliding Window & Subarray Problems',
    shortTitle: 'Sliding Window',
    category: 'Array & String',
    dsa: ['Array', 'String', 'Sliding Window', 'Hash Map'],
    designPatterns: ['Sliding Window (Fixed/Variable)', 'Prefix Sum'],
    summary: 'Solve subarray/substring problems in O(n) by maintaining a window and updating it incrementally.',
    scenarios: [
      {
        id: 'max-subarray',
        title: 'Maximum Subarray (Kadane\'s Algorithm)',
        description: 'Find the contiguous subarray with the largest sum. Return the maximum sum.',
        example: 'nums = [-2,1,-3,4,-1,2,1,-5,4] → 6 (subarray [4,-1,2,1])',
        exampleOutput: '6',
        realWorldScenario: 'Maximum profit over contiguous days of stock prices.',
        solution: `function maxSubArray(nums: number[]): number {
  let maxSum = nums[0], currentSum = nums[0];
  for (let i = 1; i < nums.length; i++) {
    currentSum = Math.max(nums[i], currentSum + nums[i]);
    maxSum = Math.max(maxSum, currentSum);
  }
  return maxSum;
}`,
        solutionExplanation: 'At each step, either start a new subarray at nums[i] or extend the previous one. Track global max.',
        traceTableSteps: [
          { step: 'Init', variables: { maxSum: -2, currentSum: -2 }, output: '' },
          { step: 'i=1', variables: { maxSum: 1, currentSum: 1 }, output: '' },
          { step: 'i=2', variables: { maxSum: 1, currentSum: -2 }, output: '' },
          { step: 'i=3', variables: { maxSum: 4, currentSum: 4 }, output: '' },
          { step: 'i=6', variables: { maxSum: 6, currentSum: 6 }, output: '' },
        ],
        complexity: { time: 'O(n)', space: 'O(1)', note: 'Single pass, constant space.' },
        goodChoice: 'Kadane\'s algorithm: O(n) time, O(1) space. Classic greedy/DP.',
        badChoice: 'Brute force O(n²) or divide-and-conquer O(n log n) when O(n) is possible.',
      },
      {
        id: 'longest-substring-no-repeat',
        title: 'Longest Substring Without Repeating Characters',
        description: 'Find the length of the longest substring without repeating characters.',
        example: '"abcabcbb" → 3 ("abc")',
        exampleOutput: '3',
        realWorldScenario: 'Longest sequence of unique product views in a session.',
        solution: `function lengthOfLongestSubstring(s: string): number {
  const seen = new Map<string, number>();
  let start = 0, maxLen = 0;
  for (let end = 0; end < s.length; end++) {
    const char = s[end];
    if (seen.has(char) && seen.get(char)! >= start)
      start = seen.get(char)! + 1;
    seen.set(char, end);
    maxLen = Math.max(maxLen, end - start + 1);
  }
  return maxLen;
}`,
        solutionExplanation: 'Sliding window [start, end]. Map stores last index of each char. When duplicate found, move start past previous occurrence.',
        complexity: { time: 'O(n)', space: 'O(min(n, alphabet))' },
        goodChoice: 'Hash map + sliding window: O(n) time, one pass.',
        badChoice: 'Checking all substrings O(n²) or nested loops.',
      },
      {
        id: 'min-window-substring',
        title: 'Minimum Window Substring',
        description: 'Find the minimum window in s that contains every character from t (including frequency).',
        example: 's = "ADOBECODEBANC", t = "ABC" → "BANC"',
        exampleOutput: '"BANC"',
        realWorldScenario: 'Shortest segment of log that contains all required event types.',
        solution: `function minWindow(s: string, t: string): string {
  const need = new Map<string, number>();
  for (const c of t) need.set(c, (need.get(c) ?? 0) + 1);
  let have = 0, needCount = need.size;
  let left = 0, result = '';
  for (let right = 0; right < s.length; right++) {
    const c = s[right];
    if (need.has(c)) {
      need.set(c, need.get(c)! - 1);
      if (need.get(c) === 0) have++;
    }
    while (have === needCount) {
      if (!result || right - left + 1 < result.length)
        result = s.slice(left, right + 1);
      const lc = s[left];
      if (need.has(lc)) {
        if (need.get(lc) === 0) have--;
        need.set(lc, need.get(lc)! + 1);
      }
      left++;
    }
  }
  return result;
}`,
        solutionExplanation: 'Expand window with right; when all chars of t are covered, shrink from left and track minimum valid window.',
        complexity: { time: 'O(|s| + |t|)', space: 'O(|t|)' },
        goodChoice: 'Sliding window with frequency maps: linear time.',
        badChoice: 'Checking every substring O(n²).',
      },
    ],
  },
  {
    id: 'string-manipulation',
    number: 3,
    title: 'String & Palindrome Problems',
    shortTitle: 'Strings & Palindromes',
    category: 'String',
    dsa: ['String', 'Two Pointers', 'Dynamic Programming'],
    designPatterns: ['Two Pointers (Expand)', 'DP Table'],
    summary: 'Palindrome checks, longest palindromic substring, and anagram problems using two pointers or DP.',
    scenarios: [
      {
        id: 'valid-palindrome',
        title: 'Valid Palindrome',
        description: 'Check if a string is a palindrome after converting to lowercase and removing non-alphanumeric characters.',
        example: '"A man, a plan, a canal: Panama" → true',
        exampleOutput: 'true',
        realWorldScenario: 'Validate if a user-entered phrase reads the same forward and backward (e.g., license plates).',
        solution: `function isPalindrome(s: string): boolean {
  let left = 0, right = s.length - 1;
  while (left < right) {
    while (left < right && !/\\w/.test(s[left])) left++;
    while (left < right && !/\\w/.test(s[right])) right--;
    if (s[left].toLowerCase() !== s[right].toLowerCase()) return false;
    left++; right--;
  }
  return true;
}`,
        solutionExplanation: 'Two pointers from both ends. Skip non-alphanumeric; compare lowercase. O(n) time, O(1) space.',
        complexity: { time: 'O(n)', space: 'O(1)' },
        goodChoice: 'Two pointers in place: no extra string allocation.',
        badChoice: 'Building a filtered string first: O(n) extra space.',
      },
      {
        id: 'longest-palindromic',
        title: 'Longest Palindromic Substring',
        description: 'Find the longest palindromic substring in s.',
        example: '"babad" → "bab" or "aba"',
        exampleOutput: '"bab"',
        realWorldScenario: 'Find longest symmetric part of a DNA sequence or log pattern.',
        solution: `function longestPalindrome(s: string): string {
  let start = 0, maxLen = 0;
  function expand(l: number, r: number) {
    while (l >= 0 && r < s.length && s[l] === s[r]) {
      if (r - l + 1 > maxLen) { maxLen = r - l + 1; start = l; }
      l--; r++;
    }
  }
  for (let i = 0; i < s.length; i++) {
    expand(i, i);   // odd length
    expand(i, i + 1); // even length
  }
  return s.slice(start, start + maxLen);
}`,
        solutionExplanation: 'For each center (char or between two chars), expand while palindromic. Track longest.',
        complexity: { time: 'O(n²)', space: 'O(1)', note: 'Expand around center; 2n-1 centers.' },
        goodChoice: 'Expand around center: O(n²) time, O(1) space. Simpler than DP for this.',
        badChoice: 'Checking every substring O(n³). Manacher is O(n) but rarely required in interviews.',
      },
      {
        id: 'group-anagrams',
        title: 'Group Anagrams',
        description: 'Group strings that are anagrams of each other. Return list of groups.',
        example: '["eat","tea","tan","ate","nat","bat"] → [["eat","tea","ate"],["tan","nat"],["bat"]]',
        exampleOutput: '[["eat","tea","ate"],["tan","nat"],["bat"]]',
        realWorldScenario: 'Group documents by normalized content (e.g., same words, different order).',
        solution: `function groupAnagrams(strs: string[]): string[][] {
  const map = new Map<string, string[]>();
  for (const s of strs) {
    const key = [...s].sort().join('');
    if (!map.has(key)) map.set(key, []);
    map.get(key)!.push(s);
  }
  return [...map.values()];
}`,
        solutionExplanation: 'Use sorted string as key (or character count encoding). Group by key in a map.',
        complexity: { time: 'O(n · k log k)', space: 'O(n · k)', note: 'k = max string length; sort each string.' },
        goodChoice: 'Sort as key: simple. For large k, use count encoding O(n·k).',
        badChoice: 'Comparing every pair O(n² · k).',
      },
    ],
  },
  {
    id: 'linked-list',
    number: 4,
    title: 'Linked List Operations',
    shortTitle: 'Linked List',
    category: 'Linked List',
    dsa: ['Linked List', 'Two Pointers', 'Recursion'],
    designPatterns: ['Fast & Slow Pointers', 'Dummy Node', 'Recursion'],
    summary: 'Reverse list, detect cycle, merge two sorted lists—core pointer manipulation and cycle detection.',
    scenarios: [
      {
        id: 'reverse-linked-list',
        title: 'Reverse Linked List',
        description: 'Reverse a singly linked list. Return the new head.',
        example: '1→2→3→null → 3→2→1→null',
        exampleOutput: '3→2→1→null',
        realWorldScenario: 'Undo stack implemented as list; reversing action history.',
        solution: `function reverseList(head: ListNode | null): ListNode | null {
  let prev: ListNode | null = null;
  while (head) {
    const next = head.next;
    head.next = prev;
    prev = head;
    head = next;
  }
  return prev;
}`,
        solutionExplanation: 'Iterative: maintain prev. For each node, save next, point node to prev, advance prev and head.',
        traceTableSteps: [
          { step: 'Init', variables: { prev: 'null', head: '1' }, output: '' },
          { step: 'After 1st iter', variables: { prev: '1', head: '2' }, output: '' },
          { step: 'After 2nd iter', variables: { prev: '2', head: '3' }, output: '' },
          { step: 'After 3rd iter', variables: { prev: '3', head: 'null' }, output: '' },
          { step: 'Return prev', variables: {}, output: '3→2→1→null' },
        ],
        complexity: { time: 'O(n)', space: 'O(1)' },
        goodChoice: 'Iterative with three pointers: O(1) space. Recursion is O(n) stack space.',
        badChoice: 'Copying into array and rebuilding: O(n) extra space.',
      },
      {
        id: 'linked-list-cycle',
        title: 'Linked List Cycle Detection',
        description: 'Determine if the linked list has a cycle. Use O(1) space.',
        example: 'head = [3,2,0,-4], pos = 1 → true',
        exampleOutput: 'true',
        realWorldScenario: 'Detecting circular references in dependency graphs or resource chains.',
        solution: `function hasCycle(head: ListNode | null): boolean {
  let slow = head, fast = head;
  while (fast && fast.next) {
    slow = slow!.next;
    fast = fast.next.next;
    if (slow === fast) return true;
  }
  return false;
}`,
        solutionExplanation: 'Floyd\'s cycle detection: slow moves 1 step, fast 2. If they meet, cycle exists.',
        complexity: { time: 'O(n)', space: 'O(1)', note: 'Floyd\'s algorithm.' },
        goodChoice: 'Floyd\'s tortoise and hare: O(1) space, no modification of list.',
        badChoice: 'Hash set of nodes: O(n) space. Marking nodes (if allowed) also works but changes structure.',
      },
      {
        id: 'merge-two-sorted-lists',
        title: 'Merge Two Sorted Lists',
        description: 'Merge two sorted linked lists into one sorted list. Return the head of the merged list.',
        example: 'list1 = [1,2,4], list2 = [1,3,4] → [1,1,2,3,4,4]',
        exampleOutput: '[1,1,2,3,4,4]',
        realWorldScenario: 'Merging two sorted result streams (e.g., from two APIs) in order.',
        solution: `function mergeTwoLists(l1: ListNode | null, l2: ListNode | null): ListNode | null {
  const dummy = new ListNode(0);
  let tail = dummy;
  while (l1 && l2) {
    if (l1.val <= l2.val) { tail.next = l1; l1 = l1.next; }
    else { tail.next = l2; l2 = l2.next; }
    tail = tail.next;
  }
  tail.next = l1 ?? l2;
  return dummy.next;
}`,
        solutionExplanation: 'Dummy node simplifies edge cases. Compare heads, attach smaller to tail, advance. Append remainder.',
        complexity: { time: 'O(n + m)', space: 'O(1)', note: 'Only pointer manipulation.' },
        goodChoice: 'Dummy node + in-place merge: O(1) space, clear code.',
        badChoice: 'Creating new nodes for merged list: unnecessary O(n+m) space.',
      },
    ],
  },
  {
    id: 'binary-tree',
    number: 5,
    title: 'Binary Tree Traversal & Properties',
    shortTitle: 'Binary Tree',
    category: 'Tree',
    dsa: ['Binary Tree', 'Recursion', 'Stack', 'Queue'],
    designPatterns: ['DFS (Recursion/Stack)', 'BFS (Queue)', 'Tree Recursion'],
    summary: 'Traversals (in/pre/post order, level order), max depth, LCA, and BST validation.',
    scenarios: [
      {
        id: 'max-depth-tree',
        title: 'Maximum Depth of Binary Tree',
        description: 'Return the maximum depth (number of nodes along longest path from root to leaf).',
        example: '[3,9,20,null,null,15,7] → 3',
        exampleOutput: '3',
        realWorldScenario: 'Depth of org chart or category hierarchy for UI rendering.',
        solution: `function maxDepth(root: TreeNode | null): number {
  if (!root) return 0;
  return 1 + Math.max(maxDepth(root.left), maxDepth(root.right));
}`,
        solutionExplanation: 'Depth at root = 1 + max(depth left, depth right). Base case: null → 0.',
        complexity: { time: 'O(n)', space: 'O(h)', note: 'h = height; recursion stack.' },
        goodChoice: 'Recursion: concise. BFS with queue also O(n) but uses O(width) space.',
        badChoice: 'Iterative DFS with explicit stack is fine; avoid redundant visits.',
      },
      {
        id: 'level-order-traversal',
        title: 'Binary Tree Level Order Traversal',
        description: 'Return level-order (BFS) traversal as list of lists: [[level0], [level1], ...].',
        example: '[3,9,20,null,null,15,7] → [[3],[9,20],[15,7]]',
        exampleOutput: '[[3],[9,20],[15,7]]',
        realWorldScenario: 'Printing directory structure level by level or rendering tree rows.',
        solution: `function levelOrder(root: TreeNode | null): number[][] {
  if (!root) return [];
  const result: number[][] = [];
  const queue: TreeNode[] = [root];
  while (queue.length) {
    const level: number[] = [];
    const size = queue.length;
    for (let i = 0; i < size; i++) {
      const node = queue.shift()!;
      level.push(node.val);
      if (node.left) queue.push(node.left);
      if (node.right) queue.push(node.right);
    }
    result.push(level);
  }
  return result;
}`,
        solutionExplanation: 'BFS with queue. Process current level size nodes, collect values, enqueue children.',
        complexity: { time: 'O(n)', space: 'O(w)', note: 'w = max level width.' },
        goodChoice: 'BFS with level-size loop: clean level grouping.',
        badChoice: 'DFS with level parameter works but BFS is more natural for "level order".',
      },
      {
        id: 'lowest-common-ancestor',
        title: 'Lowest Common Ancestor of Binary Tree',
        description: 'Find the lowest common ancestor of two given nodes in the tree. Node can be descendant of itself.',
        example: 'root = [3,5,1,6,2,0,8,null,null,7,4], p=5, q=1 → 3',
        exampleOutput: '3',
        realWorldScenario: 'Finding common parent in file system or category tree for two items.',
        solution: `function lowestCommonAncestor(root: TreeNode | null, p: TreeNode, q: TreeNode): TreeNode | null {
  if (!root || root === p || root === q) return root;
  const left = lowestCommonAncestor(root.left, p, q);
  const right = lowestCommonAncestor(root.right, p, q);
  if (left && right) return root;
  return left ?? right;
}`,
        solutionExplanation: 'If root is p or q or null, return root. Recurse left and right. If both return non-null, root is LCA; else return non-null side.',
        complexity: { time: 'O(n)', space: 'O(h)' },
        goodChoice: 'Single post-order recursion: each node visited once.',
        badChoice: 'Finding paths to p and q then comparing: more code and extra space.',
      },
      {
        id: 'validate-bst',
        title: 'Validate Binary Search Tree',
        description: 'Determine if the tree is a valid BST (left < root < right for every node, and all descendants follow).',
        example: '[2,1,3] → true; [5,1,4,null,null,3,6] → false',
        exampleOutput: 'true / false',
        realWorldScenario: 'Validating that a sorted structure (e.g., cache index) maintains BST invariants.',
        solution: `function isValidBST(root: TreeNode | null, min = -Infinity, max = Infinity): boolean {
  if (!root) return true;
  if (root.val <= min || root.val >= max) return false;
  return isValidBST(root.left, min, root.val) && isValidBST(root.right, root.val, max);
}`,
        solutionExplanation: 'Pass [min, max] valid range. Root must be in (min, max). Left subtree (min, root.val), right (root.val, max).',
        complexity: { time: 'O(n)', space: 'O(h)' },
        goodChoice: 'Range propagation: no need to pass parent value or do inorder and check sort.',
        badChoice: 'Only checking node vs direct children: fails for deeper violations.',
      },
    ],
  },
  {
    id: 'graph',
    number: 6,
    title: 'Graph Traversal & Paths',
    shortTitle: 'Graph',
    category: 'Graph',
    dsa: ['Graph', 'BFS', 'DFS', 'Queue'],
    designPatterns: ['BFS (Shortest Path in Unweighted)', 'DFS (Explore/Backtrack)'],
    summary: 'BFS/DFS, shortest path in unweighted graph, cycle detection, and number of components.',
    scenarios: [
      {
        id: 'number-of-islands',
        title: 'Number of Islands',
        description: '2D grid of "1" (land) and "0" (water). Return number of islands (connected 1s).',
        example: 'grid = [["1","1","0"],["1","1","0"],["0","0","1"]] → 2',
        exampleOutput: '2',
        realWorldScenario: 'Counting connected regions in a map, image segmentation, or dependency clusters.',
        solution: `function numIslands(grid: string[][]): number {
  let count = 0;
  const rows = grid.length, cols = grid[0].length;
  function dfs(r: number, c: number) {
    if (r < 0 || r >= rows || c < 0 || c >= cols || grid[r][c] !== '1') return;
    grid[r][c] = '0';
    dfs(r+1,c); dfs(r-1,c); dfs(r,c+1); dfs(r,c-1);
  }
  for (let r = 0; r < rows; r++)
    for (let c = 0; c < cols; c++)
      if (grid[r][c] === '1') { count++; dfs(r, c); }
  return count;
}`,
        solutionExplanation: 'For each unvisited "1", run DFS and mark entire island as visited (e.g. flip to "0"). Count DFS starts.',
        complexity: { time: 'O(rows × cols)', space: 'O(rows × cols) for recursion in worst case' },
        goodChoice: 'DFS or BFS: same complexity. DFS simpler to code; BFS avoids stack overflow on huge grids.',
        badChoice: 'Union-Find is also O(α(n)) per op but overkill for simple count.',
      },
      {
        id: 'course-schedule',
        title: 'Course Schedule (Cycle in Directed Graph)',
        description: 'numCourses and prerequisites [a,b] meaning b→a. Return true if you can finish all courses (no cycle).',
        example: 'numCourses=2, prerequisites=[[1,0]] → true; [[1,0],[0,1]] → false',
        exampleOutput: 'true / false',
        realWorldScenario: 'Checking if task dependencies form a DAG (no circular dependency).',
        solution: `function canFinish(numCourses: number, prerequisites: number[][]): boolean {
  const graph = new Map<number, number[]>();
  const indegree = new Array(numCourses).fill(0);
  for (const [to, from] of prerequisites) {
    if (!graph.has(from)) graph.set(from, []);
    graph.get(from)!.push(to);
    indegree[to]++;
  }
  const queue = [...Array(numCourses).keys()].filter(i => indegree[i] === 0);
  let count = 0;
  while (queue.length) {
    const node = queue.shift()!;
    count++;
    for (const nei of graph.get(node) ?? []) {
      indegree[nei]--;
      if (indegree[nei] === 0) queue.push(nei);
    }
  }
  return count === numCourses;
}`,
        solutionExplanation: 'Kahn\'s topological sort: build graph and indegree, process nodes with indegree 0, reduce neighbors\' indegree. If count < numCourses, cycle exists.',
        complexity: { time: 'O(V + E)', space: 'O(V + E)' },
        goodChoice: 'Kahn\'s BFS or DFS with three states (unvisited/visiting/done) for cycle detection.',
        badChoice: 'Floyd-Warshall for cycle: overkill and slower for this.',
      },
      {
        id: 'clone-graph',
        title: 'Clone Graph',
        description: 'Given a node of a connected undirected graph, return a deep copy of the graph.',
        example: 'adjList = [[2,4],[1,3],[2,4],[1,3]] → new graph with same structure',
        exampleOutput: 'Deep copy of graph',
        realWorldScenario: 'Duplicating a dependency graph or state machine for simulation.',
        solution: `function cloneGraph(node: Node | null): Node | null {
  if (!node) return null;
  const map = new Map<Node, Node>();
  function dfs(n: Node): Node {
    if (map.has(n)) return map.get(n)!;
    const copy = new Node(n.val);
    map.set(n, copy);
    for (const neighbor of n.neighbors)
      copy.neighbors.push(dfs(neighbor));
    return copy;
  }
  return dfs(node);
}`,
        solutionExplanation: 'DFS: for each node, if not cloned, create copy, store in map, recursively clone neighbors and add to copy.neighbors.',
        complexity: { time: 'O(V + E)', space: 'O(V) for map and recursion' },
        goodChoice: 'DFS with visited map (node → clone): handles cycles naturally.',
        badChoice: 'BFS works too; avoid cloning without memo (infinite loop on cycles).',
      },
    ],
  },
  {
    id: 'dynamic-programming',
    number: 7,
    title: 'Dynamic Programming Essentials',
    shortTitle: 'Dynamic Programming',
    category: 'DP',
    dsa: ['Dynamic Programming', 'Array'],
    designPatterns: ['Memoization', 'Tabulation', 'State Machine'],
    summary: 'Fibonacci, coin change, longest increasing subsequence, and classic 1D/2D DP.',
    scenarios: [
      {
        id: 'fibonacci',
        title: 'Fibonacci (Classic DP Intro)',
        description: 'F(0)=0, F(1)=1, F(n)=F(n-1)+F(n-2). Return F(n).',
        example: 'n=4 → 3',
        exampleOutput: '3',
        realWorldScenario: 'Growth models, option pricing steps, or any recurrence in steps.',
        solution: `function fib(n: number): number {
  if (n <= 1) return n;
  let a = 0, b = 1;
  for (let i = 2; i <= n; i++) {
    const next = a + b;
    a = b; b = next;
  }
  return b;
}`,
        solutionExplanation: 'Iterative with two variables: only need last two values. No array needed.',
        traceTableSteps: [
          { step: 'n=4: init a=0, b=1', variables: { a: 0, b: 1, i: 2 }, output: '' },
          { step: 'i=2: next=1, a=1, b=1', variables: { a: 1, b: 1 }, output: '' },
          { step: 'i=3: next=2, a=1, b=2', variables: { a: 1, b: 2 }, output: '' },
          { step: 'i=4: next=3, a=2, b=3', variables: { a: 2, b: 3 }, output: '' },
          { step: 'Return b=3', variables: {}, output: '3' },
        ],
        complexity: { time: 'O(n)', space: 'O(1)', note: 'Bottom-up with two vars.' },
        goodChoice: 'Bottom-up O(1) space. Top-down memoization O(n) time and space is also fine.',
        badChoice: 'Plain recursion without memo: O(2^n) time.',
      },
      {
        id: 'coin-change',
        title: 'Coin Change',
        description: 'Coins array and amount. Return fewest number of coins that make amount. Else -1.',
        example: 'coins = [1,2,5], amount = 11 → 3 (5+5+1)',
        exampleOutput: '3',
        realWorldScenario: 'Minimum number of operations or tokens to reach a target (e.g., change making).',
        solution: `function coinChange(coins: number[], amount: number): number {
  const dp = new Array(amount + 1).fill(Infinity);
  dp[0] = 0;
  for (let a = 1; a <= amount; a++) {
    for (const c of coins) {
      if (a >= c) dp[a] = Math.min(dp[a], 1 + dp[a - c]);
    }
  }
  return dp[amount] === Infinity ? -1 : dp[amount];
}`,
        solutionExplanation: 'dp[a] = min coins to make amount a. For each a, try each coin c: dp[a] = min(1 + dp[a-c]).',
        complexity: { time: 'O(amount × coins.length)', space: 'O(amount)' },
        goodChoice: '1D tabulation: clear and optimal for "minimum number".',
        badChoice: 'Greedy (largest coin first) fails for some coin sets (e.g. [1,3,4], amount 6).',
      },
      {
        id: 'longest-increasing-subsequence',
        title: 'Longest Increasing Subsequence (LIS)',
        description: 'Find length of longest strictly increasing subsequence (not necessarily contiguous).',
        example: 'nums = [10,9,2,5,3,7,101,18] → 4 (e.g. [2,3,7,101])',
        exampleOutput: '4',
        realWorldScenario: 'Longest chain of dependencies, or ordered events in a log.',
        solution: `function lengthOfLIS(nums: number[]): number {
  const dp = new Array(nums.length).fill(1);
  for (let i = 1; i < nums.length; i++) {
    for (let j = 0; j < i; j++) {
      if (nums[j] < nums[i]) dp[i] = Math.max(dp[i], dp[j] + 1);
    }
  }
  return Math.max(...dp);
}`,
        solutionExplanation: 'dp[i] = length of LIS ending at i. For each i, consider all j < i where nums[j] < nums[i]; dp[i] = max(dp[j]+1).',
        complexity: { time: 'O(n²)', space: 'O(n)', note: 'O(n log n) with binary search + patience sort possible.' },
        goodChoice: 'DP O(n²) is standard. O(n log n) with binary search for "length only" is optimization.',
        badChoice: 'Brute force enumerating all subsequences: exponential.',
      },
    ],
  },
  {
    id: 'stack-queue',
    number: 8,
    title: 'Stack & Queue Patterns',
    shortTitle: 'Stack & Queue',
    category: 'Stack / Queue',
    dsa: ['Stack', 'Queue', 'Hash Map'],
    designPatterns: ['Monotonic Stack', 'LRU Cache (Map + Doubly Linked List)'],
    summary: 'Valid parentheses, min stack, implement queue using stacks, and LRU cache.',
    scenarios: [
      {
        id: 'valid-parentheses',
        title: 'Valid Parentheses',
        description: 'String of "()[]{}". Return true if brackets are closed in correct order.',
        example: '"()[]{}" → true; "(]" → false',
        exampleOutput: 'true / false',
        realWorldScenario: 'Validating JSON/XML brackets, expression parsing, or config syntax.',
        solution: `function isValid(s: string): boolean {
  const stack: string[] = [];
  const pair: Record<string, string> = { ')': '(', ']': '[', '}': '{' };
  for (const c of s) {
    if (pair[c]) {
      if (stack.pop() !== pair[c]) return false;
    } else stack.push(c);
  }
  return stack.length === 0;
}`,
        solutionExplanation: 'Push opening brackets; for closing, pop and check match. Final stack must be empty.',
        traceTableSteps: [
          { step: '"( )"', variables: { c: '(', stack: '[' }, output: '' },
          { step: 'Push "("', variables: { stack: '["("]' }, output: '' },
          { step: 'c=")"', variables: { pair_c: '(', 'stack.pop()': '(' }, output: '' },
          { step: 'Match, stack empty', variables: { stack: '[]' }, output: 'true' },
        ],
        complexity: { time: 'O(n)', space: 'O(n)' },
        goodChoice: 'Stack: natural for matching nested structure.',
        badChoice: 'Counting only (e.g. +1/-1): fails for "([)]".',
      },
      {
        id: 'min-stack',
        title: 'Min Stack',
        description: 'Design stack that supports push, pop, top, and getMin in O(1) time each.',
        example: 'push(-2), push(0), push(-3), getMin()→-3, pop(), top()→0, getMin()→-2',
        exampleOutput: '-3, 0, -2',
        realWorldScenario: 'Tracking minimum value in a sliding window or undo stack.',
        solution: `class MinStack {
  private stack: number[] = [];
  private minStack: number[] = [];
  push(val: number): void {
    this.stack.push(val);
    const min = this.minStack.length ? Math.min(this.minStack[this.minStack.length-1], val) : val;
    this.minStack.push(min);
  }
  pop(): void { this.stack.pop(); this.minStack.pop(); }
  top(): number { return this.stack[this.stack.length - 1]; }
  getMin(): number { return this.minStack[this.minStack.length - 1]; }
}`,
        solutionExplanation: 'Auxiliary stack stores current minimum at each level. Push/pop both stacks together.',
        complexity: { time: 'O(1) per operation', space: 'O(n)' },
        goodChoice: 'Auxiliary min stack: O(1) getMin. Single stack with tuples (val, min) also works.',
        badChoice: 'Computing min on demand: O(n) for getMin.',
      },
      {
        id: 'lru-cache',
        title: 'LRU Cache',
        description: 'Design cache: get(key) and put(key, value). Capacity limit; evict least recently used when full.',
        example: 'capacity=2: put(1,1), put(2,2), get(1)→1, put(3,3), get(2)→-1',
        exampleOutput: '1, -1',
        realWorldScenario: 'Caching recent items (sessions, API responses) with eviction policy.',
        solution: `class LRUCache {
  private cap: number;
  private map = new Map<number, number>();
  get(key: number): number {
    if (!this.map.has(key)) return -1;
    const v = this.map.get(key)!;
    this.map.delete(key); this.map.set(key, v);
    return v;
  }
  put(key: number, value: number): void {
    if (this.map.has(key)) this.map.delete(key);
    this.map.set(key, value);
    if (this.map.size > this.cap) this.map.delete(this.map.keys().next().value);
  }
}`,
        solutionExplanation: 'JavaScript Map preserves insertion order. get: delete + re-insert to make "most recent". put: if over cap, delete first (oldest) key.',
        complexity: { time: 'O(1) get/put', space: 'O(capacity)' },
        goodChoice: 'Map (ordered) in JS/Java; or HashMap + doubly linked list for explicit LRU order.',
        badChoice: 'Array or unordered map only: cannot evict LRU in O(1).',
      },
    ],
  },
  {
    id: 'binary-search',
    number: 9,
    title: 'Binary Search & Variants',
    shortTitle: 'Binary Search',
    category: 'Binary Search',
    dsa: ['Binary Search', 'Array'],
    designPatterns: ['Binary Search on Answer', 'Search Space Reduction'],
    summary: 'Classic binary search, search in rotated sorted array, and search range.',
    scenarios: [
      {
        id: 'binary-search-classic',
        title: 'Binary Search',
        description: 'Sorted array and target. Return index of target or -1.',
        example: 'nums = [-1,0,3,5,9,12], target = 9 → 4',
        exampleOutput: '4',
        realWorldScenario: 'Looking up ID in sorted list, version bisect, or range queries.',
        solution: `function binarySearch(nums: number[], target: number): number {
  let left = 0, right = nums.length - 1;
  while (left <= right) {
    const mid = left + Math.floor((right - left) / 2);
    if (nums[mid] === target) return mid;
    if (nums[mid] < target) left = mid + 1;
    else right = mid - 1;
  }
  return -1;
}`,
        solutionExplanation: 'Maintain [left, right]. Compare mid with target; narrow to left or right half. Use left <= right for inclusive range.',
        complexity: { time: 'O(log n)', space: 'O(1)' },
        goodChoice: 'Iterative with inclusive bounds: avoids off-by-one; use mid = left + (right-left)/2.',
        badChoice: 'Recursion: O(log n) stack space. (right+left)/2 can overflow in other languages.',
      },
      {
        id: 'search-rotated-sorted',
        title: 'Search in Rotated Sorted Array',
        description: 'Sorted array rotated at unknown pivot. No duplicates. Return index of target or -1.',
        example: 'nums = [4,5,6,7,0,1,2], target = 0 → 4',
        exampleOutput: '4',
        realWorldScenario: 'Search in a cyclically shifted log or timeline.',
        solution: `function searchRotated(nums: number[], target: number): number {
  let left = 0, right = nums.length - 1;
  while (left <= right) {
    const mid = left + Math.floor((right - left) / 2);
    if (nums[mid] === target) return mid;
    if (nums[left] <= nums[mid]) {
      if (target >= nums[left] && target < nums[mid]) right = mid - 1;
      else left = mid + 1;
    } else {
      if (target > nums[mid] && target <= nums[right]) left = mid + 1;
      else right = mid - 1;
    }
  }
  return -1;
}`,
        solutionExplanation: 'One half is always sorted. If left half sorted, check if target in [left, mid); else right half. Similarly for right half sorted.',
        complexity: { time: 'O(log n)', space: 'O(1)' },
        goodChoice: 'Identify sorted half and narrow search space: standard rotated array pattern.',
        badChoice: 'Linear scan O(n) when O(log n) is expected.',
      },
      {
        id: 'search-range',
        title: 'Find First and Last Position',
        description: 'Sorted array with duplicates. Find start and end index of target. Return [-1,-1] if not found.',
        example: 'nums = [5,7,7,8,8,10], target = 8 → [3,4]',
        exampleOutput: '[3,4]',
        realWorldScenario: 'Range of timestamps or IDs matching a filter in sorted log.',
        solution: `function searchRange(nums: number[], target: number): number[] {
  function findFirst() {
    let lo = 0, hi = nums.length - 1;
    while (lo <= hi) {
      const mid = lo + Math.floor((hi - lo) / 2);
      if (nums[mid] < target) lo = mid + 1;
      else hi = mid - 1;
    }
    return lo < nums.length && nums[lo] === target ? lo : -1;
  }
  function findLast() {
    let lo = 0, hi = nums.length - 1;
    while (lo <= hi) {
      const mid = lo + Math.floor((hi - lo) / 2);
      if (nums[mid] <= target) lo = mid + 1;
      else hi = mid - 1;
    }
    return hi >= 0 && nums[hi] === target ? hi : -1;
  }
  return [findFirst(), findLast()];
}`,
        solutionExplanation: 'findFirst: bias left (hi = mid-1 when nums[mid] >= target). findLast: bias right (lo = mid+1 when nums[mid] <= target).',
        complexity: { time: 'O(log n)', space: 'O(1)' },
        goodChoice: 'Two binary searches (first/last): clear and correct.',
        badChoice: 'One binary search then linear expand: O(n) in worst case (all same).',
      },
    ],
  },
  {
    id: 'hash-set-map',
    number: 10,
    title: 'Hash Map & Set Applications',
    shortTitle: 'Hash Map / Set',
    category: 'Hash Map',
    dsa: ['Hash Map', 'Hash Set', 'Array', 'String'],
    designPatterns: ['Frequency Map', 'Prefix Sum + Map'],
    summary: 'First non-repeating character, subarray sum equals k, and duplicate detection.',
    scenarios: [
      {
        id: 'first-non-repeating',
        title: 'First Non-Repeating Character',
        description: 'Given a string, find the first character that does not repeat. Return index or -1.',
        example: '"leetcode" → 0 ("l"); "aabb" → -1',
        exampleOutput: '0 / -1',
        realWorldScenario: 'First unique event in a stream or first non-duplicate ID in a list.',
        solution: `function firstUniqChar(s: string): number {
  const count = new Map<string, number>();
  for (const c of s) count.set(c, (count.get(c) ?? 0) + 1);
  for (let i = 0; i < s.length; i++)
    if (count.get(s[i]) === 1) return i;
  return -1;
}`,
        solutionExplanation: 'First pass: count each character. Second pass: return first with count 1.',
        complexity: { time: 'O(n)', space: 'O(1) or O(k)', note: 'k = distinct chars.' },
        goodChoice: 'Two passes with frequency map: simple and optimal.',
        badChoice: 'For each index, check rest of string: O(n²).',
      },
      {
        id: 'subarray-sum-equals-k',
        title: 'Subarray Sum Equals K',
        description: 'Count contiguous subarrays whose sum equals k. Negative numbers allowed.',
        example: 'nums = [1,1,1], k = 2 → 2',
        exampleOutput: '2',
        realWorldScenario: 'Count segments with target sum (e.g., revenue, load).',
        solution: `function subarraySum(nums: number[], k: number): number {
  const map = new Map<number, number>();
  map.set(0, 1);
  let sum = 0, count = 0;
  for (const num of nums) {
    sum += num;
    count += map.get(sum - k) ?? 0;
    map.set(sum, (map.get(sum) ?? 0) + 1);
  }
  return count;
}`,
        solutionExplanation: 'Prefix sum: if prefixSum[j] - prefixSum[i] = k, then prefixSum[j] - k = prefixSum[i]. Store prefix sum frequencies.',
        complexity: { time: 'O(n)', space: 'O(n)' },
        goodChoice: 'Prefix sum + hash map: only approach that handles negatives in O(n).',
        badChoice: 'Brute force all subarrays: O(n²). Prefix sum without map: still O(n²) for count.',
      },
      {
        id: 'contains-duplicate',
        title: 'Contains Duplicate / Duplicate in Range',
        description: 'Return true if array contains duplicate (or duplicate within distance k / value diff t).',
        example: 'nums = [1,2,3,1], k = 3 → true',
        exampleOutput: 'true',
        realWorldScenario: 'Detecting duplicate submissions, or near-duplicate records within a window.',
        solution: `function containsNearbyDuplicate(nums: number[], k: number): boolean {
  const set = new Set<number>();
  for (let i = 0; i < nums.length; i++) {
    if (set.has(nums[i])) return true;
    set.add(nums[i]);
    if (set.size > k) set.delete(nums[i - k]);
  }
  return false;
}`,
        solutionExplanation: 'Sliding window of size k: maintain set of last k elements. If current in set, duplicate in range.',
        complexity: { time: 'O(n)', space: 'O(min(n,k))' },
        goodChoice: 'Set with sliding window: optimal for "within index distance k".',
        badChoice: 'For each i, check i-k to i: O(nk). Hash map of value→lastIndex also O(n).',
      },
    ],
  },
];

// DSA categorization for the learning guide
export const dsaCategories: Record<DSA, { description: string; problems: string[] }> = {
  'Array': {
    description: 'Index-based storage; prefix sum, two pointers, sliding window.',
    problems: ['Two Sum & variants', 'Max Subarray', 'Sliding Window', 'Binary Search', 'DP (LIS, Coin Change)'],
  },
  'String': {
    description: 'Sequence of characters; often combined with two pointers or hash map.',
    problems: ['Valid Palindrome', 'Longest Palindromic', 'Group Anagrams', 'Longest Substring', 'Min Window'],
  },
  'Hash Map': {
    description: 'O(1) lookup/insert; complement pattern, frequency count.',
    problems: ['Two Sum', 'Group Anagrams', 'Subarray Sum K', 'First Non-Repeating', 'LRU Cache'],
  },
  'Two Pointers': {
    description: 'Left/right or slow/fast; sorted array pairs, palindrome, cycle.',
    problems: ['Two Sum II', 'Three Sum', 'Valid Palindrome', 'Reverse List', 'Cycle Detection'],
  },
  'Sliding Window': {
    description: 'Contiguous subarray/substring; fixed or variable size.',
    problems: ['Max Subarray (Kadane)', 'Longest Substring', 'Min Window', 'Contains Duplicate (k)'],
  },
  'Linked List': {
    description: 'Node with next (and prev); dummy node, fast-slow pointers.',
    problems: ['Reverse List', 'Cycle Detection', 'Merge Two Sorted Lists'],
  },
  'Stack': {
    description: 'LIFO; matching brackets, monotonic stack, DFS.',
    problems: ['Valid Parentheses', 'Min Stack', 'Level Order (BFS uses queue)'],
  },
  'Queue': {
    description: 'FIFO; BFS, level-order traversal.',
    problems: ['Level Order Traversal', 'Course Schedule (Kahn)', 'BFS in Graph'],
  },
  'Binary Tree': {
    description: 'At most two children; recursion, DFS/BFS.',
    problems: ['Max Depth', 'Level Order', 'LCA', 'Validate BST'],
  },
  'Graph': {
    description: 'Vertices and edges; adjacency list, BFS/DFS.',
    problems: ['Number of Islands', 'Course Schedule', 'Clone Graph'],
  },
  'BFS': {
    description: 'Breadth-first search; queue; shortest path in unweighted graph, level order.',
    problems: ['Level Order Traversal', 'Number of Islands', 'Course Schedule (Kahn)'],
  },
  'DFS': {
    description: 'Depth-first search; stack/recursion; explore, backtrack, cycle detection.',
    problems: ['Number of Islands', 'Clone Graph', 'Max Depth', 'LCA'],
  },
  'Hash Set': {
    description: 'O(1) membership; duplicate detection, sliding window membership.',
    problems: ['Contains Duplicate (within k)', 'First Non-Repeating (count)'],
  },
  'Binary Search': {
    description: 'Sorted data; O(log n) search or search on answer.',
    problems: ['Binary Search', 'Search Rotated', 'Find First/Last Position'],
  },
  'Dynamic Programming': {
    description: 'Overlapping subproblems; memoization or tabulation.',
    problems: ['Fibonacci', 'Coin Change', 'LIS', 'Max Subarray (Kadane)'],
  },
  'Recursion': {
    description: 'Base case + recurse; tree/graph traversal.',
    problems: ['Max Depth', 'LCA', 'Clone Graph', 'Reverse List (optional)'],
  },
  'Backtracking': {
    description: 'Try choice, recurse, undo.',
    problems: ['Often in permutations/combinations; not in top 10 but common follow-up'],
  },
  'Greedy': {
    description: 'Local optimal choice; Kadane, some scheduling.',
    problems: ['Max Subarray (Kadane)', 'Merge Intervals (variant)'],
  },
};

export const totalScenarios = problems.reduce((acc, p) => acc + p.scenarios.length, 0);
