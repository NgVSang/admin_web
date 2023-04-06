import { useCallback } from 'react'
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux'
import {
  ApplicationModal,
  ApplicationSideBar,
  setOpenModal,
  setToggleSidebar,
} from '@/reducer/app.reducer'

import { AppDispatch, AppState } from '@/store/store'

export function useModalIsOpen(modal: ApplicationModal): boolean {
  const openModal = useAppSelector(
    (state: AppState) => state.application.openModal
  )
  return openModal === modal
}

export function useSidebarIsOpen(sidebar: ApplicationSideBar): boolean {
  const openModal = useAppSelector(
    (state: AppState) => state.application.openSideBar
  )
  return openModal === sidebar
}

export function useModalCurrentOpen(): ApplicationModal | null {
  const openModal = useAppSelector(
    (state: AppState) => state.application.openModal
  )
  return openModal
}

export function useSidebarCurrentOpen(): ApplicationSideBar | null {
  const openModal = useAppSelector(
    (state: AppState) => state.application.openSideBar
  )
  return openModal
}

export function useToggleModal(modal: ApplicationModal): () => void {
  const isOpen = useModalIsOpen(modal)
  const dispatch = useAppDispatch()
  return useCallback(
    () => dispatch(setOpenModal(isOpen ? null : modal)),
    [dispatch, modal, isOpen]
  )
}

export function useToggleSidebar(sidebar: ApplicationSideBar): () => void {
  const isOpen = useSidebarIsOpen(sidebar)
  const dispatch = useAppDispatch()
  return useCallback(
    () => dispatch(setToggleSidebar(isOpen ? null : sidebar)),
    [dispatch, sidebar, isOpen]
  )
}

export function useOpenModal(modal: ApplicationModal): () => void {
  const dispatch = useAppDispatch()
  return useCallback(() => dispatch(setOpenModal(modal)), [dispatch, modal])
}

export function useCloseModal(): () => void {
  const dispatch = useAppDispatch()
  return useCallback(() => dispatch(setOpenModal(null)), [dispatch])
}

export function useCloseSidebar(): () => void {
  const dispatch = useAppDispatch()
  return useCallback(() => dispatch(setToggleSidebar(null)), [dispatch])
}

export const useAppDispatch = () => useDispatch<AppDispatch>()
export const useAppSelector: TypedUseSelectorHook<AppState> = useSelector
