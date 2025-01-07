class Heap{
    constructor(){
        this.heap = []
    }

    insert(value){
        this.heap.push(value)
        this.bubbleUp()
    }

    bubbleUp(){
        let index = this.heap.length - 1
        while(index > 0){
            let parentIndex = Math.floor((index - 1) / 2 )
            if(this.heap[index] >= this.heap[parentIndex]){
                break
            }
            [this.heap[index], this.heap[parentIndex]] = [this.heap[parentIndex], this.heap[index]]
            index = parentIndex
        }
    }

    remove(){
        if(this.heap.length === 0) return null
        if(this.heap.length === 1) return this.heap[0]
        let root = this.heap[0]
        this.heap[0] = this.heap.pop()
        this.bubbleDown()
        return root
    }

    bubbleDown(){
        let index = 0
        let length = this.heap.length
        while(true){
            let leftChildIndex = 2 * index + 1
            let rightChildIndex = 2 * index + 2
            let smallest = index

            if(leftChildIndex < length && this.heap[leftChildIndex] < this.heap[smallest]) 
                smallest = leftChildIndex

            if(rightChildIndex < length && this.heap[rightChildIndex] < this.heap[smallest])
                smallest = rightChildIndex

            if(smallest === index) break

            [this.heap[index], this.heap[smallest]] = [this.heap[smallest], this.heap[index]]
            index = smallest
        }
    }



    print(){
        console.log(this.heap)
    }
}

const h = new Heap()
h.insert(1)
h.insert(2)
h.insert(3)
h.insert(4)
h.insert(5)
h.print()

console.log('After removal')
h.remove()
h.print()


