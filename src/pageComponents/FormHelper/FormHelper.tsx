import { FormComponent } from "@/types/form";
import { yupResolver } from "@hookform/resolvers/yup";
import React, {
  ChangeEvent,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { FormHelperProps, IFormData, IParam } from "./FormHelper.types";
// import { FormHelperStyled } from './FormHelper.styled'
import { Button } from "@/components/atoms/Button";
import {
  Autocomplete,
  Checkbox,
  FormControlLabel,
  TextField,
} from "@mui/material";
import FormHelperStyled from "./FormHelper.module.css";
// import ValidateErrorIcon from '@public/assets/validate.svg'
import _ from "lodash";
// import 'react-phone-input-2/lib/bootstrap.css'
import { CustomSelect } from "@/components/molecules/CustomSelect";
import { FileUpload } from "@/components/molecules/FileUpload";
import { groupItem } from "@/utils/splitArr";
import { Select, Tag } from "antd";

const FormHelper: React.FC<FormHelperProps> = ({
  formStructure,
  onSubmit,
  customStyle,
  localStorageName,
  onBtnClick,
  onChangeHandler,
  validationFalseMsg,
  isMultipleFile,
  initValues,
  formDirection = "vertical",
  onAddFile,
  onRemoveFile,
  errorText,
}) => {
  const jsonData = initValues;
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [formData, setFormData] = useState<IFormData>({});

  useEffect(() => {
    const res =
      typeof jsonData === "object"
        ? formStructure.components.reduce((data, component) => {
            let componentData = null;
            if (Array.isArray(_.get(jsonData, component.name))) {
              componentData = _.get(jsonData, component.name).map(
                (item: any) => ({
                  value: item.id,
                  label: item.name,
                })
              );
            } else if (component.type === "file") {
              componentData = _.get(jsonData, component.name);
            } else if (typeof _.get(jsonData, component.name) === "object") {
              componentData = (_.get(jsonData, component.name) as any)?.id;
            } else {
              componentData = _.get(jsonData, component.name);
            }

            let res = {
              ...data,
              [component.name]: componentData,
            };

            if (!!component.subName) {
              res = {
                ...res,
                [component.subName]: _.get(jsonData, component.subName),
              };
            }

            return res;
          }, {})
        : {};

    setFormData({ ...formData, ...res });
  }, [jsonData]);

  const checkboxItems = formStructure.components.filter(
    (component) => component.type === "switch"
  );

  useEffect(() => {
    checkboxItems.forEach((item) => {
      const value = jsonData?.[item.name] ?? false;
      setFormData((formData) => ({ ...formData, [item.name]: value }));
    });
  }, []);

  const validationSchema = useMemo(
    () =>
      formStructure.components.reduce(
        (schema, component) => ({
          ...schema,
          [component.name]: component.validation,
        }),
        {}
      ),
    []
  );

  const yupValidationSchema = useMemo(() => yup.object(validationSchema), []);

  const {
    watch,
    handleSubmit,
    formState: { errors },
    register,
    setValue,
    getValues,
    clearErrors,
    reset,
    control,
  } = useForm({
    mode: "onBlur",
    defaultValues: formData,
    shouldUnregister: true,
    resolver: yupResolver(yupValidationSchema),
  });

  useEffect(() => {
    if (formData) {
      reset(formData);
    }
  }, [formData]);

  const onFileUploadChange = async (
    component: FormComponent,
    e: ChangeEvent<HTMLInputElement>
  ) => {
    const { target } = e;
    try {
      const file = target.files?.[0] || null;
      setValue(component.name, file);
    } catch (e) {}
  };

  const updateFormData = useCallback((param: IParam) => {
    setFormData((formData: IFormData) => ({
      ...formData,
      [param.key]: param.value,
    }));
  }, []);

  const onSubmitHandler = useCallback(async () => {
    const data = {};

    for (const key in formData) {
      if (key.includes("-")) {
        const [parent, child] = key.split("-");
        // @ts-ignore
        data[parent] = {
          // @ts-ignore
          ...data[parent],
          [child]: formData[key],
        };
      } else {
        // @ts-ignore
        data[key] = formData[key];
      }
    }

    if (onSubmit) {
      try {
        setIsLoading(true);
        await onSubmit(data);
        setIsLoading(false);
      } finally {
        setIsLoading(false);
      }
    }
  }, [formData, onSubmit]);

  useEffect(() => {
    const subscription = watch((value, { name, type }) => {
      let _value = value?.[name as string];

      if (name?.includes(".")) {
        const [parent, child] = name.split(".");
        // @ts-ignore
        _value = value?.[parent]?.[child];
      }

      const param = {
        key: name,
        value: _value,
      };
      updateFormData(param as IParam);
    });
    return () => subscription.unsubscribe();
  }, [watch, formData]);

  const renderForm = useCallback(
    (components: FormComponent[]) => {
      const arr = [];
      for (let i = 0; i < components.length; ++i) {
        let j = i + 1;
        while (
          j < components.length &&
          components[i].isFullWidth === components[j].isFullWidth
        ) {
          j++;
        }
        arr.push(components.slice(i, j));
        i = j - 1;
      }

      return arr.map((item: FormComponent[], index: number) => {
        const isFullWidth = item[0].isFullWidth;

        if (isFullWidth) {
          return (
            <div className={FormHelperStyled.fullWidthComponent} key={index}>
              {renderFormComponent(item)}
            </div>
          );
        }

        return (
          <div className={FormHelperStyled.halfWidthComponent} key={index}>
            {renderFormComponent(item)}
          </div>
        );
      });
    },
    [errors, formData, control, formStructure.components]
  );

  const onCheckboxCheckedHandler = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setValue(e.target.name, e.target.checked);
    },
    []
  );

  const onRemoveFileHandler = useCallback(
    (fileName: string) => {
      const file = (formData?.[fileName] as FileList)[0];
      if (onRemoveFile) {
        onRemoveFile(file);
      }
      setValue(fileName, null);
    },
    [formData]
  );

  const renderTitle = useCallback((component: FormComponent) => {
    const titleStyle = {
      fontSize: "1.5rem",
      fontWeight: 700,
    };

    const subTitle = component?.subTitle;

    return (
      <div
        className={`w-full flex flex-row ${
          !!subTitle ? "justify-between" : "justify-center"
        }`}
      >
        <div
          className={FormHelperStyled.header}
          style={!!subTitle ? titleStyle : {}}
        >
          {component?.label}
        </div>
        {!!subTitle ? (
          <button
            type="button"
            className="text-blue100 h-auto text-sm self-auto text-left font-normal leading-[150%] underline p-0"
            style={{ textDecorationLine: "underline" }}
            onClick={subTitle?.onClick}
          >
            {subTitle.label}
          </button>
        ) : (
          <></>
        )}
      </div>
    );
  }, []);

  const renderFormComponent = useCallback(
    (components: FormComponent[], direction?: "horizontal" | "vertical") => {
      return components.map((component: FormComponent) => {
        let isError = false;
        let errMsg = "";
        if (component.name.includes("-")) {
          const [parent, child] = component.name.split("-");
          // @ts-ignore
          isError = !!errors?.[parent]?.[child];
          if (isError) {
            // @ts-ignore
            errMsg = errors?.[parent]?.[child].message;
          }
        } else {
          isError = !!errors?.[component.name];
          if (isError) {
            errMsg = errors?.[component.name]?.message?.toString() || "";
          }
        }

        let ratio;
        if (direction === "horizontal") {
          ratio = component?.ratio ?? 1;
        }

        switch (component.type) {
          case "dropdown-multi":
            return (
              <>
                <label>{component.label}</label>
                <Select
                  mode="multiple"
                  tagRender={(props) => {
                    const { label, value, closable, onClose } = props;
                    const onPreventMouseDown = (
                      event: React.MouseEvent<HTMLSpanElement>
                    ) => {
                      event.preventDefault();
                      event.stopPropagation();
                    };
                    return (
                      <Tag
                        color={value}
                        onMouseDown={onPreventMouseDown}
                        closable={closable}
                        onClose={onClose}
                        style={{
                          marginRight: 3,
                          display: "flex",
                          alignItems: "center",
                          minHeight: 32,
                          fontSize: 14,
                        }}
                      >
                        {label}
                      </Tag>
                    );
                  }}
                  labelInValue
                  value={formData?.[component.name]}
                  style={{ width: "100%" }}
                  onChange={(value) => {
                    setValue(component.name, value);
                  }}
                  options={component.options || []}
                />
              </>
            );
          case "number":
            return (
              <TextField
                label={component.label}
                variant="outlined"
                type="number"
                placeholder={component.placeholder}
                error={!!errors?.[component.name]}
                helperText={errors?.[component.name]?.message?.toString()}
                InputProps={{
                  endAdornment: !!errors?.[component.name] ? (
                    // <ValidateErrorIcon />
                    <div>!</div>
                  ) : (
                    <></>
                  ),
                }}
                className="text-black"
                value={formData?.[component.name]}
                disabled={component.disabled}
                {...register(component.name)}
              />
            );
          case "datePicker":
            return (
              <TextField
                label={component.label}
                variant="outlined"
                type="date"
                placeholder={component.placeholder}
                InputLabelProps={{ shrink: true }}
                error={!!errors?.[component.name]}
                helperText={errors?.[component.name]?.message?.toString()}
                value={formData?.[component.name]}
                disabled={component.disabled}
                {...register(component.name)}
              />
            );
          case "submit":
            return (
              <Button
                variant="slim"
                type="submit"
                className="w-100"
                disabled={isLoading}
              >
                {component.label}
              </Button>
            );
          case "button":
            return (
              <Button
                variant="slim"
                primary={component.primary}
                type="button"
                onClick={() => {
                  onBtnClick?.[component.name](formData as any);
                }}
                name={component.name}
                disabled={component.disabled}
                style={{
                  background: "transparent",
                  border:
                    component.outline !== false ? "1px solid #111827" : "",
                  color: "#111827",
                  paddingLeft: direction === "horizontal" ? 0 : "",
                  paddingRight: direction === "horizontal" ? 0 : "",
                  flex: ratio,
                }}
              >
                {component.label}
              </Button>
            );
          case "textarea":
            return (
              <TextField
                multiline
                rows={4}
                maxRows={4}
                label={component.label}
                variant="outlined"
                type="text"
                placeholder={component.placeholder}
                error={!!errors?.[component.name]}
                helperText={errors?.[component.name]?.message?.toString()}
                InputLabelProps={{
                  shrink: !!formData?.[component.name],
                }}
                InputProps={{
                  endAdornment: !!errors?.[component.name] ? (
                    // <ValidateErrorIcon />
                    <div>!</div>
                  ) : (
                    <></>
                  ),
                }}
                className="text-black"
                value={formData?.[component.name]}
                disabled={component.disabled}
                {...register(component.name)}
              />
            );
          case "checkbox":
            return (
              <FormControlLabel
                control={
                  <Checkbox
                    onChange={onCheckboxCheckedHandler}
                    checked={!!formData?.[component.name]}
                  />
                }
                disabled={component.disabled}
                label={component.label}
                value={!!formData?.[component.name]}
                {...register(component.name)}
              />
            );
          case "space":
            return <div className="flex-1"></div>;
          case "title":
            return (
              <div className={FormHelperStyled.titleForm}>
                {component.label}
              </div>
            );
          case "file":
            return (
              <FileUpload
                component={component}
                formData={formData}
                onChangeFile={onFileUploadChange.bind(null, component)}
                onDeleteFile={onRemoveFileHandler.bind(null, component.name)}
                register={register(component.name)}
                isError={isError}
                errMsg={errMsg}
              />
            );
          case "multi-file":
            return (
              <FileUpload
                component={component}
                formData={formData}
                onChangeFile={onFileUploadChange.bind(null, component)}
                onDeleteFile={onRemoveFileHandler.bind(null, component.name)}
                register={register(component.name)}
                isError={isError}
                errMsg={errMsg}
              />
            );
          case "autocomplete":
            return (
              <Autocomplete
                disablePortal
                style={{
                  padding: 0,
                }}
                filterOptions={(options, { inputValue }) =>
                  options.filter((option) =>
                    (option.label as string)
                      .toLowerCase()
                      .includes(inputValue.toLowerCase())
                  )
                }
                options={component.options!}
                getOptionLabel={(option) => option.label as string}
                renderOption={(props, option: any) => {
                  return (
                    // @ts-ignore
                    <div
                      key={option.value}
                      style={{ display: "flex" }}
                      {...props}
                    >
                      {!!component?.renderIcon ? (
                        component?.renderIcon(option.code)
                      ) : (
                        <></>
                      )}
                      <span>{option.label}</span>
                    </div>
                  );
                }}
                value={component.options!.find(
                  (option) => option.value === formData?.[component.name]
                )}
                autoHighlight={true}
                onChange={(e, option) => {
                  component.onChange(e);
                  setValue(component.name, option?.value);
                }}
                renderInput={(params) => {
                  const option = component.options!.find(
                    (option) => option.value === formData?.[component.name]
                  );
                  return (
                    <TextField
                      {...params}
                      label={component.label}
                      error={isError}
                      helperText={errMsg}
                      InputProps={{
                        ...params.InputProps,
                        startAdornment:
                          !!component.renderIcon && !!option ? (
                            // @ts-ignore
                            component.renderIcon(option.code)
                          ) : (
                            <></>
                          ),
                      }}
                      InputLabelProps={{ shrink: !!formData?.[component.name] }}
                      {...register(component.name)}
                      value={option?.label}
                      inputProps={{
                        ...params.inputProps,
                        value: option?.label,
                        onChange: (e: React.ChangeEvent<HTMLInputElement>) => {
                          const { onChange } = params.inputProps;
                          component.onChange(e);
                          if (onChange) {
                            onChange(e!);
                          }
                        },
                      }}
                    />
                  );
                }}
              />
            );
          case "description":
            return (
              <div
                className="text-dark60 h-auto text-xs self-auto text-left font-normal leading-[150%] no-underline"
                dangerouslySetInnerHTML={{ __html: component.label! }}
              ></div>
            );
          case "element":
            return <>{component.customComponent}</>;
          case "formTitle":
            return renderTitle(component);
          default:
            let _value = formData?.[component.name];

            if (typeof _value === "undefined" || _value === "undefined") {
              _value = "";
            }

            return (
              <TextField
                label={component.label}
                variant="outlined"
                type={component.type}
                placeholder={component.placeholder}
                InputLabelProps={{
                  shrink: !!formData?.[component.name],
                }}
                error={isError}
                helperText={isError ? errMsg : component?.description}
                InputProps={{
                  endAdornment: isError ? (
                    // <ValidateErrorIcon />
                    <div>!</div>
                  ) : (
                    <></>
                  ),
                }}
                sx={{
                  "& .MuiInputBase-input.Mui-disabled": {
                    WebkitTextFillColor: "#000000",
                  },
                  flex: ratio,
                }}
                className={
                  component.isFullWidth
                    ? FormHelperStyled.w_full
                    : FormHelperStyled.flex
                }
                value={_value}
                disabled={component.disabled}
                {...register(component.name, {
                  onChange: (e) => {
                    setValue(component.name, e.target.value);

                    onChangeHandler && onChangeHandler[component.name](e);
                  },
                })}
              />
            );
        }
      });
    },
    [errors, isLoading, formData, control, formStructure.components]
  );

  const renderGroupForm = useCallback(() => {
    if (formDirection === "horizontal") {
      return (
        <div
          className="flex gap-3 mx-[-16px]"
          style={{
            display: "flex",
            gap: "8px",
            margin: "-16px 0px",
          }}
        >
          {renderFormComponent(formStructure.components, "horizontal")}
        </div>
      );
    }

    const formGroup = groupItem(formStructure.components);

    return formGroup.map((group: FormComponent[], index: number) => {
      if (_.every(group, (obj) => _.has(obj, "group"))) {
        return (
          <div
            key={index}
            className="border-[1px] border-solid rounded-md p-6 my-4"
          >
            {renderForm(group)}
          </div>
        );
      } else {
        return renderForm(group);
      }
    });
  }, [errors, isLoading, formData, control, formStructure.components]);

  return (
    <form
      onSubmit={handleSubmit(onSubmitHandler)}
      className={FormHelperStyled.customForm}
    >
      {!!formStructure.title && (
        <div className={FormHelperStyled.header}>{formStructure.title}</div>
      )}
      {!!errorText && (
        <div className={FormHelperStyled.errorTextWrapper}>
          <span className={FormHelperStyled.errorText}>{errorText}</span>
        </div>
      )}
      {!!formStructure.description && (
        <div className={FormHelperStyled.description}>
          {formStructure.description}
        </div>
      )}
      <div className={FormHelperStyled.container}>{renderGroupForm()}</div>
    </form>
  );
};

export default FormHelper;
