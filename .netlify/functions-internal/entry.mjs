import * as adapter from '@astrojs/netlify/netlify-functions.js';
import { escape } from 'html-escaper';
/* empty css                                *//* empty css                                  */import rss from '@astrojs/rss';
/* empty css                                   */import 'mime';
import 'cookie';
import 'kleur/colors';
import 'string-width';
import 'path-browserify';
import { compile } from 'path-to-regexp';

function baseCreateComponent(cb, moduleId) {
  cb.isAstroComponentFactory = true;
  cb.moduleId = moduleId;
  return cb;
}
function createComponentWithOptions(opts) {
  const cb = baseCreateComponent(opts.factory, opts.moduleId);
  cb.propagation = opts.propagation;
  return cb;
}
function createComponent(arg1, moduleId) {
  if (typeof arg1 === "function") {
    return baseCreateComponent(arg1, moduleId);
  } else {
    return createComponentWithOptions(arg1);
  }
}

const ASTRO_VERSION = "1.9.1";

function createDeprecatedFetchContentFn() {
  return () => {
    throw new Error("Deprecated: Astro.fetchContent() has been replaced with Astro.glob().");
  };
}
function createAstroGlobFn() {
  const globHandler = (importMetaGlobResult, globValue) => {
    let allEntries = [...Object.values(importMetaGlobResult)];
    if (allEntries.length === 0) {
      throw new Error(`Astro.glob(${JSON.stringify(globValue())}) - no matches found.`);
    }
    return Promise.all(allEntries.map((fn) => fn()));
  };
  return globHandler;
}
function createAstro(filePathname, _site, projectRootStr) {
  const site = _site ? new URL(_site) : void 0;
  const referenceURL = new URL(filePathname, `http://localhost`);
  const projectRoot = new URL(projectRootStr);
  return {
    site,
    generator: `Astro v${ASTRO_VERSION}`,
    fetchContent: createDeprecatedFetchContentFn(),
    glob: createAstroGlobFn(),
    resolve(...segments) {
      let resolved = segments.reduce((u, segment) => new URL(segment, u), referenceURL).pathname;
      if (resolved.startsWith(projectRoot.pathname)) {
        resolved = "/" + resolved.slice(projectRoot.pathname.length);
      }
      return resolved;
    }
  };
}

const escapeHTML = escape;
class HTMLString extends String {
  get [Symbol.toStringTag]() {
    return "HTMLString";
  }
}
const markHTMLString = (value) => {
  if (value instanceof HTMLString) {
    return value;
  }
  if (typeof value === "string") {
    return new HTMLString(value);
  }
  return value;
};
function isHTMLString(value) {
  return Object.prototype.toString.call(value) === "[object HTMLString]";
}

var idle_prebuilt_default = `(self.Astro=self.Astro||{}).idle=t=>{const e=async()=>{await(await t())()};"requestIdleCallback"in window?window.requestIdleCallback(e):setTimeout(e,200)},window.dispatchEvent(new Event("astro:idle"));`;

var load_prebuilt_default = `(self.Astro=self.Astro||{}).load=a=>{(async()=>await(await a())())()},window.dispatchEvent(new Event("astro:load"));`;

var media_prebuilt_default = `(self.Astro=self.Astro||{}).media=(s,a)=>{const t=async()=>{await(await s())()};if(a.value){const e=matchMedia(a.value);e.matches?t():e.addEventListener("change",t,{once:!0})}},window.dispatchEvent(new Event("astro:media"));`;

var only_prebuilt_default = `(self.Astro=self.Astro||{}).only=t=>{(async()=>await(await t())())()},window.dispatchEvent(new Event("astro:only"));`;

var visible_prebuilt_default = `(self.Astro=self.Astro||{}).visible=(s,c,n)=>{const r=async()=>{await(await s())()};let i=new IntersectionObserver(e=>{for(const t of e)if(!!t.isIntersecting){i.disconnect(),r();break}});for(let e=0;e<n.children.length;e++){const t=n.children[e];i.observe(t)}},window.dispatchEvent(new Event("astro:visible"));`;

var astro_island_prebuilt_default = `var l;{const c={0:t=>t,1:t=>JSON.parse(t,o),2:t=>new RegExp(t),3:t=>new Date(t),4:t=>new Map(JSON.parse(t,o)),5:t=>new Set(JSON.parse(t,o)),6:t=>BigInt(t),7:t=>new URL(t),8:t=>new Uint8Array(JSON.parse(t)),9:t=>new Uint16Array(JSON.parse(t)),10:t=>new Uint32Array(JSON.parse(t))},o=(t,s)=>{if(t===""||!Array.isArray(s))return s;const[e,n]=s;return e in c?c[e](n):void 0};customElements.get("astro-island")||customElements.define("astro-island",(l=class extends HTMLElement{constructor(){super(...arguments);this.hydrate=()=>{if(!this.hydrator||this.parentElement&&this.parentElement.closest("astro-island[ssr]"))return;const s=this.querySelectorAll("astro-slot"),e={},n=this.querySelectorAll("template[data-astro-template]");for(const r of n){const i=r.closest(this.tagName);!i||!i.isSameNode(this)||(e[r.getAttribute("data-astro-template")||"default"]=r.innerHTML,r.remove())}for(const r of s){const i=r.closest(this.tagName);!i||!i.isSameNode(this)||(e[r.getAttribute("name")||"default"]=r.innerHTML)}const a=this.hasAttribute("props")?JSON.parse(this.getAttribute("props"),o):{};this.hydrator(this)(this.Component,a,e,{client:this.getAttribute("client")}),this.removeAttribute("ssr"),window.removeEventListener("astro:hydrate",this.hydrate),window.dispatchEvent(new CustomEvent("astro:hydrate"))}}connectedCallback(){!this.hasAttribute("await-children")||this.firstChild?this.childrenConnectedCallback():new MutationObserver((s,e)=>{e.disconnect(),this.childrenConnectedCallback()}).observe(this,{childList:!0})}async childrenConnectedCallback(){window.addEventListener("astro:hydrate",this.hydrate);let s=this.getAttribute("before-hydration-url");s&&await import(s),this.start()}start(){const s=JSON.parse(this.getAttribute("opts")),e=this.getAttribute("client");if(Astro[e]===void 0){window.addEventListener(\`astro:\${e}\`,()=>this.start(),{once:!0});return}Astro[e](async()=>{const n=this.getAttribute("renderer-url"),[a,{default:r}]=await Promise.all([import(this.getAttribute("component-url")),n?import(n):()=>()=>{}]),i=this.getAttribute("component-export")||"default";if(!i.includes("."))this.Component=a[i];else{this.Component=a;for(const d of i.split("."))this.Component=this.Component[d]}return this.hydrator=r,this.hydrate},s,this)}attributeChangedCallback(){this.hydrator&&this.hydrate()}},l.observedAttributes=["props"],l))}`;

function determineIfNeedsHydrationScript(result) {
  if (result._metadata.hasHydrationScript) {
    return false;
  }
  return result._metadata.hasHydrationScript = true;
}
const hydrationScripts = {
  idle: idle_prebuilt_default,
  load: load_prebuilt_default,
  only: only_prebuilt_default,
  media: media_prebuilt_default,
  visible: visible_prebuilt_default
};
function determinesIfNeedsDirectiveScript(result, directive) {
  if (result._metadata.hasDirectives.has(directive)) {
    return false;
  }
  result._metadata.hasDirectives.add(directive);
  return true;
}
function getDirectiveScriptText(directive) {
  if (!(directive in hydrationScripts)) {
    throw new Error(`Unknown directive: ${directive}`);
  }
  const directiveScriptText = hydrationScripts[directive];
  return directiveScriptText;
}
function getPrescripts(type, directive) {
  switch (type) {
    case "both":
      return `<style>astro-island,astro-slot{display:contents}</style><script>${getDirectiveScriptText(directive) + astro_island_prebuilt_default}<\/script>`;
    case "directive":
      return `<script>${getDirectiveScriptText(directive)}<\/script>`;
  }
  return "";
}

const headAndContentSym = Symbol.for("astro.headAndContent");
function isHeadAndContent(obj) {
  return typeof obj === "object" && !!obj[headAndContentSym];
}

function serializeListValue(value) {
  const hash = {};
  push(value);
  return Object.keys(hash).join(" ");
  function push(item) {
    if (item && typeof item.forEach === "function")
      item.forEach(push);
    else if (item === Object(item))
      Object.keys(item).forEach((name) => {
        if (item[name])
          push(name);
      });
    else {
      item = item === false || item == null ? "" : String(item).trim();
      if (item) {
        item.split(/\s+/).forEach((name) => {
          hash[name] = true;
        });
      }
    }
  }
}
function isPromise(value) {
  return !!value && typeof value === "object" && typeof value.then === "function";
}

var _a$1;
const renderTemplateResultSym = Symbol.for("astro.renderTemplateResult");
class RenderTemplateResult {
  constructor(htmlParts, expressions) {
    this[_a$1] = true;
    this.htmlParts = htmlParts;
    this.error = void 0;
    this.expressions = expressions.map((expression) => {
      if (isPromise(expression)) {
        return Promise.resolve(expression).catch((err) => {
          if (!this.error) {
            this.error = err;
            throw err;
          }
        });
      }
      return expression;
    });
  }
  get [(_a$1 = renderTemplateResultSym, Symbol.toStringTag)]() {
    return "AstroComponent";
  }
  async *[Symbol.asyncIterator]() {
    const { htmlParts, expressions } = this;
    for (let i = 0; i < htmlParts.length; i++) {
      const html = htmlParts[i];
      const expression = expressions[i];
      yield markHTMLString(html);
      yield* renderChild(expression);
    }
  }
}
function isRenderTemplateResult(obj) {
  return typeof obj === "object" && !!obj[renderTemplateResultSym];
}
async function* renderAstroTemplateResult(component) {
  for await (const value of component) {
    if (value || value === 0) {
      for await (const chunk of renderChild(value)) {
        switch (chunk.type) {
          case "directive": {
            yield chunk;
            break;
          }
          default: {
            yield markHTMLString(chunk);
            break;
          }
        }
      }
    }
  }
}
function renderTemplate(htmlParts, ...expressions) {
  return new RenderTemplateResult(htmlParts, expressions);
}

function isAstroComponentFactory(obj) {
  return obj == null ? false : obj.isAstroComponentFactory === true;
}
async function renderToString(result, componentFactory, props, children) {
  const factoryResult = await componentFactory(result, props, children);
  if (factoryResult instanceof Response) {
    const response = factoryResult;
    throw response;
  }
  let parts = new HTMLParts();
  const templateResult = isHeadAndContent(factoryResult) ? factoryResult.content : factoryResult;
  for await (const chunk of renderAstroTemplateResult(templateResult)) {
    parts.append(chunk, result);
  }
  return parts.toString();
}
function isAPropagatingComponent(result, factory) {
  let hint = factory.propagation || "none";
  if (factory.moduleId && result.propagation.has(factory.moduleId) && hint === "none") {
    hint = result.propagation.get(factory.moduleId);
  }
  return hint === "in-tree" || hint === "self";
}

const defineErrors = (errs) => errs;
const AstroErrorData = defineErrors({
  UnknownCompilerError: {
    title: "Unknown compiler error.",
    code: 1e3
  },
  StaticRedirectNotAvailable: {
    title: "`Astro.redirect` is not available in static mode.",
    code: 3001,
    message: "Redirects are only available when using `output: 'server'`. Update your Astro config if you need SSR features.",
    hint: "See https://docs.astro.build/en/guides/server-side-rendering/#enabling-ssr-in-your-project for more information on how to enable SSR."
  },
  ClientAddressNotAvailable: {
    title: "`Astro.clientAddress` is not available in current adapter.",
    code: 3002,
    message: (adapterName) => `\`Astro.clientAddress\` is not available in the \`${adapterName}\` adapter. File an issue with the adapter to add support.`
  },
  StaticClientAddressNotAvailable: {
    title: "`Astro.clientAddress` is not available in static mode.",
    code: 3003,
    message: "`Astro.clientAddress` is only available when using `output: 'server'`. Update your Astro config if you need SSR features.",
    hint: "See https://docs.astro.build/en/guides/server-side-rendering/#enabling-ssr-in-your-project for more information on how to enable SSR."
  },
  NoMatchingStaticPathFound: {
    title: "No static path found for requested path.",
    code: 3004,
    message: (pathName) => `A \`getStaticPaths()\` route pattern was matched, but no matching static path was found for requested path \`${pathName}\`.`,
    hint: (possibleRoutes) => `Possible dynamic routes being matched: ${possibleRoutes.join(", ")}.`
  },
  OnlyResponseCanBeReturned: {
    title: "Invalid type returned by Astro page.",
    code: 3005,
    message: (route, returnedValue) => `Route \`${route ? route : ""}\` returned a \`${returnedValue}\`. Only a [Response](https://developer.mozilla.org/en-US/docs/Web/API/Response) can be returned from Astro files.`,
    hint: "See https://docs.astro.build/en/guides/server-side-rendering/#response for more information."
  },
  MissingMediaQueryDirective: {
    title: "Missing value for `client:media` directive.",
    code: 3006,
    message: 'Media query not provided for `client:media` directive. A media query similar to `client:media="(max-width: 600px)"` must be provided'
  },
  NoMatchingRenderer: {
    title: "No matching renderer found.",
    code: 3007,
    message: (componentName, componentExtension, plural, validRenderersCount) => `Unable to render \`${componentName}\`.

${validRenderersCount > 0 ? `There ${plural ? "are." : "is."} ${validRenderersCount} renderer${plural ? "s." : ""} configured in your \`astro.config.mjs\` file,
but ${plural ? "none were." : "it was not."} able to server-side render \`${componentName}\`.` : `No valid renderer was found ${componentExtension ? `for the \`.${componentExtension}\` file extension.` : `for this file extension.`}`}`,
    hint: (probableRenderers) => `Did you mean to enable the ${probableRenderers} integration?

See https://docs.astro.build/en/core-concepts/framework-components/ for more information on how to install and configure integrations.`
  },
  NoClientEntrypoint: {
    title: "No client entrypoint specified in renderer.",
    code: 3008,
    message: (componentName, clientDirective, rendererName) => `\`${componentName}\` component has a \`client:${clientDirective}\` directive, but no client entrypoint was provided by \`${rendererName}\`.`,
    hint: "See https://docs.astro.build/en/reference/integrations-reference/#addrenderer-option for more information on how to configure your renderer."
  },
  NoClientOnlyHint: {
    title: "Missing hint on client:only directive.",
    code: 3009,
    message: (componentName) => `Unable to render \`${componentName}\`. When using the \`client:only\` hydration strategy, Astro needs a hint to use the correct renderer.`,
    hint: (probableRenderers) => `Did you mean to pass \`client:only="${probableRenderers}"\`? See https://docs.astro.build/en/reference/directives-reference/#clientonly for more information on client:only`
  },
  InvalidGetStaticPathParam: {
    title: "Invalid value returned by a `getStaticPaths` path.",
    code: 3010,
    message: (paramType) => `Invalid params given to \`getStaticPaths\` path. Expected an \`object\`, got \`${paramType}\``,
    hint: "See https://docs.astro.build/en/reference/api-reference/#getstaticpaths for more information on getStaticPaths."
  },
  InvalidGetStaticPathsReturn: {
    title: "Invalid value returned by getStaticPaths.",
    code: 3011,
    message: (returnType) => `Invalid type returned by \`getStaticPaths\`. Expected an \`array\`, got \`${returnType}\``,
    hint: "See https://docs.astro.build/en/reference/api-reference/#getstaticpaths for more information on getStaticPaths."
  },
  GetStaticPathsRemovedRSSHelper: {
    title: "getStaticPaths RSS helper is not available anymore.",
    code: 3012,
    message: "The RSS helper has been removed from `getStaticPaths`. Try the new @astrojs/rss package instead.",
    hint: "See https://docs.astro.build/en/guides/rss/ for more information."
  },
  GetStaticPathsExpectedParams: {
    title: "Missing params property on `getStaticPaths` route.",
    code: 3013,
    message: "Missing or empty required `params` property on `getStaticPaths` route.",
    hint: "See https://docs.astro.build/en/reference/api-reference/#getstaticpaths for more information on getStaticPaths."
  },
  GetStaticPathsInvalidRouteParam: {
    title: "Invalid value for `getStaticPaths` route parameter.",
    code: 3014,
    message: (key, value, valueType) => `Invalid getStaticPaths route parameter for \`${key}\`. Expected undefined, a string or a number, received \`${valueType}\` (\`${value}\`)`,
    hint: "See https://docs.astro.build/en/reference/api-reference/#getstaticpaths for more information on getStaticPaths."
  },
  GetStaticPathsRequired: {
    title: "`getStaticPaths()` function required for dynamic routes.",
    code: 3015,
    message: "`getStaticPaths()` function is required for dynamic routes. Make sure that you `export` a `getStaticPaths` function from your dynamic route.",
    hint: `See https://docs.astro.build/en/core-concepts/routing/#dynamic-routes for more information on dynamic routes.

Alternatively, set \`output: "server"\` in your Astro config file to switch to a non-static server build.
See https://docs.astro.build/en/guides/server-side-rendering/ for more information on non-static rendering.`
  },
  ReservedSlotName: {
    title: "Invalid slot name.",
    code: 3016,
    message: (slotName) => `Unable to create a slot named \`${slotName}\`. \`${slotName}\` is a reserved slot name. Please update the name of this slot.`
  },
  NoAdapterInstalled: {
    title: "Cannot use Server-side Rendering without an adapter.",
    code: 3017,
    message: `Cannot use \`output: 'server'\` without an adapter. Please install and configure the appropriate server adapter for your final deployment.`,
    hint: "See https://docs.astro.build/en/guides/server-side-rendering/ for more information."
  },
  NoMatchingImport: {
    title: "No import found for component.",
    code: 3018,
    message: (componentName) => `Could not render \`${componentName}\`. No matching import has been found for \`${componentName}\`.`,
    hint: "Please make sure the component is properly imported."
  },
  InvalidPrerenderExport: {
    title: "Invalid prerender export.",
    code: 3019,
    message: (prefix, suffix) => {
      let msg = `A \`prerender\` export has been detected, but its value cannot be statically analyzed.`;
      if (prefix !== "const")
        msg += `
Expected \`const\` declaration but got \`${prefix}\`.`;
      if (suffix !== "true")
        msg += `
Expected \`true\` value but got \`${suffix}\`.`;
      return msg;
    },
    hint: "Mutable values declared at runtime are not supported. Please make sure to use exactly `export const prerender = true`."
  },
  UnknownViteError: {
    title: "Unknown Vite Error.",
    code: 4e3
  },
  FailedToLoadModuleSSR: {
    title: "Could not import file.",
    code: 4001,
    message: (importName) => `Could not import \`${importName}\`.`,
    hint: "This is often caused by a typo in the import path. Please make sure the file exists."
  },
  InvalidGlob: {
    title: "Invalid glob pattern.",
    code: 4002,
    message: (globPattern) => `Invalid glob pattern: \`${globPattern}\`. Glob patterns must start with './', '../' or '/'.`,
    hint: "See https://docs.astro.build/en/guides/imports/#glob-patterns for more information on supported glob patterns."
  },
  UnknownCSSError: {
    title: "Unknown CSS Error.",
    code: 5e3
  },
  CSSSyntaxError: {
    title: "CSS Syntax Error.",
    code: 5001
  },
  UnknownMarkdownError: {
    title: "Unknown Markdown Error.",
    code: 6e3
  },
  MarkdownFrontmatterParseError: {
    title: "Failed to parse Markdown frontmatter.",
    code: 6001
  },
  MarkdownContentSchemaValidationError: {
    title: "Content collection frontmatter invalid.",
    code: 6002,
    message: (collection, entryId, error) => {
      return [
        `${String(collection)} \u2192 ${String(entryId)} frontmatter does not match collection schema.`,
        ...error.errors.map((zodError) => zodError.message)
      ].join("\n");
    },
    hint: "See https://docs.astro.build/en/guides/content-collections/ for more information on content schemas."
  },
  UnknownConfigError: {
    title: "Unknown configuration error.",
    code: 7e3
  },
  ConfigNotFound: {
    title: "Specified configuration file not found.",
    code: 7001,
    message: (configFile) => `Unable to resolve \`--config "${configFile}"\`. Does the file exist?`
  },
  ConfigLegacyKey: {
    title: "Legacy configuration detected.",
    code: 7002,
    message: (legacyConfigKey) => `Legacy configuration detected: \`${legacyConfigKey}\`.`,
    hint: "Please update your configuration to the new format.\nSee https://astro.build/config for more information."
  },
  UnknownCLIError: {
    title: "Unknown CLI Error.",
    code: 8e3
  },
  GenerateContentTypesError: {
    title: "Failed to generate content types.",
    code: 8001,
    message: "`astro sync` command failed to generate content collection types.",
    hint: "Check your `src/content/config.*` file for typos."
  },
  UnknownError: {
    title: "Unknown Error.",
    code: 99999
  }
});

