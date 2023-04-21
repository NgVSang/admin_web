import React, { FC, useMemo } from 'react'
import { FileUploadProps } from './FileUpload.types'
// import Plus from '@public/assets/plus.svg'
import style from './FileUpload.module.css'
import _ from 'lodash'
import { FormHelperText } from '@mui/material'

const FileUpload: FC<FileUploadProps> = ({
  component,
  onChangeFile,
  onDeleteFile,
  formData,
  register,
  isError,
  errMsg,
}) => {
  const fileName = useMemo(() => {
    let name = 'file name error'
    if (_.isArray(formData?.[component.name])) {
      name =
        formData?.[component.name]?.[0]?.name ||
        formData?.[component.name]?.[0]?.label ||
        formData?.[component.name]?.[0]?.preview
    } else {
      name =
        formData?.[component.name]?.name ||
        formData?.[component.name]?.label ||
        formData?.[component.name]?.preview
    }
    return name
  }, [formData?.[component.name]])

  // const previewUrl = useMemo(() => {
  //   let url = ''
  //   if (_.isArray(formData?.[component.name])) {
  //     url = formData?.[component.name]?.[0]?.preview
  //   } else {
  //     url = formData?.[component.name]?.preview
  //   }
  //   return url
  // }, [formData?.[component.name]])

  const value = useMemo(() => {
    if (_.isArray(formData?.[component.name])) {
      return formData?.[component.name].length
        ? formData?.[component.name][0]
        : undefined
    } else {
      return formData?.[component.name]
    }
  }, [formData?.[component.name]])

  return (
    <div className={style.wrapper}>
      <div className={style.fileWrapper}>
        <label htmlFor={component.name} className={style.fileIcon}>
          {/* <Plus /> */}
          +
        </label>
        <input
          type="file"
          id={component.name}
          className={style.fileInput}
          accept={component.accept}
          {...register}
          onChange={onChangeFile}
        />
        <div className={style.fileTitle}>
          <label htmlFor={component.name} className={style.fileTitleStyled}>
            {component.label}
          </label>
        </div>
      </div>
      <div>{component.description}</div>
      {isError && (
        <FormHelperText error>
          {component?.fieldName} is required
        </FormHelperText>
      )}
      {!!value && (
        <div
          className={
            component.isFullWidth === false
              ? 'absolute '
              : '' + style.contentWrapper
          }
        >
          <div className={style.buttonWrapper}>
            <div className="flex items-center gap-2">
              {/* <img className={style.preview} src={previewUrl} /> */}
              <div>{fileName}</div>
            </div>
            <button
              type="button"
              className={style.button}
              onClick={onDeleteFile}
            >
              Delete
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

export default FileUpload
