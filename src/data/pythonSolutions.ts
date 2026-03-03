/**
 * Python solutions — simple syntax, no type hints, easy to read
 */

export interface PythonSolution {
  name: string
  code: string
  time?: string
  space?: string
}

export const pythonSolutions: Record<string, PythonSolution[]> = {
  'two-sum-basic': [
    {
      name: 'Approach 1: Brute force (two loops)',
      code: `def two_sum_brute(nums, target):
    for i in range(len(nums)):
        for j in range(i + 1, len(nums)):
            if nums[i] + nums[j] == target:
                return [i, j]
    return []`,
      time: 'O(n²)',
      space: 'O(1)',
    },
    {
      name: 'Approach 2: Hash map (one pass) — optimal',
      code: `def two_sum(nums, target):
    seen = {}
    for i in range(len(nums)):
        num = nums[i]
        complement = target - num
        if complement in seen:
            return [seen[complement], i]
        seen[num] = i
    return []`,
      time: 'O(n)',
      space: 'O(n)',
    },
  ],
  'two-sum-sorted': [
    {
      name: 'Approach 1: Hash map (works but extra space)',
      code: `def two_sum_sorted_map(numbers, target):
    seen = {}
    for i in range(len(numbers)):
        num = numbers[i]
        if target - num in seen:
            return [seen[target - num] + 1, i + 1]
        seen[num] = i
    return []`,
      time: 'O(n)',
      space: 'O(n)',
    },
    {
      name: 'Approach 2: Two pointers — optimal for sorted array',
      code: `def two_sum_sorted(numbers, target):
    left = 0
    right = len(numbers) - 1
    while left < right:
        s = numbers[left] + numbers[right]
        if s == target:
            return [left + 1, right + 1]
        if s < target:
            left = left + 1
        else:
            right = right - 1
    return []`,
      time: 'O(n)',
      space: 'O(1)',
    },
  ],
  'three-sum': [
    {
      name: 'Approach 1: Sort + two pointers',
      code: `def three_sum(nums):
    nums.sort()
    result = []
    for i in range(len(nums) - 2):
        if i > 0 and nums[i] == nums[i - 1]:
            continue
        left = i + 1
        right = len(nums) - 1
        while left < right:
            s = nums[i] + nums[left] + nums[right]
            if s == 0:
                result.append([nums[i], nums[left], nums[right]])
                while left < right and nums[left] == nums[left + 1]:
                    left = left + 1
                while left < right and nums[right] == nums[right - 1]:
                    right = right - 1
                left = left + 1
                right = right - 1
            elif s < 0:
                left = left + 1
            else:
                right = right - 1
    return result`,
      time: 'O(n²)',
      space: 'O(log n) for sort',
    },
  ],
  'max-subarray': [
    {
      name: 'Approach 1: Brute force (all subarrays)',
      code: `def max_subarray_brute(nums):
    best = nums[0]
    for i in range(len(nums)):
        cur = 0
        for j in range(i, len(nums)):
            cur = cur + nums[j]
            if cur > best:
                best = cur
    return best`,
      time: 'O(n²)',
      space: 'O(1)',
    },
    {
      name: 'Approach 2: Kadane\'s algorithm — optimal',
      code: `def max_subarray(nums):
    max_sum = nums[0]
    current_sum = nums[0]
    for i in range(1, len(nums)):
        if nums[i] > current_sum + nums[i]:
            current_sum = nums[i]
        else:
            current_sum = current_sum + nums[i]
        if current_sum > max_sum:
            max_sum = current_sum
    return max_sum`,
      time: 'O(n)',
      space: 'O(1)',
    },
  ],
  'longest-substring-no-repeat': [
    {
      name: 'Approach 1: Sliding window with set',
      code: `def length_of_longest_substring(s):
    seen = set()
    left = 0
    max_len = 0
    for right in range(len(s)):
        c = s[right]
        while c in seen:
            seen.discard(s[left])
            left = left + 1
        seen.add(c)
        if right - left + 1 > max_len:
            max_len = right - left + 1
    return max_len`,
      time: 'O(n)',
      space: 'O(min(n, alphabet))',
    },
    {
      name: 'Approach 2: Sliding window with last-seen index',
      code: `def length_of_longest_substring_index(s):
    last_seen = {}
    start = 0
    max_len = 0
    for end in range(len(s)):
        c = s[end]
        if c in last_seen and last_seen[c] >= start:
            start = last_seen[c] + 1
        last_seen[c] = end
        if end - start + 1 > max_len:
            max_len = end - start + 1
    return max_len`,
      time: 'O(n)',
      space: 'O(min(n, alphabet))',
    },
  ],
  'min-window-substring': [
    {
      name: 'Sliding window (expand right, shrink left when valid)',
      code: `from collections import Counter

def min_window(s, t):
    need = Counter(t)
    have = 0
    need_count = len(need)
    left = 0
    result = ""
    for right in range(len(s)):
        c = s[right]
        if c in need:
            need[c] = need[c] - 1
            if need[c] == 0:
                have = have + 1
        while have == need_count:
            if result == "" or right - left + 1 < len(result):
                result = s[left:right + 1]
            lc = s[left]
            if lc in need:
                if need[lc] == 0:
                    have = have - 1
                need[lc] = need[lc] + 1
            left = left + 1
    return result`,
      time: 'O(|s| + |t|)',
      space: 'O(|t|)',
    },
  ],
  'valid-palindrome': [
    {
      name: 'Approach 1: Two pointers in place',
      code: `def is_palindrome(s):
    left = 0
    right = len(s) - 1
    while left < right:
        while left < right and not s[left].isalnum():
            left = left + 1
        while left < right and not s[right].isalnum():
            right = right - 1
        if s[left].lower() != s[right].lower():
            return False
        left = left + 1
        right = right - 1
    return True`,
      time: 'O(n)',
      space: 'O(1)',
    },
    {
      name: 'Approach 2: Filter then compare (extra string)',
      code: `def is_palindrome_filter(s):
    cleaned = ""
    for c in s:
        if c.isalnum():
            cleaned = cleaned + c.lower()
    return cleaned == cleaned[::-1]`,
      time: 'O(n)',
      space: 'O(n)',
    },
  ],
  'longest-palindromic': [
    {
      name: 'Expand around center (odd and even lengths)',
      code: `def longest_palindrome(s):
    def expand(l, r):
        while l >= 0 and r < len(s) and s[l] == s[r]:
            l = l - 1
            r = r + 1
        return l + 1, r - 1

    start = 0
    end = 0
    for i in range(len(s)):
        l1, r1 = expand(i, i)
        l2, r2 = expand(i, i + 1)
        if r1 - l1 > end - start:
            start = l1
            end = r1
        if r2 - l2 > end - start:
            start = l2
            end = r2
    return s[start:end + 1]`,
      time: 'O(n²)',
      space: 'O(1)',
    },
  ],
  'group-anagrams': [
    {
      name: 'Approach 1: Sort each string as key',
      code: `from collections import defaultdict

def group_anagrams(strs):
    groups = defaultdict(list)
    for s in strs:
        key = "".join(sorted(s))
        groups[key].append(s)
    return list(groups.values())`,
      time: 'O(n · k log k)',
      space: 'O(n · k)',
    },
    {
      name: 'Approach 2: Character count tuple as key (no sort)',
      code: `from collections import defaultdict

def group_anagrams_count(strs):
    groups = defaultdict(list)
    for s in strs:
        count = [0] * 26
        for c in s:
            count[ord(c) - ord("a")] = count[ord(c) - ord("a")] + 1
        groups[tuple(count)].append(s)
    return list(groups.values())`,
      time: 'O(n · k)',
      space: 'O(n · k)',
    },
  ],
  'reverse-linked-list': [
    {
      name: 'Approach 1: Iterative (three pointers) — optimal',
      code: `def reverse_list(head):
    prev = None
    while head:
        nxt = head.next
        head.next = prev
        prev = head
        head = nxt
    return prev`,
      time: 'O(n)',
      space: 'O(1)',
    },
    {
      name: 'Approach 2: Recursive',
      code: `def reverse_list_rec(head):
    if not head or not head.next:
        return head
    new_head = reverse_list_rec(head.next)
    head.next.next = head
    head.next = None
    return new_head`,
      time: 'O(n)',
      space: 'O(n) stack',
    },
  ],
  'linked-list-cycle': [
    {
      name: 'Approach 1: Floyd\'s cycle detection (fast & slow)',
      code: `def has_cycle(head):
    slow = head
    fast = head
    while fast and fast.next:
        slow = slow.next
        fast = fast.next.next
        if slow == fast:
            return True
    return False`,
      time: 'O(n)',
      space: 'O(1)',
    },
    {
      name: 'Approach 2: Hash set of visited nodes',
      code: `def has_cycle_set(head):
    seen = set()
    while head:
        if head in seen:
            return True
        seen.add(head)
        head = head.next
    return False`,
      time: 'O(n)',
      space: 'O(n)',
    },
  ],
  'merge-two-sorted-lists': [
    {
      name: 'Dummy node + merge in place',
      code: `def merge_two_lists(l1, l2):
    dummy = ListNode(0)
    tail = dummy
    while l1 and l2:
        if l1.val <= l2.val:
            tail.next = l1
            l1 = l1.next
        else:
            tail.next = l2
            l2 = l2.next
        tail = tail.next
    if l1:
        tail.next = l1
    else:
        tail.next = l2
    return dummy.next`,
      time: 'O(n + m)',
      space: 'O(1)',
    },
  ],
  'max-depth-tree': [
    {
      name: 'Approach 1: Recursive',
      code: `def max_depth(root):
    if not root:
        return 0
    left_depth = max_depth(root.left)
    right_depth = max_depth(root.right)
    if left_depth > right_depth:
        return 1 + left_depth
    return 1 + right_depth`,
      time: 'O(n)',
      space: 'O(h)',
    },
    {
      name: 'Approach 2: BFS (level count)',
      code: `from collections import deque

def max_depth_bfs(root):
    if not root:
        return 0
    q = deque([root])
    depth = 0
    while q:
        depth = depth + 1
        level_size = len(q)
        for _ in range(level_size):
            node = q.popleft()
            if node.left:
                q.append(node.left)
            if node.right:
                q.append(node.right)
    return depth`,
      time: 'O(n)',
      space: 'O(w)',
    },
  ],
  'level-order-traversal': [
    {
      name: 'BFS with level list',
      code: `from collections import deque

def level_order(root):
    if not root:
        return []
    result = []
    q = deque([root])
    while q:
        level = []
        level_size = len(q)
        for _ in range(level_size):
            node = q.popleft()
            level.append(node.val)
            if node.left:
                q.append(node.left)
            if node.right:
                q.append(node.right)
        result.append(level)
    return result`,
      time: 'O(n)',
      space: 'O(w)',
    },
  ],
  'lowest-common-ancestor': [
    {
      name: 'Recursive: return p/q/root when found',
      code: `def lowest_common_ancestor(root, p, q):
    if not root or root == p or root == q:
        return root
    left = lowest_common_ancestor(root.left, p, q)
    right = lowest_common_ancestor(root.right, p, q)
    if left and right:
        return root
    if left:
        return left
    return right`,
      time: 'O(n)',
      space: 'O(h)',
    },
  ],
  'validate-bst': [
    {
      name: 'Recursive with (min, max) range',
      code: `def is_valid_bst(root, min_val=None, max_val=None):
    if min_val is None:
        min_val = float("-inf")
    if max_val is None:
        max_val = float("inf")
    if not root:
        return True
    if root.val <= min_val or root.val >= max_val:
        return False
    left_ok = is_valid_bst(root.left, min_val, root.val)
    right_ok = is_valid_bst(root.right, root.val, max_val)
    return left_ok and right_ok`,
      time: 'O(n)',
      space: 'O(h)',
    },
  ],
  'number-of-islands': [
    {
      name: 'DFS (flip visited to "0")',
      code: `def num_islands(grid):
    rows = len(grid)
    cols = len(grid[0])

    def dfs(r, c):
        if r < 0 or r >= rows or c < 0 or c >= cols:
            return
        if grid[r][c] != "1":
            return
        grid[r][c] = "0"
        dfs(r + 1, c)
        dfs(r - 1, c)
        dfs(r, c + 1)
        dfs(r, c - 1)

    count = 0
    for r in range(rows):
        for c in range(cols):
            if grid[r][c] == "1":
                count = count + 1
                dfs(r, c)
    return count`,
      time: 'O(rows × cols)',
      space: 'O(rows × cols)',
    },
    {
      name: 'BFS with queue',
      code: `from collections import deque

def num_islands_bfs(grid):
    rows = len(grid)
    cols = len(grid[0])
    count = 0
    for r in range(rows):
        for c in range(cols):
            if grid[r][c] == "1":
                count = count + 1
                q = deque([(r, c)])
                grid[r][c] = "0"
                while q:
                    i, j = q.popleft()
                    for di, dj in [(1, 0), (-1, 0), (0, 1), (0, -1)]:
                        ni = i + di
                        nj = j + dj
                        if ni >= 0 and ni < rows and nj >= 0 and nj < cols and grid[ni][nj] == "1":
                            grid[ni][nj] = "0"
                            q.append((ni, nj))
    return count`,
      time: 'O(rows × cols)',
      space: 'O(min(rows, cols))',
    },
  ],
  'course-schedule': [
    {
      name: 'Kahn\'s topological sort (BFS + indegree)',
      code: `from collections import deque

def can_finish(num_courses, prerequisites):
    graph = []
    for _ in range(num_courses):
        graph.append([])
    indegree = [0] * num_courses
    for pair in prerequisites:
        to_c = pair[0]
        from_c = pair[1]
        graph[from_c].append(to_c)
        indegree[to_c] = indegree[to_c] + 1
    q = deque([])
    for i in range(num_courses):
        if indegree[i] == 0:
            q.append(i)
    count = 0
    while q:
        node = q.popleft()
        count = count + 1
        for nei in graph[node]:
            indegree[nei] = indegree[nei] - 1
            if indegree[nei] == 0:
                q.append(nei)
    return count == num_courses`,
      time: 'O(V + E)',
      space: 'O(V + E)',
    },
  ],
  'clone-graph': [
    {
      name: 'DFS with node to clone map',
      code: `def clone_graph(node):
    if not node:
        return None
    clone_map = {}

    def dfs(n):
        if n in clone_map:
            return clone_map[n]
        copy = Node(n.val)
        clone_map[n] = copy
        for neighbor in n.neighbors:
            copy.neighbors.append(dfs(neighbor))
        return copy

    return dfs(node)`,
      time: 'O(V + E)',
      space: 'O(V)',
    },
  ],
  'fibonacci': [
    {
      name: 'Approach 1: Naive recursion (avoid in practice)',
      code: `def fib_rec(n):
    if n <= 1:
        return n
    return fib_rec(n - 1) + fib_rec(n - 2)`,
      time: 'O(2^n)',
      space: 'O(n) stack',
    },
    {
      name: 'Approach 2: Memoization (top-down DP)',
      code: `def fib_memo(n, memo=None):
    if memo is None:
        memo = {}
    if n <= 1:
        return n
    if n not in memo:
        memo[n] = fib_memo(n - 1, memo) + fib_memo(n - 2, memo)
    return memo[n]`,
      time: 'O(n)',
      space: 'O(n)',
    },
    {
      name: 'Approach 3: Iterative (two variables) — optimal',
      code: `def fib(n):
    if n <= 1:
        return n
    a = 0
    b = 1
    for i in range(2, n + 1):
        next_val = a + b
        a = b
        b = next_val
    return b`,
      time: 'O(n)',
      space: 'O(1)',
    },
  ],
  'coin-change': [
    {
      name: 'Approach 1: 1D DP (tabulation)',
      code: `def coin_change(coins, amount):
    dp = []
    for _ in range(amount + 1):
        dp.append(float("inf"))
    dp[0] = 0
    for a in range(1, amount + 1):
        for c in coins:
            if a >= c:
                if 1 + dp[a - c] < dp[a]:
                    dp[a] = 1 + dp[a - c]
    if dp[amount] == float("inf"):
        return -1
    return dp[amount]`,
      time: 'O(amount × len(coins))',
      space: 'O(amount)',
    },
    {
      name: 'Approach 2: Recursive with memoization',
      code: `def coin_change_memo(coins, amount):
    def dfs(a, memo):
        if a == 0:
            return 0
        if a < 0:
            return -1
        if a in memo:
            return memo[a]
        best = float("inf")
        for c in coins:
            sub = dfs(a - c, memo)
            if sub != -1:
                if 1 + sub < best:
                    best = 1 + sub
        if best == float("inf"):
            memo[a] = -1
        else:
            memo[a] = best
        return memo[a]
    return dfs(amount, {})`,
      time: 'O(amount × len(coins))',
      space: 'O(amount)',
    },
  ],
  'longest-increasing-subsequence': [
    {
      name: 'Approach 1: DP O(n²)',
      code: `def length_of_lis(nums):
    n = len(nums)
    dp = [1] * n
    for i in range(1, n):
        for j in range(i):
            if nums[j] < nums[i]:
                if dp[j] + 1 > dp[i]:
                    dp[i] = dp[j] + 1
    best = dp[0]
    for i in range(1, n):
        if dp[i] > best:
            best = dp[i]
    return best`,
      time: 'O(n²)',
      space: 'O(n)',
    },
    {
      name: 'Approach 2: Binary search (O(n log n))',
      code: `import bisect

def length_of_lis_bs(nums):
    sub = []
    for x in nums:
        i = bisect.bisect_left(sub, x)
        if i == len(sub):
            sub.append(x)
        else:
            sub[i] = x
    return len(sub)`,
      time: 'O(n log n)',
      space: 'O(n)',
    },
  ],
  'valid-parentheses': [
    {
      name: 'Stack + mapping dict',
      code: `def is_valid(s):
    stack = []
    pair = {")": "(", "]": "[", "}": "{"}
    for c in s:
        if c in pair:
            if not stack:
                return False
            if stack.pop() != pair[c]:
                return False
        else:
            stack.append(c)
    return len(stack) == 0`,
      time: 'O(n)',
      space: 'O(n)',
    },
  ],
  'min-stack': [
    {
      name: 'Two stacks (value + min)',
      code: `class MinStack:
    def __init__(self):
        self.stack = []
        self.min_stack = []

    def push(self, val):
        self.stack.append(val)
        if not self.min_stack:
            self.min_stack.append(val)
        else:
            if val < self.min_stack[-1]:
                self.min_stack.append(val)
            else:
                self.min_stack.append(self.min_stack[-1])

    def pop(self):
        self.stack.pop()
        self.min_stack.pop()

    def top(self):
        return self.stack[-1]

    def get_min(self):
        return self.min_stack[-1]`,
      time: 'O(1) per op',
      space: 'O(n)',
    },
  ],
  'lru-cache': [
    {
      name: 'OrderedDict (dict is ordered in Python 3.7+)',
      code: `from collections import OrderedDict

class LRUCache:
    def __init__(self, capacity):
        self.cap = capacity
        self.cache = OrderedDict()

    def get(self, key):
        if key not in self.cache:
            return -1
        self.cache.move_to_end(key)
        return self.cache[key]

    def put(self, key, value):
        if key in self.cache:
            self.cache.move_to_end(key)
        self.cache[key] = value
        if len(self.cache) > self.cap:
            self.cache.popitem(last=False)`,
      time: 'O(1) get/put',
      space: 'O(capacity)',
    },
  ],
  'binary-search-classic': [
    {
      name: 'Iterative with inclusive bounds',
      code: `def binary_search(nums, target):
    left = 0
    right = len(nums) - 1
    while left <= right:
        mid = left + (right - left) // 2
        if nums[mid] == target:
            return mid
        if nums[mid] < target:
            left = mid + 1
        else:
            right = mid - 1
    return -1`,
      time: 'O(log n)',
      space: 'O(1)',
    },
    {
      name: 'Recursive',
      code: `def binary_search_rec(nums, target, left=0, right=None):
    if right is None:
        right = len(nums) - 1
    if left > right:
        return -1
    mid = left + (right - left) // 2
    if nums[mid] == target:
        return mid
    if nums[mid] < target:
        return binary_search_rec(nums, target, mid + 1, right)
    return binary_search_rec(nums, target, left, mid - 1)`,
      time: 'O(log n)',
      space: 'O(log n) stack',
    },
  ],
  'search-rotated-sorted': [
    {
      name: 'Binary search (identify sorted half)',
      code: `def search_rotated(nums, target):
    left = 0
    right = len(nums) - 1
    while left <= right:
        mid = left + (right - left) // 2
        if nums[mid] == target:
            return mid
        if nums[left] <= nums[mid]:
            if nums[left] <= target and target < nums[mid]:
                right = mid - 1
            else:
                left = mid + 1
        else:
            if nums[mid] < target and target <= nums[right]:
                left = mid + 1
            else:
                right = mid - 1
    return -1`,
      time: 'O(log n)',
      space: 'O(1)',
    },
  ],
  'search-range': [
    {
      name: 'Two binary searches (first and last)',
      code: `def search_range(nums, target):
    def find_first():
        lo = 0
        hi = len(nums) - 1
        while lo <= hi:
            mid = lo + (hi - lo) // 2
            if nums[mid] < target:
                lo = mid + 1
            else:
                hi = mid - 1
        if lo < len(nums) and nums[lo] == target:
            return lo
        return -1

    def find_last():
        lo = 0
        hi = len(nums) - 1
        while lo <= hi:
            mid = lo + (hi - lo) // 2
            if nums[mid] <= target:
                lo = mid + 1
            else:
                hi = mid - 1
        if hi >= 0 and nums[hi] == target:
            return hi
        return -1

    return [find_first(), find_last()]`,
      time: 'O(log n)',
      space: 'O(1)',
    },
  ],
  'first-non-repeating': [
    {
      name: 'Two passes: count then first with count 1',
      code: `from collections import Counter

def first_uniq_char(s):
    count = Counter(s)
    for i in range(len(s)):
        c = s[i]
        if count[c] == 1:
            return i
    return -1`,
      time: 'O(n)',
      space: 'O(1) or O(k)',
    },
  ],
  'subarray-sum-equals-k': [
    {
      name: 'Prefix sum + hash map',
      code: `from collections import defaultdict

def subarray_sum(nums, k):
    prefix_count = defaultdict(int)
    prefix_count[0] = 1
    total = 0
    count = 0
    for num in nums:
        total = total + num
        count = count + prefix_count.get(total - k, 0)
        prefix_count[total] = prefix_count[total] + 1
    return count`,
      time: 'O(n)',
      space: 'O(n)',
    },
  ],
  'contains-duplicate': [
    {
      name: 'Sliding window set (size k)',
      code: `def contains_nearby_duplicate(nums, k):
    seen = set()
    for i in range(len(nums)):
        num = nums[i]
        if num in seen:
            return True
        seen.add(num)
        if len(seen) > k:
            seen.discard(nums[i - k])
    return False`,
      time: 'O(n)',
      space: 'O(min(n, k))',
    },
    {
      name: 'Hash map (value to last index)',
      code: `def contains_nearby_duplicate_map(nums, k):
    last = {}
    for i in range(len(nums)):
        num = nums[i]
        if num in last and i - last[num] <= k:
            return True
        last[num] = i
    return False`,
      time: 'O(n)',
      space: 'O(n)',
    },
  ],
}
