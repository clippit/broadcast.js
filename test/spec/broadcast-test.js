/* global expect: false, describe: false, it: false */

(function () {
  'use strict';

  describe('broadcast.js test suite', function () {
    it('should support multiple subscribers', function () {
        var i = 0;
        broadcast.sub('test1', function() {
          i++;
        });
        broadcast.sub('test1', function() {
          i += 2;
        });
        broadcast.pub('test1');

        expect(i).toEqual(3);
    });

    it('should support unsubscribe', function () {
      var i = 0;
      var token = broadcast.sub('test2', function() {
        i++;
      });

      broadcast.pub('test2');
      expect(i).toEqual(1);

      expect(broadcast.unsub(token)).toBe(true);
      broadcast.pub('test2');
      expect(i).toEqual(1);
    });

    it('should support callback parameters', function() {
      broadcast.sub('test3', function(p1, p2) {
        expect(p1).toBe(true);
        expect(p2).toBe('ok');
      });

      broadcast.pub('test3', true, 'ok');
    });

    it('should support custom context', function() {
      var obj = {foo: 'bar'};

      broadcast.sub('test4', function() {
        expect(this).toBe(obj);
        expect(this.foo).toBe('bar');
      }, obj);

      broadcast.sub('test4', function() {
        expect(this).toBe(null);
      });

      broadcast.pub('test4');
    });
  });
})();
