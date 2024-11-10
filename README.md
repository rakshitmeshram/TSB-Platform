# Trading Strategy Backtesting Platform

A high-performance web application to backtest and analyze trading strategies, built using [Vite](https://vitejs.dev/), [Next.js](https://nextjs.org/), and [TailwindCSS](https://tailwindcss.com/). This platform enables users to test various trading strategies on historical market data, visualize results, and refine strategies for optimal performance.

![Dashboard](https://drive.google.com/file/d/1yuP8pepFQuovvb5CCGcY2TwTt5yR7O32/view?usp=sharing)

## Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Installation](#installation)
- [Usage](#usage)
- [Contributing](#contributing)
- [License](#license)

## Features

- **Historical Data Backtesting**: Upload and backtest trading strategies on historical market data.
- **Strategy Analysis**: View performance metrics like profitability, drawdown, Sharpe ratio, and more.
- **Data Visualization**: Interactive charts and graphs to visualize strategy results.
- **Real-time Feedback**: Fast performance powered by Vite and optimized for minimal lag.
- **Responsive Design**: Built with TailwindCSS, the platform is fully responsive for use on both desktop and mobile devices.
- **Modular Code Structure**: Designed with scalability in mind, allowing for easy addition of new features and trading algorithms.

## Tech Stack

- **Frontend**: Next.js, Vite
- **Styling**: TailwindCSS
- **State Management**: Context API (or replace with the chosen state manager)
- **Data Visualization**: Chart.js or D3.js (replace with chosen library)

## Installation

### Prerequisites

Ensure you have the following installed:

- Node.js v14 or higher
- npm v7 or higher

### Steps

1. Clone the repository:

   ```bash
   git clone https://github.com/RakshitMeshram/TSB-Platform.git
   cd TSB-Platform
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Run the development server:

   ```bash
   npm run dev
   ```

4. Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

## Usage

1. **Upload Historical Data**: Start by uploading a CSV file containing historical price data.
2. **Set Up Strategy Parameters**: Configure your trading strategy parameters (e.g., buy/sell triggers, stop-loss).
3. **Run Backtest**: Launch the backtesting process to evaluate the strategy’s performance.
4. **View Results**: Analyze metrics and charts to assess the profitability and stability of the strategy.

## Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository.
2. Create a new branch with a descriptive name (e.g., `feature/add-new-chart`).
3. Make your changes and commit them.
4. Open a pull request.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.
