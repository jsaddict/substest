import {
    BasePackage, StrongPackage, EmphasisPackage, LinkPackage, Document,
    ParagraphPackage, HeadingPackage
} from 'substance'

import { SimpleHTMLImporter } from './importers/HTMLImporters';
import BodyPackage from './packages/body/BodyPackage';
import InlinePackage from './packages/inline';

export const CustomConfigurator = {
    name: 'custom-configurator',
    configure: function (config) {
        config.defineSchema({
            name: 'simple-article',
            ArticleClass: Document,
            defaultTextType: 'paragraph'
        });

        // BasePackage provides core functionaliy, such as undo/redo
        // and the SwitchTextTypeTool. However, you could import those
        // functionalities individually if you need more control
        config.import(BasePackage);

        // Custom nodes
        config.import(BodyPackage);
        config.import(InlinePackage);

        // core nodes
        config.import(ParagraphPackage);
        config.import(HeadingPackage);
        config.import(StrongPackage, { toolTarget: 'annotations' });
        config.import(EmphasisPackage, { toolTarget: 'annotations' });
        config.import(LinkPackage, { toolTarget: 'annotations' });

        // Override Importer/Exporter
        config.addImporter('html', SimpleHTMLImporter);
    }
}