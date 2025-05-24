/*
insert 
search
delete
min
max
isValid?
levelOrder
preOrder
inOrder
postOrder
second largest - to study
isBalanced?
closest value to a number
height of tree
*/


class Node{
    constructor(value){
        this.value = value
        this.left = null
        this.right = null
    }
}

class BinarySearchTree{
    constructor(){
        this.root = null
    }

    insert(value){
        const node = new Node(value)
        if(!this.root){
            this.root = node
        }
        else{
            this.InsertNode(this.root, node)
        }
    }
    InsertNode(root, node){
        if(node.value < root.value){
            if(!root.left){
                root.left = node
            }
            else{
                this.InsertNode(root.left, node)
            }
        }
        else{
            if(!root.right){
                root.right = node
            }
            else{
                this.InsertNode(root.right, node)
            }
        }
    }

    preOrder(root){
        if(root){
            console.log(root.value)
            this.preOrder(root.left)
            this.preOrder(root.right)
        }
    }

    inOrder(root){
        if(root){
            this.inOrder(root.left)
            console.log(root.value)
            this.inOrder(root.right)
        }
    }

    postOrder(root){
        if(root){
            this.postOrder(root.left)
            this.postOrder(root.right)
            console.log(root.value)
        }
    }

    min(root){
        if(!root.left){
            return root.value
        }
        else{
            return this.min(root.left)
        }
    }

    max(root){
        if(!root.right){
            return root.value
        }
        else{
            return this.max(root.right)
        }
    }

    search(root, value){
        if(!root){
            return false
        }
        else{
            if(value === root.value){
                return true
            }
            else if(value < root.value){
                return this.search(root.left, value)
            }
            else{
                return this.search(root.right, value)
            }
        }
    }

    delete(value){
        this.root = this.deleteNode(this.root, value)
    }

    deleteNode(root, value){
        if(!root){
            return null
        }
        if(value < root.value){
            root.left = this.deleteNode(root.left, value)
        }
        else if(value > root.value){
            root.right = this.deleteNode(root.right, value)
        }
        else{
            if(!root.left && !root.right){
                return null
            }
            if(!root.left){
                return root.right
            }
            else if(!root.right){
                return root.left
            }
            root.value = this.min(root.right)
            root.right = this.deleteNode(root.right, root.value)
        }
        return root
    }

  
    levelOrder(){
        let queue = []
        queue.push(this.root)
        while(queue.length){
            let curr = queue.shift()
            if(curr){
                console.log(curr.value)
                if(curr.left){
                    queue.push(curr.left)
                }
                if(curr.right){
                    queue.push(curr.right)
                }
            }
        }
    }

//To check validility for a bst, e have to max and min and then recursively check for each subtree
    isValid(root, min = -Infinity, max = Infinity){
        if(!root){
            return true
        }
        if(root.value <= min || root.value >= max){
            return false
        }

        return (this.isValid(root.left, min , root.value) && this.isValid(root.right, root.value, max))
    }


    secondLargest(){
        if(!this.root || (!this.root.left && !this.root.right)){
            return null
        }

        let curr = this.root
        let parent = null

        while(curr.right){
            parent = curr
            curr = curr.right
        }

        if(curr.left){
            return this.max(curr.left)
        }
        return parent.value
    }
//To find height of a tree or a node, we need to have a base case and find the left and right subtree height, then max of these two + 1 gives the height  
    height(node){
        if(!node){
            return -1
        }
        else{
            let leftHeight = this.height(node.left)
            let rightHeight = this.height(node.right)
            return Math.max(leftHeight, rightHeight) + 1
        }
    }

    closestValue(target){
        let curr = this.root
        let closest = curr.value
        while(curr){
            if(Math.abs(target - curr.value) < Math.abs(target - closest)){
                closest = curr.value
            }

            if(target < curr.value){
                curr = curr.left
            }
            else if(target > curr.value){
                curr = curr.right
            }
            else{
                break
            }
        }
        return closest

    }

    



}

const bst = new BinarySearchTree()
bst.insert(10)
bst.insert(4)
bst.insert(15)
bst.insert(11)
bst.inOrder(bst.root)
console.log('------')
bst.preOrder(bst.root)
console.log('------')
console.log('Min : ', bst.min(bst.root))
console.log("Max : ", bst.max(bst.root))
console.log('-----')
bst.postOrder(bst.root)
console.log('-----')
console.log(bst.search(bst.root, 10))
console.log(bst.search(bst.root, 1000))

bst.delete(10)
bst.inOrder(bst.root)

console.log('Is valid ? ', bst.isValid(bst.root))

console.log('root Node :', bst.root)

console.log('Level order')
bst.levelOrder()

console.log('Second largest : ', bst.secondLargest())

console.log(bst.root)
console.log('Height of the tree : ', bst.height(bst.root))

console.log('Closest value for 8 : ', bst.closestValue(8))
