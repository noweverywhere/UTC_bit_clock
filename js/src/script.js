var clock,
  makeMyBinaryClock = function () {
    clock = new BinaryClock();
    $('body').append(clock.el);
  };

$(makeMyBinaryClock);