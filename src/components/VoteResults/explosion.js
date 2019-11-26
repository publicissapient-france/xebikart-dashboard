import './explosion.css';

const PREMIUM = true;

var colors = PREMIUM ? ["a67c00", "bf9b30", "ffbf00", "ffcf40", "ffdc73"] : ["DF4678", "00CECB", "995AE2", "FFC857", "CA3B4E"];

function createElements(root, elementCount) {
  return Array
    .from({
      length: elementCount
    })
    .map((_, index) => {
      const element = document.createElement('div');
      element.classList = ['fetti'];
      const color = colors[index % colors.length];
      element.style.backgroundImage =
        "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24'%3E%3Cpath fill='%23" +
        color +
        "' d='M12 .587l3.668 7.568 8.332 1.151-6.064 5.828 1.48 8.279-7.416-3.967-7.417 3.967 1.481-8.279-6.064-5.828 8.332-1.151z'/%3E%3C/svg%3E\")";

      var size = Math.random() * 12 + 4;

      element.style.opacity = 1;
      element.style.width = size + 'px';
      root.appendChild(element);
      return element;
    });
}

function randomPhysics(angle, spread, startVelocity) {
  const radAngle = angle * (Math.PI / 180);
  const radSpread = spread * (Math.PI / 180);
  return {
    x: 0,
    y: 0,
    wobble: Math.random() * 10,
    velocity: (startVelocity * 0.65) + Math.max(Math.random(), .35) * startVelocity,
    angle2D: -radAngle + ((0.5 * radSpread) - (Math.random() * radSpread)),
    angle3D: -(Math.PI / 4) + (Math.random() * (Math.PI / 2)),
    // angle3D: 0,
    tiltAngle: Math.random() * Math.PI
  };
}

function updateFetti(fetti, progress, decay) {
  /* eslint-disable no-param-reassign */
  fetti.physics.x += Math.cos(fetti.physics.angle2D) * fetti.physics.velocity;
  fetti.physics.y += Math.sin(fetti.physics.angle2D) * fetti.physics.velocity;
  fetti.physics.z += Math.sin(fetti.physics.angle3D) * fetti.physics.velocity;
  fetti.physics.wobble += 0.05;
  fetti.physics.velocity *= decay;
  fetti.physics.y += 1;
  fetti.physics.tiltAngle += 7;

  const {
    x,
    y,
    tiltAngle,
    wobble
  } = fetti.physics;
  const wobbleX = x + (10 * Math.cos(wobble));
  const wobbleY = y + (10 * Math.sin(wobble));
  const transform = `translate3d(${wobbleX}px, ${wobbleY}px, 0) rotateZ(${tiltAngle}deg)`;

  fetti.element.style.transform = transform;
  fetti.element.style.opacity = Math.min(1 - (progress * 4.2), 100 - y);

  /* eslint-enable */
}

function animate(root, fettis, decay) {
  const totalTicks = 200;
  let tick = 0;

  function update() {
    fettis.forEach((fetti) => updateFetti(fetti, tick / totalTicks, decay));

    tick += 1;
    if (tick < totalTicks) {
      requestAnimationFrame(update);
    } else {
      fettis.forEach((fetti) => root.removeChild(fetti.element));
    }
  }

  requestAnimationFrame(update);
}

function confetti(root, {
  angle = 45,
  decay = 0.9,
  spread = 70,
  startVelocity = 40,
  elementCount = 10
} = {}) {
  const elements = createElements(root, elementCount);
  const fettis = elements.map((element) => ({
    element,
    physics: randomPhysics(angle, spread, startVelocity)
  }));
  animate(root, fettis, decay);
}

export default confetti;