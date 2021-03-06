(function() {
  'use strict';

  window._ = {};

  // Returns whatever value is passed as the argument. This function doesn't
  // seem very useful, but remember it--if a function needs to provide an
  // iterator when the user does not pass one in, this will be handy.
  _.identity = function(val) {
    return val;
  };

  /**
   * COLLECTIONS
   * ===========
   *
   * In this section, we'll have a look at functions that operate on collections
   * of values; in JavaScript, a 'collection' is something that can contain a
   * number of values--either an array or an object.
   *
   *
   * IMPORTANT NOTE!
   * ===========
   *
   * The .first function is implemented for you, to help guide you toward success
   * in your work on the following functions. Whenever you see a portion of the
   * assignment pre-completed, be sure to read and understand it fully before
   * you proceed. Skipping this step will lead to considerably more difficulty
   * implementing the sections you are responsible for.
   */

  // Return an array of the first n elements of an array. If n is undefined,
  // return just the first element.
  _.first = function(array, n) {
    return n === undefined ? array[0] : array.slice(0, n);
  };

  // Like first, but for the last elements. If n is undefined, return just the
  // last element.
  _.last = function(array, n) {
    //To note the usage of Math.max to handle the case when n is > array.length
    return n === undefined ? array[array.length-1] : array.slice(Math.max(0, array.length-n));
  };

  // Call iterator(value, key, collection) for each element of collection.
  // Accepts both arrays and objects.
  //
  // Note: _.each does not have a return value, but rather simply runs the
  // iterator function over each item in the input collection.
  _.each = function(collection, iterator) {
    if(Array.isArray(collection)){
      for(var i = 0; i < collection.length; i++){
        iterator(collection[i], i, collection);
      }
    } else {
      for(var key in collection){
        iterator(collection[key], key, collection);
      }
    }
  };

  // Returns the index at which value can be found in the array, or -1 if value
  // is not present in the array.
  _.indexOf = function(array, target){
    // TIP: Here's an example of a function that needs to iterate, which we've
    // implemented for you. Instead of using a standard `for` loop, though,
    // it uses the iteration helper `each`, which you will need to write.
    var result = -1;

    _.each(array, function(item, index) {
      if (item === target && result === -1) {
        result = index;
      }
    });

    return result;
  };

  // Return all elements of an array that pass a truth test.
  _.filter = function(collection, test) {
    var filtered = [];

    _.each(collection, function(item, index){
      if(test(item)){
        filtered.push(item);
      }
    });

    return filtered;
  };

  // Return all elements of an array that don't pass a truth test.
  _.reject = function(collection, test) {
    // TIP: see if you can re-use _.filter() here, without simply
    // copying code in and modifying it

    return _.filter(collection, function(){
        return !test.apply(this, arguments);
      });
  };

  // Produce a duplicate-free version of the array.
  _.uniq = function(array) {
    array = array.sort(function(a, b){ return a > b;});
    var filtered = [];

    _.each(array, function(item, index){
      if(filtered.length === 0 || filtered[filtered.length-1] !== item){
        filtered.push(item);
      }
    });

    return filtered;
  };


  // Return the results of applying an iterator to each element.
  _.map = function(collection, iterator) {
    // map() is a useful primitive iteration function that works a lot
    // like each(), but in addition to running the operation on all
    // the members, it also maintains an array of results.
    var mapped = [];

    _.each(collection, function(item, index, array){
      mapped.push(iterator(item, index, array));
    })

    return mapped;
  };

  /*
   * TIP: map is really handy when you want to transform an array of
   * values into a new array of values. _.pluck() is solved for you
   * as an example of this.
   */

  // Takes an array of objects and returns and array of the values of
  // a certain property in it. E.g. take an array of people and return
  // an array of just their ages
  _.pluck = function(collection, key) {
    // TIP: map is really handy when you want to transform an array of
    // values into a new array of values. _.pluck() is solved for you
    // as an example of this.
    return _.map(collection, function(item){
      return item[key];
    });
  };

  // Reduces an array or object to a single value by repetitively calling
  // iterator(accumulator, item) for each item. accumulator should be
  // the return value of the previous iterator call.
  //  
  // You can pass in a starting value for the accumulator as the third argument
  // to reduce. If no starting value is passed, the first element is used as
  // the accumulator, and is never passed to the iterator. In other words, in
  // the case where a starting value is not passed, the iterator is not invoked
  // until the second element, with the first element as its second argument.
  //  
  // Example:
  //   var numbers = [1,2,3];
  //   var sum = _.reduce(numbers, function(total, number){
  //     return total + number;
  //   }, 0); // should be 6
  //  
  //   var identity = _.reduce([5], function(total, number){
  //     return total + number * number;
  //   }); // should be 5, regardless of the iterator function passed in
  //          No accumulator is given so the first element is used.
  _.reduce = function(collection, iterator, accumulator) {
    if(typeof collection === 'object' && !Array.isArray(collection)){
      collection = _.map(collection, function(item){
        return item;
      });
    }
    if(accumulator === undefined){
      accumulator = collection.shift();
    }
    _.each(collection, function(item, index, array){
      accumulator = iterator(accumulator, item, index);
    });

    return accumulator;
  };

  // Determine if the array or object contains a given value (using `===`).
  _.contains = function(collection, target) {
    // TIP: Many iteration problems can be most easily expressed in
    // terms of reduce(). Here's a freebie to demonstrate!
    return _.reduce(collection, function(wasFound, item) {
      if (wasFound) {
        return true;
      }
      return item === target;
    }, false);
  };


  // Determine whether all of the elements match a truth test.
  _.every = function(collection, iterator) {
    // TIP: Try re-using reduce() here.
    iterator = iterator || _.identity;
    return _.reduce(collection, function(isEvery, next, index){
      if(!isEvery){
        return false;
      }
      return Boolean(iterator(next, index));
    }, true);
  };

  // Determine whether any of the elements pass a truth test. If no iterator is
  // provided, provide a default one
  _.some = function(collection, iterator) {
    // TIP: There's a very clever way to re-use every() here.
    iterator = iterator || _.identity;
    return !_.every(collection, function(item, index){
      // This line flip the iterator test. In this way, the _.every function, stops
      // evaluating the elements after the first match
      return !iterator(item, index);
    });
  };

  _.someShort = function(collection, iterator){
    // Here the not-clever-but-fast solution
    // This solution relies on the _.find function (not requested in this exercise but
    // a standard underscore.js fn). The plus of this implementation is that it doesn't
    // cycle through all the collection but it returns at the first item passing the test
    // Personally i prefer this one :)

    iterator = iterator || _.identity;
    return _.find(collection, iterator) !== undefined ? true : false;
  };

  _.find = function(collection, iterator){
    if(Array.isArray(collection)){
      for(var i = 0; i < collection.length; i++){
        if(iterator(collection[i])){
          return collection[i];
        }
      }
    } else {
      for(var key in collection){
        if(iterator(collection[key])){
          return collection[key];
        }
      }
    }
    return undefined;
  }

  /**
   * OBJECTS
   * =======
   *
   * In this section, we'll look at a couple of helpers for merging objects.
   */

  // Extend a given object with all the properties of the passed in
  // object(s).
  //
  // Example:
  //   var obj1 = {key1: "something"};
  //   _.extend(obj1, {
  //     key2: "something new",
  //     key3: "something else new"
  //   }, {
  //     bla: "even more stuff"
  //   }); // obj1 now contains key1, key2, key3 and bla
  _.extend = function(obj) {
    _.each(arguments, function(item, key){
      if(typeof item === 'object'){
        _.each(item, function(val, key){
          obj[key] = val;
        });
      };
    });
    return obj;
  };

  // Like extend, but doesn't ever overwrite a key that already
  // exists in obj
  _.defaults = function(obj) {
    _.each(arguments, function(arg){
      if(typeof arg === 'object'){
        _.each(arg, function(value, key){
          obj[key] = obj[key] === undefined ? value : obj[key];
        });
      };
    });
    return obj;
  };


  /**
   * FUNCTIONS
   * =========
   *
   * Now we're getting into function decorators, which take in any function
   * and return out a new version of the function that works somewhat differently
   */

  // Return a function that can be called at most one time. Subsequent calls
  // should return the previously returned value.
  _.once = function(func) {
    // TIP: These variables are stored in a "closure scope" (worth researching),
    // so that they'll remain available to the newly-generated function every
    // time it's called.
    var alreadyCalled = false;
    var result;

    // TIP: We'll return a new function that delegates to the old one, but only
    // if it hasn't been called before.
    return function() {
      if (!alreadyCalled) {
        // TIP: .apply(this, arguments) is the standard way to pass on all of the
        // infromation from one function call to another.
        result = func.apply(this, arguments);
        alreadyCalled = true;
      }
      // The new function always returns the originally computed result.
      return result;
    };
  };

  // Memorize an expensive function's results by storing them. You may assume
  // that the function only takes primitives as arguments.
  // memoize could be renamed to oncePerUniqueArgumentList; memoize does the
  // same thing as once, but based on many sets of unique arguments.
  //
  // _.memoize should return a function that, when called, will check if it has
  // already computed the result for the given argument and return that value
  // instead if possible.
  _.memoize = function(func) {
    var arguments_saved = [];

    var checkArgs = function(args){
      var checked = {
        shouldExecute: undefined,
        indexMatched: undefined
      };

      checked.shouldExecute = !_.some(arguments_saved, function(arrayOfargs, index){
        checked.indexMatched = index;
        return _.every(arrayOfargs, function(arg, i){
          return _.indexOf(args, arg) === -1 ? true : false;
        });
      });
      return checked;
    };

    return function(){
      var args = Array.prototype.slice.call(arguments);
      var handle = checkArgs(args);
      if(handle.shouldExecute){
        var result = func.apply(null, args);
        arguments_saved.push({
          args: args,
          result: result
        });
        return result;
      } else {
        return arguments_saved[handle.indexMatched].result;
      }
    };
  };

  // Delays a function for the given number of milliseconds, and then calls
  // it with the arguments supplied.
  //
  // The arguments for the original function are passed after the wait
  // parameter. For example _.delay(someFunction, 500, 'a', 'b') will
  // call someFunction('a', 'b') after 500ms
  _.delay = function(func, wait) {
    var args = Array.prototype.slice.call(arguments, 2);
    setTimeout(function(){ 
      func.apply(null, args);
    }, wait);
  };


  /**
   * ADVANCED COLLECTION OPERATIONS
   * ==============================
   */

  // Randomizes the order of an array's contents.
  //
  // TIP: This function's test suite will ask that you not modify the original
  // input array. For a tip on how to make a copy of an array, see:
  // http://mdn.io/Array.prototype.slice
  _.shuffle = function(array) {
    var shuffled,
        areDifferent = false,
        rnd;

    var randomize = function(array, item){
      var doneRandomize = false;
      while(!doneRandomize ){
        rnd = Math.floor(Math.random()*array.length);
        if(shuffled[rnd] === undefined){
          shuffled[rnd] = item;
          doneRandomize = true;
        }
      }
    }

    var checkIfDifferent = function(original, shuffled){
      areDifferent = _.some(original, function(item, index){
        return item !== shuffled[index];
      });
    }
    while(!areDifferent){
      shuffled = [];
      _.each(array, function(item, index){
        randomize(array, item)
      });
      checkIfDifferent(array, shuffled);
    }
    return shuffled;
  };


  /**
   * EXTRA CREDIT
   * =================
   *
   * Note: This is the end of the pre-course curriculum. Feel free to continue,
   * but nothing beyond here is required.
   */

  // Calls the method named by functionOrKey on each value in the list.
  // Note: You will need to learn a bit about .apply to complete this.
  _.invoke = function(collection, functionOrKey, args) {
    return _.map(collection, function(value){
      if(typeof functionOrKey === 'function'){
        return functionOrKey.apply(value, args);
      } else {
        return value[functionOrKey]();
      }
    });
  };

  // Sort the object's values by a criterion produced by an iterator.
  // If iterator is a string, sort objects by that property with the name
  // of that string. For example, _.sortBy(people, 'name') should sort
  // an array of people by their name.
  _.sortBy = function(collection, iterator) {
    var applyIterator = function(value){
      if(typeof iterator === 'string'){
        return value[iterator];
      }
      return iterator(value);
    }

    return collection.sort(function(left, rigth){
      var a = applyIterator(left);
      var b = applyIterator(rigth);
      if(a !== b){
        if(a > b) return 1;
        if(a < b) return -1;
      }
    });
  };

  // Zip together two or more arrays with elements of the same index
  // going together.
  //
  // Example:
  // _.zip(['a','b','c','d'], [1,2,3]) returns [['a',1], ['b',2], ['c',3], ['d',undefined]]
  _.zip = function() {
    var findLongest = function(args){
      args = Array.prototype.slice.call(args);
      return _.reduce(args, function(longest, next){
        if(next.length > longest){
          return next.length;
        } else {
          return longest;
        }
      }, 0);
    };

    return function(args){
      var zipped = new Array(findLongest(args));
      return _.map(zipped, function(v, i){
        return _.pluck(args, i);
      });
    }(arguments);
  };

  // Takes a multidimensional array and converts it to a one-dimensional array.
  // The new array should contain all elements of the multidimensional array.
  //
  // Hint: Use Array.isArray to check if something is an array
  _.flatten = function(nestedArray, result) {
    result = result || [];

    return _.reduce(nestedArray, function(flattened, next){
      if(Array.isArray(next)){
        return _.flatten(next, flattened);
      } else {
        flattened.push(next);
        return flattened;
      }
    }, result);
  };

  // Takes an arbitrary number of arrays and produces an array that contains
  // every item shared between all the passed-in arrays.
  _.intersection = function() {
    var arrays = _.sortBy(Array.prototype.slice.call(arguments), 'length');
    var checkAgainst = arrays.shift();

    return _.reduce(checkAgainst, function(intersection, nextElement){
      var isShared = _.every(arrays, function(array){
        return _.indexOf(array, nextElement) === -1 ? false : true;
      });
      if(isShared){
        intersection.push(nextElement);
      }
      return intersection;
    }, []);
  };

  // Take the difference between one array and a number of other arrays.
  // Only the elements present in just the first array will remain.
  _.difference = function(array) {
    var arrays = Array.prototype.slice.call(arguments, 1);

    return _.reduce(array, function(diffentialArray, nextElement){
      var shouldBeAdded = _.some(arrays, function(arr){
        return _.indexOf(arr, nextElement) !== -1 ? true : false;
      });
      if(!shouldBeAdded){
        diffentialArray.push(nextElement);
      }
      return diffentialArray;
    }, []);
  };

  // Returns a function, that, when invoked, will only be triggered at most once
  // during a given window of time.  See the Underbar readme for extra details
  // on this function.
  //
  // Note: This is difficult! It may take a while to implement.
  _.throttle = function(func, wait) {
    // I am not sure that is working as expected, so if you want to review this piece
    // of code you are welcome :)
    var result = null,
        queued = null,
        timer = null;

    var startTimer = function(){
      timer = setTimeout(resume, wait);
    }

    var resume = function(){
      timer = null;
      if(queued){
        queued();
      }
      queued = null;
    }

    return function() {
      var args,
          toExecute;

      if(queued){
        return result;
      }

      args = [].slice.call(arguments);

      toExecute = function() {
        result = func.apply(null, args);
        startTimer();
      };

      if(!timer) {
        toExecute();
        queued = toExecute;
      }
      return result;
    }
  };
}());
