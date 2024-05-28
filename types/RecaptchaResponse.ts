// Interface for the common structure of all responses
interface BaseResponse {
  message: string;
  success: boolean;
}

// Interface for the response when reCAPTCHA verification is successful
interface SuccessResponse extends BaseResponse {
  success: true;
}

// Interface for the response when reCAPTCHA verification fails
interface VerificationFailureResponse extends BaseResponse {
  success: false;
  errors?: string[];
}

// Interface for the response when there is a server error
interface ServerErrorResponse extends BaseResponse {
  success: false;
  errors: string[];
}

// Union type of all possible responses
type RecaptchaResponse =
  | SuccessResponse
  | VerificationFailureResponse
  | ServerErrorResponse;

export type {
  BaseResponse,
  SuccessResponse,
  VerificationFailureResponse,
  ServerErrorResponse,
  RecaptchaResponse,
};
