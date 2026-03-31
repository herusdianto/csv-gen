# CSV Generator

A simple, fully client-side web application to generate CSV data with custom columns, data types, and separator options. No frameworks, no backend, 100% runs in your browser.

## Features
- Separator options: Comma, Semicolon, Tab, Pipe, or Custom
- Header option: with or without header
- Row count selection
- Dynamic columns: add/remove columns as needed
- Column data type selection (name, email, number, date, etc.)
- CSV output updates automatically on any input change
- Copy and Download CSV buttons
- Dark mode
- 100% client-side, data is never sent to any server

## How to Use
1. Open `index.html` in a modern browser (Chrome, Firefox, Edge, Safari)
2. Set the number of rows, separator, and header option
3. Add/remove columns as needed, select data type for each column
4. The generated CSV will appear instantly in the output textarea
5. Click **Copy** to copy, or **Download CSV** to download the file

## Project Structure
```
public/
  ├── app.js              # Main application logic
  ├── style.css           # Styling
  ├── index.html          # Main page
  ├── favicon.svg         # Favicon
  └── constants/          # Data & helpers for generator
      ├── dataTypes.js
      ├── firstNames.js
      ├── lastNames.js
      ├── cities.js
      ├── countries.js
      ├── companies.js
      ├── streetNames.js
      ├── domains.js
      ├── loremWords.js
      └── helper.js
```

## Development
- No frameworks, just HTML, CSS, and JS (ES modules)
- All generator data and logic can be modified in the `constants/` folder
- To add a new data type, edit `constants/dataTypes.js` and add a generator in `helper.js` if needed

## License

MIT License

## Contributing

Contributions are welcome! Feel free to submit a Pull Request.

## Demo

[https://herusdianto.github.io/csv-gen/](https://herusdianto.github.io/csv-gen/)