function normalizeLF(code) {
  return code.replace(/\r\n|\r(?!\n)|\n/g, "\n");
}
function getErrorDataByCode(code) {
  const entry = Object.entries(AstroErrorData).find((data) => data[1].code === code);
  if (entry) {
    return {
      name: entry[0],
      data: entry[1]
    };
  }
}

function codeFrame(src, loc) {
  if (!loc || loc.line === void 0 || loc.column === void 0) {
    return "";
  }
  const lines = normalizeLF(src).split("\n").map((ln) => ln.replace(/\t/g, "  "));
  const visibleLines = [];
  for (let n = -2; n <= 2; n++) {
    if (lines[loc.line + n])
      visibleLines.push(loc.line + n);
  }
  let gutterWidth = 0;
  for (const lineNo of visibleLines) {
    let w = `> ${lineNo}`;
    if (w.length > gutterWidth)
      gutterWidth = w.length;
  }
  let output = "";
  for (const lineNo of visibleLines) {
    const isFocusedLine = lineNo === loc.line - 1;
    output += isFocusedLine ? "> " : "  ";
    output += `${lineNo + 1} | ${lines[lineNo]}
`;
    if (isFocusedLine)
      output += `${Array.from({ length: gutterWidth }).join(" ")}  | ${Array.from({
        length: loc.column
      }).join(" ")}^
`;
  }
  return output;
}

class AstroError extends Error {
  constructor(props, ...params) {
    var _a;
    super(...params);
    this.type = "AstroError";
    const { code, name, title, message, stack, location, hint, frame } = props;
    this.errorCode = code;
    if (name && name !== "Error") {
      this.name = name;
    } else {
      this.name = ((_a = getErrorDataByCode(this.errorCode)) == null ? void 0 : _a.name) ?? "UnknownError";
    }
    this.title = title;
    if (message)
      this.message = message;
    this.stack = stack ? stack : this.stack;
    this.loc = location;
    this.hint = hint;
    this.frame = frame;
  }
  setErrorCode(errorCode) {
    this.errorCode = errorCode;
  }
  setLocation(location) {
    this.loc = location;
  }
  setName(name) {
    this.name = name;
  }
  setMessage(message) {
    this.message = message;
  }
  setHint(hint) {
    this.hint = hint;
  }
  setFrame(source, location) {
    this.frame = codeFrame(source, location);
  }
  static is(err) {
    return err.type === "AstroError";
  }
}

const PROP_TYPE = {
  Value: 0,
  JSON: 1,
  RegExp: 2,
  Date: 3,
  Map: 4,
  Set: 5,
  BigInt: 6,
  URL: 7,
  Uint8Array: 8,
  Uint16Array: 9,
  Uint32Array: 10
};
function serializeArray(value, metadata = {}, parents = /* @__PURE__ */ new WeakSet()) {
  if (parents.has(value)) {
    throw new Error(`Cyclic reference detected while serializing props for <${metadata.displayName} client:${metadata.hydrate}>!

Cyclic references cannot be safely serialized for client-side usage. Please remove the cyclic reference.`);
  }
  parents.add(value);
  const serialized = value.map((v) => {
    return convertToSerializedForm(v, metadata, parents);
  });
  parents.delete(value);
  return serialized;
}
function serializeObject(value, metadata = {}, parents = /* @__PURE__ */ new WeakSet()) {
  if (parents.has(value)) {
    throw new Error(`Cyclic reference detected while serializing props for <${metadata.displayName} client:${metadata.hydrate}>!

Cyclic references cannot be safely serialized for client-side usage. Please remove the cyclic reference.`);
  }
  parents.add(value);
  const serialized = Object.fromEntries(
    Object.entries(value).map(([k, v]) => {
      return [k, convertToSerializedForm(v, metadata, parents)];
    })
  );
  parents.delete(value);
  return serialized;
}
function convertToSerializedForm(value, metadata = {}, parents = /* @__PURE__ */ new WeakSet()) {
  const tag = Object.prototype.toString.call(value);
  switch (tag) {
    case "[object Date]": {
      return [PROP_TYPE.Date, value.toISOString()];
    }
    case "[object RegExp]": {
      return [PROP_TYPE.RegExp, value.source];
    }
    case "[object Map]": {
      return [
        PROP_TYPE.Map,
        JSON.stringify(serializeArray(Array.from(value), metadata, parents))
      ];
    }
    case "[object Set]": {
      return [
        PROP_TYPE.Set,
        JSON.stringify(serializeArray(Array.from(value), metadata, parents))
      ];
    }
    case "[object BigInt]": {
      return [PROP_TYPE.BigInt, value.toString()];
    }
    case "[object URL]": {
      return [PROP_TYPE.URL, value.toString()];
    }
    case "[object Array]": {
      return [PROP_TYPE.JSON, JSON.stringify(serializeArray(value, metadata, parents))];
    }
    case "[object Uint8Array]": {
      return [PROP_TYPE.Uint8Array, JSON.stringify(Array.from(value))];
    }
    case "[object Uint16Array]": {
      return [PROP_TYPE.Uint16Array, JSON.stringify(Array.from(value))];
    }
    case "[object Uint32Array]": {
      return [PROP_TYPE.Uint32Array, JSON.stringify(Array.from(value))];
    }
    default: {
      if (value !== null && typeof value === "object") {
        return [PROP_TYPE.Value, serializeObject(value, metadata, parents)];
      } else {
        return [PROP_TYPE.Value, value];
      }
    }
  }
}
function serializeProps(props, metadata) {
  const serialized = JSON.stringify(serializeObject(props, metadata));
  return serialized;
}

const HydrationDirectivesRaw = ["load", "idle", "media", "visible", "only"];
const HydrationDirectives = new Set(HydrationDirectivesRaw);
const HydrationDirectiveProps = new Set(HydrationDirectivesRaw.map((n) => `client:${n}`));
function extractDirectives(displayName, inputProps) {
  let extracted = {
    isPage: false,
    hydration: null,
    props: {}
  };
  for (const [key, value] of Object.entries(inputProps)) {
    if (key.startsWith("server:")) {
      if (key === "server:root") {
        extracted.isPage = true;
      }
    }
    if (key.startsWith("client:")) {
      if (!extracted.hydration) {
        extracted.hydration = {
          directive: "",
          value: "",
          componentUrl: "",
          componentExport: { value: "" }
        };
      }
      switch (key) {
        case "client:component-path": {
          extracted.hydration.componentUrl = value;
          break;
        }
        case "client:component-export": {
          extracted.hydration.componentExport.value = value;
          break;
        }
        case "client:component-hydration": {
          break;
        }
        case "client:display-name": {
          break;
        }
        default: {
          extracted.hydration.directive = key.split(":")[1];
          extracted.hydration.value = value;
          if (!HydrationDirectives.has(extracted.hydration.directive)) {
            throw new Error(
              `Error: invalid hydration directive "${key}". Supported hydration methods: ${Array.from(
                HydrationDirectiveProps
              ).join(", ")}`
            );
          }
          if (extracted.hydration.directive === "media" && typeof extracted.hydration.value !== "string") {
            throw new AstroError(AstroErrorData.MissingMediaQueryDirective);
          }
          break;
        }
      }
    } else if (key === "class:list") {
      if (value) {
        extracted.props[key.slice(0, -5)] = serializeListValue(value);
      }
    } else {
      extracted.props[key] = value;
    }
  }
  for (const sym of Object.getOwnPropertySymbols(inputProps)) {
    extracted.props[sym] = inputProps[sym];
  }
  return extracted;
}
async function generateHydrateScript(scriptOptions, metadata) {
  const { renderer, result, astroId, props, attrs } = scriptOptions;
  const { hydrate, componentUrl, componentExport } = metadata;
  if (!componentExport.value) {
    throw new Error(
      `Unable to resolve a valid export for "${metadata.displayName}"! Please open an issue at https://astro.build/issues!`
    );
  }
  const island = {
    children: "",
    props: {
      uid: astroId
    }
  };
  if (attrs) {
    for (const [key, value] of Object.entries(attrs)) {
      island.props[key] = escapeHTML(value);
    }
  }
  island.props["component-url"] = await result.resolve(decodeURI(componentUrl));
  if (renderer.clientEntrypoint) {
    island.props["component-export"] = componentExport.value;
    island.props["renderer-url"] = await result.resolve(decodeURI(renderer.clientEntrypoint));
    island.props["props"] = escapeHTML(serializeProps(props, metadata));
  }
  island.props["ssr"] = "";
  island.props["client"] = hydrate;
  let beforeHydrationUrl = await result.resolve("astro:scripts/before-hydration.js");
  if (beforeHydrationUrl.length) {
    island.props["before-hydration-url"] = beforeHydrationUrl;
  }
  island.props["opts"] = escapeHTML(
    JSON.stringify({
      name: metadata.displayName,
      value: metadata.hydrateArgs || ""
    })
  );
  return island;
}

var _a;
const astroComponentInstanceSym = Symbol.for("astro.componentInstance");
class AstroComponentInstance {
  constructor(result, props, slots, factory) {
    this[_a] = true;
    this.result = result;
    this.props = props;
    this.factory = factory;
    this.slotValues = {};
    for (const name in slots) {
      this.slotValues[name] = slots[name]();
    }
  }
  async init() {
    this.returnValue = this.factory(this.result, this.props, this.slotValues);
    return this.returnValue;
  }
  async *render() {
    if (this.returnValue === void 0) {
      await this.init();
    }
    let value = this.returnValue;
    if (isPromise(value)) {
      value = await value;
    }
    if (isHeadAndContent(value)) {
      yield* value.content;
    } else {
      yield* renderChild(value);
    }
  }
}
_a = astroComponentInstanceSym;
function validateComponentProps(props, displayName) {
  if (props != null) {
    for (const prop of Object.keys(props)) {
      if (HydrationDirectiveProps.has(prop)) {
        console.warn(
          `You are attempting to render <${displayName} ${prop} />, but ${displayName} is an Astro component. Astro components do not render in the client and should not have a hydration directive. Please use a framework component for client rendering.`
        );
      }
    }
  }
}
function createAstroComponentInstance(result, displayName, factory, props, slots = {}) {
  validateComponentProps(props, displayName);
  const instance = new AstroComponentInstance(result, props, slots, factory);
  if (isAPropagatingComponent(result, factory) && !result.propagators.has(factory)) {
    result.propagators.set(factory, instance);
  }
  return instance;
}
function isAstroComponentInstance(obj) {
  return typeof obj === "object" && !!obj[astroComponentInstanceSym];
}

async function* renderChild(child) {
  child = await child;
  if (child instanceof SlotString) {
    if (child.instructions) {
      yield* child.instructions;
    }
    yield child;
  } else if (isHTMLString(child)) {
    yield child;
  } else if (Array.isArray(child)) {
    for (const value of child) {
      yield markHTMLString(await renderChild(value));
    }
  } else if (typeof child === "function") {
    yield* renderChild(child());
  } else if (typeof child === "string") {
    yield markHTMLString(escapeHTML(child));
  } else if (!child && child !== 0) ; else if (isRenderTemplateResult(child)) {
    yield* renderAstroTemplateResult(child);
  } else if (isAstroComponentInstance(child)) {
    yield* child.render();
  } else if (ArrayBuffer.isView(child)) {
    yield child;
  } else if (typeof child === "object" && (Symbol.asyncIterator in child || Symbol.iterator in child)) {
    yield* child;
  } else {
    yield child;
  }
}

