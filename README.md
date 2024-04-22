# Swiss Cheese Lib

## [Task](https://drive.google.com/file/d/1_OCSaSETyeDNJ2Xuc-jAdFL4ZYVvmtlQ/view)

## How to Use:

1. As a component lib (should be installable via the script bellow, after running which you can just import needed components from 'swiss-cheese-lib'):
```
npm i RC-3222/swiss-cheese-lib
```
2. As anything else:
    - Clone the repo by running `git clone https://github.com/RC-3222/swiss-cheese-lib.git`
    - Open it in your code editor (or a terminal).
    - Run `npm install` to install all the dependencies.
    - And then you have multiple options:
        1. `npm run build` - build the lib for distribution (results are stored in `dist` folder)
        2. `npm run storybook` - explore the lib via interactive storybook
        2. `npm run test` - run the tests


## Project Structure

```
📦dist                            # Built lib content that actually gets distributed.
📦src                             # Library sources
 ┣ 📂scss                         # Library-wide styling constants & other utilities
 ┣ 📂components                   # A folder that contains all the components available
 ┗ 📜index.ts                     # Lib starting point.
```
