/*
 * BinaryClock
 * https://github.com/noweverywhere/BinaryClock
 *
 * Copyright (c) 2012 Marinus Swanepoel
 * Licensed under the MIT license.
 * 
 */

//  Math.round(Date.now()/1000).toString(2)


var BinaryClock = function (options) {
  var millisecondsNow,
    millisecondsLeft;

  this.options = options || {};
  this.time = this.options.time || Date.now();
  this.updateInterval = this.options.updateInterval || 1000;


  this.init();

  this.start = function () {
    console.log(this);
    var Clock = this,
      run = function () {
        Clock.startfunction.apply(Clock);
      };
    return run;
  };

  if (this.options.delayStart !== true) {
    this.now = new Date();
    millisecondsNow = this.now.getMilliseconds();
    millisecondsLeft = 1000 - millisecondsNow;
    setTimeout(this.start(), millisecondsLeft);
  }
  
  return {
    el: this.el,
    $el: this.$el,
    start: this.start,
    stop: this.stop,
    update: this.update,
    string: this.string,
    clock: this
  };
};

BinaryClock.prototype.init = function () {
  var i = 0,
    bit;
  this.el = document.createElement('div');
  this.$el = $(this.el).attr({
    'class': 'binaryClock'
  });
  // loop over and create elements for all 32 bits that make
  // the unix timestamp
  for (i; i < 32; i += 1) {
    bit = $(document.createElement('span')).attr({
      'class': 'bit',
      'id': 'bit_' + i
    });
    // let's store each bit in the BinaryClock Object by it's id
    this['bit_' + i] = bit;
    this.$el.append(bit);
  }
};



BinaryClock.prototype.startfunction = function () {
  console.log('startfunction this:', this);
  var Clock = this,
    intervalFunction = function (){
    var runfunction = function (){
        Clock.update();
      };
    return runfunction;
  };
  this.interval = setInterval(intervalFunction(), 1000);
 // this.interval = setInterval(intervalFunction(), this.updateInterval);
};

BinaryClock.prototype.stop = function () {
  clearInterval(this.interval);
  this.interval = undefined;
};

BinaryClock.prototype.update = function () {
  var i = 0,
    bit;
  //console.log(this);
  this.time = Math.round(Date.now()/1000);
  
  this.string = this.time.toString(2);
  if (this.string.length < 32){
    this.string = '0' + this.string;
  }
  for (i; i < 32; i +=1 ) {
    bit = this['bit_' + i];
    if (this.string[i] === '1') {
      bit.removeClass('bit_off');
      bit.addClass('bit_on');
    } else {
      bit.removeClass('bit_on');
      bit.addClass('bit_off');
    }
  }
  //console.log(this)
  //$('body').append('<p>'+ this.string + '</p>')
};