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
    notFound: 'Not found',
    serverError: 'Internal server error',
    invalidParameters: 'Invalid parameters',
    uploadError: 'Error occured while uploading file',
    authHeaderRequired: 'Authorization header required',
    serviceNameRequired: 'Service name required',
    invalidService: 'Invalid service name',
    permissionAlreadyExists: 'Permission already exists',
    permissionNotExist: 'Permission not exists',
    roleAlreadyExists: 'Role already exists',
    roleNotExist: 'Role not exists',
    userAlreadyExistsName: 'User already exists with that name',
    userAlreadyExistsNo: 'User already exists with that phone-number',
    userAlreadyExistsID: 'User already exists with that id',
    userNotExist: 'User not exist'
};
