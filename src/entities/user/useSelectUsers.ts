import { useCallback } from "react";
import { useSearchParams } from "react-router-dom";

export const useSelectUsers = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const getIdList = useCallback(
    () => searchParams.getAll("userId"),
    [searchParams]
  );

  const toggleUserId = (id: number) => {
    const idList = getIdList();

    if (idList.includes(`${id}`)) {
      setSearchParams({
        userId: idList.filter((userId) => +userId !== id),
      });
    } else {
      setSearchParams({
        userId: [...idList, `${id}`],
      });
    }
  };

  const isSelectedId = (id: number | string) => {
    return searchParams.getAll("userId").includes(`${id}`);
  };

  return {
    toggleUserId,
    isSelectedId,
    getIdList,
  };
};
