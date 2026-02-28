const fs = require('fs');
const path = require('path');

const walk = (dir, done) => {
    let results = [];
    fs.readdir(dir, (err, list) => {
        if (err) return done(err);
        let pending = list.length;
        if (!pending) return done(null, results);
        list.forEach(file => {
            file = path.resolve(dir, file);
            fs.stat(file, (err, stat) => {
                if (stat && stat.isDirectory()) {
                    walk(file, (err, res) => {
                        results = results.concat(res);
                        if (!--pending) done(null, results);
                    });
                } else {
                    results.push(file);
                    if (!--pending) done(null, results);
                }
            });
        });
    });
};

const processFile = (filePath) => {
    if (!filePath.endsWith('.jsx') && !filePath.endsWith('.css') && !filePath.endsWith('.js')) return;

    let content = fs.readFileSync(filePath, 'utf8');
    let originalContent = content;

    // React inline styles
    content = content.replace(/fontSize:\s*'(\d+)px'/g, (match, p1) => {
        const newSize = parseInt(p1) + 2;
        return `fontSize: '${newSize}px'`;
    });

    content = content.replace(/fontSize:\s*(\d+) /g, (match, p1) => {
        // In case there's something like fontSize: 16 (number, not string)
        const newSize = parseInt(p1) + 2;
        return `fontSize: ${newSize} `;
    });

    content = content.replace(/fontSize:\s*'(\d+\.?\d*)rem'/g, (match, p1) => {
        const newSize = (parseFloat(p1) * 1.125).toFixed(2);
        // Remove trailing .00 if needed
        const cleanSize = newSize.endsWith('.00') ? parseInt(newSize) : newSize.replace(/0$/, '');
        return `fontSize: '${cleanSize}rem'`;
    });

    // CSS files
    content = content.replace(/font-size:\s*(\d+)px;/g, (match, p1) => {
        const newSize = parseInt(p1) + 2;
        return `font-size: ${newSize}px;`;
    });

    content = content.replace(/font-size:\s*(\d+\.?\d*)rem;/g, (match, p1) => {
        const newSize = (parseFloat(p1) * 1.125).toFixed(2);
        const cleanSize = newSize.endsWith('.00') ? parseInt(newSize) : newSize.replace(/0$/, '');
        return `font-size: ${cleanSize}rem;`;
    });

    // Line height adjustments (scale up slightly)
    content = content.replace(/lineHeight:\s*1\.5(,?)/g, 'lineHeight: 1.6$1');
    content = content.replace(/lineHeight:\s*1\.6(,?)/g, 'lineHeight: 1.7$1');
    content = content.replace(/lineHeight:\s*'1\.5'(,?)/g, "lineHeight: '1.6'$1");
    content = content.replace(/lineHeight:\s*'1\.6'(,?)/g, "lineHeight: '1.7'$1");

    // CSS line-height
    content = content.replace(/line-height:\s*1\.5;/g, 'line-height: 1.6;');
    content = content.replace(/line-height:\s*1\.6;/g, 'line-height: 1.7;');

    if (content !== originalContent) {
        fs.writeFileSync(filePath, content, 'utf8');
        console.log(`Updated: ${filePath}`);
    }
};

walk(path.join(__dirname, 'src'), (err, results) => {
    if (err) throw err;
    results.forEach(processFile);
    console.log('Done.');
});
