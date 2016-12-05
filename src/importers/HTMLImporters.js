import { HTMLImporter } from 'substance'

/**
  HTML importer. We delegate the work to BodyConverter.
*/
export class SimpleHTMLImporter extends HTMLImporter {
    convertDocument(htmlEl) {
        var bodyEl = htmlEl.find('body')
        this.convertElement(bodyEl)
    }
}