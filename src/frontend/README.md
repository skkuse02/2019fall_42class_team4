# frontend

### 프로젝트 serve 전 준비
1. [node.js 설치](https://nodejs.org/ko/)
1. node, npm 버전 확인 
    ```
    node -v
    v12.13.1

    npm -v
    6.12.1
    ```
1. yarn 설치
    ```
    npm i -g yarn
    ```
1. yarn 버전 확인
    ```
    yarn -v
    1.19.1
    ```
1. vue/cli 설치
    ```
    npm install -g @vue/cli
    ```
1. vue/cli 버전 확인
    ```
    vue --version
    @vue/cli 4.0.5
    ```
1. project dependancy install
    ./src/frontend 위치에서
    ```
    yarn install
    ```

### localhost로 프로젝트 serve
./src/frontend 위치에서
```
yarn serve
```

### Compiles and minifies for production
```
yarn build
```

### Lints and fixes files
```
yarn lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).
