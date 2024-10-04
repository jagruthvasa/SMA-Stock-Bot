# **StockSMA-CrossoverBot**

## 📊 **Overview**

**StockSMA-CrossoverBot** is a stock trading bot designed to simulate trades based on a Simple Moving Average (SMA) crossover strategy using a 9-period and 21-period moving average. The bot continuously monitors stock price changes and executes trades when a crossover occurs, providing detailed reports of the profit and loss from the trades. The bot handles data fetching, error handling, and simulates real-time trading using historical data with the ability to handle market holidays.

## 🚀 **Features**

- **SMA Crossover Strategy**: Uses a 9-period and 21-period SMA crossover to determine buy/sell signals.
- **Profit & Loss Tracking**: Monitors trades and generates detailed profit and loss reports.
- **API Integration**: Fetches stock data using a predefined API, with configurable date ranges.
- **Real-Time Simulation**: Simulates stock price monitoring with adjustable time intervals.
- **Holiday Handling**: Automatically handles missing data for holidays, fetching the last available date.
- **Error Handling**: Validates input dates and handles invalid formats gracefully.

## 🔧 **Tech Stack**

- **Node.js**: Backend environment.
- **Express.js**: Web framework for building REST APIs.
- **Moment.js**: Library for date manipulation and validation.
- **dotenv**: Manages environment variables securely.

## 📘 **API Endpoints**

### **1. Start Trading Monitoring**

**Endpoint:** `/trade`

**Method:** `GET`

**Parameters:**
- `startDate` (YYYY-MM-DD): The start date for fetching stock data.
- `endDate` (YYYY-MM-DD): The end date for fetching stock data.

**Response:**
```json
{
  "status": "success",
  "message": "Stock monitoring started"
}
```

### **2. Trade Report**

**Endpoint:** `/report`

**Method:** `GET`

**Response:**
```json
{
  "status": "success",
  "totalProfit": 500,
  "trades": [
    {
      "action": "buy",
      "price": 50000,
      "timestamp": "2024-10-04T09:15:00+0530"
    },
    {
      "action": "sell",
      "price": 50500,
      "profit": 500,
      "timestamp": "2024-10-04T11:00:00+0530"
    }
  ],
  "currentPosition": "No active position"
}
```
## 📈 **Trading Logic**

The bot uses a **Simple Moving Average (SMA)** crossover strategy:

- **Buy Signal**: When the 9-day SMA crosses above the 21-day SMA.
- **Sell Signal**: When the 9-day SMA crosses below the 21-day SMA.
- **Profit Calculation**: Tracks profit for each trade, accumulating total profit or loss.

## 🛠️ **Setup and Installation**

1. Clone the repository:
    ```bash
    git clone https://github.com/your-username/StockSMA-CrossoverBot.git
    ```

2. Navigate to the project directory:
    ```bash
    cd StockSMA-CrossoverBot
    ```

3. Install dependencies:
    ```bash
    npm install
    ```

4. Create a `.env` file in the root directory and add the following:
    ```
    user_id=your_user_id
    enc_token=your_auth_token
    ```

5. Run the server:
    ```bash
    npm start
    ```

6. Access the API at `http://localhost:3000`.

## 📝 **Usage**

1. **Start Monitoring**:
    - Hit the `/trade` endpoint with the appropriate date range to start monitoring stock prices based on the SMA crossover strategy.
  
2. **View Reports**:
    - Access the `/report` endpoint to get detailed profit/loss reports and track all executed trades.

## 📅 **Handling Holidays**

The bot intelligently handles cases where the market is closed (e.g., holidays or weekends). If no data is available for the requested `startDate`, it will automatically fetch data from the most recent trading day.


## 👨‍💻 **Author**

- **Sai Jagruth** - [GitHub Profile](https://github.com/jagruthvasa)

