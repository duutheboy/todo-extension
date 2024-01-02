// Esta função é executada quando o DOM é carregado completamente.
document.addEventListener('DOMContentLoaded', function () {
    // Adiciona um evento de clique ao botão 'add-task' para chamar a função addTaskFromInput().
    document.getElementById('add-task').addEventListener('click', addTaskFromInput);
    // Carrega as tarefas salvas ao carregar a página.
    loadTasks();
});

// Adiciona uma nova tarefa à lista quando o usuário clica no botão 'Add Task'.
function addTaskFromInput() {
    // Obtém o valor do campo de entrada 'new-task'.
    const taskValue = document.getElementById('new-task').value;
    // Verifica se há um valor válido na entrada.
    if (taskValue) {
        // Adiciona a tarefa à lista.
        addTask(taskValue);
        // Limpa o campo de entrada 'new-task'.
        document.getElementById('new-task').value = '';
        // Salva as tarefas na memória local após adicionar uma nova tarefa.
        saveTasks();
    }
}

// Adiciona uma nova tarefa à lista de tarefas.
function addTask(taskValue, isCompleted = false) {
    // Obtém a lista não ordenada (ul) onde as tarefas serão adicionadas.
    const ul = document.getElementById('task-list');
    // Cria um novo item de lista (li).
    const li = document.createElement('li');

    // Cria um elemento checkbox para marcar a tarefa como concluída ou não.
    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.checked = isCompleted;
    checkbox.addEventListener('change', toggleTask);

    // Cria um elemento span para exibir o texto da tarefa.
    const text = document.createElement('span');
    text.textContent = taskValue;
    text.style.textDecoration = isCompleted ? 'line-through' : 'none';

    // Cria um botão 'Edit' para editar a tarefa.
    const editButton = document.createElement('button');
    editButton.textContent = 'Editar';
    editButton.addEventListener('click', editTask);
    editButton.setAttribute('class', 'edit-btn');

    // Cria um botão 'Delete' para excluir a tarefa.
    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'Deletar';
    deleteButton.addEventListener('click', deleteTask);
    deleteButton.setAttribute('class', 'del-btn');

    // Adiciona os elementos criados ao elemento li.
    li.appendChild(checkbox);
    li.appendChild(text);
    li.appendChild(editButton);
    li.appendChild(deleteButton);

    // Adiciona o elemento li à lista de tarefas (ul).
    ul.appendChild(li);
}

// Salva as tarefas na memória local (localStorage).
function saveTasks() {
    const tasks = [];
    // Itera sobre cada item de lista (li) na lista de tarefas.
    document.querySelectorAll('#task-list li').forEach(function (taskLi) {
        // Obtém o texto e o status concluído de cada tarefa.
        const text = taskLi.querySelector('span').textContent;
        const isCompleted = taskLi.querySelector('input').checked;
        // Adiciona as informações da tarefa ao array de tarefas.
        tasks.push({ text, isCompleted });
    });
    // Salva o array de tarefas na memória local como uma string JSON.
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Carrega as tarefas salvas da memória local ao carregar a página.
function loadTasks() {
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    // Itera sobre cada tarefa carregada e a adiciona à lista.
    tasks.forEach(function (task) {
        addTask(task.text, task.isCompleted);
    });
}

// Alterna o status concluído de uma tarefa quando a caixa de seleção é clicada.
function toggleTask(event) {
    const text = event.target.nextElementSibling;
    // Altera o estilo do texto para riscado (line-through) se a tarefa estiver concluída, caso contrário, sem riscos (none).
    text.style.textDecoration = event.target.checked ? 'line-through' : 'none';
    // Salva as tarefas atualizadas na memória local.
    saveTasks();
}

// Exclui uma tarefa da lista quando o botão 'Delete' é clicado.
function deleteTask(event) {
    const li = event.target.parentNode;
    // Remove o item de lista (li) da lista de tarefas.
    li.parentNode.removeChild(li);
    // Salva as tarefas atualizadas na memória local.
    saveTasks();
}

// Permite editar uma tarefa quando o botão 'Edit' é clicado.
function editTask(event) {
    const textSpan = event.target.previousElementSibling;
    // Abre um prompt para editar o texto da tarefa.
    const newText = prompt("Edit Your Task", textSpan.textContent);
    if (newText !== null) {
        // Atualiza o texto da tarefa com o novo texto inserido pelo usuário.
        textSpan.textContent = newText;
        // Salva as tarefas atualizadas na memória local.
        saveTasks();
    }
}
