// Animated fleur-de-lis background
const canvas = document.getElementById('fleur-canvas');
const ctx = canvas.getContext('2d');
let fleurs = [];

function resize() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}
resize();
window.addEventListener('resize', resize);

function drawFleur(ctx, x, y, size, opacity) {
  ctx.save();
  ctx.globalAlpha = opacity;
  ctx.fillStyle = '#1a3a8f';
  ctx.translate(x, y);
  ctx.scale(size, size);
  ctx.beginPath();
  // top petal
  ctx.moveTo(0, -10);
  ctx.bezierCurveTo(-5, -6, -5, 0, 0, 2);
  ctx.bezierCurveTo(5, 0, 5, -6, 0, -10);
  // left petal
  ctx.moveTo(-10, 4);
  ctx.bezierCurveTo(-6, 0, 0, 0, 2, 4);
  ctx.bezierCurveTo(0, 8, -6, 8, -10, 4);
  // right petal
  ctx.moveTo(10, 4);
  ctx.bezierCurveTo(6, 0, 0, 0, -2, 4);
  ctx.bezierCurveTo(0, 8, 6, 8, 10, 4);
  // stem
  ctx.rect(-1, 4, 2, 6);
  ctx.fill();
  ctx.restore();
}

class Fleur {
  constructor() { this.reset(); }
  reset() {
    this.x = Math.random() * canvas.width;
    this.y = Math.random() * canvas.height;
    this.size = 0.4 + Math.random() * 1.2;
    this.opacity = 0.03 + Math.random() * 0.08;
    this.speed = 0.15 + Math.random() * 0.3;
    this.drift = (Math.random() - 0.5) * 0.3;
    this.rotation = Math.random() * Math.PI * 2;
    this.rotSpeed = (Math.random() - 0.5) * 0.005;
  }
  update() {
    this.y -= this.speed;
    this.x += this.drift;
    this.rotation += this.rotSpeed;
    if (this.y < -40) { this.y = canvas.height + 40; this.x = Math.random() * canvas.width; }
  }
  draw() {
    ctx.save();
    ctx.translate(this.x, this.y);
    ctx.rotate(this.rotation);
    drawFleur(ctx, 0, 0, this.size, this.opacity);
    ctx.restore();
  }
}

for (let i = 0; i < 35; i++) fleurs.push(new Fleur());

function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  fleurs.forEach(f => { f.update(); f.draw(); });
  requestAnimationFrame(animate);
}
animate();