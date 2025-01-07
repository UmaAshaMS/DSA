//insert, search, prefixMatch, longestPrefix, delete, dispaly autocomplete

class TrieNode{
    constructor(){
        this.children = {}
        this.endOfWOrd = false
    }
}

class Trie{
    constructor(){
        this.root = new TrieNode()
    }

    insert(word){
        let curr = this.root
        for(let char of word){
            if(!curr.children[char]){
                curr.children[char] = new TrieNode()
            }
            curr = curr.children[char]
        }
        curr.endOfWord = true
    }

    search(word){
        let curr = this.root
        for(let char of word){
            if(!curr.children[char]){
                return false
            }
            curr = curr.children[char]
        }
        return curr.endOfWord
    }

    prefixMatch(prefix){
        let curr = this.root
        for(let char of prefix){
            if(!curr.children[char]){
                return false
            }
            curr = curr.children[char]
        }
        return true
    }

    delete(word){
        const deleteRecursively = (node, word, index) => {
            //base case
            if(index === word.length){
                if(!node.endOfWOrd){
                    return false
                }
                node.endOfWOrd = false // unmark end of the word

                return Objeck.keys(node.children).length === 0 
                /* Object.keys(node.children) will return the array of keys, which are the child nodes of that node
                    return true if the length === 0
                */
            }

            const char = word[index] //current character in the word
            const child = node.children[char] //get the child node of chara

            if(!child){
                return false
            }

            const shouldDelete = deleteRecursively(child, word, index+1) 

            if(shouldDelete){
                delete node.children[char]
                return Object.keys(node.children).length === 0 && !node.endOfWord
            }

            return false
        }
        deleteRecursively(this.root, word, 0)
    }

    longestPrefix(word){
        let curr = this.root
        let prefix = ''
        for(let char of word ){
            if(curr.children[char]){
                prefix += char 
                curr = curr.children[char]
            }
            else{
                break
            }
        }
        return prefix
    }
//To display, first collect all nodes
    collectAllNodes(node = this.root, prefix = '', words = []){
        if(node.endOfWord){
            words.push(prefix)
        }
        for(let char in node.children){
            this.collectAllNodes(node.children[char], prefix+char, words)
        }
        return words
    }

    display(){
        return this.collectAllNodes()
    }

//autocomplete
    findNode(prefix){
        let curr = this.root
        for(let char of prefix){
            if(!curr.children[char]){
                return null
            }
            curr = curr.children[char]    
        }
        return curr
    }

    collect(node, prefix, words){
        if(node.endOfWord){
            words.push(prefix)
        }
        for(let char in node.children){
            this.collect(node.children[char], prefix+char, words)
        }
    }

    autocomplete(prefix){
        const startNode = this.findNode(prefix)
        if(!startNode){
            return null
        }
        let words = []
        this.collect(startNode, prefix, words)
        return words
    }
}

const t = new Trie()
t.insert('cat')
t.insert('car')
t.insert('can')
t.insert('canva')
t.insert('cannabel')
t.insert('do')
console.log(t.search('cat'))
console.log(t.prefixMatch('d'))
t.delete('cat')
console.log('Is cat still here  ? ',t.search('cat'))
console.log(t.longestPrefix('candle'))
console.log(t.display())

console.log('Autocomplete words for can : ', t.autocomplete('can') )