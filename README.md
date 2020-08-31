# Documentation

# **New Sample Platform**

### **This is the replacement for the previous sample platfrom for the CCExtractor**

# Contents

1. [Understanding the structure of project](#understanding-the-structure-of-project)
2. [Understand you workspace](#understand-your-workspace)
3. [Development server](#development-server)
4. [Build](#build)
5. [Running unit tests](#running-unit-tests)
6. [Running end-to-end tests](#running-end-to-end-tests)
7. [Backend](#backend)
    1. [Generate backend library using nx](#generate-backend-library-using-nx)
    2. [Library setup](#library-setup)
8. [Frontend](#frontend)
    1. [Generate frontend library using nx](#generate-frontend-library-using-nx)
    2. [Library setup](#library-setup)
9. [Database](#database)
10. [How to mount bucket? (gcloud storage)](#how-to-mount-bucket-google-cloud-storage)
    1. [Installation of gcsfuse](#1-installation-of-gcsfuse)
    2. [Install gsutil](#2-install-gsutil-if-there-is-no-bucket)
    3. [Configure gsutil](#3-configure-gsutil-if-there-is-no-bucket)
    4. [Mount existing bucket](#4-mount-existing-bucket)
    5. [Access the bucket](#5-access-the-bucket)
11. [Upload credentials as a metadata](#upload-credentials-as-a-metadata-to-the-project-on-gcloud)
12. [Contact](#any-questions-or-help-needed?)

## **Understanding the structure of project**

### This project uses the [monorepo](https://en.wikipedia.org/wiki/Monorepo) pattern to organize the code.

**NX Quickstart**

[Nx Documentation](https://nx.dev/angular)

Project is divided into multiple applications and libraries. Right now there are 3 main applications:

- **api -** basically the main application of the projects. Vast amount of api and libraries correspond to this application
- **github-interactions-api -** as name suggests, this application is intended only for interaction with the github API
- **sample-platform -** this is the frontend of the application.

...and multiple amount of libraries, which can be found under the folder `/libs/*`

Libraries which correspond to the specific application are as follows:

- Backend application libraries are suffixed with the word `implementation` e.g., libraries corresponding to the application `github-interactions-api` is located in the following folder: `libs/github-interactions-api-implementation/*`
- All frontend libraries are located inside `/libs/frontend/*`

## **Understand your workspace**

Run `nx dep-graph` to see a diagram of the dependencies of your projects.

![Dependency graph](https://s3.us-west-2.amazonaws.com/secure.notion-static.com/7438b7ad-977a-46c7-b028-b673e1d0a9d8/Untitled.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIAT73L2G45O3KS52Y5%2F20200831%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20200831T080929Z&X-Amz-Expires=86400&X-Amz-Signature=35156de18f5dd81ce284549de23260e2823644aefa1c638814151ffa90dc2f9d&X-Amz-SignedHeaders=host&response-content-disposition=filename%20%3D%22Untitled.png%22)

## **Development server**

Run `ng serve api (or sample platform)` for a dev server. Navigate to [http://localhost:4200/](http://localhost:4200/). The app will automatically reload if you change any of the source files.

## **Build**

Run `ng build api (or sample-platform)` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `-prod` flag for a production build.

## **Running unit tests**

Run `ng test sample-platform` to execute the unit tests via [Jest](https://jestjs.io/).

Run `nx affected:test` to execute the unit tests affected by a change.

Run `npm test` to execute ALL tests in the repository. 

## **Running end-to-end tests**

Run `ng e2e app` to execute the end-to-end tests via [Cypress](https://www.cypress.io/).

Run `nx affected:e2e` to execute the end-to-end tests affected by a change.

## Backend

Backend uses the library `Nest.js` which is built on top of the `express.js` . You can learn more about advantages and documentation on [official website](https://nestjs.com/). 

### Generate backend library using nx:

Run `ng g @nrwl/nest:lib *name_of_application_in_libs*/*name_of_library*` to generate a library. E.g. `ng g @nrwl/nest:lib api-implementation/test-entry` to generate `test-entry` library for `api-implementation`

**Note:** Libraries are sharable across libraries and applications. They can be imported from `@new-sample-platform/mylib`.

### Library setup

1. Import the name of the generated module to the corresponding application. E.g. if library is generated for `api-implementation` , you must import it to the `app.module.ts` in `apps/api` 
2. Create folder `services` and inside it create file `my-lib.service.ts` and tag it with the decorator `@Injectable` . Refer to: [https://docs.nestjs.com/providers](https://docs.nestjs.com/providers)
3. Inside the generated library's `*.module.ts` file, don't forget to specify the controllers as  `controllers` and services which are injected to the controllers as `providers`. Learn more [https://docs.nestjs.com/modules](https://docs.nestjs.com/modules)
4. (Optional). If you want to use database, import the `ApiImplementationDatabaseModule` as an import to the library module. 

### Now you are setup to write code for backend!

## Frontend

Frontend uses `Angular` and `RxJS` . Please refer to [https://angular.io/docs](https://angular.io/docs) and [https://rxjs-dev.firebaseapp.com/guide/overview](https://rxjs-dev.firebaseapp.com/guide/overview) 

### Generate frontend library using nx:

Run `ng g lib frontend/my-lib --prefix frontend --style scss` , `--prefix` - library name and module will be prefixed with the word `frontend`. E.g. `FrontendMyLibModule` 

### Library setup

1. Generate two folders: `containers` and `components` . Inside the containers (they correspond to specific feature, e.g. profile page), render corresponding components (e.g. profile picture, details and etc.). 
2. To generate component: `ng g component components/my-component -m frontend-my-lib --project frontend-my-lib`.
3. To generate container `ng g component containers/my-container -m frontend-my-lib --project frontend-my-lib` 
4. inside of generated library, next to the `*.module.ts` create file `routing.module.ts` . Import containers corresponding to this module and map with the sub routes. Learn more here: [https://angular.io/guide/router](https://angular.io/guide/router). Don't forget to import this `routing.module.ts` inside `my-lib.module.ts`
5. Now map the generated library in `routing.module.ts` (not the one inside the library, but in `apps/sample-platform/src/app/routing.module.ts`. E.g. 

```bash
{
    path: 'my-lib',
    loadChildren: () =>
      import('@new-sample-platform/frontend/my-lib').then(
        (mod) => mod.FrontendMyLibModule
      ),
  },
```

### Now you are setup to write code for frontend!

## Database

In order to create model you have to go to `libs/models/my-model`:

1. Create file `my-model.schema.ts` and export it. Refer [here](https://mongoosejs.com/docs/guide.html) on how to create schemas in mongoose.
2. Create file `my-mode.types.ts` It should be the following structure:

    ```bash
    import { Document, Model } from "mongoose";

    export interface IMyModel {
      field: String;
      dateOfEntry?: Date;
      lastUpdated?: Date;
    }

    export interface IMyModelDocument extends IMyModel, Document {}
    export interface IMyModelModel extends Model<IMyModelDocument> {}
    ```

    The interface should reflect the created schema in `my-model.schema.ts`

3. Create file `my-model.models.ts` . It should be the following format:

    ```bash
    import { model } from 'mongoose';
    import { IMyModelDocument } from './my-model.types';
    import MyModelSchema from './my-model.schema';
    export const MyModelModel: model = model<IMyModelDocument>(
      'my-model',
      MyModelSchema
    );
    ```

4. Now you can import the `MyModelSchema` and apply all methods that `[mongoose](https://mongoosejs.com/docs/api/model.html)` provides.

### Now you are setup to work with database!

## How to mount bucket (google cloud storage)?

### 1. **Installation of gcsfuse:**

**Ubuntu and Debian (latest releases):**

```bash
export GCSFUSE_REPO=gcsfuse-`lsb_release -c -s`
echo "deb http://packages.cloud.google.com/apt $GCSFUSE_REPO main" | sudo tee /etc/apt/sources.list.d/gcsfuse.list
curl https://packages.cloud.google.com/apt/doc/apt-key.gpg | sudo apt-key add -
sudo apt-get update && sudo apt-get install fuse
```

Add yourself to fuse group:

```bash
sudo groupadd fuse
sudo adduser $USER fuse
sudo chmod g+rw /dev/fuse
sudo chgrp fuse /dev/fuse
sudo apt-get install gcsfuse
sudo usermod -a -G fuse $USER
```

**CentOS and Red Hat (latest releases):**

```bash
sudo tee /etc/yum.repos.d/gcsfuse.repo > /dev/null <<EOF
[gcsfuse]
name=gcsfuse (packages.cloud.google.com)
baseurl=https://packages.cloud.google.com/yum/repos/gcsfuse-el7-x86_64
enabled=1
gpgcheck=1
repo_gpgcheck=1
gpgkey=https://packages.cloud.google.com/yum/doc/yum-key.gpg
       https://packages.cloud.google.com/yum/doc/rpm-package-key.gpg
EOF

sudo yum install gcsfuse
```

**OS X:**

- Install [osxfuse](https://osxfuse.github.io/)
- Install [homebrew](http://brew.sh/)

```bash
brew install gcsfuse
sudo ln -s /usr/local/sbin/mount_gcsfuse /sbin  # For mount(8) support
```

**Windows:**

Feel free to contribute!

### 2. Install gsutil (if there is no bucket):

**Ubuntu and Debian (latest releases):**

```bash
sudo apt-get install apt-transport-https ca-certificates gnupg
echo "deb [signed-by=/usr/share/keyrings/cloud.google.gpg] https://packages.cloud.google.com/apt cloud-sdk main" | sudo tee -a /etc/apt/sources.list.d/google-cloud-sdk.list
curl https://packages.cloud.google.com/apt/doc/apt-key.gpg | sudo apt-key --keyring /usr/share/keyrings/cloud.google.gpg add -
sudo apt-get update && sudo apt-get install google-cloud-sdk
```

**CentOS, Redhat and OS X:**

```bash
curl https://sdk.cloud.google.com | bash
exec -l $SHELL
```

**Windows:**

Feel free to contribute!

### 3. Configure `gsutil` (if there is no bucket):

**Common for all platforms:**

Type `gcloud init` to get started and follow the instructions. 

**Note:** After setting up your credentials, the `gcloud` command-line tool prompts you for a default project for this configuration and provides a list of available projects. Select a project ID from the list.

When you set this property, `gsutil` commands that require a project, such as `gsutil mb`, use the default project ID unless you override them with the -p flag **or** set the `CLOUDSDK_CORE_PROJECT` environment variable.

### 4. **Mount existing bucket:**

```bash
mkdir bucket
GOOGLE_APPLICATION_CREDENTIALS=credentials.json gcsfuse ccextractor-samples bucket
```

*where:*

- `credentials.json` is credentials of the service account.
    - Go to create [account service key page](https://console.cloud.google.com/apis/credentials/serviceaccountkey?_ga=2.167815585.1827403420.1598166763-1808215545.1594364842&_gac=1.11725440.1595765152.EAIaIQobChMI5Z-NhNTq6gIVQdiyCh2Kpgv3EAAYASAAEgK_Y_D_BwE)
    - From the **Service account list**, select **New service account**.
    - From the **Role list**, select **Project→Owner**
    - Click **Create.** A JSON file that contains your key downloads to your computer.
- `ccextractor-samples`

### 5. Access the bucket:

Now you can access the bucket by heading to the `bucket` folder. Make sure that you have permissions to write the file if you want to put something in the bucket. 

**Note:** if you change the permissions on your service account, you have to download the `credentials.json` file again. 

## Upload credentials as a metadata to the project on gcloud

In order to mount the bucket, the created VM instance should access the `credentials.json` file. If you are setting up new project you have to upload your `credentials.json` as a metadata to the project. 

In order to upload credentials stored in `g-credentials.json` to cloud metadata, execute the following command `gcloud compute project-info add-metadata --metadata-from-file g-credentials=$HOME/example/g-credentials.json`

You can view your GCE projects metadata on the cloud console by searching for metadata or you can view it by using gcloud:

```bash
gcloud compute project-info describe
```

After uploading the credentials as a metadata to the project, the startup script will handle everything else for you. 

# Any questions or help needed?

**Contact me via email:** elzhan.zeinulla@nu.edu.kz
