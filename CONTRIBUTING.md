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
 
 The are 4 packages, 3 of them depends on the core package
 
- **@ngx-progressbar/core**         no dependencies
- **@ngx-progressbar/http**         depends on core
- **@ngx-progressbar/http-client**  depends on core
- **@ngx-progressbar/router**       depends on core

So we need to make it visible by linking the core package in `core/build`

A. Build the core package using the command

```bash
npm run build-core
```

Go to `core/build/package.json`, and you will see the version's value is `"VERSION"`, change it to manually to any valid number, e.g. `3.0.0`

B. Now we can register a link to it

```bash
npm link build/core
```

C. Then link it in our project

```bash
npm link @ngx-progressbar/core
```

Now after we made **@ngx-progressbar/core** package "installed", we can build all packages without errors.

### 4. Make your changes

Now the build setup should be working, make the changes. use the included demo app for testing

### 5. Build the packages
 
 ```bash
 npm run build-all
 ```

### 6. Submit your PR

It is not the best solution, but this is what I got so far. If you know a better way, please share it! :)