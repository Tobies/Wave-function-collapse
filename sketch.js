let tiles = []
let grid = []
let res = 16;
let preGenerate = false;

class Tile {

    
    constructor(img, acceptedNorth, acceptedEast, acceptedSouth, acceptedWest) {
        this.acceptedNorth = acceptedNorth;
        this.acceptedEast = acceptedEast;
        this.acceptedSouth = acceptedSouth;
        this.acceptedWest = acceptedWest;
        this.img = img;
    }


    draw(x, y) {
        image(this.img, x, y);
        stroke(255, 0, 0)
        strokeWeight(5)
    }

 }
class gridEntry {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.tileIndex = -1;
        this.entropy = [];
        this.radius = 3;
    }

    removeUncommon(options) {
        
        for (var i = 0; i < tiles.length; i++) {
            if (!options.includes(i)) {
                if (this.entropy.includes(i)) {
                    this.entropy.splice(this.entropy.findIndex(v => v == i), 1); 
                }                
            } 
        }

    }

    calculateEntropy() {
        if (this.tileIndex < 0) {
            this.entropy = [];
            for (var i = 0; i < tiles.length; i++) {
                this.entropy.push(i);
            }

            
            
           

            var neighbors = [
                (this.x < res && this.x >=0 && this.y - 1 < res && this.y - 1 >= 0) ? tiles[grid[(this.x) + (this.y-1)*res].tileIndex] : null,//      N
                (this.x + 1< res && this.x + 1 >= 0 && this.y < res && this.y >= 0) ? tiles[grid[(this.x+1) + (this.y)*res].tileIndex] : null,//         E
                (this.x - 1 < res && this.x - 1 >=0 && this.y < res && this.y >= 0) ? tiles[grid[(this.x-1) + (this.y)*res].tileIndex] : null,//   W  
                (this.x < res && this.x >=0 && this.y + 1 < res && this.y + 1 >= 0) ? tiles[grid[(this.x) + (this.y+1)*res].tileIndex] : null //      S
            ];
            
            
            if (neighbors[0] != null) {
                this.removeUncommon(neighbors[0].acceptedSouth)
            }
            if (neighbors[1] != null) {
                this.removeUncommon(neighbors[1].acceptedWest)
            }
            if (neighbors[2] != null) {
                this.removeUncommon(neighbors[2].acceptedEast)
            }
            if (neighbors[3] != null) {
                this.removeUncommon(neighbors[3].acceptedNorth)
            }
        } else {
            this.entropy = [];
        }


        if (this.entropy.length == 0 && this.tileIndex < 0) {
            for (var oX = -this.radius; oX < this.radius; oX++) {
                for (var oY = -this.radius; oY < this.radius; oY++) {
                    if (this.x + oX >= 0 && this.x + oX < res && this.y + oY >= 0 && this.y + oY < res) {
                        grid[(this.x+oX) + (this.y + oY)*res].tileIndex = -1;
                    }
                }
            }
            this.radius = Math.min(4, this.radius+1);
        }

        return this.entropy.length;

    }
    
        
        
    

    
    

 }
      





