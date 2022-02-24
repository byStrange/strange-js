// All rights reserved authors https://telegra.ph/Authors-02-11-2
// Strange.js no copyright ® 2022.01.27  registered
// version 1.0
if (window === undefined) {
  console.log("Strangejs requires window and document");
}

function err(error_name, error_count) {
  return `Uncaught TypeError: Failed to execute ${error_name} on document: ${error_count} arguments required`;
}

function $(a, b) {
  var elem = document.querySelectorAll(a)[b];
  if (a !== undefined && b !== undefined) {
    return elem;
  } else if (a !== undefined && b == undefined) {
    return document.querySelector(a);
  } else {
    console.error(err("$", 2));
  }
}

function arrayContains(arr, val) {
  return arr.some(function (a) {
    return a === val;
  });
}

function getUnit(val) {
  var split =
    /[+-]?\d*\.?\d+(?:\.\d+)?(?:[eE][+-]?\d+)?(%|px|pt|em|rem|in|cm|mm|ex|ch|pc|vw|vh|vmin|vmax|deg|rad|turn)?$/.exec(
      val
    );
  if (split) {
    return split[1];
  }
}
class TimeEvery {
  constructor(num) {
    this.num = num;
  }

  seconds(callBack) {
    return setInterval(callBack, this.num * 1000);
  }
  milliSeconds(callBack) {
    return setInterval(callBack, this.num);
  }
  hours(callBack) {
    return setInterval(callBack, this.num * 3600 * 1000);
  }
  days(callBack) {
    return setInterval(callBack, this.num * 86400000);
  }
  minutes(callBack) {
    return setInterval(callBack, this.num * 60000);
  }
}

class TimeAfter {
  constructor(num) {
    this.num = num;
  }
  seconds(callBack) {
    return setTimeout(callBack, this.num * 1000);
  }
  milliSeconds(callBack) {
    return setTimeout(callBack, this.num);
  }
  hours(callBack) {
    return setTimeout(callBack, this.num * 3600 * 1000);
  }
  days(callBack) {
    return setTimeout(callBack, this.num * 86400000);
  }
  minutes(callBack) {
    return setTimeout(callBack, this.num * 60000);
  }
}

class SingleTimeEvery {
  constructor(num) {
    this.num = num;
  }
  second(callBack) {
    return setInterval(callBack, 1000);
  }
  milliSecond(callBack) {
    return setInterval(callBack, 1);
  }
  hour(callBack) {
    return setInterval(callBack, 3600 * 1000);
  }
  day(callBack) {
    return setInterval(callBack, 86400000);
  }
  minute(callBack) {
    return setInterval(callBack, 60000);
  }
}

class SingleTimeAfter {
  constructor(num) {
    this.num = num;
  }
  second(callBack) {
    return setTimeout(callBack, 1000);
  }
  minute(callBack) {
    return setTimeout(callBack, 60000);
  }
  milliSecond(callBack) {
    return setTimeout(callBack, 1);
  }
  hour(callBack) {
    return setTimeout(callBack, 3600 * 1000);
  }
  day(callBack) {
    return setTimeout(callBack, 86400000);
  }
}

const every = function (num) {
  if (num) {
    if (typeof num == "number") {
      return new TimeEvery(num);
    } else throw new Error("Expected time must be integer");
  } else return new SingleTimeEvery(num);
};

const after = function (num) {
  if (num) {
    if (typeof num == "number") {
      return new TimeAfter(num);
    } else throw new Error("Expected time must be integer");
  } else return new SingleTimeAfter(num);
};
function convertPxToUnit(el, value, unit) {
  var valueUnit = getUnit(value);
  if (arrayContains([unit, "deg", "rad", "turn"], valueUnit)) {
    return value;
  }
  var cached = cache.CSS[value + unit];
  if (!is.und(cached)) {
    return cached;
  }
  var baseline = 100;
  var tempEl = document.createElement(el.tagName);
  var parentEl =
    el.parentNode && el.parentNode !== document ? el.parentNode : document.body;
  parentEl.appendChild(tempEl);
  tempEl.style.position = "absolute";
  tempEl.style.width = baseline + unit;
  var factor = baseline / tempEl.offsetWidth;
  parentEl.removeChild(tempEl);
  var convertedUnit = factor * parseFloat(value);
  cache.CSS[value + unit] = convertedUnit;
  return convertedUnit;
}

