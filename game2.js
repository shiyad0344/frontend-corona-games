var canvas = document.querySelector('canvas');
var context = canvas.getContext("2d");

canvas.width = innerWidth;
canvas.height = innerHeight;
var playerx = innerWidth / 2;
var playery = innerHeight - 50;
var velocityfactor = 3;
var score = 0;


class Player {
  constructor(x, y, radius, id) {
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.id = id;
  }

  draw() {
    var player = document.querySelector(".player");
    context.drawImage(player, this.x - this.radius / Math.sqrt(2), this.y - this.radius / Math.sqrt(2), 2 * this.radius / Math.sqrt(2), 2 * this.radius / Math.sqrt(2));
    context.beginPath();
    context.arc(this.x, this.y, this.radius, 0, 2 * Math.PI, true);
    context.strokeStyle = 'white';
    context.stroke();
  }

}


class People {
  constructor(x, y, radius, velocity, id) {
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.velocity = velocity;
    this.id = id;
  }

  draw() {
    var person = document.querySelector(".a" + this.id);
    context.drawImage(person, this.x - this.radius / Math.sqrt(2), this.y - this.radius / Math.sqrt(2), 2 * this.radius / Math.sqrt(2), 2 * this.radius / Math.sqrt(2));
    context.beginPath();
    context.arc(this.x, this.y, this.radius, 0, 2 * Math.PI, true);
    context.strokeStyle = 'white';
    context.stroke();
  }

  update() {
    this.draw();
    this.y = this.y + this.velocity;
  }
}

var people = [];
var timer = 1000 / innerWidth * 600;
if (innerWidth < 1000) {
  timer /= 3;
}


var start = 1;

function populate() {
  setInterval(function() {
    if (start == 1) {
      var x1;
      var y1;
      var radius = 50;
      if (innerWidth < 1000) {
        radius = 25;
      }

      var id = Math.floor(Math.random() * 15 + 1);
      x1 = Math.random() * innerWidth;
      y1 = -radius;

      var person = new People(x1, y1, radius, velocityfactor, id);
      people.push(person);
    }
  }, (timer))
};


function populatesparse() {
  setInterval(function() {
    if (start == 1) {
      var x1;
      var y1;
      var radius = 50;
      if (innerWidth < 1000) {
        radius = 25;
      }

      var id = Math.floor(Math.random() * 15 + 1);
      x1 = Math.random() * innerWidth;
      y1 = -radius;

      var person = new People(x1, y1, radius, velocityfactor, id);
      people.push(person);
    }
  }, (timer * 2))
};

var flag = 0;
var screenpeoplecount;

function animate() {
  var animationid = requestAnimationFrame(animate);
  document.querySelector('.score').innerHTML = score;

  context.fillStyle = 'rgba(0,0,0,1)';
  context.fillRect(0, 0, innerWidth, innerHeight);

  if (score % 10 == 0 && score != 0) {
    velocityfactor += 0.5;
    if (velocityfactor > 12) velocityfactor = 12;
    populatesparse();
    score++;
  }

  if (flag == 1) {
    while (people.length > screenpeoplecount) {
      people.splice(people.length - 1, 1);
    }
  }

  for (var i = 0; i < people.length; i++) {
    people[i].update();
  }

  for (var i = 0; i < people.length; i++) {
    if (people[i].y >= innerHeight + people[i].radius) {
      people.splice(i, 1);
      for (var i = 0; i < people.length; i++) {
        people[i].velocity = velocityfactor;
      }
      score++;
      if (flag == 0) {
        screenpeoplecount = people.length;
        flag = 1;
      }
    }
  }

  var playerradius = 30;
  if (innerWidth < 1000) playerradius = 10;
  var player = new Player(playerx, playery, playerradius, 16);
  player.draw();

  for (var i = 0; i < people.length; i++) {
    if (Math.hypot(people[i].x - playerx, people[i].y - playery) <= playerradius + people[i].radius) {
      document.querySelector('body').classList.remove('refresh');
      cancelAnimationFrame(animationid);
      document.querySelector('.finalscore').innerHTML = "Score : " + score;
      document.querySelector('.scorecard').classList.remove('invisible');
    }
  }

}

animate();
populate();

var offsetx, offsety;

canvas.addEventListener("mousedown", function(event) {
  if (Math.hypot(event.clientX - playerx, event.clientY - playery) <= 40) {
    offsetx = event.clientX - playerx;
    offsety = event.clientY - playery;
    canvas.addEventListener("mousemove", onmousemove);
  }
});

function onmousemove(event) {
  playerx = event.clientX - offsetx;
  playery = event.clientY - offsety;
}

function onmouseup(event) {
  canvas.removeEventListener("mousemove", onmousemove);
  canvas.removeEventListener("mouseup", onmouseup);
}

window.addEventListener("touchstart", function(event) {
  var left = event.clientX || event.targetTouches[0].pageX;
  var top = event.clientY || event.targetTouches[0].pageY;
  if (Math.hypot(left - playerx, top - playery) <= 1500) {
    offsetx = left - playerx;
    offsety = top - playery;
    canvas.addEventListener("touchmove", ontouchmove);
    canvas.addEventListener("touchend", ontouchend);
  }
});

function ontouchmove(event) {
  var left = event.clientX || event.targetTouches[0].pageX;
  var top = event.clientY || event.targetTouches[0].pageY;
  playerx = left - offsetx;
  playery = top - offsety;
  if (playerx < 0) playerx = 0;
  if (playery < 0) playery = 0;
  if (playerx > innerWidth) playerx = innerWidth;
  if (playery > innerHeight) playery = innerHeight;
}

function ontouchend(event) {
  canvas.removeEventListener("touchmove", ontouchmove);
  canvas.removeEventListener("touchend", ontouchend);
}

document.addEventListener("visibilitychange", function() {
  start = document.hidden ? 0 : 1;
});

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
  document.querySelector('.sidebar').style.left = "-350px";
});
