/* global global, upload, window */
import Ember from 'ember';

Ember.Test.registerAsyncHelper('upload', (app, selector, file, filename) => {
  const { findWithAssert, triggerEvent } = app.testHelpers;

  const input = findWithAssert(selector)[0];

  file.name = filename;

  // This hack is here since we can't mock out the
  // FileList API easily; we're taking advantage
  // that we can mutate the FileList DOM API at
  // runtime to allow us to push files into the <input>
  const files = [file];

  input.files.item = function(idx) {
    return files[idx];
  };

  input.files.size = files.length;

  return triggerEvent(selector, 'change');
});

export default function(selector, file, filename) {
  return upload(window || global, selector, file, filename);
}
