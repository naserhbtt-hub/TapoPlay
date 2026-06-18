const games = [
    { id: 1, name: 'Stack Fire Ball', category: 'arcade', icon: 'https://www.onlinegames.io/media/posts/184/responsive/Stack-Fire-Ball-Game-lg.jpg', embedUrl: 'https://www.onlinegames.io/games/2021/unity/stack-fire-ball/index.html', description: 'Smash through colorful platforms in this addictive arcade game!', controls: 'Click and hold to move down, release to stop.', badge: 'hot' },
    { id: 2, name: 'Velocity Rush', category: 'racing', icon: 'https://www.onlinegames.io/media/posts/1265/responsive/velocity-rush-sm.webp', embedUrl: 'https://cloud.onlinegames.io/games/2026/unity/velocity-rush/game.html', description: 'Race through futuristic tunnels at extreme speeds!', controls: 'Arrow keys or WASD to move.', badge: 'new' },
    { id: 3, name: 'Highway Traffic', category: 'racing', icon: 'https://www.onlinegames.io/media/posts/32/responsive/Highway-Traffic-2-sm.jpg', embedUrl: 'https://www.onlinegames.io/games/2022/unity/highway-traffic/index.html', description: 'Navigate through busy highway traffic!', controls: 'Arrow keys to steer, Space for brake.' },
    { id: 4, name: 'ArmedForces.io', category: 'shooter', icon: 'https://www.onlinegames.io/media/posts/234/responsive/Armed-Forces-io-sm.jpg', embedUrl: 'https://www.onlinegames.io/games/2021/unity3/armedforces-io/index.html', description: 'Multiplayer shooting game with intense battles!', controls: 'WASD to move, Mouse to aim and shoot.', badge: 'hot' },
    { id: 5, name: 'Basket Hoop', category: 'sports', icon: 'https://www.onlinegames.io/media/posts/843/responsive/Basket-Hoop-sm.jpg', embedUrl: 'https://cloud.onlinegames.io/games/2024/construct/311/basket-hoop/index-og.html', description: 'Perfect your basketball shooting skills!', controls: 'Click and drag to shoot.' },
    { id: 6, name: 'Basketball', category: 'sports', icon: 'https://www.onlinegames.io/media/posts/302/responsive/Basketball-io-2-sm.jpg', embedUrl: 'https://www.onlinegames.io/games/2022/unity3/basketball-io/index.html', description: 'Multiplayer basketball with realistic physics!', controls: 'Arrow keys to move, Space to shoot.' },
    { id: 7, name: 'FPS Strike', category: 'shooter', icon: 'https://www.onlinegames.io/media/posts/902/responsive/fps-strike-online-sm.jpg', embedUrl: 'https://cloud.onlinegames.io/games/2024/unity2/fps-strike/index-og.html', description: 'First-person shooter with realistic graphics!', controls: 'WASD to move, Mouse to aim and shoot.', badge: 'hot' },
    { id: 8, name: 'Drunken Duel', category: 'action', icon: 'https://www.onlinegames.io/media/posts/698/responsive/Drunken-Duel-sm.jpg', embedUrl: 'https://www.onlinegames.io/games/2024/code/2/drunken-duel/index.html', description: 'Hilarious physics-based dueling game!', controls: 'Arrow keys for P1, WASD for P2.' },
    { id: 9, name: 'Egg Car Racing', category: 'racing', icon: 'https://www.onlinegames.io/media/posts/910/responsive/egg-car-racing-sm.jpg', embedUrl: 'https://cloud.onlinegames.io/games/2024/construct/289/egg-car-racing/index-og.html', description: 'Race with an egg-shaped car!', controls: 'Arrow keys to drive and balance.' },
    { id: 10, name: 'Rooftop Duel', category: 'action', icon: 'https://www.onlinegames.io/media/posts/1002/responsive/Rooftop-Duel-Online-sm.jpg', embedUrl: 'https://cloud.onlinegames.io/games/2025/construct/213/rooftop-duel/index-og.html', description: 'Epic duels on rooftops!', controls: 'W for P1, Up arrow for P2.', badge: 'new' },
    { id: 11, name: 'Geometry Dash', category: 'arcade', icon: 'https://www.onlinegames.io/media/posts/510/responsive/Geometry-Dash-FreezeNova-sm.jpg', embedUrl: 'https://www.onlinegames.io/games/2023/q2/geometry-dash-freezenova/index.html', description: 'Jump and fly through danger!', controls: 'Space or Click to jump.', badge: 'hot' },
    { id: 12, name: 'Hero Dragon Power', category: 'adventure', icon: 'https://www.onlinegames.io/media/posts/365/responsive/Hero-Dragon-Power-Game-sm.jpg', embedUrl: 'https://www.onlinegames.io/games/2023/unity/hero-dragon-power/index.html', description: 'Transform into a powerful dragon!', controls: 'WASD to move, Mouse to attack.' },
    { id: 13, name: 'Tank Arena', category: 'strategy', icon: 'https://www.onlinegames.io/media/posts/956/responsive/Tank-Arena-Online-sm.jpg', embedUrl: 'https://cloud.onlinegames.io/games/2025/construct/293/tank-arena/index-og.html', description: 'Battle tanks in explosive combat!', controls: 'WASD to move, Mouse to aim.' },
    { id: 14, name: 'Dublix', category: 'arcade', icon: 'https://www.onlinegames.io/media/posts/1126/responsive/dublix-sm.webp', embedUrl: 'https://cloud.onlinegames.io/games/2025/unity4/dublix/game-og.html', description: 'Classic arcade shooter!', controls: 'Arrow keys to move, Space to shoot.' },
    { id: 15, name: 'Cube Worlds', category: 'puzzle', icon: 'https://www.onlinegames.io/media/posts/986/responsive/Cube-Worlds-sm.jpg', embedUrl: 'https://cloud.onlinegames.io/games/2025/html/cube-worlds/index-og.html', description: 'Solve challenging puzzles!', controls: 'Click and drag pieces.' },
    { id: 16, name: 'Motorbike Stunt Simulator', category: 'racing', icon: 'https://www.onlinegames.io/media/posts/1045/responsive/motorbike_stunt_simulator_game-2-sm.webp', embedUrl: 'https://cloud.onlinegames.io/games/2021/unity/motorbike-stunt-simulator/index-og.html', description: 'Run and slice obstacles!', controls: 'Arrow keys to move, Space to attack.', badge: 'new' },
    { id: 17, name: 'Geometry Rash', category: 'arcade', icon: 'https://www.onlinegames.io/media/posts/616/responsive/Geometry-Rash-sm.jpg', embedUrl: 'https://www.onlinegames.io/games/2023/construct/279/geometry-rash/index.html', description: 'Compete in tennis matches!', controls: 'WASD to move, Space to hit.' },
    { id: 18, name: 'Snaker io', category: 'puzzle', icon: 'https://www.onlinegames.io/media/posts/1261/responsive/snaker-io-sm.webp', embedUrl: 'https://cloud.onlinegames.io/games/2026/more/snaker-io/game.html', description: 'Test your IQ!', controls: 'Click to interact.' },
    { id: 19, name: 'Highway Cars', category: 'racing', icon: 'https://www.onlinegames.io/media/posts/598/responsive/Highway-Cars-sm.jpg', embedUrl: 'https://www.onlinegames.io/games/2023/construct/211/highway-cars/index.html', description: 'Survive zombie waves!', controls: 'WASD to move, Mouse to shoot.', badge: 'hot' },
    { id: 20, name: 'Dinosaur Game', category: 'arcade', icon: 'https://www.onlinegames.io/media/posts/417/responsive/Dinosaur-Game-Online-sm.jpg', embedUrl: 'https://www.onlinegames.io/games/2023/q2/dinosaur-game/index.html', description: 'Classic maze game!', controls: 'Arrow keys to navigate.' },
    { id: 21, name: 'Deer Hunter', category: 'shooter', icon: 'https://www.onlinegames.io/media/posts/591/responsive/Deer-Hunter-sm.jpg', embedUrl: 'https://www.onlinegames.io/games/2021/1/deer-hunter/index.html', description: 'Perfect your golf swing!', controls: 'Click and drag to shoot.' },
    { id: 22, name: 'Bus Subway Runner', category: 'arcade', icon: 'https://www.onlinegames.io/media/posts/235/responsive/Bus-Subway-Runner-Game-sm.jpg', embedUrl: 'https://www.onlinegames.io/games/2022/unity/bus-subway-runner/index.html', description: 'Match colorful gems!', controls: 'Click to swap gems.' },
    { id: 23, name: 'Zombie War Defense', category: 'adventure', icon: 'https://www.onlinegames.io/media/posts/466/responsive/Zombie-War-Defense-Game-sm.jpg', embedUrl: 'https://www.onlinegames.io/games/2022/unity/zombie-war-defense/index.html', description: 'Fly on a dragon!', controls: 'Arrow keys to fly.' },
    { id: 24, name: 'Crazy Karts', category: 'arcade', icon: 'https://www.onlinegames.io/media/posts/740/responsive/Crazy-Karts-sm.jpg', embedUrl: 'https://www.onlinegames.io/games/2024/unity/crazy-karts/index.html', description: 'Classic pinball!', controls: 'Arrow keys for flippers.' },
    { id: 25, name: 'Draw The Bridge', category: 'arcade', icon: 'https://www.onlinegames.io/media/posts/164/responsive/Draw-the-Bridge-Game-sm.jpg', embedUrl: 'https://www.onlinegames.io/games/2021/4/draw-the-bridge/index.html', description: 'Hit home runs!', controls: 'Space to swing.' },
    { id: 26, name: 'War of Ships io', category: 'shooter', icon: 'https://www.onlinegames.io/media/posts/509/responsive/War-of-Ships-io-sm.jpg', embedUrl: 'https://www.onlinegames.io/games/2022/unity3/war-of-ships-io/index.html', description: 'Solve Sudoku puzzles!', controls: 'Click and type numbers.' },
    { id: 27, name: 'Rescue Helicopter', category: 'adventure', icon: 'https://www.onlinegames.io/media/posts/468/responsive/Rescue-Helicopter-sm.jpg', embedUrl: 'https://www.onlinegames.io/games/2021/2/rescue-helicopter/index.html', description: 'Find hidden treasure!', controls: 'WASD to move.', badge: 'new' },
    { id: 28, name: 'Fast Food Manager', category: 'arcade', icon: 'https://www.onlinegames.io/media/posts/1114/responsive/fast-food-manager-sm.webp', embedUrl: 'https://cloud.onlinegames.io/games/2025/unity4/fast-food-manager/index-og.html', description: 'Break all bricks!', controls: 'Mouse to move paddle.' },
    { id: 29, name: 'Five Nights at Poppy', category: 'horror', icon: 'https://www.onlinegames.io/media/posts/992/responsive/Five-Nights-at-Poppy-sm.jpg', embedUrl: 'https://cloud.onlinegames.io/games/2025/unity2/five-nights-at-poppy/index-og.html', description: 'Ice hockey action!', controls: 'Arrow keys to move.' },
    { id: 30, name: 'Zombie Road', category: 'zombie', icon: 'https://www.onlinegames.io/media/posts/631/responsive/Zombie-Road-sm.jpg', embedUrl: 'https://www.onlinegames.io/games/2021/unity2/zombie-road/index.html', description: 'Find hidden words!', controls: 'Click and drag.' },
    { id: 31, name: 'Cross the Road', category: 'aarcade', icon: 'https://www.onlinegames.io/media/posts/734/responsive/Cross-the-Road-sm.jpg', embedUrl: 'https://www.onlinegames.io/games/2023/unity/cross-the-road/index.html', description: 'Defend your castle!', controls: 'Mouse to aim and shoot.' },
    { id: 32, name: 'Draw the Car Path', category: 'arcade', icon: 'https://www.onlinegames.io/media/posts/936/responsive/draw-the-car-path-sm.jpg', embedUrl: 'https://cloud.onlinegames.io/games/2021/4/draw-the-car-path/index-og.html', description: 'Classic snake in 3D!', controls: 'Arrow keys.', badge: 'hot' },
    { id: 33, name: 'Egg Helix', category: 'arcade', icon: 'https://www.onlinegames.io/media/posts/604/responsive/Egg-Helix-sm.jpg', embedUrl: 'https://www.onlinegames.io/games/2022/unity2/egg-helix/index.html', description: 'Beach volleyball!', controls: 'Arrow keys and Space.' },
    { id: 34, name: 'Speedrun Parkour', category: 'parkour', icon: 'https://www.onlinegames.io/media/posts/759/responsive/Speedrun-Parkour-sm.jpg', embedUrl: 'https://www.onlinegames.io/games/2022/construct/145/speedrun-parkour/index.html', description: 'Complete puzzles!', controls: 'Drag and drop pieces.' },
    { id: 35, name: 'Powerslide Kart Simulator', category: 'am/200/9d4edd/fff?text=TRrcade', icon: 'https://www.onlinegames.io/media/posts/578/responsive/Powerslide-Kart-Simulator-sm.jpg', embedUrl: 'https://www.onlinegames.io/games/2022/unity3/powerslide-kart-simulator/index.html', description: 'Explore dungeons!', controls: 'WASD to move.' },
    { id: 36, name: 'Football King', category: 'soocer', icon: 'https://www.onlinegames.io/media/posts/739/responsive/Football-King-sm.jpg', embedUrl: 'https://www.onlinegames.io/games/2024/construct/226/football-king/index.html', description: 'Classic Tetris!', controls: 'Arrow keys.' },
    { id: 37, name: 'CobraZ.io Classic', category: 'shooter', icon: 'https://www.onlinegames.io/media/posts/546/responsive/Cobraz.io-Classic-sm.jpg', embedUrl: 'https://www.onlinegames.io/games/2022/unity/cobraz-io-classic/index.html', description: 'Hit sixes!', controls: 'Space to bat.' },
    { id: 38, name: 'Dont Fall io', category: 'strategy', icon: 'https://www.onlinegames.io/media/posts/182/responsive/Dont-Fall-io-2-sm.jpg', embedUrl: 'https://www.onlinegames.io/games/2021/unity/dont-fall-io/index.html', description: 'Play chess!', controls: 'Click to move pieces.' },
    { id: 39, name: 'SpartaHoppers', category: 'action', icon: 'https://www.onlinegames.io/media/posts/949/responsive/sparta-hoppers-game-sm.jpg', embedUrl: 'https://cloud.onlinegames.io/games/2025/construct/227/spartahoppers/index-og.html', description: 'Jungle survival!', controls: 'WASD to move.', badge: 'new' },
    { id: 40, name: 'Mini Shooters', category: 'shooter', icon: 'https://www.onlinegames.io/media/posts/206/responsive/Mini-Shooters-Online-sm.jpg', embedUrl: 'https://www.onlinegames.io/games/2021/5/mini-shooters/index.html', description: 'Destroy asteroids!', controls: 'Arrow keys and Space.' },
    { id: 41, name: 'Chess FreezeNova', category: 'strategy', icon: 'https://www.onlinegames.io/media/posts/1116/responsive/chess-freezenova-sm.webp', embedUrl: 'https://cloud.onlinegames.io/games/2025/unity3/chess/index-og.html', description: 'Rugby action!', controls: 'Arrow keys.' },
    { id: 42, name: 'Drift Hunters Pro', category: 'drift', icon: 'https://www.onlinegames.io/media/posts/397/responsive/Drift-Hunters-Pro-sm.jpg', embedUrl: 'https://www.onlinegames.io/games/2023/unity/drift-hunters-pro/index.html', description: 'Match tiles!', controls: 'Click matching tiles.' },
    { id: 43, name: 'Stickman Destruction', category: 'arcade', icon: 'https://www.onlinegames.io/media/posts/233/responsive/Stickman-Destruction-sm.jpg', embedUrl: 'https://www.onlinegames.io/games/2021/unity3/stickman-destruction/index.html', description: 'Viking warrior!', controls: 'WASD and Space.' },
    { id: 44, name: 'Pixelmon Town', category: 'adventure', icon: 'https://www.onlinegames.io/media/posts/1214/responsive/pixelmon-town-sm.webp', embedUrl: 'https://cloud.onlinegames.io/games/2025/html/pixelmon-town/game.html', description: 'Missile defense!', controls: 'Mouse to aim.' },
    { id: 45, name: 'Masked Forces Zombie Survival', category: 'shooter', icon: 'https://www.onlinegames.io/media/posts/225/responsive/Masked-Forces-Zombie-Survival-Online-sm.jpg', embedUrl: 'https://www.onlinegames.io/games/2021/unity3/masked-forces-zombie-survival/index.html', description: 'Badminton match!', controls: 'Arrow keys and Space.' },
    { id: 46, name: 'Block Blast', category: 'puzzle', icon: 'https://www.onlinegames.io/media/posts/876/responsive/block-blast-sm.jpg', embedUrl: 'https://cloud.onlinegames.io/games/2024/unity3/block-blast/index-og.html', description: 'Memory game!', controls: 'Click cards.' },
    { id: 47, name: 'Nuts and Bolts Puzzle', category: 'puzzle', icon: 'https://www.onlinegames.io/media/posts/965/responsive/nuts-and-bolts-puzzle-sm.jpg', embedUrl: 'https://cloud.onlinegames.io/games/2025/unity/nuts-and-bolts-puzzle/index-og.html', description: 'Manage station!', controls: 'Mouse to interact.' },
    { id: 48, name: 'Kawaii Shooter', category: 'shooter', icon: 'https://www.onlinegames.io/media/posts/844/responsive/Kawaii-Shooter-sm.jpg', embedUrl: 'https://cloud.onlinegames.io/games/2024/unity/kawaii-shooter/index-og.html', description: 'Classic pong!', controls: 'W/S keys.' },
    { id: 49, name: 'Fire and Water', category: 'arcade', icon: 'https://www.onlinegames.io/media/posts/469/responsive/Fire-and-Water-sm.jpg', embedUrl: 'https://www.onlinegames.io/games/2023/construct/179/fire-and-water/index.html', description: 'Ski racing!', controls: 'Arrow keys.' },
    { id: 50, name: 'Escape Car', category: 'racing', icon: 'https://www.onlinegames.io/media/posts/1000/responsive/Escape-Car-sm.jpg', embedUrl: 'https://cloud.onlinegames.io/games/2025/unity2/escape-car/index-og.html', description: 'Solve crosswords!', controls: 'Click and type.' },
    { id: 51, name: 'Mahjong', category: 'puzzle', icon: 'https://www.onlinegames.io/media/posts/966/responsive/Mahjong-sm.jpg', embedUrl: 'https://cloud.onlinegames.io/games/2025/unity/mahjong/index-og.html', description: 'Samurai warrior!', controls: 'Arrow keys and A/S.', badge: 'hot' },
    { id: 52, name: '2048', category: 'puzzle', icon: 'https://www.onlinegames.io/media/posts/916/responsive/2048-sm.jpg', embedUrl: 'https://cloud.onlinegames.io/games/2025/html/2048/index.html', description: 'Pop bubbles!', controls: 'Mouse to aim.' },
    { id: 53, name: 'Agent Smith', category: 'action', icon: 'https://www.onlinegames.io/media/posts/189/responsive/Agent-Smith-2-sm.jpg', embedUrl: 'https://www.onlinegames.io/games/2021/unity/agent-smith/index.html', description: 'Bike racing!', controls: 'Arrow keys.' },
    { id: 54, name: 'Airplane Racer', category: 'airplane', icon: 'https://www.onlinegames.io/media/posts/268/responsive/Airplane-Racer-sm.jpg', embedUrl: 'https://www.onlinegames.io/games/2022/unity/airplane-racer/index.html', description: 'Find mines!', controls: 'Click cells.' },
    { id: 55, name: 'CS Online', category: 'shooter', icon: 'https://www.onlinegames.io/media/posts/434/responsive/CS-Online-sm.jpg', embedUrl: 'https://www.onlinegames.io/games/2023/unity2/cs-online/index.html', description: 'Cast spells!', controls: 'WASD and number keys.' },
    { id: 56, name: 'Run FreezeNova', category: 'arcade', icon: 'https://www.onlinegames.io/media/posts/1181/responsive/run-freezenova-sm.webp', embedUrl: 'https://cloud.onlinegames.io/games/2026/unity/run-3/game.html', description: 'Help frog cross!', controls: 'Arrow keys.' },
    { id: 57, name: 'Jungle Mart', category: 'arcade', icon: 'https://www.onlinegames.io/media/posts/1247/responsive/jungle-mart-sm.webp', embedUrl: 'https://cloud.onlinegames.io/games/2026/construct/339/jungle-mart/game.html', description: 'Ping pong!', controls: 'Mouse to control.' },
    { id: 58, name: 'Treasure Hunter', category: 'adventure', icon: 'https://www.onlinegames.io/media/posts/812/responsive/Treasure-Hunter-sm.jpg', embedUrl: 'https://www.onlinegames.io/games/2022/construct/164/treasure-hunter/index.html', description: 'Solve the cube!', controls: 'Click and drag.' },
    { id: 59, name: 'State io Wars', category: 'war', icon: 'https://www.onlinegames.io/media/posts/685/responsive/State-io-Wars-sm.jpg', embedUrl: 'https://www.onlinegames.io/games/2024/construct/233/state-io-wars/index.html', description: 'Explore tombs!', controls: 'WASD and Space.', badge: 'new' },
    { id: 60, name: 'Archer Hero', category: 'adventure', icon: 'https://www.onlinegames.io/media/posts/364/responsive/Archer-Hero-Online-sm.jpg', embedUrl: 'https://www.onlinegames.io/games/2023/unity/archer-hero/index.html', description: 'F1 racing!', controls: 'Arrow keys.' }
];document.addEventListener('DOMContentLoaded', () => {
    const fullscreenBtn = document.getElementById('fullscreenBtn');
    const gameContainer = document.getElementById('gameContainer');

    // دالة تفعيل الشاشة الكاملة وقفل اتجاه العرض
    fullscreenBtn.addEventListener('click', async () => {
        try {
            // 1. طلب تفعيل الشاشة الكاملة للحاوية
            if (gameContainer.requestFullscreen) {
                await gameContainer.requestFullscreen();
            } else if (gameContainer.webkitRequestFullscreen) { /* متصفحات Safari و iOS */
                await gameContainer.webkitRequestFullscreen();
            } else if (gameContainer.mozRequestFullScreen) { /* متصفح Firefox القديم */
                await gameContainer.mozRequestFullScreen();
            } else if (gameContainer.msRequestFullscreen) { /* متصفح IE/Edge القديم */
                await gameContainer.msRequestFullscreen();
            }

            // 2. إجبار الهاتف على الالتفاف للوضع الأفقي تلقائياً
            // نتحقق أولاً إذا كان المتصفح والجهاز يدعمان ميزة قفل الاتجاه
            if (screen.orientation && screen.orientation.lock) {
                // نطلب القفل على الوضع الأفقي 'landscape'
                await screen.orientation.lock('landscape-primary')
                .then(() => {
                    console.log("تم قفل الشاشة على الوضع الأفقي بنجاح.");
                })
                .catch((error) => {
                    // تحدث إذا كان المستخدم يجرّب من كمبيوتر (لأن الكمبيوتر شاشته ثابتة ولا يلتف)
                    console.warn("لم يتم قفل الاتجاه برمجياً: ", error.message);
                });
            }

        } catch (err) {
            console.error("حدث خطأ أثناء محاولة تفعيل الشاشة الكاملة:", err);
        }
    });

    // اختياري: إعادة الشاشة للوضع الطبيعي إذا خرج المستخدم من الشاشة الكاملة يدويًا
    document.addEventListener('fullscreenchange', () => {
        if (!document.fullscreenElement && screen.orientation && screen.orientation.unlock) {
            screen.orientation.unlock();
        }
    });
    
    document.addEventListener('webkitfullscreenchange', () => {
        if (!document.webkitFullscreenElement && screen.orientation && screen.orientation.unlock) {
            screen.orientation.unlock();
        }
    });
});

