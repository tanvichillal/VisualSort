export type SortingStep = {
  array: number[]
  comparing: number[]
  sorted: number[]
  pivot?: number
}

export type AlgorithmInfo = {
  name: string
  timeComplexity: {
    best: string
    average: string
    worst: string
  }
  spaceComplexity: string
  stable: boolean
  description: string
}

export const algorithmInfo: Record<string, AlgorithmInfo> = {
  bubble: {
    name: "Bubble Sort",
    timeComplexity: { best: "O(n)", average: "O(n²)", worst: "O(n²)" },
    spaceComplexity: "O(1)",
    stable: true,
    description: "Repeatedly steps through the list, compares adjacent elements and swaps them if they are in the wrong order.",
  },
  selection: {
    name: "Selection Sort",
    timeComplexity: { best: "O(n²)", average: "O(n²)", worst: "O(n²)" },
    spaceComplexity: "O(1)",
    stable: false,
    description: "Divides the input into sorted and unsorted regions, repeatedly selecting the smallest element from the unsorted region.",
  },
  insertion: {
    name: "Insertion Sort",
    timeComplexity: { best: "O(n)", average: "O(n²)", worst: "O(n²)" },
    spaceComplexity: "O(1)",
    stable: true,
    description: "Builds the sorted array one item at a time by repeatedly inserting elements into their correct position.",
  },
  merge: {
    name: "Merge Sort",
    timeComplexity: { best: "O(n log n)", average: "O(n log n)", worst: "O(n log n)" },
    spaceComplexity: "O(n)",
    stable: true,
    description: "Divides the array into halves, recursively sorts them, and then merges the sorted halves back together.",
  },
  quick: {
    name: "Quick Sort",
    timeComplexity: { best: "O(n log n)", average: "O(n log n)", worst: "O(n²)" },
    spaceComplexity: "O(log n)",
    stable: false,
    description: "Selects a pivot element and partitions the array around it, then recursively sorts the partitions.",
  },
  heap: {
    name: "Heap Sort",
    timeComplexity: { best: "O(n log n)", average: "O(n log n)", worst: "O(n log n)" },
    spaceComplexity: "O(1)",
    stable: false,
    description: "Builds a max heap from the array, then repeatedly extracts the maximum element to build the sorted array.",
  },
}

export function* bubbleSort(arr: number[]): Generator<SortingStep> {
  const array = [...arr]
  const n = array.length
  const sorted: number[] = []

  for (let i = 0; i < n - 1; i++) {
    for (let j = 0; j < n - i - 1; j++) {
      yield { array: [...array], comparing: [j, j + 1], sorted: [...sorted] }
      if (array[j] > array[j + 1]) {
        ;[array[j], array[j + 1]] = [array[j + 1], array[j]]
        yield { array: [...array], comparing: [j, j + 1], sorted: [...sorted] }
      }
    }
    sorted.unshift(n - 1 - i)
  }
  sorted.unshift(0)
  yield { array: [...array], comparing: [], sorted: [...sorted] }
}

export function* selectionSort(arr: number[]): Generator<SortingStep> {
  const array = [...arr]
  const n = array.length
  const sorted: number[] = []

  for (let i = 0; i < n - 1; i++) {
    let minIdx = i
    for (let j = i + 1; j < n; j++) {
      yield { array: [...array], comparing: [minIdx, j], sorted: [...sorted] }
      if (array[j] < array[minIdx]) {
        minIdx = j
      }
    }
    if (minIdx !== i) {
      ;[array[i], array[minIdx]] = [array[minIdx], array[i]]
    }
    sorted.push(i)
    yield { array: [...array], comparing: [], sorted: [...sorted] }
  }
  sorted.push(n - 1)
  yield { array: [...array], comparing: [], sorted: [...sorted] }
}

export function* insertionSort(arr: number[]): Generator<SortingStep> {
  const array = [...arr]
  const n = array.length
  const sorted: number[] = [0]

  for (let i = 1; i < n; i++) {
    const key = array[i]
    let j = i - 1
    yield { array: [...array], comparing: [i], sorted: [...sorted] }
    
    while (j >= 0 && array[j] > key) {
      yield { array: [...array], comparing: [j, j + 1], sorted: [...sorted] }
      array[j + 1] = array[j]
      j--
      yield { array: [...array], comparing: [j + 1], sorted: [...sorted] }
    }
    array[j + 1] = key
    sorted.push(i)
    yield { array: [...array], comparing: [], sorted: [...sorted] }
  }
  yield { array: [...array], comparing: [], sorted: Array.from({ length: n }, (_, i) => i) }
}

