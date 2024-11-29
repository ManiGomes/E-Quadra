const sports = document.querySelectorAll('.sport');
sports.forEach(sport => {
    sport.addEventListener('click', () => {
        sports.forEach(s => s.classList.remove('active'));
        sport.classList.add('active');
    });
});

const regions = document.querySelectorAll('.location');
regions.forEach(region => {
    region.addEventListener('click', () => {
        alert(`Você selecionou ${region.querySelector('h3').textContent}`);
    });
});
