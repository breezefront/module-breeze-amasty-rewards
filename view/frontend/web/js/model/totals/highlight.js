define([
    'jquery',
    'uiComponent',
    'Magento_Checkout/js/model/totals',
    'mage/translate',
], function ($, Component, totals, $t) {
    'use strict';

    $.view('Amasty_Rewards/js/model/totals/highlight', {
        component: 'Amasty_Rewards/js/model/totals/highlight',
        defaults: {
            template: 'Amasty_Rewards/highlight',
            captionEndText: $t('for completing your purchase!'),
            captionStartText : $t('You can earn'),
            frontend_class: '',
            highlight: []
        },

        create: function () {
            this._super();
            this.initObservable();
        },

        /**
         * @return {Object}
         */
        initObservable: function () {
            this._super();
            this.observe(['highlight']);
            totals.totals.subscribe(this.getHighlightData.bind(this));

            return this;
        },

        /**
         * @param totals {Object}
         * @return {void}
         */
        getHighlightData: function (totals) {
            let totalsAttributes = totals.extension_attributes;

            if (totalsAttributes && totalsAttributes.amasty_rewards_highlight) {
                this.highlight(totalsAttributes.amasty_rewards_highlight);
            } else {
                this.highlight({'visible': false});
            }
        },
    });
});
