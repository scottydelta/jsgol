$( document ).ready(function() {
    var canvas = $("#game")[0];
    var ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    ctx.fillstyle = "white";
    ctx.fillRect(0,0, canvas.width, canvas.height);
    init();
function randomColor(){
    return '#'+Math.random().toString(16).substr(-6);
}

function init(){
    pixelX = 10;
    pixelY = 10;
    numPixel = Math.floor(canvas.width/pixelX);
    grid = new Array(numPixel);
    
    for(var i=0; i<grid.length; i++){
        grid[i] = new Array(numPixel);
        for(var j=0; j<grid[i].length; j++){
            grid[i][j] = (Math.random() >= 0.5) ? 1 : 0;
        }
    }
}
var pixelColor = randomColor();
var bgColor = randomColor();

function populate(){
    for(var i=0; i<grid.length; i++){
        for(var j=0; j<grid[i].length; j++){
            if(grid[i][j]==1){
                ctx.fillStyle = pixelColor;
                ctx.fillRect(i*pixelX, j*pixelY, pixelX-1, pixelY-1)
                ctx.fill();
            } else {
                ctx.fillStyle = bgColor;
                ctx.fillRect(i*pixelX, j*pixelY, pixelX-1, pixelY-1)
                ctx.fill();
	    }
        }
    }
}
init();
populate();
function nextGen(){
    function neighborCount(i,j){
        neighbors = 0;

        function neighborExists(a,b){
            return grid[a] && grid[a][b];
        }
        if(neighborExists(i, j-1)) neighbors++;
        if(neighborExists(i, j+1)) neighbors++;
        if(neighborExists(i-1, j)) neighbors++;
        if(neighborExists(i+1, j)) neighbors++;
        if(neighborExists(i-1, j-1)) neighbors++;
        if(neighborExists(i+1, j+1)) neighbors++;
        if(neighborExists(i-1, j+1)) neighbors++;
        if(neighborExists(i+1, j-1)) neighbors++;

        return neighbors;
    }

    for(var i=0; i<grid.length; i++){
        for(var j=0; j<grid[i].length; j++){
            neighbors = neighborCount(i,j);
             
        }
    } 
}


});

