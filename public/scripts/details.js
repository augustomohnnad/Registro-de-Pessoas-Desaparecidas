const URL_API = "https://registro-de-pessoas-desaparecidas.onrender.com/";

document.addEventListener('DOMContentLoaded', () => {
    //Captura o ID da URL (ex: ?id=10)
    const params = new URLSearchParams(window.location.search);
    const personId = params.get('id');

    if (personId) {
        loadPersonDetails(personId);
    } else {
        document.getElementById('detailsContent').innerHTML = "<p class='alert alert-danger'>ID não fornecido.</p>";
    }
});

async function loadPersonDetails(id) {
    const container = document.getElementById('detailsContent');

    try {
        const response = await fetch(URL_API);
        const people = await response.json();
        
        // Busca a pessoa específica no array (Garantindo que ambos sejam tratados como string ou number)
        const person = people.find(p => String(p.id) === String(id));

        if (!person) {
            container.innerHTML = "<p class='alert alert-warning'>Registro não encontrado.</p>";
            return;
        }

        
        renderDetails(person, container);

    } catch (error) {
        console.error("Erro ao carregar detalhes:", error);
        container.innerHTML = "<p class='alert alert-danger'>Erro ao conectar com o servidor.</p>";
    }
}

function renderDetails(person, container) {
    container.innerHTML = `
        <div class="row">
            <div class="col-md-4 text-center mb-4">
                <img src="${person.photo_url}" alt="${person.name}" class="img-fluid rounded shadow-sm" style="max-height: 300px; object-fit: cover;">
            </div>
            <div class="col-md-8">
                <h3 class="text-primary">${person.name.toUpperCase()}</h3>
                <hr>
                <p><strong>Status:</strong> <span class="badge bg-secondary">${person.status.toUpperCase()}</span></p>
                <p><strong>Última Localização:</strong> ${person.last_location}</p>
                <p><strong>Data do Desaparecimento:</strong> ${new Date(person.date_disappearance).toLocaleDateString('pt-BR')}</p>
                <p><strong>Descrição/Observações:</strong> <br>
                   <span class="text-muted">${person.physical_characteristic || 'Nenhuma descrição adicional informada.'}</span>
                </p>
            </div>
        </div>
    `;
}