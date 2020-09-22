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
    // app error messages
    notFound: 'Not found',
    serverError: 'Internal server error',
    // validator error messages
    invalidParameters: 'Invalid parameters',
    authHeaderRequired: 'Authorization header required',
    skipParameterRequired: 'skip parameter required',
    limitParameterRequired: 'limit parameter required',
    permissionNameRequired: 'Permission name required',
    invalidPermissionName: 'Invalid permission name',
    permissionDescriptionRequired: 'Permission description required',
    permissionDescriptionShort: 'Permission description too short',
    roleNameRequired: 'Role name required',
    invalidRoleName: 'Invalid role name',
    roleDescriptionRequired: 'Role description required',
    roleDescriptionShort: 'Role description too short',
    rolePermissionRequired: 'Role permissions required',
    rolePermissionEmpty: 'Role permissions empty',
    userNameRequired: 'User name required',
    invalidUserName: 'Invalid user name',
    userPhoneNumberRequired: 'User phone number required',
    invalidPhoneNumber: 'Invalid phone number',
    serviceUserIDRequired: 'Service user ID required',
    invalidServiceUserID: 'Invalid service user ID',
    userRoleRequired: 'User roles required',
    userRoleEmpty: 'User roles empty',
    // controller error messages
    permissionAlreadyExists: 'Permission already exists',
    permissionNotExists: 'Permission not exists',
    roleAlreadyExists: 'Role already exists',
    roleNotExists: 'Role not exists',
    userAlreadyExistsName: 'User already exists with that name',
    userAlreadyExistsNo: 'User already exists with that phone-number',
    userAlreadyExistsID: 'User already exists with that id',
    userNotExist: 'User not exist',
    phoneNumberNotLoggedIn: 'Phone number not logged in',
    phoneNumberLoggedIn: 'Phone number already logged in',
    invalidExpiredOtp: 'OTP is expired or invalid',
    otpResendFailed: 'OTP resend request failed'
};
