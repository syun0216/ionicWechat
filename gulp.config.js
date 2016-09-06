module.exports = function() {
    var client = 'src/',
        dist = 'dist',
        tmp = '.tmp',
        docs = 'documentation',
        landing = 'landing';

    var config = {
        client: client,  
        dist: dist,
        tmp: tmp,
        index: client + "index.html",
        alljs: [
            client + "/assets/lib/**/*.js",
            './*.js'
        ],
        assets: [
            client + "/*.html",
            client + "/**/**/*",
            client + "/**/*.css"
        ],
        jade:[
            client+"/script/app/business/appliance/selectAll.jade"
        ],
        jadeDist:client+"/script/app/business/appliance/selectAll/",
        less: [],
        sass: [
            client + "/assets/scss/*.scss"
        ],
        js: [
            client + "/script/**/**/*.*.js",
            '!' + client + "/**/**/**/*.spec.js"
        ],
        docs: docs,
        docsJade: [
            docs + "/jade/index.jade",
            docs + "/jade/layout.jade"
        ],
        allToClean: [
            tmp,
            ".DS_Store",
            ".sass-cache",
            "node_modules",
            ".git",
            client + "/lib",
            docs + "/jade",
            docs + "/layout.html",
            landing + "/jade",
            landing + "/lib",
            "readme.md"
        ]
    };

    return config;
};
