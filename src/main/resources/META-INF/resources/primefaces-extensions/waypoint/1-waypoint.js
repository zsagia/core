/**
 * PrimeFaces Extensions Waypoint Widget.
 *
 * @author Oleg Varaksin
 */
PrimeFacesExt.widget.Waypoint = PrimeFaces.widget.BaseWidget.extend({

    /**
     * Initializes the widget.
     *
     * @param {object} cfg The widget configuration.
     */
    init:function (cfg) {
        this.cfg = cfg;
        this.id = cfg.id;
        this.target = PrimeFaces.expressions.SearchExpressionFacade.resolveComponentsAsSelector(this.cfg.target);
        
        if (this.cfg.context) {
            this.cfg.context = PrimeFaces.expressions.SearchExpressionFacade.resolveComponentsAsSelector(this.cfg.context);
        }
        
        this.destroy().create();

        delete this.cfg.target;

        this.removeScriptElement(this.id);
    },

    /**
     * Unbinds all event handlers and unregisters the waypoint(s) associated with these elements.
     */
    destroy:function () {
        this.target.waypoint('destroy');
        return this;
    },
    
    /**
     * Temporarily disables the waypoint callback function from firing. The waypoint can be re-enabled by calling enable.
     */
    disable:function () {
        this.target.waypoint('disable');
        return this;
    },
    
    /**
     * Re-enables a previously disabled waypoint.
     */
    enable:function () {
        this.target.waypoint('enable');
        return this;
    },

    /**
     * Creates the waypoint(s) again with the same handlers as for init. This method can be called after .destory().
     */
    create:function () {
        var _self = this;
        this.target.waypoint(function (direction) {
            _self.reached(direction, this);
        }, this.cfg);    
    },

    /**
     * Recalculates all waypoint positions.
     */
    refresh:function () {
        $.waypoints('refresh');
    },

    reached:function (dir, way) {
        var behavior = this.cfg.behaviors ? this.cfg.behaviors["reached"] : null;
        if (behavior) {
            var options = {
                params:[
                    {name:this.id + '_direction', value:dir},
                    {name:this.id + '_waypointId', value:$(way).attr('id')}
                ],
                direction:dir,
                waypoint:way
            };

            behavior.call(this, options);
        }
    }
});