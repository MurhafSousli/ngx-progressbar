# Contributing

Here are the instructions on how to develop locally:

### 1. Clone the repo

 ```bash
$ git clone https://github.com/MurhafSousli/ngx-progressbar.git
 ```

### 2. Install the dependencies

Go inside the repo folder

```bash
 $ npm install
```

 ### 3. Build the core package first
 
 The are 3 packages
 
- **@ngx-progressbar/core**         no dependencies
- **@ngx-progressbar/http**         depends on core
- **@ngx-progressbar/router**       depends on core

A. Build the core package using the command

```bash
npm run build-core
```

Open to `core/build/package.json`, and replace `"VERSION"`, to valid version, e.g. `4.0.0`

B. Register it Link it

```bash
npm link build/core
```

Now **@ngx-progressbar/core** is linked, we can build the other packages without errors.

### 4. Make your changes

Now the build setup should be working, make the changes. use the included demo app for testing

### 5. Build all the packages
 
 ```bash
 npm run build-all
 ```

### 6. Submit your PR
