import React, { FC } from "react";
import { api } from "~/utils/api";

interface dashboardProps {}

const dashboard: FC<dashboardProps> = ({}) => {
  const { mutate } = api.admin.sensitive.useMutation();
  return (
    <div>
      dashboard
      <button onClick={() => mutate()}>TOP SECRECT ACTION</button>
    </div>
  );
};

export default dashboard;