function initializeTiles() {
    tiles.push(new Tile(loadImage("assests\\dungeon\\0.png" ), [12], [0,2,3,22,10], [4,5,6], [0,1,3,23]))
    tiles.push(new Tile(loadImage("assests\\dungeon\\1.png" ), [10], [0,2,3,22], [4,5,6,27], [4,5,6,7,2,23,26,11,27]))
    tiles.push(new Tile(loadImage("assests\\dungeon\\2.png" ), [11], [4,5,6,7,22,10,20,27], [4,5,6], [0,1,3,23]))
    tiles.push(new Tile(loadImage("assests\\dungeon\\3.png" ), [12], [0,2,10], [4,5,6], [0,1]))
    tiles.push(new Tile(loadImage("assests\\dungeon\\4.png" ), [0,1,2,3,4,5,6,7], [1,4,5,6,7,20,22,26,27], [4,5,6,20,21,24,27], [26,4,5,6,7,11,21,23,2,27]))
    tiles.push(new Tile(loadImage("assests\\dungeon\\5.png" ), [0,2,3,4,5,6,7],   [1,4,5,6,7,20,22,26,27,10], [4,5,6,20,21,24,27], [26,2,4,5,6,7,21,23,11,27]))
    tiles.push(new Tile(loadImage("assests\\dungeon\\6.png" ), [0,1,2,4,5,6,7],   [1,4,5,6,7,20,22,26,27], [4,5,6,20,21,24,27], [26,2,4,5,6,7,11,21,23,27]))
    tiles.push(new Tile(loadImage("assests\\dungeon\\7.png" ), [26], [4,5,6,7,10,1,20], [4,5,6,24,20,21], [4,5,6,7,23,11,21]))
    tiles.push(new Tile(loadImage("assests\\dungeon\\8.png" ), [], [], [], []))
    tiles.push(new Tile(loadImage("assests\\dungeon\\9.png" ), [14,15,16,18,19,24], [11,17], [11,23], [14,15,16,17,22,4,5,6]))
    tiles.push(new Tile(loadImage("assests\\dungeon\\10.png"), [17,20,22], [11,12,17], [1], [1,2,4,5,6,11,7,21,26,27]))
    tiles.push(new Tile(loadImage("assests\\dungeon\\11.png"), [9,21,23], [20,22,4,5,6,1,25,2,7], [2], [9,10,12]))
    tiles.push(new Tile(loadImage("assests\\dungeon\\12.png"), [14,15,16,18,19,24], [11,12], [0,3], [10,12,9]))
    tiles.push(new Tile(loadImage("assests\\dungeon\\13.png"), [], [], [], []))
    tiles.push(new Tile(loadImage("assests\\dungeon\\14.png"), [14,15,16,18,19,24], [9,14,15,16,19,23], [9,12,14,15,16,17], [14,15,16,17,18,22]))
    tiles.push(new Tile(loadImage("assests\\dungeon\\15.png"), [14,15,16,18,19,24], [9,14,15,16,19,23], [9,12,14,15,16,17], [14,15,16,17,18,22]))
    tiles.push(new Tile(loadImage("assests\\dungeon\\16.png"), [14,15,16,18,19,24], [9,14,15,16,19,23], [9,12,14,15,16,17], [14,15,16,17,18,22]))
    tiles.push(new Tile(loadImage("assests\\dungeon\\17.png"), [15,16,18,19,24], [9,14,15,16,19,23], [9,10,18,22], [10,9]))
    tiles.push(new Tile(loadImage("assests\\dungeon\\18.png"), [20,22], [9,14,15,16,19,23], [9,12,14,15,16,17], [19,20,24]))
    tiles.push(new Tile(loadImage("assests\\dungeon\\19.png"), [21,23], [18,21,24], [9,14,15,16,17], [14,15,16,17,18,22]))
    tiles.push(new Tile(loadImage("assests\\dungeon\\20.png"), [5,7], [18,21,24], [10,18,22], [11,4,5,6,23]))
    tiles.push(new Tile(loadImage("assests\\dungeon\\21.png"), [4,5,6,7], [4,5,6,20,22,10,26], [23,19,11], [19,20,24]))
    tiles.push(new Tile(loadImage("assests\\dungeon\\22.png"), [20,22], [9,14,15,16,19,23], [10,18,22], [21,4,5,6,11,2,1]))
    tiles.push(new Tile(loadImage("assests\\dungeon\\23.png"), [21,23,9], [22,20,4,5,6,10,1,0,2], [11,19,23,25], [14,15,16,17,18,22]))
    tiles.push(new Tile(loadImage("assests\\dungeon\\24.png"), [4,5,6,7], [21,24], [9,12,14,15,16,17], [19,20,24]))
    tiles.push(new Tile(loadImage("assests\\dungeon\\25.png"), [10, 11], [4,5,6], [4,5,6], [23,4,5,6]))
    tiles.push(new Tile(loadImage("assests\\dungeon\\26.png"), [27], [4,5,6,1,10], [7], [4,5,6,21]))
    tiles.push(new Tile(loadImage("assests\\dungeon\\27.png"), [4,5,6], [4,5,6,1,10], [26], [4,5,6,2,11]))
    for (var i = 0; i < tiles.length; i++) {
        tiles[i].id = i;
    }
 }
function populateGrid() {
    for (var i = 0; i < res*res; i++) {
        grid.push(new gridEntry(i%res, (i - i%res)/res));
    }
 }
function calculateEntropies() {
    var entropies = 0;
    for (var i = 0; i < grid.length; i++) {
        entropies += grid[i].calculateEntropy();
    }
    return entropies;
 }
function next() {
    var options = []
    var lowestEntropy = 999;
    var index = -1;
    for (var i = 0; i < res*res; i++) {
        if (grid[i].tileIndex < 0) {
             if (grid[i].entropy.length < lowestEntropy && grid[i].entropy.length > 0) {
                 options = [i];
                 lowestEntropy = grid[i].entropy.length;
             } else if (grid[i].entropy.length == lowestEntropy) {
                 options.push(i);
             }
         }
    }
    if (options.length > 0) {
        index = options[Math.floor(Math.random() * options.length)];
        if (grid[index].entropy.length > 0) {
            grid[index].tileIndex = grid[index].entropy[Math.floor(Math.random() * grid[index].entropy.length)];
        }
    }
 
 }
function drawGrid() {
    for (var x = 0; x < res; x++) {
        for (var y = 0; y < res; y++) {
            if (grid[y * res + x].tileIndex >= 0) {
              tiles[grid[y * res + x].tileIndex].draw(x * 16, y * 16);
            }
        }
    }
 }
function applyPen() {
    strokeWeight(1)
    stroke(0)
    fill(0, 0)
 }

function preload() {   
    initializeTiles();
 }

function setup() {
    createCanvas(res*16, res*16);
    populateGrid();
    if (preGenerate) {
        while(calculateEntropies() > 0) {
            next();
        }
    }
 }



function draw() {
    background(220)
    if (!preGenerate) {
        if (calculateEntropies() > 0) {
            next();
        }
    }
    drawGrid();
    applyPen();
    rect(mouseX - mouseX%16, mouseY - mouseY%16, 16,16)
    var completed = 0;
    for (var i =0; i < grid.length; i++) {
        if (grid[i].tileIndex >= 0) {
            completed++;
        }
    }

    text(completed + "/" + grid.length, 0, 0, 500, 50);
 }

