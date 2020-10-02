class Node {
  constructor (data, left = null, right = null) {
    this.data = data;
    this.left = left;
    this.right = right;
  }
}

class BST {
  constructor () {
    this.root = null;
  }

  add(data) {
    const node = this.root;
    if (node === null) {
      this.root = new Node(data);
      return;
    } else {
      const searchTree = function(node) {

        // if data is less than node.data then it will go to the left of the tree
        if (data < node.data) {
          if (node.left === null) {
            node.left = new Node(data);
            return;

          // data will keep going to the left
          } else if (node.left !== null) {
            return searchTree(node.left);
          }

        // if data is more than node.data then it will go to the right of the tree
        } else if (data > node.data) {
          if (node.right === null) {
            node.right = new Node(data);
            return;

          // data will keep going to the right
          } else if (node.right !== null) {
            return searchTree(node.right);
          }
        } else {
          return null;
        }
      };
      return searchTree(node);
    }
  }

  // min is the last number on the left side
  findMin() {
    let current = this.root;
    while(current.left !== null) {
      current = current.left;
    }
    return current.data;
  }

  // max is the last number on the right side
  findmax() {
    let current = this.root;
    while(current.right !== null) {
      current = current.right;
    }
    return current.data;
  }

  // finds if data is in the tree
  isPresent(data) {
    let current = this.root;
    while (current) {
      if (data === current.data) {
        return true;
      }
      if (data < current.data) {
        current = current.left;
      } else {
        current = current.right;
      }
    }
    return false;
  }

  remove(data) {
    const removeNode = function(node, data) {

      // check if tree is empty
      if (node == null) {
        return null;
      }
      if (data == node.data) {
        // node has no child
        if (node.left == null && node.right == null) {
          return null;
        }

        // node has no left child
        if (node.left == null) {
          return node.right;
        }

        // node has no right child
        if (node.right == null) {
          return node.left;
        }

        // node has two children
        // must go down to the furthest left node from the first right node and use that node to replace
        var tempNode = node.right;
        while(tempNode.left !== null) {
          tempNode = tempNode.left;
        }
        node.data = tempNode.data;
        node.right = removeNode(node.right, tempNode.data);
        return node;
      } else if (data < node.data) {
        node.left = removeNode(node.left, data);
        return node;
      } else {
        node.right = removeNode(node.right, data);
        return node;
      }
    }
    this.root = removeNode(this.root, data);
  }
}

const bst = new BST();

bst.add(4);
bst.add(2);
bst.add(6);
bst.add(1);
bst.add(3);
bst.add(5);
bst.add(7);
bst.remove(4);

console.log(bst.findMin());
console.log(bst.findmax());
console.log(bst.isPresent(4));