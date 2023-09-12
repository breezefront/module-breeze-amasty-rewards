define([
    'jquery',
    'uiComponent',
    'mage/translate'
], function ($, Component, $t) {
    'use strict';
    var xhr = null;
    var abortController = null;

    $.view('Amasty_Rewards/js/model/catalog/highlight-product', {
        component: 'Amasty_Rewards/js/model/catalog/highlight-product',
        defaults: {
            template: 'Amasty_Rewards/highlight',
            captionEndText: $t('for buying this product!'),
            captionStartText : $t('You can earn'),
            productId : 0,
            refreshUrl: false,
            loader: false,
            formSelector: '#product_addtocart_form',
            frontend_class: '',
            highlight: {
                visible: false
            }
        },

        create: function () {
            this._super();
            this.initObservable();
        },

        initObservable: function () {
            this._super();
            this.observe(['highlight', 'loader']);
            this.updateData();
            $(this.formSelector).on(
                'change.Amasty_Rewards__highlight-product',
                this.updateData.bind(this)
            );

            return this;
        },

        hide: function () {
            this.highlight({'visible':false});

            return this;
        },

        updateData: function () {
            if (xhr) {
                abortController.abort();
            }
            this.hide().loader(true);

            abortController = new AbortController();
            xhr = $.post(this.refreshUrl, {
                data: {
                    productId: this.productId,
                    attributes: $(this.formSelector).serialize()
                },
                signal: abortController.signal,
                done: function (result) {
                    if (result) {
                        this.highlight(result);
                    }
                }.bind(this),
                complete: function () {
                    this.loader(false);
                    xhr = null;
                    abortController = null;
                }.bind(this)
            });
        },

        destroy: function () {
            this._super();
            $(this.formSelector).off('change.Amasty_Rewards__highlight-product');
        }
    });
});