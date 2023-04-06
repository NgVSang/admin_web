import { atom, useAtom } from 'jotai'
import { ApplicationModal } from 'reducers/app.reducer'

interface ModalTypes {
  isOpen: boolean
  view: ApplicationModal
  data: any
}

const modalAtom = atom<ModalTypes>({
  isOpen: false,
  view: ApplicationModal.MENU,
  data: null,
})

export function useModal() {
  const [state, setState] = useAtom(modalAtom)
  const openModal = (view: ApplicationModal, data?: any) =>
    setState({ ...state, isOpen: true, view, data })
  const closeModal = () => setState({ ...state, isOpen: false })

  return {
    ...state,
    openModal,
    closeModal,
  }
}