const slotString = Symbol.for("astro:slot-string");
class SlotString extends HTMLString {
  constructor(content, instructions) {
    super(content);
    this.instructions = instructions;
    this[slotString] = true;
  }
}
function isSlotString(str) {
  return !!str[slotString];
}
async function renderSlot(_result, slotted, fallback) {
  if (slotted) {
    let iterator = renderChild(slotted);
    let content = "";
    let instructions = null;
    for await (const chunk of iterator) {
      if (chunk.type === "directive") {
        if (instructions === null) {
          instructions = [];
        }
        instructions.push(chunk);
      } else {
        content += chunk;
      }
    }
    return markHTMLString(new SlotString(content, instructions));
  }
  return fallback;
}
async function renderSlots(result, slots = {}) {
  let slotInstructions = null;
  let children = {};
  if (slots) {
    await Promise.all(
      Object.entries(slots).map(
        ([key, value]) => renderSlot(result, value).then((output) => {
          if (output.instructions) {
            if (slotInstructions === null) {
              slotInstructions = [];
            }
            slotInstructions.push(...output.instructions);
          }
          children[key] = output;
        })
      )
    );
  }
  return { slotInstructions, children };
}

const Fragment = Symbol.for("astro:fragment");
const Renderer = Symbol.for("astro:renderer");
const encoder = new TextEncoder();
const decoder = new TextDecoder();
function stringifyChunk(result, chunk) {
  switch (chunk.type) {
    case "directive": {
      const { hydration } = chunk;
      let needsHydrationScript = hydration && determineIfNeedsHydrationScript(result);
      let needsDirectiveScript = hydration && determinesIfNeedsDirectiveScript(result, hydration.directive);
      let prescriptType = needsHydrationScript ? "both" : needsDirectiveScript ? "directive" : null;
      if (prescriptType) {
        let prescripts = getPrescripts(prescriptType, hydration.directive);
        return markHTMLString(prescripts);
      } else {
        return "";
      }
    }
    default: {
      if (isSlotString(chunk)) {
        let out = "";
        const c = chunk;
        if (c.instructions) {
          for (const instr of c.instructions) {
            out += stringifyChunk(result, instr);
          }
        }
        out += chunk.toString();
        return out;
      }
      return chunk.toString();
    }
  }
}
class HTMLParts {
  constructor() {
    this.parts = "";
  }
  append(part, result) {
    if (ArrayBuffer.isView(part)) {
      this.parts += decoder.decode(part);
    } else {
      this.parts += stringifyChunk(result, part);
    }
  }
  toString() {
    return this.parts;
  }
  toArrayBuffer() {
    return encoder.encode(this.parts);
  }
}

const ClientOnlyPlaceholder = "astro-client-only";
class Skip {
  constructor(vnode) {
    this.vnode = vnode;
    this.count = 0;
  }
  increment() {
    this.count++;
  }
  haveNoTried() {
    return this.count === 0;
  }
  isCompleted() {
    return this.count > 2;
  }
}
Skip.symbol = Symbol("astro:jsx:skip");
let originalConsoleError;
let consoleFilterRefs = 0;
async function renderJSX(result, vnode) {
  switch (true) {
    case vnode instanceof HTMLString:
      if (vnode.toString().trim() === "") {
        return "";
      }
      return vnode;
    case typeof vnode === "string":
      return markHTMLString(escapeHTML(vnode));
    case typeof vnode === "function":
      return vnode;
    case (!vnode && vnode !== 0):
      return "";
    case Array.isArray(vnode):
      return markHTMLString(
        (await Promise.all(vnode.map((v) => renderJSX(result, v)))).join("")
      );
  }
  let skip;
  if (vnode.props) {
    if (vnode.props[Skip.symbol]) {
      skip = vnode.props[Skip.symbol];
    } else {
      skip = new Skip(vnode);
    }
  } else {
    skip = new Skip(vnode);
  }
  return renderJSXVNode(result, vnode, skip);
}
async function renderJSXVNode(result, vnode, skip) {
  if (isVNode(vnode)) {
    switch (true) {
      case !vnode.type: {
        throw new Error(`Unable to render ${result._metadata.pathname} because it contains an undefined Component!
Did you forget to import the component or is it possible there is a typo?`);
      }
      case vnode.type === Symbol.for("astro:fragment"):
        return renderJSX(result, vnode.props.children);
      case vnode.type.isAstroComponentFactory: {
        let props = {};
        let slots = {};
        for (const [key, value] of Object.entries(vnode.props ?? {})) {
          if (key === "children" || value && typeof value === "object" && value["$$slot"]) {
            slots[key === "children" ? "default" : key] = () => renderJSX(result, value);
          } else {
            props[key] = value;
          }
        }
        return markHTMLString(await renderToString(result, vnode.type, props, slots));
      }
      case (!vnode.type && vnode.type !== 0):
        return "";
      case (typeof vnode.type === "string" && vnode.type !== ClientOnlyPlaceholder):
        return markHTMLString(await renderElement$1(result, vnode.type, vnode.props ?? {}));
    }
    if (vnode.type) {
      let extractSlots2 = function(child) {
        if (Array.isArray(child)) {
          return child.map((c) => extractSlots2(c));
        }
        if (!isVNode(child)) {
          _slots.default.push(child);
          return;
        }
        if ("slot" in child.props) {
          _slots[child.props.slot] = [..._slots[child.props.slot] ?? [], child];
          delete child.props.slot;
          return;
        }
        _slots.default.push(child);
      };
      if (typeof vnode.type === "function" && vnode.type["astro:renderer"]) {
        skip.increment();
      }
      if (typeof vnode.type === "function" && vnode.props["server:root"]) {
        const output2 = await vnode.type(vnode.props ?? {});
        return await renderJSX(result, output2);
      }
      if (typeof vnode.type === "function") {
        if (skip.haveNoTried() || skip.isCompleted()) {
          useConsoleFilter();
          try {
            const output2 = await vnode.type(vnode.props ?? {});
            let renderResult;
            if (output2 && output2[AstroJSX]) {
              renderResult = await renderJSXVNode(result, output2, skip);
              return renderResult;
            } else if (!output2) {
              renderResult = await renderJSXVNode(result, output2, skip);
              return renderResult;
            }
          } catch (e) {
            if (skip.isCompleted()) {
              throw e;
            }
            skip.increment();
          } finally {
            finishUsingConsoleFilter();
          }
        } else {
          skip.increment();
        }
      }
      const { children = null, ...props } = vnode.props ?? {};
      const _slots = {
        default: []
      };
      extractSlots2(children);
      for (const [key, value] of Object.entries(props)) {
        if (value["$$slot"]) {
          _slots[key] = value;
          delete props[key];
        }
      }
      const slotPromises = [];
      const slots = {};
      for (const [key, value] of Object.entries(_slots)) {
        slotPromises.push(
          renderJSX(result, value).then((output2) => {
            if (output2.toString().trim().length === 0)
              return;
            slots[key] = () => output2;
          })
        );
      }
      await Promise.all(slotPromises);
      props[Skip.symbol] = skip;
      let output;
      if (vnode.type === ClientOnlyPlaceholder && vnode.props["client:only"]) {
        output = await renderComponentToIterable(
          result,
          vnode.props["client:display-name"] ?? "",
          null,
          props,
          slots
        );
      } else {
        output = await renderComponentToIterable(
          result,
          typeof vnode.type === "function" ? vnode.type.name : vnode.type,
          vnode.type,
          props,
          slots
        );
      }
      if (typeof output !== "string" && Symbol.asyncIterator in output) {
        let parts = new HTMLParts();
        for await (const chunk of output) {
          parts.append(chunk, result);
        }
        return markHTMLString(parts.toString());
      } else {
        return markHTMLString(output);
      }
    }
  }
  return markHTMLString(`${vnode}`);
}
async function renderElement$1(result, tag, { children, ...props }) {
  return markHTMLString(
    `<${tag}${spreadAttributes(props)}${markHTMLString(
      (children == null || children == "") && voidElementNames.test(tag) ? `/>` : `>${children == null ? "" : await renderJSX(result, children)}</${tag}>`
    )}`
  );
}
function useConsoleFilter() {
  consoleFilterRefs++;
  if (!originalConsoleError) {
    originalConsoleError = console.error;
    try {
      console.error = filteredConsoleError;
    } catch (error) {
    }
  }
}
function finishUsingConsoleFilter() {
  consoleFilterRefs--;
}
function filteredConsoleError(msg, ...rest) {
  if (consoleFilterRefs > 0 && typeof msg === "string") {
    const isKnownReactHookError = msg.includes("Warning: Invalid hook call.") && msg.includes("https://reactjs.org/link/invalid-hook-call");
    if (isKnownReactHookError)
      return;
  }
  originalConsoleError(msg, ...rest);
}

/**
 * shortdash - https://github.com/bibig/node-shorthash
 *
 * @license
 *
 * (The MIT License)
 *
 * Copyright (c) 2013 Bibig <bibig@me.com>
 *
 * Permission is hereby granted, free of charge, to any person
 * obtaining a copy of this software and associated documentation
 * files (the "Software"), to deal in the Software without
 * restriction, including without limitation the rights to use,
 * copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the
 * Software is furnished to do so, subject to the following
 * conditions:
 *
 * The above copyright notice and this permission notice shall be
 * included in all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
 * EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES
 * OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
 * NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT
 * HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY,
 * WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
 * FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR
 * OTHER DEALINGS IN THE SOFTWARE.
 */
const dictionary = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXY";
const binary = dictionary.length;
function bitwise(str) {
  let hash = 0;
  if (str.length === 0)
    return hash;
  for (let i = 0; i < str.length; i++) {
    const ch = str.charCodeAt(i);
    hash = (hash << 5) - hash + ch;
    hash = hash & hash;
  }
  return hash;
}
function shorthash(text) {
  let num;
  let result = "";
  let integer = bitwise(text);
  const sign = integer < 0 ? "Z" : "";
  integer = Math.abs(integer);
  while (integer >= binary) {
    num = integer % binary;
    integer = Math.floor(integer / binary);
    result = dictionary[num] + result;
  }
  if (integer > 0) {
    result = dictionary[integer] + result;
  }
  return sign + result;
}

