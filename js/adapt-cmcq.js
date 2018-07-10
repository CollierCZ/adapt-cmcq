define([
    'coreJS/adapt',
    'components/adapt-contrib-mcq/js/adapt-contrib-mcq',
    'core/js/libraries/prism'
], function(Adapt, Mcq) {

    var Cmcq = Mcq.view.extend({

        events: {
            'focus .cmcq-item input': 'onItemFocus',
            'blur .cmcq-item input': 'onItemBlur',
            'change .cmcq-item input': 'onItemSelected',
            'keyup .cmcq-item input': 'onKeyPress'
        },

        onItemSelected: function(event) {

            var selectedItemObject = this.model.get('_items')[$(event.currentTarget).parent('.cmcq-item').index()];

            if (this.model.get('_isEnabled') && !this.model.get('_isSubmitted')) {
                this.toggleItemSelected(selectedItemObject, event);
            }

        },

        setupQuestion: function() {
            Mcq.view.prototype.setupQuestion.call(this);

            this.listenTo(Adapt, {
                'device:changed': this.resizeImage,
                'device:resize': this.onDeviceResize
            });

        },

        onQuestionRendered: function() {

            this.$('label').imageready(_.bind(function() {
                this.setReadyStatus();
            }, this));
            Prism.highlightAll();

        }

    }, {
        template: 'cmcq'
    });

    return Adapt.register("cmcq", {
        view: Cmcq,
        model: Mcq.model.extend({})
    });

});
