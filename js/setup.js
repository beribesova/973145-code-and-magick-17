'use strict';

var WIZARD_NAMES = ['Иван', 'Хуан Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'];
var WIZARD_SURNAMES = ['да Марья', 'Верон', 'Мирабелла', 'Вальц', 'Онопко', 'Топольницкая', 'Нионго', 'Ирвинг'];
var COAT_COLORS = ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'];
var EYES_COLORS = ['black', 'red', 'blue', 'yellow', 'green'];
var NUMBER_OF_WIZARDS = 4;

var getRandomNumber = function (min, max) {
  return Math.floor(Math.random() * (max - min) + min);
};

var renderWizard = function (wizardTemplate, wizard) {
  var wizardElement = wizardTemplate.cloneNode(true);
  wizardElement.querySelector('.setup-similar-label').textContent = wizard.name;
  wizardElement.querySelector('.wizard-coat').style.fill = wizard.coatColor;
  wizardElement.querySelector('.wizard-eyes').style.fill = wizard.eyesColor;
  return wizardElement;
};

var getSimilarListElement = function (userDialog) {
  var similarListElement = userDialog.querySelector('.setup-similar-list');
  return similarListElement;
};

var showSimilarListElement = function (userDialog) {
  userDialog.querySelector('.setup-similar').classList.remove('hidden');
};

var getUserDialog = function () {
  var userDialog = document.querySelector('.setup');
  return userDialog;
};

var showUserDialog = function (userDialog) {
  userDialog.classList.remove('hidden');
};

var getWizardData = function () {
  var WizardData = {
    name: WIZARD_NAMES[getRandomNumber(0, 7)] + ' ' + WIZARD_SURNAMES[getRandomNumber(0, 7)],
    coatColor: COAT_COLORS[getRandomNumber(0, 5)],
    eyesColor: EYES_COLORS[getRandomNumber(0, 4)]
  };
  return WizardData;
};

var getWizards = function () {
  var wizards = [];
  for (var i = 0; i < NUMBER_OF_WIZARDS; i++) {
    wizards[i] = getWizardData();
  }
  return wizards;
};

var createWizard = function (fragment, wizardTemplate, wizard) {
  fragment.appendChild(renderWizard(wizardTemplate, wizard));
};

var createWizards = function (wizardTemplate, userDialog, dataWizards) {
  var fragment = document.createDocumentFragment();
  for (var i = 0; i < dataWizards.length; i++) {
    createWizard(fragment, wizardTemplate, dataWizards[i]);
  }
  getSimilarListElement(userDialog).appendChild(fragment);
};

var wizardTemplate = document
    .querySelector('#similar-wizard-template')
    .content
    .querySelector('.setup-similar-item');

var dataWizards = getWizards();
var userDialog = getUserDialog();
showUserDialog(userDialog);
showSimilarListElement(userDialog);
createWizards(wizardTemplate, userDialog, dataWizards);