const voidElementNames = /^(area|base|br|col|command|embed|hr|img|input|keygen|link|meta|param|source|track|wbr)$/i;
const htmlBooleanAttributes = /^(allowfullscreen|async|autofocus|autoplay|controls|default|defer|disabled|disablepictureinpicture|disableremoteplayback|formnovalidate|hidden|loop|nomodule|novalidate|open|playsinline|readonly|required|reversed|scoped|seamless|itemscope)$/i;
const htmlEnumAttributes = /^(contenteditable|draggable|spellcheck|value)$/i;
const svgEnumAttributes = /^(autoReverse|externalResourcesRequired|focusable|preserveAlpha)$/i;
const STATIC_DIRECTIVES = /* @__PURE__ */ new Set(["set:html", "set:text"]);
const toIdent = (k) => k.trim().replace(/(?:(?!^)\b\w|\s+|[^\w]+)/g, (match, index) => {
  if (/[^\w]|\s/.test(match))
    return "";
  return index === 0 ? match : match.toUpperCase();
});
const toAttributeString = (value, shouldEscape = true) => shouldEscape ? String(value).replace(/&/g, "&#38;").replace(/"/g, "&#34;") : value;
const kebab = (k) => k.toLowerCase() === k ? k : k.replace(/[A-Z]/g, (match) => `-${match.toLowerCase()}`);
const toStyleString = (obj) => Object.entries(obj).map(([k, v]) => `${kebab(k)}:${v}`).join(";");
function defineScriptVars(vars) {
  let output = "";
  for (const [key, value] of Object.entries(vars)) {
    output += `const ${toIdent(key)} = ${JSON.stringify(value)};
`;
  }
  return markHTMLString(output);
}
function formatList(values) {
  if (values.length === 1) {
    return values[0];
  }
  return `${values.slice(0, -1).join(", ")} or ${values[values.length - 1]}`;
}
function addAttribute(value, key, shouldEscape = true) {
  if (value == null) {
    return "";
  }
  if (value === false) {
    if (htmlEnumAttributes.test(key) || svgEnumAttributes.test(key)) {
      return markHTMLString(` ${key}="false"`);
    }
    return "";
  }
  if (STATIC_DIRECTIVES.has(key)) {
    console.warn(`[astro] The "${key}" directive cannot be applied dynamically at runtime. It will not be rendered as an attribute.

Make sure to use the static attribute syntax (\`${key}={value}\`) instead of the dynamic spread syntax (\`{...{ "${key}": value }}\`).`);
    return "";
  }
  if (key === "class:list") {
    const listValue = toAttributeString(serializeListValue(value), shouldEscape);
    if (listValue === "") {
      return "";
    }
    return markHTMLString(` ${key.slice(0, -5)}="${listValue}"`);
  }
  if (key === "style" && !(value instanceof HTMLString) && typeof value === "object") {
    return markHTMLString(` ${key}="${toAttributeString(toStyleString(value), shouldEscape)}"`);
  }
  if (key === "className") {
    return markHTMLString(` class="${toAttributeString(value, shouldEscape)}"`);
  }
  if (value === true && (key.startsWith("data-") || htmlBooleanAttributes.test(key))) {
    return markHTMLString(` ${key}`);
  } else {
    return markHTMLString(` ${key}="${toAttributeString(value, shouldEscape)}"`);
  }
}
function internalSpreadAttributes(values, shouldEscape = true) {
  let output = "";
  for (const [key, value] of Object.entries(values)) {
    output += addAttribute(value, key, shouldEscape);
  }
  return markHTMLString(output);
}
function renderElement(name, { props: _props, children = "" }, shouldEscape = true) {
  const { lang: _, "data-astro-id": astroId, "define:vars": defineVars, ...props } = _props;
  if (defineVars) {
    if (name === "style") {
      delete props["is:global"];
      delete props["is:scoped"];
    }
    if (name === "script") {
      delete props.hoist;
      children = defineScriptVars(defineVars) + "\n" + children;
    }
  }
  if ((children == null || children == "") && voidElementNames.test(name)) {
    return `<${name}${internalSpreadAttributes(props, shouldEscape)} />`;
  }
  return `<${name}${internalSpreadAttributes(props, shouldEscape)}>${children}</${name}>`;
}

function componentIsHTMLElement(Component) {
  return typeof HTMLElement !== "undefined" && HTMLElement.isPrototypeOf(Component);
}
async function renderHTMLElement(result, constructor, props, slots) {
  const name = getHTMLElementName(constructor);
  let attrHTML = "";
  for (const attr in props) {
    attrHTML += ` ${attr}="${toAttributeString(await props[attr])}"`;
  }
  return markHTMLString(
    `<${name}${attrHTML}>${await renderSlot(result, slots == null ? void 0 : slots.default)}</${name}>`
  );
}
function getHTMLElementName(constructor) {
  const definedName = customElements.getName(constructor);
  if (definedName)
    return definedName;
  const assignedName = constructor.name.replace(/^HTML|Element$/g, "").replace(/[A-Z]/g, "-$&").toLowerCase().replace(/^-/, "html-");
  return assignedName;
}

const rendererAliases = /* @__PURE__ */ new Map([["solid", "solid-js"]]);
function guessRenderers(componentUrl) {
  const extname = componentUrl == null ? void 0 : componentUrl.split(".").pop();
  switch (extname) {
    case "svelte":
      return ["@astrojs/svelte"];
    case "vue":
      return ["@astrojs/vue"];
    case "jsx":
    case "tsx":
      return ["@astrojs/react", "@astrojs/preact", "@astrojs/solid", "@astrojs/vue (jsx)"];
    default:
      return [
        "@astrojs/react",
        "@astrojs/preact",
        "@astrojs/solid",
        "@astrojs/vue",
        "@astrojs/svelte"
      ];
  }
}
function isFragmentComponent(Component) {
  return Component === Fragment;
}
function isHTMLComponent(Component) {
  return Component && typeof Component === "object" && Component["astro:html"];
}
async function renderFrameworkComponent(result, displayName, Component, _props, slots = {}) {
  var _a, _b;
  if (!Component && !_props["client:only"]) {
    throw new Error(
      `Unable to render ${displayName} because it is ${Component}!
Did you forget to import the component or is it possible there is a typo?`
    );
  }
  const { renderers } = result._metadata;
  const metadata = { displayName };
  const { hydration, isPage, props } = extractDirectives(displayName, _props);
  let html = "";
  let attrs = void 0;
  if (hydration) {
    metadata.hydrate = hydration.directive;
    metadata.hydrateArgs = hydration.value;
    metadata.componentExport = hydration.componentExport;
    metadata.componentUrl = hydration.componentUrl;
  }
  const probableRendererNames = guessRenderers(metadata.componentUrl);
  const validRenderers = renderers.filter((r) => r.name !== "astro:jsx");
  const { children, slotInstructions } = await renderSlots(result, slots);
  let renderer;
  if (metadata.hydrate !== "only") {
    let isTagged = false;
    try {
      isTagged = Component && Component[Renderer];
    } catch {
    }
    if (isTagged) {
      const rendererName = Component[Renderer];
      renderer = renderers.find(({ name }) => name === rendererName);
    }
    if (!renderer) {
      let error;
      for (const r of renderers) {
        try {
          if (await r.ssr.check.call({ result }, Component, props, children)) {
            renderer = r;
            break;
          }
        } catch (e) {
          error ?? (error = e);
        }
      }
      if (!renderer && error) {
        throw error;
      }
    }
    if (!renderer && typeof HTMLElement === "function" && componentIsHTMLElement(Component)) {
      const output = renderHTMLElement(result, Component, _props, slots);
      return output;
    }
  } else {
    if (metadata.hydrateArgs) {
      const passedName = metadata.hydrateArgs;
      const rendererName = rendererAliases.has(passedName) ? rendererAliases.get(passedName) : passedName;
      renderer = renderers.find(
        ({ name }) => name === `@astrojs/${rendererName}` || name === rendererName
      );
    }
    if (!renderer && validRenderers.length === 1) {
      renderer = validRenderers[0];
    }
    if (!renderer) {
      const extname = (_a = metadata.componentUrl) == null ? void 0 : _a.split(".").pop();
      renderer = renderers.filter(
        ({ name }) => name === `@astrojs/${extname}` || name === extname
      )[0];
    }
  }
  if (!renderer) {
    if (metadata.hydrate === "only") {
      throw new AstroError({
        ...AstroErrorData.NoClientOnlyHint,
        message: AstroErrorData.NoClientOnlyHint.message(metadata.displayName),
        hint: AstroErrorData.NoClientOnlyHint.hint(
          probableRendererNames.map((r) => r.replace("@astrojs/", "")).join("|")
        )
      });
    } else if (typeof Component !== "string") {
      const matchingRenderers = validRenderers.filter(
        (r) => probableRendererNames.includes(r.name)
      );
      const plural = validRenderers.length > 1;
      if (matchingRenderers.length === 0) {
        throw new AstroError({
          ...AstroErrorData.NoMatchingRenderer,
          message: AstroErrorData.NoMatchingRenderer.message(
            metadata.displayName,
            (_b = metadata == null ? void 0 : metadata.componentUrl) == null ? void 0 : _b.split(".").pop(),
            plural,
            validRenderers.length
          ),
          hint: AstroErrorData.NoMatchingRenderer.hint(
            formatList(probableRendererNames.map((r) => "`" + r + "`"))
          )
        });
      } else if (matchingRenderers.length === 1) {
        renderer = matchingRenderers[0];
        ({ html, attrs } = await renderer.ssr.renderToStaticMarkup.call(
          { result },
          Component,
          props,
          children,
          metadata
        ));
      } else {
        throw new Error(`Unable to render ${metadata.displayName}!

This component likely uses ${formatList(probableRendererNames)},
but Astro encountered an error during server-side rendering.

Please ensure that ${metadata.displayName}:
1. Does not unconditionally access browser-specific globals like \`window\` or \`document\`.
   If this is unavoidable, use the \`client:only\` hydration directive.
2. Does not conditionally return \`null\` or \`undefined\` when rendered on the server.

If you're still stuck, please open an issue on GitHub or join us at https://astro.build/chat.`);
      }
    }
  } else {
    if (metadata.hydrate === "only") {
      html = await renderSlot(result, slots == null ? void 0 : slots.fallback);
    } else {
      ({ html, attrs } = await renderer.ssr.renderToStaticMarkup.call(
        { result },
        Component,
        props,
        children,
        metadata
      ));
    }
  }
  if (renderer && !renderer.clientEntrypoint && renderer.name !== "@astrojs/lit" && metadata.hydrate) {
    throw new AstroError({
      ...AstroErrorData.NoClientEntrypoint,
      message: AstroErrorData.NoClientEntrypoint.message(
        displayName,
        metadata.hydrate,
        renderer.name
      )
    });
  }
  if (!html && typeof Component === "string") {
    const Tag = sanitizeElementName(Component);
    const childSlots = Object.values(children).join("");
    const iterable = renderAstroTemplateResult(
      await renderTemplate`<${Tag}${internalSpreadAttributes(props)}${markHTMLString(
        childSlots === "" && voidElementNames.test(Tag) ? `/>` : `>${childSlots}</${Tag}>`
      )}`
    );
    html = "";
    for await (const chunk of iterable) {
      html += chunk;
    }
  }
  if (!hydration) {
    return async function* () {
      if (slotInstructions) {
        yield* slotInstructions;
      }
      if (isPage || (renderer == null ? void 0 : renderer.name) === "astro:jsx") {
        yield html;
      } else {
        yield markHTMLString(html.replace(/\<\/?astro-slot\>/g, ""));
      }
    }();
  }
  const astroId = shorthash(
    `<!--${metadata.componentExport.value}:${metadata.componentUrl}-->
${html}
${serializeProps(
      props,
      metadata
    )}`
  );
  const island = await generateHydrateScript(
    { renderer, result, astroId, props, attrs },
    metadata
  );
  let unrenderedSlots = [];
  if (html) {
    if (Object.keys(children).length > 0) {
      for (const key of Object.keys(children)) {
        if (!html.includes(key === "default" ? `<astro-slot>` : `<astro-slot name="${key}">`)) {
          unrenderedSlots.push(key);
        }
      }
    }
  } else {
    unrenderedSlots = Object.keys(children);
  }
  const template = unrenderedSlots.length > 0 ? unrenderedSlots.map(
    (key) => `<template data-astro-template${key !== "default" ? `="${key}"` : ""}>${children[key]}</template>`
  ).join("") : "";
  island.children = `${html ?? ""}${template}`;
  if (island.children) {
    island.props["await-children"] = "";
  }
  async function* renderAll() {
    if (slotInstructions) {
      yield* slotInstructions;
    }
    yield { type: "directive", hydration, result };
    yield markHTMLString(renderElement("astro-island", island, false));
  }
  return renderAll();
}
function sanitizeElementName(tag) {
  const unsafe = /[&<>'"\s]+/g;
  if (!unsafe.test(tag))
    return tag;
  return tag.trim().split(unsafe)[0].trim();
}
async function renderFragmentComponent(result, slots = {}) {
  const children = await renderSlot(result, slots == null ? void 0 : slots.default);
  if (children == null) {
    return children;
  }
  return markHTMLString(children);
}
async function renderHTMLComponent(result, Component, _props, slots = {}) {
  const { slotInstructions, children } = await renderSlots(result, slots);
  const html = Component.render({ slots: children });
  const hydrationHtml = slotInstructions ? slotInstructions.map((instr) => stringifyChunk(result, instr)).join("") : "";
  return markHTMLString(hydrationHtml + html);
}
function renderComponent(result, displayName, Component, props, slots = {}) {
  if (isPromise(Component)) {
    return Promise.resolve(Component).then((Unwrapped) => {
      return renderComponent(result, displayName, Unwrapped, props, slots);
    });
  }
  if (isFragmentComponent(Component)) {
    return renderFragmentComponent(result, slots);
  }
  if (isHTMLComponent(Component)) {
    return renderHTMLComponent(result, Component, props, slots);
  }
  if (isAstroComponentFactory(Component)) {
    return createAstroComponentInstance(result, displayName, Component, props, slots);
  }
  return renderFrameworkComponent(result, displayName, Component, props, slots);
}
function renderComponentToIterable(result, displayName, Component, props, slots = {}) {
  const renderResult = renderComponent(result, displayName, Component, props, slots);
  if (isAstroComponentInstance(renderResult)) {
    return renderResult.render();
  }
  return renderResult;
}

const uniqueElements = (item, index, all) => {
  const props = JSON.stringify(item.props);
  const children = item.children;
  return index === all.findIndex((i) => JSON.stringify(i.props) === props && i.children == children);
};
async function* renderExtraHead(result, base) {
  yield base;
  for (const part of result.extraHead) {
    yield* renderChild(part);
  }
}
function renderAllHeadContent(result) {
  const styles = Array.from(result.styles).filter(uniqueElements).map((style) => renderElement("style", style));
  result.styles.clear();
  const scripts = Array.from(result.scripts).filter(uniqueElements).map((script, i) => {
    return renderElement("script", script, false);
  });
  const links = Array.from(result.links).filter(uniqueElements).map((link) => renderElement("link", link, false));
  const baseHeadContent = markHTMLString(links.join("\n") + styles.join("\n") + scripts.join("\n"));
  if (result.extraHead.length > 0) {
    return renderExtraHead(result, baseHeadContent);
  } else {
    return baseHeadContent;
  }
}
function createRenderHead(result) {
  result._metadata.hasRenderedHead = true;
  return renderAllHeadContent.bind(null, result);
}
const renderHead = createRenderHead;
async function* maybeRenderHead(result) {
  if (result._metadata.hasRenderedHead) {
    return;
  }
  yield createRenderHead(result)();
}

typeof process === "object" && Object.prototype.toString.call(process) === "[object process]";

function spreadAttributes(values, _name, { class: scopedClassName } = {}) {
  let output = "";
  if (scopedClassName) {
    if (typeof values.class !== "undefined") {
      values.class += ` ${scopedClassName}`;
    } else if (typeof values["class:list"] !== "undefined") {
      values["class:list"] = [values["class:list"], scopedClassName];
    } else {
      values.class = scopedClassName;
    }
  }
  for (const [key, value] of Object.entries(values)) {
    output += addAttribute(value, key, true);
  }
  return markHTMLString(output);
}
function defineStyleVars(defs) {
  let output = "";
  let arr = !Array.isArray(defs) ? [defs] : defs;
  for (const vars of arr) {
    for (const [key, value] of Object.entries(vars)) {
      if (value || value === 0) {
        output += `--${key}: ${value};`;
      }
    }
  }
  return markHTMLString(output);
}

const AstroJSX = "astro:jsx";
const Empty = Symbol("empty");
const toSlotName = (slotAttr) => slotAttr;
function isVNode(vnode) {
  return vnode && typeof vnode === "object" && vnode[AstroJSX];
}
function transformSlots(vnode) {
  if (typeof vnode.type === "string")
    return vnode;
  const slots = {};
  if (isVNode(vnode.props.children)) {
    const child = vnode.props.children;
    if (!isVNode(child))
      return;
    if (!("slot" in child.props))
      return;
    const name = toSlotName(child.props.slot);
    slots[name] = [child];
    slots[name]["$$slot"] = true;
    delete child.props.slot;
    delete vnode.props.children;
  }
  if (Array.isArray(vnode.props.children)) {
    vnode.props.children = vnode.props.children.map((child) => {
      if (!isVNode(child))
        return child;
      if (!("slot" in child.props))
        return child;
      const name = toSlotName(child.props.slot);
      if (Array.isArray(slots[name])) {
        slots[name].push(child);
      } else {
        slots[name] = [child];
        slots[name]["$$slot"] = true;
      }
      delete child.props.slot;
      return Empty;
    }).filter((v) => v !== Empty);
  }
  Object.assign(vnode.props, slots);
}
function markRawChildren(child) {
  if (typeof child === "string")
    return markHTMLString(child);
  if (Array.isArray(child))
    return child.map((c) => markRawChildren(c));
  return child;
}
function transformSetDirectives(vnode) {
  if (!("set:html" in vnode.props || "set:text" in vnode.props))
    return;
  if ("set:html" in vnode.props) {
    const children = markRawChildren(vnode.props["set:html"]);
    delete vnode.props["set:html"];
    Object.assign(vnode.props, { children });
    return;
  }
  if ("set:text" in vnode.props) {
    const children = vnode.props["set:text"];
    delete vnode.props["set:text"];
    Object.assign(vnode.props, { children });
    return;
  }
}
function createVNode(type, props) {
  const vnode = {
    [Renderer]: "astro:jsx",
    [AstroJSX]: true,
    type,
    props: props ?? {}
  };
  transformSetDirectives(vnode);
  transformSlots(vnode);
  return vnode;
}

const slotName = (str) => str.trim().replace(/[-_]([a-z])/g, (_, w) => w.toUpperCase());
async function check(Component, props, { default: children = null, ...slotted } = {}) {
  if (typeof Component !== "function")
    return false;
  const slots = {};
  for (const [key, value] of Object.entries(slotted)) {
    const name = slotName(key);
    slots[name] = value;
  }
  try {
    const result = await Component({ ...props, ...slots, children });
    return result[AstroJSX];
  } catch (e) {
  }
  return false;
}
async function renderToStaticMarkup(Component, props = {}, { default: children = null, ...slotted } = {}) {
  const slots = {};
  for (const [key, value] of Object.entries(slotted)) {
    const name = slotName(key);
    slots[name] = value;
  }
  const { result } = this;
  const html = await renderJSX(result, createVNode(Component, { ...props, ...slots, children }));
  return { html };
}
var server_default = {
  check,
  renderToStaticMarkup
};

const $$Astro$g = createAstro("C:/Users/swbn/Projects/01-web/04-testing-and-sandbox/astro-clean/src/components/Navbar.astro", "http://localhost:3000/", "file:///C:/Users/swbn/Projects/01-web/04-testing-and-sandbox/astro-clean/");
const $$Navbar = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$g, $$props, $$slots);
  Astro2.self = $$Navbar;
  return renderTemplate`${maybeRenderHead($$result)}<nav class="rounded-3xl flex-col sm:flex-row sm:h-14 flex items-center justify-between">
  <a href="/" class="flex justify-center items-center gap-3 mb-3 sm:mb-0">
    <img src="../svg/waving-hand.svg" class="w-6 sm:w-10" alt="">
    <div class="text-fuchsia-50 text-3xl font-bold">Hello Astro</div>
  </a>
  <ul class="flex items-center flex-wrap justify-center text-slate-100 gap-3 sm:gap-5 text-lg sm:text-xl [&>*:hover]:text-slate-400">
    <li><a href="/">Home</a></li>
    <li><a href="/blog">Blog</a></li>
    <li><a href="/tags">Tags</a></li>
    <li><a href="/sandbox">Sandbox</a></li>
    <li><a href="/markdown">Markdown</a></li>
  </ul>
</nav>`;
}, "C:/Users/swbn/Projects/01-web/04-testing-and-sandbox/astro-clean/src/components/Navbar.astro");

const $$Astro$f = createAstro("C:/Users/swbn/Projects/01-web/04-testing-and-sandbox/astro-clean/src/components/Header.astro", "http://localhost:3000/", "file:///C:/Users/swbn/Projects/01-web/04-testing-and-sandbox/astro-clean/");
const $$Header = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$f, $$props, $$slots);
  Astro2.self = $$Header;
  return renderTemplate`${maybeRenderHead($$result)}<header class="mb-10">
    ${renderComponent($$result, "Navbar", $$Navbar, {})}
</header>`;
}, "C:/Users/swbn/Projects/01-web/04-testing-and-sandbox/astro-clean/src/components/Header.astro");

const $$Astro$e = createAstro("C:/Users/swbn/Projects/01-web/04-testing-and-sandbox/astro-clean/src/components/SocialButton.astro", "http://localhost:3000/", "file:///C:/Users/swbn/Projects/01-web/04-testing-and-sandbox/astro-clean/");
const $$SocialButton = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$e, $$props, $$slots);
  Astro2.self = $$SocialButton;
  const { iconName, url, targetBlank } = Astro2.props;
  return renderTemplate`${maybeRenderHead($$result)}<a${addAttribute(targetBlank && "_blank", "target")}${addAttribute(url, "href")} class="w-8 h-8 rounded-md bg-slate-900 flex justify-center items-center text-white text-xl hover:bg-neutral-900 transition-[background-color]">
  ${renderComponent($$result, "iconify-icon", "iconify-icon", { "icon": iconName })}
</a>`;
}, "C:/Users/swbn/Projects/01-web/04-testing-and-sandbox/astro-clean/src/components/SocialButton.astro");

