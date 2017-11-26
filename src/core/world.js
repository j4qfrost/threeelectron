let BLOCK = require('./block')
let chunkClass = require('./chunk')



let waterLevel = 10

class World {
    constructor() {

        this.worldChunkWidth = 8//3//2
        this.worldChunkDepth = 8//3//2
        this.worldChunkHeight = 2


        this.totalWidth = this.worldChunkWidth * chunkClass.ChunkBlockWidth * chunkClass.blockScale
        this.totalHeight = this.worldChunkHeight * chunkClass.ChunkBlockHeight * chunkClass.blockScale
        this.totalDepth = this.worldChunkDepth * chunkClass.ChunkBlockDepth * chunkClass.blockScale

        this.chunks = []

        for (var x = 0; x < this.worldChunkWidth; x++) {
            for (var y = 0; y < this.worldChunkHeight; y++) {
                for (var z = 0; z < this.worldChunkDepth; z++) {
                    let chunk = new chunkClass.Chunk(x, y, z)
                    this.chunks[x + z * this.worldChunkWidth + y * this.worldChunkWidth * this.worldChunkDepth] = chunk
                }
            }
        }

        this.started = false
        this.done = false
        this.busy = false
    }


    getChunk(x, y, z) {
        let indexX = Math.floor(x / chunkClass.ChunkBlockWidth) | 0;
        let indexZ = Math.floor(z / chunkClass.ChunkBlockDepth) | 0;
        let indexY = Math.floor(y / chunkClass.ChunkBlockHeight) | 0;

        return (this.chunks[indexX + indexZ * this.worldChunkWidth + indexY * this.worldChunkWidth * this.worldChunkDepth]);
    }

    getBlock(x, y, z) {
        let chunk = this.getChunk(x, y, z)

        if (!chunk) {
            return 0
        }

        let localX = x - chunk.xWS()
        let localZ = z - chunk.zWS()
        let localY = y - chunk.yWS()

        return (chunk.getBlock(localX, localY, localZ)) | 0;
    }

    isTransparent(blockID) {
        return blockID == BLOCK.BlockType.WATER
    }


    // TODO: try to make this more async
    //      Using setInterval for async seems like a hack.
    //      Try using HTML5 web workers
    generate(heightFunc, scene) {

        let size = this.worldChunkWidth * this.worldChunkHeight * this.worldChunkDepth

        this.started = true

        let i = 0

        setInterval(() => {


            if (i < size) {
                this.chunks[i].generateChunk(heightFunc, waterLevel)
                this.chunks[i].generateMesh(scene, this)
                i++
            }

        }, 1000)



    }


}

let Instance = new World()



module.exports = {
    World: World,
    Instance: Instance,
    WorldChunkWidth: this.worldChunkWidth,
    WorldChunkDepth: this.worldChunkDepth,
    WorldChunkHeight: this.worldChunkHeight,
}


