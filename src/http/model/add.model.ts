import { paths } from './todo.swagger';

export type AddTaskQuery = paths['/tasks']['post']['responses']['200']['content']['application/json'];
