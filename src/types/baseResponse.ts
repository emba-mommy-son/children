export interface BaseResponse<T> {
  success: boolean;
  status: number;
  message: string;
  data: T;
  errors?: ErrorResponse[];
}

export interface ErrorResponse {
  field: string;
  code: string;
  message: string;
  objectName: string;
}

export interface BaseErrorResponse {
  success: boolean;
  status: number;
  message: string;
  errors: ErrorResponse[];
}
