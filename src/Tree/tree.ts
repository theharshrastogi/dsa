class TreeNode<T> {
  left: TreeNode<T> | null = null;
  right: TreeNode<T> | null = null;
  data: T;

  constructor(data: T) {
    this.data = data;
  }
}
type Direction = 'INORDER' | 'PREORDER' | 'POSTORDER';

class Tree<T> {
  root: TreeNode<T> | null = null;

  traverse(callback: (val: T) => void, direction: Direction = 'INORDER') {
    const _traverse = (node: TreeNode<T> | null = this.root) => {
      if (!node) return;
      switch (direction) {
        case 'INORDER': {
          node.left && _traverse(node.left);
          callback(node.data);
          node.right && _traverse(node.right);
          return;
        }
        case 'PREORDER': {
          callback(node.data);
          node.left && _traverse(node.left);
          node.right && _traverse(node.right);
          return;
        }
        case 'POSTORDER': {
          node.left && _traverse(node.left);
          node.right && _traverse(node.right);
          callback(node.data);
          return;
        }
      }
    };
    _traverse(this.root);
  }

  traverseIteration(direction: Direction = 'INORDER') {
    if (!this.root) return;
    const stack: TreeNode<T>[] = [];
    let current = this.root;

    if (direction === 'INORDER')
      while (current || stack.length) {
        while (current) {
          stack.push(current);
          current = current.left!;
        }
        current = stack.pop()!;
        console.log(current.data);
        current = current.right!;
      }

    if (direction === 'PREORDER') {
      stack.push(this.root);
      while (current) {
        current = stack.pop()!;
        if (current) {
          console.log(current.data);
          current.right && stack.push(current.right);
          current.left && stack.push(current.left);
        }
      }
    }

    if (direction === 'POSTORDER') {
      stack.push(current.right!, current);
      current = current.left!;
      console.log(stack);
      while (stack.length) {
        if (current.right) stack.push(current.right!);
        stack.push(current);
        current = current.left!;

        if (!current) {
          current = stack.pop()!;
        }
      }
    }
  }

  get size() {
    const calculate = (current = this.root): number => {
      if (!current) return 0;
      return calculate(current.left) + 1 + calculate(current.right);
    };
    return calculate();
  }

  add(data: T) {
    const node = new TreeNode(data);
    if (!this.root) {
      this.root = node;
      return;
    }

    let current = this.root;
    while (current) {
      if (data <= current.data) {
        if (!current.left) {
          current.left = node;
          return;
        }
        current = current.left;
      } else {
        if (!current.right) {
          current.right = node;
          return;
        }
        current = current.right;
      }
    }
  }

  get height() {
    const calcHeight = (current = this.root): number => {
      if (!current) return 0;
      return 1 + Math.max(calcHeight(current.left), calcHeight(current.right));
    };
    return calcHeight();
  }

  // bfs search
  levelTraversal(callback: (data: T) => void) {
    if (!this.root) return;
    const queue: TreeNode<T>[] = [];
    queue.push(this.root);
    while (!!queue.length) {
      const front = queue.shift()!;
      callback(front.data);
      front?.left && queue.push(front.left);
      front?.right && queue.push(front.right);
    }
  }

  static buildTree(preOrder: string, inOrder: string) {
    const tree = new Tree<string>();
    let preIndex = 0;

    const build = (inLeftIndex = 0, inRightIndex = inOrder.length - 1) => {
      if (inLeftIndex > inRightIndex) return null;
      const root = new TreeNode(preOrder[preIndex]);
      preIndex++;

      if (inRightIndex === inLeftIndex) return root;

      let i = inLeftIndex;
      for (; i <= inRightIndex; i++) if (root.data === inOrder[i]) break;

      root.left = build(inLeftIndex, i - 1);
      root.right = build(i + 1, inRightIndex);

      return root;
    };

    tree.root = build();
    return tree;
  }
}

function maxNode(root: TreeNode<number>): number | undefined {
  if (!root) return;

  const leftTreeMax = root.left ? maxNode(root.left)! : root.data;
  const rightTreeMax = root.right ? maxNode(root.right)! : root.data;

  return Math.max(root.data, leftTreeMax, rightTreeMax);
}

function reverseLevelOrderTraversal(tree: Tree<number>) {
  if (!tree.root) return;
  const stack: TreeNode<number>[] = [];
  const queue: TreeNode<number>[] = [];
  let current = tree.root;
  queue.push(current);

  while (queue.length) {
    current = queue.shift()!;
    current.right && queue.push(current.right);
    current.left && queue.push(current.left);
    stack.push(current);
  }

  while (stack.length > 0) console.log(stack.pop()!.data);
}

const tre = new Tree<number>();

[20, 10, 30, 9, 11].forEach((val) => tre.add(val));
reverseLevelOrderTraversal(tre);
// nodeAtDistance(tre.root!.left!, tre.root!, 2);

// tre.traverse(console.log);
// tre.traverseIteration('POSTORDER');
// tre.levelTraversal(console.log);
// console.log('\n\n\n');
