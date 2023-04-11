import { action, computed, makeObservable, observable } from 'mobx';
import { AddEntity } from 'domains/index';
import { EditAgentInstance } from 'http/index';
import { EditTaskQuery } from 'http/model';

type PrivateFields = '_isEditLoading' | '_editForm';

export class EditStore {
  constructor() {
    makeObservable<this, PrivateFields>(this, {
      _isEditLoading: observable,
      _editForm: observable,

      isEditLoading: computed,

      editTask: action,
    });
  }

  private _isEditLoading = false;

  get isEditLoading(): boolean {
    return this._isEditLoading;
  }

  private _editForm?: AddEntity = {
    name: '',
    info: '',
    isImportant: false,
    isDone: false,
  };

  editTask = async (taskId: string, editParams?: AddEntity) => {
    this._isEditLoading = true;
    try {
      if (editParams) this._editForm = editParams;
      const externalParams: EditTaskQuery = {
        name: editParams?.name,
        info: editParams?.info,
        isImportant: editParams?.isImportant,
        isCompleted: editParams?.isDone,
      };
      await EditAgentInstance.editTask(taskId, externalParams);
    } catch {
      console.log('ERROR');
    } finally {
      this._isEditLoading = false;
    }
  };
}

export const EditStoreInstance = new EditStore();
