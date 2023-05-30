import { useMemo, useState } from 'react'
import { useCloseModal } from '@/hooks/application.hooks'
import * as authApi from '@/services/api/auth.api'
import MultiFileUpload from '@/components/molecules/MultiFileUpload/MultiFileUpload'
import {Button} from 'antd'
import toast from 'react-hot-toast'

const AddImagesTrainingView: React.FC = () => {
  // Form State
  const closeModal = useCloseModal()
  const [files, setFiles] = useState<File[]>([]);
  const [preview, setPreview] = useState<any[]>([]);

  const handleFilesAdded = (newFiles: File[]) => {
    setFiles([...files, ...newFiles]);
    let results: any[] = []
    for (let i = 0; i < newFiles.length; i++){
      // Xem trước ảnh
      const reader = new FileReader();
      reader.onload = () => {
        const result = reader.result as string;
        setPreview((preview: any) => [...preview, result])
        results.push(result)
      };
      reader.readAsDataURL(newFiles[i]);
    }
  };

  const handleDeleteFile = (index: number) => {
    const fileArr = [...files]
    const previewArr = [...preview]
    fileArr.splice(index, 1);
    previewArr.splice(index, 1);
    setFiles(fileArr)
    // console.log("files:",fileArr);
    setPreview(previewArr)
  }

  const handleSubmit = async() =>{
    try {
      const userId = localStorage.getItem('userId') || ""
      const formData = new FormData();
      for (let i = 0; i < files.length; i++){
        formData.append('photos', files[i]);
      } 
      const result = await authApi.addImageTraining(userId,formData)
      console.log("result",result);
      
      if (result.status === 1){
        toast.success("Add image success!")
        closeModal()
      }else{
        //@ts-ignore
        throw new Error(result.message)
      }
    } catch (error: any) {
      toast.error(error.message)
    }
  }

  const renderUI = useMemo(()=>{
    return (
      <>
        {files.map((file,index) => (
          <div className='flex mt-[20px] items-center justify-between	' key={file.name}>
            <div className='flex items-center'>
              <img src={preview[index]} alt="Preview" className='w-[70px] h-[100px] mr-4'/>
              <div key={file.name} className='flex '>{file.name}</div>
            </div>
            <Button 
              danger
              type='primary'
              size="small"
              onClick={()=>{
                handleDeleteFile(index)
              }}
            >
              Delete
            </Button>
          </div>
        ))}
      </>
    )
  },[files,preview])

  return (
    <div>
      <span>Select images for training</span>
        <MultiFileUpload onFilesAdded={handleFilesAdded} />
      <div>
        {
          renderUI
        }
      </div>
      <div className='flex items-center justify-center mt-[20px]'>
        <Button 
          type='default'
          size="middle"
          onClick={handleSubmit}
        >
          Submit
        </Button>
      </div>
    </div>
  )
}

export default AddImagesTrainingView
