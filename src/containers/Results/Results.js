import React, { Fragment } from 'react';
import ResultsTable from './ResultsTable/ResultsTable';
import ResultsForm from './ResultsForm/ResultsForm';

const results = () => {
  return (
    <Fragment>
      <ResultsForm />
      <ResultsTable />
    </Fragment>
  );
};

export default results;
