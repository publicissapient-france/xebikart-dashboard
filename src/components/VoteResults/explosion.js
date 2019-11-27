import './explosion.css';

const PREMIUM = false;

var colors = PREMIUM ? ["a67c00", "bf9b30", "ffbf00", "ffcf40", "ffdc73"] : ["DF4678", "00CECB", "995AE2", "FFC857", "CA3B4E"];
var zombieColors = ["414e60", "924258", "006300", "008700", "00a400"]

function createElements(root, elementCount, isUnicorn) {
  return Array
    .from({
      length: elementCount
    })
    .map((_, index) => {
      const element = document.createElement('div');
      element.classList = ['fetti'];
      const color = isUnicorn ? colors[index % colors.length] : zombieColors[index % colors.length];
      element.style.backgroundImage = isUnicorn ?
        "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24'%3E%3Cpath fill='%23" +
        color +
        "' d='M12 .587l3.668 7.568 8.332 1.151-6.064 5.828 1.48 8.279-7.416-3.967-7.417 3.967 1.481-8.279-6.064-5.828 8.332-1.151z'/%3E%3C/svg%3E\")" :

        "url(\"data:image/svg+xml,%3Csvg version='1.1' id='Calque_1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' x='0px' y='0px' viewBox='0 0 600 678.2' style='enable-background:new 0 0600 678.2;' xml:space='preserve'%3E%3Cpath fill='%23" +
        color +
        "' d='M598.7,178.5c-3-8.9-24.7-70.5-53.8-91.6c-31.4-22.8-142.2-66-150.1-71.5c-0.1-0.1-0.2-0.2-0.3-0.3C329.5-6.4,264.3-4.1,198.7,16.5c0-0.3,0.1-0.6,0.1-0.8l-0.4,0.5c0,0-115.5,43.2-139.8,69.9s-47.9,37.7-57.4,90.3l-0.2,0.2c0,2.5,0,4.5,0,6.5c-0.2,14-0.4,28-0.8,42c-1.1,39.6,0.4,79,8,118c4.6,23.7,9.1,47.5,13.6,71.3c0.2,1.3-0.3,3.4-1.3,4.3c-8.8,8.2-9.8,15.4-4,25.9c7.4,13.4,14.7,26.8,21.8,40.3c3,5.7,5.2,11.8,8.4,17.3c7.8,13.5,19.1,22.8,34.9,25.4c14.4,2.4,28.9,2.4,43.4,0c6.6-1.1,13.2-2.5,19.8-2.6c17.6-0.5,27.8,7.9,29.7,25.4c1.2,11.1,0.5,22.4,0.6,33.7c0.1,9.1-0.1,18.3,0.3,27.4c0.2,4.8,2.7,8.2,7.7,9.7c6.9,2,13.7,4.5,20.6,6.2c3.6,0.9,5.3,2.5,6.3,6.2c3.1,11.3,7.2,11.6,18.8,9.3c0.9-0.2,1.8-1.7,2-2.8c0.9-3.7,1.5-7.4,2.2-11.4c4.6,1.4,8.9,2.9,13.3,4.1c2.7,0.7,3.4,2.1,3.3,4.7c-0.1,6.8-0.2,13.6,0.3,20.4c0.8,10.2,5.9,17.1,14.8,19c5.9,1.3,12.2,1.6,18.3,1.4c7.8-0.4,10.1-3.6,10-11.4c-0.1-6.9-0.1-13.9,0-20.8c0-1,1-2,1.5-2.9c0.6,1,1.5,1.9,1.7,2.9c0.6,4.3,1.1,8.6,1.4,12.9c0.2,2.2,0.9,3.3,3.2,3.5c3.6,0.3,7.3,1.1,10.9,1.3c11.3,0.7,17.8-4.3,20.2-15.3c0.3-1.2,0.5-2.3,0.9-4.5c0.4,2.3,0.7,3.6,0.9,4.8c1.7,9,5.6,11.5,14.4,9.1c0.6-0.2,1.3-0.3,1.9-0.5c11.3-5.2,22.5-10.4,33.7-15.7c1-0.5,2-1.9,2.1-3c1.4-9.1,7.7-12.8,15.8-14.6c4.5-1,9-1.9,13.3-3.2c5.3-1.7,8-5.6,8.3-11.2c0.1-1.7,0.1-3.4,0-5.1c-0.3-16.7-1.2-33.5-0.7-50.2c0.7-21.1,14.9-32.5,35.7-29.4c9.7,1.5,19.1,4.6,28.8,5.8c22.8,2.8,42.8-2.8,58.2-21c6.7-7.9,11.3-16.9,14.7-26.6c3.6-10.3,8.3-20,14.6-29c3-4.3,6-8.6,8.5-13.1c3.6-6.5,3-12.9-2.2-18.4c-1.9-2.1-4-4.2-6.3-5.9c-1.8-1.4-2-2.6-1.3-4.6c15.4-44.1,22.4-89.7,25.1-136.1c1.9-32.2,1.6-64.3,0.1-96.5C598.8,179,598.8,178.7,598.7,178.5z M252.4,367.9c-10.7,25.4-30.7,39.9-56.8,46c-13,3-26.6,3.7-39.9,5.5c0-0.4-0.1-0.7-0.1-1.1c-12.6-0.1-25.1-0.5-37.2-4.5c-22.9-7.6-36.2-24.6-37.8-48.8c-1.2-19.4,0.6-38.7,5.4-57.6c6.3-24.3,21.1-39.7,46.7-42.7c20.6-2.4,41.3-4.6,62-6c29.3-1.9,53.2,17.8,60.4,46.3C260.4,326.2,261,347.4,252.4,367.9z M323.8,517.6c-8.5,4-17.3,7.3-26,10.8c-4.9,2-9.6,0.8-13.9-1.8c-4.1-2.5-8.2-5.2-12-8.2c-10.3-8-14.1-18.8-11.3-31.3c5.3-23,13.6-45.1,25.3-65.6c3.6-6.3,10.4-10.7,15.8-16.1c6.5,5.9,11.8,11,14.2,18.9c6.7,22,13.9,43.8,20.8,65.7C339.6,498.9,333,513.3,323.8,517.6z M524.5,375c-3.8,21.1-17.6,33.2-37.4,39.1c-6.3,1.9-13,2.7-19.6,3.6c-21.8,2.9-43.4,0.4-64-6.3c-30.8-10-47.8-33.2-54.4-64c-5.7-26.6-0.4-51,18.6-71.4c10.6-11.5,24.1-17.5,39.8-17.3c23.6,0.2,47,2.6,70.2,6.7c23.2,4.1,38.5,19.1,43,42.6c2.7,14.3,4,29,5.6,40.7C525.6,359.4,525.9,367.3,524.5,375z'/%3E%3C/svg%3E\")"

      var size = Math.random() * 12 + 60;

      element.style.opacity = 1;
      element.style.width = size + 'px';
      element.style.height = size + 'px';
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
  angle = 80,
  decay = 0.9,
  spread = 70,
  startVelocity = 40,
  elementCount = 10,
  isUnicorn,
  reverse
} = {}) {
  const elements = createElements(root, elementCount, isUnicorn);
  const fettis = elements.map((element) => ({
    element,
    physics: randomPhysics(reverse ? 180 - angle : angle, spread, startVelocity)
  }));
  animate(root, fettis, decay);
}

export default confetti;