import { useMemo } from 'react'
import { useCloseModal } from '@/hooks/application.hooks'
import {useSelector} from 'react-redux'
import dayjs from 'dayjs'
import {Table} from 'antd'

const WorkingView: React.FC = () => {
  const closeModal = useCloseModal()
  const { attendances } = useSelector((state: any) => state.working)
  console.log(attendances);
  const onBtnClickHandler = useMemo(
    () => ({
      cancel: closeModal,
    }),
    []
  )

  const renderAttendances = useMemo(()=>{
    const data = []
    for ( let i = 0 ;i < attendances.length ; i++ ){
      let result = {
        checkIn: '',
        checkOut: '',
      }
      if (attendances[i].type === 1){
        result.checkIn = dayjs(attendances[i].createdAt).format('HH:mm:ss')
        if (i+1 != attendances.length){
          result.checkOut = dayjs(attendances[i+1].createdAt).format('HH:mm:ss')
        }else {
          result.checkOut= "Not checkout yet"
        }
        data.push(result)
      }
    }
    return (
      <Table 
        dataSource={data} 
        pagination={false}
        columns={[
          {
            title: 'Check In',
            dataIndex: 'checkIn',
            width:'40%',
            key: 'checkIn',
          },
          {
            title: 'Check out',
            dataIndex: 'checkOut',
            key: 'checkOut',
          },
        ]} 
      />
    )
  },[attendances])

  return (
    <div>
      {renderAttendances}
    </div>
  )
}

export default WorkingView