function rgba(r, g, b, a) {
  var rgba = `rgba(${r},${g},${b},${a})`;
  if (r == undefined || g == undefined || b == undefined || a == undefined) {
    console.error(err("rgba", 4));
  } else if (a > 1) {
    console.error("alpha must be less than 1");
  } else {
    return rgba;
  }
}

function hexTorgba(hexValue) {
  var rgx = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
  var hex = hexValue.replace(rgx, function (m, r, g, b) {
    return r + r + g + g + b + b;
  });
  var rgb = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  var r = parseInt(rgb[1], 16);
  var g = parseInt(rgb[2], 16);
  var b = parseInt(rgb[3], 16);
  return "rgba(" + r + "," + g + "," + b + ",1)";
}

function hslToRgba(hslValue) {
  var hsl =
    /hsl\((\d+),\s*([\d.]+)%,\s*([\d.]+)%\)/g.exec(hslValue) ||
    /hsla\((\d+),\s*([\d.]+)%,\s*([\d.]+)%,\s*([\d.]+)\)/g.exec(hslValue);
  var h = parseInt(hsl[1], 10) / 360;
  var s = parseInt(hsl[2], 10) / 100;
  var l = parseInt(hsl[3], 10) / 100;
  var a = hsl[4] || 1;

  function hue2rgb(p, q, t) {
    if (t < 0) {
      t += 1;
    }
    if (t > 1) {
      t -= 1;
    }
    if (t < 1 / 6) {
      return p + (q - p) * 6 * t;
    }
    if (t < 1 / 2) {
      return q;
    }
    if (t < 2 / 3) {
      return p + (q - p) * (2 / 3 - t) * 6;
    }
    return p;
  }
  var r, g, b;
  if (s == 0) {
    r = g = b = l;
  } else {
    var q = l < 0.5 ? l * (1 + s) : l + s - l * s;
    var p = 2 * l - q;
    r = hue2rgb(p, q, h + 1 / 3);
    g = hue2rgb(p, q, h);
    b = hue2rgb(p, q, h - 1 / 3);
  }
  return "rgba(" + r * 255 + "," + g * 255 + "," + b * 255 + "," + a + ")";
}

function len(a) {
  if (this instanceof HTMLInputElement || this instanceof HTMLTextAreaElement) {
    return this.value.length;
  } else {
    return this.length;
  }
}
window.onload = function () {
  var comment = document.createComment("Code injected by Strange");
  document.body.appendChild(comment);
};

function setVariable() {
  var string = document.documentElement.innerHTML;
  var length = string.length;
  var regex = new RegExp(
    "[\\s\\r\\t\\n]*([a-z0-9\\-_]+)[\\s\\r\\t\\n]*=[\\s\\r\\t\\n]*(['\"])((?:\\\\\\2|(?!\\2).)*)\\2",
    "gi"
  );
  var attributes = {};
  while (match = regex.exec(string)) {
    attributes[match[1]] += match[3] + ",";
  }
    console.log(attributes)
  if (attributes.id) {
    var id = attributes.id;
    id = id.replace("undefined", "");id = id.replace(/ /g, '');
    id = id.split(",");
    id = id.filter(function(m) {return m;});
    for (var s = 0; s < id.length; s++) {
      window[`$${id[s]}`] = document.querySelector(`#${id[s]}`);
      window[`$${id[s]}s`] = document.querySelectorAll(`#${id[s]}`);
    }
  }
  if (attributes.class) {
    var className = attributes.class;
    className = className.replace("undefined", "");className = className.replace(/ /g, '')
    className = className.split(",");
    className = className.filter(function(f){return f;});
    for (var c = 0; c < className.length; c++) {
      window[`$_${className[c]}`] = document.querySelector(`.${className[c]}`);
      window[`$_${className[c]}s`] = document.querySelectorAll(
        `.${className[c]}`
      );
    }
  }
}
setVariable();

