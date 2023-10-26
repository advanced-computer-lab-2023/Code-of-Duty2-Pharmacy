import React from "react";
import PatientLayout from "../../layouts/PatientLayout";

const withPatientLayout = (
  Component: React.ReactElement
): React.ComponentType<any> => {
  const WrappedComponent = (props: any): React.ReactElement => (
    <PatientLayout>{React.cloneElement(Component, props)}</PatientLayout>
  );

  return WrappedComponent;
};

export default withPatientLayout;
