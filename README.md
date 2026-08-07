# Harmoniq

**Harmoniq** is a multi-page web application for discovering, creating, and sharing articles within a community.

Users can browse articles and creators, create an account, publish their own articles, save interesting content to bookmarks, and manage their personal profile.

## About the Project

The main goal of Harmoniq is to provide a simple platform where users can discover useful content, follow community creators, and share their own articles.

The application supports both guest and authenticated user flows.

### Guest users can

- Browse the home page
- View articles
- Open individual articles
- Browse creators and their profiles
- Register and log in
- View popular articles and top creators

### Authenticated users can additionally

- Create and publish articles
- Save and remove articles from bookmarks
- Access their personal profile
- View their own articles
- View saved articles
- Log out from their account

## Tech Stack

The project is built with:

- **Next.js 15**
- **React**
- **TypeScript**
- **Next.js App Router**
- **CSS Modules**
- **TanStack Query / React Query**
- **Zustand**
- **Formik**
- **Yup**
- **modern-normalize**
- **Next/Image**
- **Prettier**

Additional libraries may be used for:

- Toast notifications
- Loaders
- Pagination
- Animations
- Rich-text editing

## Main Features

- Responsive **mobile-first** design
- Public and protected routes
- Authentication and registration
- User profile
- Article creation
- Article bookmarks
- Articles filtering
- Articles and authors pagination
- Dynamic routes for articles and authors
- Form validation
- API error handling
- Loading states
- Server state caching with React Query
- SEO metadata and Open Graph tags
- Optimized image loading with `next/image`
- Global `error.tsx` and `not-found.tsx` pages

## Responsive Design

The application follows the **Mobile First** approach using `min-width` media queries.

Supported breakpoints:

- **Mobile:** fluid layout from `320px`, adapted from `375px`
- **Tablet:** from `768px`
- **Desktop:** from `1440px`

Styles are implemented using **CSS Modules**.

Interactive elements such as buttons and links include hover states and appropriate cursor behavior.

## Application Routes

| Route                   | Description          | Access            |
| ----------------------- | -------------------- | ----------------- |
| `/`                     | Home page            | Public            |
| `/register`             | User registration    | Public            |
| `/login`                | User login           | Public            |
| `/photo`                | Profile photo upload | Registration flow |
| `/articles`             | Articles list        | Public            |
| `/articles/[articleId]` | Single article       | Public            |
| `/articles/create`      | Create a new article | Private           |
| `/authors`              | Authors list         | Public            |
| `/authors/[authorId]`   | Author profile       | Public            |
| `/profile`              | Current user profile | Private           |

The `/profile` page also uses parallel routes for displaying:

- My Articles
- Saved Articles

## Getting Started

### 1. Clone the repository

```bash
git clone <repository-url>
cd harmoniq
```

### 2. Install dependencies

```bash
npm install
```

### 3. Configure environment variables

Create a `.env.local` file in the project root.

Example:

```env
NEXT_PUBLIC_API_URL=<backend-api-url>
```

Add other environment variables required by the application if necessary.

> Do not commit `.env.local` or other files containing private credentials to the repository.

### 4. Run the development server

```bash
npm run dev
```

Open:

```text
http://localhost:3000
```

in your browser.

## Available Scripts

Start the development server:

```bash
npm run dev
```

Create a production build:

```bash
npm run build
```

Run the production build locally:

```bash
npm run start
```

Run project linting:

```bash
npm run lint
```

Format the source code with Prettier:

```bash
npm run format
```

> The `format` script should be configured in `package.json`.

## Production Build

Before deployment, verify that the project builds successfully:

```bash
npm run build
```

Then start the production version:

```bash
npm run start
```

## Deployment

The Next.js application can be deployed to platforms that support Node.js and Next.js, for example **Vercel**.

Before deployment:

1. Connect the repository to the hosting platform.
2. Configure the required environment variables.
3. Make sure the production backend API URL is provided.
4. Configure the production build command:

```bash
npm run build
```

## Project Architecture

The project uses the **Next.js App Router**.

Server Components are used by default.

Client Components are introduced only when client-side functionality is required, for example:

- Forms
- Modals
- Interactive UI
- Zustand state
- React Query
- Browser APIs

Data that changes dynamically is managed with **TanStack Query**, including:

- Caching
- Synchronization
- Pagination
- Request state handling
- Prefetching

Local or global client state can be managed with **Zustand** when necessary.

## Forms and Validation

Forms are implemented with:

- **Formik**
- **Yup**

Validation rules should correspond to the backend API requirements.

Validation errors are displayed near the corresponding fields, while API errors are shown using toast or status notifications.

The application includes forms for:

- Registration
- Login
- Photo upload
- Article creation
- User profile editing

## Error and Loading Handling

The application provides loading indicators during asynchronous operations.

API and form errors are handled and displayed to the user through:

- Form validation messages
- Status messages
- Toast notifications

Global Next.js error handling is implemented with:

```text
app/error.tsx
app/not-found.tsx
```

## SEO

Application pages use Next.js metadata capabilities, including:

- `generateMetadata`
- Page titles and descriptions
- Open Graph metadata

Dynamic pages such as articles and author profiles can generate metadata based on data received from the backend.

## Additional Information

Images are optimized using `next/image`.

Lists with dynamic pagination should use data prefetching where appropriate.

The project source code is formatted with **Prettier**.

The project uses the `modern-normalize` package for consistent browser styling.

Animations are optional and can be implemented using libraries such as:

- Framer Motion
- GSAP

## Useful Links

- **Design:** `<add Figma link>`
- **Backend API:** `<add API documentation link>`
- **Live Page:** `<add deployed application link>`
- **Repository:** `<add repository link>`
