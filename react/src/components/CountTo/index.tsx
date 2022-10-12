import React, { useState, useEffect } from 'react'
import { requestAnimationFrame, cancelAnimationFrame } from './requestAnimationFrame'

interface CountToProps {
  startVal: number,
  endVal: number,
  duration: number,
  autoplay?: boolean,
  callback?: () => void,
  decimals?: number,
  decimal?: string,
  separator?: string,
  prefix?: string,
  suffix?: string,
  useEasing?: boolean,
}

export const CountTo: React.FunctionComponent<CountToProps> = ({
  startVal,
  endVal,
  duration,
  autoplay,
  callback,
  decimals,
  decimal,
  separator,
  prefix,
  suffix,
  useEasing,
}) => {
  const _decimals = typeof decimals == 'undefined' ? 0 : decimals
  const _decimal = typeof decimal == 'undefined' ?'.' : decimal
  const _separator = typeof separator == 'undefined' ? ',' : separator
  const _prefix = typeof prefix == 'undefined' ? '' : prefix
  const _suffix = typeof suffix == 'undefined' ? '' : suffix
  const _useEasing = typeof useEasing == 'undefined' ? true : useEasing
  const easingFn = function(t, b, c, d) {
    return c * (-Math.pow(2, -10 * t / d) + 1) * 1024 / 1023 + b;
  }
  const _autoplay = autoplay !== false
  const isNumber = (val) => {
    return !isNaN(parseFloat(val))
  }
  const formatNumber = (num) => {
    num = num.toFixed(_decimals);
    num += '';
    const x = num.split('.');
    let x1 = x[0];
    const x2 = x.length > 1 ? _decimal + x[1] : '';
    const rgx = /(\d+)(\d{3})/;
    if (_separator && !isNumber(_separator)) {
      while (rgx.test(x1)) {
        x1 = x1.replace(rgx, '$1' + _separator + '$2');
      }
    }
    return _prefix + x1 + x2 + _suffix;
  }
  const [displayValue, setDisplayValue] = useState(formatNumber(startVal))
  const countDown = startVal > endVal
  useEffect(() => {
    if (!_autoplay) return
    const localStartVal = startVal;
    let startTime = null;
    let printVal = 0;
    const localDuration = duration;
    let rAF = null
    const count = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const progress = timestamp - startTime;

      if (_useEasing) {
        if (countDown) {
          printVal = localStartVal - easingFn(progress, 0, localStartVal - endVal, localDuration)
        } else {
          printVal = easingFn(progress, localStartVal, endVal - localStartVal, localDuration);
        }
      } else {
        if (countDown) {
          printVal = localStartVal - ((localStartVal - endVal) * (progress / localDuration));
        } else {
          printVal = localStartVal + (endVal - localStartVal) * (progress / localDuration);
        }
      }
      if (countDown) {
        printVal = printVal < endVal ? endVal : printVal;
      } else {
        printVal = printVal > endVal ? endVal : printVal;
      }

      const displayValue = formatNumber(printVal)
      setDisplayValue(displayValue)
      if (progress < localDuration) {
        rAF = requestAnimationFrame(count);
      } else {
        callback && callback()
      }
    }
    rAF = requestAnimationFrame(count)

    return () => {
      cancelAnimationFrame(rAF)
    }
  }, [startVal, endVal, autoplay])
  return (
    <>{displayValue}</>
  )
}