export function* mergeSort(arr: number[]): Generator<SortingStep> {
  const array = [...arr]
  const sorted: number[] = []

  function* mergeSortHelper(start: number, end: number): Generator<SortingStep> {
    if (start >= end) return

    const mid = Math.floor((start + end) / 2)
    yield* mergeSortHelper(start, mid)
    yield* mergeSortHelper(mid + 1, end)

    const left = array.slice(start, mid + 1)
    const right = array.slice(mid + 1, end + 1)
    let i = 0, j = 0, k = start

    while (i < left.length && j < right.length) {
      yield { array: [...array], comparing: [start + i, mid + 1 + j], sorted: [...sorted] }
      if (left[i] <= right[j]) {
        array[k] = left[i]
        i++
      } else {
        array[k] = right[j]
        j++
      }
      k++
      yield { array: [...array], comparing: [k - 1], sorted: [...sorted] }
    }

    while (i < left.length) {
      array[k] = left[i]
      i++
      k++
      yield { array: [...array], comparing: [k - 1], sorted: [...sorted] }
    }

    while (j < right.length) {
      array[k] = right[j]
      j++
      k++
      yield { array: [...array], comparing: [k - 1], sorted: [...sorted] }
    }
  }

  yield* mergeSortHelper(0, array.length - 1)
  yield { array: [...array], comparing: [], sorted: Array.from({ length: array.length }, (_, i) => i) }
}

export function* quickSort(arr: number[]): Generator<SortingStep> {
  const array = [...arr]
  const sortedSet = new Set<number>()

  function* quickSortHelper(low: number, high: number): Generator<SortingStep> {
    if (low < high) {
      const pivotIdx = yield* partition(low, high)
      sortedSet.add(pivotIdx)
      yield* quickSortHelper(low, pivotIdx - 1)
      yield* quickSortHelper(pivotIdx + 1, high)
    } else if (low === high) {
      sortedSet.add(low)
    }
  }

  function getSorted(): number[] {
    return [...sortedSet]
  }

  function* partition(low: number, high: number): Generator<SortingStep, number> {
    const pivot = array[high]
    let i = low - 1

    for (let j = low; j < high; j++) {
      yield { array: [...array], comparing: [j, high], sorted: getSorted(), pivot: high }
      if (array[j] < pivot) {
        i++
        ;[array[i], array[j]] = [array[j], array[i]]
        yield { array: [...array], comparing: [i, j], sorted: getSorted(), pivot: high }
      }
    }
    ;[array[i + 1], array[high]] = [array[high], array[i + 1]]
    yield { array: [...array], comparing: [i + 1], sorted: getSorted(), pivot: i + 1 }
    return i + 1
  }

  yield* quickSortHelper(0, array.length - 1)
  yield { array: [...array], comparing: [], sorted: Array.from({ length: array.length }, (_, i) => i) }
}

export function* heapSort(arr: number[]): Generator<SortingStep> {
  const array = [...arr]
  const n = array.length
  const sorted: number[] = []

  function* heapify(size: number, root: number): Generator<SortingStep> {
    let largest = root
    const left = 2 * root + 1
    const right = 2 * root + 2

    if (left < size) {
      yield { array: [...array], comparing: [largest, left], sorted: [...sorted] }
      if (array[left] > array[largest]) {
        largest = left
      }
    }

    if (right < size) {
      yield { array: [...array], comparing: [largest, right], sorted: [...sorted] }
      if (array[right] > array[largest]) {
        largest = right
      }
    }

    if (largest !== root) {
      ;[array[root], array[largest]] = [array[largest], array[root]]
      yield { array: [...array], comparing: [root, largest], sorted: [...sorted] }
      yield* heapify(size, largest)
    }
  }

  // Build max heap
  for (let i = Math.floor(n / 2) - 1; i >= 0; i--) {
    yield* heapify(n, i)
  }

  // Extract elements from heap
  for (let i = n - 1; i > 0; i--) {
    ;[array[0], array[i]] = [array[i], array[0]]
    sorted.unshift(i)
    yield { array: [...array], comparing: [0, i], sorted: [...sorted] }
    yield* heapify(i, 0)
  }
  sorted.unshift(0)
  yield { array: [...array], comparing: [], sorted: [...sorted] }
}

export const algorithms = {
  bubble: bubbleSort,
  selection: selectionSort,
  insertion: insertionSort,
  merge: mergeSort,
  quick: quickSort,
  heap: heapSort,
}
