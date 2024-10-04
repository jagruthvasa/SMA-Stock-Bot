const express = require('express');
const moment = require('moment');
const dotenv = require('dotenv');
dotenv.config();

const app = express();
const PORT = 3000;
const open_interest_enabled = 1;
const kite_api="https://kite.zerodha.com/oms/instruments/historical/260105/15minute"

let trades = [];
let currentPosition = null; // Will store either 'buy' or 'sell'
let totalProfit = 0;
let startMonitoring = 'false';

// Function to calculate Simple Moving Average (SMA)
const calculateSMA = (prices, period) => {
      if (prices.length < period) {
            throw new Error(`Not enough data to calculate the ${period}-day SMA`);
      }

      const sum = prices.slice(-period).reduce((acc, price) => acc + price, 0);

      return sum / period;
};

// Function to get the last available trading data
const getLastAvailableTradingData = async (date) => {
      let currentDate = moment(date);
      currentDate.subtract(1, 'days'); // Start from the previous day

      while (true) {
            const candles = await fetchStockData(currentDate.format('YYYY-MM-DD'), currentDate.format('YYYY-MM-DD'));
            if (candles.length > 0) {
                  return candles;
            }
            currentDate.subtract(1, 'days'); // Move to the one more previous day
      }
};

// Function to fetch stock data from the API
const fetchStockData = async (from, to) => {
      try {
            const oi = open_interest_enabled;
            const user_id = process.env.user_id;
            const url = `${kite_api}?user_id=${user_id}&oi=${oi}&from=${from}&to=${to}`;

            const response = await fetch(url, {
                  method: 'GET',
                  headers: {
                        'Authorization': `enctoken ${process.env.enc_token}`,
                        'Content-Type': 'application/json'
                  }
            });

            const data = await response.json();
            return data.data.candles;
      } catch (error) {
            throw new Error('Error fetching stock data from API ', error);
      }
};

// Validate date format
const isValidDate = (dateStr) => {
      return moment(dateStr, 'YYYY-MM-DD', true).isValid();
};

// Trading logic based on SMA crossover
const evaluateTradingLogic = (sma9, sma21, currentPrice, previousPosition) => {
      if (sma9 > sma21 && (!previousPosition)) { // Buy signal
            return { action: 'buy', price: currentPrice };
      } else if (sma9 < sma21 && previousPosition) { // Sell signal
            return { action: 'sell', price: currentPrice };
      }
      return null;
};

// Profit/Loss Tracking and Trade Logging
const trackTrade = (action, price, currentTime) => {
      if (action === 'buy') {
            currentPosition = { type: 'buy', price };
            trades.push({ action: 'buy', price, timestamp: formatTimestamp(currentTime) });
      } else if (action === 'sell' && currentPosition) {
            const profit = price - currentPosition.price;
            totalProfit += profit;
            trades.push({ action: 'sell', price, 'profit/loss': profit, timestamp: formatTimestamp(currentTime) });
            currentPosition = null; // Reset position after sell
      }
};

// Simulate stock price monitoring
const monitorStockPrices = (candles) => {
      let interval = 21;
      const prices = candles.map(candle => candle[4]); // Close prices
      const dates = candles.map(candle => candle[0]); // Dates
      const timer = setInterval(() => {

            if (interval >= prices.length) {
                  clearInterval(timer); // Stop monitoring when we run out of data
                  console.log('Monitoring finished.');
                  startMonitoring = 'completed';
                  return;
            }

            const recentPrices = prices.slice(interval - 21, interval + 1); // Get last 21 prices
            const sma9 = calculateSMA(recentPrices, 9);
            const sma21 = calculateSMA(recentPrices, 21);
            const currentPrice = prices[interval];
            const currentTime = dates[interval];

            const action = evaluateTradingLogic(sma9, sma21, currentPrice, currentPosition);

            if (action) {
                  trackTrade(action.action, action.price, currentTime);
            }

            interval++;
      }, 1000); // 1-second interval to simulate real-time

      startMonitoring = 'true';
};

// Main endpoint to start monitoring
app.get('/trade', async (req, res) => {
      const { startDate, endDate } = req.query;

      // Validate inputs
      if (!startDate || !endDate) {
            return res.status(400).json({ status: 'error', message: 'start date and end date are required' });
      }

      if (!isValidDate(startDate) || !isValidDate(endDate)) {
            return res.status(400).json({ status: 'error', message: 'Invalid date format. Use YYYY-MM-DD' });
      }

      if (startMonitoring === 'true') {
            return res.status(400).json({ status: 'error', message: 'Stock monitoring already in progress. To check the report, use /report endpoint' });
      }

      try {
            // Fetch stock data
            const candles = await fetchStockData(startDate, endDate);

            if (candles.length === 0) {
                  return res.status(400).json({ status: 'error', message: 'Looks like it is a holiday, please select a valid date' });
            }

            const lastTradingData = await getLastAvailableTradingData(startDate);

            const previous21Prices = lastTradingData.slice(-21)

            const updatedCandles = [...previous21Prices, ...candles];

            // Start monitoring stock prices
            monitorStockPrices(updatedCandles);

            res.json({ status: 'success', message: 'Stock monitoring started. Check /report endpoint for the report' });
      } catch (error) {
            res.status(500).json({ status: 'error', message: error.message });
      }
});

const formatTimestamp = (timestamp) => {
      return moment(timestamp).format('MMMM Do YYYY, h:mm:ss a');
};

// Endpoint to get the final trade report
app.get('/report', (req, res) => {
      res.json({
            status: startMonitoring === 'true' ? 'Trade is On-Going... To get the updated report call again' : startMonitoring === 'completed' ? 'Trade is Successfully Completed' : 'Trade not started yet',
            'Total Profit/Loss': totalProfit.toFixed(2),
            'Trades taken': trades.length ? trades : 'No Cross-over found.',
            'Current Position': currentPosition ? `Currently holding stock at ${currentPosition.price}` : 'No active position',
      });
});

app.get('/', (req, res) => {
      res.send('Welcome to the Stock Trading API');
});

app.listen(PORT || process.env.PORT, () => {
      console.log(`Server is running on port ${PORT || process.env.PORT}`);
});
