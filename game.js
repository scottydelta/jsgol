$( document ).ready(function() {
        var grid;
        var pixelX, pixelY, numPixel;
        var canvas = $("#game")[0];
        var ctx = canvas.getContext('2d');
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        ctx.fillstyle = "white";
        ctx.fillRect(0,0, canvas.width, canvas.height);
        function randomColor(){
                return '#'+Math.random().toString(16).substr(-6);
        }
	$(".initiate").click(init);
        function init(){
		gosperGlider = [
			[1, 5],[1, 6],[2, 5],[2, 6],[11, 5],[11, 6],[11, 7],[12, 4],[12, 8],[13, 3],[13, 9],[14, 3],[14, 9],[15, 6],[16, 4],[16, 8],[17, 5],[17, 6],[17, 7],[18, 6],[21, 3],[21, 4],[21, 5],[22, 3],[22, 4],[22, 5],[23, 2],[23, 6],[25, 1],[25, 2],[25, 6],[25, 7],[35, 3],[35, 4],[36, 3],[36, 4]
		];
                pixelX = 10;
                pixelY = 10;
                numPixel = Math.floor(canvas.width/pixelX);
                grid = new Array(numPixel);                
                for(var i=0; i<grid.length; i++){
                        grid[i] = new Array(numPixel);
                        for(var j=0; j<grid[i].length; j++){
				if(this.value=="Random") grid[i][j] = (Math.random() >= 0.5) ? 1 : 0;  //To make random config
				else grid[i][j] = 0; //To make all 0 for gosper glider config
                        }
                }
		if(this.value=="Gosper"){
			for(var i=0; i<gosperGlider.length; i++){
				grid[gosperGlider[i][0]][gosperGlider[i][1]] = 1;
			}
                }
		nextGen();
        }
        var pixelColor = randomColor();
        var bgColor = randomColor();

        function draw(){
                for(var i=0; i<grid.length; i++){
                        for(var j=0; j<grid[i].length; j++){
                                if(grid[i][j]==1){
                                        ctx.fillStyle = pixelColor;
                                        ctx.fillRect(i*pixelX, j*pixelY, pixelX-1, pixelY-1);
                                        ctx.fill();
                                } else {
                                        ctx.fillStyle = bgColor;
                                        ctx.fillRect(i*pixelX, j*pixelY, pixelX-1, pixelY-1);
                                        ctx.fill();
	                        }
                        }
                }
        }

        function nextGen(){
	window.requestAnimFrame = function(){
	    return (
		/* These browser based callbacks are too fast(~60fps) to see the simulation
		window.requestAnimationFrame       || 
		window.webkitRequestAnimationFrame || 
		window.mozRequestAnimationFrame    || 
		window.oRequestAnimationFrame      || 
		window.msRequestAnimationFrame     || 
		*/function(callback){
		    window.setTimeout(callback, $('#timeout').val());
		}
	    );
	}();
                var nextGrid = [];
                function neighborCount(i,j){
                        var neighbors = 0;
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
                        nextGrid[i] = [];
                        for(var j=0; j<grid[i].length; j++){
                                var neighbors = neighborCount(i,j);
                                nextGrid[i][j] = grid[i][j];
				if (grid[i][j] == 1 && neighbors < 2)
				    nextGrid[i][j] = 0;
				if (grid[i][j] == 1 && (neighbors == 2 || neighbors == 3))
				   nextGrid[i][j] = 1;
				if (grid[i][j] == 1 && neighbors > 3)
				    nextGrid[i][j] = 0;
				if (grid[i][j] == 0 && neighbors == 3)
				    nextGrid[i][j] = 1;
                                //if(neighbors < 2 || neighbors > 3) nextGrid[i][j] = 0;
                                //if(grid[i][j] == 0 && neighbors == 3) nextGrid[i][j] = 1;                              
                        }
                }
                grid = nextGrid;
                draw();
                requestAnimFrame(nextGen);
        }

});

