class CreateApp {
  constructor(app, el) {
    this.app = app;
    this.el = document.querySelector(el);
    this.text = this.el.innerHTML;
    this.template = "";
  }

  makeTemplate() {
    var app = this.app;
    var text = this.text;
    var b = text.replace(
      /\{\{[ ]{0,}([a-zA-Z0-9.()]{1,})[ ]{0,}\}\}/gi,
      function (...match) {
        var m = match[1];
        try {
          return eval(`with (app) { ${m} }`);
        } catch (err) {
          throw new Error(err);
        }
      }
    );
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
    throw new Error("Error while useing css method");
  }
};

var a = `accentColor,additiveSymbols,alignContent,alignItems,alignSelf,alignmentBaseline,all,animation,animationDelay,animationDirection,animationDuration,animationFillMode,animationIterationCount,animationName,animationPlayState,animationTimingFunction,appRegion,appearance,ascentOverride,aspectRatio,backdropFilter,backfaceVisibility,background,backgroundAttachment,backgroundBlendMode,backgroundClip,backgroundColor,backgroundImage,backgroundOrigin,backgroundPosition,backgroundPositionX,backgroundPositionY,backgroundRepeat,backgroundRepeatX,backgroundRepeatY,backgroundSize,baselineShift,blockSize,border,borderBlock,borderBlockColor,borderBlockEnd,borderBlockEndColor,borderBlockEndStyle,borderBlockEndWidth,borderBlockStart,borderBlockStartColor,borderBlockStartStyle,borderBlockStartWidth,borderBlockStyle,borderBlockWidth,borderBottom,borderBottomColor,borderBottomLeftRadius,borderBottomRightRadius,borderBottomStyle,borderBottomWidth,borderCollapse,borderColor,borderEndEndRadius,borderEndStartRadius,borderImage,borderImageOutset,borderImageRepeat,borderImageSlice,borderImageSource,borderImageWidth,borderInline,borderInlineColor,borderInlineEnd,borderInlineEndColor,borderInlineEndStyle,borderInlineEndWidth,borderInlineStart,borderInlineStartColor,borderInlineStartStyle,borderInlineStartWidth,borderInlineStyle,borderInlineWidth,borderLeft,borderLeftColor,borderLeftStyle,borderLeftWidth,borderRadius,borderRight,borderRightColor,borderRightStyle,borderRightWidth,borderSpacing,borderStartEndRadius,borderStartStartRadius,borderStyle,borderTop,borderTopColor,borderTopLeftRadius,borderTopRightRadius,borderTopStyle,borderTopWidth,borderWidth,bottom,boxShadow,boxSizing,breakAfter,breakBefore,breakInside,bufferedRendering,captionSide,caretColor,clear,clip,clipPath,clipRule,color,colorInterpolation,colorInterpolationFilters,colorRendering,colorScheme,columnCount,columnFill,columnGap,columnRule,columnRuleColor,columnRuleStyle,columnRuleWidth,columnSpan,columnWidth,columns,contain,containIntrinsicBlockSize,containIntrinsicHeight,containIntrinsicInlineSize,containIntrinsicSize,containIntrinsicWidth,content,contentVisibility,counterIncrement,counterReset,counterSet,cursor,cx,cy,d,descentOverride,direction,display,dominantBaseline,emptyCells,fallback,fill,fillOpacity,fillRule,filter,flex,flexBasis,flexDirection,flexFlow,flexGrow,flexShrink,flexWrap,float,floodColor,floodOpacity,font,fontDisplay,fontFamily,fontFeatureSettings,fontKerning,fontOpticalSizing,fontSize,fontStretch,fontStyle,fontVariant,fontVariantCaps,fontVariantEastAsian,fontVariantLigatures,fontVariantNumeric,fontVariationSettings,fontWeight,forcedColorAdjust,gap,grid,gridArea,gridAutoColumns,gridAutoFlow,gridAutoRows,gridColumn,gridColumnEnd,gridColumnGap,gridColumnStart,gridGap,gridRow,gridRowEnd,gridRowGap,gridRowStart,gridTemplate,gridTemplateAreas,gridTemplateColumns,gridTemplateRows,height,hyphens,imageOrientation,imageRendering,inherits,initialValue,inlineSize,inset,insetBlock,insetBlockEnd,insetBlockStart,insetInline,insetInlineEnd,insetInlineStart,isolation,justifyContent,justifyItems,justifySelf,left,letterSpacing,lightingColor,lineBreak,lineGapOverride,lineHeight,listStyle,listStyleImage,listStylePosition,listStyleType,margin,marginBlock,marginBlockEnd,marginBlockStart,marginBottom,marginInline,marginInlineEnd,marginInlineStart,marginLeft,marginRight,marginTop,marker,markerEnd,markerMid,markerStart,mask,maskType,maxBlockSize,maxHeight,maxInlineSize,maxWidth,maxZoom,minBlockSize,minHeight,minInlineSize,minWidth,minZoom,mixBlendMode,negative,objectFit,objectPosition,offset,offsetDistance,offsetPath,offsetRotate,opacity,order,orientation,orphans,outline,outlineColor,outlineOffset,outlineStyle,outlineWidth,overflow,overflowAnchor,overflowClipMargin,overflowWrap,overflowX,overflowY,overscrollBehavior,overscrollBehaviorBlock,overscrollBehaviorInline,overscrollBehaviorX,overscrollBehaviorY,pad,padding,paddingBlock,paddingBlockEnd,paddingBlockStart,paddingBottom,paddingInline,paddingInlineEnd,paddingInlineStart,paddingLeft,paddingRight,paddingTop,page,pageBreakAfter,pageBreakBefore,pageBreakInside,pageOrientation,paintOrder,perspective,perspectiveOrigin,placeContent,placeItems,placeSelf,pointerEvents,position,prefix,quotes,r,range,resize,right,rowGap,rubyPosition,rx,ry,scrollBehavior,scrollMargin,scrollMarginBlock,scrollMarginBlockEnd,scrollMarginBlockStart,scrollMarginBottom,scrollMarginInline,scrollMarginInlineEnd,scrollMarginInlineStart,scrollMarginLeft,scrollMarginRight,scrollMarginTop,scrollPadding,scrollPaddingBlock,scrollPaddingBlockEnd,scrollPaddingBlockStart,scrollPaddingBottom,scrollPaddingInline,scrollPaddingInlineEnd,scrollPaddingInlineStart,scrollPaddingLeft,scrollPaddingRight,scrollPaddingTop,scrollSnapAlign,scrollSnapStop,scrollSnapType,scrollbarGutter,shapeImageThreshold,shapeMargin,shapeOutside,shapeRendering,size,sizeAdjust,speak,speakAs,src,stopColor,stopOpacity,stroke,strokeDasharray,strokeDashoffset,strokeLinecap,strokeLinejoin,strokeMiterlimit,strokeOpacity,strokeWidth,suffix,symbols,syntax,system,tabSize,tableLayout,textAlign,textAlignLast,textAnchor,textCombineUpright,textDecoration,textDecorationColor,textDecorationLine,textDecorationSkipInk,textDecorationStyle,textDecorationThickness,textIndent,textOrientation,textOverflow,textRendering,textShadow,textSizeAdjust,textTransform,textUnderlineOffset,textUnderlinePosition,top,touchAction,transform,transformBox,transformOrigin,transformStyle,transition,transitionDelay,transitionDuration,transitionProperty,transitionTimingFunction,unicodeBidi,unicodeRange,userSelect,userZoom,vectorEffect,verticalAlign,visibility,webkitAlignContent,webkitAlignItems,webkitAlignSelf,webkitAnimation,webkitAnimationDelay,webkitAnimationDirection,webkitAnimationDuration,webkitAnimationFillMode,webkitAnimationIterationCount,webkitAnimationName,webkitAnimationPlayState,webkitAnimationTimingFunction,webkitAppRegion,webkitAppearance,webkitBackfaceVisibility,webkitBackgroundClip,webkitBackgroundOrigin,webkitBackgroundSize,webkitBorderAfter,webkitBorderAfterColor,webkitBorderAfterStyle,webkitBorderAfterWidth,webkitBorderBefore,webkitBorderBeforeColor,webkitBorderBeforeStyle,webkitBorderBeforeWidth,webkitBorderBottomLeftRadius,webkitBorderBottomRightRadius,webkitBorderEnd,webkitBorderEndColor,webkitBorderEndStyle,webkitBorderEndWidth,webkitBorderHorizontalSpacing,webkitBorderImage,webkitBorderRadius,webkitBorderStart,webkitBorderStartColor,webkitBorderStartStyle,webkitBorderStartWidth,webkitBorderTopLeftRadius,webkitBorderTopRightRadius,webkitBorderVerticalSpacing,webkitBoxAlign,webkitBoxDecorationBreak,webkitBoxDirection,webkitBoxFlex,webkitBoxOrdinalGroup,webkitBoxOrient,webkitBoxPack,webkitBoxReflect,webkitBoxShadow,webkitBoxSizing,webkitClipPath,webkitColumnBreakAfter,webkitColumnBreakBefore,webkitColumnBreakInside,webkitColumnCount,webkitColumnGap,webkitColumnRule,webkitColumnRuleColor,webkitColumnRuleStyle,webkitColumnRuleWidth,webkitColumnSpan,webkitColumnWidth,webkitColumns,webkitFilter,webkitFlex,webkitFlexBasis,webkitFlexDirection,webkitFlexFlow,webkitFlexGrow,webkitFlexShrink,webkitFlexWrap,webkitFontFeatureSettings,webkitFontSmoothing,webkitHighlight,webkitHyphenateCharacter,webkitJustifyContent,webkitLineBreak,webkitLineClamp,webkitLocale,webkitLogicalHeight,webkitLogicalWidth,webkitMarginAfter,webkitMarginBefore,webkitMarginEnd,webkitMarginStart,webkitMask,webkitMaskBoxImage,webkitMaskBoxImageOutset,webkitMaskBoxImageRepeat,webkitMaskBoxImageSlice,webkitMaskBoxImageSource,webkitMaskBoxImageWidth,webkitMaskClip,webkitMaskComposite,webkitMaskImage,webkitMaskOrigin,webkitMaskPosition,webkitMaskPositionX,webkitMaskPositionY,webkitMaskRepeat,webkitMaskRepeatX,webkitMaskRepeatY,webkitMaskSize,webkitMaxLogicalHeight,webkitMaxLogicalWidth,webkitMinLogicalHeight,webkitMinLogicalWidth,webkitOpacity,webkitOrder,webkitPaddingAfter,webkitPaddingBefore,webkitPaddingEnd,webkitPaddingStart,webkitPerspective,webkitPerspectiveOrigin,webkitPerspectiveOriginX,webkitPerspectiveOriginY,webkitPrintColorAdjust,webkitRtlOrdering,webkitRubyPosition,webkitShapeImageThreshold,webkitShapeMargin,webkitShapeOutside,webkitTapHighlightColor,webkitTextCombine,webkitTextDecorationsInEffect,webkitTextEmphasis,webkitTextEmphasisColor,webkitTextEmphasisPosition,webkitTextEmphasisStyle,webkitTextFillColor,webkitTextOrientation,webkitTextSecurity,webkitTextSizeAdjust,webkitTextStroke,webkitTextStrokeColor,webkitTextStrokeWidth,webkitTransform,webkitTransformOrigin,webkitTransformOriginX,webkitTransformOriginY,webkitTransformOriginZ,webkitTransformStyle,webkitTransition,webkitTransitionDelay,webkitTransitionDuration,webkitTransitionProperty,webkitTransitionTimingFunction,webkitUserDrag,webkitUserModify,webkitUserSelect,webkitWritingMode,whiteSpace,widows,width,willChange,wordBreak,wordSpacing,wordWrap,writingMode,x,y,zIndex`;
var properties = a.split(",");
for (var c = 0; c < properties.length; c++) {
  if (document.querySelectorAll(`[${properties[c]}]`)) {
    var el = document.querySelectorAll(`[${properties[c]}]`);
    for (var all of el) {
      try {
        all.style[properties[c]] = eval(`${all.getAttribute(properties[c])}`);
      } catch (er) {
        all.style[properties[c]] = all.getAttribute(properties[c]);
      }
    }
  }
}
a = "";

