export interface BaseResponse<T> {
  success: boolean;
  status: number;
  message: string;
  data: T;
}

export interface BaseErrorResponse {
  success: boolean;
  status: number;
  message: string;
  errors: ValidationError[];
}

export interface ValidationError {
  field: string;
  code: string;
  message: string;
  objectName: string;
}
