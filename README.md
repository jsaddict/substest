# substest

## Thinking in Substance

1. Substance is composed of a data model which is **source of truth** for the entire document. This is purely the data structure which substance uses to do all it's operations. This is called **DOCUMENT SESSION** which is generated from a document and is a set of **container nodes**

2. In regard to rendering the data model, we create components which can convert the entities in data model into a renderable form (HTML, XML, PDF, SVG, etc). Each component decides how it renders itself. The components exclusively use the **current** data and properties it requires to render from DOCUMENT_SESSION. This generally in HTML is a set of **component nodes**

3. Data is 1-way binding only.
    1. As the data is appended, updated - they first get updated over to document session. 
    1. The component that watches for it's properties updates & renders with new data.


## Additional notes

1. Substance uses '$$' notation - This basically refers substance DOM manipulation algorithm. It uses a diffing mechanism similar to React & Ember with a *major* exception that parsing & data manipulation will be done synchronously.
    * For reference, motivation and in-depth detail refer to Substance code base Component.js file. The documentation is also pasted at bottom.

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
    * For reference look at code on substance at breakNode.js#breakNode(), it takes the current transaction (In this case it is the keydown event of enter). In the function it checks if the node supports the breaking behavior and then operates the breaking action of node.
    * Breaking behavior for nodes who respond to isText() as true is automatically handled. TextNode descendants generally are breakable.
    ```
        A transformation that breaks a node at the current position,
        e.g. used when you hit ENTER inside a paragraph.
        @function
        @param {model/TransactionDocument} tx the document instance
        @param {Object} args object with fields `selection`, `containerId`
    ```
1. There are special kind of nodes which are inline and act as decorators of existing content. These are called Annotations. 

## Current Project setup

1. Clone the repository from ''
1. run ```npm install```
1. run ```npm start``` and navigate to http://localhost:5555/


#### Substance Component rendering explaination.
```
 A light-weight component implementation inspired by
  [React](https://facebook.github.io/react/) and [Ember](http://emberjs.com/).
  In contrast to the large frameworks it does much less things automagically in
  favour of synchronous rendering and a minimalistic life-cycle. It also
  provides *up-tree* communication and *dependency injection*.

  ### Why synchronous rendering?

  Synchronous rendering, while it may *seem* less performant, is necessary
  because substance must render the model, after it has changed before the next
  change is triggered by the user.

  Asynchronous rendering as it exists in React means that the UI will
  eventually *catch* up to changes in the model. This is not acceptable in
  substance because substance plays with contenteditable and thus, cursor
  positions, etc are maintained in the browser's DOM. If we went the async way,
  the cursor in the DOM would be briefly inconsistent with the cursor in the
  model. In this brief window, changes triggered by the user would be impossible
  to apply.

  ### Concepts:

  - `props` are provided by a parent component.  An initial set of properties is provided
  via constructor. After that, the parent component can call `setProps` or `extendProps`
  to update these properties which triggers rerendering if the properties change.

  - `state` is a set of flags and values which are used to control how the component
  gets rendered given the current props. Using `setState` the component can change
  its internal state, which leads to a rerendering if the state changes.
  Prefer using `extendState` rather than `setState`.

    Normally, a component maintains its own state. It isn't recommended that a
  parent pass in or update state. If you find the need for this, you should be
  looking at `props`.

    State would be useful in situations where the component itself controls some
  aspect of rendering. Eg. whether a dropdown is open or not could be a state
  within the dropdown component itself since no other component needs to know
  it.

  - A child component with a `ref` id will be reused on rerender. All others will be
  wiped and rerender from scratch. If you want to preserve a grand-child (or lower), then
  make sure that all anchestors have a ref id. After rendering the child will be
  accessible via `this.refs[ref]`.

  - A component can send actions via `send` which are bubbled up through all parent
  components until one handles it. A component declares that it can handle an
  action by calling the `handleActions` method on itself in the constructor or
  the `didUpdate` lifecycle hook.
```