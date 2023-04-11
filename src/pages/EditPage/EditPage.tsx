import React from 'react';
import { Link } from 'react-router-dom';
import { PageContainer } from 'components/index';
import { Edit, Tasks } from 'modules/index';
import { PATH_LIST } from 'constants/index';

export function EditPage() {
  return (
    <PageContainer>
      <h1>EDIT PAGE</h1>
      <Edit />
    </PageContainer>
  );
}
