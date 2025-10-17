// Получаем элемент Canvas

const canvas = document.getElementById('neural-net-background');

const ctx = canvas.getContext('2d');



// Массив для хранения всех точек (частиц)

let particles = [];

// Настройки

const numParticles = 60; // Количество точек

const maxDistance = 120; // Максимальное расстояние для соединения нитями



// 1. Устанавливаем размеры Canvas

function setCanvasSize() {

    canvas.width = window.innerWidth;

    canvas.height = window.innerHeight;

}

setCanvasSize();

window.addEventListener('resize', setCanvasSize);



// 2. Класс для создания одной точки

class Particle {

    constructor() {

        // Случайные координаты на экране

        this.x = Math.random() * canvas.width;

        this.y = Math.random() * canvas.height;

        // Случайная скорость и направление

        this.velocity = {

            x: (Math.random() - 0.5) * 0.5,

            y: (Math.random() - 0.5) * 0.5

        };

        // Размер точки

        this.size = Math.random() * 2 + 0.5;

        // Цвет (можно изменить)

        this.color = 'rgba(11, 240, 190, 0.8)';

    }



    // Рисуем точку

    draw() {

        ctx.fillStyle = this.color;

        ctx.beginPath();

        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);

        ctx.fill();

    }



    // Обновляем позицию

    update() {

        // Изменяем позицию

        this.x += this.velocity.x;

        this.y += this.velocity.y;

       

        // Отскок от краев (чтобы точки не уходили за пределы)

        if (this.x > canvas.width || this.x < 0) this.velocity.x = -this.velocity.x;

        if (this.y > canvas.height || this.y < 0) this.velocity.y = -this.velocity.y;

    }

}



// 3. Инициализация (создание) всех точек

function init() {

    for (let i = 0; i < numParticles; i++) {

        particles.push(new Particle());

    }

}



// 4. Отрисовка нитей между точками

function connect() {

    for (let i = 0; i < numParticles; i++) {

        for (let j = i; j < numParticles; j++) {

            const p1 = particles[i];

            const p2 = particles[j];



            // Вычисляем расстояние между точками

            const distance = Math.sqrt(

                Math.pow(p1.x - p2.x, 2) + Math.pow(p1.y - p2.y, 2)

            );



            // Если расстояние меньше максимального, рисуем линию

            if (distance < maxDistance) {

                // Чем дальше точки, тем прозрачнее линия

                const opacity = 1 - (distance / maxDistance);



                ctx.strokeStyle = `rgba(255, 255, 255, ${opacity})`;

                ctx.lineWidth = 0.5;

                ctx.beginPath();

                ctx.moveTo(p1.x, p1.y);

                ctx.lineTo(p2.x, p2.y);

                ctx.stroke();

            }

        }

    }

}



// 5. Главный цикл анимации

function animate() {

    requestAnimationFrame(animate); // Запрашиваем следующий кадр

    ctx.clearRect(0, 0, canvas.width, canvas.height); // Очищаем предыдущий кадр



    connect(); // Рисуем нити

   

    // Обновляем и рисуем все точки

    particles.forEach(p => {

        p.update();

        p.draw();

    });

}



// Запускаем

init();

animate();