import MultiFileUpload from '@/components/molecules/MultiFileUpload/MultiFileUpload';
import { Button } from 'antd';
import { useEffect, useMemo, useState } from 'react';

const AddImagesView: React.FC<any> = ({
    formData,
    onChangeMultiFile,
    component
}) => {
  // Form State
  const [files, setFiles] = useState<(File | any)[]>([]);
  const [preview, setPreview] = useState<any>({});

  const handleFilesAdded = (newFiles: File[]) => {
    // setFiles([...files, ...newFiles]);
    onChangeMultiFile(component,[...files, ...newFiles]);
    // let results: any[] = []
    // for (let i = 0; i < newFiles.length; i++){
    //   // Xem trước ảnh
    //   const reader = new FileReader();
    //   reader.onload = () => {
    //     const result = reader.result as string;
        
    //     setPreview((preview: any) => [...preview, result])
    //     results.push(result)
    //   };
    //   reader.readAsDataURL(newFiles[i]);
    // }
  };

  const handleDeleteFile = (index: number) => {
    const fileArr = [...files]
    // const previewArr = [...preview]
    fileArr.splice(index, 1);
    // previewArr.splice(index, 1);
    // setFiles(fileArr)
    
    onChangeMultiFile(component,fileArr);
    // console.log("files:",fileArr);
    // setPreview(previewArr)
  }
  useEffect(()=> {
      let results: any[] = []
      for (let i = 0; i < formData?.[component.name]?.length; i++){
        // Xem trước ảnh
        if(typeof formData?.[component.name][i] === "string") {
          setPreview((preview: any) => ({...preview, [formData?.[component.name][i]]: formData?.[component.name][i]}))
        } else {
          const reader = new FileReader();
          reader.onload = () => {
            const result = reader.result as string;
            
            setPreview((preview: any) => ({...preview, [formData?.[component.name][i].name]:result}))
            results.push(result)
          };
          reader.readAsDataURL(formData?.[component.name][i]);
        }
      }
      setFiles(formData?.[component.name] ?? [])
  },[formData,component ])
  console.log(files);
  
  const renderUI = useMemo(()=>{
    return (
      <>
        {files?.map((file,index) => (
          <div className='flex mt-[20px] items-center justify-between	' key={index}>
            <div className='flex items-center'>
              <img src={preview?.[file] ?? preview?.[file?.name]} alt="Preview" className='w-[70px] h-[100px] mr-4'/>
              <div key={index} className='flex '>{file?.name ?? `image ${index}`}</div>
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
      <span>Select images for Product</span>
        <MultiFileUpload onFilesAdded={handleFilesAdded} />
      <div>
        {
          renderUI
        }
      </div>
    </div>
  )
}

export default AddImagesView