const $$Astro$d = createAstro("C:/Users/swbn/Projects/01-web/04-testing-and-sandbox/astro-clean/src/components/Footer.astro", "http://localhost:3000/", "file:///C:/Users/swbn/Projects/01-web/04-testing-and-sandbox/astro-clean/");
const $$Footer = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$d, $$props, $$slots);
  Astro2.self = $$Footer;
  const userName = "liv3rise";
  const repoName = "astro-test";
  const repoUrl = `https://github.com/${userName}/${repoName}`;
  const userUrl = `https://github.com/${userName}`;
  return renderTemplate`${maybeRenderHead($$result)}<footer class="p-5 flex flex-col justify-center items-center rounded-3xl mt-4 text-center">
    <div class="text-md text-white">Astro sandbox for testing different things.</div>
    <div class="text-md text-white">You can find the source code for this mess <a class="underline text-slate-200 hover:text-slate-400 transition-[color]"${addAttribute(repoUrl, "href")}>on my GitHub.</a></div>
    <div class="text-sm text-slate-300 mb-5">But who cares ¯\\_(ツ)_/¯</div>

    <div class="flex gap-1">
        ${renderComponent($$result, "SocialButton", $$SocialButton, { "iconName": "mdi:github", "url": userUrl, "targetBlank": true })}
        ${renderComponent($$result, "SocialButton", $$SocialButton, { "iconName": "mdi:discord", "url": "#" })}
        ${renderComponent($$result, "SocialButton", $$SocialButton, { "iconName": "mdi:telegram", "url": "#" })}
    </div>
</footer>`;
}, "C:/Users/swbn/Projects/01-web/04-testing-and-sandbox/astro-clean/src/components/Footer.astro");

const $$Astro$c = createAstro("C:/Users/swbn/Projects/01-web/04-testing-and-sandbox/astro-clean/src/layouts/MainLayout.astro", "http://localhost:3000/", "file:///C:/Users/swbn/Projects/01-web/04-testing-and-sandbox/astro-clean/");
const $$MainLayout = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$c, $$props, $$slots);
  Astro2.self = $$MainLayout;
  const { pageTitle, tag } = Astro2.props;
  return renderTemplate`<html lang="en">
  <head>
    <meta charset="utf-8">
    <link rel="icon" type="image/svg+xml" href="/favicon.svg">
    <meta name="viewport" content="width=device-width">
    <meta name="generator"${addAttribute(Astro2.generator, "content")}>
    <title>${pageTitle}</title>
    <link rel="stylesheet" href="/main.css">
  ${renderHead($$result)}</head>
  <body class="p-5">
    <div class="container mx-auto">
      ${renderComponent($$result, "Header", $$Header, {})}
      <div class="flex justify-center items-center flex-col text-slate-100">
        <h1 class="text-xl sm:text-3xl font-bold mb-8 text-center">${pageTitle} ${tag && renderTemplate`<br class="block sm:hidden"><span class="block mt-1 sm:inline sm:ml-1 py-1 px-2 bg-slate-600 text-slate-200 rounded-md">${tag}</span>`}</h1>
        ${renderSlot($$result, $$slots["default"])}
      </div>
      ${renderComponent($$result, "Footer", $$Footer, {})}
    </div>
    ${maybeRenderHead($$result)}
  </body>
</html>`;
}, "C:/Users/swbn/Projects/01-web/04-testing-and-sandbox/astro-clean/src/layouts/MainLayout.astro");

const $$Astro$b = createAstro("C:/Users/swbn/Projects/01-web/04-testing-and-sandbox/astro-clean/src/pages/index.astro", "http://localhost:3000/", "file:///C:/Users/swbn/Projects/01-web/04-testing-and-sandbox/astro-clean/");
const $$Index$1 = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$b, $$props, $$slots);
  Astro2.self = $$Index$1;
  const pageTitle = "Main page";
  return renderTemplate`${renderComponent($$result, "MainLayout", $$MainLayout, { "pageTitle": pageTitle }, { "default": () => renderTemplate`${maybeRenderHead($$result)}<h2 class="text-center text-slate-400">Yes, this is seriously the main page. What did you expect?</h2>` })}`;
}, "C:/Users/swbn/Projects/01-web/04-testing-and-sandbox/astro-clean/src/pages/index.astro");

const $$file$6 = "C:/Users/swbn/Projects/01-web/04-testing-and-sandbox/astro-clean/src/pages/index.astro";
const $$url$6 = "";

const _page0 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Index$1,
  file: $$file$6,
  url: $$url$6
}, Symbol.toStringTag, { value: 'Module' }));

const html$5 = "<h1 id=\"one-morning-when-gregor-samsa-woke-from-troubled-dreams\">One morning, when Gregor Samsa woke from troubled dreams.</h1>\n<p>One morning, when Gregor Samsa woke from troubled dreams, he found himself <em>transformed</em> in his bed into a horrible  <a href=\"http://en.wikipedia.org/wiki/Vermin\" title=\"Wikipedia Vermin\">vermin</a>. He lay on his armour-like back, and if he lifted his head a little he could see his brown belly, slightly domed and divided by arches into stiff sections. The bedding was hardly able to cover <strong>strong</strong> it and seemed ready to slide off any moment. His many legs, pitifully thin compared with the size of the rest of him, link waved abouthelplessly as he looked. <cite>“What’s happened to me?”</cite> he thought. It wasn’t a dream. His room, a proper human room although a little too small, lay peacefully between its four familiar walls.</p><p></p>\n<h2 id=\"the-bedding-was-hardly-able-to-cover-it\">The bedding was hardly able to cover it.</h2>\n<p>It showed a lady fitted out with a fur hat and fur boa who sat upright, raising a heavy fur muff that covered the whole of her lower arm towards the viewer a solid fur muff into which her entire forearm disappeared..</p>\n<h3 id=\"things-we-know-about-gregors-sleeping-habits\">Things we know about Gregor’s sleeping habits.</h3>\n<ul>\n<li>He always slept on his right side.</li>\n<li>He has to get up early (to start another dreadful day).</li>\n<li>He has a drawer and a alarm clock next to his bed.</li>\n<li>His mother calls him when he gets up to late.</li>\n</ul>\n<div style=\"overflow-x:auto;\">\n<table class=\"data\">\n  <tbody><tr>\n    <th>Writer</th>\n    <th>Nationality</th>\n    <th>Genre</th>\n    <th>Most famous book</th>\n  </tr>\n  <tr>\n    <td>Franz Kafka</td>\n    <td>Leo Tolstoy</td>\n    <td>F. Scott Fitzgerald</td>\n    <td>H.G. Wells</td>\n  </tr>\n  <tr>\n    <td>Austrian</td>\n    <td>Russia</td>\n    <td>American</td>\n    <td>British</td>\n  </tr>\n  <tr>\n    <td>Literature &#x26; Fiction, Philosophy, Short Stories</td>\n    <td>Literature &#x26; Fiction, Philosophy</td>\n    <td>Literature &#x26; Fiction, Short Stories</td>\n    <td>Science Fiction</td>\n  </tr>\n    <tr>\n    <td>The Metamorphosis</td>\n    <td>War &#x26; Piece</td>\n    <td>The Great Gatsby</td>\n    <td>War of the Worlds</td>\n  </tr>\n  </tbody></table>\n</div>\n<p>First he wanted to stand up quietly and undisturbed, get dressed, above all have breakfast, and only then consider further action, for (he noticed this clearly) by thinking things over in bed he would not reach a reasonable conclusion. He remembered that he had already often felt a light pain or other in bed, perhaps the result of an awkward lying position, which later turned out to be purely imaginary when he stood up, and he was eager to see how his present fantasies would gradually dissipate. That the change in his voice was nothing other than the onset of a real chill, an occupational illness of commercial travelers, of that he had not the slightest doubt.</p>\n<pre is:raw=\"\" class=\"astro-code\" style=\"background-color: #0d1117; overflow-x: auto;\"><code><span class=\"line\"><span style=\"color: #c9d1d9\">function metamorphose(protagonist,author){</span></span>\n<span class=\"line\"><span style=\"color: #c9d1d9\">    if( protagonist.name.first === 'Gregor' &#x26;&#x26; author.name.last === 'Kafka' ){</span></span>\n<span class=\"line\"><span style=\"color: #c9d1d9\">        protagonist.species = 'insect';</span></span>\n<span class=\"line\"><span style=\"color: #c9d1d9\">    }</span></span>\n<span class=\"line\"><span style=\"color: #c9d1d9\">}</span></span></code></pre>\n<p>It was very easy to throw aside the blanket. He needed only to push himself up a little, and it fell by itself. But to continue was difficult, particularly because he was so unusually wide. He needed arms and hands to push himself upright. Instead of these, however, he had only many small limbs which were incessantly moving with very different motions and which, in addition, he was unable to control. If he wanted to bend one of them, then it was the first to extend itself, and if he finally succeeded doing with this limb what he wanted, in the meantime all the others, as if left free, moved around in an excessively painful agitation. “But I must not stay in bed uselessly,” said Gregor to himself.</p>\n<blockquote>\n<p>At first he wanted to get off the bed with the lower part of his body, but this lower part (which he incidentally had not yet looked at and which he also couldn’t picture clearly) proved itself too difficult to move. The attempt went so slowly. When, having become almost frantic, he finally hurled himself forward with all his force and without thinking, he chose his direction incorrectly, and he hit the lower bedpost hard. The violent pain he felt revealed to him that the lower part of his body was at the moment probably the most sensitive.</p>\n</blockquote>\n<p>Thus, he tried to get his upper body out of the bed first and turned his head carefully toward the edge of the bed. He managed to do this easily, and in spite of its width and weight his body mass at last slowly followed the turning of his head. But as he finally raised his head outside the bed in the open air, he became anxious about moving forward any further in this manner, for if he allowed himself eventually to fall by this process, it would take a miracle to prevent his head from getting injured. And at all costs he must not lose consciousness right now. He preferred to remain in bed.</p>\n<h4 id=\"first-five-selected-publications-in-english\">First five selected publications in English</h4>\n<ol>\n<li>The Castle</li>\n<li>The Great Wall of China</li>\n<li>The Trial</li>\n<li>America</li>\n<li>The Diaries Of Franz Kafka</li>\n</ol>\n<hr>";

				const _internal$5 = {
					injectedFrontmatter: {},
				};
				const frontmatter$5 = {};
				const file$5 = "C:/Users/swbn/Projects/01-web/04-testing-and-sandbox/astro-clean/src/pages/test.md";
				const url$5 = "/test";
				function rawContent$5() {
					return "# One morning, when Gregor Samsa woke from troubled dreams.\r\nOne morning, when Gregor Samsa woke from troubled dreams, he found himself *transformed* in his bed into a horrible  [vermin](http://en.wikipedia.org/wiki/Vermin \"Wikipedia Vermin\"). He lay on his armour-like back, and if he lifted his head a little he could see his brown belly, slightly domed and divided by arches into stiff sections. The bedding was hardly able to cover **strong** it and seemed ready to slide off any moment. His many legs, pitifully thin compared with the size of the rest of him, link waved abouthelplessly as he looked. <cite>“What's happened to me?”</cite> he thought. It wasn't a dream. His room, a proper human room although a little too small, lay peacefully between its four familiar walls.</p>\r\n\r\n## The bedding was hardly able to cover it.\r\n\r\nIt showed a lady fitted out with a fur hat and fur boa who sat upright, raising a heavy fur muff that covered the whole of her lower arm towards the viewer a solid fur muff into which her entire forearm disappeared..\r\n\r\n### Things we know about Gregor's sleeping habits.\r\n\r\n- He always slept on his right side.\r\n- He has to get up early (to start another dreadful day).\r\n- He has a drawer and a alarm clock next to his bed.\r\n- His mother calls him when he gets up to late.\r\n\r\n\r\n<div style=\"overflow-x:auto;\">\r\n<table class=\"data\">\r\n  <tr>\r\n    <th>Writer</th>\r\n    <th>Nationality</th>\r\n    <th>Genre</th>\r\n    <th>Most famous book</th>\r\n  </tr>\r\n  <tr>\r\n    <td>Franz Kafka</td>\r\n    <td>Leo Tolstoy</td>\r\n    <td>F. Scott Fitzgerald</td>\r\n    <td>H.G. Wells</td>\r\n  </tr>\r\n  <tr>\r\n    <td>Austrian</td>\r\n    <td>Russia</td>\r\n    <td>American</td>\r\n    <td>British</td>\r\n  </tr>\r\n  <tr>\r\n    <td>Literature & Fiction, Philosophy, Short Stories</td>\r\n    <td>Literature & Fiction, Philosophy</td>\r\n    <td>Literature & Fiction, Short Stories</td>\r\n    <td>Science Fiction</td>\r\n  </tr>\r\n    <tr>\r\n    <td>The Metamorphosis</td>\r\n    <td>War & Piece</td>\r\n    <td>The Great Gatsby</td>\r\n    <td>War of the Worlds</td>\r\n  </tr>\r\n  </table>\r\n</div>\r\n\r\nFirst he wanted to stand up quietly and undisturbed, get dressed, above all have breakfast, and only then consider further action, for (he noticed this clearly) by thinking things over in bed he would not reach a reasonable conclusion. He remembered that he had already often felt a light pain or other in bed, perhaps the result of an awkward lying position, which later turned out to be purely imaginary when he stood up, and he was eager to see how his present fantasies would gradually dissipate. That the change in his voice was nothing other than the onset of a real chill, an occupational illness of commercial travelers, of that he had not the slightest doubt.\r\n\r\n    function metamorphose(protagonist,author){\r\n        if( protagonist.name.first === 'Gregor' && author.name.last === 'Kafka' ){\r\n            protagonist.species = 'insect';\r\n        }\r\n    }\r\n\r\nIt was very easy to throw aside the blanket. He needed only to push himself up a little, and it fell by itself. But to continue was difficult, particularly because he was so unusually wide. He needed arms and hands to push himself upright. Instead of these, however, he had only many small limbs which were incessantly moving with very different motions and which, in addition, he was unable to control. If he wanted to bend one of them, then it was the first to extend itself, and if he finally succeeded doing with this limb what he wanted, in the meantime all the others, as if left free, moved around in an excessively painful agitation. \"But I must not stay in bed uselessly,\" said Gregor to himself.\r\n\r\n> At first he wanted to get off the bed with the lower part of his body, but this lower part (which he incidentally had not yet looked at and which he also couldn't picture clearly) proved itself too difficult to move. The attempt went so slowly. When, having become almost frantic, he finally hurled himself forward with all his force and without thinking, he chose his direction incorrectly, and he hit the lower bedpost hard. The violent pain he felt revealed to him that the lower part of his body was at the moment probably the most sensitive.\r\n\r\nThus, he tried to get his upper body out of the bed first and turned his head carefully toward the edge of the bed. He managed to do this easily, and in spite of its width and weight his body mass at last slowly followed the turning of his head. But as he finally raised his head outside the bed in the open air, he became anxious about moving forward any further in this manner, for if he allowed himself eventually to fall by this process, it would take a miracle to prevent his head from getting injured. And at all costs he must not lose consciousness right now. He preferred to remain in bed.\r\n\r\n#### First five selected publications in English\r\n1. The Castle\r\n2. The Great Wall of China\r\n3. The Trial\r\n4. America\t\r\n5. The Diaries Of Franz Kafka\r\n\r\n***";
				}
				function compiledContent$5() {
					return html$5;
				}
				function getHeadings$5() {
					return [{"depth":1,"slug":"one-morning-when-gregor-samsa-woke-from-troubled-dreams","text":"One morning, when Gregor Samsa woke from troubled dreams."},{"depth":2,"slug":"the-bedding-was-hardly-able-to-cover-it","text":"The bedding was hardly able to cover it."},{"depth":3,"slug":"things-we-know-about-gregors-sleeping-habits","text":"Things we know about Gregor’s sleeping habits."},{"depth":4,"slug":"first-five-selected-publications-in-english","text":"First five selected publications in English"}];
				}
				function getHeaders$5() {
					console.warn('getHeaders() have been deprecated. Use getHeadings() function instead.');
					return getHeadings$5();
				}				async function Content$5() {
					const { layout, ...content } = frontmatter$5;
					content.file = file$5;
					content.url = url$5;
					content.astro = {};
					Object.defineProperty(content.astro, 'headings', {
						get() {
							throw new Error('The "astro" property is no longer supported! To access "headings" from your layout, try using "Astro.props.headings."')
						}
					});
					Object.defineProperty(content.astro, 'html', {
						get() {
							throw new Error('The "astro" property is no longer supported! To access "html" from your layout, try using "Astro.props.compiledContent()."')
						}
					});
					Object.defineProperty(content.astro, 'source', {
						get() {
							throw new Error('The "astro" property is no longer supported! To access "source" from your layout, try using "Astro.props.rawContent()."')
						}
					});
					const contentFragment = createVNode(Fragment, { 'set:html': html$5 });
					return contentFragment;
				}
				Content$5[Symbol.for('astro.needsHeadRendering')] = true;

