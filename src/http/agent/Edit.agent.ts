import { BasicAgent } from './Basic.agent';
import { EditTaskQuery } from 'http/model';

class EditAgent extends BasicAgent {
  constructor() {
    super(process.env.APP_API as string);
  }
  async editTask(taskId: string, data: EditTaskQuery): Promise<void> {
    await this._http.patch<EditTaskQuery>(`/tasks/${taskId}`, data);
  }
}

export const EditAgentInstance = new EditAgent();
