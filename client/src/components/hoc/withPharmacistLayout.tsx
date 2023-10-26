import React from "react";
import PharmacistLayout from "../../layouts/PharmacistLayout";

const withPharmacistLayout = (
  Component: React.ReactElement
): React.ComponentType<any> => {
  const WrappedComponent = (props: any): React.ReactElement => (
    <PharmacistLayout>{React.cloneElement(Component, props)}</PharmacistLayout>
  );

  return WrappedComponent;
};

export default withPharmacistLayout;
