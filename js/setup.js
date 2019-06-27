'use strict';

(function () {
  var WIZARD_NAMES = ['Иван', 'Хуан Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'];
  var WIZARD_SURNAMES = ['да Марья', 'Верон', 'Мирабелла', 'Вальц', 'Онопко', 'Топольницкая', 'Нионго', 'Ирвинг'];
  var COAT_COLORS = ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'];
  var EYES_COLORS = ['black', 'red', 'blue', 'yellow', 'green'];
  var NUMBER_OF_WIZARDS = 4;
  var COLORS = {
    rgb: ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'],
    hex: ['#ee4830', '#30a8ee', '#5ce6c0', '#e848d5', '#e6e848'],
    default: ['red', 'black', 'blue', 'yellow', 'green']
  };
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
      name: WIZARD_NAMES[window.util.randomNumber(0, 7)] + ' ' + WIZARD_SURNAMES[window.util.randomNumber(0, 7)],
      coatColor: COAT_COLORS[window.util.randomNumber(0, 5)],
      eyesColor: EYES_COLORS[window.util.randomNumber(0, 4)]
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
    window.util.isEscEvent(evt, closePopup);
  };

  var openPopup = function () {
    setup.classList.remove('hidden');
    document.addEventListener('keydown', onPopupEscPress);
  };

  var closePopup = function () {
    setup.classList.add('hidden');
    document.removeEventListener('keydown', onPopupEscPress);
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
    window.util.isEnterEvent(evt, openPopup);
  });

  setupClose.addEventListener('click', function () {
    closePopup();
  });

  setupClose.addEventListener('keydown', function (evt) {
    window.util.isEnterEvent(evt, closePopup);
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
    window.util.isEnterEvent(evt, form.submit());
  });

  wizardCoat.addEventListener('click', function () {
    wizardCoat.style.fill = COLORS[Math.floor(COLORS.length * Math.random())];
  });

  wizardEyes.addEventListener('click', function () {
    wizardCoat.style.fill = COLORS[Math.floor(COLORS.length * Math.random())];
  });

  fireball.addEventListener('click', function () {
    fireball.style.backgroundColor = COLORS[Math.floor(COLORS.length * Math.random())];
  });

  window.colorize(wizardCoat, COLORS.rgb);
  window.colorize(wizardEyes, COLORS.default);
  window.colorize(fireball, COLORS.hex);
})();
