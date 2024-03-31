#! /usr/bin/env node

import inquirer from 'inquirer';
import chalk from 'chalk';

// Print header
console.log(chalk.bgBlueBright.bold.white(" \t\n>>> Todo List Project Created By 'MALIK SHAHMEER' <<<\n "));

interface Todo {
    task: string;
    completed: boolean;
}

const todoList: Todo[] = [];

const mainMenu = async () => {
    const { choice } = await inquirer.prompt({
        type: 'list',
        name: 'choice',
        message: 'What would you like to do?',
        choices: ['Add a task', 'View tasks', 'Mark task as completed', 'Edit a task', 'Delete a task', 'Exit']
    });

    switch (choice) {
        case 'Add a task':
            await addTask();
            break;
        case 'View tasks':
            viewTasks();
            break;
        case 'Mark task as completed':
            markTaskCompleted();
            break;
        case 'Edit a task':
            editTask();
            break;
        case 'Delete a task':
            deleteTask();
            break;
        case 'Exit':
            console.log(chalk.green('Thank you for using Todo List. Goodbye!'));
            process.exit(0);
        default:
            console.log(chalk.red('Invalid choice. Please try again.'));
            mainMenu();
            break;
    }
};

const addTask = async () => {
    const { taskName } = await inquirer.prompt({
        type: 'input',
        name: 'taskName',
        message: 'Enter the task:',
        validate: (input: string) => input.trim() !== ''
    });

    todoList.push({ task: taskName, completed: false });
    console.log(chalk.green('Task added successfully!\n'));
    mainMenu();
};

const viewTasks = () => {
    console.log(chalk.bold.blue('Current Tasks:'));
    todoList.forEach((todo, index) => {
        const status = todo.completed ? chalk.green('[✓]') : chalk.red('[ ]');
        console.log(`${index + 1}. ${status} ${todo.task}`);
    });
    console.log('');
    mainMenu();
};

const markTaskCompleted = async () => {
    const { taskIndex } = await inquirer.prompt({
        type: 'number',
        name: 'taskIndex',
        message: 'Enter the index of the task to mark as completed:',
        validate: (input: number) => input > 0 && input <= todoList.length
    });

    todoList[taskIndex - 1].completed = true;
    console.log(chalk.green('Task marked as completed!\n'));
    mainMenu();
};

const editTask = async () => {
    const { taskIndex } = await inquirer.prompt({
        type: 'number',
        name: 'taskIndex',
        message: 'Enter the index of the task to edit:',
        validate: (input: number) => input > 0 && input <= todoList.length
    });

    const { newTaskName } = await inquirer.prompt({
        type: 'input',
        name: 'newTaskName',
        message: 'Enter the new task:',
        validate: (input: string) => input.trim() !== ''
    });

    todoList[taskIndex - 1].task = newTaskName;
    console.log(chalk.green('Task edited successfully!\n'));
    mainMenu();
};

const deleteTask = async () => {
    const { taskIndex } = await inquirer.prompt({
        type: 'number',
        name: 'taskIndex',
        message: 'Enter the index of the task to delete:',
        validate: (input: number) => input > 0 && input <= todoList.length
    });

    todoList.splice(taskIndex - 1, 1);
    console.log(chalk.green('Task deleted successfully!\n'));
    mainMenu();
};

mainMenu();