let state = {
    category: 'all',
    displayed: 20,
    favorites: JSON.parse(localStorage.getItem('favs') || '[]'),
    darkMode: localStorage.getItem('theme') !== 'light'
};

function init() {
    applyTheme();
    renderHero();
    renderGames();
    attachEvents();
}

function applyTheme() {
    if (!state.darkMode) {
        document.body.classList.add('light-mode');
        document.getElementById('themeBtn').textContent = '🌙';
    }
}

function renderHero() {
    const hero = games.filter(g => g.badge).slice(0, 4);
    document.getElementById('heroGrid').innerHTML = hero.map(g => `
        <div class="hero-card" onclick="openGame(${g.id})">
            ${g.badge ? `<span class="badge ${g.badge}">${g.badge.toUpperCase()}</span>` : ''}
            <img src="${g.icon}" alt="${g.name}" onerror="this.src='https://via.placeholder.com/400/8a2be2/fff?text=${g.name[0]}'">
            <div class="hero-overlay">
                <h3>${g.name}</h3>
                <p>${g.category}</p>
            </div>
        </div>
    `).join('');
}

function renderGames() {
    let filtered = state.category === 'all' ? games : games.filter(g => g.category === state.category);
    let shown = filtered.slice(0, state.displayed);
    
    document.getElementById('gamesGrid').innerHTML = shown.map(g => `
        <div class="game-card">
            ${g.badge ? `<span class="badge ${g.badge}">${g.badge.toUpperCase()}</span>` : ''}
            <button class="fav-btn ${state.favorites.includes(g.id) ? 'active' : ''}" onclick="toggleFav(event, ${g.id})">
                ${state.favorites.includes(g.id) ? '★' : '☆'}
            </button>
            <div onclick="openGame(${g.id})">
                <img src="${g.icon}" alt="${g.name}" onerror="this.src='https://via.placeholder.com/200/8a2be2/fff?text=${g.name[0]}'">
                <div class="play-overlay">
                    <button class="play-btn">PLAY NOW</button>
                </div>
            </div>
            <div class="game-info">
                <h3>${g.name}</h3>
                <p>${g.category}</p>
            </div>
        </div>
    `).join('');
    
    document.getElementById('loadMoreBtn').style.display = state.displayed >= filtered.length ? 'none' : 'block';
    document.getElementById('sectionTitle').textContent = state.category === 'all' ? 'All Games' : state.category.charAt(0).toUpperCase() + state.category.slice(1) + ' Games';
}

