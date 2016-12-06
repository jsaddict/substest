# substest

## Thinking in Substance

1. Substance is composed of a data model which is **source of truth** for the entire document. This is purely the data structure which substance uses to do all it's operations. This is called **DOCUMENT SESSION** which is generated from a document and is a set of **container nodes**

2. In regard to rendering the data model, we create components which can convert the entities in data model into a renderable form (HTML, XML, PDF, SVG, etc). Each component decides how it renders itself. The components exclusively use the **current** data and properties it requires to render from DOCUMENT_SESSION. This generally in HTMl is a set of **component nodes**

3. Data is 1-way binding only.
    1. As the data is appended, updated - they first get updated over to document session. 
    1. The component that watches for it's properties updates & renders with new data.


## Additional notes

1. Substance uses '$$' notation - This basically refers to a wrapper of Cheerio implementation. It uses cheerio to compute diffs & other usecases like being used in server.
    1. Cheerio uses properties which htmlparser2 (https://github.com/fb55/htmlparser2) analyzes.
    2. Substance probably uses a custom analyzer which sits above htmlparser2 and also understands any component-specific properties. (Yet to assert this statement). 
    1. Why double $? To avoid conflicts with jQuery when used on client side. Ref: https://github.com/substance/substance/issues/10
    
1. Every component is basically just a jQuery element. So, **render** function should be returning the html content it's supposed to render on DOM.

1. Each app would have an editor, document session and cofigurator.
    1. Editor: The UI which belongs to the raw UI which holds the text area, toolbar and other non-content related data.
    2. Document session: This is the data where the current session data is stored.
    3. Configurator: This is main package. This loads up utilities required for the current substance based app. The utilities could be:
        1. Toolbar tools.
        1. Comments.
        1. Sidebar tools.
        1. Content blocks.
        1. Content converters.
1. General flow of document load: 
    1. Create a new Configurator which would load utilities that editor needs.
    1. Create a document (Optionally by importing a pre-defined fixture that Configurator can convert and import.)
    1. Create a document session from the document created in step#2
    1. Mount the editor with document session and Configurator created above.
1. Editing behavior: This controls how, where and when the nodes break, merge, etc.
    * For reference, breakNode.js#breakNode() takes the current transaction (In this case it is the keydown event of enter). In the function it checks if the node supports the breaking behavior and then operates the breaking action of node.
    * Breaking behavior for nodes who respond to isText() as true is automatically handled. TextNode descendants generally are breakable.
    ```
        A transformation that breaks a node at the current position,
        e.g. used when you hit ENTER inside a paragraph.
        @function
        @param {model/TransactionDocument} tx the document instance
        @param {Object} args object with fields `selection`, `containerId`
    ```

## Current Project setup

1. Clone the repository from ''
1. run ```npm install```
1. run ```npm start``` and navigate to http://localhost:5555/