module.exports = [
"[project]/public/fonts/CabinetGrotesk-Medium.ttf (static in ecmascript)", ((__turbopack_context__) => {

__turbopack_context__.v("/_next/static/media/CabinetGrotesk-Medium.51c46af4.ttf");}),
"[project]/public/fonts/ClashDisplay-Semibold.ttf (static in ecmascript)", ((__turbopack_context__) => {

__turbopack_context__.v("/_next/static/media/ClashDisplay-Semibold.c5d4e33f.ttf");}),
"[project]/src/app/opengraph-image.tsx [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "alt",
    ()=>alt,
    "contentType",
    ()=>contentType,
    "default",
    ()=>Image,
    "dynamic",
    ()=>dynamic,
    "runtime",
    ()=>runtime,
    "size",
    ()=>size
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/rsc/react-jsx-dev-runtime.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$og$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/og.js [app-rsc] (ecmascript)");
(()=>{
    const e = new Error("Cannot find module '@/data/resume'");
    e.code = 'MODULE_NOT_FOUND';
    throw e;
})();
const __TURBOPACK__import$2e$meta__ = {
    get url () {
        return `file://${__turbopack_context__.P("src/app/opengraph-image.tsx")}`;
    }
};
;
;
;
const runtime = "edge";
const dynamic = "force-static";
const alt = DATA.name;
const size = {
    width: 1200,
    height: 630
};
const contentType = "image/png";
const getFontData = async ()=>{
    try {
        const [cabinetGrotesk, clashDisplay] = await Promise.all([
            fetch(new __turbopack_context__.U(__turbopack_context__.r("[project]/public/fonts/CabinetGrotesk-Medium.ttf (static in ecmascript)"))).then((res)=>res.arrayBuffer()),
            fetch(new __turbopack_context__.U(__turbopack_context__.r("[project]/public/fonts/ClashDisplay-Semibold.ttf (static in ecmascript)"))).then((res)=>res.arrayBuffer())
        ]);
        return {
            cabinetGrotesk,
            clashDisplay
        };
    } catch (error) {
        console.error("Failed to load fonts:", error);
        return null;
    }
};
const styles = {
    outerWrapper: {
        height: "100%",
        width: "100%",
        display: "flex",
        flexDirection: "column",
        backgroundColor: "#ffffff",
        position: "relative"
    },
    middleWrapper: {
        height: "100%",
        width: "100%",
        display: "flex",
        flexDirection: "column",
        backgroundColor: "#ffffff",
        position: "relative",
        padding: "40px"
    },
    wrapper: {
        height: "100%",
        width: "100%",
        display: "flex",
        flexDirection: "column",
        backgroundColor: "#fafafa",
        position: "relative",
        padding: "40px",
        border: "1px solid #e5e5e5",
        borderRadius: "12px"
    },
    imageSection: {
        position: "absolute",
        top: "40px",
        left: "40px",
        display: "flex",
        alignItems: "center",
        zIndex: "2"
    },
    mainContainer: {
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-start",
        justifyContent: "flex-end",
        height: "100%",
        width: "100%",
        position: "relative",
        zIndex: "1"
    },
    image: {
        width: "140px",
        height: "140px",
        borderRadius: "24px",
        border: "4px solid #e5e5e5",
        objectFit: "cover"
    },
    title: {
        fontFamily: "Clash Display",
        fontSize: "48px",
        fontWeight: "600",
        lineHeight: "1.1",
        textAlign: "left",
        color: "#000000",
        marginBottom: "16px",
        letterSpacing: "-0.02em",
        maxWidth: "900px"
    },
    description: {
        fontSize: "20px",
        fontWeight: "400",
        lineHeight: "1.5",
        textAlign: "left",
        maxWidth: "800px",
        color: "#404040",
        marginBottom: "32px",
        textWrap: "balance"
    }
};
async function Image() {
    try {
        const fontData = await getFontData();
        const imageUrl = DATA.avatarUrl ? new URL(DATA.avatarUrl, DATA.url).toString() : undefined;
        return new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$og$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["ImageResponse"](/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            style: styles.outerWrapper,
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                style: styles.middleWrapper,
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    style: styles.wrapper,
                    children: [
                        imageUrl && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            style: styles.imageSection,
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                                src: imageUrl,
                                alt: DATA.name,
                                style: styles.image
                            }, void 0, false, {
                                fileName: "[project]/src/app/opengraph-image.tsx",
                                lineNumber: 123,
                                columnNumber: 37
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/src/app/opengraph-image.tsx",
                            lineNumber: 122,
                            columnNumber: 33
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            style: styles.mainContainer,
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    style: styles.title,
                                    children: DATA.name
                                }, void 0, false, {
                                    fileName: "[project]/src/app/opengraph-image.tsx",
                                    lineNumber: 127,
                                    columnNumber: 33
                                }, this),
                                DATA.description && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    style: styles.description,
                                    children: DATA.description
                                }, void 0, false, {
                                    fileName: "[project]/src/app/opengraph-image.tsx",
                                    lineNumber: 129,
                                    columnNumber: 37
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/app/opengraph-image.tsx",
                            lineNumber: 126,
                            columnNumber: 29
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/app/opengraph-image.tsx",
                    lineNumber: 120,
                    columnNumber: 25
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/app/opengraph-image.tsx",
                lineNumber: 119,
                columnNumber: 21
            }, this)
        }, void 0, false, {
            fileName: "[project]/src/app/opengraph-image.tsx",
            lineNumber: 118,
            columnNumber: 17
        }, this), {
            ...size,
            fonts: fontData ? [
                {
                    name: "Cabinet Grotesk",
                    data: fontData.cabinetGrotesk,
                    weight: 400,
                    style: "normal"
                },
                {
                    name: "Cabinet Grotesk",
                    data: fontData.cabinetGrotesk,
                    weight: 700,
                    style: "normal"
                },
                {
                    name: "Clash Display",
                    data: fontData.clashDisplay,
                    weight: 600,
                    style: "normal"
                }
            ] : undefined
        });
    } catch (error) {
        console.error("Error generating OpenGraph image:", error);
        return new Response(`Failed to generate image: ${error instanceof Error ? error.message : "Unknown error"}`, {
            status: 500
        });
    }
}
}),
"[project]/src/app/opengraph-image--metadata.js [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$opengraph$2d$image$2e$tsx__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/app/opengraph-image.tsx [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$lib$2f$metadata$2f$get$2d$metadata$2d$route$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/lib/metadata/get-metadata-route.js [app-rsc] (ecmascript)");
;
;
const imageModule = {
    alt: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$opengraph$2d$image$2e$tsx__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["alt"],
    contentType: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$opengraph$2d$image$2e$tsx__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["contentType"],
    dynamic: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$opengraph$2d$image$2e$tsx__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["dynamic"],
    runtime: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$opengraph$2d$image$2e$tsx__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["runtime"],
    size: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$opengraph$2d$image$2e$tsx__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["size"]
};
async function __TURBOPACK__default__export__(props) {
    const { __metadata_id__: _, ...params } = await props.params;
    const imageUrl = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$lib$2f$metadata$2f$get$2d$metadata$2d$route$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["fillMetadataSegment"])("/", params, "opengraph-image");
    function getImageMetadata(imageMetadata, idParam) {
        const data = {
            alt: imageMetadata.alt,
            type: imageMetadata.contentType || 'image/png',
            url: imageUrl + (idParam ? '/' + idParam : '') + "?b90f8c397b2b0c39"
        };
        const { size } = imageMetadata;
        if (size) {
            data.width = size.width;
            data.height = size.height;
        }
        return data;
    }
    return [
        getImageMetadata(imageModule, '')
    ];
}
}),
"[project]/node_modules/next/dist/server/route-modules/app-page/vendored/rsc/react-jsx-dev-runtime.js [app-rsc] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