function attachEvents() {
    document.querySelectorAll('.nav-link, .mobile-nav a, .footer-col a[data-category]').forEach(el => {
        el.addEventListener('click', e => {
            e.preventDefault();
            state.category = el.dataset.category || 'all';
            state.displayed = 20;
            document.querySelectorAll('.nav-link').forEach(l => l.classList.remove('active'));
            document.querySelectorAll(`.nav-link[data-category="${state.category}"]`).forEach(l => l.classList.add('active'));
            renderGames();
            closeMobileMenu();
            window.scrollTo({top: 400, behavior: 'smooth'});
        });
    });
    
    document.getElementById('searchInput').addEventListener('input', handleSearch);
    document.getElementById('themeBtn').addEventListener('click', toggleTheme);
    document.getElementById('menuBtn').addEventListener('click', () => document.getElementById('mobileMenu').classList.add('show'));
    document.getElementById('closeMenuBtn').addEventListener('click', closeMobileMenu);
    document.getElementById('loadMoreBtn').addEventListener('click', loadMore);
    document.getElementById('closeModalBtn').addEventListener('click', closeModal);
    document.getElementById('fullscreenBtn').addEventListener('click', toggleFullscreen);
    document.getElementById('reloadBtn').addEventListener('click', reloadGame);
    document.getElementById('muteBtn').addEventListener('click', toggleMute);
    
    document.getElementById('gameModal').addEventListener('click', e => {
        if (e.target.id === 'gameModal') closeModal();
    });
    
    document.addEventListener('keydown', e => {
        if (e.key === 'Escape' && document.getElementById('gameModal').classList.contains('show')) {
            closeModal();
        }
    });
    
    document.addEventListener('click', e => {
        if (!e.target.closest('.search-container')) {
            document.getElementById('searchResults').classList.remove('show');
        }
    });
}

