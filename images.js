// ============================================================
// НАСТРОЙКИ ПРЕДМЕТОВ
// ============================================================
//
// x = положение по горизонтали
// y = положение по вертикали
//
// РАЗМЕРЫ КАРТИНОК НЕ УКАЗЫВАЕМ.
// Каждый PNG сохраняет свой оригинальный размер.
//
// Игровое поле: 700 × 700 px
// ============================================================

const items = [

    { name: "Burger",      x: 220,  y: 30 },
    { name: "Choker",      x: 450,  y: 480 },
    { name: "Creamhat",    x: 530,  y: 180 },
    { name: "Doeshirt",   x: 325,  y: 590 },
    { name: "Eyelashes",   x: 350,  y: 70 },

    { name: "Eyeslove",    x: 600, y: 80 },
    { name: "Eyesspiral",  x: 365, y: 30 },
    { name: "Eyesstars",   x: 490, y: 30 },
    { name: "Gem",         x: 170, y: 370 },
    { name: "Heart",       x: 330, y: 20 },
    { name: "Hellokinky",  x: 20, y: 520 },

    { name: "Hoodie",      x: 20, y: 260 },
    { name: "Kigurumi",    x: 500, y: 140 },
    { name: "Maiddress",   x: 20, y: 380 },
    { name: "Maidhat",     x: 300, y: 510 },

    { name: "Newrock",     x: 520, y: 520 },
    { name: "Pillow",      x: 140, y: 480 },
    { name: "Shoes",       x: 480, y: 610 },
    { name: "Smile",       x: 460, y: 20 },

    { name: "Spiner",      x: 490, y: 400 },
    { name: "Star",        x: 190, y: 10 },
    { name: "Sweater",     x: 10, y: 10 },
    { name: "Tshirt",      x: 20, y: 150 },

    { name: "Whatsappki",  x: 540, y: 450 }
];


// ============================================================
// ССЫЛКА НА TELEGRAM
// ============================================================

const telegramLink = "https://t.me/pan_pan_ika";

// ============================================================
// ИГРОВОЕ ПОЛЕ
// ============================================================

const game = document.getElementById("game");

let currentZIndex = 10;


// ============================================================
// СОЗДАНИЕ ПРЕДМЕТОВ
// ============================================================

items.forEach(item => {

    const img = document.createElement("img");

    img.src = `images/${item.name}.png`;
    img.className = "item";
    img.draggable = false;
    img.dataset.name = item.name;

    // Сохраняем исходные координаты
    img.dataset.startX = item.x;
    img.dataset.startY = item.y;

    // Начальное положение
    img.style.left = `${item.x}px`;
    img.style.top = `${item.y}px`;

    // Начальный слой
    currentZIndex++;
    img.style.zIndex = currentZIndex;

    game.appendChild(img);

    makeDraggable(img);
});


// ============================================================
// ПЕРЕТАСКИВАНИЕ
// ============================================================

function makeDraggable(element) {

    let isDragging = false;

    let offsetX = 0;
    let offsetY = 0;


    element.addEventListener("pointerdown", function(event) {

        event.preventDefault();

        isDragging = true;

        // Поднимаем предмет на самый верх
        currentZIndex++;
        element.style.zIndex = currentZIndex;

        // Запоминаем место на картинке,
        // куда нажал пользователь
        const rect = element.getBoundingClientRect();

        offsetX = event.clientX - rect.left;
        offsetY = event.clientY - rect.top;

        element.setPointerCapture(event.pointerId);
    });


    element.addEventListener("pointermove", function(event) {

        if (!isDragging) {
            return;
        }

        event.preventDefault();

        const gameRect = game.getBoundingClientRect();

        let x =
            event.clientX -
            gameRect.left -
            offsetX;

        let y =
            event.clientY -
            gameRect.top -
            offsetY;


        // Не позволяем предмету выйти за пределы поля

        const width = element.offsetWidth;
        const height = element.offsetHeight;

        x = Math.max(
            0,
            Math.min(x, game.clientWidth - width)
        );

        y = Math.max(
            0,
            Math.min(y, game.clientHeight - height)
        );


        element.style.left = `${x}px`;
        element.style.top = `${y}px`;
    });


    element.addEventListener("pointerup", function(event) {

        isDragging = false;

        try {
            element.releasePointerCapture(event.pointerId);
        } catch (error) {
            // Ничего страшного
        }
    });


    element.addEventListener("pointercancel", function() {

        isDragging = false;

    });

}


// ============================================================
// RESTART
// ============================================================

const restart = document.createElement("img");

restart.src = "images/Restart.png";

restart.className = "game-button";
restart.draggable = false;

restart.style.position = "absolute";
restart.style.right = "15px";
restart.style.top = "15px";

// Размер можно изменить здесь
restart.style.width = "70px";

restart.style.zIndex = 1000;

game.appendChild(restart);


// При нажатии возвращаем все предметы
// на исходные позиции

restart.addEventListener("click", function() {

    const allItems = document.querySelectorAll(".item");

    allItems.forEach(element => {

        element.style.left =
            `${element.dataset.startX}px`;

        element.style.top =
            `${element.dataset.startY}px`;
    });

});


// ============================================================
// PIC — СМЕНА ФОНА
// ============================================================

const pic = document.createElement("img");

pic.src = "images/Pic.png";

pic.className = "game-button";
pic.draggable = false;

pic.style.position = "absolute";
pic.style.left = "15px";
pic.style.top = "15px";

// Размер можно изменить здесь
pic.style.width = "70px";

pic.style.zIndex = 1000;

game.appendChild(pic);


// Список фонов

const backgrounds = [
    "bg.png",
    "bg1.png",
    "bg2.png"
];

let currentBackground = 0;


// При нажатии меняем фон

pic.addEventListener("click", function() {

    currentBackground++;

    // Если дошли до конца списка —
    // возвращаемся к первому фону

    if (currentBackground >= backgrounds.length) {
        currentBackground = 0;
    }

    game.style.backgroundImage =
        `url("images/${backgrounds[currentBackground]}")`;

});

// ============================================================
// LINK.PNG
// ============================================================

const link = document.createElement("img");

link.src = "images/Link.png";

link.className = "link";
link.draggable = false;

// Положение — левый нижний угол
link.style.position = "absolute";
link.style.left = "15px";
link.style.bottom = "15px";

// Размер
link.style.width = "140px";

// Поверх ВСЕЙ одежды и предметов
link.style.zIndex = 9999;

game.appendChild(link);


// Нажатие открывает Telegram

link.addEventListener("click", function() {

    window.open(telegramLink, "_blank");

});




