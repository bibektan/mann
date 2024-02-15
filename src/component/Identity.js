import React from "react";
import { UserIc } from "../Public/Asset/Icons/CostumIcon";

export default function Identity() {
  return (
    <>
      <div className="id-user">
        <div className="user-pic">
          <UserIc />
        </div>
        <h4>user name</h4>
      </div>
    </>
  );
}