const _page12 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  _internal: _internal$5,
  frontmatter: frontmatter$5,
  file: file$5,
  url: url$5,
  rawContent: rawContent$5,
  compiledContent: compiledContent$5,
  getHeadings: getHeadings$5,
  getHeaders: getHeaders$5,
  Content: Content$5,
  default: Content$5
}, Symbol.toStringTag, { value: 'Module' }));

const $$Astro$a = createAstro("C:/Users/swbn/Projects/01-web/04-testing-and-sandbox/astro-clean/src/pages/markdown.astro", "http://localhost:3000/", "file:///C:/Users/swbn/Projects/01-web/04-testing-and-sandbox/astro-clean/");
const $$Markdown = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$a, $$props, $$slots);
  Astro2.self = $$Markdown;
  return renderTemplate`${renderComponent($$result, "MainLayout", $$MainLayout, {}, { "default": () => renderTemplate`${maybeRenderHead($$result)}<div class="prose dark:prose-invert break-words max-w-full">
    ${renderComponent($$result, "testPost.Content", Content$5, {})}
  </div>` })}`;
}, "C:/Users/swbn/Projects/01-web/04-testing-and-sandbox/astro-clean/src/pages/markdown.astro");

const $$file$5 = "C:/Users/swbn/Projects/01-web/04-testing-and-sandbox/astro-clean/src/pages/markdown.astro";
const $$url$5 = "/markdown";

const _page1 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Markdown,
  file: $$file$5,
  url: $$url$5
}, Symbol.toStringTag, { value: 'Module' }));

const get = () => rss({
  title: 'Hello Astro | Testing',
  description: 'Just my sandbox where i test Astro',
  site: 'https://testingastro.netlify.app/',
  items: /* #__PURE__ */ Object.assign({"./posts/post-1.md": () => Promise.resolve().then(() => _page4),"./posts/post-2.md": () => Promise.resolve().then(() => _page5),"./posts/post-3.md": () => Promise.resolve().then(() => _page6),"./posts/post-4.md": () => Promise.resolve().then(() => _page7),"./posts/post-5.md": () => Promise.resolve().then(() => _page8)}),
  customData: `<language>en-us</language>`,
});

const _page2 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  get
}, Symbol.toStringTag, { value: 'Module' }));

const $$Astro$9 = createAstro("C:/Users/swbn/Projects/01-web/04-testing-and-sandbox/astro-clean/src/pages/sandbox.astro", "http://localhost:3000/", "file:///C:/Users/swbn/Projects/01-web/04-testing-and-sandbox/astro-clean/");
const $$Sandbox = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$9, $$props, $$slots);
  Astro2.self = $$Sandbox;
  const pageTitle = "Sandbox page";
  const exampleArr = [
    "arr value 1",
    "arr value 2",
    "arr value 3",
    "arr value 4",
    "arr value 5"
  ];
  const exampleObj = {
    firstKey: "value 1",
    secondKey: "value 2",
    thirdKey: "value 3",
    fourthKey: "value 4",
    fifthKey: "value 5"
  };
  const exampleObjArr = [];
  Object.keys(exampleObj).forEach(
    (key, index) => exampleObjArr.push(exampleObj[key])
  );
  const h2Color = "#E1E2E3";
  const fontWeight = 700;
  const $$definedVars = defineStyleVars([{ h2Color, fontWeight }]);
  return renderTemplate`${renderComponent($$result, "MainLayout", $$MainLayout, { "pageTitle": pageTitle, "class": "astro-IUFYKEST" }, { "default": () => renderTemplate`${maybeRenderHead($$result)}<div class="text-center flex flex-col items-center astro-IUFYKEST"${addAttribute($$definedVars, "style")}>
    <h2 class="text-md font-normal mb-10 w-72 text-slate-400 astro-IUFYKEST">
      everything that happens here may look strange, but don't mind, it's just
      my sandbox where I do nonsense and testing
    </h2>
    <h2 class="text-xl mb-4 astro-IUFYKEST">rendered js array values with html</h2>
    <ul class="list-disc mb-10 text-slate-400 astro-IUFYKEST">
      ${exampleArr.map((key) => renderTemplate`<li class="astro-IUFYKEST">${key}</li>`)}
    </ul>
    <h2 class="text-xl mb-4 astro-IUFYKEST">rendered js object values with html</h2>
    <ul class="list-disc mb-10 text-slate-400 astro-IUFYKEST">
      ${exampleObjArr.map((key) => renderTemplate`<li class="astro-IUFYKEST">${key}</li>`)}
    </ul>
    <h2 class="text-xl astro-IUFYKEST">conditional rendered elements</h2>
    <h2 class="text-md mb-3 astro-IUFYKEST"></h2>
    <ul class="list-disc text-slate-400 mb-10 astro-IUFYKEST">
      ${renderTemplate`<p class="mb-1 astro-IUFYKEST">
            this element will be visible if conditionalRender is true
          </p>`}
      ${renderTemplate`<p class="mb-2 text-red-700 astro-IUFYKEST">
            this text will be red if conditionalRender is true
          </p>` }
    </ul>
    <h2 class="text-xl mb-4 astro-IUFYKEST">client-side script test</h2>
    <div id="ee" class="text-green-300 text-md mb-2 w-64 astro-IUFYKEST"></div>
    <button id="counterButton" class="p-2 bg-slate-600 text-slate-200 rounded-md text-md mb-2 astro-IUFYKEST">counter</button>
    <div class="text-md text-slate-200 astro-IUFYKEST">
      you clicked <span id="counterText" class="astro-IUFYKEST">0</span> times
    </div>
  </div>` })}

${maybeRenderHead($$result)}

`;
}, "C:/Users/swbn/Projects/01-web/04-testing-and-sandbox/astro-clean/src/pages/sandbox.astro");

const $$file$4 = "C:/Users/swbn/Projects/01-web/04-testing-and-sandbox/astro-clean/src/pages/sandbox.astro";
const $$url$4 = "/sandbox";

const _page3 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Sandbox,
  file: $$file$4,
  url: $$url$4
}, Symbol.toStringTag, { value: 'Module' }));

const $$Astro$8 = createAstro("C:/Users/swbn/Projects/01-web/04-testing-and-sandbox/astro-clean/src/components/Tag.astro", "http://localhost:3000/", "file:///C:/Users/swbn/Projects/01-web/04-testing-and-sandbox/astro-clean/");
const $$Tag = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$8, $$props, $$slots);
  Astro2.self = $$Tag;
  const { tag, url } = Astro2.props;
  return renderTemplate`${maybeRenderHead($$result)}<a${addAttribute(url, "href")} class="py-1 px-2 text-sm bg-slate-600 text-slate-200 rounded-md no-underline hover:bg-slate-700 transition flex items-center justify-center">${tag}</a>`;
}, "C:/Users/swbn/Projects/01-web/04-testing-and-sandbox/astro-clean/src/components/Tag.astro");

const $$Astro$7 = createAstro("C:/Users/swbn/Projects/01-web/04-testing-and-sandbox/astro-clean/src/layouts/MarkdownLayout.astro", "http://localhost:3000/", "file:///C:/Users/swbn/Projects/01-web/04-testing-and-sandbox/astro-clean/");
const $$MarkdownLayout = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$7, $$props, $$slots);
  Astro2.self = $$MarkdownLayout;
  const { frontmatter } = Astro2.props;
  return renderTemplate`${renderComponent($$result, "MainLayout", $$MainLayout, {}, { "default": () => renderTemplate`${maybeRenderHead($$result)}<div class="prose dark:prose-invert break-words max-w-full">
    <div class="flex gap-5 mb-10">
      <div class="w-1 bg-slate-600"></div>
      <div>
        <h1 class="mb-2">${frontmatter.title}</h1>
        <p class="m-0">Published on: ${frontmatter.pubDate.slice(0, 10)}</p>
        <p class="m-0">Author: ${frontmatter.author}</p>
        <p class="mb-3 mt-0">${frontmatter.description}</p>
        <div class="flex gap-2">
          ${frontmatter.tags.map((tag) => renderTemplate`${renderComponent($$result, "Tag", $$Tag, { "tag": tag, "url": `${Astro2.url.origin}/tags/${tag}` })}`)}
        </div>
      </div>
    </div>
    ${renderSlot($$result, $$slots["default"])}
  </div>` })}`;
}, "C:/Users/swbn/Projects/01-web/04-testing-and-sandbox/astro-clean/src/layouts/MarkdownLayout.astro");

const html$4 = "<p>Welcome to my <em>new blog</em> about learning Astro! Here, I will share my learning journey as I build a new website.</p>\n<h2 id=\"what-ive-accomplished\">What I’ve accomplished</h2>\n<ol>\n<li>\n<p><strong>Installing Astro</strong>: First, I created a new Astro project and set up my online accounts.</p>\n</li>\n<li>\n<p><strong>Making Pages</strong>: I then learned how to make pages by creating new <code>.astro</code> files and placing them in the <code>src/pages/</code> folder.</p>\n</li>\n<li>\n<p><strong>Making Blog Posts</strong>: This is my first blog post! I now have Astro pages and Markdown posts!</p>\n</li>\n</ol>\n<h2 id=\"whats-next\">What’s next</h2>\n<p>I will finish the Astro tutorial, and then keep adding more posts. Watch this space for more to come.</p>";

				const _internal$4 = {
					injectedFrontmatter: {},
				};
				const frontmatter$4 = {"title":"My First Blog Post","pubDate":"2077-07-01T00:00:00.000Z","description":"This is the first testing post.","author":"liv3rise","image":{"url":"https://astro.build/assets/blog/astro-1-release-update/cover.jpeg","alt":"The Astro logo with the word One."},"tags":["astro","blogging","learning in public","test"],"layout":"../../layouts/MarkdownLayout.astro"};
				const file$4 = "C:/Users/swbn/Projects/01-web/04-testing-and-sandbox/astro-clean/src/pages/posts/post-1.md";
				const url$4 = "/posts/post-1";
				function rawContent$4() {
					return "\r\nWelcome to my _new blog_ about learning Astro! Here, I will share my learning journey as I build a new website.\r\n\r\n## What I've accomplished\r\n\r\n1. **Installing Astro**: First, I created a new Astro project and set up my online accounts.\r\n\r\n2. **Making Pages**: I then learned how to make pages by creating new `.astro` files and placing them in the `src/pages/` folder.\r\n\r\n3. **Making Blog Posts**: This is my first blog post! I now have Astro pages and Markdown posts!\r\n\r\n## What's next\r\n\r\nI will finish the Astro tutorial, and then keep adding more posts. Watch this space for more to come.";
				}
				function compiledContent$4() {
					return html$4;
				}
				function getHeadings$4() {
					return [{"depth":2,"slug":"what-ive-accomplished","text":"What I’ve accomplished"},{"depth":2,"slug":"whats-next","text":"What’s next"}];
				}
				function getHeaders$4() {
					console.warn('getHeaders() have been deprecated. Use getHeadings() function instead.');
					return getHeadings$4();
				}				async function Content$4() {
					const { layout, ...content } = frontmatter$4;
					content.file = file$4;
					content.url = url$4;
					content.astro = {};
					Object.defineProperty(content.astro, 'headings', {
						get() {
							throw new Error('The "astro" property is no longer supported! To access "headings" from your layout, try using "Astro.props.headings."')
						}
					});
					Object.defineProperty(content.astro, 'html', {
						get() {
							throw new Error('The "astro" property is no longer supported! To access "html" from your layout, try using "Astro.props.compiledContent()."')
						}
					});
					Object.defineProperty(content.astro, 'source', {
						get() {
							throw new Error('The "astro" property is no longer supported! To access "source" from your layout, try using "Astro.props.rawContent()."')
						}
					});
					const contentFragment = createVNode(Fragment, { 'set:html': html$4 });
					return createVNode($$MarkdownLayout, {
									file: file$4,
									url: url$4,
									content,
									frontmatter: content,
									headings: getHeadings$4(),
									rawContent: rawContent$4,
									compiledContent: compiledContent$4,
									'server:root': true,
									children: contentFragment
								});
				}
				Content$4[Symbol.for('astro.needsHeadRendering')] = false;

const _page4 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  _internal: _internal$4,
  frontmatter: frontmatter$4,
  file: file$4,
  url: url$4,
  rawContent: rawContent$4,
  compiledContent: compiledContent$4,
  getHeadings: getHeadings$4,
  getHeaders: getHeaders$4,
  Content: Content$4,
  default: Content$4
}, Symbol.toStringTag, { value: 'Module' }));

const html$3 = "<p>Welcome to my <em>new blog</em> about learning Astro! Here, I will share my learning journey as I build a new website.</p>\n<h2 id=\"what-ive-accomplished\">What I’ve accomplished</h2>\n<ol>\n<li>\n<p><strong>Installing Astro</strong>: First, I created a new Astro project and set up my online accounts.</p>\n</li>\n<li>\n<p><strong>Making Pages</strong>: I then learned how to make pages by creating new <code>.astro</code> files and placing them in the <code>src/pages/</code> folder.</p>\n</li>\n<li>\n<p><strong>Making Blog Posts</strong>: This is my first blog post! I now have Astro pages and Markdown posts!</p>\n</li>\n</ol>\n<h2 id=\"whats-next\">What’s next</h2>\n<p>I will finish the Astro tutorial, and then keep adding more posts. Watch this space for more to come.</p>";

				const _internal$3 = {
					injectedFrontmatter: {},
				};
				const frontmatter$3 = {"title":"My Second Blog Post","pubDate":"2077-07-01T00:00:00.000Z","description":"This is the second testing post.","author":"liv3rise","image":{"url":"https://astro.build/assets/blog/astro-1-release-update/cover.jpeg","alt":"The Astro logo with the word One."},"tags":["astro","blogging","learning in public","test"],"layout":"../../layouts/MarkdownLayout.astro"};
				const file$3 = "C:/Users/swbn/Projects/01-web/04-testing-and-sandbox/astro-clean/src/pages/posts/post-2.md";
				const url$3 = "/posts/post-2";
				function rawContent$3() {
					return "\r\nWelcome to my _new blog_ about learning Astro! Here, I will share my learning journey as I build a new website.\r\n\r\n## What I've accomplished\r\n\r\n1. **Installing Astro**: First, I created a new Astro project and set up my online accounts.\r\n\r\n2. **Making Pages**: I then learned how to make pages by creating new `.astro` files and placing them in the `src/pages/` folder.\r\n\r\n3. **Making Blog Posts**: This is my first blog post! I now have Astro pages and Markdown posts!\r\n\r\n## What's next\r\n\r\nI will finish the Astro tutorial, and then keep adding more posts. Watch this space for more to come.";
				}
				function compiledContent$3() {
					return html$3;
				}
				function getHeadings$3() {
					return [{"depth":2,"slug":"what-ive-accomplished","text":"What I’ve accomplished"},{"depth":2,"slug":"whats-next","text":"What’s next"}];
				}
				function getHeaders$3() {
					console.warn('getHeaders() have been deprecated. Use getHeadings() function instead.');
					return getHeadings$3();
				}				async function Content$3() {
					const { layout, ...content } = frontmatter$3;
					content.file = file$3;
					content.url = url$3;
					content.astro = {};
					Object.defineProperty(content.astro, 'headings', {
						get() {
							throw new Error('The "astro" property is no longer supported! To access "headings" from your layout, try using "Astro.props.headings."')
						}
					});
					Object.defineProperty(content.astro, 'html', {
						get() {
							throw new Error('The "astro" property is no longer supported! To access "html" from your layout, try using "Astro.props.compiledContent()."')
						}
					});
					Object.defineProperty(content.astro, 'source', {
						get() {
							throw new Error('The "astro" property is no longer supported! To access "source" from your layout, try using "Astro.props.rawContent()."')
						}
					});
					const contentFragment = createVNode(Fragment, { 'set:html': html$3 });
					return createVNode($$MarkdownLayout, {
									file: file$3,
									url: url$3,
									content,
									frontmatter: content,
									headings: getHeadings$3(),
									rawContent: rawContent$3,
									compiledContent: compiledContent$3,
									'server:root': true,
									children: contentFragment
								});
				}
				Content$3[Symbol.for('astro.needsHeadRendering')] = false;

