<?php
    if (file_exists('tasks.json')) {
        echo file_get_contents('tasks.json');
    } else {
        echo '[]';
    }
?>