function handleSearch(e) {
    const query = e.target.value.toLowerCase().trim();
    const results = document.getElementById('searchResults');
    
    if (!query) {
        results.classList.remove('show');
        return;
    }
    
    const found = games.filter(g => g.name.toLowerCase().includes(query) || g.category.includes(query)).slice(0, 8);
    
    if (found.length) {
        results.innerHTML = found.map(g => `
            <div class="search-item" onclick="openGame(${g.id})">
                <img src="${g.icon}" alt="${g.name}" onerror="this.src='https://via.placeholder.com/50/8a2be2/fff?text=${g.name[0]}'">
                <div class="search-item-info">
                    <h4>${g.name}</h4>
                    <p>${g.category}</p>
                </div>
            </div>
        `).join('');
        results.classList.add('show');
    } else {
        results.innerHTML = '<div style="padding:20px;text-align:center;color:var(--text-dim)">No games found</div>';
        results.classList.add('show');
    }
}

function toggleFav(e, id) {
    e.stopPropagation();
    const idx = state.favorites.indexOf(id);
    if (idx > -1) {
        state.favorites.splice(idx, 1);
    } else {
        state.favorites.push(id);
    }
    localStorage.setItem('favs', JSON.stringify(state.favorites));
    renderGames();
}

function toggleTheme() {
    state.darkMode = !state.darkMode;
    document.body.classList.toggle('light-mode');
    localStorage.setItem('theme', state.darkMode ? 'dark' : 'light');
    document.getElementById('themeBtn').textContent = state.darkMode ? '☀' : '🌙';
}