var is = {
  arr: function (a) {
    return Array.isArray(a);
  },
  obj: function (a) {
    return a.constructor.toString().indexOf("Object") > -1;
  },
  pth: function (a) {
    return is.obj(a) && a.hasOwnProperty("totalLength");
  },
  svg: function (a) {
    return a instanceof SVGElement;
  },
  inp: function (a) {
    return a instanceof HTMLInputElement;
  },
  dom: function (a) {
    return a.nodeType || is.svg(a);
  },
  str: function (a) {
    return typeof a === "string";
  },
  num: function (a) {
    return typeof a === "number";
  },
  fnc: function (a) {
    return typeof a === "function";
  },
  und: function (a) {
    return typeof a === "undefined";
  },
  nil: function (a) {
    return is.und(a) || a === null;
  },
  hex: function (a) {
    return /(^#[0-9A-F]{6}$)|(^#[0-9A-F]{3}$)/i.test(a);
  },
  rgb: function (a) {
    return /^rgb/.test(a);
  },
  hsl: function (a) {
    return /^hsl/.test(a);
  },
  col: function (a) {
    return is.hex(a) || is.rgb(a) || is.hsl(a);
  },
  key: function (a) {
    return (
      !defaultInstanceSettings.hasOwnProperty(a) &&
      !defaultTweenSettings.hasOwnProperty(a) &&
      a !== "targets" &&
      a !== "keyframes"
    );
  },
  email: function (a) {
    return /[a-z0-9][@][a-z0-9].[a-z]/.test(a);
  },
};

let floor = Math.floor

let round = Math.round;

let ceil = Math.ceil;


function pow(a, b) {
  if (a !== undefined && b !== undefined) {
    return Math.pow(a, b);
  } else if (a !== undefined || b !== undefined) {
    console.error(err("pow", 2));
  } else {
    return false || undefined || null;
  }
}

function random(min, max) {
  if (max == undefined && min == undefined) {
    return round(Math.random())
  } else if (max == undefined && min !== undefined) {
    return Math.random() * min;
  } else {
    return round(Math.random() * (max - min + 1) + min)
  }
}

function log(...x) {
  console.log(...x);
}

function error(...a) {
  console.error(...a);
}

function warn(...s) {
  console.warn(...s);
}

function kns(s) {
  var c = "";
  for (var as of s) {
    c += as;
  }
  return c;
}
HTMLElement.prototype.css = function css(s, v = 0) {
  if (s && v) {
    this.style[s] = v;
  } else if (s.constructor.toString().indexOf("Object") > -1) {
    for (var i in s) {
      this.style[i] = s[i];
    }
  } else if (s && v == 0) {
    st = window.getComputedStyle(this);
    return st[s];
  } else {
    console.error(err("css", "1"));
  }
};
HTMLElement.prototype.Add = function add(className) {
  if (this !== null && className !== undefined) {
    this.classList.add(className);
  } else {
    console.error(err("add", 2));
  }
};
HTMLElement.prototype.Remove = function remove(className) {
  if (this !== null && className !== undefined) {
    this.classList.remove(className);
  } else {
    console.error(err("remove", 2));
  }
};
HTMLElement.prototype.Toggle = function toggle(className) {
  if (this !== null && className !== undefined) {
    this.classList.toggle(className);
  } else {
    console.error(err("toggle", "2"));
  }
};
HTMLElement.prototype.len = len;
HTMLElement.prototype.attr = function attr(attr) {
  for (var a in attr) {
    this.setAttribute(a, attr[a]);
  }
};
HTMLElement.prototype.width = function () {
  return this.getBoundingClientRect().width;
};
HTMLElement.prototype.height = function () {
  return this.getBoundingClientRect().height;
};
HTMLElement.prototype.replace = function replace(tg) {
  this.innerHTML = this.textContent.replace(/[a-zA-z]/g, `<${tg}>$&</${tg}>`);
  var bugs = document.querySelectorAll(tg);
  for (var bad of bugs) {
    if (!bad.text()) bad.html("&nbsp");
  }
};
HTMLElement.prototype.on = function (op, cx) {
  try {
    if(is.obj(op)) {
	for (var i in op) {
  	    this['on'+i] = op[i]
        }
    }
    if (is.str(op)) {
      this[`on${op}`] = cx;
    }
    if (is.arr(op)) {
      var b = "";
      for (i = 0; i < op.length; i++) {
        b += op[i].replace(op[i], `on${op[i]}`) + ",";
      }
      ls = b.split(",");
      ls.pop();
      for (var c = 0; c < ls.length; c++) {
        this[ls[c]] = cx;
      }
    } else if (is.num(op) || is.num(cx) || is.str(cx) || is.arr(cx)) {
      error("First argument should be event and second one must be function ");
    }
    if (this == null || op == undefined) {
      warn("Cannot use events for null elements. DOM Error Not Found Element");
    }
  } catch (e) {}
};


class CreateApp {
    constructor(app, el) {
        this.app = app;
        this.el = document.querySelector(el);
        this.text = this.el.innerHTML;
        this.template = '';
   }

    makeTemplate() {
        var app = this.app;
        var text = this.text;
        var b = text.replace(/\{\{[ ]{0,}([a-zA-Z0-9.()]{1,})[ ]{0,}\}\}/gi, function (...match) {
            var m = match[1];
            try {
                return eval('app.' + m);
            } catch (err) {
                throw new Error(err);
            }
        });
        this.template = b;
    }
    render() {
        this.makeTemplate();
        this.el.innerHTML = this.template;
    }
   
}

function createApp(app, el) {
    return new CreateApp(app, el);
}

Array.prototype.mix = function () {
  var currentIndex = this.length,
    randomIndex;
  while (currentIndex != 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;
    [this[currentIndex], this[randomIndex]] = [
      this[randomIndex],
      this[currentIndex],
    ];
  }
  return this;
};
HTMLInputElement.prototype.readFile = function readFile() {
  /*readOnly*/
  if (this instanceof HTMLInputElement && /file/i.test(this.type)) {
    try {
      var r = new FileReader();
      var f = this.files[0];
      r.readAsText(f);
      r.onload = async function () {
        console.log(r.result);
      };
      r.onerror = function () {
        console.log("Error");
      };
    } catch (e) {
      warn("In first You have to choose at least one file\n"+  e);
    }
  } else if (!(this instanceof HTMLInputElement)) {
    console.warn("Element Must be input  element");
  } else if (/file/i.test(this.type)) {
    console.warn(`Input's type must be 'file'`);
  } else {
    console.warn(`Element must be Input Element and it's type must be 'file'`);
  }
};
HTMLInputElement.prototype.len = len;
HTMLElement.prototype.html = function html(html, o) {
  if (html && !o) {
    this.innerHTML = html;
  } else if (o) {
    this.innerHTML += html;
  } else return this.innerHTML;
};
HTMLElement.prototype.text = function text(text, o) {
  if (text && !o) {
    this.innerText = text;
  } else if (o) {
    this.innerText += text;
  } else {
    return this.innerText;
  }
};
HTMLElement.prototype.backdelete = function backdelete() {
  if (this instanceof HTMLInputElement || this instanceof HTMLTextAreaElement) {
    this.value = this.value.slice(0, this.value.length - 1);
  } else {
    this.innerText = this.textContent.slice(0, this.textContent.length - 1);
  }
};
HTMLElement.prototype.frontdelete = function frontdelete() {
  if (this instanceof HTMLInputElement || this instanceof HTMLTextAreaElement) {
    this.value = this.value.slice(
      this.value.length - this.value.length + 1,
      this.value.length
    );
  } else {
    this.innerText = this.textContent.slice(
      this.textContent.length - this.textContent.length + 1,
      this.textContent.length
    );
  }
};
var a = `accentColor,additiveSymbols,alignContent,alignItems,alignSelf,alignmentBaseline,all,animation,animationDelay,animationDirection,animationDuration,animationFillMode,animationIterationCount,animationName,animationPlayState,animationTimingFunction,appRegion,appearance,ascentOverride,aspectRatio,backdropFilter,backfaceVisibility,background,backgroundAttachment,backgroundBlendMode,backgroundClip,backgroundColor,backgroundImage,backgroundOrigin,backgroundPosition,backgroundPositionX,backgroundPositionY,backgroundRepeat,backgroundRepeatX,backgroundRepeatY,backgroundSize,baselineShift,blockSize,border,borderBlock,borderBlockColor,borderBlockEnd,borderBlockEndColor,borderBlockEndStyle,borderBlockEndWidth,borderBlockStart,borderBlockStartColor,borderBlockStartStyle,borderBlockStartWidth,borderBlockStyle,borderBlockWidth,borderBottom,borderBottomColor,borderBottomLeftRadius,borderBottomRightRadius,borderBottomStyle,borderBottomWidth,borderCollapse,borderColor,borderEndEndRadius,borderEndStartRadius,borderImage,borderImageOutset,borderImageRepeat,borderImageSlice,borderImageSource,borderImageWidth,borderInline,borderInlineColor,borderInlineEnd,borderInlineEndColor,borderInlineEndStyle,borderInlineEndWidth,borderInlineStart,borderInlineStartColor,borderInlineStartStyle,borderInlineStartWidth,borderInlineStyle,borderInlineWidth,borderLeft,borderLeftColor,borderLeftStyle,borderLeftWidth,borderRadius,borderRight,borderRightColor,borderRightStyle,borderRightWidth,borderSpacing,borderStartEndRadius,borderStartStartRadius,borderStyle,borderTop,borderTopColor,borderTopLeftRadius,borderTopRightRadius,borderTopStyle,borderTopWidth,borderWidth,bottom,boxShadow,boxSizing,breakAfter,breakBefore,breakInside,bufferedRendering,captionSide,caretColor,clear,clip,clipPath,clipRule,color,colorInterpolation,colorInterpolationFilters,colorRendering,colorScheme,columnCount,columnFill,columnGap,columnRule,columnRuleColor,columnRuleStyle,columnRuleWidth,columnSpan,columnWidth,columns,contain,containIntrinsicBlockSize,containIntrinsicHeight,containIntrinsicInlineSize,containIntrinsicSize,containIntrinsicWidth,content,contentVisibility,counterIncrement,counterReset,counterSet,cursor,cx,cy,d,descentOverride,direction,display,dominantBaseline,emptyCells,fallback,fill,fillOpacity,fillRule,filter,flex,flexBasis,flexDirection,flexFlow,flexGrow,flexShrink,flexWrap,float,floodColor,floodOpacity,font,fontDisplay,fontFamily,fontFeatureSettings,fontKerning,fontOpticalSizing,fontSize,fontStretch,fontStyle,fontVariant,fontVariantCaps,fontVariantEastAsian,fontVariantLigatures,fontVariantNumeric,fontVariationSettings,fontWeight,forcedColorAdjust,gap,grid,gridArea,gridAutoColumns,gridAutoFlow,gridAutoRows,gridColumn,gridColumnEnd,gridColumnGap,gridColumnStart,gridGap,gridRow,gridRowEnd,gridRowGap,gridRowStart,gridTemplate,gridTemplateAreas,gridTemplateColumns,gridTemplateRows,height,hyphens,imageOrientation,imageRendering,inherits,initialValue,inlineSize,inset,insetBlock,insetBlockEnd,insetBlockStart,insetInline,insetInlineEnd,insetInlineStart,isolation,justifyContent,justifyItems,justifySelf,left,letterSpacing,lightingColor,lineBreak,lineGapOverride,lineHeight,listStyle,listStyleImage,listStylePosition,listStyleType,margin,marginBlock,marginBlockEnd,marginBlockStart,marginBottom,marginInline,marginInlineEnd,marginInlineStart,marginLeft,marginRight,marginTop,marker,markerEnd,markerMid,markerStart,mask,maskType,maxBlockSize,maxHeight,maxInlineSize,maxWidth,maxZoom,minBlockSize,minHeight,minInlineSize,minWidth,minZoom,mixBlendMode,negative,objectFit,objectPosition,offset,offsetDistance,offsetPath,offsetRotate,opacity,order,orientation,orphans,outline,outlineColor,outlineOffset,outlineStyle,outlineWidth,overflow,overflowAnchor,overflowClipMargin,overflowWrap,overflowX,overflowY,overscrollBehavior,overscrollBehaviorBlock,overscrollBehaviorInline,overscrollBehaviorX,overscrollBehaviorY,pad,padding,paddingBlock,paddingBlockEnd,paddingBlockStart,paddingBottom,paddingInline,paddingInlineEnd,paddingInlineStart,paddingLeft,paddingRight,paddingTop,page,pageBreakAfter,pageBreakBefore,pageBreakInside,pageOrientation,paintOrder,perspective,perspectiveOrigin,placeContent,placeItems,placeSelf,pointerEvents,position,prefix,quotes,r,range,resize,right,rowGap,rubyPosition,rx,ry,scrollBehavior,scrollMargin,scrollMarginBlock,scrollMarginBlockEnd,scrollMarginBlockStart,scrollMarginBottom,scrollMarginInline,scrollMarginInlineEnd,scrollMarginInlineStart,scrollMarginLeft,scrollMarginRight,scrollMarginTop,scrollPadding,scrollPaddingBlock,scrollPaddingBlockEnd,scrollPaddingBlockStart,scrollPaddingBottom,scrollPaddingInline,scrollPaddingInlineEnd,scrollPaddingInlineStart,scrollPaddingLeft,scrollPaddingRight,scrollPaddingTop,scrollSnapAlign,scrollSnapStop,scrollSnapType,scrollbarGutter,shapeImageThreshold,shapeMargin,shapeOutside,shapeRendering,size,sizeAdjust,speak,speakAs,src,stopColor,stopOpacity,stroke,strokeDasharray,strokeDashoffset,strokeLinecap,strokeLinejoin,strokeMiterlimit,strokeOpacity,strokeWidth,suffix,symbols,syntax,system,tabSize,tableLayout,textAlign,textAlignLast,textAnchor,textCombineUpright,textDecoration,textDecorationColor,textDecorationLine,textDecorationSkipInk,textDecorationStyle,textDecorationThickness,textIndent,textOrientation,textOverflow,textRendering,textShadow,textSizeAdjust,textTransform,textUnderlineOffset,textUnderlinePosition,top,touchAction,transform,transformBox,transformOrigin,transformStyle,transition,transitionDelay,transitionDuration,transitionProperty,transitionTimingFunction,unicodeBidi,unicodeRange,userSelect,userZoom,vectorEffect,verticalAlign,visibility,webkitAlignContent,webkitAlignItems,webkitAlignSelf,webkitAnimation,webkitAnimationDelay,webkitAnimationDirection,webkitAnimationDuration,webkitAnimationFillMode,webkitAnimationIterationCount,webkitAnimationName,webkitAnimationPlayState,webkitAnimationTimingFunction,webkitAppRegion,webkitAppearance,webkitBackfaceVisibility,webkitBackgroundClip,webkitBackgroundOrigin,webkitBackgroundSize,webkitBorderAfter,webkitBorderAfterColor,webkitBorderAfterStyle,webkitBorderAfterWidth,webkitBorderBefore,webkitBorderBeforeColor,webkitBorderBeforeStyle,webkitBorderBeforeWidth,webkitBorderBottomLeftRadius,webkitBorderBottomRightRadius,webkitBorderEnd,webkitBorderEndColor,webkitBorderEndStyle,webkitBorderEndWidth,webkitBorderHorizontalSpacing,webkitBorderImage,webkitBorderRadius,webkitBorderStart,webkitBorderStartColor,webkitBorderStartStyle,webkitBorderStartWidth,webkitBorderTopLeftRadius,webkitBorderTopRightRadius,webkitBorderVerticalSpacing,webkitBoxAlign,webkitBoxDecorationBreak,webkitBoxDirection,webkitBoxFlex,webkitBoxOrdinalGroup,webkitBoxOrient,webkitBoxPack,webkitBoxReflect,webkitBoxShadow,webkitBoxSizing,webkitClipPath,webkitColumnBreakAfter,webkitColumnBreakBefore,webkitColumnBreakInside,webkitColumnCount,webkitColumnGap,webkitColumnRule,webkitColumnRuleColor,webkitColumnRuleStyle,webkitColumnRuleWidth,webkitColumnSpan,webkitColumnWidth,webkitColumns,webkitFilter,webkitFlex,webkitFlexBasis,webkitFlexDirection,webkitFlexFlow,webkitFlexGrow,webkitFlexShrink,webkitFlexWrap,webkitFontFeatureSettings,webkitFontSmoothing,webkitHighlight,webkitHyphenateCharacter,webkitJustifyContent,webkitLineBreak,webkitLineClamp,webkitLocale,webkitLogicalHeight,webkitLogicalWidth,webkitMarginAfter,webkitMarginBefore,webkitMarginEnd,webkitMarginStart,webkitMask,webkitMaskBoxImage,webkitMaskBoxImageOutset,webkitMaskBoxImageRepeat,webkitMaskBoxImageSlice,webkitMaskBoxImageSource,webkitMaskBoxImageWidth,webkitMaskClip,webkitMaskComposite,webkitMaskImage,webkitMaskOrigin,webkitMaskPosition,webkitMaskPositionX,webkitMaskPositionY,webkitMaskRepeat,webkitMaskRepeatX,webkitMaskRepeatY,webkitMaskSize,webkitMaxLogicalHeight,webkitMaxLogicalWidth,webkitMinLogicalHeight,webkitMinLogicalWidth,webkitOpacity,webkitOrder,webkitPaddingAfter,webkitPaddingBefore,webkitPaddingEnd,webkitPaddingStart,webkitPerspective,webkitPerspectiveOrigin,webkitPerspectiveOriginX,webkitPerspectiveOriginY,webkitPrintColorAdjust,webkitRtlOrdering,webkitRubyPosition,webkitShapeImageThreshold,webkitShapeMargin,webkitShapeOutside,webkitTapHighlightColor,webkitTextCombine,webkitTextDecorationsInEffect,webkitTextEmphasis,webkitTextEmphasisColor,webkitTextEmphasisPosition,webkitTextEmphasisStyle,webkitTextFillColor,webkitTextOrientation,webkitTextSecurity,webkitTextSizeAdjust,webkitTextStroke,webkitTextStrokeColor,webkitTextStrokeWidth,webkitTransform,webkitTransformOrigin,webkitTransformOriginX,webkitTransformOriginY,webkitTransformOriginZ,webkitTransformStyle,webkitTransition,webkitTransitionDelay,webkitTransitionDuration,webkitTransitionProperty,webkitTransitionTimingFunction,webkitUserDrag,webkitUserModify,webkitUserSelect,webkitWritingMode,whiteSpace,widows,width,willChange,wordBreak,wordSpacing,wordWrap,writingMode,x,y,zIndex`;
var properties = a.split(",");
for (var c = 0; c < properties.length; c++) {
    if (document.querySelectorAll(`[${properties[c]}]`)) {
    var el = document.querySelectorAll(`[${properties[c]}]`);
    for (var all of el) {
       all.style[properties[c]] = all.getAttribute(properties[c]);
    }
  }
}
a="";

Array.prototype.len = len;
String.prototype.mix = function mix(n) {
  var c = "";
  for (var as of this) {
    c += as;
  }
  var chars = c;
  if (n) {
    var passWordLength = n;
  } else {
      passWordLength = c.length;
  }
  var b = "";
  for (var i = 0; i < passWordLength; i++) {
    var randomNumber = Math.floor(Math.random() * chars.length);
    b += chars.substring(randomNumber, randomNumber - 1);
  }
  if (b.length < n) {
    f = n - b.length;
    for (r = 0; r < f; r++) {
      b += c.charAt(Math.round(Math.random() * n.length - 1));
    }
    return b;
  } else {
    return b;
  }
};

(function() {
    var p = document.createElement('div');
    var span = document.createElement('span');
    p.className = "popup"
    p.appendChild(span);
    document.body.appendChild(p);
    var pops = document.querySelectorAll('[popup]');
    pops.forEach(el => {
        el.style.cursor = "pointer"
        el.on('mouseenter', function () {
            p.style.display = "block";
           p.style.opacity = 1 ;
            p.style.transform = "translateY(0)" ;p.querySelector('span').text(this.getAttribute("popup"))
          p.style.left = this.offsetLeft - ( p.getBoundingClientRect().width - this.getBoundingClientRect().width) / 2 + 'px';
            p.style.top = this.offsetTop  + this.getBoundingClientRect().height + 10 + 'px';
        })
        el.on('mouseleave', function () {
            p.style.opacity = 0
            p.style.transform = "translateY(20px)";
            
        })
    })
})()

;(function(_){
	_.querySelectorAll('*').forEach( e => {
	var a = e.attributes ? Object.values(e.attributes) : '';
  if (a.length) {
    a.forEach(s => {
    	var _id = s.localName.startsWith('#')
      	var _class = s.localName.startsWith('.')		
      if (_id) {
      	e.setAttribute('id', s.localName.slice(1, s.localName.length))
        e.removeAttribute(s.localName)
      } 
      if (_class){
      	e.setAttribute('class', s.localName.slice(1, s.localName.length))
        e.removeAttribute(s.localName)
      }
    })
  }
})
})(document)

String.prototype.reverse = function () {
  return kns(this).split("").reverse().join("");
};
console.log("No bugs found, everything is good ");
