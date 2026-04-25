const API_CONFIG = {
    URL: "https://registro-de-pessoas-desaparecidas.onrender.com/api/missingPerson",
    REDIRECT_PAGE: "index.html"
};

document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('formCadastro');
    if (form) form.addEventListener('submit', handleFormSubmit);
});

async function handleFormSubmit(event) {
    event.preventDefault();
    const form = event.target;

    const formData = new FormData(form);

    //Validação básica antes do upload
    const file = formData.get('photo_url');
    if (!file || file.size === 0) {
        alert("Por favor, selecione uma foto.");
        return;
    }

    try {
        toggleButtonState(form, true);

    
        const response = await fetch(API_CONFIG.URL, {
            method: 'POST',
            body: formData
        });

        if (!response.ok) {
            const errorData = await response.json().catch(() => ({}));
            throw new Error(errorData.message || 'Falha ao processar upload no servidor.');
        }

        const result = await response.json();
        console.log("[LOG] Registro e Upload concluídos:", result);
        
        alert('Registro e Foto salvos com sucesso!');
        window.location.href = API_CONFIG.REDIRECT_PAGE;

    } catch (error) {
        console.error('[UPLOAD_ERROR]', error);
        alert(`Erro no Cadastro: ${error.message}`);
    } finally {
        toggleButtonState(form, false);
    }
}

function toggleButtonState(form, isLoading) {
    const btn = form.querySelector('button[type="submit"]');
    if (btn) {
        btn.disabled = isLoading;
        btn.innerHTML = isLoading ? 
            `<span class="spinner-border spinner-border-sm"></span> Enviando...` : 
            'Finalizar Registro';
    }
}