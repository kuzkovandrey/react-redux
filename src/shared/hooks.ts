import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import type { RootState, TypedDispatch } from "../app/store";

export const useAppDispatch = () => useDispatch<TypedDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
