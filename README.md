# Petroleum Report Project

This project fetches data from a provided API, stores it in a SQLite database, and then normalizes the data. It provides a web app and API interface for answering three specific questions based on the data.

The project is live at [https://yipl-3hli.onrender.com/](https://yipl-3hli.onrender.com/).

## Data Source
- Data Source: [Raw Data JSON](https://raw.githubusercontent.com/younginnovations/internship-challenges/master/programming/petroleum-report/data.json)

## API Endpoints

### Total Sales
- List the total sale of each petroleum product.
  - Web App: [/totalsales](https://yipl-3hli.onrender.com/totalsales)
  - API Format: [/totalsales?format=api](https://yipl-3hli.onrender.com/totalsales?format=api)

### Highest and Lowest Total Sales
- List the top 3 countries with the highest and lowest total sales till date.
  - Highest Sales:
    - Web App: [/highestsale](https://yipl-3hli.onrender.com/highestsale)
    - API Format: [/highestsale?format=api](https://yipl-3hli.onrender.com/highestsale?format=api)
  - Lowest Sales:
    - Web App: [/lowestsale](https://yipl-3hli.onrender.com/lowestsale)
    - API Format: [/lowestsale?format=api](https://yipl-3hli.onrender.com/lowestsale?format=api)

### Average Sales for Each Petroleum Product
- List the average sale of each petroleum product for 4 years of interval. Note: Zero sales are not counted in the average calculation.
  - Web App: [/yearinterval](https://yipl-3hli.onrender.com/yearinterval)
  - API Format: [/yearinterval?format=api](https://yipl-3hli.onrender.com/yearinterval?format=api)

## Getting Started

1. Clone the repository:
   
   git clone https://github.com/yourusername/your-repository.git


2. Install dependencies:
`npm install`



4. Start the project:

  ```
  npm run start
  ```

### Git Hooks and Husky

We utilize Husky, a Git hook tool, to enforce certain actions and maintain a consistent workflow within our project. Git hooks are scripts that run before or after specific Git events.



- **Pre-commit Hook**: We have setup the pre-commit hook that runs code formatting scripts and linters to ensure code consistency before committing changes.

Please ensure that your code meets the required standards and passes the necessary checks before committing or pushing changes.

---
