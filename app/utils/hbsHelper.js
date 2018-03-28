var helper = {
    section: function (name, block) {
        if (!this._sections) this._sections = {};
        this._sections[name] = block.fn(this);
        return null;
    },
    if_eq: function (v1, v2, opts) {
        if (v1 == v2)
            return opts.fn(this);
        else
            return opts.inverse(this);
    },
    if_neq: function (v1, v2, opts) {
        if (v1 != v2)
            return opts.fn(this);
        else
            return opts.inverse(this);
    },
    if_gt: function (v1, v2, opts) {
        if (v1 > v2)
            return opts.fn(this);
        else
            return opts.inverse(this);
    },
    if_egt: function (v1, v2, opts) {
        if (v1 >= v2)
            return opts.fn(this);
        else
            return opts.inverse(this);
    },
    if_lt: function (v1, v2, opts) {
        if (v1 < v2)
            return opts.fn(this);
        else
            return opts.inverse(this);
    },
    if_elt: function (v1, v2, opts) {
        if (v1 <= v2)
            return opts.fn(this);
        else
            return opts.inverse(this);
    }

}
module.exports = helper