var Minesweeper = (function privateScope() {

  function _createMinefield(xSize, ySize, mines) {
    if(mines >= xSize * ySize) {
      throw new Error('Too much mines!');
    }
    var minefield = new Array(xSize);
    for(var x = 0; x < xSize; x++) {
      minefield[x] = new Array(ySize);
      for(var y = 0; y < ySize; y++) {
        minefield[x][y] = { content: 0, status: 'concealed' };
      }
    }
    while(mines > 0) {
      var [x,y] = _getRandomCoordinates(xSize, ySize);
      if(minefield[x][y].content === 'M') {
        continue;
      }
      minefield[x][y].content = 'M';
      var xLower = Math.max(x-1,0),
          xHigher = Math.min(x+1,xSize-1);
      for(var adjacentX = xLower; adjacentX <= xHigher; adjacentX++) {
        var yLower = Math.max(y-1,0),
            yHigher = Math.min(y+1,ySize-1);
        for(var adjacentY = yLower; adjacentY <= yHigher ; adjacentY++) {
          if(minefield[adjacentX][adjacentY].content !== 'M') {
            minefield[adjacentX][adjacentY].content++;
          }
        }
      }
      mines--;
    }
    return minefield;
  }

  function _getRandomCoordinates(xSize, ySize) {
    var x = Math.floor(Math.random() * xSize);
    var y = Math.floor(Math.random() * ySize);
    return [x,y];
  }

  function Minesweeper(xSize, ySize, mines) {
    this.status = 'new';
    this.minefield = _createMinefield(xSize, ySize, mines);
    this.startTime = null;
    this.endTime = null;
  }

  Minesweeper.prototype.leftClick = function leftClick(x, y) {
    if(x < 0 || x >= this.minefield.length 
        || y < 0 || y >= this.minefield[x].length) {
      throw new Error('Incorrect coordinates!');
    }
    if(this.status === 'new') {
      this.status = 'ongoing';
      this.startTime = new Date();
    }
    if(this.status === 'ongoing') {
      if(this.minefield[x][y].status === 'revealed' || this.minefield[x][y].status === 'flagged') {
      }
      if(this.minefield[x][y].status === 'concealed') {
        _reveal(this.minefield, x, y);
        if(this.minefield[x][y].content === 'M') {
          this.status = 'lost';
          this.minefield[x][y].content = 'D';
          this.endTime = new Date();
          _revealAll(this.minefield);
        }
        if(this.minefield[x][y].content === '0') {
        }
        if(this.minefield[x][y].content >= 1 && this.minefield[x][y].content <= 8) {
        }
        if(_checkIfWon(this.minefield)) {
          this.status = 'won';
        }
      }
    }
    if(this.status === 'won' || this.status === 'lost') {
    }
  }

  function _reveal(minefield, x, y) {
    minefield[x][y].status = 'revealed';
    if(minefield[x][y].content === 0) {
      var xLo = Math.max(x-1, 0);
      var xHi = Math.min(x+1, minefield.length-1);
      for(var adjX = xLo; adjX <= xHi; adjX++) {
        var yLo = Math.max(y-1, 0);
        var yHi = Math.min(y+1, minefield[adjX].length-1);
        for(var adjY = yLo; adjY <= yHi ; adjY++) {
          if(minefield[adjX][adjY].status === 'concealed' || minefield[adjX][adjY].status === 'flagged') {
            _reveal(minefield, adjX, adjY);
          }
        }
      }
    }
  }

  function _revealAll(minefield) {
    for(var x = 0; x < minefield.length; x++) {
      for(var y = 0; y < minefield[x].length; y++) {
        minefield[x][y].status = 'revealed';
      }
    }
  }

  Minesweeper.prototype.rightClick = function rightClick(x, y) {
    if(x < 0 || x >= this.minefield.length 
        || y < 0 || y >= this.minefield[x].length) {
      throw new Error('Incorrect coordinates!');
    }
    if(this.status === 'new') {
      this.status = 'ongoing';
      this.startTime = new Date();
    }
    if(this.status === 'ongoing') {
      if(this.minefield[x][y].status === 'concealed') {
        this.minefield[x][y].status = 'flagged';
      }
      else if(this.minefield[x][y].status === 'flagged') {
        this.minefield[x][y].status = 'concealed';
      }
      if(_checkIfWon(this.minefield)) {
        this.status = 'won';
      }
    }
    if(this.status === 'won' || this.status === 'lost') {
    }
  }
  
  function _checkIfWon(minefield) {
    for(var x = 0; x < minefield.length; x++) {
      for(var y = 0; y < minefield[x].length; y++) {
        var f = minefield[x][y].status === 'flagged' ? true : false;
        var m = minefield[x][y].content === 'M' || minefield[x][y].content === 'D' ? true : false; 
        if((f || m) && (!f || !m)) {
          return false;
        }
      }
    }
    return true;
  }

  return Minesweeper;

}());

function drawMinefield(game) {
  game.minefield.reverse().forEach(function(row) {
    console.log(row.map(cell => cell.content === 0 ? ' ' : cell.content).join(' '));
  });
}

//var game = new Minesweeper(16,16,40);
// drawMinefield(game);
