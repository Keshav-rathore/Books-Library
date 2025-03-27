# Library Book System

## Overview
The **Library Book System** is a web-based application that fetches and displays book data from a free API. Users can search, filter, and browse books efficiently using a list or grid view. The system includes pagination and sorting features to enhance user experience.

## Features
- 📚 **Fetch Books**: Retrieve book data from an API and display it dynamically.
- 🔍 **Search & Filter**: Search books by title or author.
- 🗂️ **List & Grid View**: Toggle between list and grid views for better browsing.
- 🔄 **Pagination**: Navigate through books page by page.
- 📊 **Sorting**: Sort books by title or published date.
- 🎨 **Responsive Design**: Ensures a seamless experience across different devices.

## Tech Stack
- **Frontend:** HTML, CSS, JavaScript
- **API:** FreeAPI 


## Usage
1. **Search Books**: Enter a keyword in the search bar to filter books.
2. **Switch Views**: Click the "List View" or "Grid View" button to change the display mode.
3. **Navigate Pages**: Use the pagination buttons to browse through book listings.
4. **Sort Books**: Select sorting options to arrange books by title or published date.


## API Integration
- **Fetch books:**
  ```js
  async function fetchAllBooks() {
      const response = await fetch('https://www.googleapis.com/books/v1/volumes?q=javascript');
      const data = await response.json();
      return data.items;
  }
  ```
- **Search Functionality:**
  ```js
  const filteredBooks = allBooks.filter((book) => {
      const title = book.volumeInfo.title?.toLowerCase() || "";
      const authors = book.volumeInfo.authors?.join(", ").toLowerCase() || "";
      return title.includes(query.toLowerCase()) || authors.includes(query.toLowerCase());
  });
  ```


