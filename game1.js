var canvas = document.querySelector('canvas');
var context = canvas.getContext("2d");

canvas.width = innerWidth;
canvas.height = innerHeight;
var velocityfactor = 1;
var score = 0;

const x = canvas.width / 2;
const y = canvas.height / 2;


class Player {
  constructor(x, y, radius, color) {
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.color = color;
  }

  draw() {
    context.beginPath();
    context.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
    context.fillStyle = this.color;
    context.fill();
  }
}



class Projectile {
  constructor(x, y, radius, color, velocity) {
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.color = color;
    this.velocity = velocity;
  }

  draw() {
    context.beginPath();
    context.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
    context.fillStyle = this.color;
    context.fill();
  }

  update() {
    this.draw();
    this.x = this.x + this.velocity.x;
    this.y = this.y + this.velocity.y;
  }
}

var projectiles = [];



class Enemy {
  constructor(x, y, radius, color, velocity) {
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.color = color;
    this.velocity = velocity;
  }

  draw() {
    var virus = document.querySelector("img");
    context.drawImage(virus, this.x - this.radius, this.y - this.radius, 2 * this.radius, 2 * this.radius);
  }

  update() {
    this.draw();
    this.x = this.x + this.velocity.x;
    this.y = this.y + this.velocity.y;
  }
}

var enemies = [];


class Particle {
  constructor(x, y, radius, color, velocity) {
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.color = color;
    this.velocity = velocity;
    this.alpha = 1;
  }

  draw() {
    context.save();
    context.globalAlpha = this.alpha;
    context.beginPath();
    context.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
    context.fillStyle = this.color;
    context.fill();
    context.restore();
  }

  update() {
    this.alpha -= 0.01;
    this.draw();
    this.x = this.x + this.velocity.x;
    this.y = this.y + this.velocity.y;
  }
}

var particles = [];

var start = 1;

function throwenemies() {
  setInterval(function() {
    if (start == 1) {
      var x1;
      var y1;
      var radius = Math.random() * 30 + 20;
      var selection = Math.random();
      if (selection < 0.25) {
        x1 = -radius;
        y1 = Math.random() * y * 2;
      } else if (selection < 0.5) {
        x1 = 2 * x + radius;
        y1 = Math.random() * y * 2;
      } else if (selection < 0.75) {
        x1 = Math.random() * x * 2;
        y1 = -radius;
      } else {
        x1 = Math.random() * x * 2;
        y1 = 2 * y + radius;
      }

      var color = '#3edbf0';
      var angle = Math.atan2(y - y1, x - x1);
      var enemy = new Enemy(x1, y1, radius, color, {
        x: velocityfactor * Math.cos(angle),
        y: velocityfactor * Math.sin(angle)
      });
      enemies.push(enemy);
    }
  }, 2000)
};


function animate() {
  var animationid = requestAnimationFrame(animate);
  document.querySelector('.score').innerHTML = score;
  context.fillStyle = 'rgba(0,0,0,0.1)';
  context.fillRect(0, 0, 2 * x, 2 * y);

  var player = new Player(x, y, 20, 'white');
  player.draw();

  for (var i = 0; i < particles.length; i++) {
    if (particles[i].alpha <= 0.1) {
      particles.splice(i, 1);
    } else {
      particles[i].update();
    }
  }

  for (var i = 0; i < projectiles.length; i++) {
    projectiles[i].update();
  }

  for (var i = 0; i < enemies.length; i++) {
    enemies[i].update();
  }

  for (var i = 0; i < projectiles.length; i++) {
    for (var j = 0; j < enemies.length; j++) {
      if (Math.hypot(projectiles[i].x - enemies[j].x, projectiles[i].y - enemies[j].y) <= projectiles[i].radius + enemies[j].radius) {
        score += 1;
        if (enemies[j].radius <= 30) {
          velocityfactor += 0.1;
          for (var k = 0; k < enemies[j].radius; k++) {
            var particle = new Particle(enemies[j].x, enemies[j].y, 2, enemies[j].color, {
              x: 4 * (Math.random() - 0.5),
              y: 4 * (Math.random() - 0.5)
            });
            particles.push(particle);
          }
          projectiles.splice(i, 1);
          enemies.splice(j, 1);
        } else {
          enemies[j].radius -= 10;
          projectiles.splice(i, 1);
        }

      }
    }
  }

  for (var i = 0; i < enemies.length; i++) {
    if (Math.hypot(enemies[i].x - x, enemies[i].y - y) <= enemies[i].radius + player.radius) {
      cancelAnimationFrame(animationid);
      document.querySelector('.scorecard').classList.remove('invisible');
      document.querySelector('.finalscore').innerHTML = "Score : " + score;
      //alert("Your player survived for " + Math.ceil(score) +" months without vaccine, he could have lived for "+ (52*70-Math.ceil(score)) +" more months , if he would have taken vaccine!!");
    }
  }

  for (var i = 0; i < projectiles.length; i++) {
    if (projectiles[i].x < -projectiles[i].radius || projectiles[i].y < -projectiles[i].radius || projectiles[i].x > 2 * x + projectiles[i].radius || projectiles[i].y > 2 * y + projectiles[i].radius) {
      projectiles.splice(i, 1);
    }
  }
}

animate();
throwenemies();

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



canvas.addEventListener('click', function(event) {
  var angle = Math.atan2(event.clientY - y, event.clientX - x);
  var projectile = new Projectile(x, y, 5, 'white', {
    x: 5 * Math.cos(angle),
    y: 5 * Math.sin(angle)
  });
  console.log(angle);
  projectiles.push(projectile);
});

document.addEventListener("visibilitychange", function() {
  start = document.hidden ? 0 : 1;
});
