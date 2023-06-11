class Task
{
    constructor(itemKey, text, nextTask)
    {
        this.text = text;
        this.itemKey = itemKey;
        this.nextTask = nextTask;
    }

    static loadTask(task)
    {
        if(task == null || task == undefined)
        {
            return null;
        }
        return new Task(task.itemKey, task.text, Task.loadTask(task.nextTask));
    }
}

export default Task