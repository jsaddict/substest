import substanceCss from 'substance/substance.css';
import substanceReset from 'substance/substance-reset.css';
import substancePageStyle from 'substance/substance-pagestyle.css'
import { DocumentSession, Configurator } from 'substance';

import appFixture from './appFixture';
import { CustomEditor } from './CustomEditor';
import { CustomConfigurator } from './CustomConfigurator';

import css from './app.css';

const cfg = new Configurator();
cfg.import(CustomConfigurator);


window.onload = function () {
    // Here, we use a configurator who has html importer. So, we can use a HTML fixture
    const importer = cfg.createImporter('html');
    const doc = importer.importDocument(appFixture);
    const documentSession = new DocumentSession(doc);

    CustomEditor.mount({
        documentSession: documentSession,
        configurator: cfg
    }, document.body)
};