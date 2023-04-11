import React from 'react';
import { Link } from 'react-router-dom';
import { PageContainer } from 'components/index';
import { Add } from 'modules/index';
import { PATH_LIST } from 'constants/index';

export function AddPage() {
  return (
    <PageContainer>
      <h1>ADD PAGE</h1>
      <Add />
    </PageContainer>
  );
}
