document.addEventListener('DOMContentLoaded', () => {
    loadDashboardData();
});

async function loadDashboardData() {
    const tbody = document.getElementById('tbodyMissingPerson');

    tbody.innerHTML = `
        <tr>
            <td colspan="7" class="text-center py-4">
                <div class="spinner-border text-primary" role="status"></div>
                <div>Carregando dados...</div>
            </td>
        </tr>
    `;

    try {
        const response = await fetch("http://127.0.0.1:3000/api/missingPerson");

        if (!response.ok) {
            throw new Error('Falha na comunicação com a API');
        }

        const people = await response.json();

        if (people.length === 0) {
            tbody.innerHTML = `
                <tr>
                    <td colspan="7" class="text-center text-muted py-4">
                        Nenhum registro de desaparecimento encontrado.
                    </td>
                </tr>`;
            return;
        }

        let rows = '';

        people.forEach(person => {
            const dataDesaparecimento = new Date(person.date_disappearance)
                .toLocaleDateString('pt-BR');

            rows += `
                <tr>
                    <td>${person.id}</td>
                    <td class="text-center">
                        <img src="${person.photo_url}" 
                             alt="Foto de ${person.name}" 
                             class="rounded-circle" 
                             width="100" height="100"
                             loading="lazy"
                             style="object-fit: cover;">
                    </td>
                    <td class="fw-bold text-primary">${person.name.toUpperCase()}</td>
                    <td>${person.last_location}</td>
                    <td>${dataDesaparecimento}</td>
                    <td>
                        <span class="badge ${getStatusClass(person.status)} status-badge">
                            ${person.status.toUpperCase()}
                        </span>
                    </td>
                    <td>
                        <button class="btn btn-sm btn-outline-secondary"
                                onclick="viewDetails(${person.id})">
                            Ver Detalhes
                        </button>
                    </td>
                </tr>
            `;
        });

        tbody.innerHTML = rows;

    } catch (error) {
        console.error('[VIEW ERROR]', error);

        tbody.innerHTML = `
            <tr>
                <td colspan="7" class="text-center text-danger py-4">
                    <strong>Erro ao carregar o dashboard.</strong><br>
                    Verifique se o servidor Node.js está rodando.
                </td>
            </tr>`;
    }
}

function getStatusClass(status) {
    switch (status.toLowerCase()) {
        case 'desaparecido':
            return 'bg-danger';   // verde
        case 'encontrado':
            return 'bg-success';  // verde
        case 'obito':
            return 'bg-secondary'; // cinza
        default:
            return 'bg-dark'; // fallback
    }
}

function viewDetails(id) {
    alert('Em breve: Detalhes da pessoa com ID ' + id);
}