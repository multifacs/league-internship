import { useEffect } from 'react';
import { observer } from 'mobx-react';
import { AddForm } from './components';

function AddProto() {
  return (
    <>
      <AddForm />
    </>
  );
}

export const Add = observer(AddProto);
