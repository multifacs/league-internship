import { action, computed, makeObservable, observable } from 'mobx';
import { AddEntity } from 'domains/index';

type PrivateFields = '_isAddLoading' | '_addForm';

export class AddStore {
  constructor() {
    makeObservable<this, PrivateFields>(this, {
      _isAddLoading: observable,
      _addForm: observable,

      isAddLoading: computed,

      addTask: action,
    });
  }

  private _isAddLoading = false;

  get isAddLoading(): boolean {
    return this._isAddLoading;
  }

  private _addForm?: AddEntity = {
    name: '',
    info: '',
    isImportant: false,
    isDone: false,
  };

  addTask = async (addParams?: AddEntity) => {
    this._isAddLoading = true;
    try {
      if (addParams) this._addForm = addParams;

      // const { tasks, tasksStats } = await this.getTasks(this._searchForm);
    } catch {
      console.log('ERROR');
    } finally {
      this._isAddLoading = false;
    }
  };
}

export const AddStoreInstance = new AddStore();
