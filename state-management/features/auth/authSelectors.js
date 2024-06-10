export const selectAuthUser = (state) =>state.auth?.user;
export const selectAuthError = (state) => state.auth.error;
export const selectIsAuth = (state) => state.auth?.isAuth; 
export const selectAuthDetailsLoading = (state) => state.auth.loading; 
export const selectOtpConfirm = (state) => state.auth.otp_confirm; 
export const selectUserForm = (state) => state.auth.userForm; 
