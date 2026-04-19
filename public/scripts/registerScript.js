const form = document.getElementById('formCadastro');

form.addEventListener('submit', async (e) => {
    e.preventDefault(); 

    // Capturando os dados conforme os novos campos do HTML
    // Dica: Use o ID exato que definimos no HTML
    const formData = {
        name: document.getElementById('full_name').value,
        cpf: document.getElementById('cpf').value,
        age: parseInt(document.getElementById('age').value), // Conversão de tipo (Type Casting)
        gender: document.getElementById('gender').value,
        status: document.getElementById('status').value,
        date_disappearance: document.getElementById('date_missing').value,
        last_location: document.getElementById('last_seen_location').value,
        photo_url: "https://via.placeholder.com/150", // Simulação, já que input file exige tratamento diferente
        physical_characteristic: document.getElementById('description').value
    };

    console.log("[LOG] Iniciando POST para a API...");

    try {
        const response = await fetch('http://localhost:3000/api/missingPerson', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json' 
            },
            body: JSON.stringify(formData) 
        });

        if (response.ok) {
            alert('Registro salvo com sucesso!');
            window.location.href = 'index.html'; // Redirecionamento após o sucesso
        } else {
            const errorData = await response.json();
            alert('Erro ao salvar: ' + (errorData.message || 'Erro desconhecido'));
        }

    } catch (error) {
        console.error('Erro na requisição:', error);
        alert('Falha crítica ao conectar com o servidor. Verifique o CORS e se o Node.js está rodando.');
    }
});