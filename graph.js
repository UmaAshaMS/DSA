/* 

add a vertex,
add an edge, 
remove a vertex, 
remove a edge, 
print, 
has edge,
bfs,
dfs

*/ 

class Graph{
    constructor(){
        this.vertices = new Set()
        this.edges = new Map()
    }

    addVertex(vertex){
        if(!this.vertices.has(vertex)){
            this.vertices.add(vertex)
            this.edges.set(vertex, new Set())
        }
    }

    addEdge(source, target){
        if(!this.vertices.has(source)) this.vertices.add(source)
        if(!this.vertices.has(target)) this.vertices.add(target)

        this.edges.get(source).add(target)
    }

    removeVertex(vertex){
        if(this.vertices.has(vertex)){
            this.vertices.delete(vertex)
            this.edges.delete(vertex)
        }
        for(let adjList of this.edges.values()){
            adjList.delete(vertex)
        }
    }

    removeEdge(source, target){
        if(this.vertices.has(source) && this.vertices.has(target)){
            this.edges.get(source).delete(target)
        }
    }

    print(){
        for(let vertex of this.vertices){
            let adjList = [...this.edges.get(vertex)]
            console.log(`${vertex} : ${adjList.join(', ')}`)
        }
    }

    hasEdge(source,target){
        if(!this.vertices.has(source)){
            return false
        }
        return this.edges.get(source).has(target)
    }

    bfs(start){
        let visited = new Set()
        let queue = [start]
        let result  = []

        visited.add(start)

        while(queue.length >= 0){
            
            const node = queue.shift()
            result.push(node)
            
            for(let neighbor of this.edges.get(node) || []){
                if(!visited.has(neighbor)){
                    visited.add(neighbor)
                    queue.push(neighbor)
                }  
            }
        }
        return result
    }

    dfs(start){
        let visited = new Set()
        let stack = [start]
        let result = []

        while(stack.length > 0){
            const node = stack.pop()
            if(!visited.has(node)){
                visited.add(node)
                result.push(node)
            }
            for(let neighbor of this.edges.get(node) || []){
                if(!visited.has(neighbor)){
                    stack.push(neighbor)
                }
            }
        }
        return result
    }
}

const g = new Graph()
g.addVertex('A')
g.addVertex('B')
g.addVertex('C')
g.addVertex('D')
g.addVertex('E')


g.addEdge('A','B')
g.addEdge('A','C')
g.addEdge('B','D')
g.addEdge('C','E')
g.addEdge('D','B')
g.addEdge('E','C')
g.print()
console.log('-------------')
g.removeVertex('E')
g.print()
console.log('-------------')
g.removeEdge('E','C')
g.print()
console.log('-------------')
console.log('BFS',g.bfs('A'))
console.log('DFS',g.dfs('A'))




