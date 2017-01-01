"use strict";

const fs         = require("fs")
	, gulp       = require("gulp")
	, babel      = require("gulp-babel")
	, browserify = require("gulp-browserify")
	, CleanCss   = require("clean-css")
	, del        = require("del")
	, parse5     = require("parse5")
	, plumber    = require("gulp-plumber")
	, pug        = require("gulp-pug")
	, rename     = require("gulp-rename")
	, tap        = require("gulp-tap")
	, uglify     = require("gulp-uglify")
;

const strings = require("./src/strings/en.js");

gulp.task("pug", () => {
	return gulp.src("./src/index.pug")
		.pipe(plumber())
		.pipe(pug({ locals: strings }))
		.pipe(gulp.dest("./tmp"));
});

gulp.task("babel", () => {
	return gulp.src("./src/index.js")
		.pipe(plumber())
		.pipe(babel({ presets: ["es2015"] }))
		.pipe(gulp.dest("./tmp"))
});

gulp.task("browserify", ["babel"], () => {
	return gulp.src("./tmp/index.js")
		.pipe(browserify({
			insertGlobals: true
		}))
		.pipe(gulp.dest("./tmp"));
});

gulp.task("uglify", ["browserify"], () => {
	return gulp.src("./tmp/index.js")
		.pipe(plumber())
		.pipe(uglify())
		.pipe(rename("index.min.js"))
		.pipe(gulp.dest("./tmp/"));
});

gulp.task("insert-base64-images", ["pug"], () => {
	return gulp.src("./tmp/index.html")
		.pipe(plumber())
		.pipe(tap((file, t) => {
			let content = file.contents.toString("utf-8");

			let doc = parse5.parse(content);

			let getNodeId = function(node) {
				let idAttr = node && node.attrs ? node.attrs.find(e => e.name === "id") : null;
				return idAttr ? idAttr.value : null;
			};

			let getImage = function(nodeId) {
				return fs.readFileSync("./assets/" + nodeId.replace("img-", "") + ".jpg");
			};

			let hasChildrenImages = function(node) {
				for (let i = 0; node && node.childNodes && i < node.childNodes.length; i++) {
					let child = node.childNodes[i];

					if (child.nodeName === "img" || hasChildrenImages(child)) {
						return true;
					}
				}

				return false;
			};

			let replaceImages = function(node) {
				if (node.nodeName === "img") {
					// The current node is an image, replace it
					let image = getImage(getNodeId(node));
					node.attrs.push({
						name: "src",
						value: "data:image/jpg;base64," + image.toString("base64")
					});
				} else if (hasChildrenImages(node)) {
					// The current node is not an image, but might have children images
					for (let i = 0; i < node.childNodes.length; i++) {
						let child = node.childNodes[i];
						replaceImages(child);
					}
				}
			};

			replaceImages(doc);

			file.contents = new Buffer(parse5.serialize(doc), "utf-8");
		}))
		.pipe(gulp.dest("./tmp"))
});

gulp.task("insert-styles", ["insert-base64-images"], () => {
	return gulp.src("./tmp/index.html")
		.pipe(plumber())
		.pipe(tap((file, t) => {
			let customCss = fs.readFileSync("./src/styles.css", "utf-8");
			let materializeCss = fs.readFileSync(
				"./node_modules/materialize-css/dist/css/materialize.min.css", "utf-8"
			);
			let devicon = fs.readFileSync(
				"./node_modules/devicon/devicon.min.css", "utf-8"
			);
			let css = materializeCss.replace("../fonts/roboto", "./fonts/roboto")
				+ devicon
				+ customCss;

			let minified = new CleanCss().minify(css).styles;

			let newFile = file.contents.toString("utf-8").replace(
				`<styles-bundle></styles-bundle>`,
				`<style>${minified}</style>`
			);
			file.contents = new Buffer(newFile, "utf-8");
		}))
		.pipe(gulp.dest("./tmp"));
});

gulp.task("insert-scripts", ["insert-styles", "uglify"], () => {
	return gulp.src("./tmp/index.html")
		.pipe(plumber())
		.pipe(tap((file, t) => {
			// Insert the bundle and materialize separately, because materialize won't
			// work with browserify.
			let scripts = fs.readFileSync("./tmp/index.min.js", "utf-8");
			let materialize = fs.readFileSync(
				"./node_modules/materialize-css/dist/js/materialize.min.js", "utf-8"
			);
			let newFile = file.contents
				.toString("utf-8")
				.replace(
					`<script-bundle></script-bundle>`,
					`<script type="text/javascript">${scripts}</script>
					<script type="text/javascript">${materialize}</script>`
				);

			file.contents = new Buffer(newFile, "utf-8");
		}))
		.pipe(gulp.dest("./tmp"));
});

gulp.task("copy-html", ["insert-scripts"], () => {
	return gulp.src("./tmp/index.html")
		.pipe(plumber())
		.pipe(gulp.dest("./dist"));
});

gulp.task("copy-fonts", () => {
	return gulp.src([
		"./node_modules/devicon/fonts/devicon.woff",
		"./node_modules/materialize-css/fonts/**/*",
	])
		.pipe(plumber())
		.pipe(gulp.dest("./dist/fonts"));
});

gulp.task("copy-assets", () => {
	return gulp.src("./assets/schedulebot.mp4")
		.pipe(plumber())
		.pipe(gulp.dest("./dist/assets"));
});

gulp.task("cleanup", ["copy-html", "copy-fonts", "copy-assets"], () => {
	return del.sync(["./tmp"]);
});

gulp.task("default", ["cleanup"]);