module.exports = __turbopack_context__.r("[project]/node_modules/next/dist/server/route-modules/app-page/module.compiled.js [app-rsc] (ecmascript)").vendored['react-rsc'].ReactJsxDevRuntime; //# sourceMappingURL=react-jsx-dev-runtime.js.map
}),
"[project]/node_modules/next/dist/server/og/image-response.js [app-rsc] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "ImageResponse", {
    enumerable: true,
    get: function() {
        return ImageResponse;
    }
});
function importModule() {
    return __turbopack_context__.A("[externals]/next/dist/compiled/@vercel/og/index.node.js [external] (next/dist/compiled/@vercel/og/index.node.js, esm_import, async loader)");
}
class ImageResponse extends Response {
    static #_ = this.displayName = 'ImageResponse';
    constructor(...args){
        const readable = new ReadableStream({
            async start (controller) {
                const OGImageResponse = // as the auto resolving is not working
                (await importModule()).ImageResponse;
                const imageResponse = new OGImageResponse(...args);
                if (!imageResponse.body) {
                    return controller.close();
                }
                const reader = imageResponse.body.getReader();
                while(true){
                    const { done, value } = await reader.read();
                    if (done) {
                        return controller.close();
                    }
                    controller.enqueue(value);
                }
            }
        });
        const options = args[1] || {};
        const headers = new Headers({
            'content-type': 'image/png',
            'cache-control': ("TURBOPACK compile-time truthy", 1) ? 'no-cache, no-store' : "TURBOPACK unreachable"
        });
        if (options.headers) {
            const newHeaders = new Headers(options.headers);
            newHeaders.forEach((value, key)=>headers.set(key, value));
        }
        super(readable, {
            headers,
            status: options.status,
            statusText: options.statusText
        });
    }
} //# sourceMappingURL=image-response.js.map
}),
"[project]/node_modules/next/og.js [app-rsc] (ecmascript)", ((__turbopack_context__, module, exports) => {

module.exports = __turbopack_context__.r("[project]/node_modules/next/dist/server/og/image-response.js [app-rsc] (ecmascript)");
}),
];

//# sourceMappingURL=_5de9f556._.js.map