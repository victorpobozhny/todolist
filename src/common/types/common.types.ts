export type FieldErrorType = {
  error: string;
  field: string;
};

//❗ Чтобы у нас не было пересечения имен наовем общий тип BaseResponseType
export type BaseResponseType<D = {}> = {
  resultCode: number;
  messages: string[];
  data: D;
  fieldsErrors: FieldErrorType[];
};

// export type ResponseType<D = {}> = {
//   resultCode: number;
//   messages: Array<string>;
//   data: D;
// };
