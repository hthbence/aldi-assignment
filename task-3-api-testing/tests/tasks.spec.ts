import { test, expect } from '@playwright/test';
import { testTask, updatedTask } from '../test-data/test-data';
import { testConfig } from '../test-config/test-config';

test.describe('API Testing - Tasks', () => {

  test('POST /tasks - Create a new task', async ({ request }) => {
    const response = await request.post('/tasks', {
      data: testTask,
    });

    expect(response.status()).toBe(
      testConfig.expectedStatusCodes.create
    );

    const responseBody = await response.json();

    expect(responseBody).toHaveProperty('id');
    expect(responseBody.title).toBe(testTask.title);
    expect(responseBody.description).toBe(testTask.description);
    expect(responseBody.completed).toBe(testTask.completed);
  });


  test('GET /tasks/{id} - Retrieve a task by ID', async ({ request }) => {
    const response = await request.get(
      `/tasks/${testConfig.taskId}`
    );

    expect(response.status()).toBe(
      testConfig.expectedStatusCodes.get
    );

    const responseBody = await response.json();

    expect(responseBody.id).toBe(testConfig.taskId);
    expect(responseBody).toHaveProperty('title');
    expect(responseBody).toHaveProperty('description');
    expect(responseBody).toHaveProperty('completed');
  });


  test('PUT /tasks/{id} - Update a task', async ({ request }) => {
    const response = await request.put(
      `/tasks/${testConfig.taskId}`,
      {
        data: {
          ...updatedTask,
          id: testConfig.taskId,
        },
      }
    );

    expect(response.status()).toBe(
      testConfig.expectedStatusCodes.update
    );

    const responseBody = await response.json();

    expect(responseBody.id).toBe(testConfig.taskId);

    expect(responseBody.title).toBe(updatedTask.title);
    expect(responseBody.description).toBe(updatedTask.description);
    expect(responseBody.completed).toBe(updatedTask.completed);
  });


  test('DELETE /tasks/{id} - Delete a task', async ({ request }) => {
    const response = await request.delete(
      `/tasks/${testConfig.taskId}`
    );

    expect(response.status()).toBe(
      testConfig.expectedStatusCodes.delete
    );
  });

});


test.describe('API Testing - Negative Scenarios', () => {

  test('POST /tasks - Reject invalid task data', async ({ request }) => {
    const invalidTask = {
      description: 'Task without a title',
      completed: false,
    };

    const response = await request.post('/tasks', {
      data: invalidTask,
    });

    expect(response.status()).toBe(
      testConfig.expectedStatusCodes.badRequest
    );
  });


  test('GET /tasks/{id} - Return 404 for non-existent task', async ({ request }) => {
    const response = await request.get(
      `/tasks/${testConfig.nonExistentTaskId}`
    );

    expect(response.status()).toBe(
      testConfig.expectedStatusCodes.notFound
    );
  });


  test('PUT /tasks/{id} - Return 404 for non-existent task', async ({ request }) => {
    const response = await request.put(
      `/tasks/${testConfig.nonExistentTaskId}`,
      {
        data: updatedTask,
      }
    );

    expect(response.status()).toBe(
      testConfig.expectedStatusCodes.notFound
    );
  });


  test('DELETE /tasks/{id} - Return 404 for non-existent task', async ({ request }) => {
    const response = await request.delete(
      `/tasks/${testConfig.nonExistentTaskId}`
    );

    expect(response.status()).toBe(
      testConfig.expectedStatusCodes.notFound
    );
  });

});