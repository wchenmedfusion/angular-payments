angular.module('angularPayments')

.factory('Cards', [function() {

    var defaultFormat = /(\d{1,4})/g;
    var defaultInputFormat = /(?:^|\s)(\d{4})$/;

    var cards = {
        DISCV: {
        type: 'discover',
        pattern: /^(6011|65|64[4-9]|622)/,
        format: defaultFormat,
        inputFormat: defaultInputFormat,
        length: [16],
        cvcLength: [3],
        luhn: true
      },
      MCARD: {
        type: 'mastercard',
        pattern: /^(5[1-5]|2[2-7])/,
        format: defaultFormat,
        inputFormat: defaultInputFormat,
        length: [16],
        cvcLength: [3],
        luhn: true
      },
      AMEX: {
        type: 'amex',
        pattern: /^3[47]/,
        format: /(\d{1,4})(\d{1,6})?(\d{1,5})?/,
        inputFormat: /^(\d{4}|\d{4}\s\d{6})$/,
        length: [15],
        cvcLength: [3, 4],
        luhn: true
      },
      VISA: {
        type: 'visa',
        pattern: /^4/,
        format: defaultFormat,
        inputFormat: defaultInputFormat,
        length: [13, 14, 15, 16],
        cvcLength: [3],
        luhn: true
      }
    };

  return {
      cards: [],
      setCards: function(cardTypes) {
        this.cards = [];
        for (var i = 0; i < cardTypes.length; i++) {
            if (cardTypes[i] in cards) {
                this.cards.push(cards[cardTypes[i]]);
            }
        }
      },
      fromNumber: function(num){
          var card, i, len;

          num = (num + '').replace(/\D/g, '');

          for (i = 0, len = this.cards.length; i < len; i++) {

            card = this.cards[i];

            if (card.pattern.test(num)) {
              return card;
            }

          }
      },
      fromType: function(type) {
          var card, i, len;

          for (i = 0, len = this.cards.length; i < len; i++) {

            card = this.cards[i];

            if (card.type === type) {
              return card;
            }

          }
      },
      defaultInputFormat: /(?:^|\s)(\d{4})$/
  }

}])
