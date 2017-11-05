window.addEventListener('load', function() {

  var mouseDown = false;
  document.addEventListener('mousedown', function(event) {
    if(event.button === 0) {
      mouseDown = true;
    }
  }, false);
  document.addEventListener('mouseup', function(event) {
    if(event.button === 0) {
      mouseDown = false;
    }
  }, false);

  var minesweeperGame = document.querySelector('.minesweeper-game');
  minesweeperGame.addEventListener('contextmenu', function(event) {
    event.preventDefault();
  }, false);

  createMinefield();

  var button = document.querySelector('.new-game-button');
  button.onclick = function() {
    clearMinefield();
    createMinefield();
  };
  button.addEventListener('mousedown', function(event) {
    if(event.button === 0) {
      this.classList.add('pressed-button');
    }
  }, false);
  button.addEventListener('mouseup', function(event) {
    if(event.button === 0) {
      this.classList.remove('pressed-button');
    }
  }, false);
  button.addEventListener('mouseover', function(event) {
    if(mouseDown) {
      this.classList.add('pressed-button');
    }
  }, false);
  button.addEventListener('mouseout', function(event) {
    if(mouseDown) {
      this.classList.remove('pressed-button');
    }
  }, false);

  function clearMinefield() {
    var minefield = document.querySelector('.minesweeper-game .minefield');
    var children = [];
    for(var i = 0; i < minefield.children.length; i++) {
      children[i] = minefield.children[i];
    }
    for(var i = 0; i < children.length; i++) {
      minefield.removeChild(children[i]);
    }
  }
  
  function createMinefield() {

    var xSize = 16;
    var ySize = 16;
    var mines = 40;

    var game = new Minesweeper(xSize, ySize, mines);
    var button = document.querySelector('.minesweeper-game .new-game-button');
    button.classList.remove('glasses');
    button.classList.remove('sad');
    button.classList.add('happy');
    
    var minefield = document.querySelector('.minesweeper-game .minefield');
    for(var y = ySize-1; y >= 0; y--) {
      for(var x = 0; x < xSize; x++) {
        var cell = document.createElement('div');
        cell.classList.add('cell');
        if(x === 0) {
          cell.classList.add('first-cell');
        }
        cell.classList.add('concealed-cell');
        cell.x = x;
        cell.y = y;
        cell.addEventListener('click', function(event) {
          if(event.button === 0) {
            game.leftClick(this.x, this.y);
            updateMinefield(game);
          }
        }, false);
        cell.addEventListener('contextmenu', function() {
            game.rightClick(this.x, this.y);
            updateMinefield(game);
        }, false);
        cell.addEventListener('mousedown', function(event) {
          if(event.button === 0) {
            this.classList.add('pressed-cell');
            button.classList.add('blowjob');
          }
        }, false);
        cell.addEventListener('mouseup', function(event) {
          if(event.button === 0) {
            this.classList.remove('pressed-cell');
            button.classList.remove('blowjob');
          }
        }, false);
        cell.addEventListener('mouseover', function(event) {
          if(mouseDown) {
            this.classList.add('pressed-cell');
            button.classList.add('blowjob');
          }
        }, false);
        cell.addEventListener('mouseout', function(event) {
          if(mouseDown) {
            this.classList.remove('pressed-cell');
            button.classList.remove('blowjob');
          }
        }, false);
        minefield.appendChild(cell);
      }
    }
  }

  function updateMinefield(game) {
    var button = document.querySelector('.minesweeper-game .new-game-button');
    if(game.status === 'ongoing' || game.status === 'new') {
      button.classList.remove('glasses');
      button.classList.remove('sad');
      button.classList.add('happy');
    }
    if(game.status === 'lost') {
      button.classList.remove('glasses');
      button.classList.remove('happy');
      button.classList.add('sad');
    }
    if(game.status === 'won') {
      button.classList.remove('sad');
      button.classList.remove('happy');
      button.classList.add('glasses');
    }

    var minefield = document.querySelector('.minesweeper-game .minefield');
    for(var i = 0; i < minefield.children.length; i++) {
      var cell = minefield.children[i];
      if(game.minefield[cell.x][cell.y].status === 'revealed') {
        cell.classList.remove('concealed-cell');
        cell.classList.remove('flagged-cell');
        cell.classList.add('revealed-cell');
        var content = game.minefield[cell.x][cell.y].content;
        if(content === 'M') {
          cell.classList.add('mine');
          cell.textContent = '';
        }
        if(content === 'D') {
          cell.classList.add('mine');
          cell.classList.add('detonated-mine');
          cell.textContent = '';
        }
        if(content === 0) {
          cell.classList.add('hint');
          cell.textContent = '';
        }
        if(content >= 1 && content <= 8) {
          cell.textContent = content.toString();
          cell.classList.add('hint');
          switch(content) {
            case 1:
              cell.classList.add('hint-one');
              break;
            case 2:
              cell.classList.add('hint-two');
              break;
            case 3:
              cell.classList.add('hint-three');
              break;
            case 4:
              cell.classList.add('hint-four');
              break;
            case 5:
              cell.classList.add('hint-five');
              break;
            case 6:
              cell.classList.add('hint-six');
              break;
            case 7:
              cell.classList.add('hint-seven');
              break;
            case 8:
              cell.classList.add('hint-eight');
              break
          }
        }
      }
      if(game.minefield[cell.x][cell.y].status === 'flagged') {
        cell.textContent = '';
        cell.classList.add('flagged-cell'); 
        cell.classList.add('concealed-cell');
        cell.classList.remove('mine');
        cell.classList.remove('detonated-mine');
      }
      if(game.minefield[cell.x][cell.y].status === 'concealed') {
        cell.classList.add('concealed-cell');
        cell.textContent = '';
        cell.classList.remove('mine');
        cell.classList.remove('detonated-mine');
        cell.classList.remove('flagged-cell');
      }
    }
  }

}, false);