const _page5 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  _internal: _internal$3,
  frontmatter: frontmatter$3,
  file: file$3,
  url: url$3,
  rawContent: rawContent$3,
  compiledContent: compiledContent$3,
  getHeadings: getHeadings$3,
  getHeaders: getHeaders$3,
  Content: Content$3,
  default: Content$3
}, Symbol.toStringTag, { value: 'Module' }));

const html$2 = "<p>Welcome to my <em>new blog</em> about learning Astro! Here, I will share my learning journey as I build a new website.</p>\n<h2 id=\"what-ive-accomplished\">What I’ve accomplished</h2>\n<ol>\n<li>\n<p><strong>Installing Astro</strong>: First, I created a new Astro project and set up my online accounts.</p>\n</li>\n<li>\n<p><strong>Making Pages</strong>: I then learned how to make pages by creating new <code>.astro</code> files and placing them in the <code>src/pages/</code> folder.</p>\n</li>\n<li>\n<p><strong>Making Blog Posts</strong>: This is my first blog post! I now have Astro pages and Markdown posts!</p>\n</li>\n</ol>\n<h2 id=\"whats-next\">What’s next</h2>\n<p>I will finish the Astro tutorial, and then keep adding more posts. Watch this space for more to come.</p>";

				const _internal$2 = {
					injectedFrontmatter: {},
				};
				const frontmatter$2 = {"title":"My Third Blog Post","pubDate":"2077-07-01T00:00:00.000Z","description":"This is the third testing post.","author":"liv3rise","image":{"url":"https://astro.build/assets/blog/astro-1-release-update/cover.jpeg","alt":"The Astro logo with the word One."},"tags":["astro","blogging","learning in public","test"],"layout":"../../layouts/MarkdownLayout.astro"};
				const file$2 = "C:/Users/swbn/Projects/01-web/04-testing-and-sandbox/astro-clean/src/pages/posts/post-3.md";
				const url$2 = "/posts/post-3";
				function rawContent$2() {
					return "\r\nWelcome to my _new blog_ about learning Astro! Here, I will share my learning journey as I build a new website.\r\n\r\n## What I've accomplished\r\n\r\n1. **Installing Astro**: First, I created a new Astro project and set up my online accounts.\r\n\r\n2. **Making Pages**: I then learned how to make pages by creating new `.astro` files and placing them in the `src/pages/` folder.\r\n\r\n3. **Making Blog Posts**: This is my first blog post! I now have Astro pages and Markdown posts!\r\n\r\n## What's next\r\n\r\nI will finish the Astro tutorial, and then keep adding more posts. Watch this space for more to come.";
				}
				function compiledContent$2() {
					return html$2;
				}
				function getHeadings$2() {
					return [{"depth":2,"slug":"what-ive-accomplished","text":"What I’ve accomplished"},{"depth":2,"slug":"whats-next","text":"What’s next"}];
				}
				function getHeaders$2() {
					console.warn('getHeaders() have been deprecated. Use getHeadings() function instead.');
					return getHeadings$2();
				}				async function Content$2() {
					const { layout, ...content } = frontmatter$2;
					content.file = file$2;
					content.url = url$2;
					content.astro = {};
					Object.defineProperty(content.astro, 'headings', {
						get() {
							throw new Error('The "astro" property is no longer supported! To access "headings" from your layout, try using "Astro.props.headings."')
						}
					});
					Object.defineProperty(content.astro, 'html', {
						get() {
							throw new Error('The "astro" property is no longer supported! To access "html" from your layout, try using "Astro.props.compiledContent()."')
						}
					});
					Object.defineProperty(content.astro, 'source', {
						get() {
							throw new Error('The "astro" property is no longer supported! To access "source" from your layout, try using "Astro.props.rawContent()."')
						}
					});
					const contentFragment = createVNode(Fragment, { 'set:html': html$2 });
					return createVNode($$MarkdownLayout, {
									file: file$2,
									url: url$2,
									content,
									frontmatter: content,
									headings: getHeadings$2(),
									rawContent: rawContent$2,
									compiledContent: compiledContent$2,
									'server:root': true,
									children: contentFragment
								});
				}
				Content$2[Symbol.for('astro.needsHeadRendering')] = false;

const _page6 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  _internal: _internal$2,
  frontmatter: frontmatter$2,
  file: file$2,
  url: url$2,
  rawContent: rawContent$2,
  compiledContent: compiledContent$2,
  getHeadings: getHeadings$2,
  getHeaders: getHeaders$2,
  Content: Content$2,
  default: Content$2
}, Symbol.toStringTag, { value: 'Module' }));

const html$1 = "<p>Welcome to my <em>new blog</em> about learning Astro! Here, I will share my learning journey as I build a new website.</p>\n<h2 id=\"what-ive-accomplished\">What I’ve accomplished</h2>\n<ol>\n<li>\n<p><strong>Installing Astro</strong>: First, I created a new Astro project and set up my online accounts.</p>\n</li>\n<li>\n<p><strong>Making Pages</strong>: I then learned how to make pages by creating new <code>.astro</code> files and placing them in the <code>src/pages/</code> folder.</p>\n</li>\n<li>\n<p><strong>Making Blog Posts</strong>: This is my first blog post! I now have Astro pages and Markdown posts!</p>\n</li>\n</ol>\n<h2 id=\"whats-next\">What’s next</h2>\n<p>I will finish the Astro tutorial, and then keep adding more posts. Watch this space for more to come.</p>";

				const _internal$1 = {
					injectedFrontmatter: {},
				};
				const frontmatter$1 = {"title":"My Fourth Blog Post","pubDate":"2077-07-01T00:00:00.000Z","description":"This is the fourth testing post.","author":"liv3rise","image":{"url":"https://astro.build/assets/blog/astro-1-release-update/cover.jpeg","alt":"The Astro logo with the word One."},"tags":["astro","blogging","learning in public","test"],"layout":"../../layouts/MarkdownLayout.astro"};
				const file$1 = "C:/Users/swbn/Projects/01-web/04-testing-and-sandbox/astro-clean/src/pages/posts/post-4.md";
				const url$1 = "/posts/post-4";
				function rawContent$1() {
					return "\r\nWelcome to my _new blog_ about learning Astro! Here, I will share my learning journey as I build a new website.\r\n\r\n## What I've accomplished\r\n\r\n1. **Installing Astro**: First, I created a new Astro project and set up my online accounts.\r\n\r\n2. **Making Pages**: I then learned how to make pages by creating new `.astro` files and placing them in the `src/pages/` folder.\r\n\r\n3. **Making Blog Posts**: This is my first blog post! I now have Astro pages and Markdown posts!\r\n\r\n## What's next\r\n\r\nI will finish the Astro tutorial, and then keep adding more posts. Watch this space for more to come.";
				}
				function compiledContent$1() {
					return html$1;
				}
				function getHeadings$1() {
					return [{"depth":2,"slug":"what-ive-accomplished","text":"What I’ve accomplished"},{"depth":2,"slug":"whats-next","text":"What’s next"}];
				}
				function getHeaders$1() {
					console.warn('getHeaders() have been deprecated. Use getHeadings() function instead.');
					return getHeadings$1();
				}				async function Content$1() {
					const { layout, ...content } = frontmatter$1;
					content.file = file$1;
					content.url = url$1;
					content.astro = {};
					Object.defineProperty(content.astro, 'headings', {
						get() {
							throw new Error('The "astro" property is no longer supported! To access "headings" from your layout, try using "Astro.props.headings."')
						}
					});
					Object.defineProperty(content.astro, 'html', {
						get() {
							throw new Error('The "astro" property is no longer supported! To access "html" from your layout, try using "Astro.props.compiledContent()."')
						}
					});
					Object.defineProperty(content.astro, 'source', {
						get() {
							throw new Error('The "astro" property is no longer supported! To access "source" from your layout, try using "Astro.props.rawContent()."')
						}
					});
					const contentFragment = createVNode(Fragment, { 'set:html': html$1 });
					return createVNode($$MarkdownLayout, {
									file: file$1,
									url: url$1,
									content,
									frontmatter: content,
									headings: getHeadings$1(),
									rawContent: rawContent$1,
									compiledContent: compiledContent$1,
									'server:root': true,
									children: contentFragment
								});
				}
				Content$1[Symbol.for('astro.needsHeadRendering')] = false;

const _page7 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  _internal: _internal$1,
  frontmatter: frontmatter$1,
  file: file$1,
  url: url$1,
  rawContent: rawContent$1,
  compiledContent: compiledContent$1,
  getHeadings: getHeadings$1,
  getHeaders: getHeaders$1,
  Content: Content$1,
  default: Content$1
}, Symbol.toStringTag, { value: 'Module' }));

const html = "<h1 id=\"123\">123</h1>\n<h2 id=\"123-1\">123</h2>\n<h3 id=\"123-2\">123</h3>\n<h4 id=\"123-3\">123</h4>\n<p><em>123</em></p>\n<p><strong>123</strong></p>\n<ul>\n<li>123</li>\n<li>123</li>\n<li>123</li>\n<li>123</li>\n</ul>";

				const _internal = {
					injectedFrontmatter: {},
				};
				const frontmatter = {"title":"My Fifth Blog Post","pubDate":"2077-07-01T00:00:00.000Z","description":"This is the fifth testing post.","author":"liv3rise","image":{"url":"https://astro.build/assets/blog/astro-1-release-update/cover.jpeg","alt":"The Astro logo with the word One."},"tags":["weird","test"],"layout":"../../layouts/MarkdownLayout.astro"};
				const file = "C:/Users/swbn/Projects/01-web/04-testing-and-sandbox/astro-clean/src/pages/posts/post-5.md";
				const url = "/posts/post-5";
				function rawContent() {
					return "\r\n# 123\r\n\r\n## 123\r\n\r\n### 123\r\n\r\n#### 123\r\n\r\n*123*\r\n\r\n**123**\r\n\r\n- 123\r\n- 123\r\n- 123\r\n- 123";
				}
				function compiledContent() {
					return html;
				}
				function getHeadings() {
					return [{"depth":1,"slug":"123","text":"123"},{"depth":2,"slug":"123-1","text":"123"},{"depth":3,"slug":"123-2","text":"123"},{"depth":4,"slug":"123-3","text":"123"}];
				}
				function getHeaders() {
					console.warn('getHeaders() have been deprecated. Use getHeadings() function instead.');
					return getHeadings();
				}				async function Content() {
					const { layout, ...content } = frontmatter;
					content.file = file;
					content.url = url;
					content.astro = {};
					Object.defineProperty(content.astro, 'headings', {
						get() {
							throw new Error('The "astro" property is no longer supported! To access "headings" from your layout, try using "Astro.props.headings."')
						}
					});
					Object.defineProperty(content.astro, 'html', {
						get() {
							throw new Error('The "astro" property is no longer supported! To access "html" from your layout, try using "Astro.props.compiledContent()."')
						}
					});
					Object.defineProperty(content.astro, 'source', {
						get() {
							throw new Error('The "astro" property is no longer supported! To access "source" from your layout, try using "Astro.props.rawContent()."')
						}
					});
					const contentFragment = createVNode(Fragment, { 'set:html': html });
					return createVNode($$MarkdownLayout, {
									file,
									url,
									content,
									frontmatter: content,
									headings: getHeadings(),
									rawContent,
									compiledContent,
									'server:root': true,
									children: contentFragment
								});
				}
				Content[Symbol.for('astro.needsHeadRendering')] = false;

const _page8 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  _internal,
  frontmatter,
  file,
  url,
  rawContent,
  compiledContent,
  getHeadings,
  getHeaders,
  Content,
  default: Content
}, Symbol.toStringTag, { value: 'Module' }));

const $$Astro$6 = createAstro("C:/Users/swbn/Projects/01-web/04-testing-and-sandbox/astro-clean/src/components/Icon.astro", "http://localhost:3000/", "file:///C:/Users/swbn/Projects/01-web/04-testing-and-sandbox/astro-clean/");
const $$Icon = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$6, $$props, $$slots);
  Astro2.self = $$Icon;
  const { iconName, className } = Astro2.props;
  return renderTemplate`${renderComponent($$result, "iconify-icon", "iconify-icon", { "class": className, "icon": iconName })}`;
}, "C:/Users/swbn/Projects/01-web/04-testing-and-sandbox/astro-clean/src/components/Icon.astro");

const $$Astro$5 = createAstro("C:/Users/swbn/Projects/01-web/04-testing-and-sandbox/astro-clean/src/components/PostLink.astro", "http://localhost:3000/", "file:///C:/Users/swbn/Projects/01-web/04-testing-and-sandbox/astro-clean/");
const $$PostLink = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$5, $$props, $$slots);
  Astro2.self = $$PostLink;
  const { title, description, url } = Astro2.props;
  return renderTemplate`${maybeRenderHead($$result)}<a${addAttribute(url, "href")} class="flex w-[100%] sm:w-[48.5%] p-4 border-slate-500 border-2 rounded-md transition justify-between hover:border-slate-600">
    <div class="flex flex-col">
        <div class="text-lg md:text-xl font-bold mb-2">${title}</div>
        <div class="text-md">${description}</div>
    </div>
    <div class="pt-0.5">
        ${renderComponent($$result, "Icon", $$Icon, { "iconName": "material-symbols:arrow-right-alt-rounded", "className": "text-2xl" })}
    </div>
</a>`;
}, "C:/Users/swbn/Projects/01-web/04-testing-and-sandbox/astro-clean/src/components/PostLink.astro");

const $$Astro$4 = createAstro("C:/Users/swbn/Projects/01-web/04-testing-and-sandbox/astro-clean/src/pages/blog.astro", "http://localhost:3000/", "file:///C:/Users/swbn/Projects/01-web/04-testing-and-sandbox/astro-clean/");
const $$Blog = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$4, $$props, $$slots);
  Astro2.self = $$Blog;
  const pageTitle = "Blog page";
  const getPosts = await Astro2.glob(/* #__PURE__ */ Object.assign({"./posts/post-1.md": () => Promise.resolve().then(() => _page4),"./posts/post-2.md": () => Promise.resolve().then(() => _page5),"./posts/post-3.md": () => Promise.resolve().then(() => _page6),"./posts/post-4.md": () => Promise.resolve().then(() => _page7),"./posts/post-5.md": () => Promise.resolve().then(() => _page8)}), () => "./posts/*.md");
  const uniqueTags = [...new Set(getPosts.map((post) => post.frontmatter.tags).flat())];
  return renderTemplate`${renderComponent($$result, "MainLayout", $$MainLayout, { "pageTitle": pageTitle }, { "default": () => renderTemplate`${maybeRenderHead($$result)}<div class="flex flex-wrap items-center justify-center gap-2 mb-7">${uniqueTags.map((tag) => renderTemplate`${renderComponent($$result, "Tag", $$Tag, { "tag": tag, "url": `${Astro2.url.origin}/tags/${tag}` })}`)}</div><ul class="list-disc [&>*:hover]:text-slate-500 text-slate-400 flex flex-col sm:flex-row w-[74%] flex-wrap justify-between gap-y-5">
    ${getPosts.map((post) => renderTemplate`${renderComponent($$result, "PostLink", $$PostLink, { "title": post.frontmatter.title, "description": post.frontmatter.description, "url": post.url })}`)}
  </ul>` })}`;
}, "C:/Users/swbn/Projects/01-web/04-testing-and-sandbox/astro-clean/src/pages/blog.astro");

const $$file$3 = "C:/Users/swbn/Projects/01-web/04-testing-and-sandbox/astro-clean/src/pages/blog.astro";
const $$url$3 = "/blog";

const _page9 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Blog,
  file: $$file$3,
  url: $$url$3
}, Symbol.toStringTag, { value: 'Module' }));

