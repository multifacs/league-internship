import { useEffect } from 'react';
import { observer } from 'mobx-react';
import { EditForm } from './components';

function EditProto() {
  return (
    <>
      <EditForm />
    </>
  );
}

export const Edit = observer(EditProto);
