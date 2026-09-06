
// Находим элементы в документе
const galleryImages = document.querySelectorAll('figure img');
const modal = document.getElementById('image-modal');
const modalImg = document.getElementById('modal-img');
const closeBtn = document.querySelector('.modal-close');

// Вешаем событие клика на каждую картинку в галерее
galleryImages.forEach(img => {
    img.addEventListener('click', () => {
        modal.style.display = 'flex'; // Показываем модальное окно
        modalImg.src = img.src;       // Копируем адрес картинки
        modalImg.alt = img.alt;       // Копируем описание
    });
});

// Закрытие окна при клике на крестик
closeBtn.addEventListener('click', () => {
    modal.style.display = 'none';
});

// Закрытие окна при клике на любое место фона вокруг картинки
modal.addEventListener('click', (e) => {
    if (e.target === modal) {
        modal.style.display = 'none';
    }
});

// Находим весь список ul на странице
const todoList = document.querySelector('ul');

// Слушаем клики внутри этого списка
todoList.addEventListener('click', function (event) {
    // Проверяем, что кликнули именно по тегу li (плашке)
    if (event.target.tagName === 'LI') {
        // toggle включает класс, если его нет, и выключает, если он уже есть (удобно для отмены)
        event.target.classList.toggle('checked');
    }
});



window.addEventListener('load', () => {
    if (window.innerWidth > 600) return;

    const track = document.querySelector('.gallery-track');
    if (!track) return;

    const images = track.querySelectorAll('img');
    if (images.length < 2) return; // Защита, если картинок меньше двух

    // ИНДЕКС СТАРТОВОЙ КАРТИНКИ 
    const targetStartIndex = 1;
    const startImg = images[targetStartIndex];

    // 1. ТОЧНОЕ ЦЕНТРИРОВАНИЕ ВТОРОЙ КАРТИНКИ ПРИ ЗАХОДЕ
    // Считаем точное положение скролла, чтобы картинка встала ровно по центру трека
    const trackWidth = track.offsetWidth;
    const imgWidth = startImg.offsetWidth;
    const imgLeft = startImg.offsetLeft;

    // Формула сдвига скролла для центрирования
    track.scrollLeft = imgLeft - (trackWidth - imgWidth) / 2;

    // 2. Переключение по клику на картинку
    images.forEach((img) => {
        img.addEventListener('click', () => {
            img.scrollIntoView({
                behavior: 'smooth',
                block: 'nearest',
                inline: 'center'
            });
        });
    });

    // 3. Функция определения активной картинки по центру экрана
    const checkActiveImage = () => {
        const trackCenter = track.getBoundingClientRect().left + track.offsetWidth / 2;

        images.forEach((img) => {
            const imgCenter = img.getBoundingClientRect().left + img.offsetWidth / 2;

            // Если картинка близко к центру — делаем активной
            if (Math.abs(trackCenter - imgCenter) < track.offsetWidth * 0.3) {
                img.classList.add('active');
            } else {
                img.classList.remove('active');
            }
        });
    };

    // Включаем слежение за скроллом пальцем
    track.addEventListener('scroll', checkActiveImage);

    // ИСПРАВЛЕНИЕ: Точный расчет без использования непредсказуемого imgLeft
    setTimeout(() => {
        const targetStartIndex = 1; // Вторая картинка
        const firstImg = images[0]; // Первая картинка для замера ширины

        if (!firstImg) return;

        const imgWidth = firstImg.offsetWidth;
        const gap = 10; // Соответствует gap: 10px в вашем CSS

        track.scrollLeft = imgWidth + gap;

        // Фиксируем класс active
        checkActiveImage();
    }, 50);

});



