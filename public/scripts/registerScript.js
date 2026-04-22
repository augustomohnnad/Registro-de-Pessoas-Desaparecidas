const form = document.getElementById('formCadastro');

form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const formData = new FormData(form);

    const data = Object.fromEntries(formData.entries());

  
    const errors = validateData(data, formData);

    if (errors.length > 0) {
        showErrors(errors);
        return; 
    }

    try {
        const response = await fetch('http://localhost:3000/api/missingPerson', {
            method: 'POST',
            body: formData
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || 'Erro ao salvar');
        }

        const result = await response.json();

        alert('Registro salvo com sucesso!');
        console.log("[LOG] Sucesso:", result);

        window.location.href = 'index.html';

    } catch (error) {
        console.error('Erro na requisição:', error);
        alert(error.message);
    }
});

function showErrors(errors) {
    alert(errors.join('\n'));
}

function validateFile(formData) {
    const errors = [];

    const file = formData.get('photo_url');

    if (!file || file.size === 0) {
        errors.push('Foto é obrigatória');
        return errors;
    }

    const allowedTypes = ['image/jpeg', 'image/png', 'image/webp'];
    const maxSize = 2 * 1024 * 1024; // 2MB

    if (!allowedTypes.includes(file.type)) {
        errors.push('Formato de imagem inválido');
    }

    if (file.size > maxSize) {
        errors.push('Imagem muito grande (máx 2MB)');
    }

    return errors;
}

function validateData(data, formData) {
    const errors = [];

    // Nome
    if (!data.name || data.name.trim().length < 3) {
        errors.push('Nome deve ter pelo menos 3 caracteres');
    }

    // Localização
    if (!data.last_location || data.last_location.trim() === '') {
        errors.push('Localização é obrigatória');
    }

    // Data
    if (!data.date_disappearance) {
        errors.push('Data de desaparecimento é obrigatória');
    } else {
        const date = new Date(data.date_disappearance);
        if (date > new Date()) {
            errors.push('Data não pode ser no futuro');
        }
    }

    // Status
    const validStatus = ['desaparecido', 'encontrado', 'em busca'];
    if (!validStatus.includes((data.status || '').toLowerCase())) {
        errors.push('Status inválido');
    }

    // 👇 validação de arquivo integrada
    const fileErrors = validateFile(formData);
    errors.push(...fileErrors);

    return errors;
}