function closeMobileMenu() {
    document.getElementById('mobileMenu').classList.remove('show');
}

function loadMore() {
    state.displayed += 20;
    renderGames();
}

// FIXED GAME OPENING FUNCTION
function openGame(id) {
    const game = games.find(g => g.id === id);
    if (!game) return;
    
    // Set game info
    document.getElementById('modalTitle').textContent = game.name;
    document.getElementById('gameDesc').textContent = game.description;
    document.getElementById('gameControls').textContent = game.controls;
    
    // Show modal
    const modal = document.getElementById('gameModal');
    modal.classList.add('show');
    document.body.style.overflow = 'hidden';
    document.getElementById('searchResults').classList.remove('show');
    
    // Show loading screen
    const container = document.getElementById('gameContainer');
    container.innerHTML = `
        <div class="loading-screen">
            <div class="spinner"></div>
            <p>Loading ${game.name}...</p>
        </div>
    `;
    
    // Load game after delay with error handling
    setTimeout(() => {
        try {
            container.innerHTML = `
                <iframe 
                    src="${game.embedUrl}" 
                    class="game-iframe"
                    allowfullscreen 
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; gamepad"
                    onload="this.style.opacity='1'"
                    style="opacity:0; transition:opacity 0.3s;"
                ></iframe>
            `;
            
            // Set iframe to visible after it loads
            setTimeout(() => {
                const iframe = container.querySelector('.game-iframe');
                if (iframe) {
                    iframe.style.opacity = '1';
                }
            }, 100);
            
        } catch (error) {
            container.innerHTML = `
                <div class="error-screen">
                    <p>Game failed to load</p>
                    <button onclick="openGame(${id})" style="margin-top:15px; padding:10px 20px; background:var(--primary); color:white; border:none; border-radius:8px; cursor:pointer;">Try Again</button>
                </div>
            `;
        }
    }, 500);
    
    // Load related games
    const related = games.filter(g => g.category === game.category && g.id !== id).slice(0, 5);
    document.getElementById('relatedList').innerHTML = related.map(g => `
        <div class="related-item" onclick="openGame(${g.id})">
            <img src="${g.icon}" alt="${g.name}" onerror="this.src='https://via.placeholder.com/60/8a2be2/fff?text=${g.name[0]}'">
            <div class="related-item-info">
                <h5>${g.name}</h5>
                <p>${g.category}</p>
            </div>
        </div>
    `).join('');
}

