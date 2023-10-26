import React from "react";
import AdminLayout from "../../layouts/AdminLayout";

const withAdminLayout = (
  Component: React.ReactNode
): React.ComponentType<any> => {
  const WrappedComponent = (props: any): React.ReactElement => (
    <AdminLayout>
      {React.cloneElement(Component as React.ReactElement, props)}
    </AdminLayout>
  );

  return WrappedComponent;
};

export default withAdminLayout;
