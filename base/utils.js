var path = require("path");
var options;
try {
  options = require(path.resolve(process.cwd(), "./options.js"));
}
catch (e) {
  options = {
    path: "./index.html",
    root: "./",
    output: "/output"
  };
}
var { version } = require("../package.json");
const utils = {
  propToCss: function (_) {
    _.querySelectorAll("*").forEach((e) => {
      var list = e.attributes ? Object.values(e.attributes) : "";
      if (list) {
        list.forEach((attr) => {
          var attrName = attr.localName.split(":");
          if (attrName.length == 2) {
            var _ = attrName[0];
            var __ = attrName[1].replace(/_/g, " ");
            e.style[_] = __;
            e.removeAttribute(attrName.join(":"));
          }
        });
      }
    });
  },
  propToClass: function (_) {
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
            var _ = s.localName.replace(/[.]/g, " ");
            e.setAttribute("class", _.slice(1, s.localName.length));
            e.removeAttribute(s.localName);
          }
        });
      }
    });
  },
  propToMedia: function (__, $) {
    __.querySelectorAll("*").forEach((_) => {
      const style = __.createElement("style");
      var attr = [..._.attributes];
      if (attr.length) {
        var k = randomId(10);
        var sl = `.${k}`;
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
            __.ownerElement.classList.add(k);
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
          style.innerHTML += _INSTANCE;
          if (_INSTANCE) {
            $.push(_INSTANCE)
          }
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
  },
  propToStyle: function (_) {
    var CSS3PropertyNames = `accentColor,additiveSymbols,alignContent,alignItems,alignSelf,alignmentBaseline,all,animation,animationDelay,animationDirection,animationDuration,animationFillMode,animationIterationCount,animationName,animationPlayState,animationTimingFunction,appRegion,appearance,ascentOverride,aspectRatio,backdropFilter,backfaceVisibility,background,backgroundAttachment,backgroundBlendMode,backgroundClip,backgroundColor,backgroundImage,backgroundOrigin,backgroundPosition,backgroundPositionX,backgroundPositionY,backgroundRepeat,backgroundRepeatX,backgroundRepeatY,backgroundSize,baselineShift,blockSize,border,borderBlock,borderBlockColor,borderBlockEnd,borderBlockEndColor,borderBlockEndStyle,borderBlockEndWidth,borderBlockStart,borderBlockStartColor,borderBlockStartStyle,borderBlockStartWidth,borderBlockStyle,borderBlockWidth,borderBottom,borderBottomColor,borderBottomLeftRadius,borderBottomRightRadius,borderBottomStyle,borderBottomWidth,borderCollapse,borderColor,borderEndEndRadius,borderEndStartRadius,borderImage,borderImageOutset,borderImageRepeat,borderImageSlice,borderImageSource,borderImageWidth,borderInline,borderInlineColor,borderInlineEnd,borderInlineEndColor,borderInlineEndStyle,borderInlineEndWidth,borderInlineStart,borderInlineStartColor,borderInlineStartStyle,borderInlineStartWidth,borderInlineStyle,borderInlineWidth,borderLeft,borderLeftColor,borderLeftStyle,borderLeftWidth,borderRadius,borderRight,borderRightColor,borderRightStyle,borderRightWidth,borderSpacing,borderStartEndRadius,borderStartStartRadius,borderStyle,borderTop,borderTopColor,borderTopLeftRadius,borderTopRightRadius,borderTopStyle,borderTopWidth,borderWidth,bottom,boxShadow,boxSizing,breakAfter,breakBefore,breakInside,bufferedRendering,captionSide,caretColor,clear,clip,clipPath,clipRule,color,colorInterpolation,colorInterpolationFilters,colorRendering,colorScheme,columnCount,columnFill,columnGap,columnRule,columnRuleColor,columnRuleStyle,columnRuleWidth,columnSpan,columnWidth,columns,contain,containIntrinsicBlockSize,containIntrinsicHeight,containIntrinsicInlineSize,containIntrinsicSize,containIntrinsicWidth,content,contentVisibility,counterIncrement,counterReset,counterSet,cursor,cx,cy,d,descentOverride,direction,display,dominantBaseline,emptyCells,fallback,fill,fillOpacity,fillRule,filter,flex,flexBasis,flexDirection,flexFlow,flexGrow,flexShrink,flexWrap,float,floodColor,floodOpacity,font,fontDisplay,fontFamily,fontFeatureSettings,fontKerning,fontOpticalSizing,fontSize,fontStretch,fontStyle,fontVariant,fontVariantCaps,fontVariantEastAsian,fontVariantLigatures,fontVariantNumeric,fontVariationSettings,fontWeight,forcedColorAdjust,gap,grid,gridArea,gridAutoColumns,gridAutoFlow,gridAutoRows,gridColumn,gridColumnEnd,gridColumnGap,gridColumnStart,gridGap,gridRow,gridRowEnd,gridRowGap,gridRowStart,gridTemplate,gridTemplateAreas,gridTemplateColumns,gridTemplateRows,height,hyphens,imageOrientation,imageRendering,inherits,initialValue,inlineSize,inset,insetBlock,insetBlockEnd,insetBlockStart,insetInline,insetInlineEnd,insetInlineStart,isolation,justifyContent,justifyItems,justifySelf,left,letterSpacing,lightingColor,lineBreak,lineGapOverride,lineHeight,listStyle,listStyleImage,listStylePosition,listStyleType,margin,marginBlock,marginBlockEnd,marginBlockStart,marginBottom,marginInline,marginInlineEnd,marginInlineStart,marginLeft,marginRight,marginTop,marker,markerEnd,markerMid,markerStart,mask,maskType,maxBlockSize,maxHeight,maxInlineSize,maxWidth,maxZoom,minBlockSize,minHeight,minInlineSize,minWidth,minZoom,mixBlendMode,negative,objectFit,objectPosition,offset,offsetDistance,offsetPath,offsetRotate,opacity,order,orientation,orphans,outline,outlineColor,outlineOffset,outlineStyle,outlineWidth,overflow,overflowAnchor,overflowClipMargin,overflowWrap,overflowX,overflowY,overscrollBehavior,overscrollBehaviorBlock,overscrollBehaviorInline,overscrollBehaviorX,overscrollBehaviorY,pad,padding,paddingBlock,paddingBlockEnd,paddingBlockStart,paddingBottom,paddingInline,paddingInlineEnd,paddingInlineStart,paddingLeft,paddingRight,paddingTop,page,pageBreakAfter,pageBreakBefore,pageBreakInside,pageOrientation,paintOrder,perspective,perspectiveOrigin,placeContent,placeItems,placeSelf,pointerEvents,position,prefix,quotes,r,range,resize,right,rowGap,rubyPosition,rx,ry,scrollBehavior,scrollMargin,scrollMarginBlock,scrollMarginBlockEnd,scrollMarginBlockStart,scrollMarginBottom,scrollMarginInline,scrollMarginInlineEnd,scrollMarginInlineStart,scrollMarginLeft,scrollMarginRight,scrollMarginTop,scrollPadding,scrollPaddingBlock,scrollPaddingBlockEnd,scrollPaddingBlockStart,scrollPaddingBottom,scrollPaddingInline,scrollPaddingInlineEnd,scrollPaddingInlineStart,scrollPaddingLeft,scrollPaddingRight,scrollPaddingTop,scrollSnapAlign,scrollSnapStop,scrollSnapType,scrollbarGutter,shapeImageThreshold,shapeMargin,shapeOutside,shapeRendering,size,sizeAdjust,speak,speakAs,stopColor,stopOpacity,stroke,strokeDasharray,strokeDashoffset,strokeLinecap,strokeLinejoin,strokeMiterlimit,strokeOpacity,strokeWidth,suffix,symbols,syntax,system,tabSize,tableLayout,textAlign,textAlignLast,textAnchor,textCombineUpright,textDecoration,textDecorationColor,textDecorationLine,textDecorationSkipInk,textDecorationStyle,textDecorationThickness,textIndent,textOrientation,textOverflow,textRendering,textShadow,textSizeAdjust,textTransform,textUnderlineOffset,textUnderlinePosition,top,touchAction,transform,transformBox,transformOrigin,transformStyle,transition,transitionDelay,transitionDuration,transitionProperty,transitionTimingFunction,unicodeBidi,unicodeRange,userSelect,userZoom,vectorEffect,verticalAlign,visibility,webkitAlignContent,webkitAlignItems,webkitAlignSelf,webkitAnimation,webkitAnimationDelay,webkitAnimationDirection,webkitAnimationDuration,webkitAnimationFillMode,webkitAnimationIterationCount,webkitAnimationName,webkitAnimationPlayState,webkitAnimationTimingFunction,webkitAppRegion,webkitAppearance,webkitBackfaceVisibility,webkitBackgroundClip,webkitBackgroundOrigin,webkitBackgroundSize,webkitBorderAfter,webkitBorderAfterColor,webkitBorderAfterStyle,webkitBorderAfterWidth,webkitBorderBefore,webkitBorderBeforeColor,webkitBorderBeforeStyle,webkitBorderBeforeWidth,webkitBorderBottomLeftRadius,webkitBorderBottomRightRadius,webkitBorderEnd,webkitBorderEndColor,webkitBorderEndStyle,webkitBorderEndWidth,webkitBorderHorizontalSpacing,webkitBorderImage,webkitBorderRadius,webkitBorderStart,webkitBorderStartColor,webkitBorderStartStyle,webkitBorderStartWidth,webkitBorderTopLeftRadius,webkitBorderTopRightRadius,webkitBorderVerticalSpacing,webkitBoxAlign,webkitBoxDecorationBreak,webkitBoxDirection,webkitBoxFlex,webkitBoxOrdinalGroup,webkitBoxOrient,webkitBoxPack,webkitBoxReflect,webkitBoxShadow,webkitBoxSizing,webkitClipPath,webkitColumnBreakAfter,webkitColumnBreakBefore,webkitColumnBreakInside,webkitColumnCount,webkitColumnGap,webkitColumnRule,webkitColumnRuleColor,webkitColumnRuleStyle,webkitColumnRuleWidth,webkitColumnSpan,webkitColumnWidth,webkitColumns,webkitFilter,webkitFlex,webkitFlexBasis,webkitFlexDirection,webkitFlexFlow,webkitFlexGrow,webkitFlexShrink,webkitFlexWrap,webkitFontFeatureSettings,webkitFontSmoothing,webkitHighlight,webkitHyphenateCharacter,webkitJustifyContent,webkitLineBreak,webkitLineClamp,webkitLocale,webkitLogicalHeight,webkitLogicalWidth,webkitMarginAfter,webkitMarginBefore,webkitMarginEnd,webkitMarginStart,webkitMask,webkitMaskBoxImage,webkitMaskBoxImageOutset,webkitMaskBoxImageRepeat,webkitMaskBoxImageSlice,webkitMaskBoxImageSource,webkitMaskBoxImageWidth,webkitMaskClip,webkitMaskComposite,webkitMaskImage,webkitMaskOrigin,webkitMaskPosition,webkitMaskPositionX,webkitMaskPositionY,webkitMaskRepeat,webkitMaskRepeatX,webkitMaskRepeatY,webkitMaskSize,webkitMaxLogicalHeight,webkitMaxLogicalWidth,webkitMinLogicalHeight,webkitMinLogicalWidth,webkitOpacity,webkitOrder,webkitPaddingAfter,webkitPaddingBefore,webkitPaddingEnd,webkitPaddingStart,webkitPerspective,webkitPerspectiveOrigin,webkitPerspectiveOriginX,webkitPerspectiveOriginY,webkitPrintColorAdjust,webkitRtlOrdering,webkitRubyPosition,webkitShapeImageThreshold,webkitShapeMargin,webkitShapeOutside,webkitTapHighlightColor,webkitTextCombine,webkitTextDecorationsInEffect,webkitTextEmphasis,webkitTextEmphasisColor,webkitTextEmphasisPosition,webkitTextEmphasisStyle,webkitTextFillColor,webkitTextOrientation,webkitTextSecurity,webkitTextSizeAdjust,webkitTextStroke,webkitTextStrokeColor,webkitTextStrokeWidth,webkitTransform,webkitTransformOrigin,webkitTransformOriginX,webkitTransformOriginY,webkitTransformOriginZ,webkitTransformStyle,webkitTransition,webkitTransitionDelay,webkitTransitionDuration,webkitTransitionProperty,webkitTransitionTimingFunction,webkitUserDrag,webkitUserModify,webkitUserSelect,webkitWritingMode,whiteSpace,widows,width,willChange,wordBreak,wordSpacing,wordWrap,writingMode,x,y,zIndex`;
    var properties = CSS3PropertyNames.split(",");
    for (var c = 0; c < properties.length; c++) {
      if (_.querySelectorAll(`[${properties[c]}]`)) {
        var el = _.querySelectorAll(`[${properties[c]}]`);
        for (var all of el) {
          try {
            all.style[properties[c]] = eval(
              `${all.getAttribute(properties[c])}`
            );
          } catch (er) {
            all.style[properties[c]] = all.getAttribute(properties[c]);
          }
          if (!["width", "height", "fill", "stroke"].includes(properties[c])) {
            all.removeAttribute(properties[c]);
          }
        }
      }
    }
  },
  get root() {
    return path.dirname(require.main.filename);
  },
  get version() {
    return version;
  },
  get option() {
    return options;
  }
};

module.exports = utils;