function closeModal() {
    const modal = document.getElementById('gameModal');
    modal.classList.remove('show');
    document.getElementById('gameContainer').innerHTML = '<p style="color:var(--text-dim);">Select a game to play</p>';
    document.body.style.overflow = '';
}

function toggleFullscreen() {
    const container = document.getElementById('gameContainer');
    if (!document.fullscreenElement) {
        container.requestFullscreen().catch(err => console.log(err));
    } else {
        document.exitFullscreen();
    }
}

function reloadGame() {
    const iframe = document.querySelector('.game-iframe');
    if (iframe) {
        const src = iframe.src;
        iframe.src = '';
        setTimeout(() => {
            iframe.src = src;
        }, 100);
    }
}

let muted = false;
function toggleMute() {
    muted = !muted;
    document.getElementById('muteBtn').textContent = muted ? '🔇' : '🔊';
}

document.addEventListener('DOMContentLoaded', init);// Function to handle Modals
function openPrivacyModal() { document.getElementById('privacyModal').style.display = 'flex'; }
function closePrivacyModal() { document.getElementById('privacyModal').style.display = 'none'; }

function openAboutModal() { document.getElementById('aboutModal').style.display = 'flex'; }
function closeAboutModal() { document.getElementById('aboutModal').style.display = 'none'; }

function openContactModal() { document.getElementById('contactModal').style.display = 'flex'; }
function closeContactModal() { document.getElementById('contactModal').style.display = 'none'; }
document.addEventListener("backbutton", function (e) {
    e.preventDefault();
    // إذا كنت في الصفحة الرئيسية، سيخرج من التطبيق
    if (window.location.pathname === "/index.html" || window.location.pathname === "/") {
        navigator.app.exitApp();
    } else {
        // إذا كنت داخل لعبة، سيعود للصفحة السابقة
        window.history.back();
    }
}, false);