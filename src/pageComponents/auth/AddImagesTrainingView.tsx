import { useRouter } from 'next/router'
import { useCallback, useMemo, useState } from 'react'
import { useCloseModal } from '@/hooks/application.hooks'
import {useDispatch} from 'react-redux'
import {logout} from '@/reducer/auth.reducer'
import FormHelper from '../FormHelper'
import {setHeaderConfigAxios} from '@/services/axios'
import {addImagesTrainingStructure} from '../formStructure/addImagesTrainingStructure'
import MultiFileUpload from '@/components/molecules/MultiFileUpload/MultiFileUpload'

const AddImagesTrainingView: React.FC = () => {
  // Form State
  const closeModal = useCloseModal()
  const [files, setFiles] = useState<File[]>([]);

  const handleFilesAdded = (newFiles: File[]) => {
    setFiles([...files, ...newFiles]);
  };


  const router = useRouter()
  const dispatch = useDispatch()

  const clickLogout = useCallback(async () => {
    try {
      // await userApi.logout()
      dispatch(logout())
      setHeaderConfigAxios()
    } catch (err) {
      console.error(err)
    }
  }, [])

  const onBtnClickHandler = useMemo(
    () => ({
      cancel: closeModal,
    }),
    []
  )

  return (
    // <FormHelper
    //   formStructure={addImagesTrainingStructure}
    //   onSubmit={clickLogout}
    //   onBtnClick={onBtnClickHandler}
    //   isMultipleFile={true}
    // />
    <div>
      <MultiFileUpload onFilesAdded={handleFilesAdded} />
      <div>
        {files.map((file) => (
          <div key={file.name}>{file.name}</div>
        ))}
      </div>
    </div>
  )
}

export default AddImagesTrainingView
