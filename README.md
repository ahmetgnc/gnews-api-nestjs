#  GNews News API – NestJS Backend

This project is a NestJS-based backend service that integrates the GNews.io API. It fetches news from an external API, handles query parameters, and uses dynamic caching for performance.

---

## 🚀 Getting Started

### 1. Install Dependencies

`npm install`

---

## ▶️ Running the Application

`npm run start`

> By default, the service runs at http://localhost:3001

---

## 📡 API Endpoints

All endpoints are available under `/news`:

`GET /news/search?keyword=ai&count=5  ` → Search for news articles with a keyword

`GET /news/title?keyword=bitcoin&count=3` → Search in titles only

`GET /news/description?keyword=robotics&count=4`  → Search in descriptions only

`GET /news/top-headlines?category=technology` → Get top headlines for a specific category

> `count` is optional and defaults to `10`.

---

## 🧠 Technologies Used

- NestJS – Backend framework  
- Axios + RxJS – HTTP client  
- CacheManager – In-memory caching  

---

## 🧱 Project Structure
news/dto/                 → Request and response DTOs  
news/types/               → Type definitions
news/news.controller.ts   → API routes  
news/news.service.ts      → Service layer interacting with GNews  
news/news.module.ts  
common/http-util.service.ts → Dynamic HTTP service with caching

---

## ⚙️ Features

- Dynamic querying to GNews API  
- Built-in caching for GET requests 
- Reusable `HttpUtilService` for GET/POST requests  
- Global error handling (e.g., 401, 404, 429)  
- Modular code structure

---

## 📌 GNews API Limits

Daily limit: 1000 requests (free plan)  

---

##  NestJS Source

https://nestjs.com/

---

## 📄 License

MIT © 2025
