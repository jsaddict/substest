import substanceCss from 'substance/substance.css';
import substanceReset from 'substance/substance-reset.css';
import substancePageStyle from 'substance/substance-pagestyle.css'

import {
    ProseEditorConfigurator, DocumentSession,
    ProseEditorPackage, HeadingMacro
} from 'substance';

import appFixture from './appFixture';
import MinimalEditor from './MinimalEditor';

import css from './app.css';

let cfg = new ProseEditorConfigurator().import(ProseEditorPackage);
cfg.addMacro(HeadingMacro);

window.onload = function () {
    let doc = cfg.createArticle(appFixture);
    let documentSession = new DocumentSession(doc);

    MinimalEditor.mount({
        documentSession: documentSession,
        configurator: cfg
    }, document.body)
};