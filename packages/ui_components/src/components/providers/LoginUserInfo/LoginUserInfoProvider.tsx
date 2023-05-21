import { getMyProfile } from "@/services/client/MyProfile";
import { GetMyProfileReturn } from "@/services/server/MyProfile";
import { ReactNode, useEffect } from "react";

import {
  LoginUserInfoActionContext,
  LoginUserInfoStateContext,
} from "./LoginUserInfoContext";
import type { AsyncState } from "@/utility/react-use/useAsyncFn";
import { useAsyncFn } from "@/utility/react-use";

export const LoginUserInfoProvider = ({
  children,
  defaultState,
}: {
  children: ReactNode;
  defaultState?: AsyncState<GetMyProfileReturn>;
}) => {
  const [profile, updateProfile] = useAsyncFn(getMyProfile, [], defaultState);
  useEffect(() => {
    updateProfile();
    // eslint-disable-next-line
  }, []);
  return (
    <LoginUserInfoStateContext.Provider value={profile}>
      <LoginUserInfoActionContext.Provider value={{ updateProfile }}>
        {children}
      </LoginUserInfoActionContext.Provider>
    </LoginUserInfoStateContext.Provider>
  );
};
