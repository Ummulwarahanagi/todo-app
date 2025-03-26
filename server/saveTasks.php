<?php
    if (isset($_POST['tasks'])) {
        $tasks = json_decode($_POST['tasks']);
        file_put_contents('tasks.json', json_encode($tasks));
        echo 'Tasks saved';
    }
?>
