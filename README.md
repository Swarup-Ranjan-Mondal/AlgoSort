# AlgoSort

---

This App is built with **[Angular](https://angular.io)** and is meant for visualizing all popular sorting algorithms. It is capable of showing the sorting process in action not only through _`bar animation`_ but also through _`ball animation`_.

**_See a demo here:_** https://swarup-ranjan-mondal.github.io/AlgoSort/

### Animations supported:

For visualizing the sorting algorithms, this app provides two types of animation which are given below:

| Animation Type |
| :------------: |
|      Ball      |
|      Bar       |

### Algorithms supported:

Currently, the app supports the following sorting algorithms:

| Sorting Algorithm |
| ----------------- |
| Bubble Sort       |
| Heap Sort         |
| Insertion Sort    |
| Merge Sort        |
| Quick Sort        |
| Selection Sort    |

## Usage

---

If you want to run this app locally, then clone this repo using the command:

```sh
git clone https://github.com/Swarup-Ranjan-Mondal/AlgoSort.git
```

Move inside the subfolder `AlgoSort` with the command

```sh
cd AlgoSort
```

#### Install

Install the dependencies and devDependencies with the command:

```sh
npm install
```

**Note: [Angular CLI](https://github.com/angular/angular-cli)** requires [Node.js](https://nodejs.org/) version of either _v10.13_ or _v12.0_. So, make sure that either of the above mentioned versions of node is installed on your pc.

#### Run

Build and run the app locally with the command:

```sh
ng serve
```

The above command runs the app at `http://localhost:4200/`. So, open the browser to see the app run. The app will automatically reload if you change any of the source files.

#### Build

For production build run the command:

```sh
ng build --configuration production
```

This will build artifacts for production and will stored them in the `dist/` directory.
