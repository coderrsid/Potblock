import { validatePhoneNumber } from "./utils";

describe("Phone Number Validation", () => {
  it("should allow numbers with parens and dashes", () => {
    expect(validatePhoneNumber("(416)-555-5555")).toEqual(true);
  });
  it("should allow a valid number without special characters", () => {
    expect(validatePhoneNumber("4165555555")).toEqual(true);
  });
  it("should disallow numbers that are too short", () => {
    expect(validatePhoneNumber("123")).toEqual(false);
  });
  it("should disallow numbers that are too long", () => {
    expect(validatePhoneNumber("99999999999999999")).toEqual(false);
  });
});
