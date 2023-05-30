import { useEffect } from 'react'
import { useCloseModal } from '@/hooks/application.hooks'
import * as authApi from '@/services/api/auth.api'
import toast from 'react-hot-toast'
import {
    LoadingOutlined
} from '@ant-design/icons';

const TrainingFaceView: React.FC = () => {
    // Form State
    const closeModal = useCloseModal()
    const userId = localStorage.getItem("userId")

    useEffect(()=>{
        authApi.trainingUser(userId || "")
        .then((response) => {
            // Xử lý dữ liệu trả về
            if (response.status === 1) {
                toast.success("Training Success!")
                closeModal()
            }else{
                //@ts-ignore
                throw new Error(response.message)
            }
        })
        .catch((error: any) => {
            toast.error(error.message)
            closeModal()
        });
    },[userId])
    
    return (
        <div className='items-center justify-center flex'>
            <LoadingOutlined 
                size={100}
                width={200}
                height={200}
            />
        </div>
    )
}

export default TrainingFaceView
