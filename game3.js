var canvas = document.querySelector('canvas');
var context = canvas.getContext("2d");

canvas.width = innerWidth;
canvas.height = innerHeight;

var side = Math.min(innerWidth, innerHeight) - 80;
var startx;
var starty;
if (innerWidth > innerHeight) {
  startx = (innerWidth - innerHeight) / 2;
  starty = 40;
} else {
  startx = 40;
  starty = (innerHeight - innerWidth) / 2;
}
var boxside = side / 20;
var score = 0;

var playarea = [
  [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
  [1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
  [1, 0, 1, 0, 1, 1, 1, 0, 1, 0, 1, 1, 1, 0, 1, 1, 0, 1, 0, 1],
  [1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 1, 0, 1],
  [1, 0, 1, 1, 0, 1, 1, 1, 1, 0, 1, 1, 1, 0, 0, 0, 0, 0, 0, 1],
  [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 1, 1, 1, 1],
  [1, 1, 1, 1, 0, 1, 0, 1, 1, 0, 1, 0, 1, 1, 1, 0, 0, 0, 0, 1],
  [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1, 1, 0, 1],
  [1, 0, 1, 1, 0, 1, 0, 1, 1, 0, 1, 1, 1, 0, 4, 0, 0, 0, 0, 1],
  [1, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 1, 1, 0, 1, 0, 1],
  [1, 1, 0, 1, 1, 1, 0, 1, 0, 0, 1, 0, 0, 0, 0, 0, 0, 1, 0, 1],
  [1, 1, 0, 0, 0, 1, 0, 1, 0, 1, 1, 1, 1, 0, 1, 1, 1, 1, 0, 1],
  [1, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
  [1, 0, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 1, 0, 1, 1, 1, 1, 0, 1],
  [1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1],
  [1, 1, 1, 0, 1, 0, 1, 1, 1, 0, 1, 1, 1, 1, 0, 1, 0, 1, 1, 1],
  [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
  [1, 0, 1, 1, 0, 1, 0, 1, 1, 0, 1, 0, 1, 1, 0, 1, 1, 1, 0, 1],
  [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
  [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
]


var brick = document.querySelector(".brick");
var mask = document.querySelector(".mask");

function draw() {

  context.fillStyle = 'rgba(0,0,0,1)';
  context.fillRect(0, 0, innerWidth, innerHeight);
  for (var i = 0; i < 20; i++) {
    for (var j = 0; j < 20; j++) {

      if (playarea[i][j] == 1) {
        context.drawImage(brick, startx + j * boxside, starty + i * boxside, boxside, boxside);
      }

      if (playarea[i][j] == 2) {
        var player = document.querySelector("." + playermask + playerdir);
        context.drawImage(player, startx + j * boxside, starty + i * boxside, boxside, boxside);
      }

      if (playarea[i][j] == 3) {
        var virus = document.querySelector("." + virusstate);
        context.drawImage(virus, startx + j * boxside, starty + i * boxside, boxside, boxside);
      }

      if (playarea[i][j] == 4) {
        context.drawImage(mask, startx + j * boxside + 2, starty + i * boxside, boxside, boxside);
        context.beginPath();
        context.arc(startx + j * boxside + boxside / 2, starty + i * boxside + boxside / 2, boxside / 2, 0, 2 * Math.PI, true);
        context.strokeStyle = 'white';
        context.stroke();
      }

    }
  }
}


var playerx = 10;
var playery = 11;
var playerspeedx = 0;
var playerspeedy = 1;
var wantedspeedx = 0;
var wantedspeedy = 1;
var playermask = "n";
var playerdir = "r";
var virusstate = "va";
playarea[playerx][playery] = 2;

var end = 0,
  endp = 0;





class Virus {
  constructor(x, y, speedx, speedy) {
    this.x = x;
    this.y = y;
    this.speedx = speedx;
    this.speedy = speedy;
  }
}

var viruses = [];
var newvirus = new Virus(1, 1, 0, 1);
playarea[1][1] = 3;
viruses.push(newvirus);
newvirus = new Virus(1, 18, 0, 1);
playarea[1][18] = 3;
viruses.push(newvirus);
newvirus = new Virus(18, 1, 0, 1);
playarea[18][1] = 3;
viruses.push(newvirus);
newvirus = new Virus(18, 18, 0, 1);
playarea[18][18] = 3;
viruses.push(newvirus);

function createvirus() {
  setInterval(function() {
    if (playarea[1][1] == 0) {
      var newvirus = new Virus(1, 1, 0, 1);
      playarea[1][1] = 3;
      viruses.push(newvirus);
    }
    if (playarea[1][18] == 0) {
      newvirus = new Virus(1, 18, 0, 1);
      playarea[1][18] = 3;
      viruses.push(newvirus);
    }
    if (playarea[18][1] == 0) {
      newvirus = new Virus(18, 1, 0, 1);
      playarea[18][1] = 3;
      viruses.push(newvirus);
    }
    if (playarea[18][18] == 0) {
      newvirus = new Virus(18, 18, 0, 1);
      playarea[18][18] = 3;
      viruses.push(newvirus);
    }
  }, 15000);
}


function move() {
  var intervalid = setInterval(function() {

    if (playarea[playerx + wantedspeedx][playery + wantedspeedy] != 1) {
      playerspeedx = wantedspeedx;
      playerspeedy = wantedspeedy;
    }

    if (playarea[playerx + playerspeedx][playery + playerspeedy] == 3) {
      if (virusstate == "va")
        end = 1;
      if (virusstate == "vp") {
        score++;
        for (var i = 0; i < viruses.length; i++) {
          if (viruses[i].x == playerx + playerspeedx && viruses[i].y == playery + playerspeedy) {
            viruses.splice(i, 1);
            playarea[playerx][playery] = 0;
            playerx = playerx + playerspeedx;
            playery = playery + playerspeedy;
            playarea[playerx][playery] = 2;
          }
        }
      }
    }

    if (playarea[playerx + playerspeedx][playery + playerspeedy] == 4) {
      virusstate = "vp";
      playermask = "m";
      playarea[playerx][playery] = 0;
      playerx = playerx + playerspeedx;
      playery = playery + playerspeedy;
      playarea[playerx][playery] = 2;
      noofmask++;
      backtonormal();
    }


    for (var i = 0; i < viruses.length; i++) {
      if (playarea[viruses[i].x + viruses[i].speedx][viruses[i].y + viruses[i].speedy] == 4) {
        playarea[viruses[i].x][viruses[i].y] = 0;
        viruses.splice(i, 1);
      }
    }

    for (var i = 0; i < viruses.length; i++) {
      if (playarea[viruses[i].x + viruses[i].speedx][viruses[i].y + viruses[i].speedy] == 2) {
        if (virusstate == "va") {
          end = 1;
          clearInterval(intervalid);
        } else {
          score++;
          playarea[viruses[i].x][viruses[i].y] = 0;
          viruses.splice(i, 1);
        }
      }
    }



    if (end == 0) {
      if (playarea[playerx + playerspeedx][playery + playerspeedy] == 0) {
        playarea[playerx][playery] = 0;
        playerx = playerx + playerspeedx;
        playery = playery + playerspeedy;
        playarea[playerx][playery] = 2;
      }

      for (var i = 0; i < viruses.length; i++) {
        if (playarea[viruses[i].x + viruses[i].speedx][viruses[i].y + viruses[i].speedy] == 0 || playarea[viruses[i].x + viruses[i].speedx][viruses[i].y + viruses[i].speedy] == 3) {
          playarea[viruses[i].x][viruses[i].y] = 0;
          viruses[i].x = viruses[i].x + viruses[i].speedx;
          viruses[i].y = viruses[i].y + viruses[i].speedy;
          playarea[viruses[i].x][viruses[i].y] = 3;
        } else if (playarea[viruses[i].x + viruses[i].speedx][viruses[i].y + viruses[i].speedy] == 1) {
          var random = Math.floor(Math.random() * 3);
          if (random == 0) {
            viruses[i].speedx = -((viruses[i].speedx + 1) % 2);
            viruses[i].speedy = -((viruses[i].speedy + 1) % 2);
          }

          if (random == 1) {
            viruses[i].speedx = -viruses[i].speedx;
            viruses[i].speedy = -viruses[i].speedy;
          }
          if (random == 2) {
            viruses[i].speedx = (viruses[i].speedx + 1) % 2;
            viruses[i].speedy = (viruses[i].speedy + 1) % 2;
          }
        }


      }
    }

  }, 150);
}

function createmask() {
  setInterval(function() {
    var choice = Math.floor(Math.random() * 5);
    if (choice == 0) {
      if (playarea[10][9] == 0)
        playarea[10][9] = 4;
    }
    if (choice == 1) {
      if (playarea[6][4] == 0)
        playarea[6][4] = 4;
    }
    if (choice == 2) {
      if (playarea[15][16] == 0)
        playarea[15][16] = 4;
    }
    if (choice == 3) {
      if (playarea[5][15] == 0)
        playarea[5][15] = 4;
    }
    if (choice == 4) {
      if (playarea[12][4] == 0)
        playarea[12][4] = 4;
    }

  }, 15000);
}

var noofmask = 0;

function backtonormal() {
  setTimeout(function() {
    noofmask--;
    if (noofmask == 0) {
      playermask = "n";
      virusstate = "va";
    }
  }, 10000)
}

function animate() {
  var animationid = requestAnimationFrame(animate);
  document.querySelector('.score').innerHTML = score;

  context.fillStyle = 'rgba(0,0,0,0.1)';
  context.fillRect(0, 0, innerWidth, innerHeight);
  draw();

  if (end == 1 || endp == 1) {
    document.querySelector('body').classList.remove('refresh');
    draw();
    cancelAnimationFrame(animationid);
    document.querySelector('.finalscore').innerHTML = "Score : " + score;
    document.querySelector('.scorecard').classList.remove('invisible');
  }
}



createvirus();
move();
animate();
createmask();

window.addEventListener('keydown', function(event) {
  var key = event.charCode || event.keyCode;
  if (key == 37) {
    wantedspeedx = 0;
    wantedspeedy = -1;
    playerdir = "l";
  } else if (key == 38) {
    wantedspeedx = -1;
    wantedspeedy = 0;
    playerdir = "t";
  } else if (key == 39) {
    wantedspeedx = 0;
    wantedspeedy = 1;
    playerdir = "r";
  } else if (key == 40) {
    wantedspeedx = 1;
    wantedspeedy = 0;
    playerdir = "d";
  }

});

canvas.addEventListener("touchstart", startTouch, false);
canvas.addEventListener("touchmove", moveTouch, false);

var initialX = null;
var initialY = null;

function startTouch(e) {
  initialX = e.touches[0].clientX;
  initialY = e.touches[0].clientY;
};

function moveTouch(e) {
  if (initialX === null) {
    return;
  }

  if (initialY === null) {
    return;
  }

  var currentX = e.touches[0].clientX;
  var currentY = e.touches[0].clientY;

  var diffX = initialX - currentX;
  var diffY = initialY - currentY;

  if (Math.abs(diffX) > Math.abs(diffY)) {
    // sliding horizontally
    if (diffX > 0) {
      wantedspeedx = 0;
      wantedspeedy = -1;
      playerdir = "l";
    } else {
      wantedspeedx = 0;
      wantedspeedy = 1;
      playerdir = "r";
    }
  } else {
    // sliding vertically
    if (diffY > 0) {
      wantedspeedx = -1;
      wantedspeedy = 0;
      playerdir = "t";
    } else {
      wantedspeedx = 1;
      wantedspeedy = 0;
      playerdir = "d";
    }
  }

  initialX = null;
  initialY = null;

  e.preventDefault();
};

const element = document.querySelector(".hamburger");
element.addEventListener("click", () => {
  console.log("clicked");
  document.querySelector('.hamburger').classList.add('invisible');
  document.querySelector('.sidebar').style.left = 0;
});

const element2 = document.querySelector(".sidebar header");
element2.addEventListener("click", () => {
  console.log("clicked");
  document.querySelector('.hamburger').classList.remove("invisible");
  document.querySelector('.sidebar').style.left = "-400px";
});