const $$Astro$3 = createAstro("C:/Users/swbn/Projects/01-web/04-testing-and-sandbox/astro-clean/src/components/TagLink.astro", "http://localhost:3000/", "file:///C:/Users/swbn/Projects/01-web/04-testing-and-sandbox/astro-clean/");
const $$TagLink = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$3, $$props, $$slots);
  Astro2.self = $$TagLink;
  const { tag, url } = Astro2.props;
  return renderTemplate`${maybeRenderHead($$result)}<a${addAttribute(url, "href")} class="flex w-[100%] md:w-[48.5%] p-4 border-slate-500 text-slate-500 border-2 rounded-md transition justify-between hover:border-slate-600 hover:text-slate-600">
    <div class="flex flex-col justify-center">
        <div class="text-[0.775rem] sm:text-sm lg:text-lg font-bold">Posts with tag <span class=" text-slate-200 p-1 bg-slate-600 rounded-md">${tag}</span></div>
    </div>
    <div class="pt-0.5">
        ${renderComponent($$result, "Icon", $$Icon, { "iconName": "material-symbols:arrow-right-alt-rounded", "className": "text-2xl" })}
    </div>
</a>`;
}, "C:/Users/swbn/Projects/01-web/04-testing-and-sandbox/astro-clean/src/components/TagLink.astro");

const $$Astro$2 = createAstro("C:/Users/swbn/Projects/01-web/04-testing-and-sandbox/astro-clean/src/pages/tags/index.astro", "http://localhost:3000/", "file:///C:/Users/swbn/Projects/01-web/04-testing-and-sandbox/astro-clean/");
const $$Index = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$2, $$props, $$slots);
  Astro2.self = $$Index;
  const allPosts = await Astro2.glob(/* #__PURE__ */ Object.assign({"../posts/post-1.md": () => Promise.resolve().then(() => _page4),"../posts/post-2.md": () => Promise.resolve().then(() => _page5),"../posts/post-3.md": () => Promise.resolve().then(() => _page6),"../posts/post-4.md": () => Promise.resolve().then(() => _page7),"../posts/post-5.md": () => Promise.resolve().then(() => _page8)}), () => "../posts/*.md");
  const uniqueTags = [...new Set(allPosts.map((post) => post.frontmatter.tags).flat())];
  const pageTitle = "List of blog tags";
  return renderTemplate`${renderComponent($$result, "MainLayout", $$MainLayout, { "pageTitle": pageTitle }, { "default": () => renderTemplate`${maybeRenderHead($$result)}<div class="flex flex-wrap flex-col md:flex-row w-[100%] xl:w-[60%] items-center justify-between gap-y-4">
        ${uniqueTags.map((tag) => renderTemplate`${renderComponent($$result, "TagLink", $$TagLink, { "tag": tag, "url": `${Astro2.url.origin}/tags/${tag}` })}`)}
    </div>` })}`;
}, "C:/Users/swbn/Projects/01-web/04-testing-and-sandbox/astro-clean/src/pages/tags/index.astro");

const $$file$2 = "C:/Users/swbn/Projects/01-web/04-testing-and-sandbox/astro-clean/src/pages/tags/index.astro";
const $$url$2 = "/tags";

const _page10 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Index,
  file: $$file$2,
  url: $$url$2
}, Symbol.toStringTag, { value: 'Module' }));

const $$Astro$1 = createAstro("C:/Users/swbn/Projects/01-web/04-testing-and-sandbox/astro-clean/src/pages/tags/[tag].astro", "http://localhost:3000/", "file:///C:/Users/swbn/Projects/01-web/04-testing-and-sandbox/astro-clean/");
const $$tag = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$1, $$props, $$slots);
  Astro2.self = $$tag;
  const { tag } = Astro2.params;
  const allPosts = await Astro2.glob(/* #__PURE__ */ Object.assign({"../posts/post-1.md": () => Promise.resolve().then(() => _page4),"../posts/post-2.md": () => Promise.resolve().then(() => _page5),"../posts/post-3.md": () => Promise.resolve().then(() => _page6),"../posts/post-4.md": () => Promise.resolve().then(() => _page7),"../posts/post-5.md": () => Promise.resolve().then(() => _page8)}), () => "../posts/*.md");
  const filteredPosts = allPosts.filter((post) => post.frontmatter.tags.includes(tag));
  const pageTitle = `All posts with tag`;
  return renderTemplate`${renderComponent($$result, "MainLayout", $$MainLayout, { "pageTitle": pageTitle, "tag": tag }, { "default": () => renderTemplate`${maybeRenderHead($$result)}<ul class="list-disc [&>*:hover]:text-slate-500 text-slate-400 flex flex-col sm:flex-row w-[74%] flex-wrap justify-between gap-y-5">
        ${filteredPosts.map((post) => renderTemplate`${renderComponent($$result, "PostLink", $$PostLink, { "title": post.frontmatter.title, "description": post.frontmatter.description, "url": post.url })}`)}
      </ul>` })}`;
}, "C:/Users/swbn/Projects/01-web/04-testing-and-sandbox/astro-clean/src/pages/tags/[tag].astro");

const $$file$1 = "C:/Users/swbn/Projects/01-web/04-testing-and-sandbox/astro-clean/src/pages/tags/[tag].astro";
const $$url$1 = "/tags/[tag]";

const _page11 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$tag,
  file: $$file$1,
  url: $$url$1
}, Symbol.toStringTag, { value: 'Module' }));

const $$Astro = createAstro("C:/Users/swbn/Projects/01-web/04-testing-and-sandbox/astro-clean/src/pages/api/user/[id].astro", "http://localhost:3000/", "file:///C:/Users/swbn/Projects/01-web/04-testing-and-sandbox/astro-clean/");
const $$id = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$id;
  const userId = parseInt(Astro2.params.id);
  const users = [{ id: 1, name: "RandomUserName123" }, { id: 2, name: "AnotherRandomUser33" }];
  function getUser(id) {
    const user = users.find((user2) => user2.id === id);
    return user ? user.name : "User not found";
  }
  return renderTemplate`<html>
  ${maybeRenderHead($$result)}<body class="h-screen flex items-center justify-center">
    <div class="flex items-center justify-center bg-slate-800 min-w-60 p-4 rounded-full shadow-slate-900 shadow-sm hover:bg-slate-900 transition-all">
      <h1 class="text-3xl text-slate-200">${getUser(userId)}</h1>
    </div>
  </body>
</html>`;
}, "C:/Users/swbn/Projects/01-web/04-testing-and-sandbox/astro-clean/src/pages/api/user/[id].astro");

const $$file = "C:/Users/swbn/Projects/01-web/04-testing-and-sandbox/astro-clean/src/pages/api/user/[id].astro";
const $$url = "/api/user/[id]";

const _page13 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$id,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const pageMap = new Map([["src/pages/index.astro", _page0],["src/pages/markdown.astro", _page1],["src/pages/rss.xml.js", _page2],["src/pages/sandbox.astro", _page3],["src/pages/posts/post-1.md", _page4],["src/pages/posts/post-2.md", _page5],["src/pages/posts/post-3.md", _page6],["src/pages/posts/post-4.md", _page7],["src/pages/posts/post-5.md", _page8],["src/pages/blog.astro", _page9],["src/pages/tags/index.astro", _page10],["src/pages/tags/[tag].astro", _page11],["src/pages/test.md", _page12],["src/pages/api/user/[id].astro", _page13],]);
const renderers = [Object.assign({"name":"astro:jsx","serverEntrypoint":"astro/jsx/server.js","jsxImportSource":"astro"}, { ssr: server_default }),];

if (typeof process !== "undefined") {
  if (process.argv.includes("--verbose")) ; else if (process.argv.includes("--silent")) ; else ;
}

const SCRIPT_EXTENSIONS = /* @__PURE__ */ new Set([".js", ".ts"]);
new RegExp(
  `\\.(${Array.from(SCRIPT_EXTENSIONS).map((s) => s.slice(1)).join("|")})($|\\?)`
);

const STYLE_EXTENSIONS = /* @__PURE__ */ new Set([
  ".css",
  ".pcss",
  ".postcss",
  ".scss",
  ".sass",
  ".styl",
  ".stylus",
  ".less"
]);
new RegExp(
  `\\.(${Array.from(STYLE_EXTENSIONS).map((s) => s.slice(1)).join("|")})($|\\?)`
);

function getRouteGenerator(segments, addTrailingSlash) {
  const template = segments.map((segment) => {
    return "/" + segment.map((part) => {
      if (part.spread) {
        return `:${part.content.slice(3)}(.*)?`;
      } else if (part.dynamic) {
        return `:${part.content}`;
      } else {
        return part.content.normalize().replace(/\?/g, "%3F").replace(/#/g, "%23").replace(/%5B/g, "[").replace(/%5D/g, "]").replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
      }
    }).join("");
  }).join("");
  let trailing = "";
  if (addTrailingSlash === "always" && segments.length) {
    trailing = "/";
  }
  const toPath = compile(template + trailing);
  return toPath;
}

function deserializeRouteData(rawRouteData) {
  return {
    route: rawRouteData.route,
    type: rawRouteData.type,
    pattern: new RegExp(rawRouteData.pattern),
    params: rawRouteData.params,
    component: rawRouteData.component,
    generate: getRouteGenerator(rawRouteData.segments, rawRouteData._meta.trailingSlash),
    pathname: rawRouteData.pathname || void 0,
    segments: rawRouteData.segments
  };
}

function deserializeManifest(serializedManifest) {
  const routes = [];
  for (const serializedRoute of serializedManifest.routes) {
    routes.push({
      ...serializedRoute,
      routeData: deserializeRouteData(serializedRoute.routeData)
    });
    const route = serializedRoute;
    route.routeData = deserializeRouteData(serializedRoute.routeData);
  }
  const assets = new Set(serializedManifest.assets);
  return {
    ...serializedManifest,
    assets,
    routes
  };
}

const _manifest = Object.assign(deserializeManifest({"adapterName":"@astrojs/netlify/functions","routes":[{"file":"","links":["assets/_id_.eedbeeec.css","assets/post-1.f82757c1.css"],"scripts":[{"type":"external","value":"hoisted.421b1382.js"}],"routeData":{"route":"/","type":"page","pattern":"^\\/$","segments":[],"params":[],"component":"src/pages/index.astro","pathname":"/","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":["assets/_id_.eedbeeec.css","assets/post-1.f82757c1.css"],"scripts":[{"type":"external","value":"hoisted.421b1382.js"}],"routeData":{"route":"/markdown","type":"page","pattern":"^\\/markdown\\/?$","segments":[[{"content":"markdown","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/markdown.astro","pathname":"/markdown","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":["assets/post-1.f82757c1.css","assets/_id_.eedbeeec.css"],"scripts":[{"type":"external","value":"hoisted.421b1382.js"}],"routeData":{"route":"/rss.xml","type":"endpoint","pattern":"^\\/rss\\.xml$","segments":[[{"content":"rss.xml","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/rss.xml.js","pathname":"/rss.xml","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":["assets/_id_.eedbeeec.css","assets/post-1.f82757c1.css","assets/sandbox.6b9eecf8.css"],"scripts":[{"type":"external","value":"hoisted.c5382807.js"}],"routeData":{"route":"/sandbox","type":"page","pattern":"^\\/sandbox\\/?$","segments":[[{"content":"sandbox","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/sandbox.astro","pathname":"/sandbox","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":["assets/_id_.eedbeeec.css","assets/post-1.f82757c1.css"],"scripts":[{"type":"external","value":"hoisted.421b1382.js"}],"routeData":{"route":"/posts/post-1","type":"page","pattern":"^\\/posts\\/post-1\\/?$","segments":[[{"content":"posts","dynamic":false,"spread":false}],[{"content":"post-1","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/posts/post-1.md","pathname":"/posts/post-1","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":["assets/_id_.eedbeeec.css","assets/post-1.f82757c1.css"],"scripts":[{"type":"external","value":"hoisted.421b1382.js"}],"routeData":{"route":"/posts/post-2","type":"page","pattern":"^\\/posts\\/post-2\\/?$","segments":[[{"content":"posts","dynamic":false,"spread":false}],[{"content":"post-2","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/posts/post-2.md","pathname":"/posts/post-2","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":["assets/_id_.eedbeeec.css","assets/post-1.f82757c1.css"],"scripts":[{"type":"external","value":"hoisted.421b1382.js"}],"routeData":{"route":"/posts/post-3","type":"page","pattern":"^\\/posts\\/post-3\\/?$","segments":[[{"content":"posts","dynamic":false,"spread":false}],[{"content":"post-3","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/posts/post-3.md","pathname":"/posts/post-3","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":["assets/_id_.eedbeeec.css","assets/post-1.f82757c1.css"],"scripts":[{"type":"external","value":"hoisted.421b1382.js"}],"routeData":{"route":"/posts/post-4","type":"page","pattern":"^\\/posts\\/post-4\\/?$","segments":[[{"content":"posts","dynamic":false,"spread":false}],[{"content":"post-4","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/posts/post-4.md","pathname":"/posts/post-4","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":["assets/_id_.eedbeeec.css","assets/post-1.f82757c1.css"],"scripts":[{"type":"external","value":"hoisted.421b1382.js"}],"routeData":{"route":"/posts/post-5","type":"page","pattern":"^\\/posts\\/post-5\\/?$","segments":[[{"content":"posts","dynamic":false,"spread":false}],[{"content":"post-5","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/posts/post-5.md","pathname":"/posts/post-5","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":["assets/_id_.eedbeeec.css","assets/post-1.f82757c1.css"],"scripts":[{"type":"external","value":"hoisted.421b1382.js"}],"routeData":{"route":"/blog","type":"page","pattern":"^\\/blog\\/?$","segments":[[{"content":"blog","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/blog.astro","pathname":"/blog","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":["assets/post-1.f82757c1.css","assets/_id_.eedbeeec.css"],"scripts":[{"type":"external","value":"hoisted.421b1382.js"}],"routeData":{"route":"/tags","type":"page","pattern":"^\\/tags\\/?$","segments":[[{"content":"tags","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/tags/index.astro","pathname":"/tags","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":["assets/post-1.f82757c1.css","assets/_id_.eedbeeec.css"],"scripts":[{"type":"external","value":"hoisted.421b1382.js"}],"routeData":{"route":"/tags/[tag]","type":"page","pattern":"^\\/tags\\/([^/]+?)\\/?$","segments":[[{"content":"tags","dynamic":false,"spread":false}],[{"content":"tag","dynamic":true,"spread":false}]],"params":["tag"],"component":"src/pages/tags/[tag].astro","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":["assets/_id_.eedbeeec.css"],"scripts":[],"routeData":{"route":"/test","type":"page","pattern":"^\\/test\\/?$","segments":[[{"content":"test","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/test.md","pathname":"/test","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":["assets/_id_.eedbeeec.css"],"scripts":[],"routeData":{"route":"/api/user/[id]","type":"page","pattern":"^\\/api\\/user\\/([^/]+?)\\/?$","segments":[[{"content":"api","dynamic":false,"spread":false}],[{"content":"user","dynamic":false,"spread":false}],[{"content":"id","dynamic":true,"spread":false}]],"params":["id"],"component":"src/pages/api/user/[id].astro","_meta":{"trailingSlash":"ignore"}}}],"site":"http://localhost:3000/","base":"/","markdown":{"drafts":false,"syntaxHighlight":"shiki","shikiConfig":{"langs":[],"theme":"github-dark","wrap":false},"remarkPlugins":[],"rehypePlugins":[],"remarkRehype":{},"extendDefaultPlugins":false,"isAstroFlavoredMd":false,"isExperimentalContentCollections":false,"contentDir":"file:///C:/Users/swbn/Projects/01-web/04-testing-and-sandbox/astro-clean/src/content/"},"pageMap":null,"renderers":[],"entryModules":{"\u0000@astrojs-ssr-virtual-entry":"entry.mjs","/astro/hoisted.js?q=0":"hoisted.c5382807.js","/astro/hoisted.js?q=1":"hoisted.421b1382.js","astro:scripts/before-hydration.js":""},"assets":["/assets/_id_.eedbeeec.css","/assets/post-1.f82757c1.css","/assets/sandbox.6b9eecf8.css","/favicon.svg","/hoisted.421b1382.js","/hoisted.c5382807.js","/main.css","/svg/waving-hand.svg"]}), {
	pageMap: pageMap,
	renderers: renderers
});
const _args = {};
const _exports = adapter.createExports(_manifest, _args);
const handler = _exports['handler'];

const _start = 'start';
if(_start in adapter) {
	adapter[_start](_manifest, _args);
}

export { handler, pageMap, renderers };
