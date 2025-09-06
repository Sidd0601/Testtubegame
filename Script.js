let currentLevel = 1;
let tubeCount = 3;
const maxFill = 10;
const tubeContainer = document.getElementById('tubeContainer');
const levelTitle = document.getElementById('levelTitle');
const mixSound = document.getElementById('mixSound');
let tubes = [];

function createTubes(count) {
  tubeContainer.innerHTML = '';
  tubes = [];
  for (let i = 0; i < count; i++) {
    const tube = document.createElement('div');
    tube.classList.add('tube');
    const liquid = document.createElement('div');
    liquid.classList.add('liquid');
    liquid.style.height = '0%';
    tube.appendChild(liquid);
    tubeContainer.appendChild(tube);
    tubes.push({tube, liquid, colors: []});
  }
}

function updateTubeGraphics(tube) {
  const fillPercent = (tube.colors.length / maxFill) * 100;
  tube.liquid.style.height = `${fillPercent}%`;
  if(tube.colors.length > 0){
    tube.liquid.style.background = tube.colors[tube.colors.length - 1];
  } else {
    tube.liquid.style.background = 'transparent';
  }
}

// Add color
document.getElementById('addColorBtn').addEventListener('click', () => {
  const color = document.getElementById('colorSelect').value;
  const emptyTube = tubes.find(t => t.colors.length < maxFill);
  if(emptyTube){
    emptyTube.colors.push(color);
    updateTubeGraphics(emptyTube);
  } else {
    alert('All tubes are full!');
  }
});

// Mix
document.getElementById('mixBtn').addEventListener('click', () => {
  const allColors = tubes.flatMap(t => t.colors);
  tubes.forEach(t => t.colors = []);
  allColors.forEach((color, index) => {
    tubes[index % tubes.length].colors.push(color);
  });
  tubes.forEach(updateTubeGraphics);
  mixSound.play();
});

// Reset
document.getElementById('resetBtn').addEventListener('click', () => {
  tubes.forEach(t => t.colors = []);
  tubes.forEach(updateTubeGraphics);
});

// Next level
document.getElementById('nextLevelBtn').addEventListener('click', () => {
  currentLevel++;
  tubeCount = Math.min(6, 3 + currentLevel - 1);
  levelTitle.innerText = `Level ${currentLevel}`;
  createTubes(tubeCount);
});

// Start game
createTubes(tubeCount);
