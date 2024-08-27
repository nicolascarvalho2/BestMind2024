document.addEventListener('DOMContentLoaded', function() {
    let products = [];
    const productForm = document.getElementById('productForm');
    const productTableBody = document.querySelector('#productTable tbody');
    const formTitle = document.getElementById('formTitle');
    const cancelButton = document.getElementById('cancelButton');

    function renderTable() {
        productTableBody.innerHTML = '';
        products.forEach((product, index) => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${product.nome}</td>
                <td>${product.codigo}</td>
                <td>${product.descricao}</td>
                <td>${product.preco}</td>
                <td>
                    <button onclick="editProduct(${index})">Editar</button>
                    <button onclick="deleteProduct(${index})">Deletar</button>
                </td>
            `;
            productTableBody.appendChild(row);
        });
    }

    productForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const nome = document.getElementById('nome').value;
        const codigo = document.getElementById('codigo').value;
        const descricao = document.getElementById('descricao').value;
        const preco = document.getElementById('preco').value;
        const productId = document.getElementById('productId').value;

        if (productId) {
            // Editar produto existente
            products[productId] = { nome, codigo, descricao, preco };
            formTitle.textContent = 'Adicionar Produto';
            cancelButton.style.display = 'none';
        } else {
            // Adicionar novo produto
            products.push({ nome, codigo, descricao, preco });
        }

        productForm.reset();
        renderTable();
    });

    cancelButton.addEventListener('click', function() {
        productForm.reset();
        formTitle.textContent = 'Adicionar Produto';
        cancelButton.style.display = 'none';
    });

    window.editProduct = function(index) {
        const product = products[index];
        document.getElementById('nome').value = product.nome;
        document.getElementById('codigo').value = product.codigo;
        document.getElementById('descricao').value = product.descricao;
        document.getElementById('preco').value = product.preco;
        document.getElementById('productId').value = index;
        formTitle.textContent = 'Editar Produto';
        cancelButton.style.display = 'inline';
    }

    window.deleteProduct = function(index) {
        products.splice(index, 1);
        renderTable();
    }
});