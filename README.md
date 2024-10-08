# **SMA-Stock-Bot**

## 📊 **Overview**

**SMA-Stock-Bot** is a stock trading bot designed to simulate trades based on a Simple Moving Average (SMA) crossover strategy using a 9-period and 21-period moving average. The bot continuously monitors stock price changes and executes trades when a crossover occurs, providing detailed reports of the profit and loss from the trades. The bot handles data fetching, error handling, and simulates real-time trading using historical data with the ability to handle market holidays.

## 🚀 **Features**

- **SMA Crossover Strategy**: Uses a 9-period and 21-period SMA crossover to determine buy/sell signals for **15 mins timeframe in Nifty Bank.**
- **Profit & Loss Tracking**: Monitors trades and generates detailed profit and loss reports.
- **API Integration**: Fetches stock data using a predefined API, with configurable date ranges.
- **Real-Time Simulation**: Simulates stock price monitoring with adjustable time intervals.
- **Holiday Handling**: Automatically handles missing data for holidays, fetching the last available date.
- **Error Handling**: Validates input dates and handles invalid formats gracefully.
- **Added 1 Sec Interval**: Monitors the price movements at a 1-second interval

## 🔧 **Tech Stack**

- **Node.js**: Backend environment.
- **Express.js**: Web framework for building REST APIs.
- **Moment.js**: Library for date manipulation and validation.
- **dotenv**: Manages environment variables securely.

## Testing

The bot is designed to monitor the Bank Nifty stock at 15-minute intervals. When testing the functionality, please use the following reference:

- **SMA Reference:** You can check the crossovers of the 9-day and 21-day SMAs in Zerodha. 

Here is a screenshot showing the 9 SMA and 21 SMA crossovers: 

Green Line (9 SMA) and Red Line (21 SMA)

<img width="1439" alt="image" src="https://github.com/user-attachments/assets/b9da0f22-a822-451c-9600-60e8bb9abbc4">

- **Live Data Results:** The results from my bot will show that both buying and selling occur at the same points as indicated by the live data.

<img width="1072" alt="image" src="https://github.com/user-attachments/assets/3af3b9a2-bef7-462d-a764-96484c225b5b">



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

(I have hosted this application on Render.com. You can directly test the API using the provided Postman collection below.)

1. Clone the repository:
    ```bash
     https://github.com/jagruthvasa/SMA-Stock-Bot.git
    ```

2. Navigate to the project directory:
    ```bash
    cd SMA-Stock-Bot
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
    user_id is your zerodha account id (consists of 6 characters)
    enc_token you will find your enc_token when you login in zerodha account and go to profile page and you will see api "full" in the network tab and go to the request header and there you can see the enc_token added image for your reference.
Please Visit this url https://kite.zerodha.com/profile

<img width="1213" alt="image" src="https://github.com/user-attachments/assets/fb915024-0603-4ce6-be13-b6b05ef2696e">


6. Run the server:
    ```bash
    npm start
    ```

7. Access the API at `http://localhost:3000`.

## 📝 **Usage**

1. **Start Monitoring**:
    - Hit the `/trade` endpoint with the appropriate date range to start monitoring stock prices based on the SMA crossover strategy.
  
2. **View Reports**:
    - Access the `/report` endpoint to get detailed profit/loss reports and track all executed trades.

## 📅 **Handling Holidays**

The bot intelligently handles cases where the market is closed (e.g., holidays or weekends). If no data is available for the requested `startDate`, it will automatically fetch data from the most recent trading day.

## Hosted Link

You can visit the hosted link [here](https://sma-stock-bot.onrender.com).

## Postman Collection

Here is the [Postman Collection](https://www.postman.com/aviation-architect-34779856/sma-stock-bot/collection/evzxq8u/stock-bot?action=share&creator=36467777) you can use to test the APIs.

## Support

If you encounter any issues, please email: [jagruthvasa@gmail.com](mailto:jagruthvasa@gmail.com)

