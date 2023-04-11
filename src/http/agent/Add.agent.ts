import { BasicAgent } from './Basic.agent';
import { AddTaskQuery } from 'http/model';

class AddAgent extends BasicAgent {
  constructor() {
    super(process.env.APP_API as string);
  }
  async addTask(data: AddTaskQuery): Promise<void> {
    await this._http.post<AddTaskQuery>('/tasks', data);
  }
}

export const AddAgentInstance = new AddAgent();
