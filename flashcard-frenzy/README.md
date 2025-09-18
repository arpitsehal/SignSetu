# Flashcard Frenzy

Flashcard Frenzy is a web application designed to help users learn and test their knowledge using flashcards. It supports creating custom flashcard sets, playing games, and tracking match history.

## Features

-   **User Authentication**: Secure user registration and login powered by Supabase.
-   **Flashcard Management**: Create, view, and manage custom flashcard sets.
-   **Game Lobby**:
    -   Users can join game rooms.
    -   Host functionality to start games.
    -   Player readiness status.
-   **Game Play**: Interactive game experience using flashcards.
-   **Scoreboard**: Tracks and displays player scores during games.
-   **Match History**: Records and displays past game results.
-   **Responsive UI**: Built with React and Tailwind CSS for a modern and responsive user experience.
-   **Database Integration**: Uses MongoDB for storing flashcard sets, user data, and game results.
-   **API Endpoints**: RESTful API endpoints for managing games, users, and flashcards.

## Technologies Used

-   **Next.js**: React framework for building server-rendered and static web applications.
-   **React**: Frontend JavaScript library for building user interfaces.
-   **TypeScript**: Strongly typed superset of JavaScript.
-   **Tailwind CSS**: Utility-first CSS framework for rapid UI development.
-   **Framer Motion**: Animation library for React.
-   **MongoDB**: NoSQL database for data storage.
-   **Mongoose**: MongoDB object data modeling (ODM) for Node.js.
-   **Supabase**: Open-source Firebase alternative for authentication.
-   **ESLint**: Pluggable JavaScript linter.

## Project Structure

The project is organized into the following main directories:

-   `src/app`: Contains Next.js application routes, API endpoints, and pages.
    -   `api`: Backend API routes (e.g., `games/[gameId]/route.ts`).
    -   `categories`: Category-related components or pages.
    -   `game`: Game-related pages and components.
    -   `match-history`: Match history related pages and components.
-   `src/components`: Reusable UI components.
    -   `auth`: Authentication-related components (e.g., `AuthForm.tsx`).
    -   `flashcards`: Flashcard-specific components.
    -   `game`: Game-specific components (e.g., `GameLobby.tsx`, `PlayerList.tsx`, `Scoreboard.tsx`).
    -   `ui`: General UI components (e.g., `Button.tsx`, `Card.tsx`).
-   `src/hooks`: Custom React hooks (e.g., `useGame.ts`).
-   `src/lib`: Utility functions and database connections (e.g., `mongodb.ts`, `supabase.ts`).
-   `src/models`: Mongoose schemas and models for database entities (e.g., `FlashcardSet.ts`, `Game.ts`, `User.ts`).
-   `src/types`: TypeScript declaration files for custom types (e.g., `game.ts`, `global.d.ts`).
-   `public`: Static assets.
-   `scripts`: Utility scripts (e.g., `seed.ts`).

## Getting Started

### Prerequisites

-   Node.js (v18 or later)
-   npm or yarn
-   MongoDB instance (local or cloud-hosted)
-   Supabase project for authentication

### Installation

1.  Clone the repository:
    ```bash
    git clone <repository-url>
    cd flashcard-frenzy
    ```
2.  Install dependencies:
    ```bash
    npm install
    # or
    yarn install
    ```
3.  Create a `.env` file in the `flashcard-frenzy` directory and add your environment variables:
    ```
    MONGODB_URI=your_mongodb_connection_string
    NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
    NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
    ```
4.  Run the development server:
    ```bash
    npm run dev
    # or
    yarn dev
    ```
    Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
