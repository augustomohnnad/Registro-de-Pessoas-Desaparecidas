const form = document.getElementById('formCadastro');

form.addEventListener('submit', async (e) => {
    e.preventDefault(); 

    console.log("[LOG] Iniciando captura de dados via FormData...");

    
    const formData = new FormData(form);

    try {
        const response = await fetch('http://localhost:3000/api/missingPerson', {
            method: 'POST',
            body: formData 
        });

        if (response.ok) {
            const result = await response.json();
            alert('Registro salvo com sucesso!');
            console.log("[LOG] Sucesso:", result);
            window.location.href = 'index.html'; 
        } else {
            const errorData = await response.json();
            alert('Erro ao salvar: ' + (errorData.message || 'Erro desconhecido'));
        }

    } catch (error) {
        console.error('Erro na requisição:', error);
    }
});