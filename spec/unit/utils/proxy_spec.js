var Proxy = require('../../../src/classes/utils/proxy');

describe('Proxy()', function() {
    var subject;
    beforeEach(function() {
        subject = Proxy();
    });

    it('constructs instances of a proxy which can be used in place of the *real* proxiedObject until the latter is ready', function() {
        expect(subject).not.toBeUndefined();
    });

    describe('setProxiedObject(proxiedObject)', function() {
        it('copies the named methods of proxiedObject to this object when proxiedObject is ready', function() {
            var a = 'a';
            var proxiedObject = {
                a: function() { return a; },
                b: function() { return this.a(); }
            }
            subject.setProxiedObject(proxiedObject);
            expect(subject.a()).toBe(a);
            expect(subject.b()).toBe(a);
        });
        it('removes the setProxiedObject from the API', function() {
            var proxiedObject = {}
            subject.setProxiedObject(proxiedObject);
            expect(subject.setProxiedObject).toBeUndefined();
        });
    });
});