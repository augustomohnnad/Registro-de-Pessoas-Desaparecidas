/**
 * CONFIGURAÇÃO DE AMBIENTE
 */
const API_CONFIG = {
    URL: "https://registro-de-pessoas-desaparecidas.onrender.com/api/missingPerson",
    HEADERS: { 'Content-Type': 'application/json' }
};

document.addEventListener('DOMContentLoaded', () => {
    initDashboard();
});


async function initDashboard() {
    const tbody = document.getElementById('tbodyMissingPerson');
    renderLoadingState(tbody);

    try {
        const people = await fetchPeople();
        
        if (!people || people.length === 0) {
            renderEmptyState(tbody);
            return;
        }

        renderTableRows(tbody, people);
    } catch (error) {
        renderErrorState(tbody, error);
    }
}

async function fetchPeople() {
    const response = await fetch(API_CONFIG.URL);
    if (!response.ok) throw new Error('Falha ao conectar com o servidor.');
    return await response.json();
}


function viewDetails(id) {
    window.location.href = `details.html?id=${id}`;
}


function renderTableRows(container, data) {
    container.innerHTML = data.map(person => `
        <tr>
            <td>${person.id}</td>
            <td class="text-center">
                <img src="${person.photo_url}" alt="${person.name}" 
                     class="rounded-circle" width="100" height="100" 
                     style="object-fit: cover;">
            </td>
            <td class="fw-bold text-primary">${person.name.toUpperCase()}</td>
            <td>${person.last_location}</td>
            <td>${new Date(person.date_disappearance).toLocaleDateString('pt-BR')}</td>
            <td>
                <span class="badge ${getStatusClass(person.status)}">
                    ${person.status.toUpperCase()}
                </span>
            </td>
            <td>
                <button <button class="btn btn-sm btn-outline-secondary" onclick="viewDetails(${person.id})"> Ver Detalhes
                </button>
            </td>
        </tr>
    `).join('');
}

function getStatusClass(status) {
    const statusMap = {
        'desaparecido': 'bg-danger',
        'encontrado': 'bg-success',
        'obito': 'bg-secondary'
    };
    return statusMap[status.toLowerCase()] || 'bg-dark';
}

// Helpers de UI
function renderLoadingState(el) { el.innerHTML = `<tr><td colspan="7" class="text-center py-4"><div class="spinner-border text-primary"></div></td></tr>`; }
function renderEmptyState(el) { el.innerHTML = `<tr><td colspan="7" class="text-center text-muted py-4">Nenhum registro encontrado.</td></tr>`; }
function renderErrorState(el, err) { el.innerHTML = `<tr><td colspan="7" class="text-center text-danger py-4">Erro ao carregar: ${err.message}</td></tr>`; }

window.viewDetails = viewDetails;