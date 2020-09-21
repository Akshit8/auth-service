export const statusCode: { [index: string]: number } = {
    ok: 200,
    created: 201,
    badRequest: 400,
    unauthorized: 401,
    forbidden: 403,
    notFound: 404,
    serverError: 500
};

export const message: { [index: string]: string } = {
    // app error message
    notFound: 'Not found',
    serverError: 'Internal server error',
    // validator error message
    invalidParameters: 'Invalid parameters',
    authHeaderRequired: 'Authorization header required',
    permissionNameRequired: 'Permission name required',
    permissionDescriptionRequired: 'Permission description required',
    permissionDescriptionShort: 'Permission description too short',
    skipParameterRequired: 'skip parameter required',
    limitParameterRequired: 'limit parameter required',
    // controller errors
    permissionAlreadyExists: 'Permission already exists',
    permissionNotExists: 'Permission not exists',
    roleAlreadyExists: 'Role already exists',
    roleNotExist: 'Role not exists',
    userAlreadyExistsName: 'User already exists with that name',
    userAlreadyExistsNo: 'User already exists with that phone-number',
    userAlreadyExistsID: 'User already exists with that id',
    userNotExist: 'User not exist',
    phoneNumberNotLoggedIn: 'Phone number not logged in',
    phoneNumberLoggedIn: 'Phone number already logged in',
    invalidExpiredOtp: 'OTP is expired or invalid',
    otpResendFailed: 'OTP resend request failed'
};
