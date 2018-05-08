# Contributing

### 1. Clone the repo

 ```bash
$ git clone https://github.com/MurhafSousli/ngx-progressbar.git && cd ngx-progressbar
 ```

### 2. Install the dependencies

NPM

```
$ npm install
```

YARN
 
```
$ yarn install
```

### 3. Building
 
The are 3 packages
 
- **@ngx-progressbar/core**         no dependencies
- **@ngx-progressbar/http**         depended on the core package
- **@ngx-progressbar/router**       depended on the core package

**A. Build the core package**

```
$ npm run build-core
```

Then link the core, so you can build the other packages (needed only the first time)

```
$ npm run link-core
```

**B. Build the http package**

```
$ npm run build-http
```

**C. Build the router package**

```
$ npm run build-router
```

***

### 4. Submit your PR
