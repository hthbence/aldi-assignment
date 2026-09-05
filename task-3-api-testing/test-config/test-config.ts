export const testConfig = {
  taskId: 1,
  nonExistentTaskId: 999999,

  expectedStatusCodes: {
    create: 201,
    get: 200,
    update: 200,
    delete: 204,
    badRequest: 400,
    notFound: 404,
  },
};