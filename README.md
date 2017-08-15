# Interactive Chart Creator for RedCap Data with JavaScript/D3.js

An experiment in JavaScript app design that started with the goal of helping users create visually appealing
data visualizations regardless of their level of programming expertise while remaining portable and lightweight.
The application's goal is to have a softer learning curve than Excel, R, and other data visualization tools available,
by letting users specify data in an intuitive way and sequentially presenting options to narrow down what the final graph 
should look like, while handling the trickier data and graphical manipulation under the hood. This app was built to handle 
data from REDCap projects but will handle CSV data as well. Runs in Google Chrome and is currently untested in other browsers.

## Documentation

### setup.js

All configurable program globals are included here as well as code to support the user interface. JavaScript begins
executing here before waiting for user input.

### api.js

Handles all calls to the REDCap API.

### key.js

Holds REDCap authentication information. REDCap data won't work unless this file is correctly filled out. Should not be served client-side
if this app is ever hosted.

### chartbase.js

### Scatter.js/Bar.js
	
Defines the behavior of their respective chart type, including data manipulation and drawing instructions using the D3.js library




## Missing Features:
	
	* add chart interactivity, (mouseover points) for clarity
	* add support for time values
	* more robust data handling/uploading
	* add support for multiple datasets
	* add option to scale axes
	* add option to scale chart
	* adapt for other browsers
	* example csv data for each graph

