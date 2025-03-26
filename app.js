$(document).ready(function() {
    // Function to add new tasks
    $('#add-task').click(function() {
        let task = $('#new-task').val();
        if (task !== '') {
            let taskItem = `<li>
                                <span class="task-text">${task}</span>
                                <button class="edit">Edit</button>
                                <button class="delete">Delete</button>
                            </li>`;
            $('#task-list').append(taskItem);
            $('#new-task').val(''); // clear the input
            saveTasks(); // Save to server via AJAX
        }
    });

    // Mark task as completed
    $('#task-list').on('click', 'li', function() {
        $(this).toggleClass('completed');
        saveTasks(); // Save to server via AJAX
    });

    // Edit task
    $('#task-list').on('click', '.edit', function(e) {
        e.stopPropagation();
        let taskText = $(this).siblings('.task-text').text();
        let newTaskText = prompt('Edit Task:', taskText);
        if (newTaskText) {
            $(this).siblings('.task-text').text(newTaskText);
            saveTasks(); // Save to server via AJAX
        }
    });

    // Delete task
    $('#task-list').on('click', '.delete', function(e) {
        e.stopPropagation();
        $(this).parent().fadeOut(function() {
            $(this).remove();
            saveTasks(); // Save to server via AJAX
        });
    });

    // Save task list to the server via AJAX
    function saveTasks() {
        let tasks = [];
        $('#task-list li').each(function() {
            tasks.push({
                text: $(this).find('.task-text').text(),
                completed: $(this).hasClass('completed')
            });
        });

        $.ajax({
            url: 'saveTasks.php', // Replace with your server-side script
            method: 'POST',
            data: { tasks: JSON.stringify(tasks) },
            success: function(response) {
                console.log('Tasks saved');
            }
        });
    }

    // Load tasks from server on page load
    function loadTasks() {
        $.ajax({
            url: 'loadTasks.php', // Replace with your server-side script
            method: 'GET',
            success: function(response) {
                let tasks = JSON.parse(response);
                tasks.forEach(function(task) {
                    let taskItem = `<li class="${task.completed ? 'completed' : ''}">
                                        <span class="task-text">${task.text}</span>
                                        <button class="edit">Edit</button>
                                        <button class="delete">Delete</button>
                                    </li>`;
                    $('#task-list').append(taskItem);
                });
            }
        });
    }

    // Load tasks when the page loads
    loadTasks();
});
