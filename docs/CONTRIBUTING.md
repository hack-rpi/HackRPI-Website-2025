# Contributing Guidelines 💻

Thank you for considering contributing to our project! We appreciate your time and effort. To ensure a smooth collaboration, please follow these guidelines:

## Table of Contents

- [Getting Started](#getting-started)
- [How to Contribute](#how-to-contribute)
- [Code Style](#code-style)
- [Testing Guidelines](#testing-guidelines)
- [Bug Reports](#bug-reports)
- [Feature Requests](#feature-requests)
- [Pull Requests](#pull-requests)
- [License](#license)

## Getting Started

The project is developed in collaboration with Rensselaer Center for Open Source (RCOS). RCOS Contributors and HackRPI Organizing Team Contributors please read the section for [RCOS/HackRPI Contributors](#rcoshackrpi-contributors).

If you are not an RCOS contributor we are glad to have your contribution too! Please read the section for [External Contributors](#external-contributors)

If you need help or are interested in getting involved further please join our [HackRPI Organizing Team Discord Server](https://discord.gg/Pzmdt7FYnu)

### RCOS/HackRPI Contributors

You should have Write access to the repository by being a member of the HackRPI organization. If you are not a member of the HackRPI organization then please contact the current Director of Technology to get added.

Because you have write access to the repository you should be able to just clone the repository to make necessary changes.

        git clone https://github.com/hack-rpi/HackRPI-Website-2024.git

### External Contributors

Thank you for taking the time to contribute to our website! To contribute please make a fork of the repository in github and clone your fork

        git clone <link-to-your-fork>

## How to Contribute

Take a look at our open issues on our [issues page](https://github.com/hack-rpi/HackRPI-Website-2024/issues) to find something to do.

### Branches

> [!IMPORTANT]
> We use a modified version of the "GitFlow" method of working with branches. You can learn more about GitFlow [here.](https://datasift.github.io/gitflow/IntroducingGitFlow.html)
>
> The only change we make to GitFlow is that we do not have release branches, only the develop and master branch.

For general features please create a branch off of the "develop" branch. Please **do not** branch from main unless it is a quick "hotfix."

### Merging Code

Once you are satisfied with your feature and are ready to merge your changes into the rest of the codebase please follow the following steps.

1. Run `npm run build` to verify that the build passes.
1. Run `npx prettier --write .` to format your code to the same style as the rest of the repository
1. Run `npx eslint .eslintrc.js` to run linting checks to ensure a uniform code style and catch potential bugs.
1. Test your code thoroughly to ensure it looks and works well on mobile and on desktop.
1. Open a pull request into the **develop** branch to get your code reviewed and merged

## Code Style

There are a few code style things to mention:

1. Please use Typescript
   1. For most pages there will be little to no JS functionality required for them and many will be purely HTML and CSS. But still please use TypeScript by using `.tsx` files instead of `.jsx`
1. Please use TailwindCSS
   1. Tailwind can take a little while to get used to, and often it is great to have their [docs](https://tailwindcss.com/docs/installation) pinned / bookmarked. It does become very intuitive after a little while.
   1. If you are annoyed by the long class names Tailwind adds to the HTML then I would recommend the [Inline Fold Extension for VSCode](https://marketplace.visualstudio.com/items?itemName=moalamri.inline-fold).
1. Don't Repeat Yourself
   1. If you find that you are duplicating classes or elements, consider breaking them out into their own component so that they can be reused more easily.
   1. If you find yourself repeating code then try to refactor it out into another function.
1. Stick with the Provided Formatting
   1. ESLint (Linter) and Prettier (Formatter) will help you with sticking with the provided formatting.
   1. You can run eslint with `npx eslint .eslintrc.js`
   1. You can run prettier to format the repository with `npx prettier --write .`
   1. Both of these will run automatically when you make your pull request but its good to stick with the formatting throughout development.

## Testing Guidelines

We use a hybrid testing approach with Jest for unit/component tests and Playwright for E2E tests. For a comprehensive guide on our testing strategy, please refer to our [Testing Documentation](./TESTING.md).

When contributing, please ensure that your code is well-tested by following these guidelines:

1. **Write Tests for New Features**
   - All new functionality should have corresponding tests.
   - For utility functions, write unit tests in the `__tests__/unit/` directory.
   - For components, write component tests in the `__tests__/components/` directory.
   - For complex interactions, write integration tests in the `__tests__/integration/` directory.
   - For critical user journeys, write E2E tests in the `e2e/` directory.

2. **Run Tests Before Submitting**
   - Before creating a pull request, run the test suite to make sure all tests pass:
     ```bash
     npm test
     ```
   - For end-to-end tests, run:
     ```bash
     npm run test:e2e
     ```
   - If your tests fail, fix the issues before submitting your PR.

3. **Test Coverage**
   - Aim for high test coverage in your code changes.
   - You can check test coverage by running:
     ```bash
     npm run test:ci
     ```
   - Note: There's currently an issue with the coverage reporter in CI environments. If you encounter errors, use the regular test command instead.

4. **Testing Best Practices**
   - Test component behavior, not implementation details.
   - Use meaningful test descriptions that describe the expected behavior.
   - Mock external dependencies like API calls.
   - Check both happy path and error cases in your tests.
   - Focus on user-centric testing that mimics real user interactions.

For more detailed information, see the [Jest tests README](__tests__/README-UPDATED.md) and [E2E tests README](e2e/README.md).

## Bug Reports

If you find a bug but aren't sure how to fix it, let us know by opening a [GitHub Issue](https://github.com/hack-rpi/HackRPI-Website-2024/issues/new)! In your bug reports please include the following things:

1. A description of the bug
1. The expected functionality
1. Steps to reproduce the bug
1. Screenshots (if you can get some)

## Feature Requests

Ideas flourish when people of all backgrounds contribute. Have a great idea but just not sure how to implement it? Let us know by opening a [GitHub Issue](https://github.com/hack-rpi/HackRPI-Website-2024/issues/new)!

## Pull Requests

In your Pull Requests please make a general description of what you have changed. No need to be to detailed but also don't just leave the description body blank or with "changing stuff."

If you can include screenshots to make it easier for us to review. 😊

## License

This project is licensed under the MIT Open Source License which means that you are free to see our source code, copy it, redistribute it, and use it for commercial purposes **without** a warranty.

---

MIT License

Copyright (c) 2024 HackRPI

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
