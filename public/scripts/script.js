async function loadDashboardData() {
    const tbody = document.getElementById('tbodyMissingPerson');
    try {
        const response = await fetch("HTTP://127.0.0.1:3000/api/missingPerson");
        
        if (!response.ok) {
            throw new Error('Falha na comunicação com a API');
        }

        const people = await response.json();

        tbody.innerHTML = '';

        if (people.length === 0) {
            tbody.innerHTML = `<tr><td colspan="7" class="text-center text-muted py-4">Nenhum registro de desaparecimento encontrado.</td></tr>`;
            return;
        }

        people.forEach(person => {
            const dataDesaparecimento = new Date(person.date_disappearance).toLocaleDateString('pt-BR');
            
            const photoUrl = person.photourl;

            const row = `
                <tr>
                    <td>${person.id}</td>
                    <td class="text-center">
                        <img src="${photoUrl}" alt="Foto de ${person.photourl}" class="rounded-circle" width="40" height="40" style="object-fit: cover;">
                    </td>
                    <td class="fw-bold text-primary">${person.name.toUpperCase()}</td>
                    <td>${person.last_location}</td>
                    <td>${dataDesaparecimento}</td>
                    <td>
                        <span class="badge bg-danger status-badge">${person.status}</span>
                    </td>
                    <td>
                        <button class="btn btn-sm btn-outline-secondary" onclick="viewDetails(${person.id})">Ver Detalhes</button>
                    </td>
                </tr>
            `;
            
            // Injeta a linha criada no final da tabela
            tbody.insertAdjacentHTML('beforeend', row);
        });

    } catch (error) {
        console.error('[VIEW ERROR]', error);
        tbody.innerHTML = `
            <tr>
                <td colspan="7" class="text-center text-danger py-4">
                    <strong>Erro ao carregar o dashboard.</strong><br>
                    Verifique se o servidor Node.js está rodando e se a rota <code>${API_URL}</code> está ativa.
                </td>
            </tr>`;
    }
}

document.addEventListener('DOMContentLoaded', () => {
    loadDashboardData();
});

function viewDetails(id) {
    alert('Em breve: Detalhes da pessoa com ID ' + id);
    
}