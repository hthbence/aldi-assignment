# Bonus Questions

## Docker

### What is Docker?

Docker packages everything that is needed to run an application into a container, allowing the application to run consistently on different machines, without the need for the exact same setup.

### Why is Docker useful for a QA Engineer?

#### 1. Consistent Test Environments

Test suites have specific dependencies. Running the same automated test suites accross different environments without Docker requires additional setup and manual configuration. If a test suite runs on Node Version 21 on a QA Engineer's machine, but runs on Node Version 22 on another QA Engineer's machine, that alone can introduce flaky tests and additional overhead as a result.

Docker solves this and similar issues by including the specific libraries, dependencies, environment variables, etc. needed to run the test suites consistently. This then results in faster development and execution cycles, and less flaky tests.

#### 2. Better CI/CD integration

A CI/CD pipeline can build a test image and execute the automated tests inside the container.

#### 3. Better Reproduceability

When investigating an issue (e.g.: a failed test), reproducing the problem on the same environment is particularly useful.

#### 4. Isolated services

Docker allows additional services (like databases, mock data libraries) to run in isolated containers without the need to install them on different machines directly.

### Example 1

For this example, my goal is to setup a Docker image containing everything required to execute a Playwright automated test suite.

#### Dockerfile

I would include a Dockerfile in the root folder.

```yaml
// taken from https://hub.docker.com/r/microsoft/playwright
FROM mcr.microsoft.com/playwright:v1.63.0-noble

// sets the working directory
WORKDIR /app

// copies the package files
COPY package*.json ./

// installs the dependencies defined in package*.json
RUN npm ci

// copies the entire project into the container
COPY . .

// when the container starts, this command will be executed
CMD ["npx", "playwright", "test"]
```

### Example 2

#### With CI/CD

1. The pipeline is triggered by a pull request, push or merge.

2. The repository is checked out.

3. The Docker containers are started.

4. The automated tests are run.

5. Results are reported.

6. We could also set up quality gates.

---

## JUnit + Selenium

For automating a Delete Task feature, I would use Selenium WebDriver to interact with the web application through the browser and JUnit to structure and perform the tests.

I would look for a page where tasks are managed, locate the Delete button and perform the deletion. Then I would verify that the task is successfully deleted.

### Project Structure

I would use a Page Object Model structure so that the test logic is separated from the Selenium locators and page interactions.

#### TasksPage

```
src/test/pages/TasksPage.java
```

```java
package pages;
import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;

public class TasksPage {
    private final WebDriver driver;

    private final By deleteButton =
        By.cssSelector("DELETE_BUTTON_SELECTOR");

    private final By task =
        By.cssSelector("TASK_SELECTOR");

    public TasksPage(WebDriver driver) {
        this.driver = driver;}

    public void open() {
        String applicationUrl = System.getenv("APPLICATION_URL");
        driver.get(applicationUrl);}

    public void deleteTask() {
        driver.findElement(deleteButton).click();}

    public boolean isTaskDisplayed() {
        return !driver.findElements(task).isEmpty();}
}
```

#### DeleteTaskTest

```
src/test/pages/DeleteTaskTest.java
```

```java
package tests;

import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.chrome.ChromeDriver;

import pages.TasksPage;
import static org.junit.jupiter.api.Assertions.assertFalse;

class DeleteTaskTest {
    private WebDriver driver;
    private TasksPage tasksPage;

    @BeforeEach
    void setUp() {
        driver = new ChromeDriver();
        tasksPage = new TasksPage(driver);
        tasksPage.open();}

    @Test
    void shouldDeleteTask() {
        tasksPage.deleteTask();
        assertFalse(
            tasksPage.isTaskDisplayed(),
            "The task should no longer be displayed after deletion");}

    @AfterEach
    void tearDown() {
        if (driver != null) {
        driver.quit();}
    }
}
```

### Running the Test

```
APPLICATION_URL=https://example.com/tasks mvn test
```

---

## CI Integration

I am a bit more familiar with TeamCity, but since I remember Jenkins being mentioned in the job description, I'll go with Jenkins.

### Overview

In this example, I will use Jenkins as the orchestrator, Docker for a consistent execution environment, Playwright for the automated test suites, and I'll set up a quality gate and an email notification in Jenkins.

### Approach

I would separate different levels of testing depending on the pipeline stage. For example, a pull request could run a faster smoke or API test suite, while a merge to the main branch could trigger a heavier regression suite.

However, for this example, I'll go with a simpler route and run all tests on code change.

### Jenkinsfile

I would store the pipeline configuration in the repository as a Jenkinsfile.

```groovy
pipeline {

    agent {
        docker {
            image 'mcr.microsoft.com/playwright:v1.63.0-noble'
        }
    }

    environment {
        CI = 'true'
        BASE_URL = 'https://example-environment.com'
    }

    stages {

        stage('Checkout') {
            steps {
                checkout scm
            }
        }

        stage('Install dependencies') {
            steps {
                sh 'npm ci'
            }
        }

        stage('Build') {
            steps {
                sh 'npm run build'
            }
        }

        stage('Automated Tests') {
            steps {
                sh 'npx playwright test'
            }
        }

        stage('Quality Gate') {
            steps {
                script {
                    echo 'Automated tests passed. Quality gate passed.'
                }
            }
        }

        stage('Deploy') {
            when {
                branch 'main'
            }

            steps {
                echo 'Deploying application...'
            }
        }
    }

    post {

        always {
            archiveArtifacts(
                artifacts: 'playwright-report/**',
                allowEmptyArchive: true
            )

            archiveArtifacts(
                artifacts: 'test-results/**',
                allowEmptyArchive: true
            )
        }

        failure {
            emailext(
                to: 'pm@example.com',
                subject: "FAILED: ${env.JOB_NAME} #${env.BUILD_NUMBER}",
                body: """
                    The CI pipeline has failed.

                    Job: ${env.JOB_NAME}
                    Build: ${env.BUILD_NUMBER}
                    Branch: ${env.BRANCH_NAME}

                    Deployment has been blocked.

                    Please review the Jenkins build and
                    Playwright test reports for further details.
                """,
                attachLog: true
            )
        }

        success {
            echo 'Pipeline completed successfully.'
        }
    }
}
```

### Workflow

I would use a Jenkins Multibranch Pipeline connected to the Git repository.

First, the pipeline gets triggered by a commit, push, pull request or merge in the repository by a webhook.

Jenkins then checks out the code and starts the Playwright Docker image.

The dependencies are automatically installed.

The tests are executed and reports are generated.

Depending on the project, we could use the Playwright tests as a quality gate, meaning that in case of a failure, Jenkins would mark the build as failed.

Optional, but sending an email notification of the failure to the PM/QA Lead can sometimes be beneficial.
