import { paths } from './todo.swagger';

export type EditTaskQuery = paths['/tasks/{taskId}']['patch']['requestBody']['content']['application/json'];
