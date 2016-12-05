
import { ProseEditor, ProseEditorConfigurator, DocumentSession, ImagePackage,  ProseEditorPackage } from 'substance/substance'

import { appFixture } from './appFixture'

const config = {
  name: 'image-example',
  configure: function (config) {
    config.import(ProseEditorPackage)
    config.import(ImagePackage)
  }
}

var configurator = new ProseEditorConfigurator().import(config);
window.onload = function () {
  var doc = configurator.createArticle(appFixture);
  var documentSession = new DocumentSession(doc);

  ProseEditor.mount({
    documentSession: documentSession,
    configurator: configurator
  }, document.body)
};