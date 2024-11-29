const quadras = [
    { nome: "Diogo", cidade: "Guarulhos", esporte: "Futebol", icone: "⚽", datas: ["25/10/24", "26/10/24", "30/10/24", "10/11/24", "15/11/24"] },
    { nome: "Gustavo", cidade: "São Paulo", esporte: "Volei", icone: "🏐", datas: ["04/10/24", "05/10/24", "07/10/24", "20/10/24", "25/10/24"] },
    { nome: "Richart", cidade: "Guarulhos", esporte: "Basquete", icone: "🏀", datas: ["12/11/24", "13/11/24", "18/11/24", "22/11/24", "29/11/24"] },
    { nome: "Luara", cidade: "São Paulo", esporte: "Tênis", icone: "🎾", datas: ["15/10/24", "17/10/24", "18/10/24", "22/10/24"] }
];

let selectedSport = ''; 


document.querySelectorAll('.sport').forEach(item => {
    item.addEventListener('click', function () {
        selectedSport = this.getAttribute('data-esporte'); 
        updateActiveSport(this); 
        filterQuadras(); 
    });
});


function updateActiveSport(selected) {
    document.querySelectorAll('.sport').forEach(sport => {
        sport.classList.remove('active'); 
    });
    selected.classList.add('active'); 
}

function filterQuadras() {
    const query = document.getElementById("search-input").value.trim().toLowerCase();

  
    const filteredQuadras = quadras.filter(quadra => {
        const matchesSport = selectedSport ? quadra.esporte === selectedSport : true;
        const matchesQuery = quadra.esporte.toLowerCase().includes(query) ||
            quadra.cidade.toLowerCase().includes(query) ||
            quadra.datas.some(date => date.includes(query));

        return matchesSport && matchesQuery;
    });

    displayQuadras(filteredQuadras);
}

function displayQuadras(filteredQuadras) {
    const quadrasList = document.getElementById("quadras-list");
    quadrasList.innerHTML = ""; 

    if (filteredQuadras.length === 0) {
        quadrasList.innerHTML = "<p>Nenhuma quadra encontrada.</p>";
        return;
    }

    filteredQuadras.forEach(quadra => {
        const quadraElement = document.createElement("div");
        quadraElement.classList.add("quadra-item");

        quadraElement.innerHTML = `
            <div class="quadra_cidade">
                <img src="/assets/img/point_local.png" alt="Point_local" class="point_local">
                <p>${quadra.cidade}</p>
            </div>
            <div class="icon_quadra">${quadra.icone}</div>
            <div class="datas_exibidas">
                ${quadra.datas.slice(0, 3).map(date => `
                    <div class="lista_de_datas">
                        <p class="icon_calendario">📅</p>
                        <p class="data_exibida" data-date="${date}">${date}</p>
                    </div>`).join('')}
                <input type="date" class="date-picker" style="display:none" data-available-dates="${quadra.datas.join(',')}" />
            </div>
            <div class = "alinhar_footer"> 
                <div class="dono_quadra"> 
                    <img src="/assets/img/icon_usuario.png" alt="Icone do usuario" class="icon_usuario">
                    <h3>${quadra.nome}</h3>
                    
                    </div>
                    <button class="botao_reservar">Reservar</button>
                    <button class="botao_calendario">📅 Celendário</button>
            </div>
        `;

        quadrasList.appendChild(quadraElement);
    });
}

document.addEventListener('click', function (e) {
    if (e.target && e.target.closest('.lista_de_datas')) {
        const dateElement = e.target.closest('.lista_de_datas').querySelector('.data_exibida');

        const selectedDate = dateElement ? dateElement.dataset.date : null;

        if (selectedDate) {

            document.querySelectorAll('.lista_de_datas').forEach(element => {
                element.classList.remove('selected'); 
            });

            e.target.closest('.lista_de_datas').classList.add('selected');
        }
    }
});



document.getElementById("search-button").addEventListener("click", function () {
    filterQuadras(); 
});

document.getElementById("search-input").addEventListener("keypress", function (e) {
    if (e.key === 'Enter') {
        filterQuadras();
    }
});

document.getElementById("clear-filters").addEventListener("click", function () {
    document.getElementById("search-input").value = '';


    selectedSport = '';
    document.querySelectorAll('.sport').forEach(sport => {
        sport.classList.remove('active'); 
    });


    displayQuadras(quadras);
});

displayQuadras(quadras);
