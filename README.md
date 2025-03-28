# HackRPI-Website-2025

The HackRPI Website [hackrpi.com](https://hackrpi.com) for our 2025 Hackathon at Rensselaer Polytechnic Institute

## Tech Stack 💻

A simple, front-end only website with NextJS, React, TailwindCSS, and TypeScript.

## Getting Started

1.  Clone the repository with Git
1.  Create a file named `amplify_outputs.json`, in that file just add `{}`. This file is used for our Schedule page backend, but I don't want to have to give everyone access to AWS. If you need access to modify the schedule page, then please contact the Director of Technology, and they will give you a proper `amplify_outputs.json` file.
1.  Install the dependencies with npm

        npm i

1.  Run the development server with npm

        npm run dev

## Testing 🧪

We use Jest and React Testing Library for testing. Tests are organized into three categories:

1. **Unit Tests**: For testing utility functions and isolated logic
2. **Component Tests**: For testing React components in isolation
3. **Integration Tests**: For testing how components work together

To run all tests:

```bash
npm test
```

To run tests in watch mode (useful during development):

```bash
npm run test:watch
```

To generate a coverage report:

```bash
npm run test:ci
```

For more information about testing, see the [testing documentation](__tests__/README.md).

## Contributing 🚀

We are always looking for contributions! If you're wondering where to start, checkout our issues pages for work that still needs to be done.

Before contributing please take a look at our [contributing guidelines](docs/CONTRIBUTING.md). Thanks!
