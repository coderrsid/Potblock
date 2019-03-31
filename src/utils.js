import { submitPhoneNumber, submitVerificationCode } from "./API";

const sanitizePhoneNumber = rawInput => {
  return rawInput.replace(/[^0-9]/g, "");
};

// currently only checks US/CA numbers
export const validatePhoneNumber = rawInput => {
  const num = sanitizePhoneNumber(rawInput);
  return num.length === 10;
};

export const validateVerificationCode = code => {
  return code.replace(/[^0-9]/g, "").length === 4;
};

// Request Utils
export function requestVerificationStart(phone, countryCode, onSuccess) {
  submitPhoneNumber(phone, countryCode).then(res => {
    if (res.status === 200) {
      console.log("SMS Sent!");
      onSuccess();
    } else {
      res
        .json()
        .then(err =>
          alert(`Error ${res.status}: ${res.statusText} \n\n${err.reason}`)
        );
    }
  });
}

export function requestVerifyCode(code, phone, countryCode, onSuccess) {
  submitVerificationCode(code, phone, countryCode).then(res => {
    if (res.status === 200) {
      console.log("Phone Verified!");
      onSuccess();
    } else {
      res
        .json()
        .then(err =>
          alert(
            `Error ${res.status}: ${res.statusText} \n\n[Code ${err.error_code}] ${err.message}`
          )
        );
    }
  });
}