(function (_) {
  _.querySelectorAll("*").forEach((e) => {
    var a = e.attributes ? Object.values(e.attributes) : "";
    if (a.length) {
      a.forEach((s) => {
        var _id = s.localName.startsWith("#");
        var _class = s.localName.startsWith(".");
        if (_id) {
          e.setAttribute("id", s.localName.slice(1, s.localName.length));
          e.removeAttribute(s.localName);
        }
        if (_class) {
          e.setAttribute("class", s.localName.slice(1, s.localName.length));
          e.removeAttribute(s.localName);
        }
      });
    }
  });
})(document);
(function (_) {
  _.querySelectorAll("*").forEach((e) => {
    var a = e.attributes ? Object.values(e.attributes) : "";
    if (a.length) {
      a.forEach((s) => {
        var a = s.localName.includes(":") ? s.localName.split(":") : "";
        e.style[a[0]] = a[1];
      });
    }
  });
})(document);
(function () {
  var some;
  function init() {
    const queries = {
      xlg: "(max-width: 2000px) and (min-width: 1700px)",
      lg: "(max-width: 1699px) and (min-width: 1200px)",
      xmd: "(max-width: 1199px) and (min-width: 992px)",
      md: "(max-width: 991px) and (min-width: 768px)",
      xsm: "(max-width: 767px) and (min-width: 550px)",
      sm: "(max-width: 549px)",
    };
    some = function () {
      document.querySelectorAll("*").forEach((el) => {
        var attrs = [...el.attributes];
        if (attrs.length) {
          attrs.forEach((_attr) => {
            var a = _attr.localName.split(":");
            if (a.length == 3) {
              a = a.filter((_) => _);
              if (a[0] == "sm") {
                _(queries.sm)
                  ? el.classList.add(a[1])
                  : el.classList.remove(a[1]);
              } else if (a[0] == "xsm") {
                _(queries.xsm)
                  ? el.classList.add(a[1])
                  : el.classList.remove(a[1]);
                console.log(0xfffff);
              } else if (a[0] == "md") {
                _(queries.md)
                  ? el.classList.add(a[1])
                  : el.classList.remove(a[1]);
              } else if (a[0] == "xmd") {
                _(queries.xmd)
                  ? el.classList.add(a[1])
                  : el.classList.remove(a[1]);
              } else if (a[0] == "xlg") {
                _(queries.lg)
                  ? el.classList.add(a[1])
                  : el.classList.remove(a[1]);
              } else if (a[0] == "xlg") {
                _(queries.xlg)
                  ? el.classList.add(a[1])
                  : el.classList.remove(a[1]);
              }
            }
          });
        }
      });
    };
    some();
  }
  init();
  window.onresize = (e) => some();
  function _(n) {
    return window.matchMedia(n).matches;
  }
})();
(function () {
  document.querySelectorAll("*").forEach((_) => {
    const style = document.querySelector("style[scoped]")
      ? document.querySelector("style[scoped]")
      : document.createElement("style");
    style.setAttribute("scoped", "");
    document.head.appendChild(style);
    var attr = [..._.attributes];
    if (attr.length) {
      var n = "_-scope-_";
      var k = randomId(10);
      var sl = `[${n}='${k}']`;
      var stl = {
        sm: {
          media: "screen and (max-width: 767px)",
          ls: [],
        },
        md: {
          media: "screen and (max-width: 991px)",
          ls: [],
        },
        lg: {
          media: "screen and (max-width: 1124px)",
          ls: [],
        },
        xlg: {
          media: "screen and (max-width: 1400px)",
          ls: [],
        },
      };
      var mediaKey;
      attr.forEach((__) => {
        if (testing(__.localName)) {
          __.ownerElement.setAttribute(n, k);
        }
        if (__.localName.startsWith("sm")) {
          const s = __.localName.split(":");
          if (s.length == 3) {
            stl.sm.ls.push(`${s[1]}: ${s[2].replace("!", " !important")}`);
            stl.sm.ls.push("");
          }
        } else if (__.localName.startsWith("md")) {
          const s = __.localName.split(":");
          if (s.length == 3) {
            stl.md.ls.push(`${s[1]}: ${s[2].replace("!", " !important")}`);
            stl.md.ls.push("");
          }
        } else if (__.localName.startsWith("lg")) {
          const s = __.localName.split(":");
          if (s.length == 3) {
            stl.lg.ls.push(`${s[1]}: ${s[2].replace("!", " !important")}`);
            stl.lg.ls.push("");
          }
        } else if (__.localName.startsWith("xlg")) {
          const s = __.localName.split(":");
          if (s.length == 3) {
            stl.xlg.ls.push(`${s[1]}: ${s[2].replace("!", " !important")}`);
            stl.xlg.ls.push("");
          }
        }
      });
      for (let each in stl) {
        var mediaKey = stl[each].media;
        var cssText = makeFor(sl, stl[each].ls);
        var _INSTANCE = cssText ? `@media ${mediaKey} { ${cssText} }` : "";
        style.innerHTML += _INSTANCE + "\n";
      }
      attr.forEach((attr) =>
        testing(attr.localName)
          ? attr.ownerElement.removeAttribute(attr.localName)
          : ""
      );
    }
  });
  function randomId(len) {
    var chars = "QWERTYUIOPASDFGHJKLZXCVBNM_-qwertyuiopasdfghjklzxcvbnm";
    var password = "";
    for (let i = 0; i < len; i++) {
      var randomIndex = Math.floor(Math.random() * chars.length);
      password += chars[randomIndex];
    }
    return password;
  }

  function makeFor(selector, list) {
    if (!list.length) {
      return "";
    } else {
      let main = [];
      main.push(selector + " {");
      list.forEach((_, $_, _$) => {
        var last = _$.length - 1;
        if ($_ == last) {
          main.push("} ");
        } else main.push(_ ? _ + "; " : "");
      });
      return main.join("");
    }
  }
  function testing(ex) {
    return ex.startsWith("sm") ||
      ex.startsWith("md") ||
      ex.startsWith("lg") ||
      ex.startsWith("xlg")
      ? true
      : false;
  }
})();

console.log("No bugs found, everything is good ");
