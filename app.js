const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const mouse = {
  x: 10,
  y: 10,
};

function getDistance(x1, y1, x2, y2) {
  let xDistance = x2 - x1;
  let yDistance = y2 - y1;
  return Math.sqrt(Math.pow(xDistance, 2) + Math.pow(yDistance, 2));
}

const gravity = 0.005;
const friction = 0.99;

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
    ctx.save();
    ctx.globalAlpha = this.alpha;
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);

    ctx.fillStyle = this.color;
    ctx.fill();

    ctx.closePath();
    ctx.restore();
  }
  updateMethod() {
    this.draw();
    this.velocity.x *= friction;
    this.velocity.y *= friction;
    this.velocity.y += gravity;
    this.x += this.velocity.x;
    this.y += this.velocity.y;
    this.alpha -= 0.005;
  }
}
let particles;

function init() {
  particles = [];
}

function animate() {
  requestAnimationFrame(animate);
  ctx.fillStyle = "rgba(0,0,0,0.05)";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  particles.forEach((particle, i) => {
    if (particle.alpha > 0) {
      particle.updateMethod();
    } else {
      particles.splice(i, 1);
    }
  });
}
init();
animate();

// event listener

function handleMouseMove(e) {
  mouse.x = e.clientX;
  mouse.y = e.clientY;
  const particleCount = 2000;
  const angleIncrement = (Math.PI * 2) / particleCount;
  const power = 30;

  for (let i = 0; i < particleCount; i++) {
    particles.push(
      new Particle(
        mouse.x,
        mouse.y,
        3,
        `hsl(${Math.random() * 360}, 50%, 50%)`,
        {
          x: Math.cos(angleIncrement * i) * Math.random() * power,
          y: Math.sin(angleIncrement * i) * Math.random() * power,
        }
      )
    );
  }
}

addEventListener("click", handleMouseMove);
