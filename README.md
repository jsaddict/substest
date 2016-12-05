# substest

## Pre-requisities

1. Clone the repository from ''
1. ```npm install```

## How to run

```npm start```

### Additional notes

1. Substance uses '$$' notation - This basically refers to a wrapper of Cheerio implementation. It uses cheerio to compute diffs & other usecases like being used in server.
    1. Cheerio uses properties which htmlparser2 (https://github.com/fb55/htmlparser2) analyzes.
    2. Substance probably uses a custom analyzer which sits above htmlparser2 and also understands any component-specific properties. (Yet to assert this statement). 
    1. Why double $? To avoid conflicts with jQuery when used on client side. Ref: https://github.com/substance/substance/issues/10
    
1. Every component is basically just a jQuery element. So, **render** function should be returning the html content it's supposed to render on DOM.

1. 
