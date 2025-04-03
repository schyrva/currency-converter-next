# Currency Converter

A modern, responsive currency converter application built with Next.js and Tailwind CSS. This application allows users to convert between different currencies and view current exchange rates with an intuitive user interface.

## 🔗 Demo

[View Live Demo](https://demo-link-coming-soon.vercel.app) - Coming soon!

## 🌟 Features

- **Currency Conversion**: Convert between a wide range of international currencies
- **Live Exchange Rates**: View current exchange rates for any selected base currency
- **Currency Search**: Quickly find currencies using the search functionality
- **Responsive Design**: Works seamlessly on desktop and mobile devices
- **Instant Conversion**: Real-time currency conversion with API integration

## 🛠️ Technologies Used

- [Next.js 15](https://nextjs.org/) - React framework for server-rendered applications
- [React 19](https://reactjs.org/) - JavaScript library for building user interfaces
- [TypeScript](https://www.typescriptlang.org/) - Strongly typed JavaScript
- [Tailwind CSS](https://tailwindcss.com/) - Utility-first CSS framework
- [Currency Layer API](https://currencylayer.com/) - Real-time currency exchange rates
- [Lucide React](https://lucide.dev/) - Beautiful & consistent icon toolkit
- [Prettier](https://prettier.io/) - Code formatter
- [Husky](https://typicode.github.io/husky/) - Git hooks for code quality

## 🚀 Getting Started

### Prerequisites

- Node.js 18.0 or later
- npm, yarn, or pnpm package manager
- API key from [Currency Layer](https://currencylayer.com/)

### Installation

1. Clone the repository:

```bash
git clone https://github.com/schyrva/currency-converter-next.git
cd currency-converter-next
```

2. Install dependencies:

```bash
npm install
# or
yarn install
# or
pnpm install
```

3. Create a `.env.local` file in the root directory and add your API key:

```
CURRENCY_API_KEY=your_api_key_here
```

4. Run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

5. Open [http://localhost:3000](http://localhost:3000) with your browser to see the application.

## 📖 Usage

### Currency Conversion

1. Enter the amount you want to convert
2. Select the currency you want to convert from
3. Select the currency you want to convert to
4. Click the "Convert" button to see the result

### Viewing Exchange Rates

1. Navigate to the "Currency Rates" tab
2. Select a base currency
3. View the exchange rates for all currencies
4. Use the search box to filter currencies

## 🧱 Project Structure

```
/
├── app/                # Next.js app directory
│   ├── page.tsx        # Home page (currency converter)
│   ├── rates/          # Exchange rates page
│   └── layout.tsx      # Root layout component
├── components/         # React components
│   ├── currency/       # Currency-specific components
│   ├── layout/         # Layout components
│   └── ui/             # UI components
├── constants/          # Application constants
├── hooks/              # Custom React hooks
├── lib/                # Utility functions and services
└── types/              # TypeScript type definitions
```

## 🔄 API Integration

The application uses the Currency Layer API to fetch:

- List of available currencies
- Current exchange rates
- Rate conversion between currencies

The API integration is handled through server components and cached for performance.

## 👨‍💻 Author

**Stanislav Chyrva**

- LinkedIn: [Stanislav Chyrva](https://www.linkedin.com/in/stanislav-chyrva-3a3b24347/)
- Email: [stanislav.chyrva@gmail.com](mailto:stanislav.chyrva@gmail.com)
- GitHub: [schyrva](https://github.com/schyrva)

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
