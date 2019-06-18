'use strict';

var WIZARD_NAMES = ['Иван', 'Хуан Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'];
var WIZARD_SURNAMES = ['да Марья', 'Верон', 'Мирабелла', 'Вальц', 'Онопко', 'Топольницкая', 'Нионго', 'Ирвинг'];
var COAT_COLORS = ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'];
var EYES_COLORS = ['black', 'red', 'blue', 'yellow', 'green'];
var NUMBER_OF_WIZARDS = 4;
var WIZARD_COAT_COLORS = ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'];
var WIZARD_EYES_COLORS = ['black', 'red', 'blue', 'yellow', 'green'];
var FIREBALLS_COLORS = ['#ee4830', '#30a8ee', '#5ce6c0', '#e848d5', '#e6e848'];
var ESC_KEYCODE = 27;
var ENTER_KEYCODE = 13;
var setup = document.querySelector('.setup');
var setupOpen = document.querySelector('.setup-open');
var setupClose = setup.querySelector('.setup-close');
var setupUserName = setup.querySelector('.setup-user-name');
var setupSubmit = setup.querySelector('.setup-submit');
var form = setup.querySelector('.setup-wizard-form');
var wizard = setup.querySelector('.wizard');
var wizardCoat = wizard.querySelector('.wizard-coat');
var wizardEyes = wizard.querySelector('.wizard-eyes');
var fireball = setup.querySelector('.setup-fireball');

var getRandomNumber = function (min, max) {
  return Math.floor(Math.random() * (max - min) + min);
};

var renderWizard = function (wizardTemplate, similarWizard) {
  var wizardElement = wizardTemplate.cloneNode(true);
  wizardElement.querySelector('.setup-similar-label').textContent = similarWizard.name;
  wizardElement.querySelector('.wizard-coat').style.fill = similarWizard.coatColor;
  wizardElement.querySelector('.wizard-eyes').style.fill = similarWizard.eyesColor;
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

var createWizard = function (fragment, wizardTemplate, similarWizard) {
  fragment.appendChild(renderWizard(wizardTemplate, similarWizard));
};

var createWizards = function (wizardTemplate, userDialog, dataWizards) {
  var fragment = document.createDocumentFragment();
  for (var i = 0; i < dataWizards.length; i++) {
    createWizard(fragment, wizardTemplate, dataWizards[i]);
  }
  getSimilarListElement(userDialog).appendChild(fragment);
};

var onPopupEscPress = function (evt) {
  if (evt.keyCode === ESC_KEYCODE) {
    closePopup();
  }
};

var openPopup = function () {
  setup.classList.remove('hidden');
  document.addEventListener('keydown', onPopupEscPress);
};

var closePopup = function () {
  setup.classList.add('hidden');
  document.removeEventListener('keydown', onPopupEscPress);
};

var colorizeElement = function (element, wizardData) {
  if (element === fireball) {
    element.style.backgroundColor = wizardData[getRandomNumber(0, wizardData.length)];
  } else {
    element.style.fill = wizardData[getRandomNumber(0, wizardData.length)];
  }
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

if (!setup.classList.contains('hidden')) {
  document.addEventListener('keydown', onPopupEscPress);
}

setupOpen.addEventListener('click', function () {
  openPopup();
});

setupOpen.addEventListener('keydown', function (evt) {
  if (evt.keyCode === ENTER_KEYCODE) {
    openPopup();
  }
});

setupClose.addEventListener('click', function () {
  closePopup();
});

setupClose.addEventListener('keydown', function (evt) {
  if (evt.keyCode === ENTER_KEYCODE) {
    closePopup();
  }
});

setupUserName.addEventListener('focus', function () {
  document.removeEventListener('keydown', onPopupEscPress);
});

setupUserName.addEventListener('blur', function () {
  document.addEventListener('keydown', onPopupEscPress);
});

setupSubmit.addEventListener('click', function () {
  form.submit();
});

setupSubmit.addEventListener('focus', function (evt) {
  if (evt.keyCode === ENTER_KEYCODE) {
    form.submit();
  }
});

wizardCoat.addEventListener('click', function () {
  colorizeElement(wizardCoat, WIZARD_COAT_COLORS);
});

wizardEyes.addEventListener('click', function () {
  colorizeElement(wizardEyes, WIZARD_EYES_COLORS);
});

fireball.addEventListener('click', function () {
  colorizeElement(fireball, FIREBALLS_COLORS);
});
