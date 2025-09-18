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
    Open [http://localhost:3000](http://localhost:3000) in your browser to see the application.

### Building for Production

```bash
npm run build
# or
yarn build
```

### Running Tests

(If applicable, add instructions for running tests here)

## Contributing

(If applicable, add contribution guidelines here)

## License

(If applicable, add license information here)
