export const LOCAL_STORAGE_KEY = {
  // UPDATE
  UPDATE_PRODUCT_ID: 'UPDATE_PRODUCT_ID',
  UPDATE_PRODUCT_NAME: 'UPDATE_PRODUCT_NAME',
  UPDATE_PRODUCT_GRADE: 'UPDATE_PRODUCT_GRADE',
  UPDATE_PRODUCT_MFI: 'UPDATE_PRODUCT_MFI',
  UPDATE_PRODUCT_PRODUCER_NAME: 'UPDATE_PRODUCT_PRODUCER_NAME',
  UPDATE_PRODUCT_BRAND: 'UPDATE_PRODUCT_BRAND',
  UPDATE_PRODUCT_LOADING: 'UPDATE_PRODUCT_LOADING',
  UPDATE_PRODUCT_PACKING: 'UPDATE_PRODUCT_PACKING',
  UPDATE_PRODUCT_DESC: 'UPDATE_PRODUCT_DESC',
  UPDATE_PRODUCT_PRICE: 'UPDATE_PRODUCT_PRICE',
  UPDATE_PRODUCT_PRODUCT_GROUP: 'UPDATE_PRODUCT_PRODUCT_GROUP',
  UPDATE_PRODUCT_SUB_GROUP: 'UPDATE_PRODUCT_SUB_GROUP',
  UPDATE_BATCH_VIEW: 'UPDATE_BATCH_VIEW',
  UPDATE_CONSIGNEE_ID: 'UPDATE_CONSIGNEE_ID',
  UPDATE_CONSIGNEE_NAME: 'UPDATE_CONSIGNEE_NAME',
  UPDATE_CONSIGNEE_NOTIFY: 'UPDATE_CONSIGNEE_NOTIFY',
  UPDATE_CONSIGNEE_SHIPPING_ADDRESS: 'UPDATE_CONSIGNEE_SHIPPING_ADDRESS',
  UPDATE_CONSIGNEE_PARTIAL_SHIPMENT: 'UPDATE_CONSIGNEE_PARTIAL_SHIPMENT',
  UPDATE_CONSIGNEE_TRANSHIPMENT: 'UPDATE_CONSIGNEE_TRANSHIPMENT',
  UPDATE_USER_ID: 'UPDATE_USER_ID',
  UPDATE_USER_PHONE: 'UPDATE_USER_PHONE',
  UPDATE_USER_EMAIL: 'UPDATE_USER_EMAIL',
  // DELETE
  DELETE_PRODUCT_ID: 'DELETE_PRODUCT_ID',
  DELETE_BATCH_VIEW: 'DELETE_BATCH_VIEW',
  DELETE_CONSIGNEE_ID: 'DELETE_CONSIGNEE_ID',
  DELETE_USER_ID: 'DELETE_USER_ID',
  DELETE_NOTIFICATION_ID: 'DELETE_NOTIFICATION_ID',
  // EDIT
  EDIT_PRODUCT_DATA: 'EDIT_PRODUCT_DATA',
  CHANGE_PWD_USER_ID: 'CHANGE_PWD_USER_ID',
  // CREATE
  PRODUCT_ID_CREATED: 'PRODUCT_ID_CREATED',
  // DETAIL
  DETAIL_BATCH_NAME: 'DETAIL_BATCH_NAME',
  DETAIL_BATCH_QTY_AVAIABLE: 'DETAIL_BATCH_QTY_AVAIABLE',
  DETAIL_BATCH_SHIPMENT_PERIOD: 'DETAIL_BATCH_SHIPMENT_PERIOD',
  DETAIL_BATCH_VALIDITY_FROM: 'DETAIL_BATCH_VALIDITY_FROM',
  DETAIL_BATCH_VALIDITY_TO: 'DETAIL_BATCH_VALIDITY_TO',
  DETAIL_CONSIGNEE_NAME: 'DETAIL_CONSIGNEE_NAME',
  DETAIL_CONSIGNEE_NOTIFY: 'DETAIL_CONSIGNEE_NOTIFY',
  DETAIL_CONSIGNEE_SHIPPING_ADDRESS: 'DETAIL_CONSIGNEE_SHIPPING_ADDRESS',
  DETAIL_CONSIGNEE_PARTIAL_SHIPMENT: 'DETAIL_CONSIGNEE_PARTIAL_SHIPMENT',
  DETAIL_CONSIGNEE_TRANSHIPMENT: 'DETAIL_CONSIGNEE_TRANSHIPMENT',
  DETAIL_USER_FIRST_NAME: 'DETAIL_USER_FIRST_NAME',
  DETAIL_USER_LAST_NAME: 'DETAIL_USER_LAST_NAME',
  DETAIL_USER_PHONE: 'DETAIL_USER_PHONE',
  DETAIL_USER_EMAIL: 'DETAIL_USER_EMAIL',
  DETAIL_NOTIFY_TITLE: 'DETAIL_NOTIFY_TITLE',
  DETAIL_NOTIFY_BODY: 'DETAIL_NOTIFY_BODY',
}

export const MODAL_VIEW = {
  DELETE_PRODUCT_VIEW: 'DELETE_PRODUCT_VIEW',
  DELETE_BATCH_VIEW: 'DELETE_BATCH_VIEW',
  ADD_BATCH_VIEW: 'ADD_BATCH_VIEW',
  DETAIL_BATCH_VIEW: 'DETAIL_BATCH_VIEW',
  UPDATE_BATCH_VIEW: 'UPDATE_BATCH_VIEW',
  ADD_CONSIGNEE_VIEW: 'ADD_CONSIGNEE_VIEW',
  DETAIL_CONSIGNEE_VIEW: 'DETAIL_CONSIGNEE_VIEW',
  UPDATE_CONSIGNEE_VIEW: 'UPDATE_CONSIGNEE_VIEW',
  DELETE_CONSIGNEE_VIEW: 'DELETE_CONSIGNEE_VIEW',
  DELETE_USER_VIEW: 'DELETE_USER_VIEW',
  ADMIN_CHANGE_PASSWORD_VIEW: 'ADMIN_CHANGE_PASSWORD_VIEW',
  DETAIL_USER_VIEW: 'DETAIL_USER_VIEW',
  UPDATE_USER_VIEW: 'UPDATE_USER_VIEW',
  DETAIL_NOTIFICATION_VIEW: 'DETAIL_NOTIFICATION_VIEW',
}

export const OPERATORS = {
  OR: 'OR',
  AND: 'AND'
}

export const SORT = {
  DESC: 'DESC',
  ASC: 'ASC',
}

export const MONTH = {
  JAN: 'Jan',
  FEB: 'Feb',
  MAR: 'Mar',
  APR: 'Apr',
  MAY: 'May',
  JUN: 'Jun',
  JUL: 'Jul',
  AUG: 'Aug',
  SEP: 'Sep',
  OCT: 'Oct',
  NOV: 'Nov',
  DEV: 'Dec',
}

export const ORDER_TYPE = {
  SELL: 'SELL',
  BUY: 'BUY',
}

export const ORDER_STATE = {
  ALL: 'All',
}

export const KEYBOARD_EVENT = {
  ENTER: 'Enter',
}

export const passwordRegExp = /^(?=.*[A-Z])(?=.*[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]).+$/
export const emailRegExp = /^[a-z0-9\.]+@[a-z0-9\.]+\.[a-z0-9\.]+$/
export const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/
