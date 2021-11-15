export interface ApiResponse<T> {
  statusCode: number;
  data?: T;
  error?: string;
  message?: string;
}
