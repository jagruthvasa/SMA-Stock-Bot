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
