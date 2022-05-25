dv.taskList(dv.page("Task Backlog").file.tasks
    .where(t => !t.completed), false)