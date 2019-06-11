'use strict';

var WIZARD_NAMES = ['Иван', 'Хуан Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'];
var WIZARD_SURNAMES = ['да Марья', 'Верон', 'Мирабелла', 'Вальц', 'Онопко', 'Топольницкая', 'Нионго', 'Ирвинг'];
var COAT_COLORS = ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'];
var EYES_COLORS = ['black', 'red', 'blue', 'yellow', 'green'];

var getRandomNumber = function (min, max) {
  return Math.floor(Math.random() * (max - min) + min);
};

var renderWizard = function (wizard) {
  var wizardElement = similarWizardTemplate.cloneNode(true);
  wizardElement.querySelector('.setup-similar-label').textContent = wizard.name;
  wizardElement.querySelector('.wizard-coat').style.fill = wizard.coatColor;
  wizardElement.querySelector('.wizard-eyes').style.fill = wizard.eyesColor;
  return wizardElement;
};

var showBlock = function () {
  var userDialog = document.querySelector('.setup');
  userDialog.classList.remove('hidden');
  var similarListElement = userDialog.querySelector('.setup-similar-list');
  userDialog.querySelector('.setup-similar').classList.remove('hidden');
  return similarListElement;
};

var fillsWizard = function () {
  var wizards = [];
  for (var l = 0; l < 4; l++) {
    wizards[l] = {
      name: WIZARD_NAMES[getRandomNumber(0, 7)] + ' ' + WIZARD_SURNAMES[getRandomNumber(0, 7)],
      coatColor: COAT_COLORS[getRandomNumber(0, 5)],
      eyesColor: EYES_COLORS[getRandomNumber(0, 4)]
    };
  }
  return wizards;
};

var createWizard = function () {
  var fragment = document.createDocumentFragment();
  for (var i = 0; i < fillsWizard().length; i++) {
    fragment.appendChild(renderWizard(fillsWizard()[i]));
  }
  showBlock().appendChild(fragment);
};

var similarWizardTemplate = document
    .querySelector('#similar-wizard-template')
    .content
    .querySelector('.setup-similar-item');

createWizard();
